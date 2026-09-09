import React from 'react';
import { 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  MapPin 
} from 'lucide-react';

const REGIONS = [
  { name: 'India (Headquarters)', city: 'Amravati, Maharashtra', tz: 'IST (UTC+5:30)', status: 'HQ & Studio' },
  { name: 'North America', city: 'United States & Canada', tz: 'EST, CST, PST', status: 'Active Accounts' },
  { name: 'United Kingdom & Europe', city: 'London, Berlin, Paris', tz: 'GMT & CET', status: 'Active Accounts' },
  { name: 'Middle East', city: 'Dubai, UAE & Saudi Arabia', tz: 'GST (UTC+4)', status: 'Active Accounts' },
  { name: 'Asia-Pacific', city: 'Singapore & Australia', tz: 'SGT & AEST', status: 'Active Accounts' }
];

export const InternationalMap: React.FC = () => {
  return (
    <section className="py-20 md:py-28 border-b border-white/10 relative bg-[#090b10] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global Delivery Excellence</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Built in India. Delivered Worldwide.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Headquartered in Amravati, Maharashtra, India. Delivering enterprise-grade digital systems to ambitious businesses across 5 continents.
          </p>
        </div>

        {/* Global Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Timezone Alignment */}
          <div className="p-6 rounded-2xl bg-[#0c101c] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Timezone Synchronization
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We overlap directly with your operational workday — whether you are in New York, London, Dubai, Sydney, or Mumbai. Scheduled updates and direct communication without time-lag delays.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 text-[11px] text-cyan-400 font-semibold">
              Daily async sprint video recaps & real-time WhatsApp access
            </div>
          </div>

          {/* Card 2: Multi-Currency & Invoicing */}
          <div className="p-6 rounded-2xl bg-[#0c101c] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Multi-Currency & Tax Compliant
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Frictionless cross-border invoicing in USD, INR, EUR, GBP, AED, CAD, and AUD. Pay via secure international bank wire, Stripe, credit cards, or UPI with complete formal receipts.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 text-[11px] text-cyan-400 font-semibold">
              Transparent milestone billing tied to deliverables
            </div>
          </div>

          {/* Card 3: Enterprise Intellectual Property & NDA */}
          <div className="p-6 rounded-2xl bg-[#0c101c] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                100% IP & Code Ownership
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Standard international mutual Non-Disclosure Agreements (NDAs). Upon project completion, you retain 100% full ownership of your source code, design files, domain, and database.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 text-[11px] text-cyan-400 font-semibold">
              Zero vendor lock-in. Clean GitHub code transfer.
            </div>
          </div>

        </div>

        {/* Global Hub Map Nodes List */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1220] border border-white/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h4 className="font-display text-lg font-bold text-white">
                Active Client Coverage Hubs
              </h4>
              <p className="text-xs text-slate-400">
                Coordinated from Amravati, Maharashtra, India
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for New Q3/Q4 Project Onboarding</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {REGIONS.map((reg, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{reg.name}</span>
                </div>
                <div className="text-[11px] text-slate-300 mb-1">{reg.city}</div>
                <div className="text-[10px] font-mono text-cyan-300">{reg.tz}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
