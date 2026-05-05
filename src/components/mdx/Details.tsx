import { Children, isValidElement, type ReactNode, type DetailsHTMLAttributes } from 'react';
import Icon from '@/components/ui/Icon';

const ChevronIcon = () => (
  <Icon name="chevron-right" className="details-icon" />
);

interface Props extends DetailsHTMLAttributes<HTMLDetailsElement> {
  summary?: string;
  children: ReactNode;
}

function isSummaryElement(child: any): boolean {
  if (!isValidElement(child)) return false;

  const type = child.type as any;

  const typeName =
    typeof type === 'string'
      ? type
      : type?.displayName || type?.name || '';

  const props = child.props as any;

  return (
    typeName === 'summary' ||
    props?.originalType === 'summary' ||
    props?.mdxType === 'summary'
  );
}

export default function Details({ summary: propSummary, children, ...props }: Props) {
  let summaryText = propSummary || 'Details';
  let contentNodes: ReactNode[] = [];
  let hasSummaryChild = false;

  const childArray = Children.toArray(children);

  childArray.forEach((child) => {
    if (!hasSummaryChild && isSummaryElement(child) && isValidElement(child)) {
      const props = child.props as any;
      summaryText = props.children;
      hasSummaryChild = true;
    } else {
      contentNodes.push(child);
    }
  });

  if (!propSummary && !hasSummaryChild) {
    let fullText = '';
    const tempNodes: ReactNode[] = [];

    childArray.forEach((child) => {
      if (typeof child === 'string') {
        fullText += child;
      } else {
        tempNodes.push(child);
      }
    });

    if (fullText.trim()) {
      const lines = fullText.trim().split('\n');
      summaryText = lines[0].trim();
      const remainingText = lines.slice(1).join('\n').trim();

      contentNodes = [];
      if (remainingText) contentNodes.push(remainingText);
      contentNodes.push(...tempNodes);
    } else {
      contentNodes = tempNodes;
    }
  }

  if (propSummary && contentNodes.length > 0 && typeof contentNodes[0] === 'string') {
    const firstLine = contentNodes[0].trim().split('\n')[0].trim();

    if (firstLine === propSummary.trim()) {
      const lines = contentNodes[0].trim().split('\n');
      const rest = lines.slice(1).join('\n').trim();
      contentNodes[0] = rest || null;
      contentNodes = contentNodes.filter(Boolean);
    }
  }

  return (
    <details className="details" {...props}>
      <summary>
        <ChevronIcon />
        {summaryText}
      </summary>
      {contentNodes.length > 0 && <>{contentNodes}</>}
    </details>
  );
}
