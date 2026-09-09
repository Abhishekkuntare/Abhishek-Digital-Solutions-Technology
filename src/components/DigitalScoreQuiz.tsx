import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface DigitalScoreQuizProps {
  onOpenQuoteWithScore: (score: number, weaknesses: string[]) => void;
}

interface Question {
  id: string;
  title: string;
  desc: string;
  points: number;
}

const AUDIT_QUESTIONS: Question[] = [
  {
    id: 'mobile_speed',
    title: 'Mobile Speed & Clean UX',
    desc: 'Does your website load in under 2 seconds on a 4G/5G smartphone and look modern without zooming?',
    points: 10
  },
  {
    id: 'google_maps',
    title: 'Google Business / Maps Ranking',
    desc: 'Does your business appear in the top 3 Google Maps pack when local customers search for your service?',
    points: 10
  },
  {
    id: 'online_booking',
    title: '24/7 Online Booking or Direct Ordering',
    desc: 'Can clients schedule an appointment or place an order directly on your site without calling you first?',
    points: 10
  },
  {
    id: 'whatsapp_automation',
    title: 'WhatsApp Automation / Chatbot',
    desc: 'Do you have an automated WhatsApp or web assistant answering questions and capturing leads after hours?',
    points: 10
  },
  {
    id: 'reviews_funnel',
    title: 'Automated 5-Star Reviews Funnel',
    desc: 'Do you automatically collect Google reviews from satisfied clients via SMS or WhatsApp after each service?',
    points: 10
  },
  {
    id: 'digital_payments',
    title: 'Instant Online Payment / Invoicing',
    desc: 'Can customers securely pay deposits, invoices, or products online via Stripe, Cards, or UPI?',
    points: 10
  },
  {
    id: 'organic_seo',
    title: 'Organic Search Engine Optimization (SEO)',
    desc: 'Does your website have dedicated landing pages ranking for your high-value commercial keywords?',
    points: 10
  },
  {
    id: 'social_presence',
    title: 'Active Brand & Social Consistency',
    desc: 'Do your logo, typography, and social media channels convey modern authority and premium trust?',
    points: 10
  },
  {
    id: 'crm_tracking',
    title: 'Centralized Lead & Client CRM',
    desc: 'Are all customer inquiries saved in an organized database rather than scattered across sticky notes or missed calls?',
    points: 10
  },
  {
    id: 'cloud_security',
    title: 'SSL Security & Cloud Infrastructure',
    desc: 'Does your site have active SSL encryption, daily automated cloud backups, and 99.9% guaranteed uptime?',
    points: 10
  }
];

export const DigitalScoreQuiz: React.FC<DigitalScoreQuizProps> = ({ onOpenQuoteWithScore }) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(false);

  const handleToggle = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const answeredCount = Object.keys(answers).length;

  const score = Object.entries(answers).reduce((acc, [k, v]) => {
    return v ? acc + 10 : acc;
  }, 0);

  const weaknesses = AUDIT_QUESTIONS.filter((q) => answers[q.id] === false).map((q) => q.title);
  const strengths = AUDIT_QUESTIONS.filter((q) => answers[q.id] === true).map((q) => q.title);

  const handleReset = () => {
    setAnswers({});
    setCompleted(false);
  };

  const getScoreColor = () => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <section id="digital-score" className="py-20 md:py-28 border-b border-white/10 relative bg-[#090b10]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 60-Second Health Check</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Check Your Business Digital Presence Score
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Answer 10 quick diagnostic questions to identify silent revenue leaks and discover your custom improvement plan.
          </p>
        </div>

        {/* Audit Questions List */}
        {!completed ? (
          <div className="rounded-2xl bg-[#0c101c] border border-white/10 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs text-slate-400">
              <span>{answeredCount} of 10 questions answered</span>
              <span className="font-mono text-cyan-400 font-bold">{Math.round((answeredCount / 10) * 100)}% Complete</span>
            </div>

            <div className="space-y-4">
              {AUDIT_QUESTIONS.map((q, idx) => {
                const answerVal = answers[q.id];

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="max-w-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-cyan-400">0{idx + 1}.</span>
                        <h4 className="text-sm font-bold text-white">{q.title}</h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {q.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleToggle(q.id, true)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          answerVal === true
                            ? 'bg-emerald-500 text-black shadow-md'
                            : 'bg-white/5 text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-300 border border-white/10'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Yes</span>
                      </button>

                      <button
                        onClick={() => handleToggle(q.id, false)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          answerVal === false
                            ? 'bg-rose-500 text-white shadow-md'
                            : 'bg-white/5 text-slate-300 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10'
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>No</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit / Calculate CTA */}
           <div
  className="
    mt-6 sm:mt-8
    pt-5 sm:pt-6
    border-t border-white/10

    flex
    flex-col
    sm:flex-row

    items-stretch
    sm:items-center

    justify-between

    gap-4
    sm:gap-5
  "
>
  {/* Status Text */}
  <span
    className="
      text-[11px]
      sm:text-xs

      text-slate-400

      text-center
      sm:text-left

      leading-relaxed

      order-1
      sm:order-none
    "
  >
    {answeredCount < 10
      ? 'Answer remaining questions to see your score'
      : 'All questions answered!'}
  </span>

  {/* Calculate Button */}
  <button
    type="button"
    onClick={() => setCompleted(true)}
    disabled={answeredCount < 5}
    className="
      w-full
      sm:w-auto

      min-h-[48px]
      sm:min-h-0

      px-5
      sm:px-6

      py-3

      text-xs
      sm:text-sm

      font-semibold
      text-white

      bg-gradient-to-r
      from-cyan-500
      to-blue-600

      hover:from-cyan-400
      hover:to-blue-500

      active:scale-[0.98]

      rounded-xl

      shadow-lg
      shadow-cyan-500/10

      transition-all

      flex
      items-center
      justify-center

      whitespace-nowrap

      disabled:opacity-50
      disabled:cursor-not-allowed

      cursor-pointer
      touch-manipulation

      order-2
      sm:order-none
    "
  >
    Calculate My Digital Score
  </button>
</div>
          </div>
        ) : (
          /* Completed Score Results Card */
          <div className="rounded-3xl bg-[#0d1220] border-2 border-cyan-500/40 p-6 sm:p-10 shadow-2xl space-y-8 animate-in zoom-in-95 duration-200">
            
            <div className="text-center">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block mb-2">
                Audit Results
              </span>
              <div className={`text-6xl sm:text-7xl font-mono font-extrabold ${getScoreColor()}`}>
                {score}<span className="text-3xl text-slate-500">/100</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mt-2">
                {score >= 80 
                  ? 'Strong Digital Footprint' 
                  : score >= 50 
                  ? 'Moderate Digital Presence with Obvious Revenue Leaks' 
                  : 'Critical Digital Deficit (Losing Customers to Competitors)'}
              </h3>
            </div>

            {/* Strengths & Weaknesses Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Weaknesses */}
              <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/20">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Growth Bottlenecks ({weaknesses.length})</span>
                </span>
                {weaknesses.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {weaknesses.map((w, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-400">Zero major bottlenecks detected!</p>
                )}
              </div>

              {/* Strengths */}
              <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Current Strengths ({strengths.length})</span>
                </span>
                {strengths.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {strengths.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-400">No strengths marked.</p>
                )}
              </div>

            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Diagnostic</span>
              </button>

              <button
                onClick={() => onOpenQuoteWithScore(score, weaknesses)}
                className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <span>Improve My Digital Score → Fix Bottlenecks</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
