import { useState, useRef, useEffect, Children, isValidElement, type ReactNode } from 'react';
import Icon from '../ui/Icon';

interface Props {
  variant?: 'note' | 'info' | 'tip' | 'warning' | 'danger';
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function Details({ variant, defaultOpen = false, children }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | 'auto'>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  let summaryContent: ReactNode = null;
  const bodyContent: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === 'summary') {
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

  const toggle = () => setIsOpen(!isOpen);

  return (
    <details
      open={isOpen}
      data-callout={variant}
      className={variant? 'callout' : ''}
    >
      <summary onClick={(e) => { e.preventDefault(); toggle(); }}>
        <Icon name="chevron-right" className="details-icon" />
        {summaryContent}
      </summary>

      <div
        style={{ height: height === 'auto'? 'auto' : `${height}px` }}
        className="overflow-hidden transition-[height] duration-200 ease-out"
      >
        <div ref={contentRef} className="details-content">
          {bodyContent}
        </div>
      </div>
    </details>
  );
}