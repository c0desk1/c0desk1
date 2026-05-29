import { defineMdastPlugin } from 'satteri';
import type { Blockquote, Paragraph, Text, Link } from 'mdast';

function cleanParagraphChildren(children: any[], suffix: string): any[] {
  let remaining = suffix.length;
  const result: any[] = [];
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    if (child.type === 'text') {
      const text = child.value;
      if (remaining > 0 && text.length >= remaining) {
        const newText = text.slice(0, text.length - remaining);
        remaining = 0;
        if (newText) result.unshift({ ...child, value: newText });
        continue;
      } else if (remaining > 0) {
        remaining -= text.length;
        continue;
      }
    }
    result.unshift(child);
  }
  return result;
}

export const satteriBlockquote = defineMdastPlugin({
  name: 'satteri-blockquote',
  blockquote(node: Blockquote, ctx) {
    const children = [...node.children];
    if (children.length === 0) return;

    const lastChild = children[children.length - 1];
    if (lastChild.type !== 'paragraph') {
      ctx.replaceNode(node, {
        type: 'mdxJsxFlowElement',
        name: 'Blockquote',
        attributes: [],
        children,
      });
      return;
    }

    const para = lastChild as Paragraph;
    const paraChildren = [...para.children];

    let fullText = '';
    for (const child of paraChildren) {
      if (child.type === 'text') fullText += (child as Text).value;
      else if (child.type === 'link') {
        const link = child as Link;
        fullText += `[${link.children.map(c => (c as Text).value).join('')}](${link.url})`;
      }
    }

    const sourceMatch = fullText.match(/\s+\/\s*source:\s*\[([^\]]+)\]\(([^)]+)\)\s*$/);
    if (sourceMatch) {
      const label = sourceMatch[1];
      const url = sourceMatch[2];
      const suffix = sourceMatch[0];
      const newParaChildren = cleanParagraphChildren(paraChildren, suffix);
      const newChildren = [...children];
      if (newParaChildren.length === 0) newChildren.pop();
      else newChildren[newChildren.length - 1] = { ...para, children: newParaChildren };
      ctx.replaceNode(node, {
        type: 'mdxJsxFlowElement',
        name: 'Blockquote',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'cite', value: url },
          { type: 'mdxJsxAttribute', name: 'citeLabel', value: label || 'Source' },
        ],
        children: newChildren,
      });
      return;
    }

    const match = fullText.match(/\s+\/\s+(.+?)\s*$/);
    if (match) {
      const value = match[1].trim();
      const suffix = match[0];
      const newParaChildren = cleanParagraphChildren(paraChildren, suffix);
      const newChildren = [...children];
      if (newParaChildren.length === 0) newChildren.pop();
      else newChildren[newChildren.length - 1] = { ...para, children: newParaChildren };

      const component: any = {
        type: 'mdxJsxFlowElement',
        name: 'Blockquote',
        attributes: [],
        children: newChildren,
      };

      if (value.startsWith('author:')) {
        const slug = value.replace(/^author:\s*/, '');
        if (slug) {
          component.attributes.push({ type: 'mdxJsxAttribute', name: 'authorSlug', value: slug });
        }
      } else if (/^https?:\/\//.test(value)) {
        component.attributes.push({ type: 'mdxJsxAttribute', name: 'cite', value });
      } else {
        component.attributes.push({ type: 'mdxJsxAttribute', name: 'authorName', value });
      }
      ctx.replaceNode(node, component);
      return;
    }

    ctx.replaceNode(node, {
      type: 'mdxJsxFlowElement',
      name: 'Blockquote',
      attributes: [],
      children,
    });
  },
});