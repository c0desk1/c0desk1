// src/components/mdx/Heading.tsx
import type { HTMLAttributes } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

function LinkIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.7076 18.3639L11.2933 19.7781C9.34072 21.7308 6.1749 21.7308 4.22228 19.7781C2.26966 17.8255 2.26966 14.6597 4.22228 12.7071L5.63649 11.2929M18.3644 12.7071L19.7786 11.2929C21.7312 9.34024 21.7312 6.17441 19.7786 4.22179C17.826 2.26917 14.6602 2.26917 12.7076 4.22179L11.2933 5.636M8.50045 15.4999L15.5005 8.49994"
      />
    </svg>
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