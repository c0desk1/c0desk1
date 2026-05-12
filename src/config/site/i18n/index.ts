import { id } from './id';
import { en } from './en';
import { ru } from './ru';
import { jo } from './jp';

export const i18nConfig = {
  locales: ['id', 'en', 'ru', 'jp] as const,
  defaultLocale: 'id' as const,
  labels: { id, en, ru, jp },
} as const;

export type Locale = (typeof i18nConfig.locales)[number];
export type LabelKey = keyof typeof i18nConfig.labels.id;