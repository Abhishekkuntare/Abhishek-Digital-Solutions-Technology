import React from 'react';
import { 
  Sparkles, 
  Phone, 
  Mail,
  MapPin, 
  Globe2, 
  ShieldCheck, 
  ArrowUp,
  Heart
} from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/helpers';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenQuote }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06080d] border-t border-white/10 pt-16 pb-24 lg:pb-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand & Global Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                Abhishek
              </span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              International digital solutions partner: business websites, mobile apps, AI automation, branding, marketing, and global growth systems.
            </p>

            <div className="space-y-1.5 pt-2 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Headquarters: Amravati, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Serving Clients in USA, UK, UAE, Europe, Australia & Worldwide</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href="tel:+919156075536" className="text-white hover:underline">+91 9156075536</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href="mailto:abhishekkuntare02@gmail.com" className="text-cyan-400 hover:underline">abhishekkuntare02@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Col 3: Core Solutions */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Digital Solutions
            </h4>
            <ul className="space-y-2">
              <li><a href="#niches" className="hover:text-cyan-400 transition-colors">Healthcare & Dental</a></li>
              <li><a href="#niches" className="hover:text-cyan-400 transition-colors">Restaurants & Food</a></li>
              <li><a href="#niches" className="hover:text-cyan-400 transition-colors">Real Estate & Homes</a></li>
              <li><a href="#niches" className="hover:text-cyan-400 transition-colors">Fitness & Athletic Gyms</a></li>
              <li><a href="#niches" className="hover:text-cyan-400 transition-colors">Commercial Contractors</a></li>
              <li><a href="#niches" className="hover:text-cyan-400 transition-colors">Corporate Law Firms</a></li>
            </ul>
          </div>

          {/* Col 4: Capabilities */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Services & Tech
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">iOS & Android Mobile Apps</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">24/7 WhatsApp AI Bots</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Brand Design & Creatives</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Google Local SEO & Ads</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Edge Cloud Deployment</a></li>
            </ul>
          </div>

          {/* Col 5: Interactive Tools */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Interactive Systems
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onOpenQuote()} className="hover:text-cyan-400 transition-colors text-left">
                  Project Configurator
                </button>
              </li>
              <li><a href="#ai-consultant" className="hover:text-cyan-400 transition-colors">AI Digital Consultant</a></li>
              <li><a href="#digital-score" className="hover:text-cyan-400 transition-colors">Digital Health Score</a></li>
              <li><a href="#transformations" className="hover:text-cyan-400 transition-colors">Before/After Transformations</a></li>
              <li><a href="#portfolio" className="hover:text-cyan-400 transition-colors">Case Studies</a></li>
              <li>
                <button onClick={onOpenAdmin} className="text-cyan-400/80 hover:text-cyan-300 transition-colors text-left flex items-center gap-1 mt-2">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 Abhishek. All Rights Reserved. Full Source Code Ownership Guaranteed.
          </div>

          <div className="flex items-center gap-4">
            <span>Built with precision in Amravati, India</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
