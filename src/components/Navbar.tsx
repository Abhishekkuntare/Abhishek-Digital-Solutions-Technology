import React, { useState, useRef, useEffect } from 'react';
import { 
  Globe, 
  Search, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Phone, 
  Layers, 
  Sparkles, 
  ShieldAlert,
  ArrowRight,
  Mail,
  ChevronDown,
  Compass,
  Gauge,
  Workflow
} from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/helpers';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onOpenQuote: (initialNiche?: string) => void;
  currentCurrency: string;
  onCurrencyChange: (curr: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenAdmin,
  onOpenQuote,
  currentCurrency,
  onCurrencyChange,
  isDark,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavLinks = [
    { label: 'Solutions', href: '#niches' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'AI Blueprint', href: '#ai-consultant' },
    { label: 'Contact', href: '#contact' },
  ];

  const moreNavLinks = [
    { label: 'Transformations', href: '#transformations', desc: 'Real before/after case studies', icon: Workflow },
    { label: 'Digital Scorecard', href: '#digital-score', desc: 'Free 2-min business audit', icon: Gauge },
    { label: '8-Step Process', href: '#process', desc: 'Idea-to-scale delivery pipeline', icon: Compass },
  ];

  const allMobileLinks = [
    { label: 'Solutions (120+ Niches)', href: '#niches' },
    { label: 'Services & Stacks', href: '#services' },
    { label: 'Portfolio Work', href: '#portfolio' },
    { label: 'AI Digital Blueprint', href: '#ai-consultant' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Digital Scorecard', href: '#digital-score' },
    { label: '8-Step Process', href: '#process' },
    { label: 'Direct Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#090b10]/90 border-b border-white/10 transition-colors w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow shrink-0">
              <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                  Abhishek
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 whitespace-nowrap">
                  Studio
                </span>
              </div>
              <span className="text-[11px] text-slate-400 tracking-normal hidden md:block whitespace-nowrap">
                Digital Solutions & Technology
              </span>
            </div>
          </a>

          {/* Streamlined Desktop Navigation Links (Non-Overflowing) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0">
            {primaryNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}

            {/* "More" Dropdown Menu */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="flex items-center gap-1 px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors whitespace-nowrap focus:outline-none"
                aria-expanded={moreDropdownOpen}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-[#0d1220] border border-white/10 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl">
                  {moreNavLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMoreDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block group-hover:text-cyan-300">
                            {item.label}
                          </span>
                          <span className="text-[11px] text-slate-400 block">
                            {item.desc}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all focus:outline-none shrink-0"
              title="Search 122+ Profitable Niches (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="hidden xl:inline whitespace-nowrap">Search Niches</span>
              <kbd className="hidden 2xl:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-white/10 rounded text-slate-400 border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Currency Selector */}
            <div className="relative hidden sm:block shrink-0">
              <select
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="appearance-none bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs rounded-lg pl-2 pr-5 py-1.5 cursor-pointer focus:outline-none focus:border-cyan-500 transition-colors"
                title="Change display currency"
              >
                <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
                <option value="INR" className="bg-slate-900 text-white">INR (₹)</option>
                <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
                <option value="GBP" className="bg-slate-900 text-white">GBP (£)</option>
                <option value="AED" className="bg-slate-900 text-white">AED</option>
                <option value="CAD" className="bg-slate-900 text-white">CAD ($)</option>
                <option value="AUD" className="bg-slate-900 text-white">AUD ($)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-slate-400 text-[9px]">
                ▼
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg border border-white/10 transition-colors focus:outline-none shrink-0"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />}
            </button>

            {/* Admin CMS Access Trigger */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex p-1.5 sm:p-2 text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-lg border border-white/10 transition-colors focus:outline-none shrink-0"
              title="Admin Portal (Leads CRM & CMS)"
            >
              <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenQuote()}
              className="hidden sm:flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all transform active:scale-95 shrink-0 whitespace-nowrap"
            >
              <span>Start Project</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg focus:outline-none shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
  <div className="lg:hidden bg-[#080c15] border-b border-white/10 animate-in fade-in slide-in-from-top-3 duration-200">
    <div className="px-4 pt-4 pb-6 space-y-4">

      {/* ───────────────── Navigation ───────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-2.5 px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Navigation
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {allMobileLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="
                group relative
                flex items-center justify-between
                min-h-[46px]
                px-3.5 py-2.5
                rounded-xl
                bg-white/[0.035]
                border border-white/[0.07]
                text-xs sm:text-sm
                font-medium
                text-slate-300
                hover:text-white
                hover:bg-cyan-500/[0.07]
                hover:border-cyan-500/20
                active:scale-[0.98]
                transition-all duration-200
              "
            >
              <span className="truncate pr-2">
                {link.label}
              </span>

              <span className="
                w-5 h-5
                rounded-md
                bg-white/5
                border border-white/5
                flex items-center justify-center
                text-slate-500
                group-hover:text-cyan-400
                group-hover:bg-cyan-500/10
                transition-all
                shrink-0
              ">
                →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ───────────────── Settings ───────────────── */}
      <div className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-3.5">
        <div className="flex items-center justify-between gap-3">

          {/* Currency */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="
              w-9 h-9
              rounded-xl
              bg-cyan-500/10
              border border-cyan-500/15
              flex items-center justify-center
              shrink-0
            ">
              <span className="text-sm text-cyan-400 font-bold">
                $
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Currency
              </p>

              <select
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="
                  mt-0.5
                  max-w-[110px]
                  bg-transparent
                  text-sm
                  font-semibold
                  text-white
                  focus:outline-none
                  cursor-pointer
                "
              >
                <option value="USD" className="bg-[#0d1220]">
                  USD ($)
                </option>
                <option value="INR" className="bg-[#0d1220]">
                  INR (₹)
                </option>
                <option value="EUR" className="bg-[#0d1220]">
                  EUR (€)
                </option>
                <option value="GBP" className="bg-[#0d1220]">
                  GBP (£)
                </option>
                <option value="AED" className="bg-[#0d1220]">
                  AED
                </option>
                <option value="CAD" className="bg-[#0d1220]">
                  CAD
                </option>
                <option value="AUD" className="bg-[#0d1220]">
                  AUD
                </option>
              </select>
            </div>
          </div>

          {/* Admin */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdmin();
            }}
            className="
              shrink-0
              flex items-center gap-2
              px-3 py-2
              rounded-xl
              bg-cyan-500/10
              border border-cyan-500/20
              text-xs font-semibold
              text-cyan-400
              hover:bg-cyan-500/15
              hover:border-cyan-500/30
              active:scale-95
              transition-all
            "
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin CMS</span>
          </button>

        </div>
      </div>

      {/* ───────────────── CTA ───────────────── */}
      <div>
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            onOpenQuote();
          }}
          className="
            group
            relative
            w-full
            min-h-[52px]
            px-4 py-3
            rounded-xl
            overflow-hidden
            bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600
            text-sm
            font-bold
            text-white
            shadow-lg shadow-cyan-500/20
            hover:shadow-cyan-500/30
            hover:brightness-110
            active:scale-[0.98]
            transition-all duration-200
            flex items-center justify-center
            gap-2
          "
        >
          <span className="relative z-10">
            Start Your Project
          </span>

          <span className="
            relative z-10
            w-6 h-6
            rounded-lg
            bg-white/15
            flex items-center justify-center
            text-xs
            group-hover:translate-x-0.5
            transition-transform
          ">
            →
          </span>
        </button>
      </div>

      {/* ───────────────── Contact ───────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-2.5 px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Get in touch
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

          {/* WhatsApp / Phone */}
          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              min-h-[54px]
              px-3.5 py-3
              rounded-xl
              bg-emerald-500/[0.06]
              border border-emerald-500/15
              flex items-center gap-3
              hover:bg-emerald-500/10
              hover:border-emerald-500/25
              active:scale-[0.98]
              transition-all
              mb-6
            "
          >
            <div className="
              w-9 h-9
              rounded-xl
              bg-emerald-500/10
              border border-emerald-500/15
              flex items-center justify-center
              shrink-0
            ">
              <Phone className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                WhatsApp
              </p>
              <p className="text-xs sm:text-sm font-semibold text-emerald-300 truncate">
                +91 9156075536
              </p>
            </div>
          </a>

          {/* Email */}
          {/* <a
            href="mailto:abhishekkuntare02@gmail.com"
            className="
              group
              min-h-[54px]
              px-3.5 py-3
              rounded-xl
              bg-cyan-500/[0.06]
              border border-cyan-500/15
              flex items-center gap-3
              hover:bg-cyan-500/10
              hover:border-cyan-500/25
              active:scale-[0.98]
              transition-all
            "
          >
            <div className="
              w-9 h-9
              rounded-xl
              bg-cyan-500/10
              border border-cyan-500/15
              flex items-center justify-center
              shrink-0
            ">
              <Mail className="w-4 h-4 text-cyan-400" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Email
              </p>
              <p className="text-xs sm:text-sm font-semibold text-cyan-300 truncate">
                abhishekkuntare02@gmail.com
              </p>
            </div>
          </a> */}

        </div>
      </div>

      {/* ───────────────── Footer Hint ───────────────── */}
      <div className="pt-1 flex items-center justify-center">
        <p className="text-[10px] text-slate-600">
          Built for ambitious businesses • Available worldwide
        </p>
      </div>

    </div>
  </div>
)}
    </header>
  );
};
