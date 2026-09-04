import { contactInfo } from '../data/contact-info';
import { navLinks } from '../data/nav-links';

export const SiteFooter = () => (
  <footer className="bg-kora-ink text-kora-sand/70">
    <div className="mx-auto flex max-w-shell flex-col items-center gap-4 px-section-x py-[clamp(2.5rem,6vh,3.5rem)] text-center">
      <nav aria-label="Pied de page">
        <ul className="flex flex-wrap justify-center gap-x-7 gap-y-1">
          {[...navLinks, { href: '#contact', label: 'Contact' }].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="flex min-h-[44px] items-center text-[15px] text-kora-sand/80 transition-colors duration-200 ease-out-expo hover:text-kora-copper"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="text-[14.5px]">
        {contactInfo.shortName} · {contactInfo.role} · {contactInfo.location}
      </p>
    </div>
  </footer>
);
