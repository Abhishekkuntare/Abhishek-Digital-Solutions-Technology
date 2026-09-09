import React, { useEffect, useMemo, useState } from 'react';

import {
  Search,
  Sparkles,
  ArrowRight,
  Layers,
  Car,
  Hammer,
  GraduationCap,
  Calendar,
  DollarSign,
  HeartPulse,
  ShieldCheck,
  Scale,
  Briefcase,
  Building2,
  Plane,
  Cpu,
  ShoppingBag,
  UtensilsCrossed,
  Megaphone,
  Truck,
  Wheat,
  Zap,
  Factory,
  Dog,
  Wrench,
  Gamepad2,
  Bot,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

import { BusinessNiche } from '../types';

import {
  CATEGORIES_LIST,
  NICHES_DATABASE,
  searchNiches,
} from '../data/nichesData';

interface NicheExplorerProps {
  onSelectNiche: (niche: BusinessNiche) => void;
  onOpenCustomQuote: (customNiche?: string) => void;
}

/* =========================================================
   ICON MAPPING
========================================================= */

const ICON_MAP: Record<string, React.ElementType> = {
  Car,
  Hammer,
  GraduationCap,
  Calendar,
  DollarSign,
  HeartPulse,
  ShieldCheck,
  Scale,
  Sparkles,
  Briefcase,
  Building2,
  Plane,
  Cpu,
  ShoppingBag,
  UtensilsCrossed,
  Megaphone,
  Truck,
  Wheat,
  Zap,
  Factory,
  Dog,
  Wrench,
  Gamepad2,
  Bot,
};

/* =========================================================
   PAGINATION TYPES
========================================================= */

type PaginationItem = number | 'dots-left' | 'dots-right';

/* =========================================================
   DESKTOP PAGINATION
========================================================= */

const getDesktopPagination = (
  currentPage: number,
  totalPages: number
): PaginationItem[] => {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  if (currentPage <= 4) {
    return [
      1,
      2,
      3,
      4,
      5,
      'dots-right',
      totalPages,
    ];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      'dots-left',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    'dots-left',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'dots-right',
    totalPages,
  ];
};

/* =========================================================
   MOBILE PAGINATION
========================================================= */

const getMobilePagination = (
  currentPage: number,
  totalPages: number
): PaginationItem[] => {
  if (totalPages <= 5) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  if (currentPage <= 3) {
    return [
      1,
      2,
      3,
      'dots-right',
      totalPages,
    ];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      'dots-left',
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    'dots-left',
    currentPage,
    'dots-right',
    totalPages,
  ];
};

/* =========================================================
   COMPONENT
========================================================= */

export const NicheExplorer: React.FC<NicheExplorerProps> = ({
  onSelectNiche,
  onOpenCustomQuote,
}) => {
  /* =======================================================
     STATE
  ======================================================= */

  const [selectedCategory, setSelectedCategory] =
    useState<string>('all');

  const [filterQuery, setFilterQuery] =
    useState<string>('');

  const [currentPage, setCurrentPage] =
    useState<number>(1);

  /* =======================================================
     SETTINGS
  ======================================================= */

  // 15 business niches per page
  const ITEMS_PER_PAGE = 15;

  /* =======================================================
     FILTERED NICHES
  ======================================================= */

  const filteredNiches = useMemo(() => {
    let list = NICHES_DATABASE;

    /* Category filter */
    if (selectedCategory !== 'all') {
      const category = CATEGORIES_LIST.find(
        (cat) => cat.id === selectedCategory
      );

      if (category) {
        list = list.filter(
          (niche) =>
            niche.category.toLowerCase() ===
            category.name.toLowerCase()
        );
      }
    }

    /* Search filter */
    if (filterQuery.trim()) {
      const searchResults = searchNiches(
        filterQuery.trim()
      );

      return searchResults.filter((niche) => {
        if (selectedCategory === 'all') {
          return true;
        }

        const category = CATEGORIES_LIST.find(
          (cat) => cat.id === selectedCategory
        );

        if (!category) {
          return true;
        }

        return (
          niche.category.toLowerCase() ===
          category.name.toLowerCase()
        );
      });
    }

    return list;
  }, [selectedCategory, filterQuery]);

  /* =======================================================
     RESET PAGINATION WHEN FILTER CHANGES
  ======================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, filterQuery]);

  /* =======================================================
     TOTAL PAGES
  ======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredNiches.length / ITEMS_PER_PAGE
    )
  );

  /* =======================================================
     SAFETY CHECK
  ======================================================= */

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* =======================================================
     PAGINATED NICHES
  ======================================================= */

  const paginatedNiches = useMemo(() => {
    const startIndex =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredNiches.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [
    filteredNiches,
    currentPage,
  ]);

  /* =======================================================
     RESULT RANGE
  ======================================================= */

  const pageStart =
    filteredNiches.length === 0
      ? 0
      : (currentPage - 1) *
          ITEMS_PER_PAGE +
        1;

  const pageEnd = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredNiches.length
  );

  /* =======================================================
     CHANGE PAGE
  ======================================================= */

  const goToPage = (page: number) => {
    const nextPage = Math.min(
      Math.max(page, 1),
      totalPages
    );

    if (nextPage === currentPage) {
      return;
    }

    setCurrentPage(nextPage);

    window.requestAnimationFrame(() => {
      const section =
        document.getElementById('niches');

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  };

  /* =======================================================
     CLEAR FILTER
  ======================================================= */

  const clearFilters = () => {
    setSelectedCategory('all');
    setFilterQuery('');
    setCurrentPage(1);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="niches"
      className="
        relative
        w-full
        overflow-hidden
        border-b
        border-white/10
        py-14
        sm:py-20
        md:py-24
        lg:py-28
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mx-auto
            mb-8
            sm:mb-10
            md:mb-12
            max-w-3xl
            text-center
          "
        >
          <div
            className="
              mb-3
              inline-flex
              max-w-full
              items-center
              gap-2
              rounded-full
              border
              border-cyan-500/20
              bg-cyan-500/10
              px-3
              py-1
              text-[10px]
              font-semibold
              text-cyan-400
              sm:text-xs
            "
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" />

            <span className="truncate">
              20 Categories • 320+ Supported Niches
            </span>
          </div>

          <h2
            className="
              font-display
              text-3xl
              font-extrabold
              tracking-tight
              text-white
              sm:text-4xl
              md:text-5xl
            "
          >
            Find Your Business Niche
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              leading-relaxed
              text-slate-300
              sm:text-base
            "
          >
            Select your business type to see recommended
            digital solutions, packages, and custom
            architectures we build for your industry.
          </p>
        </div>

        {/* =================================================
            SEARCH TOOLBAR
        ================================================= */}

        <div
          className="
            mb-7
            flex
            w-full
            flex-col
            gap-3
            sm:mb-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* Search */}
          <div
            className="
              relative
              w-full
              md:max-w-sm
            "
          >
            <Search
              className="
                absolute
                left-3.5
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={filterQuery}
              onChange={(event) =>
                setFilterQuery(
                  event.target.value
                )
              }
              placeholder="Search niches..."
              className="
                h-11
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                pl-10
                pr-4
                text-sm
                text-white
                outline-none
                transition
                placeholder:text-slate-500
                hover:border-white/20
                focus:border-cyan-500/60
                focus:bg-white/[0.06]
              "
            />
          </div>

          {/* Result information */}
          <div
            className="
              flex
              w-full
              flex-wrap
              items-center
              justify-between
              gap-2
              text-xs
              text-slate-400
              md:w-auto
              md:justify-end
            "
          >
            <span>
              Showing{' '}
              <strong className="text-cyan-400">
                {pageStart}–{pageEnd}
              </strong>{' '}
              of{' '}
              <strong className="text-cyan-400">
                {filteredNiches.length}
              </strong>
            </span>

            {selectedCategory !== 'all' ||
            filterQuery ? (
              <button
                type="button"
                onClick={clearFilters}
                className="
                  rounded-lg
                  px-2
                  py-1
                  text-cyan-400
                  transition
                  hover:bg-cyan-500/10
                  hover:text-cyan-300
                "
              >
                Clear filters
              </button>
            ) : null}
          </div>
        </div>

        {/* =================================================
            CATEGORY FILTERS
        ================================================= */}

        <div className="mb-8 sm:mb-10">
          <div
            className="
              flex
              w-full
              gap-2
              overflow-x-auto
              pb-2
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {/* All Categories */}
            <button
              type="button"
              onClick={() =>
                setSelectedCategory('all')
              }
              className={`
                flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                border
                px-3.5
                py-2.5
                text-xs
                font-semibold
                transition-all
                sm:px-4
                ${
                  selectedCategory === 'all'
                    ? `
                      border-cyan-400/40
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-600
                      text-white
                      shadow-lg
                      shadow-cyan-500/10
                    `
                    : `
                      border-white/10
                      bg-white/[0.04]
                      text-slate-300
                      hover:bg-white/[0.08]
                      hover:text-white
                    `
                }
              `}
            >
              <Layers className="h-3.5 w-3.5 shrink-0" />

              <span>
                All Categories
              </span>

              <span
                className="
                  rounded-md
                  bg-black/20
                  px-1.5
                  py-0.5
                  text-[10px]
                "
              >
                {NICHES_DATABASE.length}
              </span>
            </button>

            {/* Category buttons */}
            {CATEGORIES_LIST.map((category) => {
              const Icon =
                ICON_MAP[category.icon] ||
                Sparkles;

              const isSelected =
                selectedCategory ===
                category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(
                      isSelected
                        ? 'all'
                        : category.id
                    )
                  }
                  className={`
                    flex
                    shrink-0
                    items-center
                    gap-2
                    rounded-xl
                    border
                    px-3.5
                    py-2.5
                    text-xs
                    font-semibold
                    transition-all
                    ${
                      isSelected
                        ? `
                          border-cyan-400/40
                          bg-cyan-500/15
                          text-cyan-300
                          shadow-lg
                          shadow-cyan-500/5
                        `
                        : `
                          border-white/10
                          bg-white/[0.04]
                          text-slate-300
                          hover:bg-white/[0.08]
                          hover:text-white
                        `
                    }
                  `}
                >
                  <Icon
                    className="
                      h-3.5
                      w-3.5
                      shrink-0
                      text-cyan-400
                    "
                  />

                  <span>
                    {category.name}
                  </span>

                  <span
                    className="
                      rounded-md
                      bg-white/[0.08]
                      px-1.5
                      py-0.5
                      font-mono
                      text-[10px]
                      text-slate-300
                    "
                  >
                    {category.nichesCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =================================================
            NICHE GRID
        ================================================= */}

        {filteredNiches.length > 0 ? (
          <>
            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                sm:gap-5
                lg:grid-cols-3
                lg:gap-6
              "
            >
              {paginatedNiches.map((niche) => (
                <article
                  key={niche.id}
                  onClick={() =>
                    onSelectNiche(niche)
                  }
                  className="
                    group
                    flex
                    min-w-0
                    cursor-pointer
                    flex-col
                    justify-between
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#0c101c]
                    p-4
                    shadow-lg
                    transition-all
                    duration-300
                    hover:border-cyan-500/40
                    hover:bg-white/[0.035]
                    hover:shadow-cyan-500/10
                    sm:p-5
                    lg:p-6
                  "
                >
                  {/* Card content */}
                  <div className="min-w-0">
                    {/* Top row */}
                    <div
                      className="
                        mb-3
                        flex
                        min-w-0
                        items-center
                        justify-between
                        gap-3
                      "
                    >
                      {/* Category */}
                      <span
                        className="
                          max-w-[65%]
                          truncate
                          rounded-full
                          border
                          border-cyan-500/20
                          bg-cyan-500/10
                          px-2.5
                          py-1
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wider
                          text-cyan-400
                          sm:text-[11px]
                        "
                      >
                        {niche.category}
                      </span>

                      {/* View solutions */}
                      <span
                        className="
                          flex
                          shrink-0
                          items-center
                          gap-1
                          text-[11px]
                          font-medium
                          text-slate-400
                          transition-colors
                          group-hover:text-cyan-400
                          sm:text-xs
                        "
                      >
                        <span className="hidden sm:inline">
                          View Solutions
                        </span>

                        <ArrowRight
                          className="
                            h-3.5
                            w-3.5
                            transition-transform
                            group-hover:translate-x-1
                          "
                        />
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="
                        mb-2
                        line-clamp-2
                        font-display
                        text-lg
                        font-bold
                        leading-snug
                        text-white
                        transition-colors
                        group-hover:text-cyan-300
                        sm:text-xl
                      "
                    >
                      {niche.name}
                    </h3>

                    {/* Description */}
                    <p
                      className="
                        mb-4
                        line-clamp-2
                        text-xs
                        leading-relaxed
                        text-slate-300
                        sm:text-sm
                      "
                    >
                      {niche.tagline}
                    </p>

                    {/* Solutions */}
                    <div
                      className="
                        mb-5
                        space-y-2
                        border-t
                        border-white/5
                        pt-3
                      "
                    >
                      {niche.recommendedSolutions
                        .slice(0, 3)
                        .map((solution, index) => (
                          <div
                            key={`${niche.id}-solution-${index}`}
                            className="
                              flex
                              min-w-0
                              items-center
                              gap-2
                              text-xs
                              text-slate-400
                            "
                          >
                            <span
                              className="
                                h-1.5
                                w-1.5
                                shrink-0
                                rounded-full
                                bg-cyan-400
                              "
                            />

                            <span className="truncate">
                              {solution.title}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Card footer */}
                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      justify-between
                      gap-3
                      border-t
                      border-white/10
                      pt-3
                    "
                  >
                    <span
                      className="
                        shrink-0
                        text-[10px]
                        text-slate-400
                        sm:text-[11px]
                      "
                    >
                      {niche.packages.length}{' '}
                      Packages
                    </span>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelectNiche(niche);
                      }}
                      className="
                        flex
                        shrink-0
                        items-center
                        gap-1
                        text-[11px]
                        font-semibold
                        text-cyan-400
                        transition-colors
                        hover:text-cyan-300
                        sm:text-xs
                      "
                    >
                      Explore Blueprint
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}

            {totalPages > 1 && (
              <div className="mt-8 sm:mt-10 lg:mt-12">
                <div
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#0b0f19]/80
                    p-3
                    shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                    backdrop-blur-xl
                    sm:p-4
                  "
                >
                  {/* Pagination info */}
                  <div
                    className="
                      mb-3
                      flex
                      flex-col
                      items-center
                      justify-between
                      gap-2
                      sm:mb-4
                      sm:flex-row
                    "
                  >
                    <span
                      className="
                        text-[11px]
                        text-slate-400
                        sm:text-xs
                      "
                    >
                      Showing{' '}
                      <span className="font-semibold text-white">
                        {pageStart}–{pageEnd}
                      </span>{' '}
                      of{' '}
                      <span className="font-semibold text-cyan-400">
                        {filteredNiches.length}
                      </span>{' '}
                      business niches
                    </span>

                    <span
                      className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-3
                        py-1
                        text-[10px]
                        text-slate-400
                        sm:text-xs
                      "
                    >
                      Page{' '}
                      <span className="font-semibold text-cyan-400">
                        {currentPage}
                      </span>{' '}
                      of{' '}
                      <span className="font-semibold text-slate-300">
                        {totalPages}
                      </span>
                    </span>
                  </div>

                  {/* =========================================
                      DESKTOP PAGINATION
                  ========================================= */}

                  <div className="hidden items-center justify-center gap-2 sm:flex">
                    {/* Previous */}
                    <button
                      type="button"
                      onClick={() =>
                        goToPage(
                          currentPage - 1
                        )
                      }
                      disabled={
                        currentPage === 1
                      }
                      className="
                        flex
                        h-10
                        shrink-0
                        items-center
                        gap-1.5
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-3
                        text-xs
                        font-semibold
                        text-slate-300
                        transition-all
                        hover:border-cyan-500/30
                        hover:bg-cyan-500/10
                        hover:text-cyan-300
                        disabled:pointer-events-none
                        disabled:opacity-30
                      "
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </button>

                    {/* Numbers */}
                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                      "
                    >
                      {getDesktopPagination(
                        currentPage,
                        totalPages
                      ).map(
                        (
                          item,
                          index
                        ) => {
                          if (
                            item ===
                              'dots-left' ||
                            item ===
                              'dots-right'
                          ) {
                            return (
                              <span
                                key={`${item}-${index}`}
                                className="
                                  flex
                                  h-10
                                  w-7
                                  items-center
                                  justify-center
                                  text-xs
                                  text-slate-500
                                "
                              >
                                •••
                              </span>
                            );
                          }

                          const active =
                            currentPage ===
                            item;

                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() =>
                                goToPage(item)
                              }
                              aria-label={`Go to page ${item}`}
                              aria-current={
                                active
                                  ? 'page'
                                  : undefined
                              }
                              className={`
                                h-10
                                w-10
                                rounded-xl
                                border
                                text-xs
                                font-semibold
                                transition-all
                                duration-200
                                ${
                                  active
                                    ? `
                                      border-cyan-400/50
                                      bg-gradient-to-r
                                      from-cyan-500
                                      to-blue-600
                                      text-white
                                      shadow-lg
                                      shadow-cyan-500/20
                                    `
                                    : `
                                      border-white/10
                                      bg-white/[0.04]
                                      text-slate-300
                                      hover:border-cyan-500/30
                                      hover:bg-white/[0.08]
                                      hover:text-white
                                    `
                                }
                              `}
                            >
                              {item}
                            </button>
                          );
                        }
                      )}
                    </div>

                    {/* Next */}
                    <button
                      type="button"
                      onClick={() =>
                        goToPage(
                          currentPage + 1
                        )
                      }
                      disabled={
                        currentPage ===
                        totalPages
                      }
                      className="
                        flex
                        h-10
                        shrink-0
                        items-center
                        gap-1.5
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-3
                        text-xs
                        font-semibold
                        text-slate-300
                        transition-all
                        hover:border-cyan-500/30
                        hover:bg-cyan-500/10
                        hover:text-cyan-300
                        disabled:pointer-events-none
                        disabled:opacity-30
                      "
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* =========================================
                      MOBILE PAGINATION
                  ========================================= */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-2
                      sm:hidden
                    "
                  >
                    {/* Previous */}
                    <button
                      type="button"
                      onClick={() =>
                        goToPage(
                          currentPage - 1
                        )
                      }
                      disabled={
                        currentPage === 1
                      }
                      aria-label="Previous page"
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        text-slate-300
                        transition-all
                        hover:border-cyan-500/30
                        hover:bg-cyan-500/10
                        disabled:pointer-events-none
                        disabled:opacity-30
                      "
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {/* Mobile numbers */}
                    <div
                      className="
                        flex
                        min-w-0
                        flex-1
                        items-center
                        justify-center
                        gap-1
                      "
                    >
                      {getMobilePagination(
                        currentPage,
                        totalPages
                      ).map(
                        (
                          item,
                          index
                        ) => {
                          if (
                            item ===
                              'dots-left' ||
                            item ===
                              'dots-right'
                          ) {
                            return (
                              <span
                                key={`mobile-${item}-${index}`}
                                className="
                                  px-0.5
                                  text-[10px]
                                  text-slate-500
                                "
                              >
                                •••
                              </span>
                            );
                          }

                          const active =
                            currentPage ===
                            item;

                          return (
                            <button
                              key={`mobile-${item}`}
                              type="button"
                              onClick={() =>
                                goToPage(item)
                              }
                              aria-label={`Go to page ${item}`}
                              aria-current={
                                active
                                  ? 'page'
                                  : undefined
                              }
                              className={`
                                h-10
                                w-9
                                shrink-0
                                rounded-xl
                                border
                                text-xs
                                font-semibold
                                transition-all
                                ${
                                  active
                                    ? `
                                      border-cyan-400/50
                                      bg-gradient-to-r
                                      from-cyan-500
                                      to-blue-600
                                      text-white
                                      shadow-md
                                      shadow-cyan-500/20
                                    `
                                    : `
                                      border-white/10
                                      bg-white/[0.04]
                                      text-slate-300
                                    `
                                }
                              `}
                            >
                              {item}
                            </button>
                          );
                        }
                      )}
                    </div>

                    {/* Next */}
                    <button
                      type="button"
                      onClick={() =>
                        goToPage(
                          currentPage + 1
                        )
                      }
                      disabled={
                        currentPage ===
                        totalPages
                      }
                      aria-label="Next page"
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        text-slate-300
                        transition-all
                        hover:border-cyan-500/30
                        hover:bg-cyan-500/10
                        disabled:pointer-events-none
                        disabled:opacity-30
                      "
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================= */

          <div
            className="
              mx-auto
              max-w-2xl
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              p-8
              text-center
              sm:p-12
            "
          >
            <Sparkles
              className="
                mx-auto
                mb-3
                h-10
                w-10
                text-cyan-400
              "
            />

            <h3
              className="
                mb-2
                text-xl
                font-bold
                text-white
              "
            >
              Can't find your exact
              business type?
            </h3>

            <p
              className="
                mx-auto
                mb-6
                max-w-md
                text-sm
                leading-relaxed
                text-slate-300
              "
            >
              Whatever your industry or
              market, we create bespoke
              digital solutions tailored to
              your unique workflows,
              audience, and revenue model.
            </p>

            <button
              type="button"
              onClick={() =>
                onOpenCustomQuote(
                  filterQuery ||
                    'Custom Business'
                )
              }
              className="
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition-all
                hover:from-cyan-400
                hover:to-blue-500
              "
            >
              Tell Us About Your Business
            </button>
          </div>
        )}

        {/* =================================================
            CUSTOM BUSINESS BANNER
        ================================================= */}

        <div
          className="
            mt-10
            flex
            flex-col
            items-center
            justify-between
            gap-5
            rounded-2xl
            border
            border-cyan-500/20
            bg-gradient-to-r
            from-blue-900/20
            via-cyan-900/15
            to-purple-900/20
            p-5
            sm:mt-14
            sm:p-7
            lg:flex-row
            lg:p-8
          "
        >
          <div
            className="
              min-w-0
              text-center
              lg:text-left
            "
          >
            <h4
              className="
                text-base
                font-bold
                text-white
                sm:text-lg
              "
            >
              Operate in a highly
              specialized or niche
              industry?
            </h4>

            <p
              className="
                mt-1
                text-xs
                leading-relaxed
                text-slate-300
                sm:text-sm
              "
            >
              We design custom digital
              architectures, proprietary
              algorithms, and enterprise CRM
              solutions for any sector.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenCustomQuote()
            }
            className="
              w-full
              shrink-0
              rounded-xl
              border
              border-cyan-500/30
              bg-white/[0.04]
              px-5
              py-3
              text-xs
              font-semibold
              text-cyan-300
              transition-all
              hover:bg-white/[0.08]
              hover:text-white
              sm:w-auto
              sm:px-6
              sm:text-sm
            "
          >
            Request Custom Architecture
          </button>
        </div>
      </div>
    </section>
  );
};