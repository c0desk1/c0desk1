import { Children, isValidElement, type ReactNode, type DetailsHTMLAttributes } from 'react';
import Icon from '../ui/Icon';

interface Props extends DetailsHTMLAttributes<HTMLDetailsElement> {
  children: ReactNode;
}

function getDisplayName(type: any): string {
  if (typeof type === 'string') return type;
  return type?.displayName || type?.name || '';
}

export default function Details({ children,...props }: Props) {
  let summaryNode: ReactNode = null;
  const bodyNodes: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      bodyNodes.push(child);
      return;
    }

    const typeName = getDisplayName(child.type);
    const isSummary = 
      typeName === 'summary' || 
      child.props?.originalType === 'summary' ||
      child.props?.mdxType === 'summary';

    if (isSummary) {
      summaryNode = (
        <>
          <Icon name="chevron-right" className="details-icon" />
          {child.props.children}
        </>
      );
    } else {
      bodyNodes.push(child);
    }
  });

  if (!summaryNode) {
    return <details {...props}>{children}</details>;
  }

  return (
    <details {...props}>
      <summary>{summaryNode}</summary>
      {bodyNodes}
    </details>
  );
}