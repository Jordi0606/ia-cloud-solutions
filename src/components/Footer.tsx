import { useLanguage } from '@/i18n/LanguageContext';
import { Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-secondary/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <a href="mailto:info@iaclowd.com" className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary">
            <Mail className="h-5 w-5 text-yellow-400" />
            info@iaclowd.com
          </a>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground md:gap-6">
            <a href="#" className="transition hover:text-primary">{t('footer.legal')}</a>
            <a href="#" className="transition hover:text-primary">{t('footer.privacy')}</a>
            <a href="#" className="transition hover:text-primary">{t('footer.cookies')}</a>
            <a href="#" className="transition hover:text-primary">{t('footer.terms')}</a>
          </div>
          <p className="text-xs text-muted-foreground">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
