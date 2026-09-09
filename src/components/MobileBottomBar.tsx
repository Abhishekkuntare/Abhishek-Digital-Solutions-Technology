import React from 'react';
import { Home, Layers, Bot, Phone, Sparkles, Send } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/helpers';

interface MobileBottomBarProps {
  onOpenQuote: () => void;
  onOpenNiches: () => void;
  onOpenAI: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenQuote,
  onOpenNiches,
  onOpenAI
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0a0d16]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2">
      <div className="flex items-center justify-around gap-1">
        
        {/* Niches trigger */}
        <button
          onClick={onOpenNiches}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-400 hover:text-cyan-400 focus:outline-none"
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Niches</span>
        </button>

        {/* AI Consultant */}
        <button
          onClick={onOpenAI}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-400 hover:text-purple-400 focus:outline-none"
        >
          <Bot className="w-5 h-5 mb-0.5 text-purple-400" />
          <span className="text-[10px] font-medium">AI Advisor</span>
        </button>

        {/* Direct WhatsApp CTA */}
        <a
          href={generateWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2 text-emerald-400 focus:outline-none"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mb-0.5">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-[10px] font-semibold">WhatsApp</span>
        </a>

        {/* Start Project Quote CTA */}
        <button
          onClick={onOpenQuote}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-md shadow-cyan-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get Quote</span>
        </button>

      </div>
    </div>
  );
};
