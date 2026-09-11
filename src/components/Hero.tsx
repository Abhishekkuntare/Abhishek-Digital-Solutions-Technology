

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Compass,
  Zap,
  TrendingUp,
  Bot,
  Code2,
  Palette,
  Rocket,
  ChefHat,
  Megaphone,
  PenTool,
  X,
} from "lucide-react";

import { BusinessNiche } from "../types";
import { searchNiches } from "../data/nichesData";
import BlackHoleText from "./BlackHoleText";
import OurWork from "./OurWork";

interface HeroProps {
  onSelectNiche: (niche: BusinessNiche) => void;
  onOpenQuote: (initialNiche?: string) => void;
  onExploreSolutions: () => void;
}

/* =========================================================
   SEARCH EXAMPLES
========================================================= */

const ROTATING_EXAMPLES = [
  "SaaS Business",
  "AI Automation Agency",
  "Dental Clinic",
  "Restaurant & Cloud Kitchen",
  "Real Estate Agency",
  "Solar Installation",
  "Car Detailing & EV",
  "Gym & Fitness",
  "Law Firm",
  "Dropshipping Brand",
  "Tiffin Service",
  "Drone Services",
];

/* =========================================================
   PIPELINE
========================================================= */

const PIPELINE_STEPS = [
  {
    id: "01",
    title: "Business Idea",
    icon: Sparkles,
    desc: "Concept & Validation",
  },
  {
    id: "02",
    title: "Strategy",
    icon: Compass,
    desc: "Market Positioning",
  },
  {
    id: "03",
    title: "Design",
    icon: Palette,
    desc: "UI/UX & Branding",
  },
  {
    id: "04",
    title: "Development",
    icon: Code2,
    desc: "Web & Mobile Apps",
  },
  {
    id: "05",
    title: "AI & Automation",
    icon: Bot,
    desc: "Autonomous Agents",
  },
  {
    id: "06",
    title: "Marketing",
    icon: TrendingUp,
    desc: "SEO & Ads Funnels",
  },
  {
    id: "07",
    title: "Deployment",
    icon: Rocket,
    desc: "Global Cloud Edge",
  },
  {
    id: "08",
    title: "Growth",
    icon: Zap,
    desc: "Conversion Scaling",
  },
];

/* =========================================================
   ANIMATED SERVICES
========================================================= */

const HERO_SERVICES = [
  {
    id: "01",
    top: "WE COOK",
    main: "WEBSITES",
    description:
      "We turn your business idea into a digital experience people remember.",
    icon: ChefHat,
    color: "cyan",
  },
  {
    id: "02",
    top: "WE DRAW",
    main: "BRANDS",
    description:
      "We create visual identities that make your business impossible to ignore.",
    icon: Palette,
    color: "blue",
  },
  {
    id: "03",
    top: "WE ENGINEER",
    main: "APPS",
    description:
      "We build fast, beautiful digital products designed around your business.",
    icon: Code2,
    color: "purple",
  },
  {
    id: "04",
    top: "WE TEACH",
    main: "AI",
    description:
      "We bring intelligent AI systems into the way your business actually works.",
    icon: Bot,
    color: "cyan",
  },
  {
    id: "05",
    top: "WE AUTOMATE",
    main: "WORK",
    description:
      "We turn repetitive work into intelligent systems that run for you.",
    icon: Zap,
    color: "blue",
  },
  {
    id: "06",
    top: "WE AMPLIFY",
    main: "MARKETING",
    description:
      "We turn attention into customers with smarter digital marketing.",
    icon: Megaphone,
    color: "purple",
  },
  {
    id: "07",
    top: "WE LAUNCH",
    main: "IDEAS",
    description:
      "We take ideas from the first thought all the way to the real world.",
    icon: Rocket,
    color: "cyan",
  },
  {
    id: "08",
    top: "WE BUILD",
    main: "THE FUTURE",
    description:
      "Strategy, design, technology and AI — together under one roof.",
    icon: PenTool,
    color: "blue",
  },
];

/* =========================================================
   BOTTOM MARQUEE
========================================================= */

const MARQUEE_ITEMS = [
  "WEBSITES",
  "BRANDING",
  "AI AUTOMATION",
  "WEB APPS",
  "E-COMMERCE",
  "AI AGENTS",
  "MARKETING",
  "LOGO DESIGN",
  "DIGITAL PRODUCTS",
  "BUSINESS SYSTEMS",
];

/* =========================================================
   HERO
========================================================= */

export const Hero: React.FC<HeroProps> = ({
  onSelectNiche,
  onOpenQuote,
  onExploreSolutions,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BusinessNiche[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const [activePipelineStep, setActivePipelineStep] = useState(3);

  const [heroServiceIndex, setHeroServiceIndex] = useState(0);
  const [servicePhase, setServicePhase] = useState<
    "visible" | "exit" | "enter"
  >("visible");

  const searchContainerRef = useRef<HTMLDivElement>(null);

  /* =======================================================
     ROTATING SEARCH PLACEHOLDER
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex(
        (prev) => (prev + 1) % ROTATING_EXAMPLES.length
      );
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  /* =======================================================
     SERVICE ANIMATION
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setServicePhase("exit");

      setTimeout(() => {
        setHeroServiceIndex(
          (prev) => (prev + 1) % HERO_SERVICES.length
        );

        setServicePhase("enter");
      }, 500);

      setTimeout(() => {
        setServicePhase("visible");
      }, 850);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  /* =======================================================
     OUTSIDE SEARCH CLICK
  ======================================================= */

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;

    setSearchQuery(val);

    if (val.trim().length > 0) {
      const results = searchNiches(val);

      setSearchResults(results.slice(0, 8));
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelectNicheItem = (niche: BusinessNiche) => {
    setSearchQuery(niche.name);
    setShowDropdown(false);
    onSelectNiche(niche);
  };

  const activeService = HERO_SERVICES[heroServiceIndex];

  const ActiveServiceIcon = activeService.icon;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
   
    <section
      className="
        relative
        overflow-hidden
        pt-12
        pb-0
        md:pt-20
        bg-grid-pattern
        bg-[#070b14]
        border-b
        border-white/10
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div
        className="
          absolute
          top-[10%]
          left-1/2
          -translate-x-1/2
          w-[800px]
          h-[400px]
          bg-gradient-to-r
          from-cyan-600/10
          via-blue-600/10
          to-indigo-600/10
          blur-[140px]
          rounded-full
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          top-[35%]
          left-[5%]
          w-[300px]
          h-[300px]
          bg-cyan-500/5
          blur-[100px]
          rounded-full
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-[15%]
          right-[5%]
          w-[350px]
          h-[350px]
          bg-blue-500/5
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      {/* =====================================================
          DECORATIVE BACKGROUND TEXT
      ====================================================== */}

      <div
        className="
          absolute
          top-[4%]
          left-1/2
          -translate-x-1/2
          text-[13vw]
          md:text-[15vw]
          font-black
          uppercase
          tracking-[-0.08em]
          leading-none
          text-white/[0.018]
          whitespace-nowrap
          select-none
          pointer-events-none
        "
      >
        DIGITAL
      </div>

      <div
        className="
          absolute
          bottom-[20%]
          right-[-5%]
          text-[12vw]
          md:text-[14vw]
          font-black
          uppercase
          tracking-[-0.08em]
          leading-none
          text-white/[0.018]
          whitespace-nowrap
          select-none
          pointer-events-none
        "
      >
        STUDIO
      </div>

      {/* =====================================================
          FLOATING BUTTONS / STICKERS
      ====================================================== */}

      <div className="absolute inset-0 pointer-events-none">

        {/* WEBSITE */}

        <div
          className="
            absolute
            left-[2%]
            top-[17%]
            hidden
            lg:block
            hero-float
          "
        >
          <div
            className="
              floating-pill
              cyan-pill
              rotate-[-7deg]
            "
          >
            <Code2 size={17} />
            <span>WEBSITES</span>
          </div>
        </div>

        {/* AI */}

        <div
          className="
            absolute
            right-[3%]
            top-[18%]
            hidden
            lg:block
            hero-float
            hero-float-delay-1
          "
        >
          <div
            className="
              floating-pill
              blue-pill
              rotate-[6deg]
            "
          >
            <Bot size={17} />
            <span>AI AGENTS</span>
          </div>
        </div>

        {/* AUTOMATION */}

        <div
          className="
            absolute
            left-[4%]
            top-[51%]
            hidden
            lg:block
            hero-float
            hero-float-delay-2
          "
        >
          <div
            className="
              floating-pill
              dark-pill
              rotate-[5deg]
            "
          >
            <Zap size={17} />
            <span>AUTOMATION</span>
          </div>
        </div>

        {/* BRANDING */}

        <div
          className="
            absolute
            right-[4%]
            top-[50%]
            hidden
            lg:block
            hero-float
            hero-float-delay-3
          "
        >
          <div
            className="
              floating-pill
              cyan-pill
              rotate-[-5deg]
            "
          >
            <Palette size={17} />
            <span>BRANDING</span>
          </div>
        </div>

      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          relative
          z-10
        "
      >

        {/* ===================================================
            EYEBROW
        ==================================================== */}

        <div className="flex justify-center mb-7">

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/5
              border
              border-cyan-500/25
              text-[10px]
              sm:text-xs
              font-medium
              text-cyan-300
              backdrop-blur-md
              shadow-lg
              shadow-cyan-500/5
            "
          >

            <span
              className="
                relative
                flex
                w-2
                h-2
              "
            >

              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  rounded-full
                  bg-cyan-400
                  opacity-75
                  animate-ping
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  rounded-full
                  w-2
                  h-2
                  bg-cyan-400
                "
              />

            </span>

            <span>
              Built in India • Delivered Worldwide • 20 Categories •
              320+ Niches
            </span>

          </div>

        </div>

        {/* ===================================================
            MAIN HEADING
        ==================================================== */}

        <div className="text-center max-w-6xl mx-auto">

          <h1
            className="
              font-display
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-extrabold
              text-white
              tracking-tight
              leading-[1.02]
            "
          >

            <span className="block">
              We Build Digital Businesses
            </span>

            <span className="block">
              That Are{" "}
              <BlackHoleText text="Ready for the World." />
            </span>

          </h1>

          {/* =================================================
              ANIMATED SERVICE SHOWCASE
          ================================================== */}

          <div className="mt-9 md:mt-11">

            <div
              className={`
                service-stage
                service-${servicePhase}
              `}
            >

              {/* SERVICE ICON */}

              <div
                className="
                  service-icon-wrapper
                  shrink-0
                "
              >

                <div className="service-icon-glow" />

                <div className="service-icon-box">

                  <ActiveServiceIcon
                    className="text-cyan-300"
                    size={25}
                    strokeWidth={2.5}
                  />

                </div>

              </div>

              {/* SERVICE TEXT */}

              <div className="text-left">

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      text-xs
                      sm:text-sm
                      md:text-lg
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-slate-400
                    "
                  >
                    {activeService.top}
                  </span>

                  <span
                    className="
                      hidden
                      sm:block
                      w-8
                      md:w-12
                      h-px
                      bg-gradient-to-r
                      from-cyan-400
                      to-transparent
                    "
                  />

                </div>

                <div
                  className="
                    service-main-text
                    text-4xl
                    sm:text-5xl
                    md:text-6xl
                    lg:text-7xl
                    font-black
                    uppercase
                    tracking-[-0.055em]
                    leading-[0.9]
                    bg-gradient-to-r
                    from-white
                    via-cyan-100
                    to-cyan-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  {activeService.main}
                </div>

              </div>

              {/* SERVICE NUMBER */}

              <div
                className="
                  hidden
                  md:block
                  ml-2
                  self-start
                  pt-1
                  font-mono
                  text-[10px]
                  text-cyan-400/60
                  tracking-widest
                "
              >
                {activeService.id}/08
              </div>

            </div>

            {/* SERVICE DESCRIPTION */}

            <div
              key={heroServiceIndex}
              className="
                mt-4
                text-sm
                sm:text-base
                text-slate-400
                animate-service-description
              "
            >
              {activeService.description}
            </div>

            {/* PROGRESS */}

            <div
              className="
                mt-5
                flex
                items-center
                justify-center
                gap-1.5
              "
            >

              {HERO_SERVICES.map((service, index) => (

                <button
                  key={service.id}
                  onClick={() => {
                    setHeroServiceIndex(index);
                    setServicePhase("visible");
                  }}
                  aria-label={`Show ${service.main}`}
                  className={`
                    service-progress-dot
                    ${
                      heroServiceIndex === index
                        ? "service-progress-active"
                        : ""
                    }
                  `}
                />

              ))}

            </div>

          </div>

          {/* =================================================
              ACTION BUTTONS
          ================================================== */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-center
              gap-4
            "
          >

            {/* PRIMARY */}

            <button
              onClick={() => onOpenQuote()}
              className="
                group
                relative
                overflow-hidden
                px-7
                py-3.5
                text-sm
                sm:text-base
                font-semibold
                text-white
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                hover:from-cyan-400
                hover:to-blue-500
                rounded-xl
                shadow-xl
                shadow-cyan-500/25
                hover:shadow-cyan-500/40
                transition-all
                duration-300
                flex
                items-center
                gap-2
                transform
                active:scale-95
              "
            >

              <span>
                Start Your Project
              </span>

              <ArrowRight
                className="
                  w-4
                  h-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </button>

            {/* SECONDARY */}

            <button
              onClick={onExploreSolutions}
              className="
                group
                px-7
                py-3.5
                text-sm
                sm:text-base
                font-semibold
                text-slate-200
                hover:text-white
                bg-white/5
                hover:bg-white/10
                border
                border-white/15
                hover:border-cyan-500/30
                rounded-xl
                backdrop-blur-sm
                transition-all
                flex
                items-center
                gap-2
              "
            >

              <span>
                Explore Business Solutions
              </span>

              <ChevronRight
                className="
                  w-4
                  h-4
                  text-cyan-400
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </button>

          </div>

        </div>

        {/* ===================================================
            SEARCH SECTION
        ==================================================== */}

        <div
          className="
            mt-14
            max-w-3xl
            mx-auto
          "
          ref={searchContainerRef}
        >

          <div className="text-center mb-3">

            <label
              className="
                text-xs
                sm:text-sm
                font-semibold
                uppercase
                tracking-wider
                text-cyan-400
                flex
                items-center
                justify-center
                gap-2
              "
            >

              <Sparkles className="w-4 h-4" />

              <span>
                What type of business do you run?
              </span>

            </label>

          </div>

          <div className="relative">

            {/* SEARCH BOX */}

            <div
              className="
                relative
                flex
                items-center
                bg-[#0d121f]
                border-2
                border-cyan-500/30
                hover:border-cyan-500/60
                focus-within:border-cyan-400
                rounded-2xl
                shadow-2xl
                shadow-cyan-500/10
                transition-all
                p-2
              "
            >

              <div
                className="
                  pl-3
                  pr-2
                  text-cyan-400
                "
              >

                <Search
                  className="
                    w-5
                    h-5
                    sm:w-6
                    sm:h-6
                  "
                />

              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (searchQuery.trim().length > 0) {
                    setShowDropdown(true);
                  }
                }}
                placeholder={`e.g. ${ROTATING_EXAMPLES[placeholderIndex]}...`}
                className="
                  w-full
                  bg-transparent
                  text-white
                  placeholder-slate-500
                  text-sm
                  sm:text-base
                  px-2
                  py-2.5
                  focus:outline-none
                "
              />

              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowDropdown(false);
                  }}
                  className="
                    px-2
                    text-slate-400
                    hover:text-white
                    text-xs
                  "
                >
                  <X size={15} />
                </button>
              )}

              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    const matched =
                      searchNiches(searchQuery);

                    if (matched.length > 0) {
                      handleSelectNicheItem(matched[0]);
                    }
                  } else {
                    onExploreSolutions();
                  }
                }}
                className="
                  px-5
                  py-2.5
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  hover:from-cyan-400
                  hover:to-blue-500
                  text-white
                  text-sm
                  font-semibold
                  rounded-xl
                  transition-all
                  shadow-md
                  flex
                  items-center
                  gap-1.5
                  shrink-0
                "
              >
                <span>
                  Search
                </span>
              </button>

            </div>

            {/* =================================================
                AUTOCOMPLETE
            ================================================== */}

            {showDropdown &&
              searchResults.length > 0 && (

                <div
                  className="
                    absolute
                    top-full
                    left-0
                    right-0
                    mt-2
                    bg-[#0c101c]
                    border
                    border-cyan-500/30
                    rounded-2xl
                    shadow-2xl
                    overflow-hidden
                    z-50
                    animate-in
                    fade-in
                    slide-in-from-top-2
                    duration-150
                  "
                >

                  <div
                    className="
                      p-2
                      border-b
                      border-white/5
                      bg-white/5
                      flex
                      items-center
                      justify-between
                      text-[11px]
                      text-slate-400
                      px-3
                    "
                  >

                    <span>
                      Recommended Niches ({searchResults.length})
                    </span>

                    <span>
                      Select to see tailored solutions
                    </span>

                  </div>

                  <div
                    className="
                      max-h-80
                      overflow-y-auto
                      divide-y
                      divide-white/5
                    "
                  >

                    {searchResults.map((niche) => (

                      <button
                        key={niche.id}
                        onClick={() =>
                          handleSelectNicheItem(niche)
                        }
                        className="
                          w-full
                          text-left
                          p-3.5
                          hover:bg-cyan-500/10
                          transition-colors
                          flex
                          items-center
                          justify-between
                          group
                          focus:outline-none
                        "
                      >

                        <div>

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >

                            <span
                              className="
                                text-sm
                                font-semibold
                                text-white
                                group-hover:text-cyan-300
                                transition-colors
                              "
                            >
                              {niche.name}
                            </span>

                            <span
                              className="
                                text-[10px]
                                font-medium
                                uppercase
                                px-2
                                py-0.5
                                rounded
                                bg-white/5
                                text-slate-400
                                border
                                border-white/10
                              "
                            >
                              {niche.category}
                            </span>

                          </div>

                          <p
                            className="
                              text-xs
                              text-slate-400
                              mt-0.5
                              line-clamp-1
                            "
                          >
                            {niche.tagline}
                          </p>

                        </div>

                        <span
                          className="
                            text-xs
                            text-cyan-400
                            flex
                            items-center
                            gap-1
                            opacity-0
                            group-hover:opacity-100
                            transition-opacity
                            font-medium
                            shrink-0
                            ml-3
                          "
                        >

                          View Solutions

                          <ArrowRight
                            className="w-3.5 h-3.5"
                          />

                        </span>

                      </button>

                    ))}

                  </div>

                </div>

              )}

          </div>

          {/* POPULAR */}

          <div
            className="
              mt-3
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
              text-xs
              text-slate-400
            "
          >

            <span className="text-slate-500">
              Popular:
            </span>

            {[
              "Dental Clinic",
              "Restaurant",
              "Real Estate",
              "Gym & Fitness",
              "Law Firm",
              "Contractor",
            ].map((tag) => (

              <button
                key={tag}
                onClick={() => {
                  const match = searchNiches(tag);

                  if (match.length > 0) {
                    handleSelectNicheItem(match[0]);
                  }
                }}
                className="
                  px-2.5
                  py-1
                  rounded-lg
                  bg-white/5
                  hover:bg-cyan-500/10
                  hover:text-cyan-300
                  border
                  border-white/10
                  hover:border-cyan-500/30
                  transition-colors
                  cursor-pointer
                "
              >
                {tag}
              </button>

            ))}

          </div>

        </div>

        {/* ===================================================
            PIPELINE
        ==================================================== */}

       <div
  className="
    mt-16
    sm:mt-20
    pt-8
    pb-28
    border-t
    border-white/10
    relative
    overflow-hidden
"
>
  {/* IMPORTANT:
      This wrapper reserves the actual space for the pipeline.
      The animated group is positioned INSIDE this space,
      so it never overlays the hero content.
  */}
  <div className="pipeline-stage">

    <div className="pipeline-whole-drop">

      {/* SECTION LABEL */}
      <div className="text-center mb-6">
        <span
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            uppercase
            tracking-wider
            text-slate-400
            font-semibold
          "
        >
          <span
            className="
              w-1.5
              h-1.5
              rounded-full
              bg-cyan-400
              animate-pulse
            "
          />

          The Full End-to-End Digital Transformation Lifecycle
        </span>
      </div>

      {/* PIPELINE CARDS */}
      <div
        className="
          relative
          grid
          grid-cols-2
          sm:grid-cols-4
          lg:grid-cols-8
          gap-3
        "
      >
        {PIPELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activePipelineStep === idx;

          return (
            <div
              key={step.id}
              onClick={() => setActivePipelineStep(idx)}
              className={`
                group
                cursor-pointer
                relative
                p-3
                rounded-xl
                border
                text-center
                transition-all
                duration-500

                ${
                  isActive
                    ? `
                      bg-gradient-to-b
                      from-cyan-500/20
                      to-blue-600/10
                      border-cyan-400/50
                      shadow-lg
                      shadow-cyan-500/10
                      scale-105
                    `
                    : `
                      bg-white/5
                      border-white/10
                      hover:border-cyan-500/30
                      hover:bg-white/10
                    `
                }
              `}
            >
              {/* NUMBER */}
              <span
                className="
                  absolute
                  top-2
                  right-2
                  text-[9px]
                  font-mono
                  text-cyan-500/60
                "
              >
                {step.id}
              </span>

              {/* ICON */}
              <div className="flex justify-center mb-2">
                <div
                  className={`
                    w-9
                    h-9
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-500

                    ${
                      isActive
                        ? `
                          bg-cyan-500
                          text-black
                          shadow-lg
                          shadow-cyan-500/30
                        `
                        : `
                          bg-white/10
                          text-cyan-400
                        `
                    }

                    group-hover:scale-110
                    group-hover:rotate-3
                  `}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* ID */}
              <span
                className="
                  block
                  text-[10px]
                  font-mono
                  text-cyan-400
                  font-semibold
                  mb-0.5
                "
              >
                {step.id}
              </span>

              {/* TITLE */}
              <h4
                className="
                  text-xs
                  font-bold
                  text-white
                  leading-tight
                "
              >
                {step.title}
              </h4>

              {/* DESCRIPTION */}
              <p
                className="
                  text-[10px]
                  text-slate-400
                  mt-1
                  line-clamp-1
                "
              >
                {step.desc}
              </p>

              {/* ACTIVE LINE */}
              {isActive && (
                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    -translate-x-1/2
                    w-8
                    h-[2px]
                    rounded-full
                    bg-cyan-400
                    shadow-[0_0_12px_rgba(34,211,238,.7)]
                    pipeline-active-glow
                  "
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ACTIVE INFO */}
      <div
        className="
          mt-4
          p-3.5
          rounded-xl
          bg-white/5
          border
          border-white/10
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-3
          text-xs
        "
      >
        <div className="flex items-center gap-3 text-slate-300">

          <div
            className="
              p-1.5
              rounded-lg
              bg-cyan-500/20
              text-cyan-300
              font-bold
              font-mono
            "
          >
            {PIPELINE_STEPS[activePipelineStep].id}
          </div>

          <div>
            <span
              className="
                font-semibold
                text-white
                mr-1.5
              "
            >
              Phase {PIPELINE_STEPS[activePipelineStep].id}:{" "}
              {PIPELINE_STEPS[activePipelineStep].title}
            </span>

            <span
              className="
                text-slate-400
                hidden
                md:inline
              "
            >
              — We execute every step with precision so you never
              need five different vendors.
            </span>
          </div>
        </div>

        <button
          onClick={() => onOpenQuote()}
          className="
            text-cyan-400
            hover:text-cyan-300
            font-semibold
            flex
            items-center
            gap-1
            shrink-0
            group
          "
        >
          <span>Build This Into My Plan</span>

          <ArrowRight
            className="
              w-3.5
              h-3.5
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </button>
      </div>
    </div>
  </div>

  <style>{`

    /* =====================================================
       PIPELINE STAGE

       The stage itself owns the space.
       Therefore the animation cannot cover the hero.
    ===================================================== */

    .pipeline-stage {
      position: relative;
      width: 100%;
      min-height: 250px;
      perspective: 1400px;
      overflow: visible;
    }


    /* =====================================================
       WHOLE GROUP

       IMPORTANT:
       This is ONE animated object.

       The cards do NOT animate individually.
       The entire pipeline moves together.
    ===================================================== */

    .pipeline-whole-drop {
      position: relative;

      opacity: 0;

      transform:
        translate3d(0, -120vh, 0)
        rotateX(-10deg)
        scale(0.94);

      transform-origin: center top;

      will-change:
        transform,
        opacity,
        filter;

      animation:
        pipelineCinematicDrop
        3.2s
        cubic-bezier(.16, 1, .3, 1)
        0.2s
        forwards;
    }


    /* =====================================================
       CINEMATIC DROP

       Slow beginning
       Fast middle
       Soft landing
       Tiny bounce
       Perfect settle
    ===================================================== */

    @keyframes pipelineCinematicDrop {

      /* START
         Far above the page */
      0% {
        opacity: 0;

        transform:
          translate3d(0, -120vh, 0)
          rotateX(-12deg)
          scale(0.94);

        filter: blur(18px);
      }


      /* Slowly becomes visible */
      15% {
        opacity: 0.25;

        transform:
          translate3d(0, -90vh, 0)
          rotateX(-10deg)
          scale(0.95);

        filter: blur(14px);
      }


      /* Still coming down */
      35% {
        opacity: 0.65;

        transform:
          translate3d(0, -48vh, 0)
          rotateX(-6deg)
          scale(0.97);

        filter: blur(7px);
      }


      /* Approaching landing */
      52% {
        opacity: 1;

        transform:
          translate3d(0, -12vh, 0)
          rotateX(-2deg)
          scale(0.99);

        filter: blur(2px);
      }


      /* FIRST LANDING */
      66% {
        transform:
          translate3d(0, 2.5vh, 0)
          rotateX(1deg)
          scale(1.008);

        filter: blur(0);
      }


      /* Small bounce upward */
      76% {
        transform:
          translate3d(0, -1.4vh, 0)
          rotateX(-0.5deg)
          scale(0.997);
      }


      /* Second tiny landing */
      85% {
        transform:
          translate3d(0, 0.7vh, 0)
          rotateX(0.2deg)
          scale(1.003);
      }


      /* Almost completely settled */
      93% {
        transform:
          translate3d(0, -0.25vh, 0)
          rotateX(0deg)
          scale(1);
      }


      /* FINAL */
      100% {
        opacity: 1;

        transform:
          translate3d(0, 0, 0)
          rotateX(0deg)
          scale(1);

        filter: blur(0);
      }
    }


    /* =====================================================
       LANDING ENERGY

       A soft cyan pulse happens when the group lands.
    ===================================================== */

    .pipeline-whole-drop::after {
      content: "";

      position: absolute;

      left: 50%;
      bottom: -18px;

      width: 0;
      height: 2px;

      transform: translateX(-50%);

      border-radius: 999px;

      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(34,211,238,.85),
          rgba(59,130,246,.85),
          transparent
        );

      box-shadow:
        0 0 20px rgba(34,211,238,.35);

      opacity: 0;

      animation:
        pipelineLandingWave
        1.2s
        cubic-bezier(.16, 1, .3, 1)
        2.85s
        forwards;
    }


    @keyframes pipelineLandingWave {

      0% {
        width: 0;
        opacity: 0;
      }

      20% {
        width: 20%;
        opacity: 0.8;
      }

      55% {
        width: 70%;
        opacity: 0.45;
      }

      100% {
        width: 100%;
        opacity: 0;
      }
    }


    /* =====================================================
       ACTIVE CARD GLOW
    ===================================================== */

    .pipeline-active-glow {
      animation:
        pipelineActiveGlow
        2.4s
        ease-in-out
        infinite;
    }


    @keyframes pipelineActiveGlow {

      0%,
      100% {
        opacity: .4;
        width: 24px;
      }

      50% {
        opacity: 1;
        width: 38px;

        box-shadow:
          0 0 18px
          rgba(34,211,238,.8);
      }
    }


    /* =====================================================
       DESKTOP HOVER

       Keep this subtle so it doesn't fight the entrance.
    ===================================================== */

    @media (min-width: 1024px) {

      .pipeline-whole-drop .group {
        transition:
          transform .5s cubic-bezier(.16, 1, .3, 1),
          border-color .4s ease,
          background .4s ease,
          box-shadow .4s ease;
      }

      .pipeline-whole-drop .group:hover {
        transform:
          translateY(-5px)
          scale(1.025);

        z-index: 20;

        box-shadow:
          0 15px 40px
          rgba(6,182,212,.12);
      }
    }


    /* =====================================================
       MOBILE

       Slightly smaller movement so it feels natural
       on phones.
    ===================================================== */

    @media (max-width: 768px) {

      .pipeline-stage {
        min-height: 430px;
      }

      .pipeline-whole-drop {

        transform:
          translate3d(0, -100vh, 0)
          scale(.96);

        animation-duration: 3s;
      }

      @keyframes pipelineCinematicDrop {

        0% {
          opacity: 0;

          transform:
            translate3d(0, -100vh, 0)
            scale(.94);

          filter: blur(14px);
        }

        25% {
          opacity: .45;

          transform:
            translate3d(0, -55vh, 0)
            scale(.97);

          filter: blur(7px);
        }

        52% {
          opacity: 1;

          transform:
            translate3d(0, -10vh, 0)
            scale(.99);

          filter: blur(2px);
        }

        67% {
          transform:
            translate3d(0, 2vh, 0)
            scale(1.008);
        }

        77% {
          transform:
            translate3d(0, -1vh, 0)
            scale(.997);
        }

        87% {
          transform:
            translate3d(0, .5vh, 0)
            scale(1.003);
        }

        100% {
          opacity: 1;

          transform:
            translate3d(0, 0, 0)
            scale(1);

          filter: blur(0);
        }
      }
    }


    /* =====================================================
       ACCESSIBILITY
    ===================================================== */

    @media (prefers-reduced-motion: reduce) {

      .pipeline-whole-drop {
        animation: none !important;

        opacity: 1;

        transform: none !important;

        filter: none !important;
      }

      .pipeline-whole-drop::after,
      .pipeline-active-glow {
        animation: none !important;
      }
    }

  `}</style>
</div>
      </div>

      {/* =====================================================
          CONTINUOUS BOTTOM MARQUEE
      ====================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          overflow-hidden
          bg-gradient-to-r
          from-cyan-600
          via-blue-600
          to-cyan-600
          border-t
          border-cyan-400/30
        "
      >

        <div className="marquee-track">

          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
            (item, index) => (

              <React.Fragment
                key={`${item}-${index}`}
              >

                <span className="marquee-item">
                  {item}
                </span>

                <span className="marquee-star">
                  ✦
                </span>

              </React.Fragment>

            )
          )}

        </div>

      </div>

      {/* =====================================================
          COMPONENT CSS
      ====================================================== */}

      <style>{`

        /* ===================================================
           BACKGROUND GRID
        ==================================================== */

        .bg-grid-pattern {
          background-image:
            linear-gradient(
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            );

          background-size: 60px 60px;
        }


        /* ===================================================
           FLOATING PILLS
        ==================================================== */

        .floating-pill {

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          padding:
            11px
            17px;

          border-radius: 999px;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: .08em;

          white-space: nowrap;

          backdrop-filter: blur(10px);

          box-shadow:
            0 12px 35px rgba(0,0,0,.25);

          border:
            1px solid;

        }


        .cyan-pill {

          color: #67e8f9;

          background:
            rgba(8,47,73,.65);

          border-color:
            rgba(34,211,238,.35);

          box-shadow:
            0 10px 35px rgba(6,182,212,.12);

        }


        .blue-pill {

          color: #93c5fd;

          background:
            rgba(23,37,84,.65);

          border-color:
            rgba(59,130,246,.35);

          box-shadow:
            0 10px 35px rgba(37,99,235,.12);

        }


        .dark-pill {

          color: #e2e8f0;

          background:
            rgba(13,18,31,.8);

          border-color:
            rgba(255,255,255,.12);

        }


        /* ===================================================
           FLOATING ANIMATION
        ==================================================== */

        .hero-float {

          animation:
            heroFloat
            4.5s
            ease-in-out
            infinite;

        }


        .hero-float-delay-1 {

          animation-delay:
            -1.1s;

        }


        .hero-float-delay-2 {

          animation-delay:
            -2.2s;

        }


        .hero-float-delay-3 {

          animation-delay:
            -3.1s;

        }


        @keyframes heroFloat {

          0%,
          100% {

            transform:
              translateY(0px)
              rotate(0deg);

          }

          50% {

            transform:
              translateY(-12px)
              rotate(1deg);

          }

        }


        /* ===================================================
           SERVICE STAGE
        ==================================================== */

        .service-stage {

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 15px;

          min-height: 120px;

          transform-origin:
            center center;

          will-change:
            transform,
            opacity,
            filter;

        }


        /* ===================================================
           SERVICE ENTER
        ==================================================== */

        .service-enter {

          animation:
            serviceEnter
            .55s
            cubic-bezier(
              .16,
              1,
              .3,
              1
            )
            forwards;

        }


        @keyframes serviceEnter {

          0% {

            opacity: 0;

            transform:
              translateY(35px)
              scale(.94)
              rotateX(-8deg);

            filter:
              blur(10px);

          }

          60% {

            opacity: 1;

            transform:
              translateY(-5px)
              scale(1.015)
              rotateX(0deg);

            filter:
              blur(0);

          }

          100% {

            opacity: 1;

            transform:
              translateY(0)
              scale(1)
              rotateX(0deg);

            filter:
              blur(0);

          }

        }


        /* ===================================================
           SERVICE VISIBLE
        ==================================================== */

        .service-visible {

          opacity: 1;

          transform:
            translateY(0)
            scale(1);

        }


        /* ===================================================
           SERVICE EXIT
        ==================================================== */

        .service-exit {

          animation:
            serviceExit
            .5s
            cubic-bezier(
              .7,
              0,
              .84,
              0
            )
            forwards;

        }


        @keyframes serviceExit {

          0% {

            opacity: 1;

            transform:
              translateY(0)
              scale(1);

            filter:
              blur(0);

          }

          100% {

            opacity: 0;

            transform:
              translateY(-25px)
              scale(.94);

            filter:
              blur(9px);

          }

        }


        /* ===================================================
           SERVICE ICON
        ==================================================== */

        .service-icon-wrapper {

          position: relative;

          width: 58px;

          height: 58px;

        }


        .service-icon-glow {

          position: absolute;

          inset: -10px;

          border-radius: 50%;

          background:
            rgba(34,211,238,.12);

          filter:
            blur(16px);

          animation:
            iconGlow
            2.4s
            ease-in-out
            infinite;

        }


        @keyframes iconGlow {

          0%,
          100% {

            opacity: .45;

            transform:
              scale(.9);

          }

          50% {

            opacity: .9;

            transform:
              scale(1.15);

          }

        }


        .service-icon-box {

          position: relative;

          width: 58px;

          height: 58px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 17px;

          background:
            linear-gradient(
              135deg,
              rgba(34,211,238,.18),
              rgba(37,99,235,.16)
            );

          border:
            1px solid
            rgba(34,211,238,.4);

          box-shadow:
            inset 0 0 20px
            rgba(34,211,238,.08),
            0 0 30px
            rgba(34,211,238,.08);

          animation:
            iconFloat
            2.8s
            ease-in-out
            infinite;

        }


        @keyframes iconFloat {

          0%,
          100% {

            transform:
              translateY(0)
              rotate(-2deg);

          }

          50% {

            transform:
              translateY(-5px)
              rotate(2deg);

          }

        }


        /* ===================================================
           SERVICE MAIN TEXT
        ==================================================== */

        .service-main-text {

          position: relative;

          animation:
            serviceTextGlow
            2.5s
            ease-in-out
            infinite;

        }


        @keyframes serviceTextGlow {

          0%,
          100% {

            text-shadow:
              0 0 0
              rgba(34,211,238,0);

          }

          50% {

            text-shadow:
              0 0 35px
              rgba(34,211,238,.15);

          }

        }


        /* ===================================================
           SERVICE DESCRIPTION
        ==================================================== */

        .animate-service-description {

          animation:
            descriptionIn
            .65s
            cubic-bezier(
              .16,
              1,
              .3,
              1
            );

        }


        @keyframes descriptionIn {

          from {

            opacity: 0;

            transform:
              translateY(8px);

          }

          to {

            opacity: 1;

            transform:
              translateY(0);

          }

        }


        /* ===================================================
           PROGRESS DOTS
        ==================================================== */

        .service-progress-dot {

          width: 6px;

          height: 6px;

          border-radius: 999px;

          background:
            rgba(148,163,184,.25);

          transition:
            all .3s ease;

        }


        .service-progress-dot:hover {

          background:
            rgba(34,211,238,.6);

        }


        .service-progress-active {

          width: 25px;

          background:
            linear-gradient(
              90deg,
              #22d3ee,
              #3b82f6
            );

          box-shadow:
            0 0 12px
            rgba(34,211,238,.45);

        }


        /* ===================================================
           MARQUEE
        ==================================================== */

        .marquee-track {

          display: flex;

          align-items: center;

          width: max-content;

          animation:
            marqueeMove
            30s
            linear
            infinite;

          will-change:
            transform;

        }


        .marquee-item {

          display: inline-block;

          padding:
            14px
            28px;

          font-size: 14px;

          font-weight: 800;

          letter-spacing:
            .08em;

          color: white;

          white-space: nowrap;

        }


        .marquee-star {

          display: inline-block;

          color: rgba(255,255,255,.7);

          font-size: 15px;

        }


        @keyframes marqueeMove {

          from {

            transform:
              translateX(0);

          }

          to {

            transform:
              translateX(-50%);

          }

        }


        /* ===================================================
           MOBILE
        ==================================================== */

        @media (max-width: 768px) {

          .service-stage {

            min-height: 105px;

            gap: 10px;

          }


          .service-icon-wrapper {

            width: 43px;

            height: 43px;

          }


          .service-icon-box {

            width: 43px;

            height: 43px;

            border-radius: 13px;

          }


          .service-icon-glow {

            inset: -7px;

          }


          .service-main-text {

            font-size:
              clamp(
                34px,
                10vw,
                54px
              );

          }


          .service-stage
          .text-left
          > div:first-child
          span {

            font-size: 11px;

          }


          .service-description {

            padding:
              0
              25px;

          }


          .marquee-item {

            padding:
              12px
              20px;

            font-size:
              12px;

          }

        }


        /* ===================================================
           SMALL MOBILE
        ==================================================== */

        @media (max-width: 430px) {

          .service-stage {

            min-height: 90px;

          }


          .service-icon-wrapper {

            width: 37px;

            height: 37px;

          }


          .service-icon-box {

            width: 37px;

            height: 37px;

            border-radius: 11px;

          }


          .service-icon-box svg {

            width: 19px;

            height: 19px;

          }


          .service-main-text {

            font-size:
              32px;

          }


          .service-description {

            font-size:
              11px;

          }

        }


        /* ===================================================
           REDUCED MOTION
        ==================================================== */

        @media (prefers-reduced-motion: reduce) {

          .hero-float,
          .service-icon-glow,
          .service-icon-box,
          .service-main-text,
          .marquee-track {

            animation:
              none !important;

          }

        }

      `}</style>
    </section>
<OurWork/>
     </>
  );
};