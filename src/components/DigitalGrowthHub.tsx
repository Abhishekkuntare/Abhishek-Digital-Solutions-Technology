import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  User, 
  X, 
  Tag 
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogData';
import { BlogArticle } from '../types';

export const DigitalGrowthHub: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <section className="py-20 md:py-28 border-b border-white/10 relative bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Practical Strategy & Field Insights</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Digital Growth & Engineering Hub
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Actionable playbooks on AI automation, web performance, and local client acquisition for business owners.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="p-6 sm:p-8 rounded-2xl bg-[#0c101c] border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  By {article.author} • {article.date}
                </span>
                <span className="text-cyan-400 font-semibold group-hover:underline flex items-center gap-1">
                  Read Playbook →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reading Modal */}
      {selectedArticle && (
       <div
  className="
    fixed inset-0 z-50

    flex
    items-end
    sm:items-center
    justify-center

    p-0
    sm:p-4
    lg:p-6

    overflow-hidden

    bg-black/85
    backdrop-blur-md

    animate-in
    fade-in
    duration-150
  "
>
  <div
    className="
      relative

      w-full
      sm:max-w-2xl

      h-[100dvh]
      sm:h-auto
      sm:max-h-[90vh]

      bg-[#0d1220]

      border
      border-white/15

      rounded-none
      sm:rounded-2xl

      shadow-2xl

      overflow-hidden

      flex
      flex-col

      animate-in
      slide-in-from-bottom-4
      sm:zoom-in-95

      duration-200
    "
    onClick={(e) => e.stopPropagation()}
  >

    {/* =========================
        HEADER
    ========================= */}
    <div
      className="
        shrink-0

        px-4
        py-4

        sm:px-6
        sm:py-6

        border-b
        border-white/10

        bg-gradient-to-b
        from-[#111728]
        to-[#0d1220]
      "
    >
      <div className="flex items-start gap-3">

        {/* Article information */}
        <div className="min-w-0 flex-1">

          {/* Category + Read time */}
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-2
              gap-y-1

              mb-2
            "
          >
            <span
              className="
                text-[10px]
                sm:text-xs

                font-bold
                text-cyan-400

                uppercase
                tracking-wider
              "
            >
              {selectedArticle.category}
            </span>

            <span className="text-slate-600">•</span>

            <span className="text-[10px] sm:text-xs text-slate-400">
              {selectedArticle.readTime}
            </span>
          </div>

          {/* Title */}
          <h3
            className="
              font-display

              text-xl
              sm:text-2xl

              font-bold

              text-white

              leading-tight

              break-words
            "
          >
            {selectedArticle.title}
          </h3>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={() => setSelectedArticle(null)}
          aria-label="Close article"
          className="
            shrink-0

            w-10
            h-10

            sm:w-9
            sm:h-9

            flex
            items-center
            justify-center

            rounded-xl

            bg-white/5
            hover:bg-white/10
            active:bg-white/15

            border
            border-white/10

            text-slate-400
            hover:text-white

            transition-all

            touch-manipulation
          "
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>


    {/* =========================
        ARTICLE CONTENT
    ========================= */}
    <div
      className="
        flex-1
        min-h-0

        overflow-y-auto
        overscroll-contain

        px-4
        py-5

        sm:px-6
        sm:py-6

        text-[13px]
        sm:text-sm

        text-slate-200

        leading-7

        scrollbar-thin
        scrollbar-thumb-white/10
        scrollbar-track-transparent
      "
    >
      <div className="max-w-none space-y-5">
        {selectedArticle.content.map((p, idx) => (
          <p
            key={idx}
            className="
              text-slate-200
              leading-7
              break-words
            "
          >
            {p}
          </p>
        ))}
      </div>
    </div>


    {/* =========================
        FOOTER
    ========================= */}
    <div
      className="
        shrink-0

        px-4
        py-4

        sm:px-6
        sm:py-5

        bg-[#090b10]

        border-t
        border-white/10
      "
    >
      <div
        className="
          flex

          flex-col
          sm:flex-row

          items-stretch
          sm:items-center

          justify-between

          gap-3
        "
      >

        {/* Author */}
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">
            Written by
          </div>

          <div
            className="
              text-xs
              sm:text-xs

              text-slate-300

              font-medium

              truncate
            "
          >
            {selectedArticle.author}
          </div>

          <div className="text-[10px] text-cyan-400/80 mt-0.5">
            Digital Growth Architect
          </div>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={() => setSelectedArticle(null)}
          className="
            w-full
            sm:w-auto

            min-h-[44px]

            px-5
            py-2.5

            text-xs
            font-semibold

            text-white

            bg-white/10
            hover:bg-white/15
            active:bg-white/20

            border
            border-white/10

            rounded-xl

            transition-all

            flex
            items-center
            justify-center

            touch-manipulation
          "
        >
          Close Article
        </button>

      </div>
    </div>

  </div>
</div>
      )}
    </section>
  );
};
