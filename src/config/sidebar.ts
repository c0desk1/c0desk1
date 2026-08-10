export const SIDEBAR_CATEGORIES = [
  'Getting Started',
  'Components',
  'API',
  'Uncategorized',
] as const;

export type SidebarCategory = (typeof SIDEBAR_CATEGORIES)[number];

export const SIDEBAR_CONFIG: Array<{ category: SidebarCategory; label: string }> = [
  { category: 'Getting Started', label: 'Getting Started' },
  { category: 'Components', label: 'Komponen' },
  { category: 'API', label: 'API Reference' },
  { category: 'Uncategorized', label: 'Lainnya' },
];
