// src/components/layout/MDXComponents.ts
import Blockquote from "./Blockquote.astro";
import Callout from "./Callout.astro";
import Changelog from "./Changelog.astro";
import Code from "./Code.astro";
import Figure from "./Figure.astro";
import FileTree from "./FileTree.astro";
import Kbd from "./KBD.astro";
import Link from "./Link.astro";
import Steps from "./Steps.astro";
import Video from "./Video.astro";
import LinkCard from "./LinkCard.astro";
import Tabs from "./Tabs.astro";
import CardGrid from "./CardGrid.astro";

export const components = {
  Callout,
  ChangelogContainer: Changelog,
  ChangelogItem: Changelog,
  Steps,
  a: Link,
  FileTree,
  Code,
  Kbd,
  Video,
  Blockquote,
  Figure,
  LinkCard,
  TabsContainer: Tabs, 
  TabItem: Tabs ,
  CardGrid,
};

export type MDXComponents = typeof components;
