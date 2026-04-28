import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-secondary/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground md:gap-6">
            <Link to="/aviso-legal" className="transition hover:text-primary">{t('footer.legal')}</Link>
            <Link to="/privacidad" className="transition hover:text-primary">{t('footer.privacy')}</Link>
            <Link to="/cookies" className="transition hover:text-primary">{t('footer.cookies')}</Link>
            <Link to="/condiciones" className="transition hover:text-primary">{t('footer.terms')}</Link>
          </div>
          <p className="text-[10px] leading-relaxed text-muted-foreground md:max-w-2xl md:text-right">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
