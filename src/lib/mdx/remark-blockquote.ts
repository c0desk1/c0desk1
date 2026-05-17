import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const remarkBlockquoteAuthor: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      if (!parent || index === undefined) return;

      const children = node.children;
      if (!children || children.length === 0) return;

      const lastChild = children[children.length - 1];
      let slug: string | undefined;

      if (lastChild.type === 'paragraph') {
        const textNodes = lastChild.children.filter(
          (c): c is { type: 'text'; value: string } => c.type === 'text'
        );
        if (textNodes.length > 0) {
          const fullText = textNodes.map((t) => t.value).join('');
          const match = fullText.match(/\s+\/\s+([a-zA-Z0-9_-]+)\s*$/);
          if (match) {
            slug = match[1];
            const suffix = match[0];
            const lastTextNode = textNodes[textNodes.length - 1];
            const suffixIndex = lastTextNode.value.lastIndexOf(suffix);
            if (suffixIndex !== -1) {
              lastTextNode.value =
                lastTextNode.value.substring(0, suffixIndex) +
                lastTextNode.value.substring(suffixIndex + suffix.length);
            }
            const remainingText = lastChild.children
              .map((c) => (c.type === 'text' ? c.value : ''))
              .join('')
              .trim();
            if (remainingText === '') {
              children.pop();
            }
          }
        }
      }

      const mdxNode: any = {
        type: 'mdxJsxFlowElement',
        name: 'Blockquote',
        attributes: [],
        children: [...children],
      };

      if (slug) {
        mdxNode.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'author',
          value: slug,
        });
      }

      parent.children.splice(index, 1, mdxNode);
    });
  };
};

export default remarkBlockquoteAuthor;