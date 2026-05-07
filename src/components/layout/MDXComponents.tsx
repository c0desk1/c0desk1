// src/components/layout/MDXComponents.tsx

import type { MDXComponents } from 'mdx/types';

import Heading from '@/components/mdx/HeadingAnchor.astro';
import Image from "@/components/mdx/Image.astro";
import HR from "@/components/mdx/HR.astro";
import Table from '@/components/mdx/Table.astro';
import Details from '@/components/mdx/Details.astro';
import Callout from '@/components/mdx/Callout.astro';
import Steps from '@/components/mdx/Steps.astro';
import CodeGroup from '@/components/mdx/Code.astro';
import InlineLink from '@/components/mdx/InlineLink.astro';
import CallQuote from '@/components/mdx/CallQuote.astro';

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
  details: Details,
  Callout,
  Steps,
  CodeGroup
};