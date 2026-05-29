import { defineMdastPlugin } from 'satteri';

export const satteriChangelog = defineMdastPlugin({
  name: 'satteri-changelog',
  containerDirective(node, ctx) {
    if (node.name !== 'changelog') return;
    const component: any = {
      type: 'mdxJsxFlowElement',
      name: 'Changelog',
      attributes: [],
      children: node.children,
    };
    ctx.replaceNode(node, component);
  },
});