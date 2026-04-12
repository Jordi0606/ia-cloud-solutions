import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const langLabels: Record<Language, string> = { ca: 'Català', es: 'Castellano', en: 'English' };
type DesktopMenu = 'about' | 'services' | 'consulting' | 'contact' | 'language';

const desktopTriggerClass = 'flex items-center gap-1 text-sm font-medium text-foreground/80 transition hover:text-primary';
const desktopPanelClass = 'absolute left-0 top-full z-50 mt-2 min-w-[12rem] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md';
const desktopItemClass = 'block w-full rounded-sm px-2 py-1.5 text-left text-sm text-foreground/80 transition hover:bg-accent hover:text-accent-foreground';
const languageTriggerClass = 'flex items-center gap-1 rounded border border-border px-2 py-1 text-xs font-medium text-foreground/80 transition hover:border-primary';

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<DesktopMenu | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const desktopNavRef = useRef<HTMLElement | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }, []);

  const closeDesktopMenus = useCallback(() => {
    clearCloseTimeout();
    setOpenMenu(null);
  }, [clearCloseTimeout]);

  const openDesktopMenu = useCallback((menu: DesktopMenu) => {
    clearCloseTimeout();
    setSearchOpen(false);
    setOpenMenu(menu);
  }, [clearCloseTimeout]);

  const toggleDesktopMenu = useCallback((menu: DesktopMenu) => {
    clearCloseTimeout();
    setSearchOpen(false);
    setOpenMenu((current) => (current === menu ? null : menu));
  }, [clearCloseTimeout]);

  const scheduleMenuClose = useCallback(() => {
    clearCloseTimeout();
    closeTimeout.current = setTimeout(() => {
      setOpenMenu(null);
      closeTimeout.current = null;
    }, 120);
  }, [clearCloseTimeout]);

  const navigateTo = useCallback((pathname: string, sectionId?: string) => {
    closeDesktopMenus();
    setSearchOpen(false);
    setMobileOpen(false);

    const target = sectionId ? `${pathname}#${sectionId}` : pathname;
    const current = `${location.pathname}${location.hash}`;

    if (target === current) {
      if (sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    navigate(target);
  }, [closeDesktopMenus, location.hash, location.pathname, navigate]);

  const handleLanguageChange = (code: Language) => {
    setLanguage(code);
    closeDesktopMenus();
    setMobileOpen(false);
  };

  useEffect(() => () => clearCloseTimeout(), [clearCloseTimeout]);

  useEffect(() => {
    if (!openMenu) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!desktopNavRef.current?.contains(event.target as Node)) {
        closeDesktopMenus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [openMenu, closeDesktopMenus]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <button type="button" onClick={() => navigateTo('/')} className="flex items-center gap-2">
          <img src="/logo-iaclowd.png" alt="IAcloWd" className="h-10" />
        </button>

        <nav ref={desktopNavRef} className="hidden items-center gap-6 md:flex">
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="text-sm font-medium text-foreground/80 transition hover:text-primary"
          >
            Home
          </button>

          <div className="relative" onMouseEnter={() => openDesktopMenu('about')} onMouseLeave={scheduleMenuClose}>
            <button
              type="button"
              className={desktopTriggerClass}
              aria-expanded={openMenu === 'about'}
              onClick={() => toggleDesktopMenu('about')}
            >
              {t('nav.about')} <ChevronDown className="h-3 w-3" />
            </button>
            {openMenu === 'about' && (
              <div className={desktopPanelClass}>
                <button type="button" onClick={() => navigateTo('/quienes-somos', 'about-mission')} className={desktopItemClass}>
                  {t('about.mission.title')}
                </button>
                <button type="button" onClick={() => navigateTo('/quienes-somos', 'about-what')} className={desktopItemClass}>
                  {t('about.what.title')}
                </button>
                <button type="button" onClick={() => navigateTo('/quienes-somos', 'about-team')} className={desktopItemClass}>
                  {t('about.team.title')}
                </button>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => openDesktopMenu('services')} onMouseLeave={scheduleMenuClose}>
            <button
              type="button"
              className={desktopTriggerClass}
              aria-expanded={openMenu === 'services'}
              onClick={() => toggleDesktopMenu('services')}
            >
              {t('nav.services')} <ChevronDown className="h-3 w-3" />
            </button>
            {openMenu === 'services' && (
              <div className={desktopPanelClass}>
                <button type="button" onClick={() => navigateTo('/', 'services')} className={desktopItemClass}>
                  {t('services.bots')}
                </button>
                <button type="button" onClick={() => navigateTo('/', 'services')} className={desktopItemClass}>
                  {t('services.automation')}
                </button>
                <button type="button" onClick={() => navigateTo('/', 'services')} className={desktopItemClass}>
                  {t('services.integration')}
                </button>
                <button type="button" onClick={() => navigateTo('/', 'services')} className={desktopItemClass}>
                  {t('services.analytics')}
                </button>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => openDesktopMenu('consulting')} onMouseLeave={scheduleMenuClose}>
            <button
              type="button"
              className={desktopTriggerClass}
              aria-expanded={openMenu === 'consulting'}
              onClick={() => toggleDesktopMenu('consulting')}
            >
              {t('nav.consulting')} <ChevronDown className="h-3 w-3" />
            </button>
            {openMenu === 'consulting' && (
              <div className={desktopPanelClass}>
                <button type="button" onClick={() => navigateTo('/', 'detail-integral')} className={desktopItemClass}>
                  {t('consulting.digital')}
                </button>
                <button type="button" onClick={() => navigateTo('/', 'detail-problems')} className={desktopItemClass}>
                  {t('consulting.strategy')}
                </button>
                <button type="button" onClick={() => navigateTo('/', 'detail-automation')} className={desktopItemClass}>
                  {t('consulting.audit')}
                </button>
                <button type="button" onClick={() => navigateTo('/', 'detail-training')} className={desktopItemClass}>
                  {t('consulting.training')}
                </button>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => openDesktopMenu('contact')} onMouseLeave={scheduleMenuClose}>
            <button
              type="button"
              className={desktopTriggerClass}
              aria-expanded={openMenu === 'contact'}
              onClick={() => toggleDesktopMenu('contact')}
            >
              {t('nav.contact')} <ChevronDown className="h-3 w-3" />
            </button>
            {openMenu === 'contact' && (
              <div className={desktopPanelClass}>
                <button type="button" onClick={() => navigateTo('/', 'contact')} className={desktopItemClass}>
                  {t('contact.form')}
                </button>
                <a
                  href="https://t.me/Reguant_Bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeDesktopMenus}
                  className={desktopItemClass}
                >
                  {t('contact.telegram')}
                </a>
                <a href="mailto:info@iaclowd.com" onClick={closeDesktopMenus} className={desktopItemClass}>
                  {t('contact.email')}
                </a>
                <a
                  href="https://calendar.app.google/WoH8WjWrXGG9CWuKA"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeDesktopMenus}
                  className={desktopItemClass}
                >
                  {t('contact.meeting')}
                </a>
              </div>
            )}
          </div>

          <div className="relative">
            {searchOpen ? (
              <Input
                autoFocus
                placeholder={t('nav.search')}
                className="h-8 w-48 bg-secondary text-sm"
                onBlur={() => setSearchOpen(false)}
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  closeDesktopMenus();
                  setSearchOpen(true);
                }}
                className="text-foreground/60 transition hover:text-primary"
                aria-label={t('nav.search')}
              >
                <Search className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="relative" onMouseEnter={() => openDesktopMenu('language')} onMouseLeave={scheduleMenuClose}>
            <button
              type="button"
              className={languageTriggerClass}
              aria-expanded={openMenu === 'language'}
              onClick={() => toggleDesktopMenu('language')}
            >
              {langLabels[language]} <ChevronDown className="h-3 w-3" />
            </button>
            {openMenu === 'language' && (
              <div className="absolute right-0 top-full z-50 mt-2 min-w-[10rem] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md">
                {(Object.entries(langLabels) as [Language, string][]).map(([code, label]) => (
                  <button key={code} type="button" onClick={() => handleLanguageChange(code)} className={desktopItemClass}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => {
            closeDesktopMenus();
            setMobileOpen(!mobileOpen);
          }}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <button type="button" onClick={() => navigateTo('/')} className="text-left text-sm text-foreground/80">Home</button>
            <button type="button" onClick={() => navigateTo('/quienes-somos')} className="text-left text-sm text-foreground/80">{t('nav.about')}</button>
            <button type="button" onClick={() => navigateTo('/', 'services')} className="text-left text-sm text-foreground/80">{t('nav.services')}</button>
            <button type="button" onClick={() => navigateTo('/', 'detail-training')} className="text-left text-sm text-foreground/80">{t('nav.consulting')}</button>
            <button type="button" onClick={() => navigateTo('/', 'contact')} className="text-left text-sm text-foreground/80">{t('nav.contact')}</button>
            <div className="flex gap-2 pt-2">
              {(Object.entries(langLabels) as [Language, string][]).map(([code, label]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code);
                    setMobileOpen(false);
                  }}
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
