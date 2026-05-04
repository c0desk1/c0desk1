import { type ReactNode, Children, isValidElement } from 'react';
import Icon from '@/components/ui/Icon';

interface Props {
  summary?: string;
  children: ReactNode;
}
function getText(children: ReactNode): string {
  return Children.toArray(children)
   .map(child => {
      if (typeof child === 'string') return child;
      if (isValidElement(child) && child.props.children) {
        return getText(child.props.children);
      }
      return '';
    })
   .join('');
}

export default function Details({ summary: propSummary, children }: Props) {
  const text = getText(children).trim();
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const summary = propSummary?? (lines[0]?? '');
  const hasContent = propSummary?!!text : lines.length > 1;

  return (
    <details className="details">
      <summary className="details-summary">
        <Icon name="chevron-right" className="details-icon" />
        {summary}
      </summary>
      {hasContent && (
        <div className="details-content">
          {propSummary? children : (
            <>{Children.toArray(children).slice(1)}</>
          )}
        </div>
      )}
    </details>
  );
}