// src/plugins/remark-details.ts
import type { Root } from 'mdast';
import type { Plugin } from 'unified';

const remarkDetails: Plugin<[], Root> = () => {
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

      const openMatch = fullText.match(/^:::\s*details(?:\s+(.+?))?\s*$/);
      if (!openMatch) {
        i++;
        continue;
      }

      const summary = openMatch[1] || 'Details';

      let j = i + 1;
      let closeIndex = -1;
      let keepCloseNode = false;

      while (j < children.length) {
        const closeNode = children[j];

        // 1. Cari di dalam paragraf
        if (closeNode.type === 'paragraph') {
          const closeTextNodes = closeNode.children.filter(
            (c): c is { type: 'text'; value: string } => c.type === 'text'
          );
          const lastTextNode = closeTextNodes[closeTextNodes.length - 1] as any;
          if (!lastTextNode) { j++; continue; }

          const val = lastTextNode.value.replace(/\r/g, '');

          if (closeTextNodes.length === 1 && /^:::\s*$/.test(val)) {
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
        }

        // 2. Cari di dalam item daftar (list)
        if (closeNode.type === 'list') {
          for (let k = closeNode.children.length - 1; k >= 0; k--) {
            const listItem = closeNode.children[k];
            if (listItem.type !== 'listItem') continue;

            const lastPara = listItem.children
              .filter(c => c.type === 'paragraph')
              .pop() as any;
            if (!lastPara) continue;

            const paraTextNodes = lastPara.children.filter(
              (c): c is { type: 'text'; value: string } => c.type === 'text'
            );
            const lastText = paraTextNodes[paraTextNodes.length - 1] as any;
            if (!lastText) continue;

            const val = lastText.value.replace(/\r/g, '');

            const suffixMatch = val.match(/\n:::\s*$/);
            if (suffixMatch) {
              const beforeSuffix = val.substring(0, suffixMatch.index!);
              if (beforeSuffix.trim().length > 0) {
                lastText.value = beforeSuffix;
                closeIndex = j;
                keepCloseNode = true;
              } else {
                closeNode.children.splice(k, 1);
                if (closeNode.children.length === 0) {
                  closeIndex = j;
                  keepCloseNode = false;
                } else {
                  closeIndex = j;
                  keepCloseNode = true;
                }
              }
              break;
            }
          }
          if (closeIndex !== -1) break;
        }

        j++;
      }

      if (closeIndex === -1) {
        i++;
        continue;
      }

      const innerNodes = children.slice(i + 1, closeIndex);
      const deleteCount = keepCloseNode
        ? closeIndex - i
        : closeIndex - i + 1;

      const mdxNode: any = {
        type: 'mdxJsxFlowElement',
        name: 'Details',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'summary', value: summary },
        ],
        children: innerNodes,
      };

      children.splice(i, deleteCount, mdxNode);
      i++;
      continue;
    }
  };
};

export default remarkDetails;