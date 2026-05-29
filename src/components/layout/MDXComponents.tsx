// src/components/layout/MDXComponents.tsx

import type { MDXComponents } from 'mdx/types';

import Heading from '@/components/mdx/Heading.astro';
import P from '@/components/mdx/P.astro';
import LI from '@/components/mdx/LI.astro';
import UL from '@/components/mdx/UL.astro';
import OL from '@/components/mdx/OL.astro';
import Image from "@/components/mdx/imageMDX.astro";
import Table from '@/components/mdx/Table.astro';
import Details from '@/components/mdx/Details.astro';
import Steps from '@/components/mdx/Steps.astro';
import Code from '@/components/mdx/Code.astro';
import InlineLink from '@/components/mdx/InlineLink.astro';
import Blockquote from '@/components/mdx/Blockquote.astro';
import Footnotes from '@/components/mdx/Footnotes.astro';
import Callout from '../mdx/Callout.astro';
import Accordion from '../mdx/Accordion.astro';
import Timeline from '../mdx/Timeline.astro';
import Badge from '../mdx/Badge.astro';
import Kbd from '../mdx/KBD.astro';
import Changelog from '../mdx/changelog.astro';
import Banner from '../mdx/Banner.astro';
import Video from '../mdx/Video.astro';

export const components: MDXComponents = {
  Heading,
  Blockquote,
  Callout,
  Details,
  Changelog,
  Steps,
  Timeline,
  p: P,
  li: LI,
  ul: UL,
  ol: OL,
  a: InlineLink,
  img: Image,
  table: Table,
  Code,
  footnotes: Footnotes,
  Footnotes,
  Accordion,
  Badge,
  Kbd,
  Banner,
  Video,
  Table,
};
