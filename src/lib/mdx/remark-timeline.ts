// src/plugins/remark-timeline.ts
import type { Root } from 'mdast';
import type { Plugin } from 'unified';

const remarkTimeline: Plugin<[], Root> = () => {
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

      if (!/^:::\s*timeline/.test(fullText)) { i++; continue; }

      let dateText = '';
      let startIndex = i;

      if (/^:::\s*timeline\s*$/.test(fullText)) {
        startIndex = i + 1;
      } else {
        const dateMatch = fullText.match(/^:::\s*timeline\s*\n(.+)/);
        if (dateMatch) {
          dateText = dateMatch[1].trim();
          textNodes[0].value = dateText;
        } else {
          i++; continue;
        }
      }

      let j = startIndex;
      let closeIndex = -1;
      let keepCloseNode = false;

      while (j < children.length) {
        const closeNode = children[j];
        if (closeNode.type !== 'paragraph') { j++; continue; }

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
        j++;
      }

      if (closeIndex === -1) { i++; continue; }

      const end = keepCloseNode ? closeIndex + 1 : closeIndex;
      const innerNodes = children.slice(startIndex, end);
      const deleteCount = end - i + (startIndex === i ? 0 : 1);
      const mdxNode: any = {
        type: 'mdxJsxFlowElement',
        name: 'Timeline',
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

export default remarkTimeline;