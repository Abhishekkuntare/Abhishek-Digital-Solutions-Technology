import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  ExternalLink, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  X,
  TrendingUp,
  Tag
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { PortfolioProject } from '../types';

interface PortfolioSectionProps {
  onOpenQuote: (projectName?: string) => void;
}

const FILTER_TAGS = ['All', 'Websites', 'Apps', 'AI', 'Branding', 'E-commerce', 'SaaS'];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenQuote }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (selectedTag === 'All') return true;
    return p.servicesDelivered.includes(selectedTag);
  });

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-24 lg:py-28 border-b border-white/10 relative bg-[#090b10] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-14 px-1">
          <div className="inline-flex max-w-full items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] sm:text-xs font-semibold text-cyan-400 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Proven Digital Architectures</span>
          </div>
          <h2 className="font-display text-2xl leading-tight sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Featured Projects & Case Studies
          </h2>
          <p className="mt-3 text-xs leading-relaxed sm:text-base text-slate-300">
            Explore realistic concept projects and systems engineered to solve real commercial problems across diverse industries.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto overscroll-x-contain pb-3 mb-8 sm:mb-12 scrollbar-none snap-x snap-mandatory px-1 -mx-1">
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`shrink-0 snap-start px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap touch-manipulation ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group min-w-0 rounded-2xl bg-[#0c101c] border border-white/10 hover:border-cyan-500/40 overflow-hidden transition-all duration-300 cursor-pointer shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between active:scale-[0.995] touch-manipulation"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c101c] via-transparent to-black/30" />

                {/* Concept project badge */}
                {project.isConcept && (
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                      Concept Architecture
                    </span>
                  </div>
                )}

                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/10">
                    {project.industry}
                  </span>
                </div>

                {/* Metric pill in image */}
                {project.results[0] && (
                  <div className="absolute bottom-4 left-4 bg-[#0a0d17]/90 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-bold text-white">
                      {project.results[0].metric}
                    </span>
                    <span className="text-[10px] text-slate-300">
                      {project.results[0].label}
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 break-words">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 break-words">
                    {project.tagline}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col xs:flex-row xs:items-center gap-3 xs:justify-between min-w-0">
                  <span className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1.5">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 break-words sm:text-right">
                    {project.servicesDelivered.join(' • ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setActiveProject(null)}>
          <div 
            className="relative w-full max-w-3xl min-h-full sm:min-h-0 sm:max-h-[92vh] bg-[#0d1220] border-0 sm:border border-white/15 rounded-none sm:rounded-2xl shadow-2xl overflow-hidden my-0 sm:my-8 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/10] sm:aspect-[16/8] w-full shrink-0 overflow-hidden bg-slate-900">
              <img
                src={activeProject.coverImage}
                alt={activeProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1220] via-transparent to-black/40" />

              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 text-white bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full transition-colors touch-manipulation"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 min-w-0">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 block">
                  {activeProject.industry} • Concept Project
                </span>
                <h2 className="font-display text-xl sm:text-3xl leading-tight font-extrabold text-white break-words">
                  {activeProject.title}
                </h2>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 flex-1 min-h-0 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
              
              {/* Overview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                  System Overview
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeProject.overview}
                </p>
              </div>

              {/* Metrics Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
                  Measurable Commercial Results
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.results.map((res, idx) => (
                    <div key={idx} className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-center min-w-0">
                      <div className="text-xl sm:text-2xl font-bold font-display text-white text-emerald-400 break-words">
                        {res.metric}
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
                  Key Technical & Functional Highlights
                </h4>
                <div className="space-y-2">
                  {activeProject.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 p-2.5 rounded-lg bg-white/5 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-slate-300 max-w-full break-all">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-[#0a0d16] border-t border-white/10 flex flex-col-reverse xs:flex-row xs:items-center gap-3 xs:justify-between shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                onClick={() => setActiveProject(null)}
                className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-400 hover:text-white text-center touch-manipulation"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = activeProject.title;
                  setActiveProject(null);
                  onOpenQuote(`Similar to ${title}`);
                }}
                className="w-full sm:w-auto justify-center px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-md flex items-center gap-2 touch-manipulation"
              >
                <span>Build Similar Solution</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
