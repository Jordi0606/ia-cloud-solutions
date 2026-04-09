import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const langLabels: Record<Language, string> = { ca: 'Català', es: 'Castellano', en: 'English' };

/** Hook: open on hover, close when mouse leaves both trigger + content */
function useHoverMenu(delay = 150) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const enter = useCallback(() => {
    clearTimeout(timeout.current);
    setOpen(true);
  }, []);

  const leave = useCallback(() => {
    timeout.current = setTimeout(() => setOpen(false), delay);
  }, [delay]);

  return { open, setOpen, enter, leave };
}

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const about = useHoverMenu();
  const services = useHoverMenu();
  const consulting = useHoverMenu();
  const contact = useHoverMenu();
  const lang = useHoverMenu();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
          <img src="/logo-iaclowd.png" alt="IAcloWd" className="h-10" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {/* Home */}
          <a href="/" className="text-sm font-medium text-foreground/80 transition hover:text-primary">
            Home
          </a>

          {/* Quiénes somos */}
          <DropdownMenu open={about.open} onOpenChange={about.setOpen}>
            <div onMouseEnter={about.enter} onMouseLeave={about.leave}>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition hover:text-primary">
                {t('nav.about')} <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="bg-popover border-border" onMouseEnter={about.enter} onMouseLeave={about.leave}>
              <DropdownMenuItem asChild><a href="/quienes-somos">{t('about.mission.title')}</a></DropdownMenuItem>
              <DropdownMenuItem asChild><a href="/quienes-somos">{t('about.what.title')}</a></DropdownMenuItem>
              <DropdownMenuItem asChild><a href="/quienes-somos">{t('about.team.title')}</a></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Servicios */}
          <DropdownMenu open={services.open} onOpenChange={services.setOpen}>
            <div onMouseEnter={services.enter} onMouseLeave={services.leave}>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition hover:text-primary">
                {t('nav.services')} <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="bg-popover border-border" onMouseEnter={services.enter} onMouseLeave={services.leave}>
              <DropdownMenuItem onClick={() => scrollTo('services')}>{t('services.bots')}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollTo('services')}>{t('services.automation')}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollTo('services')}>{t('services.integration')}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollTo('services')}>{t('services.analytics')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Consultoría */}
          <DropdownMenu open={consulting.open} onOpenChange={consulting.setOpen}>
            <div onMouseEnter={consulting.enter} onMouseLeave={consulting.leave}>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition hover:text-primary">
                {t('nav.consulting')} <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="bg-popover border-border" onMouseEnter={consulting.enter} onMouseLeave={consulting.leave}>
              <DropdownMenuItem>{t('consulting.digital')}</DropdownMenuItem>
              <DropdownMenuItem>{t('consulting.strategy')}</DropdownMenuItem>
              <DropdownMenuItem>{t('consulting.audit')}</DropdownMenuItem>
              <DropdownMenuItem>{t('consulting.training')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Contactar */}
          <DropdownMenu open={contact.open} onOpenChange={contact.setOpen}>
            <div onMouseEnter={contact.enter} onMouseLeave={contact.leave}>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition hover:text-primary">
                {t('nav.contact')} <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="bg-popover border-border" onMouseEnter={contact.enter} onMouseLeave={contact.leave}>
              <DropdownMenuItem onClick={() => scrollTo('contact')}>{t('contact.form')}</DropdownMenuItem>
              <DropdownMenuItem asChild><a href="https://wa.me/34613825828" target="_blank" rel="noopener noreferrer">{t('contact.whatsapp')}</a></DropdownMenuItem>
              <DropdownMenuItem>{t('contact.email')}</DropdownMenuItem>
              <DropdownMenuItem asChild><a href="https://calendar.app.google/WoH8WjWrXGG9CWuKA" target="_blank" rel="noopener noreferrer">{t('contact.meeting')}</a></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <Input
                autoFocus
                placeholder={t('nav.search')}
                className="h-8 w-48 bg-secondary text-sm"
                onBlur={() => setSearchOpen(false)}
              />
            ) : (
              <button onClick={() => setSearchOpen(true)} className="text-foreground/60 transition hover:text-primary">
                <Search className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Language */}
          <DropdownMenu open={lang.open} onOpenChange={lang.setOpen}>
            <div onMouseEnter={lang.enter} onMouseLeave={lang.leave}>
              <DropdownMenuTrigger className="flex items-center gap-1 rounded border border-border px-2 py-1 text-xs font-medium text-foreground/80 transition hover:border-primary">
                {langLabels[language]} <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="bg-popover border-border" onMouseEnter={lang.enter} onMouseLeave={lang.leave}>
              {(Object.entries(langLabels) as [Language, string][]).map(([code, label]) => (
                <DropdownMenuItem key={code} onClick={() => setLanguage(code)}>
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile menu button */}
        <button className="text-foreground md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <a href="/" onClick={() => setMobileOpen(false)} className="text-left text-sm text-foreground/80">Home</a>
            <a href="/quienes-somos" onClick={() => setMobileOpen(false)} className="text-left text-sm text-foreground/80">{t('nav.about')}</a>
            <button onClick={() => scrollTo('services')} className="text-left text-sm text-foreground/80">{t('nav.services')}</button>
            <button onClick={() => scrollTo('services')} className="text-left text-sm text-foreground/80">{t('nav.consulting')}</button>
            <button onClick={() => scrollTo('contact')} className="text-left text-sm text-foreground/80">{t('nav.contact')}</button>
            <div className="flex gap-2 pt-2">
              {(Object.entries(langLabels) as [Language, string][]).map(([code, label]) => (
                <button
                  key={code}
                  onClick={() => { setLanguage(code); setMobileOpen(false); }}
                  className={`rounded border px-2 py-1 text-xs ${language === code ? 'border-primary text-primary' : 'border-border text-foreground/60'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
