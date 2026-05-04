import { Children, isValidElement, type ReactNode, type DetailsHTMLAttributes } from 'react';
import Icon from '@/components/ui/Icon';

const ChevronIcon = () => (
  <Icon name="chevron-right">
);

interface Props extends DetailsHTMLAttributes<HTMLDetailsElement> {
  summary?: string;
  children: ReactNode;
}

function isSummaryElement(child: any): boolean {
  if (!isValidElement(child)) return false;
  const type = child.type;
  const typeName = typeof type === 'string'? type : type?.displayName || type?.name || '';
  return (
    typeName === 'summary' ||
    child.props?.originalType === 'summary' ||
    child.props?.mdxType === 'summary'
  );
}

export default function Details({ summary: propSummary, children,...props }: Props) {
  let summaryText = propSummary || 'Details';
  let contentNodes: ReactNode[] = [];
  let hasSummaryChild = false;

  const childArray = Children.toArray(children);

  // 1. Cek ada <summary> ga di children
  childArray.forEach((child) => {
    if (!hasSummaryChild && isSummaryElement(child) && isValidElement(child)) {
      summaryText = child.props.children;
      hasSummaryChild = true;
    } else {
      contentNodes.push(child);
    }
  });

  // 2. Kalo ga ada prop & ga ada <summary>, ambil dari text pertama
  if (!propSummary &&!hasSummaryChild) {
    // Gabungin semua text node dulu, MDX suka mecah2
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

  // 3. Kalo pake prop, pastiin baris pertama di children ga sama kayak summary
  if (propSummary && contentNodes.length > 0 && typeof contentNodes[0] === 'string') {
    const firstLine = contentNodes[0].trim().split('\n')[0].trim();
    if (firstLine === propSummary.trim()) {
      // Buang baris pertama yg duplikat
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