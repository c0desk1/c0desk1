import { type ReactNode, type DetailsHTMLAttributes, Children, isValidElement, cloneElement } from 'react';
import Icon from '@/components/ui/Icon';

interface Props extends DetailsHTMLAttributes<HTMLDetailsElement> {
  variant?: 'default' | 'faq' | 'callout';
  children: ReactNode;
}

export default function Details({ variant = 'default', children,...props }: Props) {
  const styles = {
    default: 'border-(--prose-border) open:bg-(--prose-surface)/50',
    faq: 'border-transparent border-b-(--prose-border) rounded-none',
    callout: 'border-blue-500/30 bg-blue-500/5',
  };

  let summaryNode: ReactNode = null;
  const contentNodes: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === 'summary') {
      summaryNode = cloneElement(child, {
        className: `flex cursor-pointer select-none items-center gap-2 p-3 font-medium hover:bg-[var(--prose-surface)] [&::-webkit-details-marker]:hidden ${child.props.className?? ''}`,
        children: (
          <>
            <Icon
              name="chevron-right"
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-90"
            />
            {child.props.children}
          </>
        ),
      });
    } else {
      contentNodes.push(child);
    }
  });

  return (
    <details
      {...props}
      className={`details group my-4 rounded-lg border ${styles[variant]} ${props.className?? ''}`}
    >
      {summaryNode}
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-open:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="border-t border-[var(--prose-border)] p-3 pt-2">
            {contentNodes}
          </div>
        </div>
      </div>
    </details>
  );
}