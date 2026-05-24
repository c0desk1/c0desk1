// src/plugins/remark-steps.ts
import type { Root } from 'mdast';
import type { Plugin } from 'unified';

const remarkSteps: Plugin<[], Root> = () => {
  return (tree) => {
    const children = tree.children;
    let i = 0;

    while (i < children.length) {
      const node = children[i];

      if (
        node.type === 'paragraph' &&
        node.children.length === 1 &&
        node.children[0].type === 'text'
      ) {
        const text = (node.children[0] as any).value.replace(/\r/g, '');
        if (!/^:::\s*steps\s*$/.test(text)) {
          i++;
          continue;
        }

        let j = i + 1;
        let closeIndex = -1;

        while (j < children.length) {
          const closeNode = children[j];
          if (
            closeNode.type === 'paragraph' &&
            closeNode.children.length === 1 &&
            closeNode.children[0].type === 'text'
          ) {
            const val = (closeNode.children[0] as any).value.replace(/\r/g, '');
            if (/^:::\s*$/.test(val)) {
              closeIndex = j;
              break;
            }
          }
          j++;
        }

        if (closeIndex === -1) {
          i++;
          continue;
        }

        const innerNodes = children.slice(i + 1, closeIndex);

        const mdxNode: any = {
          type: 'mdxJsxFlowElement',
          name: 'Steps',
          attributes: [],
          children: innerNodes,
        };

        children.splice(i, closeIndex - i + 1, mdxNode);
        i += 1;
        continue;
      }
      i++;
    }
  };
};

export default remarkSteps;