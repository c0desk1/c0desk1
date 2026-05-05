// src/components/layout/MDXComponents.tsx
import Heading from '@/components/mdx/Heading';
import type { MDXComponents } from 'mdx/types';

import Image from "@/components/mdx/Image.astro";
import HR from "@/components/mdx/HR.astro";
import Table from '@/components/mdx/Table.astro';
import Details from '@/components/mdx/Details';
import Callout from '@/components/mdx/Callout.astro';
import Steps from '@/components/mdx/Steps.astro';
import CodeGroup from '@/components/mdx/Code.astro';
import InlineLink from '@/components/mdx/InlineLink.astro';
import CallQuote from '@/components/mdx/CallQuote.astro';

export const components: MDXComponents = {
  h1: (props) => <Heading as="h1" {...props} />,
  h2: (props) => <Heading as="h2" {...props} />,
  h3: (props) => <Heading as="h3" {...props} />,
  h4: (props) => <Heading as="h4" {...props} />,
  h5: (props) => <Heading as="h5" {...props} />,
  h6: (props) => <Heading as="h6" {...props} />,
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