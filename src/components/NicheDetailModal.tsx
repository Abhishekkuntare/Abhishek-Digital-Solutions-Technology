import React from 'react';

import {
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Phone,
  Layers,
} from 'lucide-react';

import { BusinessNiche } from '../types';
import { generateWhatsAppUrl } from '../utils/helpers';

interface NicheDetailModalProps {
  niche: BusinessNiche | null;
  onClose: () => void;
  onOpenQuote: (nicheName: string) => void;
}

export const NicheDetailModal: React.FC<NicheDetailModalProps> = ({
  niche,
  onClose,
  onOpenQuote,
}) => {
  if (!niche) return null;

  const whatsappUrl = generateWhatsAppUrl(
    '+919156075536',
    niche.whatsappPrompt ||
      `Hi Abhishek, I found your website and want to build a modern digital solution for my ${niche.name}.`
  );

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/80 backdrop-blur-md
        flex items-center justify-center
        p-0 sm:p-4 md:p-6
      "
      onClick={onClose}
    >
      {/* =========================================================
          MODAL
      ========================================================= */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          sm:max-w-4xl
          h-[100dvh]
          sm:h-auto
          sm:max-h-[94dvh]
          bg-[#0b0f1a]
          border border-white/10
          sm:rounded-2xl
          shadow-2xl
          overflow-hidden
          flex flex-col
        "
      >
        {/* =======================================================
            HEADER
        ======================================================= */}
        <div
          className="
            relative
            shrink-0
            bg-gradient-to-br
            from-[#131929]
            via-[#0d1321]
            to-[#090c14]
            border-b border-white/10
            px-4 py-4
            sm:px-6 sm:py-5
            md:px-8 md:py-6
          "
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
              absolute
              top-3 right-3
              sm:top-4 sm:right-4
              w-10 h-10
              sm:w-11 sm:h-11
              rounded-xl
              flex items-center justify-center
              text-slate-400
              hover:text-white
              bg-white/5
              hover:bg-white/10
              border border-white/10
              transition-all
              z-10
            "
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Header Content */}
          <div className="pr-12 sm:pr-14">
            {/* Category + Roadmap */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="
                  text-[10px] sm:text-[11px]
                  font-semibold
                  uppercase
                  tracking-wider
                  px-2.5 py-1
                  rounded-full
                  bg-cyan-500/10
                  text-cyan-400
                  border border-cyan-500/20
                  whitespace-nowrap
                "
              >
                {niche.category}
              </span>

              <span
                className="
                  text-[11px] sm:text-xs
                  text-slate-400
                  flex items-center gap-1.5
                  whitespace-nowrap
                "
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                Custom Digital Roadmap
              </span>
            </div>

            {/* Title */}
            <h2
              className="
                font-display
                text-[25px]
                leading-[1.12]
                sm:text-3xl
                md:text-4xl
                font-extrabold
                text-white
                tracking-tight
                max-w-3xl
              "
            >
              {niche.name} Digital Solutions
            </h2>

            {/* Tagline */}
            <p
              className="
                mt-2
                text-sm
                sm:text-base
                md:text-lg
                text-cyan-300
                font-semibold
                leading-relaxed
                max-w-3xl
                line-clamp-3
              "
            >
              "{niche.tagline}"
            </p>

            {/* Description */}
            <p
              className="
                mt-2.5
                text-xs
                sm:text-sm
                md:text-[15px]
                text-slate-300
                max-w-3xl
                leading-relaxed
                line-clamp-3
                sm:line-clamp-4
              "
            >
              {niche.description}
            </p>
          </div>

          {/* =====================================================
              HEADER CTA
          ===================================================== */}
          <div
            className="
              mt-4
              pt-4
              border-t border-white/10
              grid grid-cols-1 sm:grid-cols-2
              gap-2.5
            "
          >
            {/* Build Button */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenQuote(niche.name);
              }}
              className="
                w-full
                min-h-[46px]
                px-4 py-2.5
                rounded-xl
                text-xs sm:text-sm
                font-semibold
                text-white
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                hover:from-cyan-400
                hover:to-blue-500
                shadow-lg
                shadow-cyan-500/20
                transition-all
                flex items-center justify-center gap-2
              "
            >
              <span className="truncate">
                Build My {niche.name} Online
              </span>

              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full
                min-h-[46px]
                px-4 py-2.5
                rounded-xl
                text-xs sm:text-sm
                font-semibold
                text-emerald-300
                bg-emerald-500/10
                hover:bg-emerald-500/15
                border border-emerald-500/20
                transition-all
                flex items-center justify-center gap-2
              "
            >
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* =======================================================
            SCROLLABLE CONTENT
            IMPORTANT:
            flex-1 + min-h-0 allows ONLY this area to scroll.
        ======================================================= */}
        <div
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overscroll-contain
            px-4 py-5
            sm:px-6 sm:py-6
            md:px-8 md:py-7
            space-y-8
            scrollbar-thin
            scrollbar-thumb-white/10
            scrollbar-track-transparent
          "
        >
          {/* =====================================================
              RECOMMENDED DIGITAL SOLUTIONS
          ===================================================== */}
          <section>
            <div className="mb-4">
              <h3
                className="
                  font-display
                  text-lg sm:text-xl
                  font-bold
                  text-white
                  flex items-center gap-2
                "
              >
                <Layers className="w-5 h-5 text-cyan-400 shrink-0" />

                <span>Recommended Digital Solutions</span>
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Custom-engineered systems specifically designed to grow a{' '}
                {niche.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {niche.recommendedSolutions.map((sol, idx) => (
                <div
                  key={idx}
                  className="
                    p-4
                    rounded-xl
                    bg-white/[0.035]
                    border border-white/10
                    hover:border-cyan-500/30
                    hover:bg-white/[0.055]
                    transition-all
                  "
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span
                      className="
                        text-[10px]
                        sm:text-xs
                        font-semibold
                        text-cyan-400
                        uppercase
                        tracking-wider
                        leading-relaxed
                      "
                    >
                      {sol.category}
                    </span>

                    <span
                      className="
                        text-[9px]
                        sm:text-[10px]
                        px-2 py-1
                        rounded-md
                        bg-emerald-500/10
                        text-emerald-400
                        border border-emerald-500/20
                        font-medium
                        whitespace-nowrap
                        shrink-0
                      "
                    >
                      {sol.impact}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {sol.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {sol.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================================
              WHAT WE CAN BUILD
          ===================================================== */}
          <section>
            <div className="mb-4">
              <h3
                className="
                  font-display
                  text-lg sm:text-xl
                  font-bold
                  text-white
                  flex items-start gap-2
                "
              >
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />

                <span>
                  What We Can Build For Your {niche.name}
                </span>
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Comprehensive deliverables provided end-to-end under one roof.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {niche.whatWeCanBuild.map((item, idx) => (
                <div
                  key={idx}
                  className="
                    flex items-start
                    gap-2.5
                    p-3
                    rounded-lg
                    bg-white/[0.035]
                    border border-white/5
                    text-xs
                    sm:text-sm
                    text-slate-200
                    leading-relaxed
                  "
                >
                  <div
                    className="
                      w-5 h-5
                      rounded-full
                      bg-cyan-500/15
                      text-cyan-400
                      flex items-center justify-center
                      shrink-0
                      mt-0.5
                    "
                  >
                    ✓
                  </div>

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================================
              INTEGRATIONS
          ===================================================== */}
          <section>
            <h4
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-400
                mb-3
              "
            >
              Supported Integrations & APIs
            </h4>

            <div className="flex flex-wrap gap-2">
              {niche.keyIntegrations.map((integ, idx) => (
                <span
                  key={idx}
                  className="
                    px-3 py-1.5
                    rounded-lg
                    bg-white/[0.035]
                    border border-white/10
                    text-[11px]
                    sm:text-xs
                    text-slate-300
                    hover:border-cyan-500/30
                    hover:text-cyan-300
                    transition-colors
                  "
                >
                  {integ}
                </span>
              ))}
            </div>
          </section>

          {/* =====================================================
              PACKAGES
          ===================================================== */}
          <section>
            <div className="mb-4">
              <h3
                className="
                  font-display
                  text-lg sm:text-xl
                  font-bold
                  text-white
                  flex items-center gap-2
                "
              >
                <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />

                <span>Recommended Package Options</span>
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Transparent milestones with customizable scope for every
                growth stage.
              </p>
            </div>

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-3
              "
            >
              {niche.packages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`
                    rounded-xl
                    border
                    p-4
                    flex flex-col
                    transition-all
                    ${
                      pkg.badge
                        ? `
                          bg-gradient-to-b
                          from-cyan-500/15
                          to-blue-600/10
                          border-cyan-500/40
                          shadow-lg
                          shadow-cyan-500/10
                        `
                        : `
                          bg-white/[0.035]
                          border-white/10
                          hover:border-white/20
                        `
                    }
                  `}
                >
                  <div className="flex-1">
                    {pkg.badge && (
                      <span
                        className="
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-wider
                          px-2 py-1
                          rounded-md
                          bg-cyan-500
                          text-black
                          mb-2
                          inline-block
                        "
                      >
                        {pkg.badge}
                      </span>
                    )}

                    <h4 className="font-bold text-base text-white">
                      {pkg.name}
                    </h4>

                    <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="my-3 pt-3 border-t border-white/10">
                      <span
                        className="
                          text-[9px]
                          uppercase
                          tracking-wider
                          text-slate-400
                          font-semibold
                          block
                          mb-2
                        "
                      >
                        Key Deliverables
                      </span>

                      <ul className="space-y-1.5">
                        {pkg.keyDeliverables.map((deliv, dIdx) => (
                          <li
                            key={dIdx}
                            className="
                              text-[11px]
                              text-slate-300
                              flex items-start gap-1.5
                              leading-relaxed
                            "
                          >
                            <span className="text-cyan-400 shrink-0">
                              •
                            </span>

                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenQuote(
                        `${niche.name} (${pkg.name} Package)`
                      );
                    }}
                    className="
                      w-full
                      min-h-[40px]
                      mt-2
                      py-2
                      px-3
                      text-[11px]
                      sm:text-xs
                      font-semibold
                      rounded-lg
                      bg-white/10
                      hover:bg-cyan-500
                      hover:text-black
                      text-white
                      transition-all
                    "
                  >
                    Request Proposal
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Extra bottom spacing so content never touches footer */}
          <div className="h-2 sm:h-4" />
        </div>

        {/* =======================================================
            STICKY FOOTER
            This stays visible while middle content scrolls.
        ======================================================= */}
        <div
          className="
            shrink-0
            bg-[#080c14]
            border-t border-white/10
            px-4 py-3
            sm:px-6 sm:py-4
            md:px-8
          "
        >
          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-3
            "
          >
            {/* Footer Text */}
            <div className="text-center sm:text-left min-w-0">
              <p
                className="
                  text-xs
                  sm:text-sm
                  font-semibold
                  text-white
                  truncate
                "
              >
                Ready to build your {niche.name} platform?
              </p>

              <p
                className="
                  text-[10px]
                  sm:text-xs
                  text-slate-400
                  mt-0.5
                "
              >
                Direct architecture by Abhishek • Delivered worldwide
              </p>
            </div>

            {/* Footer Buttons */}
            <div
              className="
                flex
                items-center
                gap-2
                w-full
                sm:w-auto
                shrink-0
              "
            >
              <button
                type="button"
                onClick={onClose}
                className="
                  flex-1
                  sm:flex-none
                  min-w-[100px]
                  min-h-[42px]
                  px-4
                  py-2
                  rounded-xl
                  text-xs
                  font-semibold
                  text-slate-300
                  hover:text-white
                  bg-white/5
                  hover:bg-white/10
                  border border-white/10
                  transition-all
                "
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenQuote(niche.name);
                }}
                className="
                  flex-1
                  sm:flex-none
                  min-w-[145px]
                  min-h-[42px]
                  px-4
                  py-2
                  rounded-xl
                  text-xs
                  font-semibold
                  text-white
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  hover:from-cyan-400
                  hover:to-blue-500
                  shadow-md
                  shadow-cyan-500/15
                  transition-all
                "
              >
                Get Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};