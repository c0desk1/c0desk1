// src/lib/mdx/satteri-callout-directive.ts
import { defineMdastPlugin } from "satteri";

const CALLOUT_TYPES = {
  NOTE: "note",
  TIP: "tip",
  IMPORTANT: "important",
  WARNING: "warning",
  CAUTION: "caution",
  DANGER: "danger"
} as const;

type CalloutType = keyof typeof CALLOUT_TYPES;

export const satteriCalloutDirective = defineMdastPlugin({
  name: "satteri-callout-directive",

  containerDirective(node, ctx) {
    const name = node.name?.toUpperCase();
    if (!name || !(name in CALLOUT_TYPES)) {
      return;
    }

    const type = CALLOUT_TYPES[name as CalloutType];

    const asideNode = {
      type: "element",
      tagName: "aside",
      properties: {
        "data-callout": type,
        className: ["callout"],
      },
      children: node.children,
    };

    ctx.replaceNode(node, asideNode);
  },
});