import { Children, isValidElement, type ReactNode, type DetailsHTMLAttributes } from 'react';
import Icon from '../ui/Icon'; // pake Icon lu

interface Props extends DetailsHTMLAttributes<HTMLDetailsElement> {
  children: ReactNode;
}

export default function Details({ children,...props }: Props) {
  let summaryContent: ReactNode = null;
  const bodyContent: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === 'summary') {
      summaryContent = (
        <>
          <Icon name="chevron-right" className="details-icon" />
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