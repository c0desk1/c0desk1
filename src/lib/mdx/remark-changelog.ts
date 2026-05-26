// src/plugins/remark-changelog.ts
import type { Root } from 'mdast';
import type { Plugin } from 'unified';

const remarkChangelog: Plugin<[], Root> = () => {
  return (tree) => {
    const children = tree.children;
    let i = 0;

    while (i < children.length) {
      const node = children[i];

      if (node.type !== 'paragraph') { i++; continue; }

      const textNodes = node.children.filter(
        (c): c is { type: 'text'; value: string } => c.type === 'text'
      );
      if (textNodes.length === 0) { i++; continue; }

      const fullText = textNodes.map(t => t.value).join('').replace(/\r/g, '');

      if (!/^:::\s*changelog/.test(fullText)) { i++; continue; }

      let startIndex = i;

      if (/^:::\s*changelog\s*$/.test(fullText)) {
        startIndex = i + 1;
      } else {
        const contentMatch = fullText.match(/^:::\s*changelog\s*\n([\s\S]*)/);
        if (contentMatch) {
          const contentText = contentMatch[1];
          textNodes[0].value = contentText;
        } else {
          i++; continue;
        }
      }

      let j = startIndex;
      let closeIndex = -1;
      let keepCloseNode = false;

      while (j < children.length) {
        const closeNode = children[j];

        if (closeNode.type === 'paragraph') {
          const closeTextNodes = closeNode.children.filter(
            (c): c is { type: 'text'; value: string } => c.type === 'text'
          );
          const lastTextNode = closeTextNodes[closeTextNodes.length - 1] as any;
          if (!lastTextNode) { j++; continue; }

          const val: string = lastTextNode.value.replace(/\r/g, '');

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

        else if (closeNode.type === 'list') {
          const listItems = closeNode.children;
          for (let k = listItems.length - 1; k >= 0; k--) {
            const listItem = listItems[k];
            if (listItem.type !== 'listItem') continue;

            const lastPara = (listItem as any).children.filter((c: any) => c.type === 'paragraph').pop() as any;
            if (!lastPara) continue;
            const lastText = lastPara.children.filter((c: any) => c.type === 'text').pop() as any;
            if (!lastText) continue;

            const val: string = lastText.value.replace(/\r/g, '');
            const suffixMatch = val.match(/\n:::\s*$/);
            if (suffixMatch) {
              const beforeSuffix = val.substring(0, suffixMatch.index!);
              if (beforeSuffix.trim().length > 0) {
                lastText.value = beforeSuffix;
                closeIndex = j;
                keepCloseNode = true;
                break;
              } else {
                listItems.splice(k, 1);
                if (listItems.length === 0) {
                  closeIndex = j;
                  keepCloseNode = false;
                } else {
                  closeIndex = j;
                  keepCloseNode = true;
                }
                break;
              }
            }
          }
          if (closeIndex !== -1) break;
        }
        j++;
      }

      if (closeIndex === -1) { i++; continue; }

      const end = keepCloseNode ? closeIndex + 1 : closeIndex;
      const innerNodes = children.slice(startIndex, end);
      const deleteCount = end - i + (startIndex === i ? 0 : 1);

      const mdxNode: any = {
        type: 'mdxJsxFlowElement',
        name: 'Changelog',
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

export default remarkChangelog;