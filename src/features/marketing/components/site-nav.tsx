import logo from '@/assets/koracom-logo.svg';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useScrolled } from '@/hooks/use-scrolled';
import { cn } from '@/utils/cn';

import { navLinks } from '../data/nav-links';
import { focusContactForm } from '../utils/focus-contact-form';

import { MobileMenu } from './mobile-menu';

export const SiteNav = () => {
  const scrolled = useScrolled();
  const { isOpen, close, toggle } = useDisclosure();

  return (
    <>
      <nav
        aria-label="Navigation principale"
        className={cn(
          'fixed inset-x-0 top-0 z-[60] border-b transition-colors duration-300 ease-out-expo',
          scrolled
            ? 'border-kora-copper/20 bg-kora-ink/95 backdrop-blur'
            : 'border-transparent bg-transparent',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-shell items-center justify-between gap-6 px-section-x transition-[height] duration-300 ease-out-expo',
            scrolled ? 'h-16' : 'h-[84px]',
          )}
        >
          <a
            href="#haut"
            aria-label="KoraCom, retour en haut de page"
            className="shrink-0"
          >
            <img
              src={logo}
              alt="KoraCom"
              width={676}
              height={319}
              className={cn(
                'w-auto transition-[height] duration-300 ease-out-expo',
                scrolled ? 'h-[30px]' : 'h-[38px]',
              )}
            />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[15px] text-kora-sand/85 transition-opacity duration-200 ease-out-expo hover:text-kora-sand hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={focusContactForm}
              className="whitespace-nowrap rounded-sm border border-kora-copper px-5 py-3 text-xs uppercase leading-none tracking-[0.16em] text-kora-copper transition-colors duration-200 ease-out-expo hover:bg-kora-copper hover:text-kora-ink"
            >
              Nous contacter
            </a>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            className="-mr-2 flex size-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className="block h-px w-6 bg-kora-sand" />
            <span className="block h-px w-6 bg-kora-sand" />
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={isOpen} onClose={close} />
    </>
  );
};
