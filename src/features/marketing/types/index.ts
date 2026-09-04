import { type LucideIcon } from 'lucide-react';

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Differentiator = {
  id: string;
  index: string;
  title: string;
  description: string;
};

export type Audience = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ContactSubject =
  | 'evenementiel'
  | 'branding'
  | 'audiovisuel'
  | 'digital'
  | 'autre';
