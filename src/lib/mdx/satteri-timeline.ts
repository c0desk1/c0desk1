import { defineMdastPlugin } from 'satteri';

export const satteriTimeline = defineMdastPlugin({
  name: 'satteri-timeline',
  containerDirective(node, ctx) {
    if (node.name !== 'timeline') return;

    const component: any = {
      type: 'mdxJsxFlowElement',
      name: 'Timeline',
      attributes: [],
      children: node.children,
    };
    ctx.replaceNode(node, component);
  },
});