import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import iconBots from '@/assets/icon-bots.png';
import iconAutomation from '@/assets/icon-automation.png';
import iconBrain from '@/assets/icon-brain.png';
import iconMonetize from '@/assets/icon-monetize.png';
import iconIntegral from '@/assets/icon-integral.png';
import iconChats from '@/assets/icon-chats.png';
import iconTraining from '@/assets/icon-training.png';

const details = [
  { id: 'detail-bots', key: 'bots', icon: iconBots },
  { id: 'detail-automation', key: 'automation', icon: iconAutomation },
  { id: 'detail-problems', key: 'problems', icon: iconBrain },
  { id: 'detail-monetize', key: 'monetize', icon: iconMonetize },
  { id: 'detail-integral', key: 'integral', icon: iconIntegral },
  { id: 'detail-chats', key: 'chats', icon: iconChats },
  { id: 'detail-training', key: 'training', icon: iconTraining },
];

const ServiceDetails = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {details.map(({ id, key, icon }) => (
            <Card key={id} id={id} className="group border-border bg-card transition-all hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/10">
              <CardContent className="p-6">
                <div className="mb-4 mx-auto flex h-16 w-28 items-center justify-center overflow-hidden rounded-lg">
                  <img src={icon} alt="" className="h-full w-full object-contain mix-blend-screen" />
                </div>
                <h3 className="mb-3 font-display text-lg font-semibold text-foreground">
                  {t(`detail.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`detail.${key}.desc`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
