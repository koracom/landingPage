import * as React from 'react';

import logo from '@/assets/koracom-logo.svg';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';

import { navLinks } from '../data/nav-links';
import { focusContactForm } from '../utils/focus-contact-form';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);

  useLockBodyScroll(isOpen);

  React.useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const node = dialogRef.current;
    node?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !node) return;

      // Piege le focus a l'interieur du menu tant qu'il est ouvert.
      const focusables = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
      className="fixed inset-0 z-[70] flex flex-col bg-kora-ink px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-5 sm:px-8 sm:pt-8 lg:hidden"
    >
      <div className="flex h-14 items-center justify-between">
        <img
          src={logo}
          alt=""
          width={676}
          height={319}
          className="h-[34px] w-auto"
        />
        <button
          type="button"
          onClick={onClose}
          className="-mr-3 p-3 text-xs tracking-[0.2em] text-kora-copper"
        >
          FERMER
        </button>
      </div>

      <nav aria-label="Menu" className="my-auto flex flex-col gap-2.5">
        {navLinks.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="animate-ko-stair py-1 font-display text-[clamp(2rem,9vw,3rem)] leading-[1.12] text-kora-sand"
            style={{ animationDelay: `${40 + index * 80}ms` }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        onClick={() => {
          onClose();
          focusContactForm();
        }}
        className="flex min-h-[56px] animate-ko-stair items-center justify-center rounded-sm border border-kora-copper px-5 text-xs uppercase tracking-[0.18em] text-kora-copper"
        style={{ animationDelay: '280ms' }}
      >
        Nous contacter
      </a>
    </div>
  );
};
