import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Clock, 
  Loader2, 
  Phone,
  Layers,
  Lightbulb,
  Mail
} from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/helpers';

interface AIConsultantProps {
  onOpenQuoteWithDetails: (planDetails: string) => void;
}

interface AIPlanResult {
  nicheSummary: string;
  recommendedWebsite: string;
  recommendedMobile: string;
  recommendedAI: string;
  recommendedMarketing: string;
  quickWin: string;
  recommendedServices: string[];
  estimatedTimeline: string;
}

export const AIConsultant: React.FC<AIConsultantProps> = ({ onOpenQuoteWithDetails }) => {
  const [businessType, setBusinessType] = useState('');
  const [description, setDescription] = useState('');
  const [targetGoals, setTargetGoals] = useState('Get More Customers & Automate Booking');
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<AIPlanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const samplePresets = [
    { label: 'Dental Clinic', type: 'Dental Clinic', desc: 'Cosmetic dentistry and family practice wanting more private patient appointments.' },
    { label: 'Restaurant & Bar', type: 'Artisan Restaurant', desc: 'Fine dining venue tired of 28% delivery commissions, wanting direct table reservations.' },
    { label: 'Real Estate Agency', type: 'Real Estate Brokerage', desc: 'Selling luxury residential villas and needing qualified high-ticket buyer leads.' },
    { label: 'Gym & Fitness', type: 'Gym & Crossfit Studio', desc: 'Seeking more trial pass claims and automated membership retention.' },
    { label: 'Law Firm', type: 'Corporate Law Firm', desc: 'Needs confidential online client triage and high-authority Google search rankings.' }
  ];

  const handleGenerate = async (typeToUse = businessType, descToUse = description) => {
    if (!typeToUse.trim()) {
      setErrorMsg('Please enter your business type or select a sample preset.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType: typeToUse,
          description: descToUse,
          targetGoals
        })
      });

      const data = await res.json();
      if (data.success && data.plan) {
        setGeneratedPlan(data.plan);
      } else {
        setErrorMsg(data.error || 'Could not generate blueprint. Please try again.');
      }
    } catch (err) {
      console.error('AI Consultant fetch error:', err);
      setErrorMsg('Network issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPreset = (p: typeof samplePresets[0]) => {
    setBusinessType(p.type);
    setDescription(p.desc);
    handleGenerate(p.type, p.desc);
  };

  return (
    <section id="ai-consultant" className="py-20 md:py-28 border-b border-white/10 relative bg-[#0a0d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-3">
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive AI Digital Blueprint Engine</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            What Can Modern AI & Tech Do For Your Business?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Tell us about your business. Our intelligent consultant analyzes your niche and generates an actionable digital growth roadmap in seconds.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
         {/* Left Column: Form Controls */}
<div
  className="
    lg:col-span-5
    p-4 sm:p-6 lg:p-8
    rounded-2xl
    bg-[#0e1322]
    border border-white/10
    shadow-xl
    w-full
    min-w-0
  "
>
  {/* Header */}
  <div className="mb-5 sm:mb-6">
    <h3
      className="
        font-display
        text-base sm:text-lg
        font-bold
        text-white
        flex items-center gap-2
      "
    >
      <span
        className="
          flex items-center justify-center
          w-8 h-8
          rounded-lg
          bg-cyan-500/10
          border border-cyan-500/20
          shrink-0
        "
      >
        <Sparkles className="w-4 h-4 text-cyan-400" />
      </span>

      <span>Describe Your Business</span>
    </h3>

    <p className="mt-1.5 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
      Tell us about your business and we'll create a tailored digital growth roadmap.
    </p>
  </div>

  {/* Presets */}
  <div className="mb-5 sm:mb-6">
    <div className="flex items-center justify-between gap-3 mb-2.5">
      <span
        className="
          text-[10px] sm:text-[11px]
          font-semibold
          text-slate-400
          uppercase
          tracking-wider
        "
      >
        Quick 1-Click Presets
      </span>

      <span className="text-[10px] text-slate-500 sm:hidden">
        Swipe →
      </span>
    </div>

    {/* Mobile horizontal scroll / Desktop wrap */}
    <div
      className="
        flex
        sm:flex-wrap
        gap-2
        overflow-x-auto
        sm:overflow-visible
        pb-1
        scrollbar-none
        snap-x
        snap-mandatory
      "
    >
      {samplePresets.map((p) => (
        <button
          key={p.label}
          type="button"
          onClick={() => handleApplyPreset(p)}
          className="
            shrink-0
            snap-start

            min-h-[38px]
            sm:min-h-0

            px-3
            py-2
            sm:px-2.5
            sm:py-1.5

            rounded-xl
            sm:rounded-lg

            bg-white/[0.04]
            hover:bg-cyan-500/15
            active:bg-cyan-500/20

            border
            border-white/10
            hover:border-cyan-500/30

            text-[11px]
            sm:text-xs

            text-slate-300
            hover:text-cyan-300
            active:text-cyan-300

            font-medium
            transition-all
            whitespace-nowrap

            touch-manipulation
          "
        >
          {p.label}
        </button>
      ))}
    </div>
  </div>

  {/* Form */}
  <div className="space-y-4 sm:space-y-5">

    {/* Business Type */}
    <div>
      <label
        className="
          block
          text-[11px] sm:text-xs
          font-semibold
          text-slate-300
          mb-1.5
        "
      >
        Business Type / Niche
        <span className="text-cyan-400 ml-1">*</span>
      </label>

      <input
        type="text"
        value={businessType}
        onChange={(e) => setBusinessType(e.target.value)}
        placeholder="e.g. Dental Clinic, Hotel, Auto Detailing..."
        className="
          w-full
          min-w-0

          px-3.5
          sm:px-3.5

          py-3
          sm:py-2.5

          bg-white/[0.04]
          hover:bg-white/[0.06]

          border
          border-white/10
          focus:border-cyan-500/70
          focus:ring-2
          focus:ring-cyan-500/10

          rounded-xl

          text-base
          sm:text-sm

          text-white
          placeholder:text-slate-500

          focus:outline-none

          transition-all

          touch-manipulation
        "
      />
    </div>

    {/* Current Situation */}
    <div>
      <label
        className="
          block
          text-[11px] sm:text-xs
          font-semibold
          text-slate-300
          mb-1.5
        "
      >
        Current Situation / Operational Challenge
      </label>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        placeholder="Tell us what's not working today and what you'd like to improve..."
        className="
          w-full
          min-w-0

          px-3.5
          py-3

          bg-white/[0.04]
          hover:bg-white/[0.06]

          border
          border-white/10
          focus:border-cyan-500/70
          focus:ring-2
          focus:ring-cyan-500/10

          rounded-xl

          text-base
          sm:text-sm

          leading-relaxed
          text-white
          placeholder:text-slate-500

          focus:outline-none

          resize-none
          transition-all

          touch-manipulation
        "
      />

      <div className="mt-1.5 flex justify-end">
        <span className="text-[10px] text-slate-600">
          Optional
        </span>
      </div>
    </div>

    {/* Primary Goal */}
    <div>
      <label
        className="
          block
          text-[11px] sm:text-xs
          font-semibold
          text-slate-300
          mb-1.5
        "
      >
        Primary Business Goal
      </label>

      <div className="relative">
        <select
          value={targetGoals}
          onChange={(e) => setTargetGoals(e.target.value)}
          className="
            appearance-none

            w-full
            min-w-0

            px-3.5
            py-3
            sm:py-2.5
            pr-10

            bg-[#090b10]
            hover:bg-[#0c1018]

            border
            border-white/10
            focus:border-cyan-500/70
            focus:ring-2
            focus:ring-cyan-500/10

            rounded-xl

            text-base
            sm:text-sm

            text-slate-200

            focus:outline-none

            transition-all

            cursor-pointer
            touch-manipulation
          "
        >
          <option value="Get More Customers & Inquiries">
            Get More Customers & Inquiries
          </option>

          <option value="Automate Customer Support on WhatsApp">
            Automate Customer Support on WhatsApp
          </option>

          <option value="Direct Online Ordering & Payments">
            Direct Online Ordering & Payments
          </option>

          <option value="Rank #1 on Google Local Maps">
            Rank #1 on Google Local Maps
          </option>

          <option value="Modernize Outdated Brand & Platform">
            Modernize Outdated Brand & Platform
          </option>
        </select>

        {/* Custom dropdown arrow */}
        <div
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>

    {/* Error */}
    {errorMsg && (
      <div
        className="
          flex
          items-start
          gap-2

          p-3

          rounded-xl

          bg-rose-500/10
          border border-rose-500/20

          text-rose-300
          text-[11px]
          sm:text-xs

          leading-relaxed
        "
      >
        <span className="text-rose-400 mt-0.5 shrink-0">
          ⚠
        </span>

        <span>{errorMsg}</span>
      </div>
    )}

    {/* Generate Button */}
    <button
      type="button"
      onClick={() => handleGenerate()}
      disabled={loading}
      className="
        w-full

        min-h-[48px]
        sm:min-h-[46px]

        py-3
        px-4

        rounded-xl

        bg-gradient-to-r
        from-purple-600
        via-indigo-600
        to-blue-600

        hover:from-purple-500
        hover:via-indigo-500
        hover:to-blue-500

        active:scale-[0.99]

        text-white

        font-semibold
        text-xs
        sm:text-sm

        shadow-lg
        shadow-purple-500/20

        transition-all

        flex
        items-center
        justify-center
        gap-2

        text-center

        cursor-pointer
        touch-manipulation

        disabled:opacity-60
        disabled:cursor-not-allowed
      "
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 shrink-0 animate-spin" />

          <span className="leading-tight">
            <span className="hidden sm:inline">
              Analyzing Niche & Formulating Roadmap...
            </span>

            <span className="sm:hidden">
              Creating Your Roadmap...
            </span>
          </span>
        </>
      ) : (
        <>
          <Bot className="w-4 h-4 shrink-0" />

          <span className="hidden sm:inline">
            Generate Tailored AI Growth Roadmap
          </span>

          <span className="sm:hidden">
            Generate My Growth Roadmap
          </span>
        </>
      )}
    </button>

    {/* Mobile trust line */}
    <div className="sm:hidden text-center pt-1">
      <p className="text-[10px] text-slate-500 leading-relaxed">
        AI-powered roadmap • No commitment required
      </p>
    </div>

  </div>
</div>
          {/* Right Column: AI Output Blueprint */}
          <div className="lg:col-span-7">
            {generatedPlan ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0e1322] border-2 border-purple-500/30 shadow-2xl space-y-6 animate-in fade-in duration-300">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                      Targeted Analysis Completed
                    </span>
                    <h4 className="font-display text-xl font-extrabold text-white">
                      Digital Growth Blueprint: {businessType}
                    </h4>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium self-start">
                    Estimated Delivery: {generatedPlan.estimatedTimeline}
                  </span>
                </div>

                {/* Executive Assessment */}
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
                  <span className="text-xs font-bold text-purple-300 block mb-1">
                    Executive Assessment:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {generatedPlan.nicheSummary}
                  </p>
                </div>

                {/* Recommendations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 mb-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Recommended Web Platform</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {generatedPlan.recommendedWebsite}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5 mb-1.5">
                      <Bot className="w-3.5 h-3.5" />
                      <span>AI Automations & Agents</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {generatedPlan.recommendedAI}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Mobile Solutions & PWA</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {generatedPlan.recommendedMobile}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Local SEO & Client Acquisition</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {generatedPlan.recommendedMarketing}
                    </p>
                  </div>
                </div>

                {/* Quick Win Box */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-emerald-400 block mb-0.5">
                      Immediate Quick Win:
                    </span>
                    <p className="text-xs text-slate-300">
                      {generatedPlan.quickWin}
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <a
                      href={generateWhatsAppUrl(
                        '+919156075536',
                        `Hi Abhishek, I used your AI Consultant for my ${businessType}. Here is what was recommended: ${generatedPlan.quickWin}. Let's discuss building this.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 text-xs font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`mailto:abhishekkuntare02@gmail.com?subject=${encodeURIComponent(`AI Roadmap for ${businessType}`)}&body=${encodeURIComponent(`Hi Abhishek,\n\nI generated the following AI Digital Roadmap for my business (${businessType}):\n\n- Opportunity Summary: ${generatedPlan.nicheSummary}\n- Recommended Web/App: ${generatedPlan.recommendedWebsite}\n- AI Workflows: ${generatedPlan.recommendedAI}\n- Mobile/PWA: ${generatedPlan.recommendedMobile}\n- SEO & Marketing: ${generatedPlan.recommendedMarketing}\n- Quick Win: ${generatedPlan.quickWin}\n- Key Services: ${generatedPlan.recommendedServices.join(', ')}\n\nPlease review and let me know the recommended starting steps!`)}`}
                      className="px-3.5 py-2 text-xs font-medium text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      title="Send roadmap copy directly to abhishekkuntare02@gmail.com"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Email to Abhishek</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      onOpenQuoteWithDetails(
                        `AI Blueprint for ${businessType}: Services: ${generatedPlan.recommendedServices.join(', ')}`
                      );
                    }}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Load Into Project Configurator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ) : (
              /* Default Empty State */
              <div className="p-8 sm:p-12 rounded-2xl bg-[#0c101c] border border-white/10 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                  <Bot className="w-8 h-8" />
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-2">
                  Ready to Build Your AI Blueprint
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-6">
                  Select a business type on the left or click one of the quick presets to test our AI architecture engine in real time.
                </p>
                <button
                  onClick={() => handleApplyPreset(samplePresets[0])}
                  className="px-4 py-2 text-xs font-semibold text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl transition-colors"
                >
                  Try With "Dental Clinic" Example
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
