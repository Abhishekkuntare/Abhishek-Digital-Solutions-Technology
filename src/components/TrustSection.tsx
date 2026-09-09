import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Code2, 
  Bot, 
  TrendingUp, 
  Server, 
  Key, 
  MessageSquare, 
  HeartHandshake 
} from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: Layers,
    title: 'End-to-End Delivery',
    desc: 'From initial domain purchase and brand guidelines to cloud deployment and marketing funnels, we handle every layer.'
  },
  {
    icon: Code2,
    title: 'Clean Hand-Crafted Code',
    desc: 'Zero reliance on sluggish template drag-and-drop themes. Clean TypeScript architecture for sub-second speeds.'
  },
  {
    icon: Bot,
    title: 'Practical AI Capabilities',
    desc: 'Not superficial gimmicks. We deploy real 24/7 WhatsApp AI customer bots, smart scheduling, and lead triage.'
  },
  {
    icon: TrendingUp,
    title: 'Engineered for Conversion',
    desc: 'Every button placement, headline, and checkout step is calibrated to turn casual visitors into paying customers.'
  },
  {
    icon: Server,
    title: 'Scalable Edge Cloud',
    desc: 'Built on AWS and Cloudflare Edge networks that handle millions of requests without slowdown or crashes.'
  },
  {
    icon: Key,
    title: '100% Code & Asset Ownership',
    desc: 'You own all source code, Figma design files, domain credentials, and database rights with zero vendor lock-in.'
  },
  {
    icon: MessageSquare,
    title: 'Direct WhatsApp Access',
    desc: 'No endless ticketing queues or non-technical account managers. Direct communication with Abhishek throughout.'
  },
  {
    icon: HeartHandshake,
    title: 'Ongoing SLA Maintenance',
    desc: 'Continuous post-launch support covering automated daily backups, security patching, and Core Web Vitals checks.'
  }
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 border-b border-white/10 relative bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Uncompromising Craftsmanship</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Why Forward-Thinking Businesses Choose Abhishek
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            We operate as an agile, dedicated digital partner rather than a detached agency. Here is our commitment to every client.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0c101c] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-md"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
