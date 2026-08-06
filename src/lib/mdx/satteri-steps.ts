// src/lib/mdx/satteri-steps.ts
import { defineMdastPlugin } from 'satteri';
import type { List, ListItem, BlockContent, DefinitionContent } from 'mdast';

type DirectiveChild = BlockContent | DefinitionContent;

export const satteriSteps = defineMdastPlugin({
  name: 'satteri-steps',
  
  containerDirective(node, ctx) {
    if (node.name !== 'steps') return;

    const baseData = node.data || {};
    ctx.setProperty(node, 'data', {
      ...baseData,
      hName: 'div',
      hProperties: {
        ...baseData.hProperties,
        className: ['steps-wrapper']
      }
    });

    const stepItems: ListItem[] = [];
    let currentStep: ListItem | null = null;

    for (const child of node.children) {
      if (child.type === 'list' && child.ordered) {
        for (const li of child.children) {
          const newLi: ListItem = { 
            ...li, 
            spread: true, 
            children: [...li.children] 
          } as ListItem;
          
          stepItems.push(newLi);
          currentStep = newLi; 
        }
      } 
      else {
        if (!currentStep) {
          currentStep = { type: 'listItem', spread: true, children: [] };
          stepItems.push(currentStep);
        }
        currentStep.children.push(child as DirectiveChild);
      }
    }

    const masterList: List = {
      type: 'list',
      ordered: true,
      start: 1,
      spread: true, 
      data: {
        hProperties: { className: ['steps'] }
      },
      children: stepItems
    };

    ctx.setProperty(node, 'children', [masterList] as DirectiveChild[]);
  }
});
