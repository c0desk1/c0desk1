// src/lib/mdx/satteri-code-block.ts
import { defineMdastPlugin } from "satteri";

function parseLineRanges(raw: string): Set<number> {
  const set = new Set<number>();
  if (!raw) return set;
  for (const part of raw.split(",")) {
    const t = part.trim();
    if (!t) continue;
    if (t.includes("-")) {
      const [a, b] = t.split("-").map(Number);
      if (!isNaN(a) && !isNaN(b)) {
        for (let i = a; i <= b; i++) set.add(i);
      }
    } else {
      const n = Number(t);
      if (!isNaN(n) && n > 0) set.add(n);
    }
  }
  return set;
}

function injectCodeNotations(
  code: string,
  lang: string,
  ins: Set<number>,
  del: Set<number>,
  mark: Set<number>
): string {
  const lines = code.split("\n");
  const prefix =
    ["js", "ts", "jsx", "tsx", "java", "c", "cpp", "go", "rust", "swift"].includes(lang) ? "//" :
    ["py", "rb", "sh", "bash", "yaml", "toml", "makefile"].includes(lang) ? "#" :
    ["html", "xml", "svg"].includes(lang) ? "<!--" :
    "//";

  return lines
    .map((line, idx) => {
      const n = idx + 1;
      let suffix = "";
      if (ins.has(n)) suffix += ` ${prefix} [!code ++]`;
      if (del.has(n)) suffix += ` ${prefix} [!code --]`;
      if (mark.has(n)) suffix += ` ${prefix} [!code highlight]`;
      return line + suffix;
    })
    .join("\n");
}

export const satteriCodeBlock = defineMdastPlugin({
  name: "satteri-code-block",

  containerDirective(node: any, ctx: any) {
    if (node.name !== "code") return;

    const codeNode = (node.children ?? []).find((c: any) => c.type === "code");
    if (!codeNode) return;

    let title = "";
    let insRaw = "";
    let delRaw = "";
    let markRaw = "";

    for (const child of node.children ?? []) {
      const directives =
        child.type === "textDirective"
          ? [child]
          : child.type === "paragraph"
          ? (child.children ?? []).filter((c: any) => c.type === "textDirective")
          : [];

      for (const d of directives) {
        const value = (d.children ?? [])
          .map((c: any) => c.value ?? "")
          .join("")
          .trim();
        if (d.name === "title") title = value;
        else if (d.name === "ins") insRaw = value;
        else if (d.name === "del") delRaw = value;
        else if (d.name === "mark") markRaw = value;
      }
    }

    const insSet = parseLineRanges(insRaw);
    const delSet = parseLineRanges(delRaw);
    const markSet = parseLineRanges(markRaw);

    if (insSet.size > 0 || delSet.size > 0 || markSet.size > 0) {
      codeNode.value = injectCodeNotations(
        codeNode.value,
        codeNode.lang || "",
        insSet,
        delSet,
        markSet
      );
    }

    node.children = (node.children ?? []).filter((child: any) => {
      if (child.type === "textDirective") return false;
      if (child.type === "paragraph") {
        const onlyDirectives = (child.children ?? []).every(
          (c: any) => c.type === "textDirective"
        );
        return !onlyDirectives;
      }
      return true;
    });

    const attributes = [
      title && { type: "mdxJsxAttribute", name: "title", value: title },
    ].filter(Boolean);

    const component = {
      type: "mdxJsxFlowElement",
      name: "Code",
      attributes,
      children: [codeNode],
    };

    ctx.replaceNode(node, component);
  },
});