import React from 'react';
import { 
  Sparkles, 
  Search, 
  Compass, 
  Palette, 
  Code2, 
  Bot, 
  CheckCircle2, 
  Rocket, 
  TrendingUp, 
  ShieldCheck,
  Clock
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Business Audit',
    duration: 'Days 1–2',
    icon: Search,
    description: 'We analyze your target market, competitor weaknesses, customer pain points, and current digital bottlenecks.',
    deliverable: 'Digital Blueprint & Architecture Spec'
  },
  {
    step: '02',
    title: 'Strategy & Conversion Wireframes',
    duration: 'Days 3–4',
    icon: Compass,
    description: 'Information architecture and UX wireframes designed specifically around high-intent conversion pathways.',
    deliverable: 'Clickable Prototype & User Flow'
  },
  {
    step: '03',
    title: 'High-Fidelity UI/UX & Brand Design',
    duration: 'Days 5–8',
    icon: Palette,
    description: 'Bespoke design system with custom typography, responsive breakpoints, high-resolution visuals, and micro-interactions.',
    deliverable: 'Figma Design System & Style Guide'
  },
  {
    step: '04',
    title: 'Full-Stack Engineering & APIs',
    duration: 'Days 9–16',
    icon: Code2,
    description: 'Clean, modular TypeScript code with React/Next.js frontend, fast Express/Node.js backend, and database structures.',
    deliverable: 'Sub-Second Web & Mobile Applications'
  },
  {
    step: '05',
    title: 'AI & Operational Automation',
    duration: 'Days 17–19',
    icon: Bot,
    description: 'Integration of 24/7 WhatsApp AI customer bots, payment webhooks, CRM synchronization, and automated calendar booking.',
    deliverable: 'Autonomous Workflow Automations'
  },
  {
    step: '06',
    title: 'Multi-Device QA & Security Audit',
    duration: 'Days 20–21',
    icon: ShieldCheck,
    description: 'Rigorous cross-browser testing on mobile, tablet, and desktop. SSL encryption checks, accessibility, and speed benchmarks.',
    deliverable: '100% Mobile & Core Web Vitals Pass'
  },
  {
    step: '07',
    title: 'Edge Cloud Deployment & DNS',
    duration: 'Day 22',
    icon: Rocket,
    description: 'Production deployment to Cloudflare CDN, AWS, or Google Cloud. DNS routing, custom domain SSL, and automated backups.',
    deliverable: 'Live Global Production System'
  },
  {
    step: '08',
    title: 'SEO Indexing & Ongoing Growth',
    duration: 'Ongoing',
    icon: TrendingUp,
    description: 'Submission to Google Search Console, Google Business Profile ranking, performance monitoring, and rapid feature updates.',
    deliverable: 'Continuous Inbound Patient/Client Leads'
  }
];

export const ProcessTimeline: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 border-b border-white/10 relative bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Predictable, Transparent Delivery</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Our 8-Step Engineering & Delivery Process
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            From initial business audit to production cloud launch, every milestone is structured with zero guesswork.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative p-6 rounded-2xl bg-[#0c101c] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                {/* Step number badge & duration */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono font-bold text-cyan-400">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                      {step.duration}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Milestone Deliverable */}
                <div className="pt-3 border-t border-white/5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Deliverable:
                  </span>
                  <div className="text-xs font-medium text-cyan-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{step.deliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
