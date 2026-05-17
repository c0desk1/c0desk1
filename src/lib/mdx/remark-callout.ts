import type { Root } from 'mdast';

export default function remarkCalloutInline() {
  return (tree: Root) => {
    const newChildren: any[] = [];

    for (const node of tree.children) {
      if (node.type !== 'paragraph') {
        newChildren.push(node);
        continue;
      }

      const textNodes = node.children;
      if (textNodes.length === 0) {
        newChildren.push(node);
        continue;
      }

      const fullText = textNodes
        .map((child: any) => (child.type === 'text' ? child.value : ''))
        .join('');

      // Cocokkan pola: :::[!type] di awal, lalu konten sampai ::: di akhir (tanpa baris kosong)
      const match = fullText.match(
        /^:::\s*\[!([^\]]+)\]\s*\n([\s\S]*?)\n:::\s*$/
      );
      if (match) {
        const calloutType = match[1];
        const innerText = match[2].trim();

        const innerParagraph: any = {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: innerText,
            },
          ],
        };

        const calloutNode: any = {
          type: 'mdxJsxFlowElement',
          name: 'Callout',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'type',
              value: calloutType,
            },
          ],
          children: [innerParagraph],
        };

        newChildren.push(calloutNode);
      } else {
        newChildren.push(node);
      }
    }

    tree.children = newChildren;
  };
}