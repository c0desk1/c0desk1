import type { HTMLAttributes } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import Icon from '../ui/Icon';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

function LinkIcon() {
  return (
    <Icon name="link" className="w-5 h-5" />
  );
}

const extractText = (node: React.ReactNode): string => {
  if (node === null || node === undefined) return '';
  if (typeof node === 'string' || typeof node === 'number') return node.toString();
  if (Array.isArray(node)) return node.map(extractText).join('');
  
  if (
    React.isValidElement(node) &&
    node.props !== null &&
    typeof node.props === 'object' &&
    'children' in node.props
  ) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
};

export default function Heading({
  as: Tag = 'h2',
  id,
  children,
  className,
  ...props
}: HeadingProps) {
  const [isActive, setIsActive] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  const text = extractText(children);
  const computedId =
    id ??
    (text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '') || 'heading');

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (headingRef.current && !headingRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleHeadingClick = () => {
    setIsActive(true);
    
    const target = document.querySelector(`#${computedId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${computedId}`);
    }
  };

  return (
    <Tag
      ref={headingRef}
      id={computedId}
      onClick={handleHeadingClick}
      className={`group flex items-center gap-2 cursor-pointer ${className ?? ''}`}
      {...props}
    >
      {children}
      <a
        href={`#${computedId}`}
        className={`anchor-link ${isActive ? 'anchor-link-active' : ''}`}
        aria-label={`Link to ${text}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <LinkIcon />
      </a>
    </Tag>
  );
}
