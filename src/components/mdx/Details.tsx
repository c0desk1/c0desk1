import { Children, isValidElement, type ReactNode, type DetailsHTMLAttributes } from 'react';
import Icon from '../ui/Icon';

interface Props extends DetailsHTMLAttributes<HTMLDetailsElement> {
  children: ReactNode;
}

export default function Details({ children,...props }: Props) {
  let summaryContent: ReactNode = null;
  const bodyContent: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      bodyContent.push(child);
      return;
    }

    const isSummary =
      child.type === 'summary' ||
      child.props?.originalType === 'summary' ||
      child.props?.mdxType === 'summary';

    if (isSummary) {
      summaryContent = (
        <>
          <Icon name="chevron-right" className="details-icon w-4 h-4" />
          {child.props.children}
        </>
      );
    } else {
      bodyContent.push(child);
    }
  });

  return (
    <details {...props}>
      <summary>{summaryContent}</summary>
      {bodyContent}
    </details>
  );
}