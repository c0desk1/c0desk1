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

export const satteriCalloutDirective = defineMdastPlugin({
  name: 'satteri-callout',

  containerDirective(node, ctx) {
    const rawName = node.name?.toLowerCase() || '';
    
    if (!(rawName in CALLOUT_TYPES)) {
      return;
    }

    const type = CALLOUT_TYPES[rawName as keyof typeof CALLOUT_TYPES];
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