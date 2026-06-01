import { visit } from 'unist-util-visit';
import type { Heading } from 'mdast';

function sluggify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function remarkHeadingId() {
  return (tree: any) => {
    visit(tree, 'heading', (node: Heading) => {
      let text = '';
      const collectText = (nodes: any[]) => {
        for (const child of nodes) {
          if (child.type === 'text') text += child.value;
          else if (child.children) collectText(child.children);
        }
      };
      collectText(node.children);

      const id = sluggify(text);
      if (id) {
        node.data = node.data || {};
        node.data.hProperties = { id };
      }
    });
  };
}