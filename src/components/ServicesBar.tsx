import { useLanguage } from '@/i18n/LanguageContext';
import iconBots from '@/assets/icon-bots.png';
import iconAutomation from '@/assets/icon-automation.png';
import iconBrain from '@/assets/icon-brain.png';
import iconMonetize from '@/assets/icon-monetize.png';
import iconIntegral from '@/assets/icon-integral.png';
import iconChats from '@/assets/icon-chats.png';
import iconTraining from '@/assets/icon-training.png';

const services = [
  { key: 'bots', icon: iconBots, target: 'detail-bots' },
  { key: 'automation', icon: iconAutomation, target: 'detail-automation' },
  { key: 'problems', icon: iconBrain, target: 'detail-problems' },
  { key: 'monetize', icon: iconMonetize, target: 'detail-monetize' },
  { key: 'integral', icon: iconIntegral, target: 'detail-integral' },
  { key: 'chats', icon: iconChats, target: 'detail-chats' },
  { key: 'training', icon: iconTraining, target: 'detail-training' },
];

const ServicesBar = () => {
  const { t } = useLanguage();

  return (
    <section id="services-bar" className="border-y border-border bg-secondary/30 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {services.filter(s => s.key !== 'training').map(({ key, icon, target }) => (
            <button
              key={key}
              onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex flex-col items-center gap-2 rounded-lg border border-transparent p-4 transition-all hover:border-yellow-400 hover:bg-primary/5"
            >
              <img src={icon} alt="" className="h-10 w-16 object-cover mix-blend-screen transition-transform group-hover:scale-110" />
              <span className="text-center text-xs font-medium text-foreground/80 md:text-sm">
                {t(`sbar.${key}`)}
              </span>
            </button>
          ))}
        </div>
        {/* Training centered below */}
        {services.filter(s => s.key === 'training').map(({ key, icon, target }) => (
          <div key={key} className="mt-2 flex justify-center">
            <button
              onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex flex-col items-center gap-2 rounded-lg border border-transparent p-4 transition-all hover:border-yellow-400 hover:bg-primary/5"
            >
              <img src={icon} alt="" className="h-10 w-16 object-cover mix-blend-screen transition-transform group-hover:scale-110" />
              <span className="text-center text-xs font-medium text-foreground/80 md:text-sm">
                {t(`sbar.${key}`)}
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesBar;
