import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';

interface Translation {
  title: string;
  excerpt: string | null;
  content: string;
}

/**
 * Hook that fetches the translated version of a blog post based on current language.
 * Falls back to the original post data if no translation exists.
 */
export function useBlogTranslation(postId: string | undefined, original: { title: string; excerpt?: string | null; content?: string }) {
  const { language } = useLanguage();
  const [translated, setTranslated] = useState<Translation | null>(null);

  useEffect(() => {
    if (!postId) return;

    supabase
      .from('blog_post_translations')
      .select('title, excerpt, content')
      .eq('post_id', postId)
      .eq('language', language)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setTranslated(data as Translation);
        } else {
          setTranslated(null);
        }
      });
  }, [postId, language]);

  return {
    title: translated?.title || original.title,
    excerpt: translated?.excerpt ?? original.excerpt ?? null,
    content: translated?.content || original.content || '',
  };
}

/**
 * Hook that fetches translations for multiple blog posts at once.
 */
export function useBlogTranslations(postIds: string[]) {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<Record<string, Translation>>({});

  useEffect(() => {
    if (postIds.length === 0) return;

    supabase
      .from('blog_post_translations')
      .select('post_id, title, excerpt, content')
      .eq('language', language)
      .in('post_id', postIds)
      .then(({ data }) => {
        if (data) {
          const map: Record<string, Translation> = {};
          for (const row of data as (Translation & { post_id: string })[]) {
            map[row.post_id] = { title: row.title, excerpt: row.excerpt, content: row.content };
          }
          setTranslations(map);
        }
      });
  }, [postIds.join(','), language]);

  return translations;
}
