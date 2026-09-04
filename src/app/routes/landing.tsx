import { Head } from '@/components/seo';
import {
  AudienceSection,
  ContactSection,
  HeroSection,
  MissionSection,
  ServicesSection,
  SiteFooter,
  SiteNav,
  WhyUsSection,
} from '@/features/marketing/components';

const LandingRoute = () => {
  return (
    <div className="kora-scope bg-kora-cream font-body text-kora-text antialiased">
      <Head
        title="Agence de communication à Dakar"
        description="KoraCom accompagne institutions, entreprises et organisations : événementiel, branding, production audiovisuelle et communication digitale."
      />

      <a
        href="#contenu"
        className="sr-only z-[80] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-sm focus:bg-kora-copper focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-kora-ink"
      >
        Aller au contenu
      </a>

      <SiteNav />

      <main id="contenu">
        <HeroSection />
        <MissionSection />
        <ServicesSection />
        <WhyUsSection />
        <AudienceSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
};

export default LandingRoute;
