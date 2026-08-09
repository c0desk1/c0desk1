// src/lib/mdx/satteri-grid.ts
import { defineMdastPlugin } from 'satteri';

function getAttributes(node: any): Record<string, string> {
  const props = node.attributes || {};
  const attrs: Record<string, string> = {};
  if (props.cols) attrs.cols = props.cols;
  if (props.gap) attrs.gap = props.gap;
  if (props.class) attrs.class = props.class;
  return attrs;
}

export const satteriGrid = defineMdastPlugin({
  name: 'satteri-grid',

  containerDirective(node, ctx) {
    const name = node.name?.toLowerCase();

    if (name === 'grid') {
      const attrs = getAttributes(node);
      const cols = attrs.cols || '2';
      const gap = attrs.gap || '4';
      const extraClass = attrs.class || '';

      const className = ['grid', `grid-cols-${cols}`, `gap-${gap}`, extraClass]
        .filter(Boolean)
        .join(' ');

      ctx.setProperty(node, 'data', {
        ...(node.data || {}),
        hName: 'div',
        hProperties: {
          className: className,
        },
      });

      return;
    }

    if (name === 'col') {
      ctx.setProperty(node, 'data', {
        ...(node.data || {}),
        hName: 'div',
        hProperties: {
          className: ['col'],
        },
      });

      return;
    }
  },
});
