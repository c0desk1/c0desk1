// src/lib/mdx/satteri-filetree.ts
import { defineMdastPlugin } from 'satteri';

function splitComment(raw: string): { name: string; comment: string } {
  const idxSlash = raw.search(/\s\/\/\s?/);
  const idxHash = raw.search(/\s#\s?/);
  let idx = -1;
  if (idxSlash !== -1 && idxHash !== -1) {
    idx = Math.min(idxSlash, idxHash);
  } else if (idxSlash !== -1) {
    idx = idxSlash;
  } else if (idxHash !== -1) {
    idx = idxHash;
  }
  if (idx === -1) {
    return { name: raw.trim(), comment: '' };
  }
  const name = raw.slice(0, idx).trim();
  const comment = raw.slice(idx).trim();
  return { name, comment };
}

function isPlaceholderName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed === '...' || trimmed === '…';
}

function getDepth(ctx: any, node: any): number {
  let depth = 0;
  let current = node;
  while (true) {
    const parent = ctx.parent(current);
    if (!parent) break;
    if (parent.type === 'list') {
      depth++;
    }
    if (parent.type === 'containerDirective' && (parent as any).name === 'filetree') {
      break;
    }
    current = parent;
  }
  return Math.max(0, depth - 1);
}

function getFileExtension(fileName: string): string {
  const trimmed = fileName.trim();
  if (trimmed.endsWith('/')) return 'folder';
  if (trimmed.startsWith('.')) {
    const parts = trimmed.split('.');
    if (parts.length > 1) {
      return parts.slice(1).join('.').toLowerCase();
    }
    return '';
  }
  const parts = trimmed.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1].toLowerCase();
  }
  return '';
}

function normalizeFileName(raw: string): string {
  return raw.trim();
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

    while (true) {
      const parent = ctx.parent(current);
      if (!parent) break;
      if (parent.type === 'containerDirective' && (parent as any).name === 'filetree') {
        isInside = true;
        break;
      }
      current = parent;
    }

    if (!isInside) return;

    const depth = getDepth(ctx, node);

    const firstChild = node.children[0];
    const hasNestedList = node.children.some((c: any) => c.type === 'list');

    let fileName = '';
    let isHighlighted = false;
    let comment = '';
    let strongNode: any = null;
    let isPlaceholder = false;

    if (firstChild && firstChild.type === 'paragraph' && Array.isArray(firstChild.children)) {
      const children = firstChild.children as any[];
      if (children.length > 0) {
        strongNode = children.find((c: any) => c.type === 'strong');
        if (strongNode) {
          isHighlighted = true;
          const textChild = strongNode.children?.[0];
          if (textChild?.type === 'text') {
            const raw = textChild.value || '';
            const { name, comment: cmt } = splitComment(raw);
            fileName = normalizeFileName(name);
            comment = cmt;
          }
          const rest = children.filter((c: any) => c !== strongNode);
          for (const child of rest) {
            if (child.type === 'text') {
              const { comment: cmt } = splitComment(child.value);
              if (cmt) {
                const trimmed = cmt.trim();
                if (trimmed) comment = comment ? comment + ' ' + trimmed : trimmed;
              }
            }
          }
        } else {
          const textNode = children.find((c: any) => c.type === 'text');
          if (textNode) {
            const raw = textNode.value || '';
            const { name, comment: cmt } = splitComment(raw);
            fileName = normalizeFileName(name);
            comment = cmt;
          } else {
            let fullText = '';
            for (const child of children) {
              if (child.type === 'text') fullText += child.value;
              else if (child.type === 'inlineCode' && child.value) fullText += child.value;
            }
            const { name, comment: cmt } = splitComment(fullText);
            fileName = normalizeFileName(name);
            comment = cmt;
          }
        }
      }
    }

    if (!fileName) {
      fileName = 'untitled';
    }

    isPlaceholder = isPlaceholderName(fileName);

    const isFolder = !isPlaceholder && (fileName.endsWith('/') || hasNestedList);
    const isFile = !isPlaceholder && !isFolder;

    const displayName = isFolder ? fileName.replace(/\/$/, '').trim() : fileName.trim();

    let ext = '';
    if (isFolder) {
      ext = 'folder';
    } else if (isFile) {
      ext = getFileExtension(fileName);
    }

    const spanClass = isPlaceholder ? 'tree-placeholder' : isFolder ? 'tree-folder' : 'tree-file';

    const spanChildren: any[] = [];

    if (isPlaceholder) {
      spanChildren.push({ type: 'text', value: '…' });
    } else {
      if (isHighlighted && strongNode) {
        const strongClone = {
          ...strongNode,
          children: strongNode.children?.map((c: any) => ({
            ...c,
            value: c.value?.trim(),
          })),
        };
        spanChildren.push(strongClone);
      } else {
        spanChildren.push({ type: 'text', value: displayName });
      }
      if (comment) {
        const trimmedComment = comment.trim();
        if (trimmedComment) {
          spanChildren.push({ type: 'text', value: ' ' });
          spanChildren.push({
            type: 'containerDirective',
            data: {
              hName: 'span',
              hProperties: { className: ['tree-comment'] },
            },
            children: [{ type: 'text', value: trimmedComment }],
          });
        }
      }
    }

    const contentSpan = {
      type: 'containerDirective',
      data: {
        hName: 'span',
        hProperties: { className: [spanClass] },
      },
      children: spanChildren,
    };

    const wrapperProps: any = {
      className: ['tree-label'],
    };

    if (isHighlighted) wrapperProps['data-highlight'] = '';
    if (isPlaceholder) wrapperProps['data-placeholder'] = '';

    const existingClasses = (node.data?.hProperties?.className as string[]) || [];
    const depthClass = `tree-depth-${depth}`;
    const typeClass = isPlaceholder ? 'tree-placeholder' : isFolder ? 'tree-folder' : 'tree-file';
    const highlightClass = isHighlighted ? 'tree-highlight' : '';
    const finalLiClasses = [depthClass, typeClass, highlightClass, ...existingClasses].filter(Boolean);

    if (isPlaceholder) {
      const labelNode = {
        type: 'containerDirective',
        data: {
          hName: 'div',
          hProperties: wrapperProps,
        },
        children: [contentSpan],
      };
      ctx.setProperty(node, 'children', [labelNode as any]);
    } else if (isFolder && hasNestedList) {
      const summaryNode = {
        type: 'paragraph',
        data: {
          hName: 'summary',
          hProperties: wrapperProps,
        },
        children: [contentSpan],
      };
      const restChildren = node.children.slice(1);
      const detailsNode = {
        type: 'containerDirective',
        data: {
          hName: 'details',
          hProperties: { open: true },
        },
        children: [summaryNode, ...restChildren],
      };
      ctx.setProperty(node, 'children', [detailsNode as any]);
    } else {
      const labelNode = {
        type: 'containerDirective',
        data: {
          hName: 'div',
          hProperties: wrapperProps,
        },
        children: [contentSpan],
      };
      ctx.setProperty(node, 'children', [labelNode as any]);
    }

    const bData = node.data || {};
    const liProps: any = {
      className: finalLiClasses,
    };
    if (ext) {
      liProps['data-ext'] = ext;
    }
    ctx.setProperty(node, 'data', {
      ...bData,
      hProperties: liProps,
    });
  },
});
