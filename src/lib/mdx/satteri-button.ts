// src/lib/mdx/satteri-button.ts
import { defineMdastPlugin } from 'satteri';

function getLabel(node: any): string {
  const labelNode = node.children?.[0];
  if (labelNode?.type === 'text') {
    return labelNode.value.trim();
  }
  return '';
}

function getAttributes(node: any): Record<string, string> {
  const props = node.attributes || {};
  const attrs: Record<string, string> = {};
  if (props.url) attrs.url = props.url;
  if (props.label) attrs.label = props.label;
  if (props.icon) attrs.icon = props.icon;
  if (props.block !== undefined) attrs.block = 'true';
  return attrs;
}

export const satteriButton = defineMdastPlugin({
  name: 'satteri-button',

  // ===== LEAF DIRECTIVE: ::button =====
  leafDirective(node, ctx) {
    if (node.name !== 'button') return;

    const label = getLabel(node);
    const attrs = getAttributes(node);

    const url = attrs.url || label;
    if (!url) return;

    const buttonLabel = attrs.label || (label !== url ? label : 'Kunjungi');
    const isBlock = attrs.block === 'true';
    const blockClass = isBlock ? ' button-block' : '';

    const children: any[] = [];

    if (attrs.icon) {
      children.push({
        type: 'containerDirective',
        data: {
          hName: 'span',
          hProperties: {
            className: ['button-icon'],
            'data-icon': attrs.icon,
          },
        },
        children: [],
      });
    }

    children.push({
      type: 'text',
      value: buttonLabel,
    });

    ctx.setProperty(node, 'data', {
      ...(node.data || {}),
      hName: 'a',
      hProperties: {
        href: url,
        className: ['button', blockClass].filter(Boolean).join(' '),
        target: url.startsWith('http') ? '_blank' : '_self',
        rel: url.startsWith('http') ? 'noopener noreferrer' : undefined,
      },
    });

    ctx.setProperty(node, 'children', children);
  },

  // ===== CONTAINER DIRECTIVE: :::button =====
  containerDirective(node, ctx) {
    if (node.name !== 'button') return;

    const firstChild = node.children?.[0];
    let label = '';
    if (firstChild?.type === 'paragraph' && firstChild.data?.directiveLabel) {
      label = firstChild.children.map((c: any) => c.value || '').join('').trim();
    }

    const attrs = getAttributes(node);

    const url = attrs.url || label;
    if (!url) return;

    const buttonLabel = attrs.label || (label !== url ? label : 'Kunjungi');
    const isBlock = attrs.block === 'true';
    const blockClass = isBlock ? ' button-block' : '';

    const children: any[] = [];

    if (attrs.icon) {
      children.push({
        type: 'containerDirective',
        data: {
          hName: 'span',
          hProperties: {
            className: ['button-icon'],
            'data-icon': attrs.icon,
          },
        },
        children: [],
      });
    }

    children.push({
      type: 'text',
      value: buttonLabel,
    });

    ctx.setProperty(node, 'data', {
      ...(node.data || {}),
      hName: 'a',
      hProperties: {
        href: url,
        className: ['button', blockClass].filter(Boolean).join(' '),
        target: url.startsWith('http') ? '_blank' : '_self',
        rel: url.startsWith('http') ? 'noopener noreferrer' : undefined,
      },
    });

    ctx.setProperty(node, 'children', children);
  },
});