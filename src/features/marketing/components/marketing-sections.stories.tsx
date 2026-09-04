import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

import { AudienceSection } from './audience-section';
import { ContactSection } from './contact-section';
import { HeroSection } from './hero-section';
import { MissionSection } from './mission-section';
import { ServicesSection } from './services-section';
import { SiteFooter } from './site-footer';
import { WhyUsSection } from './why-us-section';

const queryClient = new QueryClient();

const KoraScope = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <div className="kora-scope font-body text-kora-text antialiased">
      {children}
    </div>
  </QueryClientProvider>
);

const meta: Meta = {
  title: 'Marketing/Sections',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <KoraScope>
        <Story />
      </KoraScope>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Hero: Story = { render: () => <HeroSection /> };
export const Mission: Story = { render: () => <MissionSection /> };
export const Services: Story = { render: () => <ServicesSection /> };
export const WhyUs: Story = { render: () => <WhyUsSection /> };
export const Audiences: Story = { render: () => <AudienceSection /> };
export const Contact: Story = { render: () => <ContactSection /> };
export const Footer: Story = { render: () => <SiteFooter /> };
