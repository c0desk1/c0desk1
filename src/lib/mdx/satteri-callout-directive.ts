// src/lib/mdx/satteri-callout.ts
import { defineMdastPlugin } from 'satteri';

const CALLOUT_TYPES = {
  NOTE: 'note',
  TIP: 'tip',
  IMPORTANT: 'important',
  WARNING: 'warning',
  CAUTION: 'caution',
  DANGER: 'danger',
} as const;

type CalloutType = keyof typeof CALLOUT_TYPES;

export const satteriCalloutDirective = defineMdastPlugin({
  name: 'satteri-callout',

  containerDirective(node, ctx) {
    const name = node.name?.toUpperCase();
    if (!name || !(name in CALLOUT_TYPES)) {
      return;
    }

    const type = CALLOUT_TYPES[name as CalloutType];
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