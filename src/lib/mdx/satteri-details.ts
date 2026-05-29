// src/lib/mdx/satteri-details.ts
import { defineMdastPlugin } from 'satteri';

export const satteriDetails = defineMdastPlugin({
  name: 'satteri-details',
  containerDirective(node: any, ctx: any) {
    if (node.name !== 'details') return;

    let summary = 'Details';
    let children = node.children || [];

    if (children.length > 0 && children[0].type === 'paragraph') {
      const para = children[0];
      for (let i = 0; i < para.children.length; i++) {
        const child = para.children[i];
        if (child.type === 'textDirective' && child.name === 'summary') {
          if (child.children && child.children[0] && child.children[0].type === 'text') {
            summary = child.children[0].value;
          }
          children = children.slice(1);
          break;
        }
      }
    }

    const component: any = {
      type: 'mdxJsxFlowElement',
      name: 'Details',
      attributes: [{ type: 'mdxJsxAttribute', name: 'summary', value: summary }],
      children: children,
    };
    ctx.replaceNode(node, component);
  },
});