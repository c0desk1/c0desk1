// src/components/Search.tsx
import { useState, useEffect, useRef } from 'react';
import { CATEGORIES, SERIES } from '@/consts';
import Fuse from 'fuse.js';

import IconReact from '@/components/ui/icons/IconReact';

interface SearchItem {
  title: string;
  description: string;
  category: string;
  type: 'blog' | 'guide';
  url: string;
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [searchData, setSearchData] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const topCategories = CATEGORIES.slice(0, 4);
  const topSeries = SERIES.slice(0, 4);

  useEffect(() => {
    if (isOpen && searchData.length === 0) {
      fetch('/api/search.json')
        .then((res) => res.json())
        .then((data) => setSearchData(data))
        .catch((err) => console.error("Gagal mengambil data pencarian:", err));
    }
  }, [isOpen, searchData.length]);

  useEffect(() => {
    if (!query || searchData.length === 0) {
      setResults([]);
      return;
    }

    const fuse = new Fuse(searchData, {
      keys: [
        { name: 'title', weight: 2.5 },
        { name: 'category', weight: 1.5 },
        { name: 'description', weight: 1 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true,
    });

    const searchResults = fuse.search(query).slice(0, 6).map(res => res.item);
    setResults(searchResults);
  }, [query, searchData]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-search', handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-search', handleOpen);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100); 
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-32"
    >
      <div
        className="absolute inset-0 bg-base/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-(--border) bg-base shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        <div className="flex items-center gap-3 px-4 shrink-0 border-b border-(--border)">
          <span className="inline-flex shrink-0 items-center justify-center w-5 h-5">
            <IconReact name="search" className='w-full h-full text-muted' />
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari artikel, guide, atau topik..."
            className="flex-1 min-w-0 border-none bg-transparent py-4 text-body-14 md:text-body-16 text-strong outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
            autoComplete="off"
            spellCheck="false"
          />
          <button onClick={() => query ? setQuery('') : setIsOpen(false)}
            className="flex h-8 w-8 p-1.5 shrink-0 items-center justify-center rounded-md text-muted hover:bg-subtle hover:text-strong transition-colors">
                <IconReact name="close" className='w-full h-full' />
          </button>
        </div>
        <div className="overflow-y-auto p-2">
          {!query ? (
            <div className="p-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {topCategories.length > 0 && (
                  <div>
                    <h3 className="px-3 mb-2 text-mono-label-13 font-medium text-strong uppercase">
                        Blog
                    </h3>
                    <ul className="flex flex-col gap-1">
                      {topCategories.map(c => (
                        <li key={c.slug}>
                          <button 
                            onClick={() => setQuery(c.label)} 
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-body-14 lg:text-body-16 font-medium text-muted hover:bg-subtle hover:text-strong transition-colors">
                            <span className="inline-flex shrink-0 items-center justify-center h-5 w-5 text-subtle">
                              <IconReact name="blog" className='w-full h-full text-muted' />
                            </span>
                            <span className="truncate">{c.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {topSeries.length > 0 && (
                  <div>
                    <h3 className="px-3 mb-2 text-mono-label-13 font-medium text-strong uppercase">
                      Guide
                    </h3>
                    <ul className="flex flex-col gap-1">
                      {topSeries.map(s => (
                        <li key={s.slug}>
                          <button 
                            onClick={() => setQuery(s.label)}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-body-14 lg:text-body-16 font-medium text-muted hover:bg-subtle hover:text-strong transition-colors"
                          >
                            <span className="inline-flex shrink-0 items-center justify-center h-5 w-5 text-subtle">
                              <IconReact name="brain" className='w-full h-full text-muted' />
                            </span>
                            <span className="truncate">{s.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          ) : (
            
            <div>
              {results.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {results.map((item) => (
                    <li key={item.url}>
                      <a
                        href={item.url}
                        className="group flex items-center justify-between gap-4 rounded-xl px-3 py-3 hover:bg-subtle transition-colors"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-base text-muted group-hover:text-strong transition-colors">
                            {item.type === 'blog' ? (
                                <span className="inline-flex shrink-0 items-center justify-center h-5 w-5 text-subtle">
                                    <IconReact name="blog" className='w-full h-full text-muted' />
                                </span>
                            ) : (
                                <span className="inline-flex shrink-0 items-center justify-center h-5 w-5 text-subtle">
                                    <IconReact name="brain" className='w-full h-full text-muted' />
                                </span>
                            )}
                          </div>
                          
                          <div className="flex flex-col min-w-0">
                            <span className="text-body-14 font-medium text-strong truncate transition-colors">
                              {item.title}
                            </span>
                            <span className="text-label-13 text-muted truncate mt-0.5">
                              {item.type === 'blog' ? 'Blog' : 'Guide'} • {item.category}
                            </span>
                          </div>
                        </div>
                        
                        <kbd className="hidden sm:inline-flex items-center rounded-md border border-(--border) bg-base px-2 py-1 text-[10px] text-subtle font-mono font-medium shadow-sm group-hover:text-strong group-hover:border-strong transition-colors shrink-0">
                          Enter ↵
                        </kbd>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                
                <div className="py-16 flex flex-col items-center justify-center text-center px-4 gap-2">
                    <span className="inline-flex shrink-0 items-center justify-center h-12 w-12 text-subtle">
                        <IconReact name="search" className='w-full h-full text-dim' />
                    </span>
                    <p className="text-body-16 text-strong font-medium">Tidak ada hasil untuk "{query}"</p>
                    <p className="text-label-14 text-muted mt-1">Coba gunakan kata kunci atau ejaan yang berbeda.</p>
                </div>
              )}
            </div>

          )}
        </div>
      </div>
    </div>
  );
}