// src/lib/mdx/satteri-callout.ts
import { defineMdastPlugin } from 'satteri';

const CALLOUT_TYPES = {
  note: 'note',
  tip: 'tip',
  important: 'important',
  warning: 'warning',
  caution: 'caution',
  danger: 'danger',
} as const;

function cleanDirectiveName(rawName: string): string | null {
  const cleaned = rawName
    .replace(/^\[!/, '')
    .replace(/\]$/, '')
    .toLowerCase()
    .trim();

  if (cleaned in CALLOUT_TYPES) {
    return cleaned;
  }

  return null;
}

export const satteriCalloutDirective = defineMdastPlugin({
  name: 'satteri-callout',

  containerDirective(node, ctx) {
    const rawName = node.name || '';
    
    const cleanName = cleanDirectiveName(rawName);
    if (!cleanName) {
      return;
    }

    const type = CALLOUT_TYPES[cleanName as keyof typeof CALLOUT_TYPES];
    const baseData = node.data || {};

    ctx.setProperty(node, 'data', {
      ...baseData,
      hName: 'aside',
      hProperties: {
        ...(baseData.hProperties || {}),
        className: ['callout'],
        dataCallout: type,
      },
    });
  },
});