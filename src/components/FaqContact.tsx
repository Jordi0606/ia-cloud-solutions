import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import webIcon from "@/assets/web-icon.png";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional(),
  priority: z.enum(["alta", "media", "baja"]),
  message: z.string().trim().min(1, "Required").max(2000),
});

const faqKeys = ["q1", "q2", "q3", "q4", "q5"];

const FaqContact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    priority: undefined as "alta" | "media" | "baja" | undefined,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({ title: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const payload = {
      name: result.data.name,
      company: result.data.company || null,
      email: result.data.email,
      phone: result.data.phone || null,
      priority: result.data.priority,
      message: result.data.message,
    };
    const { error } = await supabase.from("contact_request").insert([payload]);
    if (!error) {
      // Fire-and-forget: forward to Make.com
      fetch("https://hook.eu2.make.com/1l23tgdw7ofgz2g4l9o5kjkowkb8rhus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(console.error);
    }
    setLoading(false);
    if (error) {
      toast({ title: t("contact.error"), variant: "destructive" });
    } else {
      toast({ title: t("contact.success") });
      setForm({ name: "", company: "", email: "", phone: "", priority: undefined, message: "" });
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* FAQ */}
          <div>
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground">{t("faq.title")}</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqKeys.map((k) => (
                <AccordionItem key={k} value={k} className="rounded-lg border border-border bg-card px-4">
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                    {t(`faq.${k}`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {t(`faq.a${k.slice(1)}`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground">{t("contact.title")}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">{t("contact.name")}</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 bg-secondary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">{t("contact.company")}</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="mt-1 bg-secondary"
                />
              </div>
              <div>
                <Label htmlFor="email">{t("contact.email.label")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 bg-secondary"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">{t("contact.phone")}</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 bg-secondary"
                />
              </div>
              <div>
                <Label>{t("contact.priority")}</Label>
                <Select
                  value={form.priority}
                  onValueChange={(val) => setForm({ ...form, priority: val as "alta" | "media" | "baja" })}
                >
                  <SelectTrigger className="mt-1 bg-secondary">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="alta">{t("contact.priority.high")}</SelectItem>
                    <SelectItem value="media">{t("contact.priority.medium")}</SelectItem>
                    <SelectItem value="baja">{t("contact.priority.low")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">{t("contact.message")}</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1 bg-secondary"
                  rows={4}
                  required
                  placeholder={t("contact.message.placeholder")}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full animate-glow-pulse bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              >
                {loading ? "..." : t("contact.send")}
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <a
            href="mailto:info@iaclowd.com"
            className="flex items-center gap-3 text-lg font-semibold text-foreground transition hover:text-primary"
          >
            <Mail className="h-7 w-7 text-yellow-400" />
            info@iaclowd.com
          </a>
          <a
            href="https://www.iaclowd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg font-semibold text-foreground transition hover:text-primary"
          >
            <img src={webIcon} alt="Web" className="h-7 w-7" loading="lazy" width={28} height={28} />
            www.iaclowd.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqContact;
