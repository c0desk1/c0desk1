// src/plugins/remark-footnotes.ts
import type { Root, FootnoteDefinition } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

// Fungsi rekursif untuk mengambil teks dari berbagai tipe node
function getTextContent(node: any): string {
  if (node.type === 'text') return node.value;
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(getTextContent).join('');
  }
  return '';
}

const remarkFootnotes: Plugin<[], Root> = () => {
  return (tree) => {
    const definitions = new Map<string, FootnoteDefinition>();

    visit(tree, 'footnoteDefinition', (node) => {
      definitions.set(node.identifier, node);
    });

    if (definitions.size === 0) return;

    // Hapus footnoteDefinition bawaan
    tree.children = tree.children.filter(
      (c) => c.type !== 'footnoteDefinition'
    );

    // Buat array items
    const items: { id: string; content: string }[] = [];
    definitions.forEach((def, id) => {
      // Ambil semua teks dari children (bisa paragraph, link, dll.)
      const textContent = def.children
        .map(getTextContent)
        .join(' ')
        .trim();
      items.push({ id, content: textContent });
    });

    // Buat node <Footnotes items={...} />
    const mdxNode: any = {
      type: 'mdxJsxFlowElement',
      name: 'Footnotes',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'items',
          value: {
            type: 'mdxJsxAttributeValueExpression',
            value: JSON.stringify(items),
          },
        },
      ],
      children: [],
    };

    tree.children.push(mdxNode);
  };
};

export default remarkFootnotes;