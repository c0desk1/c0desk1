// src/components/layout/MDXComponents.tsx

import type { MDXComponents } from 'mdx/types';

import Heading from '@/components/mdx/HeadingAnchor.astro';
import Image from "@/components/mdx/imageMDX.astro";
import HR from "@/components/mdx/HR.astro";
import Table from '@/components/mdx/Table.astro';
import Details from '@/components/mdx/Details.astro';
import Steps from '@/components/mdx/Steps.astro';
import Code from '@/components/mdx/Code.astro';
import InlineLink from '@/components/mdx/InlineLink.astro';
import CallQuote from '@/components/mdx/CallQuote.astro';
import Footnotes from '@/components/mdx/Footnotes.astro';
import P from '@/components/mdx/P.astro';
import LI from '@/components/mdx/LI.astro';
import UL from '@/components/mdx/UL.astro';
import OL from '@/components/mdx/OL.astro';

export const components: MDXComponents = {
  h1: Heading,
  h2: Heading,
  h3: Heading,
  h4: Heading,
  h5: Heading,
  h6: Heading,
  a: InlineLink,
  img: Image,
  hr: HR,
  blockquote: CallQuote,
  table: Table,
  Details,
  Steps,
  Code,
  Footnotes,
  p: P,
  ul: UL,
  ol: OL,
  li: LI,
};