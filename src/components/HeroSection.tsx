import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 px-4 text-center">
        <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {t('hero.title')}
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {t('hero.subtitle')}
        </p>
        <Button
          size="lg"
          className="animate-glow-pulse bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold"
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
