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

export const satteriHeading = defineMdastPlugin({
  name: 'satteri-heading-anchor',
  heading(node: Heading) {
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

    node.data = node.data || {};
    node.data.hProperties = {
      id,
      'data-level': String(node.depth),
    };
  },
});