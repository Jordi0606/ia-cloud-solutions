import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: roleData } = await supabaseClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Se requiere rol de administrador" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { topic, language } = await req.json();
    if (!topic) {
      return new Response(JSON.stringify({ error: "Se requiere un tema" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const lang = language || "español";

    // Generate the main article
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Eres un redactor profesional de artículos de blog para IAcloWd, una empresa de soluciones de inteligencia artificial.
Genera un artículo completo sobre el tema que te indiquen.
Responde SIEMPRE en formato JSON con esta estructura exacta:
{
  "title": "Título del artículo",
  "slug": "titulo-del-articulo",
  "excerpt": "Resumen breve de 1-2 frases",
  "content": "Contenido completo del artículo en formato Markdown"
}
El contenido debe ser profesional, informativo y relevante para empresas interesadas en IA.
Escribe en ${lang}. El slug debe ser en minúsculas, sin acentos, con guiones.`,
          },
          {
            role: "user",
            content: `Escribe un artículo de blog sobre: ${topic}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Demasiadas peticiones. Inténtalo de nuevo en unos segundos." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos de IA agotados." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Error del servicio de IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";

    let jsonStr = rawContent;
    const jsonMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) jsonStr = jsonMatch[1].trim();

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      return new Response(JSON.stringify({ error: "Error al procesar la respuesta de IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Now generate translations for all 3 languages
    const languages = [
      { code: "es", name: "español" },
      { code: "en", name: "inglés" },
      { code: "ca", name: "catalán" },
    ];

    // Save the main post first
    const { data: insertedPost, error: insertError } = await supabaseClient
      .from("blog_posts")
      .insert({
        title: parsed.title,
        slug: parsed.slug,
        content: parsed.content,
        excerpt: parsed.excerpt || null,
        author_id: user.id,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Insert post error:", insertError);
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Save original language translation (Spanish by default)
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    await adminClient.from("blog_post_translations").insert({
      post_id: insertedPost.id,
      language: "es",
      title: parsed.title,
      excerpt: parsed.excerpt || "",
      content: parsed.content,
    });

    // Generate translations for the other languages in parallel
    const otherLangs = languages.filter(l => l.code !== "es");
    const translationPromises = otherLangs.map(async (targetLang) => {
      try {
        const transResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              {
                role: "system",
                content: `Eres un traductor profesional. Traduce el siguiente artículo de blog al ${targetLang.name}.
Responde SIEMPRE en formato JSON con esta estructura exacta:
{
  "title": "Título traducido",
  "excerpt": "Resumen traducido",
  "content": "Contenido traducido en Markdown"
}
Mantén el formato Markdown y la estructura del artículo original. No cambies datos técnicos ni nombres propios.`,
              },
              {
                role: "user",
                content: `Traduce este artículo:\n\nTítulo: ${parsed.title}\n\nResumen: ${parsed.excerpt}\n\nContenido:\n${parsed.content}`,
              },
            ],
          }),
        });

        if (!transResponse.ok) {
          console.error(`Translation to ${targetLang.code} failed:`, transResponse.status);
          return;
        }

        const transData = await transResponse.json();
        const transRaw = transData.choices?.[0]?.message?.content || "";
        let transJson = transRaw;
        const transMatch = transRaw.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (transMatch) transJson = transMatch[1].trim();

        const transParsed = JSON.parse(transJson);
        await adminClient.from("blog_post_translations").insert({
          post_id: insertedPost.id,
          language: targetLang.code,
          title: transParsed.title,
          excerpt: transParsed.excerpt || "",
          content: transParsed.content,
        });
      } catch (e) {
        console.error(`Translation error for ${targetLang.code}:`, e);
      }
    });

    await Promise.all(translationPromises);

    return new Response(JSON.stringify({ ...parsed, id: insertedPost.id, saved: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-blog error:", e);
    return new Response(JSON.stringify({ error: "Servicio temporalmente no disponible" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
