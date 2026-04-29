import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageContext';
import jordiCeo from '@/assets/jordi-reguant-ceo.jpg';
import aboutInnovation from '@/assets/about-innovation.jpg';
import aboutMission from '@/assets/about-mission.jpg';
import { useHashScroll } from '@/hooks/useHashScroll';

const AboutUs = () => {
  const { t } = useLanguage();
  useHashScroll();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            {t('about.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            {t('about.subtitle')}
          </p>
        </section>

        {/* Misión */}
        <section id="about-mission" className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <img src={aboutMission} alt={t('about.mission.title')} loading="lazy" width={768} height={512} className="w-full max-w-md rounded-xl border border-border/30 object-cover shadow-lg" />
            <div className="flex-1">
              <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">{t('about.mission.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('about.mission.desc')}</p>
            </div>
          </div>
        </section>

        {/* Qué hacemos */}
        <section id="about-what" className="border-y border-border bg-secondary/20 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col-reverse items-center gap-8 md:flex-row">
              <div className="flex-1">
                <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">{t('about.what.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('about.what.desc')}</p>
              </div>
              <img src={aboutInnovation} alt={t('about.what.title')} loading="lazy" width={768} height={512} className="w-full max-w-md rounded-xl border border-border/30 object-cover shadow-lg" />
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section id="about-team" className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="relative w-full max-w-sm">
              <img
                src={jordiCeo}
                alt={`${t('about.team.ceo.name')} - ${t('about.team.ceo.role')}`}
                loading="lazy"
                width={896}
                height={1200}
                className="w-full rounded-xl border border-primary/30 object-cover shadow-[0_0_40px_hsl(var(--primary)/0.25)]"
              />
              <div className="absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-background/95 via-background/70 to-transparent p-4 text-center">
                <p className="font-display text-lg font-semibold text-foreground">
                  {t('about.team.ceo.name')}
                </p>
                <p className="text-sm font-medium text-primary">
                  {t('about.team.ceo.role')}
                </p>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">{t('about.team.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('about.team.desc')}</p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="border-t border-border bg-secondary/20 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 font-display text-2xl font-semibold text-foreground">{t('about.values.title')}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {(['v1', 'v2', 'v3'] as const).map((v) => (
                <div key={v} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold text-primary">{t(`about.values.${v}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`about.values.${v}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
