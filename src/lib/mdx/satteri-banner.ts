// src/lib/mdx/satteri-banner.ts
import { defineMdastPlugin } from 'satteri';

function extractTextFromChildren(nodes: any[]): string {
  let text = '';
  for (const node of nodes) {
    if (node.type === 'text') text += node.value;
    else if (node.children) text += extractTextFromChildren(node.children);
  }
  return text.trim();
}

export const satteriBanner = defineMdastPlugin({
  name: 'satteri-banner',
  containerDirective(node: any, ctx: any) {
    if (node.name !== 'banner') return;

    let icon = '';
    let title = '';
    let description = '';
    const links: { url: string; label: string }[] = [];

    const newChildren: any[] = [];
    for (const child of node.children || []) {
      if (child.type === 'paragraph') {
        for (const sub of child.children) {
          if (sub.type === 'textDirective') {
            if (sub.name === 'ikon') {
              const url = sub.children?.[0]?.value || '';
              if (url) icon = url;
            } else if (sub.name === 'title') {
              title = sub.children?.[0]?.value || '';
            } else if (sub.name === 'button') {
              let label = '';
              let url = '';
              if (sub.children?.[0]?.type === 'text') label = sub.children[0].value;
              if (sub.attributes) {
                const hrefAttr = sub.attributes.find((a: any) => a.name === 'href');
                if (hrefAttr && hrefAttr.value) url = hrefAttr.value;
              }
              if (label && url) links.push({ label, url });
            }
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