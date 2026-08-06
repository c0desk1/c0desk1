import { defineMdastPlugin } from "satteri";

export const satteriSteps = defineMdastPlugin({
  name: "satteri-steps",

  containerDirective(node, ctx) {
    if (node.name !== "steps") return;

    const children = [...node.children];

    const stepChildren: any[] = [];
    let current: any = null;

    for (const child of children) {
      if (child.type === "list" && child.ordered) {
        const firstItem = child.children?.[0];

        if (!firstItem) continue;

        current = {
          type: "mdxJsxFlowElement",
          name: "li",
          attributes: [],
          children: [...firstItem.children],
        };

        stepChildren.push(current);
      } else if (current) {
        current.children.push(child);
      }
    }

    ctx.replaceNode(node, {
      type: "mdxJsxFlowElement",
      name: "Steps",
      attributes: [],
      children: stepChildren,
    });
  },
});
