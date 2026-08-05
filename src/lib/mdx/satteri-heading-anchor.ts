import { defineHastPlugin } from "satteri";

export const satteriHeadingAnchor = defineHastPlugin({
  name: "satteri-heading-anchor",

  element: {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],

    visit(node, ctx) {
      const id = node.properties?.id;

      if (typeof id !== "string" || !id) {
        return;
      }

      const hasAnchor = node.children.some(
        (child) =>
            child.type === "element" &&
            child.tagName === "a" &&
            child.properties?.href === `#${id}`,
        );

      if (hasAnchor) {
        return;
      }

      const anchor = {
        type: "element" as const,
        tagName: "a",
        properties: {
          href: `#${id}`,
          className: ["heading-anchor"],
          ariaLabel: `Tautan ke ${ctx.textContent(node)}`,
        },
        children: [],
      };

      ctx.appendChild(node, anchor);
    },
  },
});
