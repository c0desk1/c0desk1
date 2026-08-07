import { defineMdastPlugin } from "satteri";

function extractText(node: any): string {
  if (!node) return "";

  if (typeof node.value === "string") {
    return node.value;
  }

  if (Array.isArray(node.children)) {
    return node.children.map(extractText).join("");
  }

  return "";
}

function getLabel(node: any): string {
  const attributes = node.attributes;

  if (typeof attributes?.label === "string") {
    const label = attributes.label.trim();

    if (label) {
      return label;
    }
  }

  const children = node.children || [];
  const firstNode = children[0];

  if (
    firstNode?.type === "paragraph" &&
    firstNode.data?.directiveLabel
  ) {
    const label = extractText(firstNode).trim();

    if (label) {
      return label;
    }
  }

  return "";
}

export const satteriTabs = defineMdastPlugin({
  name: "satteri-tabs",

  containerDirective(node, ctx) {
    if (node.name === "tabs") {
      ctx.setProperty(node, "data", {
        ...(node.data || {}),
        hName: "div",
        hProperties: {
          ...(node.data?.hProperties || {}),
          className: ["tabs"],
          dataTabs: "",
        },
      });

      return;
    }

    if (node.name !== "tab") {
      return;
    }

    const label = getLabel(node);

    let children = node.children || [];
    
    const firstNode = children[0];

    if (
      !node.attributes?.label &&
      firstNode?.type === "paragraph" &&
      firstNode.data?.directiveLabel
    ) {
      children = children.slice(1);
    }

    ctx.setProperty(node, "data", {
      ...(node.data || {}),
      hName: "div",
      hProperties: {
        ...(node.data?.hProperties || {}),
        className: ["tab-panel"],
        dataTab: "",
        dataTabLabel: label || "Tab",
      },
    });

    ctx.setProperty(node, "children", children);
  },
});
