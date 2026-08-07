// src/lib/mdx/satteri-filetree.ts
import { defineMdastPlugin } from 'satteri';
import { fileIcons } from '../../assets/icons/file';

function splitComment(raw: string): { name: string; comment: string } {
  const idx = raw.search(/\s#\s?/);
  if (idx === -1) {
    return { name: raw.trim(), comment: '' };
  }
  const name = raw.slice(0, idx).trim();
  const comment = raw.slice(idx).replace(/^\s#\s?/, '').trim();
  return { name, comment };
}

function isPlaceholderName(name: string): boolean {
  return name === '...' || name === '…';
}

export const satteriFileTree = defineMdastPlugin({
  name: 'satteri-filetree',

  containerDirective(node: any, ctx: any) {
    if (node.name !== 'filetree') return;
    const baseData = node.data || {};
    ctx.setProperty(node, 'data', {
      ...baseData,
      hName: 'div',
      hProperties: {
        ...(baseData.hProperties || {}),
        className: ['file-tree'],
      },
    });
  },

  listItem(node: any, ctx: any) {
    let current: any = node;
    let isInside = false;
    let depth = 0;

    while (true) {
      const parent = ctx.parent(current);
      if (!parent) break;

      if (parent.type === 'list') {
        depth++;
      }

      if (parent.type === 'containerDirective' && (parent as any).name === 'filetree') {
        isInside = true;
        break;
      }

      current = parent;
    }

    if (!isInside) return;

    const firstChild = node.children[0];
    const hasNestedList = node.children.some((c: any) => c.type === 'list');

    let fileName = '';
    let isHighlighted = false;
    let commentNodes: any[] = [];
    let nameNode: any = null;

    if (firstChild && firstChild.type === 'paragraph' && Array.isArray(firstChild.children)) {
      const children = firstChild.children as any[];
      if (children.length > 0) {
        const first = children[0];

        if (first.type === 'strong') {
          isHighlighted = true;
          const textChild = first.children?.[0];
          if (textChild?.type === 'text') {
            fileName = (textChild.value as string).trim();
          }
          nameNode = first;
          const rest = children.slice(1);
          if (rest.length > 0 && rest[0].type === 'text') {
            const match = (rest[0].value as string).match(/^\s*#\s?(.*)$/s);
            if (match) {
              commentNodes = [{ type: 'text', value: match[1] }, ...rest.slice(1)];
            } else {
              commentNodes = rest;
            }
          }
        } else if (first.type === 'text') {
          const raw = (first.value as string) || '';
          const { name, comment } = splitComment(raw);
          fileName = name;
          nameNode = { type: 'text', value: name };
          if (comment) {
            commentNodes = [{ type: 'text', value: comment }];
          }
        } else {
          let fullText = '';
          for (const child of children) {
            if (child.type === 'text') fullText += child.value;
            else if (child.type === 'inlineCode' && child.value) fullText += child.value;
          }
          const { name, comment } = splitComment(fullText);
          fileName = name;
          nameNode = { type: 'text', value: name };
          if (comment) {
            commentNodes = [{ type: 'text', value: comment }];
          }
        }
      }
    }

    if (!fileName) {
      fileName = 'untitled';
      nameNode = { type: 'text', value: fileName };
    }

    const isPlaceholder = isPlaceholderName(fileName);
    const isEmptyFolder = !hasNestedList && !isPlaceholder && fileName.endsWith('/');
    const isFolder = hasNestedList || isEmptyFolder;

    const getIconNode = () => {
      if (isPlaceholder) return null;
      let iconHtml = fileIcons['file'] || '📄';
      if (isFolder) {
        iconHtml = fileIcons['folder'] || '📁';
      } else {
        const parts = fileName.split('.');
        const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
        iconHtml = fileIcons[ext] || fileIcons['file'] || '📄';
      }
      return {
        type: 'html',
        value: `<span class="tree-icon-wrapper" aria-hidden="true">${iconHtml}</span>`,
      };
    };

    const getCommentNode = () => {
      if (commentNodes.length === 0) return null;
      return {
        type: 'html',
        value: `<span class="tree-comment">${commentNodes.map((c: any) => c.value || '').join('')}</span>`,
      };
    };

    const buildLabelChildren = () => {
      const iconNode = getIconNode();
      const commentNode = getCommentNode();
      const children: any[] = [];
      if (iconNode) children.push(iconNode);
      if (nameNode) children.push(nameNode);
      if (commentNode) children.push(commentNode);
      return children;
    };

    const existingClasses = (node.data?.hProperties?.className as string[]) || [];
    const typeClass = isPlaceholder ? 'tree-placeholder' : isFolder ? 'tree-folder' : 'tree-file';
    const highlightClass = isHighlighted ? 'tree-highlight' : '';
    const depthClass = `tree-depth-${depth}`;

    const finalClassName = [depthClass, typeClass, highlightClass, ...existingClasses].filter(Boolean);

    if (isFolder && hasNestedList) {
      const summaryNode = {
        type: 'paragraph',
        data: { hName: 'summary', hProperties: { className: ['tree-label'] } },
        children: buildLabelChildren(),
      };
      const restChildren = node.children.slice(1);
      const detailsNode = {
        type: 'containerDirective',
        data: { hName: 'details', hProperties: { open: true } },
        children: [summaryNode, ...restChildren],
      };
      ctx.setProperty(node, 'children', [detailsNode as any]);
    } else {
      const labelNode = {
        type: 'containerDirective',
        data: {
          hName: 'div',
          hProperties: { className: ['tree-label'] },
        },
        children: buildLabelChildren(),
      };
      ctx.setProperty(node, 'children', [labelNode as any]);
    }

    const bData = node.data || {};
    ctx.setProperty(node, 'data', {
      ...bData,
      hProperties: {
        ...(bData.hProperties || {}),
        className: finalClassName,
      },
    });
  },
});
