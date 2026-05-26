// src/plugins/remark-banner.ts
import type { Root, Link } from 'mdast';
import type { Plugin } from 'unified';

const remarkBanner: Plugin<[], Root> = () => {
  return (tree) => {
    const children = tree.children;

    let i = 0;

    while (i < children.length) {
      const node = children[i];

      if (node.type !== 'paragraph') {
        i++;
        continue;
      }

      const textContent = node.children
        .filter((c: any) => c.type === 'text')
        .map((c: any) => c.value)
        .join('')
        .replace(/\r/g, '')
        .trim();

      const openMatch = textContent.match(
        /^:::\s*banner(?:\s+(.+))?$/
      );

      if (!openMatch) {
        i++;
        continue;
      }

      const title = openMatch[1]?.trim() || '';

      let closeIndex = -1;

      for (let j = i + 1; j < children.length; j++) {
        const closeNode = children[j];

        if (closeNode.type !== 'paragraph') {
          continue;
        }

        const closeText = closeNode.children
          .filter((c: any) => c.type === 'text')
          .map((c: any) => c.value)
          .join('')
          .replace(/\r/g, '')
          .trim();

        if (closeText === ':::') {
          closeIndex = j;
          break;
        }
      }

      if (closeIndex === -1) {
        i++;
        continue;
      }

      const innerNodes = children.slice(i + 1, closeIndex);

      let icon = '';
      let description = '';
      const links: { url: string; label: string }[] = [];

      const walk = (node: any) => {
        if (!node) return;

        if (node.type === 'image' && !icon) {
            icon = node.url;
            return;
        }

        if (node.type === 'link') {
            const label =
            node.children
                ?.filter((c: any) => c.type === 'text')
                ?.map((c: any) => c.value)
                ?.join('') || node.url;

            links.push({
            url: node.url,
            label,
            });
            return;
        }

        if (node.type === 'text') {
            const value = node.value?.trim();

            if (value && value !== ':::') {
            description += `${value} `;
            }

            return;
        }

        if (Array.isArray(node.children)) {
            for (const child of node.children) {
            walk(child);
            }
        }
      };

      for (const inner of innerNodes) {
        walk(inner);
      }

      description = description
        .replace(/\s+/g, ' ')
        .trim();

      const bannerNode: any = {
        type: 'mdxJsxFlowElement',
        name: 'Banner',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'title',
            value: title,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'icon',
            value: icon,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'description',
            value: description,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'links',
            value: JSON.stringify(links),
          },
        ],
        children: [],
      };

      children.splice(
        i,
        closeIndex - i + 1,
        bannerNode
      );

      i++;
    }
  };
};

export default remarkBanner;
