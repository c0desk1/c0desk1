// src/plugins/remark-badge.ts
import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const remarkBadge: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === undefined) return;

      const value = (node as any).value as string;
      const regex = /(?<!\!)\[([^\]]+)\]/g;
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

        newNodes.push({
          type: 'mdxJsxTextElement',
          name: 'Badge',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'text', value: match[1] },
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

export default remarkBadge;
