import type { Root } from 'mdast';
import type { Plugin } from 'unified';

const remarkCodeBlock: Plugin<[], Root> = () => {
  return (tree) => {
    const children = tree.children;
    let i = 0;

    while (i < children.length) {
      const node = children[i];
      if (node.type !== 'paragraph') {
        i++;
        continue;
      }

      const textNodes = node.children.filter(
        (c): c is { type: 'text'; value: string } => c.type === 'text'
      );
      if (textNodes.length === 0) {
        i++;
        continue;
      }

      const fullText = textNodes.map(t => t.value).join('').replace(/\r/g, '');

      if (/^:::\s*code\s*$/i.test(fullText)) {
        const nextNode = children[i + 1];
        if (nextNode && nextNode.type === 'code') {
          const afterNode = children[i + 2];
          if (afterNode && afterNode.type === 'paragraph') {
            const afterTextNodes = afterNode.children.filter(
              (c): c is { type: 'text'; value: string } => c.type === 'text'
            );
            const afterFullText = afterTextNodes.map(t => t.value).join('').trim();
            if (/^:::\s*$/.test(afterFullText)) {
              const mdxNode: any = {
                type: 'mdxJsxFlowElement',
                name: 'Code',
                attributes: [],
                children: [nextNode],
              };
              children.splice(i, 3, mdxNode);
              continue;
            }
          }
        }
      }
      i++;
    }
  };
};

export default remarkCodeBlock;