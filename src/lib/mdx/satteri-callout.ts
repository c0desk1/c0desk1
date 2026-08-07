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

type CalloutType = keyof typeof CALLOUT_TYPES;


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

function transformToAside(node: any, type: string): any {
  return {
    ...node,
    data: {
      ...(node.data || {}),
      hName: 'aside',
      hProperties: {
        ...(node.data?.hProperties || {}),
        className: ['callout'],
        dataCallout: type,
      },
    },
  };
}

export const satteriCallout = defineMdastPlugin({
  name: 'satteri-callout',

  blockquote(node, ctx) {
    const firstChild = node.children[0];
    if (!firstChild || firstChild.type !== 'paragraph') return;

    const firstText = firstChild.children[0];
    if (!firstText || firstText.type !== 'text') return;

    const match = firstText.value.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|DANGER)\]\s*/i);
    if (!match) return;

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

    const newNode = {
      ...node,
      children: [newParagraph, ...node.children.slice(1)],
      data: {
        ...node.data,
        hProperties: {
          ...node.data?.hProperties,
          dataCallout: type,
        },
      },
    };

    ctx.replaceNode(node, newNode);
  },

  containerDirective(node, ctx) {
    const name = node.name?.toLowerCase();
    if (!name || !(name in CALLOUT_TYPES)) {
      return;
    }

    const type = CALLOUT_TYPES[name as keyof typeof CALLOUT_TYPES];
    const transformed = transformToAside(node, type);
    ctx.setProperty(node, 'data', transformed.data);
  },
});