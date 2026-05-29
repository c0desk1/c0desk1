// src/lib/mdx/satteri-figure.ts
import { defineMdastPlugin } from 'satteri';

export const satteriFigure = defineMdastPlugin({
  name: 'satteri-figure',
  containerDirective(node: any, ctx: any) {
    if (node.name !== 'figure') return;

    let imageNode = null;
    let captionText = '';

    for (const child of node.children || []) {
      if (child.type === 'paragraph') {
        for (const sub of child.children) {
          if (sub.type === 'image') {
            imageNode = sub;
          } else if (sub.type === 'text') {
            captionText += sub.value;
          }
        }
      }
    }

    if (!imageNode) return;

    const alt = imageNode.alt || '';
    const src = imageNode.url;
    const title = imageNode.title || '';
    const caption = captionText.trim();

    const component: any = {
      type: 'mdxJsxFlowElement',
      name: 'Figure',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'src', value: src },
        { type: 'mdxJsxAttribute', name: 'alt', value: alt },
        { type: 'mdxJsxAttribute', name: 'title', value: title },
        { type: 'mdxJsxAttribute', name: 'caption', value: caption },
      ],
      children: [],
    };
    ctx.replaceNode(node, component);
  },
});