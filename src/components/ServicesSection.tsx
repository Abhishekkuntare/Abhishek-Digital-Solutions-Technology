import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Palette, 
  TrendingUp, 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';
import { SERVICES_CATALOG } from '../data/servicesData';
import { ServiceCategory, ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

const PILLAR_ICONS: Record<string, React.ElementType> = {
  websites: Globe,
  'mobile-apps': Smartphone,
  'ai-automation': Bot,
  'design-branding': Palette,
  'growth-marketing': TrendingUp,
  'cloud-infrastructure': Shield,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForQuote
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('websites');

  const activeCategory = SERVICES_CATALOG.find((c) => c.id === activeCategoryId) || SERVICES_CATALOG[0];
  const ActivePillarIcon = PILLAR_ICONS[activeCategory.id] || Globe;

  return (
    <section id="services" className="py-20 md:py-28 border-b border-white/10 relative bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Full-Stack Digital Capabilities</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Digital Service Ecosystem
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            From modern web engineering and native mobile apps to autonomous AI agents and international cloud deployment.
          </p>
        </div>

        {/* Pillar Tabs Bar */}
       {/* Service Category Navigation */}
<div
  className="
    w-full
    mb-10
    px-0
    sm:px-1
  "
>
  <div
    className="
      flex
      items-center
      justify-start
      lg:justify-center
      gap-2
      overflow-x-auto
      lg:overflow-visible
      pb-3
      lg:pb-0
      scrollbar-none
      flex-nowrap
      lg:flex-wrap
    "
  >
    {SERVICES_CATALOG.map((cat) => {
      const Icon = PILLAR_ICONS[cat.id] || Globe;
      const isSelected = activeCategoryId === cat.id;

      return (
        <button
          key={cat.id}
          onClick={() => setActiveCategoryId(cat.id)}
          className={`
            shrink-0
            inline-flex
            items-center
            justify-center
            gap-2
            min-h-[42px]
            px-4
            py-2.5
            rounded-xl
            border
            text-xs
            sm:text-sm
            font-semibold
            whitespace-nowrap
            transition-all
            duration-200
            cursor-pointer
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-cyan-400/60

            ${
              isSelected
                ? `
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  border-cyan-400
                  text-white
                  shadow-lg
                  shadow-cyan-500/20
                `
                : `
                  bg-white/[0.04]
                  border-white/10
                  text-slate-300
                  hover:bg-white/[0.08]
                  hover:border-white/20
                  hover:text-white
                `
            }
          `}
        >
          <Icon
            className={`
              w-4
              h-4
              shrink-0
              ${
                isSelected
                  ? 'text-white'
                  : 'text-cyan-400'
              }
            `}
          />

          <span>{cat.name}</span>
        </button>
      );
    })}
  </div>
</div>

        {/* Active Pillar Overview Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#111728] via-[#0d1220] to-[#090b10] border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ActivePillarIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {activeCategory.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {activeCategory.description}
                </p>
              </div>
            </div>

          <button
  onClick={() => onSelectServiceForQuote(activeCategory.name)}
  className="
    w-full sm:w-auto
    min-h-[44px]
    px-4 sm:px-5
    py-2.5 sm:py-2
    text-xs sm:text-sm
    font-semibold
    text-cyan-300
    bg-cyan-500/10
    hover:bg-cyan-500/20
    active:bg-cyan-500/25
    border border-cyan-500/30
    hover:border-cyan-400/50
    rounded-xl
    transition-all duration-200
    flex items-center justify-center
    text-center
    leading-tight
    whitespace-normal sm:whitespace-nowrap
    break-words
    shrink-0
    cursor-pointer
  "
>
  <span className="sm:hidden">
    Add to Plan
  </span>

  <span className="hidden sm:inline">
    Add {activeCategory.name} to Plan
  </span>
</button>
          </div>
        </div>

        {/* Service Sub-Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeCategory.items.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#0c101c] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-md hover:shadow-cyan-500/10"
            >
              <div>
                {/* Header with Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h4 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-1.5 pt-3 border-t border-white/5 mb-5">
                  <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
                    Deliverables:
                  </span>
                  {item.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectServiceForQuote(item.title)}
                className="w-full py-2.5 text-xs font-semibold rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-slate-300 hover:text-white border border-white/10 hover:border-transparent transition-all flex items-center justify-center gap-1.5"
              >
                <span>Select for Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
