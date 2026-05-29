// src/lib/mdx/satteri-badge.ts
import { defineMdastPlugin } from 'satteri';

export const satteriBadge = defineMdastPlugin({
  name: 'satteri-badge',
  textDirective(node: any, ctx: any) {
    if (node.name !== 'badge') return;
    
    let label = '';
    if (node.children && node.children[0] && node.children[0].type === 'text') {
      label = node.children[0].value;
    }

    const component: any = {
      type: 'mdxJsxTextElement',
      name: 'Badge',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'text', value: label }
      ],
      children: [],
    };
    ctx.replaceNode(node, component);
  },
});