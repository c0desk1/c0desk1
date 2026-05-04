import { useState, Children, useRef, type ReactNode } from 'react';
import Icon from '@/components/ui/Icon';

interface Props {
  titles?: string[];
  children: ReactNode;
}

export default function CodeGroup({ titles = ['Code'], children }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const codes = Children.toArray(children);

  const handleCopy = async () => {
    const activeEl = contentRef.current?.children[activeIndex];
    const code = activeEl?.querySelector('code')?.innerText;
    if (!code) return;

    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-group not-prose mx-auto max-w-3xl my-8 overflow-hidden rounded-[var(--prose-radius-md)] border border-[var(--prose-border)] bg-[var(--prose-surface)]">
      <div className="flex items-center justify-between border-b border-[var(--prose-border)] px-2">
        <div className="flex overflow-x-auto no-scrollbar">
          {titles.map((title, index) => (
            <button
              key={index}
              data-code-tab={index}
              onClick={() => setActiveIndex(index)}
              data-active={index === activeIndex}
              className="
                relative px-4 py-2.5
                text-xs font-semibold tracking-wide
                text-[var(--prose-fg-subtle)] hover:text-[var(--prose-fg)]
                data-[active=true]:text-[var(--prose-fg)]
                transition-colors duration-150
              "
            >
              {title}
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full scale-x-0 bg-[var(--prose-accent)] transition-transform duration-200 [button[data-active=true]_&]:scale-x-100" />
            </button>
          ))}
        </div>
        <button
          className="copy-button p-2 text-[var(--prose-fg-subtle)] hover:text-[var(--prose-accent)] cursor-pointer transition-colors duration-150"
          aria-label="Copy code"
          onClick={handleCopy}
        >
          <Icon name="copy" className={`copy-icon w-4 h-4 ${copied? 'hidden' : ''}`} />
          <Icon name="check" className={`check-icon w-4 h-4 text-[var(--prose-accent)] ${copied? '' : 'hidden'}`} />
        </button>
      </div>
      <div
        ref={contentRef}
        className="code-group-content [&_pre]:m-0! [&_pre]:rounded-none! [&_pre]:border-none! [&_pre]:bg-transparent!"
      >
        {codes.map((code, index) => (
          <div key={index} style={{ display: index === activeIndex? 'block' : 'none' }}>
            {code}
          </div>
        ))}
      </div>

      <style>{`
       .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
       .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}