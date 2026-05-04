// src/components/mdx/Heading.tsx
import type { HTMLAttributes } from 'react';
import Icon from '../ui/Icon';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

function LinkIcon() {
  return (
    <Icon name='link' className='w-5 h-5' />
  );
}

export default function Heading({
  as: Tag = 'h2',
  id,
  children,
  className,
  ...props
}: HeadingProps) {
  const text =
    typeof children === 'string'
      ? children
      : '';

  const computedId =
    id ??
    text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

  return (
    <Tag
      id={computedId}
      className={`group flex items-center gap-2 cursor-pointer ${className ?? ''}`}
      {...props}
    >
      {children}
      <a
        href={`#${computedId}`}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-current"
        aria-label={`Link to ${text}`}
        onClick={(e) => {
          e.preventDefault();
          const target = document.querySelector(`#${computedId}`);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, '', `#${computedId}`);
          }
        }}
      >
        <LinkIcon />
      </a>
    </Tag>
  );
}
