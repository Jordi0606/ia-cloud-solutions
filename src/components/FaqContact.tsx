import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, 'Required').max(2000),
});

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5'];

const FaqContact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({ title: result.error.errors[0].message, variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('contact_requests').insert([{
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      message: result.data.message,
    }]);
    setLoading(false);
    if (error) {
      toast({ title: t('contact.error'), variant: 'destructive' });
    } else {
      toast({ title: t('contact.success') });
      setForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* FAQ */}
          <div>
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground">{t('faq.title')}</h2>
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
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground">{t('contact.title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">{t('contact.name')}</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 bg-secondary" required />
              </div>
              <div>
                <Label htmlFor="email">{t('contact.email.label')}</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 bg-secondary" required />
              </div>
              <div>
                <Label htmlFor="phone">{t('contact.phone')}</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 bg-secondary" />
              </div>
              <div>
                <Label htmlFor="message">{t('contact.message')}</Label>
                <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1 bg-secondary" rows={4} required />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? '...' : t('contact.send')}
              </Button>
              <a
                href="mailto:info@iaclowd.com"
                className="mt-4 flex items-center justify-center gap-3 text-lg font-semibold text-foreground transition hover:text-primary"
              >
                <Mail className="h-7 w-7 text-yellow-400" />
                info@iaclowd.com
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqContact;
