// @ts-nocheck
import { defineMdastPlugin } from 'satteri';

export const satteriAccordion = defineMdastPlugin({
  name: 'satteri-accordion',
  containerDirective(node: any, ctx: any) {
    if (node.name !== 'accordion') return;

    const title = node.params?.trim() || 'FAQ';

    const component: any = {
      type: 'mdxJsxFlowElement',
      name: 'Accordion',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'title',
          value: title,
        },
      ],
      children: node.children,
    };

    ctx.replaceNode(node, component);
  },
});