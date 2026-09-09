import React, { useState } from 'react';
import { 
  Code2, 
  Cpu, 
  Database, 
  Cloud, 
  Layers, 
  Sparkles,
  Smartphone,
  Lock
} from 'lucide-react';

const TECH_CATEGORIES = [
  {
    id: 'frontend',
    name: 'Frontend & UI',
    icon: Code2,
    techs: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'Motion Animations', 'Vite']
  },
  {
    id: 'backend',
    name: 'Backend & Microservices',
    icon: Layers,
    techs: ['Node.js', 'Express', 'Python FastAPI', 'REST APIs', 'GraphQL', 'WebSockets']
  },
  {
    id: 'mobile',
    name: 'Mobile & PWA',
    icon: Smartphone,
    techs: ['React Native', 'Flutter', 'Progressive Web Apps (PWA)', 'iOS Swift', 'Android Kotlin']
  },
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    icon: Cpu,
    techs: ['Gemini 3.8 Flash', 'Google GenAI SDK', 'OpenAI APIs', 'Autonomous Agents', 'LangChain', 'Vector Search']
  },
  {
    id: 'database',
    name: 'Databases & Storage',
    icon: Database,
    techs: ['PostgreSQL', 'Redis In-Memory', 'Cloud Firestore', 'MongoDB', 'Supabase', 'AWS S3']
  },
  {
    id: 'cloud',
    name: 'DevOps & Edge Cloud',
    icon: Cloud,
    techs: ['Cloudflare CDN', 'AWS Cloud', 'Google Cloud Run', 'Vercel', 'Docker', 'GitHub Actions']
  }
];

export const TechnologyWall: React.FC = () => {
  const [activeTechId, setActiveTechId] = useState<string>('frontend');

  return (
    <section className="py-20 md:py-28 border-b border-white/10 relative bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Modern Production Stack</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Built on Battle-Tested Technologies
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            No bloated visual builder drag-and-drop templates. We engineer clean, hand-crafted code designed for sub-second speeds and infinite scalability.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_CATEGORIES.map((cat) => {
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                className="p-6 rounded-2xl bg-[#0c101c] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-white">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.techs.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 text-[11px] text-slate-400">
                  Enterprise-grade security & performance verified
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
