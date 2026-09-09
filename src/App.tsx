import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OnePartnerOrb } from './components/OnePartnerOrb';
import { NicheExplorer } from './components/NicheExplorer';
import { NicheDetailModal } from './components/NicheDetailModal';
import { ServicesSection } from './components/ServicesSection';
import { ServiceBundlesSection } from './components/ServiceBundlesSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { PortfolioSection } from './components/PortfolioSection';
import { AIConsultant } from './components/AIConsultant';
import { DigitalScoreQuiz } from './components/DigitalScoreQuiz';
import { ProcessTimeline } from './components/ProcessTimeline';
import { InternationalMap } from './components/InternationalMap';
import { TechnologyWall } from './components/TechnologyWall';
import { TrustSection } from './components/TrustSection';
import { DigitalGrowthHub } from './components/DigitalGrowthHub';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { ProjectConfigurator } from './components/ProjectConfigurator';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { BusinessNiche } from './types';

export default function App() {
  const [selectedNiche, setSelectedNiche] = useState<BusinessNiche | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialNiche, setQuoteInitialNiche] = useState<string>('');
  const [quoteInitialServices, setQuoteInitialServices] = useState<string[]>([]);
  const [quoteInitialNotes, setQuoteInitialNotes] = useState<string>('');
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState('USD');
  const [isDark, setIsDark] = useState(true);

  // Global Keyboard shortcut for Quick Search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleOpenQuote = (initialNiche?: string, services?: string[], notes?: string) => {
    setQuoteInitialNiche(initialNiche || '');
    setQuoteInitialServices(services || []);
    setQuoteInitialNotes(notes || '');
    setIsQuoteOpen(true);
  };

  const handleSelectNiche = (niche: BusinessNiche) => {
    setSelectedNiche(niche);
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    handleOpenQuote(undefined, [serviceTitle], `Interested in: ${serviceTitle}`);
  };

  const handleSelectBundle = (bundleName: string) => {
    handleOpenQuote(undefined, [bundleName], `Interested in the ${bundleName} package.`);
  };

  const handleQuoteWithScore = (score: number, weaknesses: string[]) => {
    handleOpenQuote(
      'Digital Improvement Plan',
      ['Website Speed & Optimization', 'SEO & Maps Optimization'],
      `My current Digital Score is ${score}/100. Areas to fix: ${weaknesses.join(', ')}`
    );
  };

  const handleQuoteWithAIPlan = (planDetails: string) => {
    handleOpenQuote('AI Automation Growth Plan', ['24/7 AI Bot', 'Website'], planDetails);
  };

  const scrollToNiches = () => {
    const el = document.getElementById('niches');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAIConsultant = () => {
    const el = document.getElementById('ai-consultant');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 ${
      isDark ? 'bg-[#090b10]' : 'bg-[#0e111a]'
    }`}>
      {/* Precision Smooth Custom Cursor */}
      <CustomCursor />
      
      {/* Top Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenQuote={() => handleOpenQuote()}
        currentCurrency={currentCurrency}
        onCurrencyChange={(curr) => setCurrentCurrency(curr)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section 4 & 5: Hero with Animated Pipeline and Live Niche Search */}
        <Hero
          onSelectNiche={handleSelectNiche}
          onOpenQuote={() => handleOpenQuote()}
          onExploreSolutions={scrollToNiches}
        />

        {/* Section 10: "ONE PARTNER. EVERYTHING DIGITAL." Connected Orb Visual */}
        <OnePartnerOrb
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* Section 6: Business Niche Explorer (Find Your Business) */}
        <NicheExplorer
          onSelectNiche={handleSelectNiche}
          onOpenCustomQuote={(customNiche) => handleOpenQuote(customNiche)}
        />

        {/* Section 8: Service Capabilities Ecosystem */}
        <ServicesSection
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* Section 42: Curated Investment Bundles */}
        <ServiceBundlesSection
          onSelectBundle={handleSelectBundle}
          currentCurrency={currentCurrency}
        />

        {/* Section 12: Interactive Before / After Transformation Sliders */}
        <BeforeAfterSection
          onOpenQuote={(nicheName) => handleOpenQuote(nicheName)}
        />

        {/* Section 11: Featured Portfolio & Concept Case Studies */}
        <PortfolioSection
          onOpenQuote={(projectName) => handleOpenQuote(projectName)}
        />

        {/* Section 13 & 41: AI Growth Blueprint Generator & Advisor */}
        <AIConsultant
          onOpenQuoteWithDetails={handleQuoteWithAIPlan}
        />

        {/* Section 40: Interactive 60-Second Digital Score Health Quiz */}
        <DigitalScoreQuiz
          onOpenQuoteWithScore={handleQuoteWithScore}
        />

        {/* Section 9: 8-Step Engineering & Delivery Process Timeline */}
        <ProcessTimeline />

        {/* Section 16: "Built in India. Delivered Worldwide." Global Hub Map */}
        <InternationalMap />

        {/* Section 17: Production Technology Matrix */}
        <TechnologyWall />

        {/* Section 18: Trust & Authority Pillars */}
        <TrustSection />

        {/* Section 34: Digital Growth & Field Insights Hub */}
        <DigitalGrowthHub />

        {/* Section 35: Dynamic FAQ System */}
        <FAQSection />

        {/* Section 15 & 31: Direct Contact with Abhishek & Quick Channels */}
        <ContactSection />
      </main>

      {/* Global Modals */}

      {/* Section 7: Dynamic Niche Detail Modal */}
      <NicheDetailModal
        niche={selectedNiche}
        onClose={() => setSelectedNiche(null)}
        onOpenQuote={(nicheName) => handleOpenQuote(nicheName)}
      />

      {/* Section 14: Interactive Multi-Step Project Configurator */}
      <ProjectConfigurator
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialNiche={quoteInitialNiche}
        initialServices={quoteInitialServices}
        initialNotes={quoteInitialNotes}
        currentCurrency={currentCurrency}
      />

      {/* Section 5: Global ⌘K Quick Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectNiche={handleSelectNiche}
      />

      {/* Section 29: Admin Portal & Leads CRM */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Section 32: Mobile Sticky Bottom Bar */}
      <MobileBottomBar
        onOpenQuote={() => handleOpenQuote()}
        onOpenNiches={scrollToNiches}
        onOpenAI={scrollToAIConsultant}
      />

      {/* Section 36: Comprehensive Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenQuote={() => handleOpenQuote()}
      />

    </div>
  );
}
