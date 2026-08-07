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

const CALLOUT_PATTERN = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|DANGER)\]\s*/i;

export const satteriCallout = defineMdastPlugin({
  name: 'satteri-callout',

  blockquote(node, ctx) {
    const firstChild = node.children[0];
    if (!firstChild || firstChild.type !== 'paragraph') {
      return;
    }

    const firstText = firstChild.children[0];
    if (!firstText || firstText.type !== 'text') {
      return;
    }

    const match = firstText.value.match(CALLOUT_PATTERN);
    if (!match) {
      return;
    }

    const rawType = match[1].toUpperCase() as CalloutType;
    const type = CALLOUT_TYPES[rawType];

    const remainingText = firstText.value.slice(match[0].length);
    const newChildren = [...firstChild.children];

    if (remainingText) {
      newChildren[0] = { ...firstText, value: remainingText };
    } else {
      newChildren.shift();
    }

    const newParagraph = { ...firstChild, children: newChildren };

    ctx.setProperty(node, 'children', [
      newParagraph,
      ...node.children.slice(1),
    ]);

    const baseData = node.data || {};
    ctx.setProperty(node, 'data', {
      ...baseData,
      hName: 'aside',
      hProperties: {
        ...(baseData.hProperties || {}),
        className: ['callout'],
        'data-callout': type,
      },
    });
  },
});
