import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

function sluggify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const remarkHeadingAnchor: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      const text = node.children
        .filter((c) => c.type === 'text')
        .map((c) => (c as any).value)
        .join('');

      const id = sluggify(text);
      if (!node.data) node.data = {};
      node.data.hProperties = {
        id,
        'data-level': String(node.depth),
      };
    });
  };
};

export default remarkHeadingAnchor;