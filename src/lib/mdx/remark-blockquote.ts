import type { Root, Blockquote, Paragraph, Text, Link } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const remarkBlockquoteAuthor: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      if (!parent || index === undefined) return;

      const blockquote = node as Blockquote;
      const children = blockquote.children;
      if (!children || children.length === 0) return;

      const lastChild = children[children.length - 1];
      if (lastChild.type !== 'paragraph') {
        const mdxNode: any = {
          type: 'mdxJsxFlowElement',
          name: 'Blockquote',
          attributes: [],
          children: [...children],
        };
        parent.children.splice(index, 1, mdxNode);
        return;
      }

      const para = lastChild as Paragraph;
      const paraChildren = [...para.children];

      let fullTextForSource = '';
      for (const child of paraChildren) {
        if (child.type === 'text') fullTextForSource += (child as Text).value;
        else if (child.type === 'link')
          fullTextForSource += `[${(child as Link).children.map(c => (c as Text).value).join('')}](${(child as Link).url})`;
        else fullTextForSource += '';
      }

      const sourceMatch = fullTextForSource.match(/\s+\/\s*source:\s*\[([^\]]+)\]\(([^)]+)\)\s*$/);
      if (sourceMatch) {
        const label = sourceMatch[1];
        const url = sourceMatch[2];
        const suffix = sourceMatch[0];

        let remaining = suffix.length;
        const newParaChildren: typeof paraChildren = [];

        for (let i = paraChildren.length - 1; i >= 0; i--) {
          const child = paraChildren[i];
          let childText = '';
          if (child.type === 'text') childText = (child as Text).value;
          else if (child.type === 'link') {
            const link = child as Link;
            childText = `[${link.children.map(c => (c as Text).value).join('')}](${link.url})`;
          } else continue;

          if (remaining > 0 && childText.length > 0) {
            if (childText.length <= remaining) {
              remaining -= childText.length;
              continue;
            } else {
              if (child.type === 'text') {
                (child as Text).value = childText.substring(0, childText.length - remaining);
              } else if (child.type === 'link') {
                continue;
              }
              remaining = 0;
            }
          }
          newParaChildren.unshift(child);
        }

        const newBlockquoteChildren = [...children];
        if (newParaChildren.length === 0) {
          newBlockquoteChildren.pop();
        } else {
          newBlockquoteChildren[newBlockquoteChildren.length - 1] = {
            ...para,
            children: newParaChildren,
          };
        }

        const mdxNode: any = {
          type: 'mdxJsxFlowElement',
          name: 'Blockquote',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'cite', value: url },
            { type: 'mdxJsxAttribute', name: 'citeLabel', value: label || 'Source' },
          ],
          children: newBlockquoteChildren,
        };

        parent.children.splice(index, 1, mdxNode);
        return;
      }

      let fullText = '';
      const parts: (Text | Link)[] = [];
      for (const child of paraChildren) {
        if (child.type === 'text') {
          fullText += (child as Text).value;
          parts.push(child as Text);
        } else if (child.type === 'link') {
          fullText += (child as Link).url;
          parts.push(child as Link);
        }
      }

      const match = fullText.match(/\s+\/\s+(.+?)\s*$/);
      if (match) {
        const value = match[1].trim();
        const suffix = match[0];

        let remainingLength = suffix.length;
        const newLastChildren: typeof paraChildren = [];

        for (let i = parts.length - 1; i >= 0; i--) {
          const part = parts[i];
          let partText = '';
          if (part.type === 'text') partText = (part as Text).value;
          else if (part.type === 'link') partText = (part as Link).url;

          if (remainingLength > 0 && partText.length > 0) {
            if (partText.length <= remainingLength) {
              remainingLength -= partText.length;
              continue;
            } else {
              if (part.type === 'text') {
                (part as Text).value = partText.substring(0, partText.length - remainingLength);
              }
              remainingLength = 0;
            }
          }
          newLastChildren.unshift(part);
        }

        const newBlockquoteChildren = [...children];
        if (newLastChildren.length === 0) {
          newBlockquoteChildren.pop();
        } else {
          newBlockquoteChildren[newBlockquoteChildren.length - 1] = {
            ...para,
            children: newLastChildren,
          };
        }

        const mdxNode: any = {
          type: 'mdxJsxFlowElement',
          name: 'Blockquote',
          attributes: [],
          children: newBlockquoteChildren,
        };

        if (value.startsWith('author:')) {
          const slug = value.slice('author:'.length).trim();
          if (slug) {
            mdxNode.attributes.push({ type: 'mdxJsxAttribute', name: 'author', value: slug });
          }
        } else if (/^https?:\/\//.test(value)) {
          mdxNode.attributes.push({ type: 'mdxJsxAttribute', name: 'cite', value });
        } else {
          mdxNode.attributes.push({ type: 'mdxJsxAttribute', name: 'author', value });
        }

        parent.children.splice(index, 1, mdxNode);
        return;
      }

      const mdxNode: any = {
        type: 'mdxJsxFlowElement',
        name: 'Blockquote',
        attributes: [],
        children: [...children],
      };
      parent.children.splice(index, 1, mdxNode);
    });
  };
};

export default remarkBlockquoteAuthor;