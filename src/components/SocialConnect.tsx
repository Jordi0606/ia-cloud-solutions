import { FaTelegramPlane } from 'react-icons/fa';
import { useLanguage } from '@/i18n/LanguageContext';
import logoInstagram from '@/assets/logo-instagram.jpg';

const socials = [
  {
    key: 'instagram',
    renderIcon: (cls: string) => <img src={logoInstagram} alt="Instagram" className={`${cls} rounded-lg`} />,
    href: 'https://www.instagram.com/iaclowd?igsh=ZmQ1engxa2E3Z2Fu',
  },
  {
    key: 'telegram',
    renderIcon: (cls: string) => <FaTelegramPlane className={cls} style={{ color: '#26A5E4' }} />,
    href: 'https://t.me/Reguant_Bot',
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
