// src/plugins/remark-callout.ts
import type { Root } from 'mdast';
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

      const textNodes = node.children.filter(
        (c): c is { type: 'text'; value: string } => c.type === 'text'
      );
      if (textNodes.length === 0) {
        i++;
        continue;
      }

      const fullText = textNodes.map(t => t.value).join('').replace(/\r/g, '');

      // Cek apakah paragraf dimulai dengan :::[!type]
      const calloutMatch = fullText.match(/^:::\s*\[!([^\]]+)\]/);
      if (!calloutMatch) {
        i++;
        continue;
      }

      const calloutType = calloutMatch[1];
      let restText = '';

      // Kasus 1: Paragraf hanya berisi :::[!type] (pembuka mandiri)
      if (/^:::\s*\[!([^\]]+)\]\s*$/.test(fullText)) {
        // Cari penutup ::: mulai dari i+1
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
            (c): c is { type: 'text'; value: string } => c.type === 'text'
          );
          const lastTextNode = closeTextNodes[closeTextNodes.length - 1] as any;
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

      // Kasus 2: Single paragraph callout
      const singleMatch = fullText.match(
        /^:::\s*\[!([^\]]+)\]\s*\n([\s\S]*?)\n:::\s*$/
      );
      if (singleMatch) {
        const innerText = singleMatch[2].trim();
        const innerParagraph = {
          type: 'paragraph',
          children: [{ type: 'text', value: innerText }],
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

      // Kasus 3: Pembuka + teks di paragraf yang sama
      const openOnlyMatch = fullText.match(/^:::\s*\[!([^\]]+)\]\s*\n?(.*)/s);
      if (openOnlyMatch) {
        restText = openOnlyMatch[2].trim();

        // Ubah paragraf ini menjadi hanya :::[!type]
        textNodes[0].value = `:::[!${calloutType}]`;

        // Jika ada teks setelahnya, sisipkan sebagai paragraf konten
        if (restText) {
          const contentParagraph = {
            type: 'paragraph',
            children: [{ type: 'text', value: restText }],
          };
          children.splice(i + 1, 0, contentParagraph as any); // ✅ as any
        }

        // Cari penutup ::: mulai dari i+1
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
            (c): c is { type: 'text'; value: string } => c.type === 'text'
          );
          const lastTextNode = closeTextNodes[closeTextNodes.length - 1] as any;
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
          // Gagal, rollback perubahan
          textNodes[0].value = fullText;
          if (restText) children.splice(i + 1, 1);
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

      i++;
    }
  };
};

export default remarkCallout;