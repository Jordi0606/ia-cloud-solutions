import { useLanguage } from '@/i18n/LanguageContext';
import { MapPin, Phone, Mail } from 'lucide-react';

const MapSection = () => {
  const { t } = useLanguage();

  return (
    <section className="border-t border-border py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center font-display text-3xl font-bold text-foreground">{t('map.title')}</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title="Ubicación IAcloWd"
              src="https://www.openstreetmap.org/export/embed.html?bbox=1.8577%2C41.4865%2C1.8777%2C41.5065&layer=mapnik&marker=41.4965%2C1.8677"
              className="h-80 w-full"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p className="text-foreground/80">{t('map.address')}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-foreground/80">+34 000 000 000</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-foreground/80">info@iaclowd.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
