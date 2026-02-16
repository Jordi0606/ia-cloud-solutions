import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/i18n/LanguageContext';

const socials = [
  {
    key: 'instagram',
    icon: FaInstagram,
    href: 'https://www.instagram.com/', // TODO: replace with actual URL
    gradient: 'from-purple-500 via-pink-500 to-orange-400',
    hoverShadow: 'hover:shadow-pink-500/30',
  },
  {
    key: 'whatsapp',
    icon: FaWhatsapp,
    href: 'https://wa.me/', // TODO: replace with actual number
    gradient: 'from-green-500 to-emerald-400',
    hoverShadow: 'hover:shadow-green-500/30',
  },
];

const SocialConnect = () => {
  const { t } = useLanguage();

  return (
    <section className="border-y border-border bg-secondary/20 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-2 font-display text-2xl font-bold text-foreground md:text-3xl">
          {t('social.title')}
        </h2>
        <p className="mx-auto mb-10 max-w-md text-sm text-muted-foreground">
          {t('social.subtitle')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {socials.map(({ key, icon: Icon, href, gradient, hoverShadow }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-8 transition-all hover:border-yellow-400 hover:shadow-lg ${hoverShadow}`}
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${gradient} transition-transform group-hover:scale-110`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {t(`social.${key}`)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialConnect;
