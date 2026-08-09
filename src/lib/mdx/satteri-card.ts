// src/lib/mdx/satteri-card.ts
import { defineMdastPlugin } from 'satteri';

function getLabel(node: any): string {
  const firstChild = node.children?.[0];
  if (firstChild?.type === 'paragraph' && firstChild.data?.directiveLabel) {
    return firstChild.children.map((c: any) => c.value || '').join('').trim();
  }
  return '';
}

function getAttributes(node: any): Record<string, string> {
  const props = node.attributes || {};
  const attrs: Record<string, string> = {};
  if (props.icon) attrs.icon = props.icon;
  if (props.href) attrs.href = props.href;
  if (props.class) attrs.class = props.class;
  return attrs;
}

export const satteriCard = defineMdastPlugin({
  name: 'satteri-card',

  containerDirective(node, ctx) {
    if (node.name !== 'card') return;

    const label = getLabel(node);
    const attrs = getAttributes(node);
    const hasIcon = !!attrs.icon;
    const hasHref = !!attrs.href;
    const extraClass = attrs.class || '';

    let children = node.children || [];

    // Hapus paragraf pertama jika itu directiveLabel
    const firstNode = children[0];
    if (firstNode?.type === 'paragraph' && firstNode.data?.directiveLabel) {
      children = children.slice(1);
    }

    // ===== BUILD HEADER =====
    const headerChildren: any[] = [];

    if (hasIcon) {
      headerChildren.push({
        type: 'containerDirective',
        data: {
          hName: 'span',
          hProperties: {
            className: ['card-icon'],
            'data-icon': attrs.icon,
          },
        },
        children: [],
      });
    }

    if (label) {
      headerChildren.push({
        type: 'text',
        value: label,
      });
    }

    const headerNode = {
      type: 'containerDirective',
      data: {
        hName: 'div',
        hProperties: {
          className: ['card-header'],
        },
      },
      children: headerChildren,
    };

    // ===== BUILD BODY =====
    const bodyNode = {
      type: 'containerDirective',
      data: {
        hName: 'div',
        hProperties: {
          className: ['card-body'],
        },
      },
      children: children,
    };

    // ===== BUILD CARD =====
    const cardChildren = [headerNode, bodyNode];
    const cardClasses = ['card', extraClass].filter(Boolean).join(' ');

    // Jika ada href, bungkus dengan <a>
    if (hasHref) {
      ctx.setProperty(node, 'data', {
        ...(node.data || {}),
        hName: 'a',
        hProperties: {
          href: attrs.href,
          className: ['card-link', cardClasses].filter(Boolean).join(' '),
          target: attrs.href.startsWith('http') ? '_blank' : '_self',
          rel: attrs.href.startsWith('http') ? 'noopener noreferrer' : undefined,
        },
      });
    } else {
      ctx.setProperty(node, 'data', {
        ...(node.data || {}),
        hName: 'div',
        hProperties: {
          className: cardClasses,
        },
      });
    }

    ctx.setProperty(node, 'children', cardChildren);
  },
});