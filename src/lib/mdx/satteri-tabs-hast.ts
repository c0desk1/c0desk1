// src/lib/mdx/satteri-tabs-hast.ts

import { defineHastPlugin } from "satteri";
import type {
  Element,
  ElementContent,
  Properties,
} from "hast";

function getClassName(node: Element): string[] {
  const value = node.properties?.className;

  if (Array.isArray(value)) {
    return value.map(String);
  }

  if (typeof value === "string") {
    return value.split(/\s+/).filter(Boolean);
  }

  return [];
}

function getDataValue(
  node: Element,
  name: string,
): string | undefined {
  const properties = node.properties;

  if (!properties) {
    return undefined;
  }

  const camelCaseName =
    `data${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  const value =
    properties[name] ??
    properties[camelCaseName];

  if (typeof value === "string") {
    return value;
  }

  return undefined;
}

function createText(value: string): ElementContent {
  return {
    type: "text",
    value,
  };
}

function createElement(
  tagName: string,
  properties: Properties,
  children: ElementContent[] = [],
): Element {
  return {
    type: "element",
    tagName,
    properties,
    children,
  };
}

export const satteriTabsHast = defineHastPlugin({
  name: "satteri-tabs-hast",

  element: {
    filter: ["div"],

    visit(node, ctx) {
      const classes = getClassName(node);

      if (!classes.includes("tabs")) {
        return;
      }

      const children = node.children || [];

      const panels = children.filter(
        (child): child is Element => {
          if (child.type !== "element") {
            return false;
          }

          const childClasses = getClassName(child);

          return (
            childClasses.includes("tab-panel") ||
            child.properties?.dataTab !== undefined
          );
        },
      );

      if (panels.length === 0) {
        return;
      }

      const groupIndex = ctx.indexOf(node) ?? 0;
      const groupId = `tabs-${groupIndex}`;

      const tabs = panels.map((panel, index) => {
        const label =
          getDataValue(panel, "tabLabel") ||
          `Tab ${index + 1}`;

        const tabId = `${groupId}-tab-${index}`;
        const panelId = `${groupId}-panel-${index}`;

        ctx.setProperty(
          panel,
          "id",
          panelId,
        );

        ctx.setProperty(
          panel,
          "role",
          "tabpanel",
        );

        ctx.setProperty(
          panel,
          "aria-labelledby",
          tabId,
        );

        ctx.setProperty(
          panel,
          "tabindex",
          index === 0 ? 0 : -1,
        );

        if (index !== 0) {
          ctx.setProperty(
            panel,
            "hidden",
            true,
          );
        }

        return {
          tabId,
          panelId,
          label,
          active: index === 0,
        };
      });

      const tabButtons: ElementContent[] =
        tabs.map((tab) =>
          createElement(
            "button",
            {
              type: "button",
              id: tab.tabId,
              role: "tab",
              "aria-selected": tab.active
                ? "true"
                : "false",
              "aria-controls": tab.panelId,
              tabindex: tab.active ? 0 : -1,
              className: ["tab-button"],
              dataTabTrigger: "",
            },
            [createText(tab.label)],
          ),
        );

      const tabList = createElement(
        "div",
        {
          className: ["tabs-list"],
          role: "tablist",
          "aria-orientation": "horizontal",
        },
        tabButtons,
      );

      const panelsContainer = createElement(
        "div",
        {
          className: ["tabs-panels"],
        },
        panels,
      );

      ctx.setProperty(
        node,
        "children",
        [
          tabList,
          panelsContainer,
        ],
      );
    },
  },
});
