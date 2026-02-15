import { useLanguage } from '@/i18n/LanguageContext';
import { Bot, Cog, Brain, DollarSign, Layers, MessageCircle } from 'lucide-react';

const services = [
  { key: 'bots', icon: Bot, target: 'detail-bots' },
  { key: 'automation', icon: Cog, target: 'detail-automation' },
  { key: 'problems', icon: Brain, target: 'detail-problems' },
  { key: 'monetize', icon: DollarSign, target: 'detail-monetize' },
  { key: 'integral', icon: Layers, target: 'detail-integral' },
  { key: 'chats', icon: MessageCircle, target: 'detail-chats' },
];

const ServicesBar = () => {
  const { t } = useLanguage();

  return (
    <section id="services-bar" className="border-y border-border bg-secondary/30 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {services.map(({ key, icon: Icon, target }) => (
            <button
              key={key}
              onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex flex-col items-center gap-2 rounded-lg border border-transparent p-4 transition-all hover:border-primary/30 hover:bg-primary/5"
            >
              <Icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
              <span className="text-center text-xs font-medium text-foreground/80 md:text-sm">
                {t(`sbar.${key}`)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesBar;
