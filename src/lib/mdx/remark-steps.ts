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
        let keepCloseNode = false;

        while (j < children.length) {
          const closeNode = children[j];
          if (closeNode.type !== 'paragraph') {
            j++;
            continue;
          }

          const textNodes = closeNode.children.filter(
            (c): c is { type: 'text'; value: string } => c.type === 'text'
          );
          const lastTextNode = textNodes[textNodes.length - 1] as any;
          if (!lastTextNode) {
            j++;
            continue;
          }

          const val: string = lastTextNode.value.replace(/\r/g, '');
          if (textNodes.length === 1 && /^:::\s*$/.test(val)) {
            closeIndex = j;
            keepCloseNode = false;
            break;
          }

          const suffixMatch = val.match(/\n:::\s*$/);
          if (suffixMatch) {
            const beforeSuffix = val.substring(0, suffixMatch.index!);
            if (beforeSuffix.trim().length > 0) {
              lastTextNode.value = beforeSuffix;
              closeIndex = j;
              keepCloseNode = true;
            } else {
              closeIndex = j;
              keepCloseNode = false;
            }
            break;
          }

          j++;
        }
        if (closeIndex === -1) {
          i++;
          continue;
        }
        const end = keepCloseNode ? closeIndex + 1 : closeIndex;
        const innerNodes = children.slice(i + 1, end);
        const deleteCount = end - i;
        const mdxNode: any = {
          type: 'mdxJsxFlowElement',
          name: 'Steps',
          attributes: [],
          children: innerNodes,
        };
        children.splice(i, deleteCount, mdxNode);
        i += 1;
        continue;
      }
      i++;
    }
  };
};

export default remarkSteps;