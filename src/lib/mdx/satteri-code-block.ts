// src/lib/mdx/satteri-code-block.ts
import { defineMdastPlugin } from 'satteri';

export const satteriCodeBlock = defineMdastPlugin({
  name: 'satteri-code-block',
  containerDirective(node: any, ctx: any) {
    if (node.name !== 'code') return;
    let codeNode = null;
    for (const child of node.children) {
      if (child.type === 'code') {
        codeNode = child;
        break;
      }
    }
    if (!codeNode) return;

    const component: any = {
      type: 'mdxJsxFlowElement',
      name: 'Code',
      attributes: [],
      children: [codeNode],
    };
    ctx.replaceNode(node, component);
  },
});