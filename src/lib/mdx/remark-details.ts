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

      // Cek apakah paragraf dimulai dengan :::details
      if (!fullText.startsWith(':::details')) {
        i++;
        continue;
      }

      // Kasus 1: Single paragraph (semua dalam satu paragraf)
      const singleMatch = fullText.match(
        /^:::\s*details(?:[^\S\n]+(.+?))?[^\S\n]*\n([\s\S]*?)\n:::\s*$/
      );
      if (singleMatch) {
        const summary = singleMatch[1] || 'Details';
        const innerText = singleMatch[2].trim();

        const innerParagraph = {
          type: 'paragraph',
          children: [{ type: 'text', value: innerText }],
        } as any;

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

      // Kasus 2: Pembuka mandiri (hanya :::details atau :::details summary)
      const openMatch = fullText.match(/^:::\s*details(?:\s+(.+?))?\s*$/);
      if (openMatch) {
        const summary = openMatch[1] || 'Details';
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
          name: 'Details',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'summary', value: summary },
          ],
          children: innerNodes,
        };
        children.splice(i, deleteCount, mdxNode);
        i += 1;
        continue;
      }

      // Kasus 3: Paragraf dimulai dengan :::details tapi bukan pembuka mandiri/single
      // (misal: ":::details summary\nteks")
      // Potong menjadi pembuka + konten pertama
      const mixedMatch = fullText.match(/^:::\s*details(?:[^\S\n]+(.+?))?[^\S\n]*\n(.*)/s);
      if (mixedMatch) {
        const summary = mixedMatch[1] || 'Details';
        const restText = mixedMatch[2].trim();

        // Ubah paragraf ini menjadi hanya :::details summary (pembuka)
        textNodes[0].value = summary ? `:::details ${summary}` : `:::details`;

        // Jika ada teks setelahnya, sisipkan sebagai paragraf konten
        if (restText) {
          const contentParagraph = {
            type: 'paragraph',
            children: [{ type: 'text', value: restText }],
          } as any;
          children.splice(i + 1, 0, contentParagraph);
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
          name: 'Details',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'summary', value: summary },
          ],
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

export default remarkDetails;