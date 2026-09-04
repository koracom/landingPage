import { CalendarDays, PenTool, Smartphone, Video } from 'lucide-react';

import { type Service } from '../types';

export const services: Service[] = [
  {
    id: 'evenementiel',
    index: '01',
    title: 'Événementiel',
    description:
      'Conférences, séminaires, teambuilding, concerts, soirées, lancements de produits, et plus encore.',
    icon: CalendarDays,
  },
  {
    id: 'branding',
    index: '02',
    title: 'Communication & Branding',
    description:
      'Stratégie de communication, création de logo, identité visuelle, supports publicitaires.',
    icon: PenTool,
  },
  {
    id: 'audiovisuel',
    index: '03',
    title: 'Production Audiovisuelle',
    description:
      "Réalisation de vidéos, spots publicitaires, reportages, captation d'événements.",
    icon: Video,
  },
  {
    id: 'digital',
    index: '04',
    title: 'Digital & Réseaux Sociaux',
    description:
      'Gestion des réseaux sociaux, création de sites web, campagnes digitales.',
    icon: Smartphone,
  },
];
