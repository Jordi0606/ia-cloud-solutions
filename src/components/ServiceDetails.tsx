import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import iconBots from '@/assets/icon-bots.png';
import iconAutomation from '@/assets/icon-automation.png';
import iconBrain from '@/assets/icon-brain.png';
import iconMonetize from '@/assets/icon-monetize.png';
import iconIntegral from '@/assets/icon-integral.png';
import iconChats from '@/assets/icon-chats.png';

const details = [
  { id: 'detail-bots', key: 'bots', icon: iconBots },
  { id: 'detail-automation', key: 'automation', icon: iconAutomation },
  { id: 'detail-problems', key: 'problems', icon: iconBrain },
  { id: 'detail-monetize', key: 'monetize', icon: iconMonetize },
  { id: 'detail-integral', key: 'integral', icon: iconIntegral },
  { id: 'detail-chats', key: 'chats', icon: iconChats },
];

const ServiceDetails = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {details.map(({ id, key, icon }) => (
            <Card key={id} id={id} className="group border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                  <img src={icon} alt="" className="h-10 w-10 object-contain" />
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
