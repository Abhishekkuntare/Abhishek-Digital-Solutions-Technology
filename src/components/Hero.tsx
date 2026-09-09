import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  CheckCircle, 
  Globe2, 
  ChevronRight, 
  Compass, 
  Zap, 
  TrendingUp, 
  Bot, 
  Code2, 
  Palette, 
  Rocket, 
  ShieldCheck 
} from 'lucide-react';
import { BusinessNiche } from '../types';
import { searchNiches, NICHES_DATABASE } from '../data/nichesData';
import BlackHoleText from "./BlackHoleText";

interface HeroProps {
  onSelectNiche: (niche: BusinessNiche) => void;
  onOpenQuote: (initialNiche?: string) => void;
  onExploreSolutions: () => void;
}

const ROTATING_EXAMPLES = [
  'SaaS Business',
  'AI Automation Agency',
  'Dental Clinic',
  'Restaurant & Cloud Kitchen',
  'Real Estate Agency',
  'Solar Installation',
  'Car Detailing & EV',
  'Gym & Fitness',
  'Law Firm',
  'Dropshipping Brand',
  'Tiffin Service',
  'Drone Services'
];

const PIPELINE_STEPS = [
  { id: '01', title: 'Business Idea', icon: Sparkles, desc: 'Concept & Validation' },
  { id: '02', title: 'Strategy', icon: Compass, desc: 'Market Positioning' },
  { id: '03', title: 'Design', icon: Palette, desc: 'UI/UX & Branding' },
  { id: '04', title: 'Development', icon: Code2, desc: 'Web & Mobile Apps' },
  { id: '05', title: 'AI & Automation', icon: Bot, desc: 'Autonomous Agents' },
  { id: '06', title: 'Marketing', icon: TrendingUp, desc: 'SEO & Ads Funnels' },
  { id: '07', title: 'Deployment', icon: Rocket, desc: 'Global Cloud Edge' },
  { id: '08', title: 'Growth', icon: Zap, desc: 'Conversion Scaling' },
];

export const Hero: React.FC<HeroProps> = ({
  onSelectNiche,
  onOpenQuote,
  onExploreSolutions
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BusinessNiche[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [activePipelineStep, setActivePipelineStep] = useState(3);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Rotate search bar placeholder every 2.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_EXAMPLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Handle outside clicks to close autocomplete
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/10 bg-grid-pattern">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-600/15 via-blue-600/10 to-indigo-600/15 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-cyan-500/30 text-xs font-medium text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-500/10 hover:border-cyan-400/50 transition-colors">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Built in India • Delivered Worldwide • 20 Categories • 320+ Niches</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
   <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
  We Build Digital Businesses That Are{" "}
  <BlackHoleText text="Ready for the World." />
</h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Websites, apps, AI, branding, marketing and automation — everything your business needs to launch, grow and scale globally.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuote()}
              className="px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-2 transform active:scale-95"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreSolutions}
              className="px-7 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <span>Explore Business Solutions</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* SECTION 5: HERO BUSINESS SEARCH (Futuristic Search Bar) */}
        <div className="mt-14 max-w-3xl mx-auto" ref={searchContainerRef}>
          <div className="text-center mb-3">
            <label className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>What type of business do you run?</span>
            </label>
          </div>

          <div className="relative">
            <div className="relative flex items-center bg-[#0d121f] border-2 border-cyan-500/30 hover:border-cyan-500/60 focus-within:border-cyan-400 rounded-2xl shadow-2xl shadow-cyan-500/10 transition-all p-2">
              <div className="pl-3 pr-2 text-cyan-400">
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (searchQuery.trim().length > 0) setShowDropdown(true);
                }}
                placeholder={`e.g. ${ROTATING_EXAMPLES[placeholderIndex]}...`}
                className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base px-2 py-2.5 focus:outline-none"
              />

              {searchQuery && (
                <button 
                  onClick={() => { setSearchQuery(''); setShowDropdown(false); }}
                  className="px-2 text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}

              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    const matched = searchNiches(searchQuery);
                    if (matched.length > 0) {
                      handleSelectNicheItem(matched[0]);
                    }
                  } else {
                    onExploreSolutions();
                  }
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0"
              >
                <span>Search</span>
              </button>
            </div>

            {/* Instant Autocomplete Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0c101c] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2 border-b border-white/5 bg-white/5 flex items-center justify-between text-[11px] text-slate-400 px-3">
                  <span>Recommended Niches ({searchResults.length})</span>
                  <span>Select to see tailored solutions</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                  {searchResults.map((niche) => (
                    <button
                      key={niche.id}
                      onClick={() => handleSelectNicheItem(niche)}
                      className="w-full text-left p-3.5 hover:bg-cyan-500/10 transition-colors flex items-center justify-between group focus:outline-none"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {niche.name}
                          </span>
                          <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            {niche.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {niche.tagline}
                        </p>
                      </div>
                      <span className="text-xs text-cyan-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium shrink-0 ml-3">
                        View Solutions
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Popular Niche Tags */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="text-slate-500">Popular:</span>
            {['Dental Clinic', 'Restaurant', 'Real Estate', 'Gym & Fitness', 'Law Firm', 'Contractor'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  const match = searchNiches(tag);
                  if (match.length > 0) handleSelectNicheItem(match[0]);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 4: INTERACTIVE ANIMATED PIPELINE VISUAL */}
        {/* Business Idea ↓ Strategy ↓ Design ↓ Development ↓ AI & Automation ↓ Marketing ↓ Deployment ↓ Growth */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/10">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              The Full End-to-End Digital Transformation Lifecycle
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {PIPELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activePipelineStep === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => setActivePipelineStep(idx)}
                  className={`group cursor-pointer relative p-3 rounded-xl border transition-all duration-200 text-center ${
                    isActive
                      ? 'bg-gradient-to-b from-cyan-500/20 to-blue-600/10 border-cyan-400/50 shadow-lg shadow-cyan-500/10 scale-105'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isActive ? 'bg-cyan-500 text-black' : 'bg-white/10 text-cyan-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <span className="block text-[10px] font-mono text-cyan-400 font-semibold mb-0.5">
                    {step.id}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Pipeline Step Context Banner */}
          <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-slate-300">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold font-mono">
                {PIPELINE_STEPS[activePipelineStep].id}
              </div>
              <div>
                <span className="font-semibold text-white mr-1.5">
                  Phase {PIPELINE_STEPS[activePipelineStep].id}: {PIPELINE_STEPS[activePipelineStep].title}
                </span>
                <span className="text-slate-400 hidden md:inline">
                  — We execute every step with precision so you never need five different vendors.
                </span>
              </div>
            </div>
            <button
              onClick={() => onOpenQuote()}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 shrink-0"
            >
              <span>Build This Into My Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
