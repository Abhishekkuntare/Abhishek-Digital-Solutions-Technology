import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { BusinessNiche } from '../types';
import { searchNiches, NICHES_DATABASE } from '../data/nichesData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNiche: (niche: BusinessNiche) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectNiche,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // ESC support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? searchNiches(query)
    : NICHES_DATABASE.slice(0, 8);

  const handleSelect = (niche: BusinessNiche) => {
    onSelectNiche(niche);
    onClose();
  };

  return (
    <div
      className="
        fixed inset-0 z-[100]
        bg-black/80 backdrop-blur-md
        flex items-end sm:items-start
        justify-center
        sm:pt-20 md:pt-24
        px-0 sm:px-4
        animate-in fade-in duration-200
      "
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="
          relative
          w-full
          sm:max-w-2xl
          bg-[#0d1220]
          border border-cyan-500/30
          sm:rounded-2xl
          rounded-t-[28px] sm:rounded-b-2xl
          shadow-[0_-10px_60px_rgba(0,0,0,0.45)]
          sm:shadow-2xl
          overflow-hidden

          /* Mobile height */
          max-h-[92dvh]
          sm:max-h-[80vh]

          flex flex-col

          animate-in
          slide-in-from-bottom-4
          sm:slide-in-from-top-2
          duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile grab handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* =========================
            SEARCH HEADER
        ========================== */}
        <div
          className="
            px-4 sm:px-5
            pt-3 sm:pt-4
            pb-3 sm:pb-4
            bg-[#090c15]
            border-b border-white/10
            shrink-0
          "
        >
          {/* Top row */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="
                  w-8 h-8
                  rounded-lg
                  bg-cyan-500/10
                  border border-cyan-500/20
                  flex items-center justify-center
                  shrink-0
                "
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  Business Niche Search
                </div>

                <div className="text-[10px] text-slate-500">
                  Explore 320+ digital opportunities
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="
                w-9 h-9
                rounded-xl
                bg-white/5
                border border-white/10
                text-slate-400
                hover:text-white
                hover:bg-white/10
                active:scale-95
                flex items-center justify-center
                transition-all
                shrink-0
              "
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search input */}
          <div
            className="
              h-12 sm:h-[52px]
              flex items-center
              gap-2.5
              px-3.5
              rounded-xl
              bg-white/[0.045]
              border border-white/10
              focus-within:border-cyan-500/60
              focus-within:bg-cyan-500/[0.04]
              focus-within:ring-2
              focus-within:ring-cyan-500/10
              transition-all
            "
          >
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search niches..."
              className="
                flex-1
                min-w-0
                bg-transparent
                text-white
                text-sm sm:text-base
                placeholder:text-slate-500
                focus:outline-none
              "
            />

            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="
                  px-2 py-1
                  rounded-md
                  text-[10px]
                  font-semibold
                  text-slate-400
                  hover:text-white
                  hover:bg-white/10
                  transition-colors
                  shrink-0
                "
              >
                Clear
              </button>
            )}
          </div>

          {/* Search hint */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-slate-500">
            <Layers className="w-3 h-3 text-cyan-500" />

            <span className="truncate">
              Try: SaaS, AI agents, dental clinic, restaurant, solar...
            </span>
          </div>
        </div>

        {/* =========================
            RESULTS
        ========================== */}
        <div
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overscroll-contain
            px-2
            py-2
            sm:px-3
            sm:py-3

            [scrollbar-width:thin]
            [scrollbar-color:rgba(148,163,184,.25)_transparent]
          "
        >
          {/* Results header */}
          <div
            className="
              px-2
              sm:px-3
              py-2
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <div className="min-w-0">
              <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate">
                {query.trim()
                  ? `Search Results · ${results.length}`
                  : 'Popular Business Niches'}
              </span>
            </div>

            <span className="hidden sm:block text-[10px] text-cyan-400 whitespace-nowrap">
              Select a niche to continue
            </span>
          </div>

          {/* Results */}
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((niche) => (
                <button
                  key={niche.id}
                  type="button"
                  onClick={() => handleSelect(niche)}
                  className="
                    group
                    w-full
                    text-left
                    rounded-xl

                    px-3
                    py-3
                    sm:px-4
                    sm:py-3.5

                    bg-transparent
                    hover:bg-cyan-500/[0.07]
                    active:bg-cyan-500/[0.12]

                    border border-transparent
                    hover:border-cyan-500/20

                    transition-all
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-cyan-500/50
                  "
                >
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div
                      className="
                        w-9 h-9
                        sm:w-10 sm:h-10
                        rounded-lg
                        bg-white/[0.045]
                        border border-white/10
                        group-hover:bg-cyan-500/10
                        group-hover:border-cyan-500/20
                        flex items-center justify-center
                        shrink-0
                        transition-all
                      "
                    >
                      <Layers className="w-4 h-4 text-cyan-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="
                          flex
                          flex-col
                          sm:flex-row
                          sm:items-center
                          gap-1.5
                          sm:gap-2
                        "
                      >
                        <span
                          className="
                            text-sm
                            font-bold
                            text-white
                            group-hover:text-cyan-300
                            transition-colors
                            truncate
                          "
                        >
                          {niche.name}
                        </span>

                        <span
                          className="
                            self-start
                            max-w-full
                            text-[9px]
                            sm:text-[10px]
                            font-semibold
                            uppercase
                            px-2
                            py-0.5
                            rounded-md
                            bg-white/5
                            text-slate-400
                            border border-white/10
                            truncate
                          "
                        >
                          {niche.category}
                        </span>
                      </div>

                      <p
                        className="
                          text-[11px]
                          sm:text-xs
                          text-slate-400
                          line-clamp-1
                          mt-1
                        "
                      >
                        {niche.tagline}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div
                      className="
                        shrink-0
                        w-8 h-8
                        rounded-lg
                        bg-white/5
                        group-hover:bg-cyan-500/15
                        flex items-center justify-center
                        transition-all
                      "
                    >
                      <ArrowRight
                        className="
                          w-4 h-4
                          text-slate-500
                          group-hover:text-cyan-400
                          group-hover:translate-x-0.5
                          transition-all
                        "
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div
              className="
                mx-2
                my-8
                sm:my-12
                px-5
                py-8
                rounded-2xl
                bg-white/[0.03]
                border border-white/10
                text-center
              "
            >
              <div
                className="
                  w-12 h-12
                  mx-auto
                  mb-3
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  flex items-center justify-center
                "
              >
                <Search className="w-5 h-5 text-slate-500" />
              </div>

              <h4 className="text-sm font-semibold text-white mb-1">
                No niche found
              </h4>

              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                No direct match for{' '}
                <span className="text-cyan-400">
                  "{query}"
                </span>
                . Try another keyword or continue with a custom digital
                architecture.
              </p>

              <button
                type="button"
                onClick={() => setQuery('')}
                className="
                  mt-4
                  px-4 py-2
                  rounded-lg
                  bg-cyan-500/10
                  border border-cyan-500/20
                  text-xs
                  font-semibold
                  text-cyan-300
                  hover:bg-cyan-500/20
                  transition-colors
                "
              >
                Browse Popular Niches
              </button>
            </div>
          )}
        </div>

        {/* =========================
            FOOTER
        ========================== */}
        <div
          className="
            shrink-0
            px-4
            sm:px-5
            py-2.5
            bg-[#080a10]
            border-t border-white/10

            flex
            items-center
            justify-between
            gap-3

            text-[10px]
            sm:text-[11px]
            text-slate-500

            pb-[calc(10px+env(safe-area-inset-bottom))]
            sm:pb-2.5
          "
        >
          <span className="truncate">
            Tap a niche to view its blueprint
          </span>

          <span className="hidden sm:block shrink-0">
            ESC to close
          </span>
        </div>
      </div>
    </div>
  );
};