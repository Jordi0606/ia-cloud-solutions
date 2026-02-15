import { useLanguage } from '@/i18n/LanguageContext';
import { Bot, Cog, Brain, DollarSign, Layers, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const details = [
  { id: 'detail-bots', key: 'bots', icon: Bot },
  { id: 'detail-automation', key: 'automation', icon: Cog },
  { id: 'detail-problems', key: 'problems', icon: Brain },
  { id: 'detail-monetize', key: 'monetize', icon: DollarSign },
  { id: 'detail-integral', key: 'integral', icon: Layers },
  { id: 'detail-chats', key: 'chats', icon: MessageCircle },
];

const ServiceDetails = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {details.map(({ id, key, icon: Icon }) => (
            <Card key={id} id={id} className="group border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
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
