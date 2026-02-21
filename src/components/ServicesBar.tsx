import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { X } from 'lucide-react';
import iconBots from '@/assets/icon-bots.png';
import iconAutomation from '@/assets/icon-automation.png';
import iconBrain from '@/assets/icon-brain.png';
import iconMonetize from '@/assets/icon-monetize.png';
import iconIntegral from '@/assets/icon-integral.png';
import iconChats from '@/assets/icon-chats.png';
import iconTraining from '@/assets/icon-training.png';

const services = [
  { key: 'bots', icon: iconBots },
  { key: 'automation', icon: iconAutomation },
  { key: 'problems', icon: iconBrain },
  { key: 'monetize', icon: iconMonetize },
  { key: 'integral', icon: iconIntegral },
  { key: 'chats', icon: iconChats },
  { key: 'training', icon: iconTraining },
];

const mainServices = services.filter(s => s.key !== 'training');
const trainingService = services.find(s => s.key === 'training')!;

const ServicesBar = () => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (key: string) => {
    setExpanded(prev => (prev === key ? null : key));
  };

  const renderButton = ({ key, icon }: { key: string; icon: string }) => {
    const isExpanded = expanded === key;

    return (
      <div key={key} className="flex flex-col items-center">
        <button
          onClick={() => toggle(key)}
          className={`group relative flex flex-col items-center gap-2 rounded-lg border p-4 transition-all duration-300 ${
            isExpanded
              ? 'border-yellow-400 bg-primary/10 scale-110 shadow-lg shadow-yellow-400/10'
              : 'border-transparent hover:border-yellow-400 hover:bg-primary/5'
          }`}
        >
          {isExpanded && (
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(null); }}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors hover:bg-destructive hover:text-destructive-foreground"
              aria-label="Cerrar"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          <img
            src={icon}
            alt=""
            className={`h-10 w-16 object-cover mix-blend-screen transition-transform duration-300 ${
              isExpanded ? 'scale-125' : 'group-hover:scale-110'
            }`}
          />
          <span className="text-center text-xs font-medium text-foreground/80 md:text-sm">
            {t(`sbar.${key}`)}
          </span>
        </button>
        {/* Expanded detail panel */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'mt-3 max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="rounded-lg border border-yellow-400/30 bg-card p-4 text-center shadow-md">
            <h4 className="mb-1 font-display text-sm font-semibold text-foreground">
              {t(`detail.${key}.title`)}
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t(`detail.${key}.desc`)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="services-bar" className="border-y border-border bg-secondary/30 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {mainServices.map(renderButton)}
        </div>
        <div className="mt-2 flex justify-center">
          {renderButton(trainingService)}
        </div>
      </div>
    </section>
  );
};

export default ServicesBar;
