import { Building2, HeartHandshake, Landmark } from 'lucide-react';

import { type Audience } from '../types';

export const audiences: Audience[] = [
  {
    id: 'institutions',
    title: 'Institutions & secteur public',
    description:
      "Ministères, agences publiques, collectivités, bailleurs (PNUD, GIZ, Banque mondiale, BAD, UE). Donner de la voix à l'action publique.",
    icon: Landmark,
  },
  {
    id: 'entreprises',
    title: 'Entreprises',
    description:
      'PME et grands groupes qui veulent gagner en visibilité, en notoriété et en parts de marché.',
    icon: Building2,
  },
  {
    id: 'organisations',
    title: 'Organisations',
    description:
      "ONG, fondations et projets de développement dont les initiatives méritent d'être vues et entendues.",
    icon: HeartHandshake,
  },
];
