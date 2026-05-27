// src/plugins/remark-callout.ts
import type { Root, Paragraph, Text } from 'mdast';
import type { Plugin } from 'unified';

const remarkCallout: Plugin<[], Root> = () => {
  return (tree) => {
    const children = tree.children;
    let i = 0;

    while (i < children.length) {
      const node = children[i];
      if (node.type !== 'paragraph') {
        i++;
        continue;
      }

      const para = node as Paragraph;
      const textNodes = para.children.filter(
        (c): c is Text => c.type === 'text'
      );
      if (textNodes.length === 0) {
        i++;
        continue;
      }

      let fullText = '';
      const allTextNodes: Text[] = [];
      for (const child of para.children) {
        if (child.type === 'text') {
          fullText += child.value;
          allTextNodes.push(child as Text);
        } else {
          fullText += '\0';
        }
      }
      fullText = fullText.replace(/\r/g, '');

      const calloutMatch = fullText.match(/^:::\s*\[!([^\]]+)\]/);
      if (!calloutMatch) {
        i++;
        continue;
      }
      const calloutType = calloutMatch[1];

      if (/^:::\s*\[!([^\]]+)\]\s*$/.test(fullText)) {
        let j = i + 1;
        let closeIndex = -1;
        let keepCloseNode = false;

        while (j < children.length) {
          const closeNode = children[j];
          if (closeNode.type !== 'paragraph') {
            j++;
            continue;
          }

          const closeTextNodes = closeNode.children.filter(
            (c): c is Text => c.type === 'text'
          ) as Text[];
          const lastTextNode = closeTextNodes[closeTextNodes.length - 1];
          if (!lastTextNode) {
            j++;
            continue;
          }

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
          name: 'Callout',
          attributes: [{ type: 'mdxJsxAttribute', name: 'type', value: calloutType }],
          children: innerNodes,
        };
        children.splice(i, deleteCount, mdxNode);
        i += 1;
        continue;
      }

      let combinedText = para.children
        .map(c => (c.type === 'text' ? (c as Text).value : ''))
        .join('')
        .replace(/\r/g, '');

      if (!combinedText.startsWith(`:::[!${calloutType}]`)) {
        i++;
        continue;
      }

      const closePos = combinedText.indexOf('\n:::');
      if (closePos === -1) {
        i++;
        continue;
      }

      combinedText = combinedText.substring(0, closePos);

      const openLen = `:::[!${calloutType}]`.length;
      if (combinedText[openLen] === '\n') {
        combinedText = combinedText.substring(openLen + 1);
      } else {
        combinedText = combinedText.substring(openLen);
      }

      const firstTextNode = allTextNodes[0];
      const lastTextNode = allTextNodes[allTextNodes.length - 1];

      const openSuffix = `:::[!${calloutType}]\n`;
      if (firstTextNode.value.startsWith(openSuffix)) {
        firstTextNode.value = firstTextNode.value.substring(openSuffix.length);
      } else if (firstTextNode.value.startsWith(`:::[!${calloutType}]`)) {
        firstTextNode.value = firstTextNode.value.substring(`:::[!${calloutType}]`.length);
      }

      const closeSuffix = `\n:::`;
      if (lastTextNode.value.endsWith(closeSuffix)) {
        lastTextNode.value = lastTextNode.value.substring(0, lastTextNode.value.length - closeSuffix.length);
      } else if (lastTextNode.value.endsWith(':::')) {
        lastTextNode.value = lastTextNode.value.substring(0, lastTextNode.value.length - 3);
      }

      const cleanedChildren = para.children.filter(child => {
        if (child.type === 'text') {
          return (child as Text).value.trim() !== '';
        }
        return true;
      });

      const innerParagraph: any = {
        type: 'paragraph',
        children: cleanedChildren,
      };

      const mdxNode: any = {
        type: 'mdxJsxFlowElement',
        name: 'Callout',
        attributes: [{ type: 'mdxJsxAttribute', name: 'type', value: calloutType }],
        children: [innerParagraph],
      };

      children.splice(i, 1, mdxNode);
      i++;
      continue;
    }
  };
};

export default remarkCallout;