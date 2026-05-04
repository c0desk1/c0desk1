import { Children, isValidElement, type ReactNode, type DetailsHTMLAttributes } from 'react';

const ChevronIcon = () => (
  <svg
    className="details-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

interface Props extends DetailsHTMLAttributes<HTMLDetailsElement> {
  summary?: string; // prop opsional kayak Astro
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
  let summaryText = propSummary;
  const bodyNodes: ReactNode[] = [];
  let foundSummary = false;

  // 1. Cek kalo ada <summary> di children
  Children.forEach(children, (child) => {
    if (!foundSummary && isSummaryElement(child) && isValidElement(child)) {
      // Ambil text dari <summary>Judul</summary>
      summaryText = child.props.children;
      foundSummary = true;
    } else {
      bodyNodes.push(child);
    }
  });

  // 2. Kalo ga ada prop & ga ada <summary>, ambil baris pertama kayak Astro
  if (!summaryText &&!foundSummary) {
    const childArray = Children.toArray(children);
    if (childArray.length > 0 && typeof childArray[0] === 'string') {
      const lines = childArray[0].trim().split('\n');
      summaryText = lines[0];
      bodyNodes.push(lines.slice(1).join('\n'));
      bodyNodes.push(...childArray.slice(1));
    } else {
      bodyNodes.push(...childArray);
    }
  }

  return (
    <details className="details" {...props}>
      <summary>
        <ChevronIcon />
        {summaryText || 'Details'}
      </summary>
      {bodyNodes.length > 0 && <>{bodyNodes}</>}
    </details>
  );
}