import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeftRight, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Gauge,
  Smartphone,
  MousePointerClick
} from 'lucide-react';
import { BEFORE_AFTER_EXAMPLES } from '../data/transformationData';
import { BeforeAfterExample } from '../types';

interface BeforeAfterSectionProps {
  onOpenQuote: (nicheName: string) => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onOpenQuote }) => {
  const [selectedExampleId, setSelectedExampleId] = useState<string>('restaurant');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100

  const activeExample = BEFORE_AFTER_EXAMPLES.find((e) => e.id === selectedExampleId) || BEFORE_AFTER_EXAMPLES[0];

  return (
    <section id="transformations" className="py-20 md:py-28 border-b border-white/10 relative bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Measurable Impact</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Digital Transformation Before & After
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            See the concrete difference between a legacy digital presence and a high-converting, modern digital ecosystem.
          </p>
        </div>

        {/* Niche Switcher Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {BEFORE_AFTER_EXAMPLES.map((item) => {
            const isSelected = selectedExampleId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedExampleId(item.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.niche}
              </button>
            );
          })}
        </div>

        {/* Transformation Showcase Container */}
        <div className="rounded-3xl bg-[#0c101c] border border-white/15 p-6 sm:p-10 shadow-2xl overflow-hidden">
          
          <div className="text-center mb-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              {activeExample.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Case Study Comparison for {activeExample.niche}
            </p>
          </div>

        {/* Interactive Split Comparison Cards */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch">

  {/* LEFT — BEFORE */}
  <div
    className="
      relative
      overflow-hidden
      rounded-2xl
      bg-rose-950/20
      border
      border-rose-500/25
      p-5
      sm:p-6
      lg:p-8
      flex
      flex-col
      min-w-0
    "
  >
    {/* Badge */}
    <div className="mb-5 sm:absolute sm:top-4 sm:right-4 sm:mb-0">
      <span
        className="
          inline-flex
          items-center
          max-w-full
          px-2.5
          sm:px-3
          py-1
          rounded-full
          bg-rose-500/20
          border
          border-rose-500/30
          text-[9px]
          sm:text-[10px]
          md:text-[11px]
          font-bold
          uppercase
          tracking-wider
          text-rose-300
          whitespace-nowrap
        "
      >
        Before: Outdated Site
      </span>
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">

      <h4
        className="
          font-display
          text-lg
          sm:text-xl
          font-bold
          text-white
          mb-2
          flex
          items-start
          gap-2
          pr-0
          sm:pr-36
          leading-snug
        "
      >
        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />

        <span className="break-words">
          {activeExample.before.title}
        </span>
      </h4>

      <p
        className="
          text-xs
          sm:text-sm
          text-slate-300
          mb-5
          sm:mb-6
          leading-relaxed
        "
      >
        {activeExample.before.description}
      </p>

      {/* Issues */}
      <div className="space-y-2.5 mb-6">

        <span
          className="
            text-[10px]
            sm:text-xs
            uppercase
            font-semibold
            tracking-wide
            text-rose-300
            block
            mb-2
          "
        >
          Critical Bottlenecks:
        </span>

        {activeExample.before.issues.map((issue, idx) => (
          <div
            key={idx}
            className="
              flex
              items-start
              gap-2.5
              text-xs
              sm:text-sm
              text-slate-300
              leading-relaxed
              min-w-0
            "
          >
            <span className="text-rose-400 font-bold shrink-0 mt-0.5">
              ✕
            </span>

            <span className="break-words min-w-0">
              {issue}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Metrics */}
    <div
      className="
        pt-4
        mt-auto
        border-t
        border-rose-500/20
        grid
        grid-cols-2
        gap-2.5
        sm:gap-3
      "
    >
      <div
        className="
          p-3
          sm:p-3.5
          rounded-xl
          bg-black/40
          border
          border-rose-500/20
          text-center
          min-w-0
        "
      >
        <div
          className="
            text-base
            sm:text-lg
            font-mono
            font-bold
            text-rose-400
            truncate
          "
        >
          {activeExample.before.conversionRate}
        </div>

        <div
          className="
            text-[9px]
            sm:text-[10px]
            text-slate-400
            leading-tight
            mt-1
          "
        >
          Conversion Rate
        </div>
      </div>

      <div
        className="
          p-3
          sm:p-3.5
          rounded-xl
          bg-black/40
          border
          border-rose-500/20
          text-center
          min-w-0
        "
      >
        <div
          className="
            text-base
            sm:text-lg
            font-mono
            font-bold
            text-rose-400
            truncate
          "
        >
          {activeExample.before.mobileSpeed}
        </div>

        <div
          className="
            text-[9px]
            sm:text-[10px]
            text-slate-400
            leading-tight
            mt-1
          "
        >
          Mobile Speed Score
        </div>
      </div>
    </div>
  </div>


  {/* RIGHT — AFTER */}
  <div
    className="
      relative
      overflow-hidden
      rounded-2xl
      bg-cyan-950/25
      border
      border-cyan-500/40
      sm:border-2
      p-5
      sm:p-6
      lg:p-8
      flex
      flex-col
      min-w-0
      shadow-xl
      shadow-cyan-500/10
    "
  >

    {/* Badge */}
    <div className="mb-5 sm:absolute sm:top-4 sm:right-4 sm:mb-0">
      <span
        className="
          inline-flex
          items-center
          max-w-full
          px-2.5
          sm:px-3
          py-1
          rounded-full
          bg-cyan-500/20
          border
          border-cyan-500/40
          text-[9px]
          sm:text-[10px]
          md:text-[11px]
          font-bold
          uppercase
          tracking-wider
          text-cyan-300
          whitespace-nowrap
        "
      >
        After: Modern Solution
      </span>
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">

      <h4
        className="
          font-display
          text-lg
          sm:text-xl
          font-bold
          text-white
          mb-2
          flex
          items-start
          gap-2
          pr-0
          sm:pr-36
          leading-snug
        "
      >
        <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />

        <span className="break-words">
          {activeExample.after.title}
        </span>
      </h4>

      <p
        className="
          text-xs
          sm:text-sm
          text-slate-200
          mb-5
          sm:mb-6
          leading-relaxed
        "
      >
        {activeExample.after.description}
      </p>

      {/* Improvements */}
      <div className="space-y-2.5 mb-6">

        <span
          className="
            text-[10px]
            sm:text-xs
            uppercase
            font-semibold
            tracking-wide
            text-cyan-300
            block
            mb-2
          "
        >
          Engineered Upgrades:
        </span>

        {activeExample.after.improvements.map((imp, idx) => (
          <div
            key={idx}
            className="
              flex
              items-start
              gap-2.5
              text-xs
              sm:text-sm
              text-slate-200
              leading-relaxed
              min-w-0
            "
          >
            <span className="text-cyan-400 font-bold shrink-0 mt-0.5">
              ✓
            </span>

            <span className="break-words min-w-0">
              {imp}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Metrics */}
    <div
      className="
        pt-4
        mt-auto
        border-t
        border-cyan-500/20
        grid
        grid-cols-2
        gap-2.5
        sm:gap-3
      "
    >
      <div
        className="
          p-3
          sm:p-3.5
          rounded-xl
          bg-black/40
          border
          border-cyan-500/30
          text-center
          min-w-0
        "
      >
        <div
          className="
            text-base
            sm:text-lg
            font-mono
            font-bold
            text-emerald-400
            truncate
          "
        >
          {activeExample.after.conversionRate}
        </div>

        <div
          className="
            text-[9px]
            sm:text-[10px]
            text-slate-300
            leading-tight
            mt-1
          "
        >
          Conversion Rate (+400%+)
        </div>
      </div>

      <div
        className="
          p-3
          sm:p-3.5
          rounded-xl
          bg-black/40
          border
          border-cyan-500/30
          text-center
          min-w-0
        "
      >
        <div
          className="
            text-base
            sm:text-lg
            font-mono
            font-bold
            text-cyan-300
            truncate
          "
        >
          {activeExample.after.mobileSpeed}
        </div>

        <div
          className="
            text-[9px]
            sm:text-[10px]
            text-slate-300
            leading-tight
            mt-1
          "
        >
          Core Web Vitals
        </div>
      </div>
    </div>
  </div>

</div>

          {/* Bottom Action */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              Want a similar transformation for your existing business website or app?
            </div>
            <button
              onClick={() => onOpenQuote(`${activeExample.niche} Transformation`)}
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-md flex items-center gap-2"
            >
              <span>Modernize My {activeExample.niche}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
