// src/lib/mdx/remark-footnote-id.ts
import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root } from 'mdast';

const remarkFootnotes: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'footnoteDefinition', (node: any) => {
      if (!node.data) node.data = {};
      if (!node.data.hProperties) node.data.hProperties = {};
      
      node.data.hProperties.id = `user-content-fn-${node.identifier}`;
    });
  };
};

export default remarkFootnotes;