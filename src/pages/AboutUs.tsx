import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/i18n/LanguageContext';
import aboutTeam from '@/assets/about-team.jpg';
import aboutInnovation from '@/assets/about-innovation.jpg';
import aboutMission from '@/assets/about-mission.jpg';

const AboutUs = () => {
  const { t } = useLanguage();

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
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <img src={aboutMission} alt={t('about.mission.title')} loading="lazy" width={768} height={512} className="w-full max-w-md rounded-xl border border-border/30 object-cover shadow-lg" />
            <div className="flex-1">
              <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">{t('about.mission.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('about.mission.desc')}</p>
            </div>
          </div>
        </section>

        {/* Qué hacemos */}
        <section className="border-y border-border bg-secondary/20 py-12">
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
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <img src={aboutTeam} alt={t('about.team.title')} loading="lazy" width={768} height={512} className="w-full max-w-md rounded-xl border border-border/30 object-cover shadow-lg" />
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
