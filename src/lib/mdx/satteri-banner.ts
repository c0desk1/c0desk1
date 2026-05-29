// src/lib/mdx/satteri-banner.ts
import { defineMdastPlugin } from 'satteri';

function collectText(nodes: any[]): string {
  let text = '';
  for (const node of nodes) {
    if (node.type === 'text') text += node.value;
    else if (node.children) text += collectText(node.children);
  }
  return text.trim();
}

export const satteriBanner = defineMdastPlugin({
  name: 'satteri-banner',
  containerDirective(node: any, ctx: any) {
    if (node.name !== 'banner') return;

    let title = '';
    let icon = '';
    let description = '';
    const links: { label: string; url: string }[] = [];

    for (const child of node.children || []) {
      if (child.type === 'paragraph') {
        for (const sub of child.children) {
          if (sub.type === 'textDirective') {
            if (sub.name === 'icons') {
              const textNode = sub.children?.find((c: any) => c.type === 'text');
              if (textNode) icon = textNode.value;
            } else if (sub.name === 'title') {
              const textNode = sub.children?.find((c: any) => c.type === 'text');
              if (textNode) title = textNode.value;
            }
          } else if (sub.type === 'link') {
            const label = collectText(sub.children);
            const url = sub.url;
            if (label && url) links.push({ label, url });
          } else if (sub.type === 'text') {
            description += sub.value + ' ';
          }
        }
      } else if (child.type === 'text') {
        description += child.value + ' ';
      }
    }

    description = description.trim().replace(/\s+/g, ' ');

    const component: any = {
      type: 'mdxJsxFlowElement',
      name: 'Banner',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'title', value: title },
        { type: 'mdxJsxAttribute', name: 'icon', value: icon },
        { type: 'mdxJsxAttribute', name: 'description', value: description },
        { type: 'mdxJsxAttribute', name: 'links', value: JSON.stringify(links) },
      ],
      children: [],
    };
    ctx.replaceNode(node, component);
  },
});