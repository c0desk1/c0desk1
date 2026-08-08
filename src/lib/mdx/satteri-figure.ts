// src/lib/mdx/satteri-figure.ts
import { defineMdastPlugin } from 'satteri';

export const satteriFigure = defineMdastPlugin({
  name: 'satteri-figure',

  paragraph(node, ctx) {
    const imageIndex = node.children.findIndex((c: any) => c.type === 'image');
    if (imageIndex === -1) return;

    const imageNode = node.children[imageIndex] as any;

    let caption = '';
    let captionIndex = -1;

    for (let i = imageIndex + 1; i < node.children.length; i++) {
      const child = node.children[i];
      if (child.type === 'text') {
        const match = child.value.match(/^\s*\{\s*(.+?)\s*\}\s*$/);
        if (match) {
          caption = match[1].trim();
          captionIndex = i;
          break;
        }
      }
    }

    const figureChildren: any[] = [
      {
        type: 'image',
        url: imageNode.url,
        alt: imageNode.alt || '',
        title: imageNode.title || undefined,
        data: {
          hProperties: {
            loading: 'lazy',
          },
        },
      },
    ];

    if (caption) {
      figureChildren.push({
        type: 'containerDirective',
        data: {
          hName: 'figcaption',
          hProperties: {},
        },
        children: [{ type: 'text', value: caption }],
      });
    }

    const otherChildren = node.children.filter(
      (_: any, i: number) => i !== imageIndex && i !== captionIndex
    );

    if (otherChildren.length > 0) {
      figureChildren.push(...otherChildren);
    }

    ctx.setProperty(node, 'data', {
      ...(node.data || {}),
      hName: 'figure',
      hProperties: {},
    });

    ctx.setProperty(node, 'children', figureChildren);
  },
});
