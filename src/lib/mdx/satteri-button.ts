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
  if (props.class) attrs.class = props.class;
  return attrs;
}

export const satteriButton = defineMdastPlugin({
  name: 'satteri-button',

  leafDirective(node, ctx) {
    if (node.name !== 'button') return;
    this._buildButton(node, ctx);
  },

  containerDirective(node, ctx) {
    if (node.name !== 'button') return;
    this._buildButton(node, ctx);
  },

  textDirective(node, ctx) {
    if (node.name !== 'button') return;
    this._buildButton(node, ctx, true);
  },

  _buildButton(node: any, ctx: any, isText: boolean = false) {
    const label = getLabel(node);
    const attrs = getAttributes(node);

    const url = attrs.url || label;
    if (!url) return;

    const buttonLabel = attrs.label || (label !== url ? label : 'Kunjungi');
    const isBlock = attrs.block === 'true';
    const blockClass = isBlock ? ' button-block' : '';
    const extraClass = attrs.class || '';

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

    const finalBlockClass = isText ? '' : blockClass;

    ctx.setProperty(node, 'data', {
      ...(node.data || {}),
      hName: 'a',
      hProperties: {
        href: url,
        className: ['button', finalBlockClass, extraClass].filter(Boolean).join(' '),
        target: url.startsWith('http') ? '_blank' : '_self',
        rel: url.startsWith('http') ? 'noopener noreferrer' : undefined,
      },
    });

    ctx.setProperty(node, 'children', children);
  },
});
