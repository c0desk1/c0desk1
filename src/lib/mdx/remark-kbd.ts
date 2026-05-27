// src/plugins/remark-kbd.ts
import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const remarkKbd: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'text', (node: any, index, parent) => {
      if (!parent || index === undefined) return;

      const value: string = node.value;
      // Regex: || (spasi opsional) teks (spasi opsional) ||
      const regex = /\|\|\s*(.+?)\s*\|\|/g;
      const newNodes: any[] = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(value)) !== null) {
        if (match.index > lastIndex) {
          newNodes.push({
            type: 'text',
            value: value.substring(lastIndex, match.index),
          });
        }

        // Sisipkan komponen <Kbd keys="...">
        newNodes.push({
          type: 'mdxJsxTextElement',
          name: 'kbd',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'keys', value: match[1].trim() },
          ],
          children: [],
        });

        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < value.length) {
        newNodes.push({
          type: 'text',
          value: value.substring(lastIndex),
        });
      }

      if (newNodes.length > 1) {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
};

export default remarkKbd;