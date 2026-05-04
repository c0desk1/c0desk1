import { useState, useRef, useEffect, Children, isValidElement, type ReactNode, type HTMLAttributes } from 'react';
import Icon from '../ui/Icon';

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?: 'note' | 'info' | 'tip' | 'warning' | 'danger';
  defaultOpen?: boolean;
  open?: boolean;
  children: ReactNode;
}

export default function Details({ variant, defaultOpen, open, children,...props }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen?? open?? false);
  const [height, setHeight] = useState<number | 'auto'>(isOpen? 'auto' : 0);
  const contentRef = useRef<HTMLDivElement>(null);

  let summaryContent: ReactNode = null;
  const bodyContent: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      bodyContent.push(child);
      return;
    }

    // Cek 3 kemungkinan bentuk <summary> dari MDX
    const isSummary =
      child.type === 'summary' ||
      child.props?.originalType === 'summary' ||
      child.props?.mdxType === 'summary';

    if (isSummary) {
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
      const currentHeight = contentRef.current.scrollHeight;
      setHeight(currentHeight);
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
        <Icon name="chevron-right" className="details-icon" />
        {summaryContent || 'Details'} {/* Fallback kalo summary kosong */}
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