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
import imgBots from '@/assets/service-bots.jpg';
import imgAutomation from '@/assets/service-automation.jpg';
import imgProblems from '@/assets/service-problems.jpg';
import imgMonetize from '@/assets/service-monetize.jpg';
import imgIntegral from '@/assets/service-integral.jpg';
import imgChats from '@/assets/service-chats.jpg';
import imgTraining from '@/assets/service-training.jpg';

const services = [
  { key: 'bots', icon: iconBots, img: imgBots },
  { key: 'automation', icon: iconAutomation, img: imgAutomation },
  { key: 'problems', icon: iconBrain, img: imgProblems },
  { key: 'monetize', icon: iconMonetize, img: imgMonetize },
  { key: 'integral', icon: iconIntegral, img: imgIntegral },
  { key: 'chats', icon: iconChats, img: imgChats },
  { key: 'training', icon: iconTraining, img: imgTraining },
];

const mainServices = services.filter(s => s.key !== 'training');
const trainingService = services.find(s => s.key === 'training')!;

const ServicesBar = () => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (key: string) => {
    setExpanded(prev => (prev === key ? null : key));
  };

  const expandedService = expanded ? services.find(s => s.key === expanded) : null;

  const renderButton = ({ key, icon }: { key: string; icon: string }) => {
    const isExpanded = expanded === key;

    return (
      <button
        key={key}
        onClick={() => toggle(key)}
        className={`group relative flex flex-col items-center gap-2 rounded-lg border p-4 transition-all duration-300 ${
          isExpanded
            ? 'border-yellow-400 bg-primary/10 scale-105 shadow-lg shadow-yellow-400/10'
            : 'border-transparent hover:border-yellow-400 hover:bg-primary/5'
        }`}
      >
        <img
          src={icon}
          alt=""
          className={`h-14 w-22 object-contain mix-blend-screen transition-all duration-300 drop-shadow-[0_0_8px_hsl(217,91%,60%,0.5)] ${
            isExpanded ? 'scale-125 drop-shadow-[0_0_16px_hsl(217,91%,60%,0.7)]' : 'group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_hsl(217,91%,60%,0.6)]'
          }`}
        />
        <span className="text-center text-xs font-medium text-foreground/80 md:text-sm">
          {t(`sbar.${key}`)}
        </span>
      </button>
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

        {/* Expanded detail panel — full width below the grid */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedService ? 'mt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {expandedService && (
            <div className="relative rounded-xl border border-yellow-400/30 bg-card p-6 shadow-lg shadow-yellow-400/5 animate-fade-in">
              <button
                onClick={() => setExpanded(null)}
                className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground/70 transition-colors hover:bg-destructive hover:text-destructive-foreground"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                <img
                  src={expandedService.img}
                  alt={t(`detail.${expandedService.key}.title`)}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="w-full max-w-xs rounded-lg border border-border/30 object-cover shadow-md md:max-w-sm"
                />
                <div className="flex flex-col items-center gap-4 sm:items-start">
                  <img
                    src={expandedService.icon}
                    alt=""
                    className="h-16 w-24 shrink-0 object-cover mix-blend-screen"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                      {t(`detail.${expandedService.key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`detail.${expandedService.key}.desc`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesBar;
