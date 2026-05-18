// src/plugins/remark-details.ts
import type { Root } from 'mdast';
import type { Plugin } from 'unified';

const remarkDetails: Plugin<[], Root> = () => {
  return (tree) => {
    const children = tree.children;
    let i = 0;

    while (i < children.length) {
      const node = children[i];

      if (node.type === 'paragraph') {
        const textNodes = node.children.filter(
          (c): c is { type: 'text'; value: string } => c.type === 'text'
        );
        if (textNodes.length === 0) {
          i++;
          continue;
        }

        const fullText = textNodes.map(t => t.value).join('').replace(/\r/g, '');
        const singleMatch = fullText.match(
          /^:::\s*details(?:[^\S\n]+(.+?))?[^\S\n]*\n([\s\S]*?)\n:::\s*$/
        );
        if (singleMatch) {
          const summary = singleMatch[1] || 'Details';
          const innerText = singleMatch[2].trim();

          const innerParagraph = {
            type: 'paragraph',
            children: [{ type: 'text', value: innerText }],
          };

          const mdxNode: any = {
            type: 'mdxJsxFlowElement',
            name: 'Details',
            attributes: [
              { type: 'mdxJsxAttribute', name: 'summary', value: summary },
            ],
            children: [innerParagraph],
          };

          children.splice(i, 1, mdxNode);
          i++;
          continue;
        }

        const openMatch = fullText.match(/^:::\s*details(?:\s+(.+?))?\s*$/);
        if (openMatch) {
          const summary = openMatch[1] || 'Details';
          let j = i + 1;
          while (j < children.length) {
            const closeNode = children[j];
            if (
              closeNode.type === 'paragraph' &&
              closeNode.children.length === 1 &&
              closeNode.children[0].type === 'text' &&
              /^:::\s*$/.test((closeNode.children[0] as any).value)
            ) {
              break;
            }
            j++;
          }

          if (j < children.length) {
            const innerNodes = children.slice(i + 1, j);
            const mdxNode: any = {
              type: 'mdxJsxFlowElement',
              name: 'Details',
              attributes: [
                { type: 'mdxJsxAttribute', name: 'summary', value: summary },
              ],
              children: innerNodes,
            };
            children.splice(i, j - i + 1, mdxNode);
            i++;
            continue;
          }
        }
      }
      i++;
    }
  };
};

export default remarkDetails;