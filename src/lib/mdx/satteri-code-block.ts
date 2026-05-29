import { defineMdastPlugin } from "satteri";

export const satteriCodeBlock = defineMdastPlugin({
  name: "satteri-code-block",
  containerDirective(node: any, ctx: any) {
    if (node.name !== "code") return;

    const codeNode = (node.children ?? []).find(
      (c: any) => c.type === "code"
    );
    if (!codeNode) return;

    let ins = "";
    let del = "";
    let mark = "";
    let title = "";

    const extractTextDirectives = (children: any[]) => {
      for (const child of children) {
        if (child.type === "textDirective") {
          const value = child.children?.[0]?.value || "";
          
          if (child.name === "ins") ins = value;
          if (child.name === "del") del = value;
          if (child.name === "mark") mark = value;
          if (child.name === "title") title = value;
        } else if (child.children) {
          extractTextDirectives(child.children);
        }
      }
    };

    extractTextDirectives(node.children ?? []);

    const component: any = {
      type:       "mdxJsxFlowElement",
      name:       "Code",
      attributes: [
        { type: "mdxJsxAttribute", name: "ins",   value: ins   },
        { type: "mdxJsxAttribute", name: "del",   value: del   },
        { type: "mdxJsxAttribute", name: "mark",  value: mark  },
        { type: "mdxJsxAttribute", name: "title", value: title },
      ].filter((a) => a.value !== ""),
      children: [codeNode],
    };

    ctx.replaceNode(node, component);
  },
});
