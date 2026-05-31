// src/lib/mdx/satteri-code-block.ts
import { defineMdastPlugin } from "satteri";

export const satteriCodeBlock = defineMdastPlugin({
  name: "satteri-code-block",

  containerDirective(node: any, ctx: any) {
    if (node.name !== "code") return;

    const codeNode = (node.children ?? []).find(
      (c: any) => c.type === "code"
    );
    if (!codeNode) return;

    let title = "";
    let ins   = "";
    let del   = "";
    let mark  = "";

    for (const child of node.children ?? []) {
      const candidates =
        child.type === "textDirective"
          ? [child]
          : child.type === "paragraph"
          ? (child.children ?? []).filter((c: any) => c.type === "textDirective")
          : [];

      for (const d of candidates) {
        const value = (d.children ?? [])
          .map((c: any) => c.value ?? "")
          .join("")
          .trim();

        switch (d.name) {
          case "title": title = value; break;
          case "ins":   ins   = value; break;
          case "del":   del   = value; break;
          case "mark":  mark  = value; break;
        }
      }
    }
    const attributes = [
      title && { type: "mdxJsxAttribute", name: "title", value: title },
      ins   && { type: "mdxJsxAttribute", name: "ins",   value: ins   },
      del   && { type: "mdxJsxAttribute", name: "del",   value: del   },
      mark  && { type: "mdxJsxAttribute", name: "mark",  value: mark  },
    ].filter(Boolean);

    const component = {
      type:       "mdxJsxFlowElement",
      name:       "Code",
      attributes,
      children:   [codeNode],
    };

    ctx.replaceNode(node, component);
  },
});