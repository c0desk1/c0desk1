import { useState, useRef, useEffect, Children, isValidElement, type ReactNode, type HTMLAttributes } from 'react';
import Icon from '../ui/Icon';

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?: 'note' | 'info' | 'tip' | 'warning' | 'danger';
  defaultOpen?: boolean;
  open?: boolean; // buat nangkap <details open>
  children: ReactNode;
}

export default function Details({ variant, defaultOpen, open, children,...props }: Props) {
  // <details open> dari MDX bakal masuk ke prop `open`
  const [isOpen, setIsOpen] = useState(defaultOpen?? open?? false);
  const [height, setHeight] = useState<number | 'auto'>(isOpen? 'auto' : 0);
  const contentRef = useRef<HTMLDivElement>(null);

  let summaryContent: ReactNode = null;
  const bodyContent: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && (child.type === 'summary' || child.props?.mdxType === 'summary')) {
      summaryContent = child.props.children;
    } else {
      bodyContent.push(child);
    }
  });

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
      const timer = setTimeout(() => setHeight('auto'), 200);
      return () => clearTimeout(timer);
    } else {
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [isOpen]);

  return (
    <div
      {...props}
      data-callout={variant}
      className={`details ${variant? 'callout' : ''} ${isOpen? 'open' : ''} ${props.className?? ''}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="summary"
        aria-expanded={isOpen}
      >
        <Icon name="chevron-right" className="details-icon w-5 h-5" />
        {summaryContent}
      </button>

      <div
        style={{ height: height === 'auto'? 'auto' : `${height}px` }}
        className="overflow-hidden transition-[height] duration-200 ease-out"
      >
        <div ref={contentRef} className="details-content">
          {bodyContent}
        </div>
      </div>
    </div>
  );
}