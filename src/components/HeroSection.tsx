import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative flex h-screen flex-col items-center justify-between overflow-hidden pt-10 pb-4 bg-background">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      {/* Logo centrado y grande - mix-blend-screen funde el fondo negro con el bg */}
      <div className="flex flex-1 items-center justify-center w-full h-full px-4" style={{ isolation: 'auto' }}>
        <img
          src="/logo-iaclowd-v3.png"
          alt="IAcloWd Logo"
          className="relative max-h-[60vh] w-full object-contain mix-blend-screen"
        />
      </div>

      {/* Texto y CTA abajo */}
      <div className="relative z-10 px-4 text-center -mt-8">
        <h1 className="mb-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {t('hero.title')}
        </h1>
        <p className="mx-auto mb-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          {t('hero.subtitle')}
        </p>
        <Button
          size="lg"
          className="animate-glow-pulse bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-5 text-sm font-semibold"
          onClick={() => document.getElementById('services-bar')?.scrollIntoView({ behavior: 'smooth' })}
        >
          {t('hero.cta')}
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
