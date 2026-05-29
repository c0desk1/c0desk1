// src/lib/mdx/satteri-code-block.ts
import { defineMdastPlugin } from "satteri";

type Attr = { name: string; value: string };

const getAttr = (attrs: Attr[], name: string) =>
  attrs.find((a) => a.name === name)?.value ?? "";

export const satteriCodeBlock = defineMdastPlugin({
  name: "satteri-code-block",
  containerDirective(node: any, ctx: any) {
    if (node.name !== "code") return;
    
    const codeNode = (node.children ?? []).find(
      (c: any) => c.type === "code"
    );
    if (!codeNode) return;

    const attrs: Attr[] = Array.isArray(node.attributes)
      ? node.attributes
      : [];

    const ins   = getAttr(attrs, "ins");
    const del   = getAttr(attrs, "del");
    const mark  = getAttr(attrs, "mark");
    const title = getAttr(attrs, "title");

    const component: any = {
      type:       "mdxJsxFlowElement",
      name:       "Code",
      attributes: [
        { type: "mdxJsxAttribute", name: "ins",   value: ins   },
        { type: "mdxJsxAttribute", name: "del",   value: del   },
        { type: "mdxJsxAttribute", name: "mark",  value: mark  },
        { type: "mdxJsxAttribute", name: "title", value: title },
      ].filter((a) => a.value),
      children: [codeNode],
    };

    ctx.replaceNode(node, component);
  },
});