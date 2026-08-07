// src/lib/mdx/satteri-accordion.ts
import { defineMdastPlugin } from 'satteri';

function extractText(node: any): string {
  if (!node) return '';
  if (typeof node.value === 'string') return node.value;
  if (Array.isArray(node.children)) {
    return node.children.map(extractText).join('');
  }
  return '';
}

function getLabel(node: any): string {
  const attributes = node.attributes;
  if (typeof attributes?.label === 'string') {
    const label = attributes.label.trim();
    if (label) return label;
  }

  const children = node.children || [];
  const firstNode = children[0];
  if (
    firstNode?.type === 'paragraph' &&
    firstNode.data?.directiveLabel
  ) {
    const label = extractText(firstNode).trim();
    if (label) return label;
  }

  return 'Klik untuk membuka';
}

export const satteriAccordion = defineMdastPlugin({
  name: 'satteri-accordion',

  containerDirective(node, ctx) {
    const name = node.name?.toLowerCase();
    if (name !== 'details' && name !== 'accordion') {
      return;
    }

    const label = getLabel(node);

    let children = node.children || [];

    const firstNode = children[0];
    if (
      firstNode?.type === 'paragraph' &&
      firstNode.data?.directiveLabel
    ) {
      children = children.slice(1);
    }

    ctx.setProperty(node, 'data', {
      ...(node.data || {}),
      hName: 'details',
      hProperties: {
        ...(node.data?.hProperties || {}),
        className: ['accordion'],
      },
    });

    const summaryNode = {
      type: 'paragraph',
      data: {
        hName: 'summary',
        hProperties: {
          className: ['accordion-summary'],
        },
      },
      children: [
        {
          type: 'text',
          value: label,
        },
      ],
    };
    const contentNode = {
      type: 'containerDirective',
      data: {
        hName: 'div',
        hProperties: {
          className: ['accordion-content'],
        },
      },
      children: children,
    };

    ctx.setProperty(node, 'children', [summaryNode, contentNode] as any);
  },
});
