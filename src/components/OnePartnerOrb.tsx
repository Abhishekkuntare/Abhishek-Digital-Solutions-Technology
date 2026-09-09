import React, { useState } from 'react';
import { 
  Palette, 
  Code2, 
  Bot, 
  TrendingUp, 
  GitBranch, 
  Rocket, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface OnePartnerOrbProps {
  onOpenQuote: () => void;
}

const PARTNER_SERVICES = [
  { id: 'design', label: 'Design', icon: Palette, color: 'from-pink-500 to-rose-600', angle: '0deg', desc: 'UI/UX, Branding, Logo & High-res Creatives' },
  { id: 'dev', label: 'Development', icon: Code2, color: 'from-cyan-500 to-blue-600', angle: '51deg', desc: 'Fast Web, Android, iOS & Tablet Applications' },
  { id: 'ai', label: 'AI', icon: Bot, color: 'from-purple-500 to-indigo-600', angle: '102deg', desc: '24/7 Chatbots, AI Agents & Smart Knowledge Bases' },
  { id: 'marketing', label: 'Marketing', icon: TrendingUp, color: 'from-amber-500 to-orange-600', angle: '154deg', desc: 'SEO, Google Ads, Meta Ads & Conversion Funnels' },
  { id: 'automation', label: 'Automation', icon: GitBranch, color: 'from-emerald-500 to-teal-600', angle: '205deg', desc: 'CRM Integrations, WhatsApp Triggers & Workflows' },
  { id: 'deployment', label: 'Deployment', icon: Rocket, color: 'from-sky-500 to-cyan-600', angle: '257deg', desc: 'AWS, Google Cloud, Edge CDN & DNS Setup' },
  { id: 'maintenance', label: 'Maintenance', icon: ShieldCheck, color: 'from-blue-600 to-indigo-700', angle: '308deg', desc: 'Daily Backups, Security Audits & Technical SLA' }
];

export const OnePartnerOrb: React.FC<OnePartnerOrbProps> = ({ onOpenQuote }) => {
  const [activeService, setActiveService] = useState(PARTNER_SERVICES[1]);

  return (
    <section className="py-20 md:py-28 border-b border-white/10 relative overflow-hidden bg-[#090b10]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-blue-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2 block">
            End-to-End Digital Sovereignty
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            One Partner. Everything Digital.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            You don't need five different agencies. We provide the unified strategy, craft, code, and infrastructure under one accountable roof.
          </p>
        </div>

        {/* Central Connected Orb Visual & Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: The Fragmented Agency Way vs The Abhishek Unified Partner Way */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The Old Fragmented Nightmare */}
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20">
              <div className="flex items-center gap-2 mb-3 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                <span>The Fragmented Agency Headache</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>5 Different Invoices:</strong> Designer, coder, SEO agency, ads freelancer, and hosting vendor all billing separately.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Endless Finger-Pointing:</strong> Marketer blames the developer for slow speed; developer blames designer for bloated assets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Stalled Timelines:</strong> Months spent coordinating handoffs and dealing with communication delays.</span>
                </li>
              </ul>
            </div>

            {/* The Unified One-Partner Way */}
            <div className="p-5 rounded-2xl bg-cyan-950/25 border border-cyan-500/30 shadow-xl shadow-cyan-500/10">
              <div className="flex items-center gap-2 mb-3 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>The Abhishek Digital Studio Advantage</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>Single Accountable Architect:</strong> Zero handoff friction. Design is built for code, and code is engineered for SEO & ads.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>3x Faster Time-to-Market:</strong> Unified architecture deployed in weeks rather than dragging on for half a year.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span><strong>Direct WhatsApp Developer Access:</strong> Direct communication with Abhishek with no junior middle-managers.</span>
                </li>
              </ul>

              <button
                onClick={onOpenQuote}
                className="mt-5 w-full py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Interactive System Orb with Connected Satellite Nodes */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            {/* Satellite Pill Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full mb-8">
              {PARTNER_SERVICES.map((srv) => {
                const Icon = srv.icon;
                const isSelected = activeService.id === srv.id;

                return (
                  <button
                    key={srv.id}
                    onClick={() => setActiveService(srv)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-cyan-500/20 to-blue-600/10 border-cyan-400 shadow-lg shadow-cyan-500/15 scale-102'
                        : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${srv.color} text-white`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] text-cyan-400 font-mono">0{PARTNER_SERVICES.indexOf(srv) + 1}</span>
                    </div>
                    <span className="text-xs font-bold text-white block">
                      {srv.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Central High-Tech Hub Display */}
            <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#111626] to-[#0a0d17] border-2 border-cyan-500/30 shadow-2xl relative">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeService.color} p-0.5 shadow-xl`}>
                  <div className="w-full h-full bg-[#0d1220] rounded-[14px] flex items-center justify-center">
                    <activeService.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
                      Integrated Pillar
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      Seamless Ecosystem
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-white">
                    {activeService.label}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                {activeService.desc}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Synchronized with: <strong>All other 6 pillars</strong></span>
                </div>
                <button
                  onClick={onOpenQuote}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  Configure In Proposal →
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
