// src/components/ui/icons/index.ts

import { uiIcons } from './ui';
import { brandIcons } from './brands'
import { techIcons } from './tech';
import { codeIcons } from './code';
import { fileIcons } from './file';

export type IconData = 
  | string 
  | { 
      body: string;
      viewBox?: string;
      strokeLinecap?: "butt" | "round" | "square" | "inherit";
      strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
    };

export const ICONS = {
  ...uiIcons,
  ...brandIcons,
  ...techIcons,
  ...codeIcons,
  ...fileIcons
} as const;

export type UiIcon = keyof typeof uiIcons;
export type BrandIcon = keyof typeof brandIcons;
export type TechIcon = keyof typeof techIcons;

export type IconName = UiIcon | BrandIcon | TechIcon;