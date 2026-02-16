import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/i18n/LanguageContext';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect width="48" height="48" rx="12" fill="url(#ig-grad)" />
    <path
      d="M24 14.4c-3.1 0-3.5 0-4.7.1-1.2.1-2 .2-2.7.5a5.4 5.4 0 0 0-2 1.3 5.4 5.4 0 0 0-1.3 2c-.3.7-.4 1.5-.5 2.7 0 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.2.2 2 .5 2.7.3.7.6 1.3 1.3 2a5.4 5.4 0 0 0 2 1.3c.7.3 1.5.4 2.7.5 1.2 0 1.6.1 4.7.1s3.5 0 4.7-.1c1.2-.1 2-.2 2.7-.5a5.4 5.4 0 0 0 2-1.3 5.4 5.4 0 0 0 1.3-2c.3-.7.4-1.5.5-2.7 0-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.2-.2-2-.5-2.7a5.4 5.4 0 0 0-1.3-2 5.4 5.4 0 0 0-2-1.3c-.7-.3-1.5-.4-2.7-.5-1.2 0-1.6-.1-4.7-.1zm0 1.7c3.1 0 3.4 0 4.6.1 1.1.1 1.7.2 2.1.4.5.2.9.5 1.3.9.4.4.7.8.9 1.3.2.4.3 1 .4 2.1 0 1.2.1 1.5.1 4.6s0 3.4-.1 4.6c-.1 1.1-.2 1.7-.4 2.1-.2.5-.5.9-.9 1.3-.4.4-.8.7-1.3.9-.4.2-1 .3-2.1.4-1.2 0-1.5.1-4.6.1s-3.4 0-4.6-.1c-1.1-.1-1.7-.2-2.1-.4a3.7 3.7 0 0 1-1.3-.9 3.7 3.7 0 0 1-.9-1.3c-.2-.4-.3-1-.4-2.1 0-1.2-.1-1.5-.1-4.6s0-3.4.1-4.6c.1-1.1.2-1.7.4-2.1.2-.5.5-.9.9-1.3.4-.4.8-.7 1.3-.9.4-.2 1-.3 2.1-.4 1.2 0 1.5-.1 4.6-.1z"
      fill="#fff"
    />
    <circle cx="24" cy="24.3" r="4.9" fill="none" stroke="#fff" strokeWidth="1.7" />
    <circle cx="29.8" cy="18.5" r="1.15" fill="#fff" />
  </svg>
);

const socials = [
  {
    key: 'instagram',
    renderIcon: (cls: string) => <InstagramIcon className={cls} />,
    href: 'https://www.instagram.com/', // TODO: replace with actual URL
  },
  {
    key: 'whatsapp',
    renderIcon: (cls: string) => <FaWhatsapp className={cls} style={{ color: '#25D366' }} />,
    href: 'https://wa.me/', // TODO: replace with actual number
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
          {socials.map(({ key, renderIcon, href }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-8 transition-all hover:border-yellow-400 hover:shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center transition-transform group-hover:scale-110">
                {renderIcon('h-14 w-14')}
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
