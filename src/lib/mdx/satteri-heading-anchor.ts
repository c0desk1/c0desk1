// src/lib/mdx/satteri-heading-anchor.ts
import { defineMdastPlugin } from 'satteri';
import type { Heading } from 'mdast';

function sluggify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export const satteriHeadingAnchor = defineMdastPlugin({
  name: 'satteri-heading-anchor',
  heading(node: Heading, ctx) {
    let text = '';
    const collectText = (nodes: any[]) => {
      for (const child of nodes) {
        if (child.type === 'text') text += child.value;
        else if (child.children) collectText(child.children);
      }
    };
    collectText(node.children);
    
    const id = sluggify(text);
    if (!id) return;

    const component: any = {
      type: 'mdxJsxFlowElement',
      name: 'Heading',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'id', value: id },
        { type: 'mdxJsxAttribute', name: 'data-level', value: String(node.depth) },
      ],
      children: node.children,
    };
    ctx.replaceNode(node, component);
  },
});