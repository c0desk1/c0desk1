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

function renderChildren(children: any[]): string {
  if (!Array.isArray(children)) return '';
  return children
    .map((child) => {
      if (child.type === 'text') {
        return child.value || '';
      }
      if (child.type === 'paragraph') {
        const inner = (child.children || []).map((c: any) => c.value || '').join('');
        return `<p>${inner}</p>`;
      }
      if (child.type === 'strong') {
        const inner = (child.children || []).map((c: any) => c.value || '').join('');
        return `<strong>${inner}</strong>`;
      }
      if (child.type === 'emphasis') {
        const inner = (child.children || []).map((c: any) => c.value || '').join('');
        return `<em>${inner}</em>`;
      }
      if (child.type === 'inlineCode') {
        return `<code>${child.value || ''}</code>`;
      }
      if (child.type === 'link') {
        const inner = (child.children || []).map((c: any) => c.value || '').join('');
        return `<a href="${child.url || '#'}">${inner}</a>`;
      }
      if (child.type === 'list') {
        const isOrdered = child.ordered === true;
        const tag = isOrdered ? 'ol' : 'ul';
        const items = (child.children || [])
          .map((li: any) => {
            const liContent = (li.children || [])
              .map((c: any) => {
                if (c.type === 'paragraph') {
                  return `<p>${(c.children || []).map((cc: any) => cc.value || '').join('')}</p>`;
                }
                return c.value || '';
              })
              .join('');
            return `<li>${liContent}</li>`;
          })
          .join('');
        return `<${tag}>${items}</${tag}>`;
      }
      return child.value || '';
    })
    .join('');
}

export const satteriCard = defineMdastPlugin({
  name: 'satteri-card',

  containerDirective(node, ctx) {
    if (node.name !== 'card') return;

    const label = getLabel(node);
    const attrs = getAttributes(node);
    const hasIcon = !!attrs.icon;
    const hasLabel = !!label;
    const hasHref = !!attrs.href;
    const extraClass = attrs.class || '';

    let children = node.children || [];

    const firstNode = children[0];
    if (firstNode?.type === 'paragraph' && firstNode.data?.directiveLabel) {
      children = children.slice(1);
    }

    const cardClasses = ['card'];
    if (!hasLabel) cardClasses.push('card-no-title');
    if (!hasIcon) cardClasses.push('card-no-icon');
    if (extraClass) cardClasses.push(extraClass);

    let headerHtml = '';
    if (hasIcon || hasLabel) {
      const iconHtml = hasIcon
        ? `<span class="card-icon-wrapper"><span class="card-icon" data-icon="${attrs.icon}"></span></span>`
        : '';
      const labelHtml = hasLabel
        ? `<div class="card-title">${label}</div>`
        : '';
      headerHtml = `<div class="card-header">${iconHtml}${labelHtml}</div>`;
    }

    const bodyContent = renderChildren(children);
    const bodyHtml = bodyContent ? `<div class="card-body">${bodyContent}</div>` : '';

    let cardHtml = `<div class="${cardClasses.join(' ')}">${headerHtml}${bodyHtml}</div>`;

    if (hasHref) {
      cardHtml = `<a href="${attrs.href}" class="card-link" target="${attrs.href.startsWith('http') ? '_blank' : '_self'}" rel="${attrs.href.startsWith('http') ? 'noopener noreferrer' : ''}">${cardHtml}</a>`;
    }

    ctx.replaceNode(node, {
      type: 'html',
      value: cardHtml,
    });
  },
});
