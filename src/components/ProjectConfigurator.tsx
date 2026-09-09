// import React, { useState, useEffect } from 'react';
// import { 
//   CheckCircle2, 
//   Sparkles, 
//   ArrowRight, 
//   ArrowLeft, 
//   Send, 
//   Phone, 
//   X, 
//   Layers, 
//   Globe, 
//   Smartphone, 
//   Bot, 
//   Palette, 
//   TrendingUp, 
//   ShieldCheck, 
//   Clock, 
//   DollarSign, 
//   Loader2,
//   Share2,
//   Mail
// } from 'lucide-react';
// import confetti from 'canvas-confetti';
// import { formatPrice, generateWhatsAppUrl } from '../utils/helpers';
// import { NICHES_DATABASE, CATEGORIES_LIST, searchNiches } from '../data/nichesData';

// interface ProjectConfiguratorProps {
//   isOpen: boolean;
//   onClose: () => void;
//   initialNiche?: string;
//   initialServices?: string[];
//   initialNotes?: string;
//   currentCurrency: string;
// }

// const AVAILABLE_SERVICES = [
//   { id: 'website', title: 'High-Converting Website', icon: Globe, baseUSD: 850 },
//   { id: 'mobile_app', title: 'Mobile App (iOS / Android)', icon: Smartphone, baseUSD: 1800 },
//   { id: 'ai_bot', title: '24/7 AI WhatsApp / Web Bot', icon: Bot, baseUSD: 450 },
//   { id: 'booking', title: 'Real-Time Booking & Scheduling Engine', icon: Clock, baseUSD: 400 },
//   { id: 'branding', title: 'Brand Identity & Design System', icon: Palette, baseUSD: 500 },
//   { id: 'seo_marketing', title: 'Google Maps Local SEO & Ads Funnel', icon: TrendingUp, baseUSD: 600 },
//   { id: 'crm_automation', title: 'Workflow Automation & CRM Sync', icon: ShieldCheck, baseUSD: 550 },
//   { id: 'cloud_infra', title: 'Edge Cloud Infrastructure & SLA Maintenance', icon: Layers, baseUSD: 350 }
// ];

// const PLATFORMS = [
//   'Responsive Website',
//   'Android App (Google Play)',
//   'iOS App (Apple App Store)',
//   'Progressive Web App (PWA)',
//   'Tablet / POS Kiosk Display',
//   'All Platforms (Unified Suite)'
// ];

// const GOALS = [
//   'Get Inbound Leads & Inquiries',
//   'Sell Products / Direct Online Ordering',
//   'Book Client Appointments & Reservations',
//   'Build Strong Modern Brand Authority',
//   'Automate Repetitive Daily Operations',
//   'Launch New Tech / Business Venture'
// ];

// const TIMELINES = [
//   'ASAP (Rush Delivery)',
//   '2–4 Weeks (Standard)',
//   '1–2 Months (Phased)',
//   'Flexible (Discovery First)'
// ];

// export const ProjectConfigurator: React.FC<ProjectConfiguratorProps> = ({
//   isOpen,
//   onClose,
//   initialNiche,
//   initialServices,
//   initialNotes,
//   currentCurrency
// }) => {
//   const [step, setStep] = useState(1);
  
//   // Step 1: Niche
//   const [niche, setNiche] = useState(initialNiche || '');
//   const [businessName, setBusinessName] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  
//   // Step 2: Services
//   const [selectedServices, setSelectedServices] = useState<string[]>(
//     initialServices && initialServices.length > 0
//       ? initialServices
//       : ['High-Converting Website', '24/7 AI WhatsApp / Web Bot']
//   );

//   // Step 3: Platform
//   const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Responsive Website']);

//   // Step 4: Goals
//   const [selectedGoals, setSelectedGoals] = useState<string[]>(['Get Inbound Leads & Inquiries']);

//   // Step 5: Timeline
//   const [timeline, setTimeline] = useState('2–4 Weeks (Standard)');

//   // Contact Info
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [country, setCountry] = useState('India');
//   const [projectDescription, setProjectDescription] = useState(initialNotes || '');

//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   // Pre-fill changes if props change
//   useEffect(() => {
//     if (initialNiche) setNiche(initialNiche);
//     if (initialNotes) setProjectDescription(initialNotes);
//   }, [initialNiche, initialNotes]);

//   if (!isOpen) return null;

//   // Toggle helpers
//   const toggleService = (title: string) => {
//     setSelectedServices((prev) =>
//       prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
//     );
//   };

//   const togglePlatform = (p: string) => {
//     setSelectedPlatforms((prev) =>
//       prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
//     );
//   };

//   const toggleGoal = (g: string) => {
//     setSelectedGoals((prev) =>
//       prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]
//     );
//   };

//   // Calculate estimated budget
//   const estimatedMinUSD = selectedServices.reduce((acc, sTitle) => {
//     const found = AVAILABLE_SERVICES.find((s) => s.title === sTitle);
//     return acc + (found ? found.baseUSD : 400);
//   }, 450);

//   const estimatedMaxUSD = Math.round(estimatedMinUSD * 1.55);

//   const handleSubmitInquiry = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name || !email || !phone) {
//       setErrorMessage('Please fill in your name, email, and phone number.');
//       return;
//     }

//     setErrorMessage('');
//     setSubmitting(true);

//   //   try {
//   //     const payload = {
//   //       name,
//   //       businessName,
//   //       email,
//   //       phone,
//   //       country,
//   //       businessNiche: niche || 'General Business',
//   //       servicesRequired: selectedServices,
//   //       platforms: selectedPlatforms,
//   //       goals: selectedGoals,
//   //       timeline,
//   //       budgetRange: `${formatPrice(estimatedMinUSD, currentCurrency)} – ${formatPrice(estimatedMaxUSD, currentCurrency)}`,
//   //       projectDescription
//   //     };

//   //     const res = await fetch('/api/leads', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify(payload)
//   //     });

//   //     const data = await res.json();
//   //     if (data.success) {
//   //       setSubmitted(true);
//   //       // Trigger celebratory confetti
//   //       try {
//   //         confetti({
//   //           particleCount: 80,
//   //           spread: 70,
//   //           origin: { y: 0.6 }
//   //         });
//   //       } catch (e) {
//   //         // ignore if canvas blocked
//   //       }
//   //     } else {
//   //       setErrorMessage(data.error || 'Failed to submit proposal. Please try again.');
//   //     }
//   //   } catch (err) {
//   //     console.error('Submission error:', err);
//   //     setErrorMessage('Could not connect to server. Please reach Abhishek directly on WhatsApp.');
//   //   } finally {
//   //     setSubmitting(false);
//   //   }
//   // };


//   try {
//   const payload = {
//     name,
//     businessName,
//     email,
//     phone,
//     country,
//     businessNiche: niche || "General Business",
//     servicesRequired: selectedServices,
//     platforms: selectedPlatforms,
//     goals: selectedGoals,
//     timeline,
//     budgetRange: `${formatPrice(
//       estimatedMinUSD,
//       currentCurrency
//     )} – ${formatPrice(
//       estimatedMaxUSD,
//       currentCurrency
//     )}`,
//     projectDescription
//   };

//   console.log("📤 Sending proposal:", payload);

//   const res = await fetch("/api/leads", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(payload)
//   });

//   // Read as text FIRST
//   const responseText = await res.text();

//   console.log("📥 API status:", res.status);
//   console.log("📥 API response:", responseText);

//   let data = {};

//   try {
//     data = responseText ? JSON.parse(responseText) : {};
//   } catch (parseError) {
//     console.error("❌ API returned non-JSON:", responseText);

//     throw new Error(
//       `Server returned ${res.status}: ${
//         responseText || "Empty response"
//       }`
//     );
//   }

//   if (!res.ok) {
//     throw new Error(
//       data.error ||
//       data.message ||
//       `Server error: ${res.status}`
//     );
//   }

//   if (data.success) {
//     setSubmitted(true);

//     try {
//       confetti({
//         particleCount: 80,
//         spread: 70,
//         origin: { y: 0.6 }
//       });
//     } catch (e) {
//       console.warn("Confetti unavailable");
//     }

//   } else {
//     setErrorMessage(
//       data.error ||
//       data.message ||
//       "Failed to submit proposal. Please try again."
//     );
//   }

// } catch (err) {
//   console.error("❌ Submission error:", err);

//   setErrorMessage(
//     err instanceof Error
//       ? err.message
//       : "Could not connect to server."
//   );

// } finally {
//   setSubmitting(false);
// }

//   const whatsappInquiryUrl = generateWhatsAppUrl(
//     '+919156075536',
//     `Hi Abhishek, I generated a Project Configurator roadmap for my business "${businessName || niche || 'New Project'}":\n- Niche: ${niche || 'Not specified'}\n- Services: ${selectedServices.join(', ')}\n- Platforms: ${selectedPlatforms.join(', ')}\n- Timeline: ${timeline}\n- Name: ${name || 'Prospective Client'}`
//   );

//   return (
//     <div
//     className="
//       fixed inset-0 z-50
//       bg-black/85 backdrop-blur-md
//       animate-in fade-in duration-200
//       overflow-hidden
//       flex items-center justify-center
//       p-0 sm:p-4 md:p-6
//     "
//     onClick={onClose}
//   >
//     <div
//       onClick={(e) => e.stopPropagation()}
//       className="
//         relative
//         w-full
//         h-[100dvh]
//         sm:h-auto
//         sm:max-h-[94dvh]
//         max-w-3xl

//         bg-[#0c101c]
//         border border-white/10
//         sm:border-white/15

//         rounded-none
//         sm:rounded-3xl

//         shadow-2xl

//         overflow-hidden

//         flex flex-col

//         isolate
//       "
//     >

//       {/* =========================================================
//           HEADER
//       ========================================================= */}
//       <div
//         className="
//           shrink-0
//           relative
//           px-4 py-4
//           sm:px-6 sm:py-5
//           md:px-8 md:py-6

//           bg-gradient-to-r
//           from-[#111728]
//           to-[#0a0d16]

//           border-b border-white/10
//         "
//       >
//         <div className="flex items-start justify-between gap-3">

//           <div className="min-w-0 flex-1">

//             {/* Label */}
//             <div className="flex items-center gap-2 mb-1.5">
//               <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />

//               <span
//                 className="
//                   text-[10px]
//                   sm:text-xs
//                   uppercase
//                   font-bold
//                   tracking-wider
//                   text-cyan-400
//                   truncate
//                 "
//               >
//                 Interactive Project Configurator
//               </span>
//             </div>

//             {/* Title */}
//             <h2
//               className="
//                 font-display
//                 text-lg
//                 sm:text-xl
//                 md:text-2xl
//                 font-bold
//                 text-white
//                 leading-tight
//                 pr-2
//               "
//             >
//               Configure Your Custom Digital Solution
//             </h2>

//           </div>

//           {/* Close */}
//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close configurator"
//             className="
//               shrink-0

//               w-10 h-10
//               sm:w-11 sm:h-11

//               flex items-center justify-center

//               text-slate-400
//               hover:text-white

//               bg-white/5
//               hover:bg-white/10

//               border border-white/10

//               rounded-xl

//               transition-colors

//               active:scale-95
//             "
//           >
//             <X className="w-5 h-5" />
//           </button>

//         </div>
//       </div>


//       {/* =========================================================
//           STEP INDICATOR
//       ========================================================= */}
//       {!submitted && (
//         <div
//           className="
//             shrink-0
//             bg-[#080a10]
//             border-b border-white/5

//             px-3
//             sm:px-6
//             md:px-8

//             py-2.5
//             sm:py-3

//             overflow-x-auto
//             overscroll-x-contain

//             scrollbar-none
//           "
//         >
//           <div
//             className="
//               flex
//               items-center
//               justify-between
//               sm:justify-between

//               min-w-max
//               sm:min-w-0

//               gap-3
//               sm:gap-4

//               text-[10px]
//               sm:text-xs
//               font-semibold
//             "
//           >

//             <span
//               className={
//                 step >= 1
//                   ? "text-cyan-400 whitespace-nowrap"
//                   : "text-slate-400 whitespace-nowrap"
//               }
//             >
//               1. Niche
//             </span>

//             <span className="text-slate-600">→</span>

//             <span
//               className={
//                 step >= 2
//                   ? "text-cyan-400 whitespace-nowrap"
//                   : "text-slate-400 whitespace-nowrap"
//               }
//             >
//               2. Services
//             </span>

//             <span className="text-slate-600">→</span>

//             <span
//               className={
//                 step >= 3
//                   ? "text-cyan-400 whitespace-nowrap"
//                   : "text-slate-400 whitespace-nowrap"
//               }
//             >
//               3. Platform
//             </span>

//             <span className="text-slate-600">→</span>

//             <span
//               className={
//                 step >= 4
//                   ? "text-cyan-400 whitespace-nowrap"
//                   : "text-slate-400 whitespace-nowrap"
//               }
//             >
//               4. Goals
//             </span>

//             <span className="text-slate-600">→</span>

//             <span
//               className={
//                 step >= 5
//                   ? "text-cyan-400 whitespace-nowrap"
//                   : "text-slate-400 whitespace-nowrap"
//               }
//             >
//               5. Summary
//             </span>

//           </div>
//         </div>
//       )}


//       {/* =========================================================
//           SCROLLABLE CONTENT
//           THIS IS THE IMPORTANT PART
//       ========================================================= */}
//       <div
//         className="
//           flex-1
//           min-h-0

//           overflow-y-auto
//           overflow-x-hidden

//           overscroll-contain
//           touch-pan-y

//           px-4
//           py-5

//           sm:px-6
//           sm:py-6

//           md:px-8
//           md:py-8

//           [-webkit-overflow-scrolling:touch]
//         "
//       >

//         {submitted ? (

//           /* =====================================================
//              SUCCESS SCREEN
//           ===================================================== */
//           <div className="text-center py-4 sm:py-8 space-y-5">

//             <div
//               className="
//                 w-14 h-14
//                 sm:w-16 sm:h-16

//                 rounded-2xl

//                 bg-emerald-500/20
//                 border border-emerald-500/40

//                 text-emerald-400

//                 flex items-center justify-center

//                 mx-auto

//                 shadow-lg
//                 shadow-emerald-500/10
//               "
//             >
//               <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
//             </div>

//             <div>

//               <div
//                 className="
//                   inline-flex
//                   max-w-full

//                   items-center
//                   gap-1.5

//                   px-3
//                   py-1

//                   rounded-full

//                   bg-cyan-500/15
//                   border border-cyan-500/30

//                   text-cyan-300
//                   text-[10px]
//                   sm:text-xs

//                   font-semibold
//                 "
//               >
//                 <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />

//                 <span className="truncate">
//                   Proposal submitted successfully
//                 </span>
//               </div>

//               <h3
//                 className="
//                   font-display
//                   text-xl
//                   sm:text-2xl
//                   md:text-3xl

//                   font-extrabold
//                   text-white

//                   mt-2

//                   leading-tight
//                 "
//               >
//                 Project Roadmap Received!
//               </h3>

//             </div>

//             <p
//               className="
//                 text-xs
//                 sm:text-sm

//                 text-slate-300

//                 max-w-lg
//                 mx-auto

//                 leading-relaxed
//               "
//             >
//               Thank you, <strong>{name}</strong>! Your complete digital
//               roadmap has been securely recorded and routed to Abhishek.
//               We will review your scope and provide a structured plan
//               within 24 hours.
//             </p>

//             {/* Summary */}
//             <div
//               className="
//                 p-4
//                 rounded-2xl

//                 bg-white/5
//                 border border-white/10

//                 text-left
//                 text-xs

//                 space-y-3

//                 overflow-hidden
//               "
//             >

//               <div
//                 className="
//                   flex
//                   flex-col
//                   sm:flex-row

//                   sm:justify-between

//                   gap-2

//                   pb-3
//                   border-b border-white/5

//                   text-[10px]
//                   text-cyan-400

//                   font-bold
//                   uppercase
//                   tracking-wider
//                 "
//               >
//                 <span>Roadmap Summary</span>

//                 <span className="break-all text-slate-400">
//                   Proposal Ready
//                 </span>
//               </div>

//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   sm:grid-cols-2
//                   gap-2
//                 "
//               >

//                 <div className="break-words">
//                   <strong className="text-slate-400">
//                     Client:
//                   </strong>{" "}
//                   {name} ({country || "Global"})
//                 </div>

//                 <div className="break-words">
//                   <strong className="text-slate-400">
//                     Business:
//                   </strong>{" "}
//                   {businessName || niche}
//                 </div>

//                 <div className="break-all">
//                   <strong className="text-slate-400">
//                     Phone:
//                   </strong>{" "}
//                   {phone}
//                 </div>

//                 <div className="break-all">
//                   <strong className="text-slate-400">
//                     Email:
//                   </strong>{" "}
//                   {email}
//                 </div>

//               </div>

//               <div className="break-words">
//                 <strong className="text-slate-400">
//                   Services:
//                 </strong>{" "}
//                 {selectedServices.join(", ")}
//               </div>

//               <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-2 border-t border-white/5">

//                 <div>
//                   <strong className="text-slate-400">
//                     Timeline:
//                   </strong>{" "}
//                   {timeline}
//                 </div>

//                 <div
//                   className="
//                     text-emerald-400
//                     font-bold
//                     font-mono
//                     text-sm
//                   "
//                 >
//                   {formatPrice(estimatedMinUSD, currentCurrency)}
//                   {" – "}
//                   {formatPrice(estimatedMaxUSD, currentCurrency)}
//                 </div>

//               </div>

//             </div>

//             {/* Success Buttons */}
//             <div
//               className="
//                 grid
//                 grid-cols-1
//                 sm:grid-cols-2

//                 gap-2.5

//                 pt-2
//               "
//             >

//               <a
//                 href={`mailto:abhishekkuntare02@gmail.com?subject=${encodeURIComponent(
//                   `🚀 [Project Roadmap] ${
//                     businessName || niche || "New Project"
//                   } - ${name}`
//                 )}&body=${encodeURIComponent(
//                   `Hi Abhishek,

// I just submitted a Project Roadmap on your website:

// - Name: ${name}
// - Business: ${businessName || niche}
// - Email: ${email}
// - Phone/WhatsApp: ${phone}
// - Country: ${country}
// - Industry: ${niche}
// - Selected Services: ${selectedServices.join(", ")}
// - Target Platforms: ${selectedPlatforms.join(", ")}
// - Primary Goals: ${selectedGoals.join(", ")}
// - Estimated Budget: ${formatPrice(
//                     estimatedMinUSD,
//                     currentCurrency
//                   )} – ${formatPrice(
//                     estimatedMaxUSD,
//                     currentCurrency
//                   )}
// - Target Timeline: ${timeline}

// Project Notes:
// ${projectDescription || "None"}
// `
//                 )}`}
//                 className="
//                   w-full

//                   px-4
//                   py-3

//                   rounded-xl

//                   bg-cyan-500/15
//                   hover:bg-cyan-500/25

//                   border border-cyan-500/30

//                   text-cyan-300

//                   text-xs
//                   sm:text-sm

//                   font-semibold

//                   flex items-center
//                   justify-center
//                   gap-2

//                   transition-all
//                 "
//               >
//                 <Mail className="w-4 h-4 shrink-0" />
//                 <span>Open Mail App</span>
//               </a>

//               <a
//                 href={whatsappInquiryUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="
//                   w-full

//                   px-4
//                   py-3

//                   rounded-xl

//                   bg-emerald-500
//                   hover:bg-emerald-400

//                   text-black

//                   font-semibold
//                   text-xs
//                   sm:text-sm

//                   flex items-center
//                   justify-center
//                   gap-2

//                   shadow-lg
//                   transition-all
//                 "
//               >
//                 <Phone className="w-4 h-4 shrink-0" />

//                 <span>
//                   WhatsApp
//                 </span>
//               </a>

//             </div>

//           </div>

//         ) : (

//           /* =====================================================
//              NORMAL CONFIGURATOR
//           ===================================================== */
//           <div>

//             {/* =================================================
//                 STEP 1
//             ================================================= */}
//             {step === 1 && (
//               <div className="space-y-5 animate-in fade-in duration-150">

//                 <div>
//                   <h3
//                     className="
//                       font-display
//                       text-lg
//                       sm:text-xl
//                       font-bold
//                       text-white
//                       mb-1
//                     "
//                   >
//                     Step 1: What is your business niche?
//                   </h3>

//                   <p className="text-xs sm:text-sm text-slate-400">
//                     Select or search your industry across 20 categories
//                     and 320+ niches.
//                   </p>
//                 </div>

//                 {/* Niche Input */}
//                 <div className="relative">

//                   <label className="block text-xs font-semibold text-slate-300 mb-1">
//                     Business Niche or Industry *
//                   </label>

//                   <input
//                     type="text"
//                     value={niche}
//                     onFocus={() => setShowSuggestions(true)}
//                     onChange={(e) => {
//                       setNiche(e.target.value);
//                       setShowSuggestions(true);
//                     }}
//                     placeholder="Type your niche..."
//                     className="
//                       w-full

//                       px-3.5
//                       py-3

//                       bg-white/5

//                       border
//                       border-white/10

//                       focus:border-cyan-500

//                       rounded-xl

//                       text-sm
//                       text-white

//                       placeholder-slate-500

//                       focus:outline-none

//                       transition-colors
//                     "
//                   />

//                   {/* Suggestions */}
//                   {showSuggestions && niche.trim().length > 1 && (
//                     <div
//                       className="
//                         absolute
//                         top-full
//                         left-0
//                         right-0

//                         mt-1.5

//                         bg-[#0d1222]

//                         border
//                         border-cyan-500/30

//                         rounded-xl

//                         shadow-2xl

//                         p-2

//                         z-50

//                         max-h-52

//                         overflow-y-auto
//                       "
//                     >

//                       <div
//                         className="
//                           text-[10px]
//                           uppercase
//                           font-bold
//                           text-slate-400

//                           px-2
//                           py-1

//                           flex
//                           justify-between
//                           gap-2
//                         "
//                       >
//                         <span>Matching Niches</span>

//                         <button
//                           type="button"
//                           onClick={() => setShowSuggestions(false)}
//                           className="text-cyan-400 hover:underline shrink-0"
//                         >
//                           Close
//                         </button>
//                       </div>

//                       {searchNiches(niche)
//                         .slice(0, 8)
//                         .map((matched) => (
//                           <button
//                             key={matched.id}
//                             type="button"
//                             onClick={() => {
//                               setNiche(matched.name);
//                               setShowSuggestions(false);
//                             }}
//                             className="
//                               w-full
//                               text-left

//                               px-3
//                               py-2.5

//                               rounded-lg

//                               hover:bg-cyan-500/10

//                               transition-colors

//                               flex
//                               items-center
//                               justify-between

//                               gap-2
//                             "
//                           >
//                             <span className="text-xs font-semibold text-white truncate">
//                               {matched.name}
//                             </span>

//                             <span
//                               className="
//                                 text-[10px]
//                                 px-2
//                                 py-0.5

//                                 rounded

//                                 bg-white/5

//                                 text-slate-400

//                                 border border-white/10

//                                 shrink-0
//                               "
//                             >
//                               {matched.category}
//                             </span>
//                           </button>
//                         ))}
//                     </div>
//                   )}

//                 </div>

//                 {/* Business Name */}
//                 <div>
//                   <label className="block text-xs font-semibold text-slate-300 mb-1">
//                     Business / Brand Name (Optional)
//                   </label>

//                   <input
//                     type="text"
//                     value={businessName}
//                     onChange={(e) => setBusinessName(e.target.value)}
//                     placeholder="e.g. Apex Health Group"
//                     className="
//                       w-full

//                       px-3.5
//                       py-3

//                       bg-white/5
//                       border border-white/10

//                       focus:border-cyan-500
//                       focus:outline-none

//                       rounded-xl

//                       text-sm
//                       text-white

//                       placeholder-slate-500
//                     "
//                   />
//                 </div>

//                 {/* Category */}
//                 <div className="pt-3 border-t border-white/5">

//                   <div
//                     className="
//                       flex
//                       flex-col
//                       sm:flex-row

//                       sm:items-center
//                       sm:justify-between

//                       gap-2

//                       mb-3
//                     "
//                   >

//                     <span
//                       className="
//                         text-[11px]
//                         font-semibold
//                         text-slate-400
//                         uppercase
//                         tracking-wider
//                       "
//                     >
//                       Browse by Category
//                     </span>

//                     <select
//                       value={selectedCategory}
//                       onChange={(e) =>
//                         setSelectedCategory(e.target.value)
//                       }
//                       className="
//                         w-full
//                         sm:w-auto

//                         bg-white/10
//                         text-cyan-300

//                         text-xs

//                         rounded-lg

//                         px-2.5
//                         py-2

//                         border border-white/10

//                         focus:outline-none

//                         cursor-pointer
//                       "
//                     >
//                       <option
//                         value="all"
//                         className="bg-slate-900 text-white"
//                       >
//                         All Categories
//                       </option>

//                       {CATEGORIES_LIST.map((cat) => (
//                         <option
//                           key={cat.id}
//                           value={cat.id}
//                           className="bg-slate-900 text-white"
//                         >
//                           {cat.name} ({cat.nichesCount})
//                         </option>
//                       ))}
//                     </select>

//                   </div>

//                   <div
//                     className="
//                       flex
//                       flex-wrap
//                       gap-1.5

//                       max-h-40

//                       overflow-y-auto
//                       overscroll-contain

//                       pr-1
//                     "
//                   >
//                     {(selectedCategory === "all"
//                       ? [
//                           "SaaS business",
//                           "AI automation agency",
//                           "AI agents",
//                           "Dental clinic",
//                           "Restaurant",
//                           "Cloud kitchen",
//                           "Tiffin service",
//                           "Real-estate agency",
//                           "Construction company",
//                           "Car dealership",
//                           "Car detailing",
//                           "Fitness center",
//                           "Solar installation",
//                           "E-commerce platform",
//                           "Dropshipping",
//                           "Accounting firm",
//                           "Digital marketing agency",
//                           "Plumbing",
//                           "Drone services",
//                           "Pet grooming",
//                         ]
//                       : NICHES_DATABASE.filter((n) => {
//                           const cat = CATEGORIES_LIST.find(
//                             (c) => c.id === selectedCategory
//                           );

//                           return cat
//                             ? n.category.toLowerCase() ===
//                                 cat.name.toLowerCase()
//                             : true;
//                         }).map((n) => n.name)
//                     ).map((n) => (
//                       <button
//                         key={n}
//                         type="button"
//                         onClick={() => {
//                           setNiche(n);
//                           setShowSuggestions(false);
//                         }}
//                         className={`
//                           text-xs
//                           px-2.5
//                           py-1.5

//                           rounded-lg
//                           border

//                           transition-colors

//                           ${
//                             niche.toLowerCase() === n.toLowerCase()
//                               ? "bg-cyan-500/25 border-cyan-400 text-cyan-300 font-semibold"
//                               : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
//                           }
//                         `}
//                       >
//                         {n}
//                       </button>
//                     ))}
//                   </div>

//                 </div>

//               </div>
//             )}


//             {/* =================================================
//                 STEP 2
//             ================================================= */}
//             {step === 2 && (
//               <div className="space-y-5 animate-in fade-in duration-150">

//                 <div>
//                   <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1">
//                     Step 2: What digital capabilities do you need?
//                   </h3>

//                   <p className="text-xs sm:text-sm text-slate-400">
//                     Select all modules you'd like engineered into your
//                     digital solution.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

//                   {AVAILABLE_SERVICES.map((srv) => {

//                     const isChecked =
//                       selectedServices.includes(srv.title);

//                     const Icon = srv.icon;

//                     return (
//                       <button
//                         key={srv.id}
//                         type="button"
//                         onClick={() => toggleService(srv.title)}
//                         className={`
//                           w-full
//                           text-left

//                           p-3.5

//                           rounded-xl
//                           border

//                           transition-all

//                           flex
//                           items-start
//                           gap-3

//                           ${
//                             isChecked
//                               ? "bg-cyan-500/15 border-cyan-400 shadow-md shadow-cyan-500/10"
//                               : "bg-white/5 border-white/10 hover:border-white/20"
//                           }
//                         `}
//                       >

//                         <div
//                           className={`
//                             p-2

//                             rounded-lg

//                             shrink-0

//                             ${
//                               isChecked
//                                 ? "bg-cyan-500 text-black"
//                                 : "bg-white/10 text-cyan-400"
//                             }
//                           `}
//                         >
//                           <Icon className="w-4 h-4" />
//                         </div>

//                         <div className="flex-1 min-w-0">

//                           <span className="text-xs font-bold text-white block break-words">
//                             {srv.title}
//                           </span>

//                           <span className="text-[10px] text-cyan-300 mt-0.5 block">
//                             from {formatPrice(srv.baseUSD, currentCurrency)}
//                           </span>

//                         </div>

//                         <div
//                           className={`
//                             w-4
//                             h-4

//                             rounded-full
//                             border

//                             flex
//                             items-center
//                             justify-center

//                             mt-1

//                             shrink-0

//                             ${
//                               isChecked
//                                 ? "bg-cyan-500 border-cyan-500 text-black text-[10px]"
//                                 : "border-white/20"
//                             }
//                           `}
//                         >
//                           {isChecked && "✓"}
//                         </div>

//                       </button>
//                     );
//                   })}

//                 </div>

//               </div>
//             )}


//             {/* =================================================
//                 STEP 3
//             ================================================= */}
//             {step === 3 && (
//               <div className="space-y-5 animate-in fade-in duration-150">

//                 <div>
//                   <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1">
//                     Step 3: Which target platforms do you require?
//                   </h3>

//                   <p className="text-xs sm:text-sm text-slate-400">
//                     We support web, mobile app stores, PWAs, and internal
//                     displays.
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

//                   {PLATFORMS.map((p) => {

//                     const isSelected =
//                       selectedPlatforms.includes(p);

//                     return (
//                       <button
//                         key={p}
//                         type="button"
//                         onClick={() => togglePlatform(p)}
//                         className={`
//                           w-full

//                           p-4

//                           rounded-xl
//                           border

//                           transition-all

//                           flex
//                           items-center
//                           justify-between

//                           gap-3

//                           text-left

//                           ${
//                             isSelected
//                               ? "bg-cyan-500/15 border-cyan-400 shadow-md"
//                               : "bg-white/5 border-white/10 hover:border-white/20"
//                           }
//                         `}
//                       >

//                         <span className="text-xs font-bold text-white">
//                           {p}
//                         </span>

//                         <span
//                           className={`
//                             w-4
//                             h-4

//                             rounded-full
//                             border

//                             flex
//                             items-center
//                             justify-center

//                             shrink-0

//                             ${
//                               isSelected
//                                 ? "bg-cyan-500 border-cyan-500 text-black text-[10px]"
//                                 : "border-white/20"
//                             }
//                           `}
//                         >
//                           {isSelected && "✓"}
//                         </span>

//                       </button>
//                     );
//                   })}

//                 </div>

//               </div>
//             )}


//             {/* =================================================
//                 STEP 4
//             ================================================= */}
//             {step === 4 && (
//               <div className="space-y-6 animate-in fade-in duration-150">

//                 <div>
//                   <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1">
//                     Step 4: Primary Goals & Delivery Timeline
//                   </h3>

//                   <p className="text-xs sm:text-sm text-slate-400">
//                     Align the architecture around your exact business
//                     KPIs.
//                   </p>
//                 </div>

//                 <div>

//                   <span className="text-xs font-semibold text-slate-300 block mb-2">
//                     Select Primary Goals:
//                   </span>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

//                     {GOALS.map((g) => {

//                       const isChecked =
//                         selectedGoals.includes(g);

//                       return (
//                         <button
//                           key={g}
//                           type="button"
//                           onClick={() => toggleGoal(g)}
//                           className={`
//                             p-3

//                             rounded-lg

//                             text-xs
//                             font-medium
//                             text-left

//                             border

//                             transition-colors

//                             flex
//                             items-center
//                             justify-between

//                             gap-3

//                             ${
//                               isChecked
//                                 ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
//                                 : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
//                             }
//                           `}
//                         >

//                           <span>{g}</span>

//                           {isChecked && (
//                             <span className="text-cyan-400 shrink-0">
//                               ✓
//                             </span>
//                           )}

//                         </button>
//                       );
//                     })}

//                   </div>

//                 </div>

//                 <div>

//                   <span className="text-xs font-semibold text-slate-300 block mb-2">
//                     Target Timeline:
//                   </span>

//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">

//                     {TIMELINES.map((t) => (
//                       <button
//                         key={t}
//                         type="button"
//                         onClick={() => setTimeline(t)}
//                         className={`
//                           p-3

//                           rounded-lg

//                           text-xs
//                           font-semibold

//                           border

//                           text-center

//                           transition-colors

//                           ${
//                             timeline === t
//                               ? "bg-cyan-500 border-cyan-500 text-black"
//                               : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
//                           }
//                         `}
//                       >
//                         {t}
//                       </button>
//                     ))}

//                   </div>

//                 </div>

//               </div>
//             )}


//             {/* =================================================
//                 STEP 5
//             ================================================= */}
//             {step === 5 && (
//               <form
//                 onSubmit={handleSubmitInquiry}
//                 className="space-y-5 sm:space-y-6 animate-in fade-in duration-150"
//               >

//                 {/* Summary */}
//                 <div
//                   className="
//                     p-4
//                     sm:p-5

//                     rounded-2xl

//                     bg-[#111728]
//                     border border-cyan-500/30

//                     space-y-3
//                   "
//                 >

//                   <div
//                     className="
//                       flex
//                       flex-col
//                       sm:flex-row

//                       sm:items-center
//                       sm:justify-between

//                       gap-3

//                       pb-3

//                       border-b border-white/10
//                     "
//                   >

//                     <div className="min-w-0">

//                       <span className="text-[10px] font-bold uppercase text-cyan-400">
//                         Roadmap Specification
//                       </span>

//                       <h4 className="text-sm sm:text-base font-bold text-white break-words">
//                         {businessName
//                           ? `${businessName} (${niche})`
//                           : niche || "Digital Growth Project"}
//                       </h4>

//                     </div>

//                     <div className="text-left sm:text-right shrink-0">

//                       <span className="text-[10px] text-slate-400 block">
//                         Estimated Budget
//                       </span>

//                       <span className="text-sm font-mono font-bold text-emerald-400">
//                         {formatPrice(
//                           estimatedMinUSD,
//                           currentCurrency
//                         )}
//                         {" – "}
//                         {formatPrice(
//                           estimatedMaxUSD,
//                           currentCurrency
//                         )}
//                       </span>

//                     </div>

//                   </div>

//                   <div className="text-xs text-slate-300 space-y-2">

//                     <div className="break-words">
//                       <strong>Services:</strong>{" "}
//                       {selectedServices.join(", ") || "Custom"}
//                     </div>

//                     <div className="break-words">
//                       <strong>Platforms:</strong>{" "}
//                       {selectedPlatforms.join(", ")}
//                     </div>

//                     <div>
//                       <strong>Target Timeline:</strong>{" "}
//                       {timeline}
//                     </div>

//                   </div>

//                 </div>


//                 {/* Contact */}
//                 <div className="space-y-3">

//                   <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
//                     Where should we send your formal proposal?
//                   </h4>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

//                     <div>

//                       <label className="block text-[11px] font-semibold text-slate-400 mb-1">
//                         Your Name *
//                       </label>

//                       <input
//                         type="text"
//                         required
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Full Name"
//                         className="
//                           w-full

//                           px-3
//                           py-2.5

//                           bg-white/5
//                           border border-white/10

//                           focus:border-cyan-500
//                           focus:outline-none

//                           rounded-xl

//                           text-xs
//                           text-white

//                           placeholder-slate-500
//                         "
//                       />

//                     </div>

//                     <div>

//                       <label className="block text-[11px] font-semibold text-slate-400 mb-1">
//                         Work Email *
//                       </label>

//                       <input
//                         type="email"
//                         required
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="name@company.com"
//                         className="
//                           w-full

//                           px-3
//                           py-2.5

//                           bg-white/5
//                           border border-white/10

//                           focus:border-cyan-500
//                           focus:outline-none

//                           rounded-xl

//                           text-xs
//                           text-white

//                           placeholder-slate-500
//                         "
//                       />

//                     </div>

//                   </div>


//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

//                     <div>

//                       <label className="block text-[11px] font-semibold text-slate-400 mb-1">
//                         Phone / WhatsApp *
//                       </label>

//                       <input
//                         type="tel"
//                         required
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         placeholder="+91 98200 00000"
//                         className="
//                           w-full

//                           px-3
//                           py-2.5

//                           bg-white/5
//                           border border-white/10

//                           focus:border-cyan-500
//                           focus:outline-none

//                           rounded-xl

//                           text-xs
//                           text-white

//                           placeholder-slate-500
//                         "
//                       />

//                     </div>

//                     <div>

//                       <label className="block text-[11px] font-semibold text-slate-400 mb-1">
//                         Country
//                       </label>

//                       <input
//                         type="text"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         placeholder="India, USA, UAE..."
//                         className="
//                           w-full

//                           px-3
//                           py-2.5

//                           bg-white/5
//                           border border-white/10

//                           focus:border-cyan-500
//                           focus:outline-none

//                           rounded-xl

//                           text-xs
//                           text-white

//                           placeholder-slate-500
//                         "
//                       />

//                     </div>

//                   </div>


//                   <div>

//                     <label className="block text-[11px] font-semibold text-slate-400 mb-1">
//                       Additional Project Details or Notes
//                     </label>

//                     <textarea
//                       rows={3}
//                       value={projectDescription}
//                       onChange={(e) =>
//                         setProjectDescription(e.target.value)
//                       }
//                       placeholder="Any existing website link or specific features required..."
//                       className="
//                         w-full

//                         px-3
//                         py-2.5

//                         bg-white/5
//                         border border-white/10

//                         focus:border-cyan-500
//                         focus:outline-none

//                         rounded-xl

//                         text-xs
//                         text-white

//                         placeholder-slate-500

//                         resize-none
//                       "
//                     />

//                   </div>

//                 </div>


//                 {/* Error */}
//                 {errorMessage && (
//                   <div
//                     className="
//                       p-3

//                       rounded-lg

//                       bg-rose-500/10
//                       border border-rose-500/20

//                       text-rose-300
//                       text-xs
//                     "
//                   >
//                     {errorMessage}
//                   </div>
//                 )}


//                 {/* Step 5 actions */}
//                 <div
//                   className="
//                     grid
//                     grid-cols-1
//                     sm:grid-cols-2

//                     gap-2.5

//                     pt-1
//                   "
//                 >

//                   <a
//                     href={whatsappInquiryUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="
//                       w-full

//                       px-4
//                       py-3

//                       rounded-xl

//                       bg-emerald-500/15
//                       hover:bg-emerald-500/25

//                       border border-emerald-500/30

//                       text-emerald-300

//                       text-xs

//                       font-semibold

//                       flex
//                       items-center
//                       justify-center

//                       gap-2
//                     "
//                   >
//                     <Phone className="w-4 h-4 shrink-0" />
//                     Send via WhatsApp
//                   </a>

//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="
//                       w-full

//                       px-4
//                       py-3

//                       rounded-xl

//                       bg-gradient-to-r
//                       from-cyan-500
//                       to-blue-600

//                       hover:from-cyan-400
//                       hover:to-blue-500

//                       text-white

//                       font-semibold

//                       text-xs
//                       sm:text-sm

//                       shadow-md

//                       transition-all

//                       flex
//                       items-center
//                       justify-center

//                       gap-2

//                       disabled:opacity-50
//                     "
//                   >
//                     {submitting ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         <span>Submitting...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4" />
//                         <span>Submit Proposal Request</span>
//                       </>
//                     )}
//                   </button>

//                 </div>

//               </form>
//             )}

//           </div>
//         )}

//       </div>


//       {/* =========================================================
//           BOTTOM NAVIGATION
//           ALWAYS VISIBLE
//       ========================================================= */}
//       {!submitted && (
//         <div
//           className="
//             shrink-0

//             px-4
//             py-3

//             sm:px-6
//             sm:py-4

//             md:px-8
//             md:py-5

//             bg-[#080a10]

//             border-t border-white/10

//             pb-[calc(0.75rem+env(safe-area-inset-bottom))]
//             sm:pb-4
//           "
//         >

//           <div
//             className="
//               flex
//               items-center
//               justify-between

//               gap-3
//             "
//           >

//             {/* Previous */}
//             {step > 1 ? (
//               <button
//                 type="button"
//                 onClick={() => setStep(step - 1)}
//                 className="
//                   min-h-11

//                   px-4

//                   rounded-xl

//                   text-xs
//                   sm:text-sm

//                   font-semibold

//                   text-slate-300
//                   hover:text-white

//                   bg-white/5
//                   hover:bg-white/10

//                   border border-white/10

//                   flex
//                   items-center
//                   justify-center

//                   gap-1.5

//                   transition-colors

//                   shrink-0
//                 "
//               >
//                 <ArrowLeft className="w-4 h-4" />

//                 <span className="hidden xs:inline sm:inline">
//                   Previous
//                 </span>
//               </button>
//             ) : (
//               <div className="w-10 sm:w-20" />
//             )}


//             {/* Step counter on mobile */}
//             <span
//               className="
//                 text-[10px]
//                 text-slate-500

//                 sm:hidden

//                 whitespace-nowrap
//               "
//             >
//               {step} / 5
//             </span>


//             {/* Next */}
//             {step < 5 && (
//               <button
//                 type="button"
//                 onClick={() => setStep(step + 1)}
//                 className="
//                   min-h-11

//                   px-5

//                   rounded-xl

//                   text-xs
//                   sm:text-sm

//                   font-semibold

//                   text-white

//                   bg-gradient-to-r
//                   from-cyan-500
//                   to-blue-600

//                   hover:from-cyan-400
//                   hover:to-blue-500

//                   shadow-md

//                   flex
//                   items-center
//                   justify-center

//                   gap-1.5

//                   transition-all

//                   shrink-0
//                 "
//               >
//                 <span>
//                   Next Step
//                 </span>

//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             )}

//           </div>

//         </div>
//       )}


//       {/* =========================================================
//           SUCCESS FOOTER
//       ========================================================= */}
//       {submitted && (
//         <div
//           className="
//             shrink-0

//             px-4
//             py-3

//             sm:px-6
//             sm:py-4

//             bg-[#080a10]

//             border-t border-white/10

//             pb-[calc(0.75rem+env(safe-area-inset-bottom))]
//             sm:pb-4
//           "
//         >

//           <button
//             type="button"
//             onClick={onClose}
//             className="
//               w-full

//               min-h-11

//               px-5
//               py-3

//               rounded-xl

//               bg-white/5
//               hover:bg-white/10

//               border border-white/10

//               text-slate-300
//               hover:text-white

//               text-xs
//               sm:text-sm

//               font-semibold

//               transition-colors
//             "
//           >
//             Done
//           </button>

//         </div>
//       )}

//     </div>
//   </div>
//   );
// };



import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Send,
  Phone,
  X,
  Layers,
  Globe,
  Smartphone,
  Bot,
  Palette,
  TrendingUp,
  ShieldCheck,
  Clock,
  Loader2,
  Mail,
} from "lucide-react";
import confetti from "canvas-confetti";

import { formatPrice, generateWhatsAppUrl } from "../utils/helpers";
import {
  NICHES_DATABASE,
  CATEGORIES_LIST,
  searchNiches,
} from "../data/nichesData";

interface ProjectConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
  initialNiche?: string;
  initialServices?: string[];
  initialNotes?: string;
  currentCurrency: string;
}

interface LeadApiResponse {
  success?: boolean;
  error?: string;
  message?: string;
}

const AVAILABLE_SERVICES = [
  {
    id: "website",
    title: "High-Converting Website",
    icon: Globe,
    baseUSD: 850,
  },
  {
    id: "mobile_app",
    title: "Mobile App (iOS / Android)",
    icon: Smartphone,
    baseUSD: 1800,
  },
  {
    id: "ai_bot",
    title: "24/7 AI WhatsApp / Web Bot",
    icon: Bot,
    baseUSD: 450,
  },
  {
    id: "booking",
    title: "Real-Time Booking & Scheduling Engine",
    icon: Clock,
    baseUSD: 400,
  },
  {
    id: "branding",
    title: "Brand Identity & Design System",
    icon: Palette,
    baseUSD: 500,
  },
  {
    id: "seo_marketing",
    title: "Google Maps Local SEO & Ads Funnel",
    icon: TrendingUp,
    baseUSD: 600,
  },
  {
    id: "crm_automation",
    title: "Workflow Automation & CRM Sync",
    icon: ShieldCheck,
    baseUSD: 550,
  },
  {
    id: "cloud_infra",
    title: "Edge Cloud Infrastructure & SLA Maintenance",
    icon: Layers,
    baseUSD: 350,
  },
];

const PLATFORMS = [
  "Responsive Website",
  "Android App (Google Play)",
  "iOS App (Apple App Store)",
  "Progressive Web App (PWA)",
  "Tablet / POS Kiosk Display",
  "All Platforms (Unified Suite)",
];

const GOALS = [
  "Get Inbound Leads & Inquiries",
  "Sell Products / Direct Online Ordering",
  "Book Client Appointments & Reservations",
  "Build Strong Modern Brand Authority",
  "Automate Repetitive Daily Operations",
  "Launch New Tech / Business Venture",
];

const TIMELINES = [
  "ASAP (Rush Delivery)",
  "2–4 Weeks (Standard)",
  "1–2 Months (Phased)",
  "Flexible (Discovery First)",
];

const QUICK_NICHES = [
  "SaaS business",
  "AI automation agency",
  "AI agents",
  "Dental clinic",
  "Restaurant",
  "Cloud kitchen",
  "Tiffin service",
  "Real-estate agency",
  "Construction company",
  "Car dealership",
  "Car detailing",
  "Fitness center",
  "Solar installation",
  "E-commerce platform",
  "Dropshipping",
  "Accounting firm",
  "Digital marketing agency",
  "Plumbing",
  "Drone services",
  "Pet grooming",
];

export const ProjectConfigurator: React.FC<ProjectConfiguratorProps> = ({
  isOpen,
  onClose,
  initialNiche,
  initialServices,
  initialNotes,
  currentCurrency,
}) => {
  const [step, setStep] = useState(1);

  // Step 1
  const [niche, setNiche] = useState(initialNiche || "");
  const [businessName, setBusinessName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Step 2
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialServices && initialServices.length > 0
      ? initialServices
      : ["High-Converting Website", "24/7 AI WhatsApp / Web Bot"]
  );

  // Step 3
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "Responsive Website",
  ]);

  // Step 4
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "Get Inbound Leads & Inquiries",
  ]);

  const [timeline, setTimeline] = useState("2–4 Weeks (Standard)");

  // Contact information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("India");
  const [projectDescription, setProjectDescription] = useState(
    initialNotes || ""
  );

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Update values when props change
  useEffect(() => {
    if (initialNiche) {
      setNiche(initialNiche);
    }

    if (initialNotes) {
      setProjectDescription(initialNotes);
    }

    if (initialServices && initialServices.length > 0) {
      setSelectedServices(initialServices);
    }
  }, [initialNiche, initialNotes, initialServices]);

  // Toggle service
  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title)
        ? prev.filter((service) => service !== title)
        : [...prev, title]
    );
  };

  // Toggle platform
  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((item) => item !== platform)
        : [...prev, platform]
    );
  };

  // Toggle goal
  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((item) => item !== goal)
        : [...prev, goal]
    );
  };

  // Estimated budget
  const estimatedMinUSD = selectedServices.reduce(
    (total, serviceTitle) => {
      const service = AVAILABLE_SERVICES.find(
        (item) => item.title === serviceTitle
      );

      return total + (service ? service.baseUSD : 400);
    },
    450
  );

  const estimatedMaxUSD = Math.round(estimatedMinUSD * 1.55);

  // Submit proposal
  const handleSubmitInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage(
        "Please fill in your name, email, and phone number."
      );
      return;
    }

    setErrorMessage("");
    setSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        businessName: businessName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        country: country.trim(),
        businessNiche: niche.trim() || "General Business",
        servicesRequired: selectedServices,
        platforms: selectedPlatforms,
        goals: selectedGoals,
        timeline,
        budgetRange: `${formatPrice(
          estimatedMinUSD,
          currentCurrency
        )} – ${formatPrice(estimatedMaxUSD, currentCurrency)}`,
        projectDescription: projectDescription.trim(),
      };

      console.log("📤 Sending proposal:", payload);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Read text first so an empty/non-JSON response doesn't
      // create "Unexpected end of JSON input".
      const responseText = await res.text();

      console.log("📥 API status:", res.status);
      console.log("📥 API response:", responseText);

      let data: LeadApiResponse = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText) as LeadApiResponse;
        } catch (parseError) {
          console.error(
            "❌ API returned non-JSON response:",
            responseText,
            parseError
          );

          throw new Error(
            `Server returned ${res.status}: ${
              responseText || "Invalid response"
            }`
          );
        }
      }

      if (!res.ok) {
  console.error("❌ API ERROR DETAILS:", {
    status: res.status,
    statusText: res.statusText,
    responseText,
    data,
  });

  let serverMessage = `Server error: ${res.status}`;

  if (typeof data === "string") {
    serverMessage = data;
  } else if (data?.error) {
    serverMessage =
      typeof data.error === "string"
        ? data.error
        : JSON.stringify(data.error);
  } else if (data?.message) {
    serverMessage =
      typeof data.message === "string"
        ? data.message
        : JSON.stringify(data.message);
  } else if (responseText) {
    serverMessage = responseText;
  }

  throw new Error(serverMessage);
}

      if (data.success) {
        setSubmitted(true);

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: {
              y: 0.6,
            },
          });
        } catch (confettiError) {
          console.warn(
            "Confetti unavailable:",
            confettiError
          );
        }
      } else {
        setErrorMessage(
          data.error ||
            data.message ||
            "Failed to submit proposal. Please try again."
        );
      }
    } catch (err) {
      console.error("❌ Submission error:", err);

      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Could not connect to server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // WhatsApp URL
  const whatsappInquiryUrl = generateWhatsAppUrl(
    "+919156075536",
    `Hi Abhishek, I generated a Project Configurator roadmap for my business "${
      businessName || niche || "New Project"
    }":

- Niche: ${niche || "Not specified"}
- Services: ${selectedServices.join(", ") || "Not specified"}
- Platforms: ${selectedPlatforms.join(", ") || "Not specified"}
- Goals: ${selectedGoals.join(", ") || "Not specified"}
- Timeline: ${timeline}
- Name: ${name || "Prospective Client"}
- Email: ${email || "Not provided"}
- Phone: ${phone || "Not provided"}
- Country: ${country || "Not specified"}`
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/85 backdrop-blur-md
        animate-in fade-in duration-200
        overflow-hidden
        flex items-center justify-center
        p-0 sm:p-4 md:p-6
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          h-[100dvh]
          sm:h-auto
          sm:max-h-[94dvh]
          max-w-3xl
          bg-[#0c101c]
          border border-white/10
          sm:border-white/15
          rounded-none
          sm:rounded-3xl
          shadow-2xl
          overflow-hidden
          flex flex-col
          isolate
        "
      >
        {/* Header */}
        <div
          className="
            shrink-0
            relative
            px-4 py-4
            sm:px-6 sm:py-5
            md:px-8 md:py-6
            bg-gradient-to-r
            from-[#111728]
            to-[#0a0d16]
            border-b border-white/10
          "
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />

                <span
                  className="
                    text-[10px]
                    sm:text-xs
                    uppercase
                    font-bold
                    tracking-wider
                    text-cyan-400
                    truncate
                  "
                >
                  Interactive Project Configurator
                </span>
              </div>

              <h2
                className="
                  font-display
                  text-lg
                  sm:text-xl
                  md:text-2xl
                  font-bold
                  text-white
                  leading-tight
                  pr-2
                "
              >
                Configure Your Custom Digital Solution
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close configurator"
              className="
                shrink-0
                w-10 h-10
                sm:w-11 sm:h-11
                flex items-center justify-center
                text-slate-400
                hover:text-white
                bg-white/5
                hover:bg-white/10
                border border-white/10
                rounded-xl
                transition-colors
                active:scale-95
              "
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step indicator */}
        {!submitted && (
          <div
            className="
              shrink-0
              bg-[#080a10]
              border-b border-white/5
              px-3
              sm:px-6
              md:px-8
              py-2.5
              sm:py-3
              overflow-x-auto
              overscroll-x-contain
              scrollbar-none
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                min-w-max
                sm:min-w-0
                gap-3
                sm:gap-4
                text-[10px]
                sm:text-xs
                font-semibold
              "
            >
              <span
                className={
                  step >= 1
                    ? "text-cyan-400 whitespace-nowrap"
                    : "text-slate-400 whitespace-nowrap"
                }
              >
                1. Niche
              </span>

              <span className="text-slate-600">→</span>

              <span
                className={
                  step >= 2
                    ? "text-cyan-400 whitespace-nowrap"
                    : "text-slate-400 whitespace-nowrap"
                }
              >
                2. Services
              </span>

              <span className="text-slate-600">→</span>

              <span
                className={
                  step >= 3
                    ? "text-cyan-400 whitespace-nowrap"
                    : "text-slate-400 whitespace-nowrap"
                }
              >
                3. Platform
              </span>

              <span className="text-slate-600">→</span>

              <span
                className={
                  step >= 4
                    ? "text-cyan-400 whitespace-nowrap"
                    : "text-slate-400 whitespace-nowrap"
                }
              >
                4. Goals
              </span>

              <span className="text-slate-600">→</span>

              <span
                className={
                  step >= 5
                    ? "text-cyan-400 whitespace-nowrap"
                    : "text-slate-400 whitespace-nowrap"
                }
              >
                5. Summary
              </span>
            </div>
          </div>
        )}

        {/* Scrollable content */}
        <div
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overflow-x-hidden
            overscroll-contain
            touch-pan-y
            px-4
            py-5
            sm:px-6
            sm:py-6
            md:px-8
            md:py-8
            [-webkit-overflow-scrolling:touch]
          "
        >
          {submitted ? (
            /* Success screen */
            <div className="text-center py-4 sm:py-8 space-y-5">
              <div
                className="
                  w-14 h-14
                  sm:w-16 sm:h-16
                  rounded-2xl
                  bg-emerald-500/20
                  border border-emerald-500/40
                  text-emerald-400
                  flex items-center justify-center
                  mx-auto
                  shadow-lg
                  shadow-emerald-500/10
                "
              >
                <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>

              <div>
                <div
                  className="
                    inline-flex
                    max-w-full
                    items-center
                    gap-1.5
                    px-3
                    py-1
                    rounded-full
                    bg-cyan-500/15
                    border border-cyan-500/30
                    text-cyan-300
                    text-[10px]
                    sm:text-xs
                    font-semibold
                  "
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />

                  <span className="truncate">
                    Proposal submitted successfully
                  </span>
                </div>

                <h3
                  className="
                    font-display
                    text-xl
                    sm:text-2xl
                    md:text-3xl
                    font-extrabold
                    text-white
                    mt-2
                    leading-tight
                  "
                >
                  Project Roadmap Received!
                </h3>
              </div>

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-slate-300
                  max-w-lg
                  mx-auto
                  leading-relaxed
                "
              >
                Thank you, <strong>{name}</strong>! Your complete digital
                roadmap has been securely recorded and routed to Abhishek.
                We will review your scope and provide a structured plan
                within 24 hours.
              </p>

              {/* Success summary */}
              <div
                className="
                  p-4
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  text-left
                  text-xs
                  space-y-3
                  overflow-hidden
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:justify-between
                    gap-2
                    pb-3
                    border-b border-white/5
                    text-[10px]
                    text-cyan-400
                    font-bold
                    uppercase
                    tracking-wider
                  "
                >
                  <span>Roadmap Summary</span>

                  <span className="break-all text-slate-400">
                    Proposal Ready
                  </span>
                </div>

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    gap-2
                  "
                >
                  <div className="break-words">
                    <strong className="text-slate-400">
                      Client:
                    </strong>{" "}
                    {name} ({country || "Global"})
                  </div>

                  <div className="break-words">
                    <strong className="text-slate-400">
                      Business:
                    </strong>{" "}
                    {businessName || niche}
                  </div>

                  <div className="break-all">
                    <strong className="text-slate-400">
                      Phone:
                    </strong>{" "}
                    {phone}
                  </div>

                  <div className="break-all">
                    <strong className="text-slate-400">
                      Email:
                    </strong>{" "}
                    {email}
                  </div>
                </div>

                <div className="break-words">
                  <strong className="text-slate-400">
                    Services:
                  </strong>{" "}
                  {selectedServices.join(", ")}
                </div>

                <div className="break-words">
                  <strong className="text-slate-400">
                    Platforms:
                  </strong>{" "}
                  {selectedPlatforms.join(", ")}
                </div>

                <div className="break-words">
                  <strong className="text-slate-400">
                    Goals:
                  </strong>{" "}
                  {selectedGoals.join(", ")}
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-2 border-t border-white/5">
                  <div>
                    <strong className="text-slate-400">
                      Timeline:
                    </strong>{" "}
                    {timeline}
                  </div>

                  <div
                    className="
                      text-emerald-400
                      font-bold
                      font-mono
                      text-sm
                    "
                  >
                    {formatPrice(
                      estimatedMinUSD,
                      currentCurrency
                    )}
                    {" – "}
                    {formatPrice(
                      estimatedMaxUSD,
                      currentCurrency
                    )}
                  </div>
                </div>
              </div>

              {/* Success buttons */}
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-2.5
                  pt-2
                "
              >
                <a
                  href={`mailto:abhishekkuntare02@gmail.com?subject=${encodeURIComponent(
                    `🚀 [Project Roadmap] ${
                      businessName || niche || "New Project"
                    } - ${name}`
                  )}&body=${encodeURIComponent(
                    `Hi Abhishek,

I just submitted a Project Roadmap on your website:

- Name: ${name}
- Business: ${businessName || niche}
- Email: ${email}
- Phone/WhatsApp: ${phone}
- Country: ${country}
- Industry: ${niche}
- Selected Services: ${selectedServices.join(", ")}
- Target Platforms: ${selectedPlatforms.join(", ")}
- Primary Goals: ${selectedGoals.join(", ")}
- Estimated Budget: ${formatPrice(
                      estimatedMinUSD,
                      currentCurrency
                    )} – ${formatPrice(
                      estimatedMaxUSD,
                      currentCurrency
                    )}
- Target Timeline: ${timeline}

Project Notes:
${projectDescription || "None"}
`
                  )}`}
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    bg-cyan-500/15
                    hover:bg-cyan-500/25
                    border border-cyan-500/30
                    text-cyan-300
                    text-xs
                    sm:text-sm
                    font-semibold
                    flex items-center
                    justify-center
                    gap-2
                    transition-all
                  "
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>Open Mail App</span>
                </a>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    bg-emerald-500
                    hover:bg-emerald-400
                    text-black
                    font-semibold
                    text-xs
                    sm:text-sm
                    flex items-center
                    justify-center
                    gap-2
                    shadow-lg
                    transition-all
                  "
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            /* Normal configurator */
            <div>
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h3
                      className="
                        font-display
                        text-lg
                        sm:text-xl
                        font-bold
                        text-white
                        mb-1
                      "
                    >
                      Step 1: What is your business niche?
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400">
                      Select or search your industry across 20 categories
                      and 320+ niches.
                    </p>
                  </div>

                  {/* Niche input */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Business Niche or Industry *
                    </label>

                    <input
                      type="text"
                      value={niche}
                      onFocus={() => setShowSuggestions(true)}
                      onChange={(e) => {
                        setNiche(e.target.value);
                        setShowSuggestions(true);
                      }}
                      placeholder="Type your niche..."
                      className="
                        w-full
                        px-3.5
                        py-3
                        bg-white/5
                        border
                        border-white/10
                        focus:border-cyan-500
                        rounded-xl
                        text-sm
                        text-white
                        placeholder-slate-500
                        focus:outline-none
                        transition-colors
                      "
                    />

                    {/* Suggestions */}
                    {showSuggestions && niche.trim().length > 1 && (
                      <div
                        className="
                          absolute
                          top-full
                          left-0
                          right-0
                          mt-1.5
                          bg-[#0d1222]
                          border
                          border-cyan-500/30
                          rounded-xl
                          shadow-2xl
                          p-2
                          z-50
                          max-h-52
                          overflow-y-auto
                        "
                      >
                        <div
                          className="
                            text-[10px]
                            uppercase
                            font-bold
                            text-slate-400
                            px-2
                            py-1
                            flex
                            justify-between
                            gap-2
                          "
                        >
                          <span>Matching Niches</span>

                          <button
                            type="button"
                            onClick={() =>
                              setShowSuggestions(false)
                            }
                            className="text-cyan-400 hover:underline shrink-0"
                          >
                            Close
                          </button>
                        </div>

                        {searchNiches(niche)
                          .slice(0, 8)
                          .map((matched) => (
                            <button
                              key={matched.id}
                              type="button"
                              onClick={() => {
                                setNiche(matched.name);
                                setShowSuggestions(false);
                              }}
                              className="
                                w-full
                                text-left
                                px-3
                                py-2.5
                                rounded-lg
                                hover:bg-cyan-500/10
                                transition-colors
                                flex
                                items-center
                                justify-between
                                gap-2
                              "
                            >
                              <span className="text-xs font-semibold text-white truncate">
                                {matched.name}
                              </span>

                              <span
                                className="
                                  text-[10px]
                                  px-2
                                  py-0.5
                                  rounded
                                  bg-white/5
                                  text-slate-400
                                  border border-white/10
                                  shrink-0
                                "
                              >
                                {matched.category}
                              </span>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Business name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Business / Brand Name (Optional)
                    </label>

                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) =>
                        setBusinessName(e.target.value)
                      }
                      placeholder="e.g. Apex Health Group"
                      className="
                        w-full
                        px-3.5
                        py-3
                        bg-white/5
                        border border-white/10
                        focus:border-cyan-500
                        focus:outline-none
                        rounded-xl
                        text-sm
                        text-white
                        placeholder-slate-500
                      "
                    />
                  </div>

                  {/* Categories */}
                  <div className="pt-3 border-t border-white/5">
                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-2
                        mb-3
                      "
                    >
                      <span
                        className="
                          text-[11px]
                          font-semibold
                          text-slate-400
                          uppercase
                          tracking-wider
                        "
                      >
                        Browse by Category
                      </span>

                      <select
                        value={selectedCategory}
                        onChange={(e) =>
                          setSelectedCategory(e.target.value)
                        }
                        className="
                          w-full
                          sm:w-auto
                          bg-white/10
                          text-cyan-300
                          text-xs
                          rounded-lg
                          px-2.5
                          py-2
                          border border-white/10
                          focus:outline-none
                          cursor-pointer
                        "
                      >
                        <option
                          value="all"
                          className="bg-slate-900 text-white"
                        >
                          All Categories
                        </option>

                        {CATEGORIES_LIST.map((cat) => (
                          <option
                            key={cat.id}
                            value={cat.id}
                            className="bg-slate-900 text-white"
                          >
                            {cat.name} ({cat.nichesCount})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-1.5
                        max-h-40
                        overflow-y-auto
                        overscroll-contain
                        pr-1
                      "
                    >
                      {(selectedCategory === "all"
                        ? QUICK_NICHES
                        : NICHES_DATABASE.filter((item) => {
                            const category =
                              CATEGORIES_LIST.find(
                                (cat) =>
                                  cat.id === selectedCategory
                              );

                            return category
                              ? item.category.toLowerCase() ===
                                  category.name.toLowerCase()
                              : true;
                          }).map((item) => item.name)
                      ).map((itemNiche) => (
                        <button
                          key={itemNiche}
                          type="button"
                          onClick={() => {
                            setNiche(itemNiche);
                            setShowSuggestions(false);
                          }}
                          className={`
                            text-xs
                            px-2.5
                            py-1.5
                            rounded-lg
                            border
                            transition-colors
                            ${
                              niche.toLowerCase() ===
                              itemNiche.toLowerCase()
                                ? "bg-cyan-500/25 border-cyan-400 text-cyan-300 font-semibold"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                            }
                          `}
                        >
                          {itemNiche}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1">
                      Step 2: What digital capabilities do you need?
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400">
                      Select all modules you'd like engineered into your
                      digital solution.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {AVAILABLE_SERVICES.map((service) => {
                      const isChecked = selectedServices.includes(
                        service.title
                      );

                      const Icon = service.icon;

                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() =>
                            toggleService(service.title)
                          }
                          className={`
                            w-full
                            text-left
                            p-3.5
                            rounded-xl
                            border
                            transition-all
                            flex
                            items-start
                            gap-3
                            ${
                              isChecked
                                ? "bg-cyan-500/15 border-cyan-400 shadow-md shadow-cyan-500/10"
                                : "bg-white/5 border-white/10 hover:border-white/20"
                            }
                          `}
                        >
                          <div
                            className={`
                              p-2
                              rounded-lg
                              shrink-0
                              ${
                                isChecked
                                  ? "bg-cyan-500 text-black"
                                  : "bg-white/10 text-cyan-400"
                              }
                            `}
                          >
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-white block break-words">
                              {service.title}
                            </span>

                            <span className="text-[10px] text-cyan-300 mt-0.5 block">
                              from{" "}
                              {formatPrice(
                                service.baseUSD,
                                currentCurrency
                              )}
                            </span>
                          </div>

                          <div
                            className={`
                              w-4
                              h-4
                              rounded-full
                              border
                              flex
                              items-center
                              justify-center
                              mt-1
                              shrink-0
                              ${
                                isChecked
                                  ? "bg-cyan-500 border-cyan-500 text-black text-[10px]"
                                  : "border-white/20"
                              }
                            `}
                          >
                            {isChecked && "✓"}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1">
                      Step 3: Which target platforms do you require?
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400">
                      We support web, mobile app stores, PWAs, and internal
                      displays.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PLATFORMS.map((platform) => {
                      const isSelected =
                        selectedPlatforms.includes(platform);

                      return (
                        <button
                          key={platform}
                          type="button"
                          onClick={() =>
                            togglePlatform(platform)
                          }
                          className={`
                            w-full
                            p-4
                            rounded-xl
                            border
                            transition-all
                            flex
                            items-center
                            justify-between
                            gap-3
                            text-left
                            ${
                              isSelected
                                ? "bg-cyan-500/15 border-cyan-400 shadow-md"
                                : "bg-white/5 border-white/10 hover:border-white/20"
                            }
                          `}
                        >
                          <span className="text-xs font-bold text-white">
                            {platform}
                          </span>

                          <span
                            className={`
                              w-4
                              h-4
                              rounded-full
                              border
                              flex
                              items-center
                              justify-center
                              shrink-0
                              ${
                                isSelected
                                  ? "bg-cyan-500 border-cyan-500 text-black text-[10px]"
                                  : "border-white/20"
                              }
                            `}
                          >
                            {isSelected && "✓"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1">
                      Step 4: Primary Goals & Delivery Timeline
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400">
                      Align the architecture around your exact business
                      KPIs.
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-300 block mb-2">
                      Select Primary Goals:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {GOALS.map((goal) => {
                        const isChecked =
                          selectedGoals.includes(goal);

                        return (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => toggleGoal(goal)}
                            className={`
                              p-3
                              rounded-lg
                              text-xs
                              font-medium
                              text-left
                              border
                              transition-colors
                              flex
                              items-center
                              justify-between
                              gap-3
                              ${
                                isChecked
                                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                              }
                            `}
                          >
                            <span>{goal}</span>

                            {isChecked && (
                              <span className="text-cyan-400 shrink-0">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-300 block mb-2">
                      Target Timeline:
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {TIMELINES.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setTimeline(item)}
                          className={`
                            p-3
                            rounded-lg
                            text-xs
                            font-semibold
                            border
                            text-center
                            transition-colors
                            ${
                              timeline === item
                                ? "bg-cyan-500 border-cyan-500 text-black"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                            }
                          `}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <form
                  onSubmit={handleSubmitInquiry}
                  className="space-y-5 sm:space-y-6 animate-in fade-in duration-150"
                >
                  {/* Roadmap summary */}
                  <div
                    className="
                      p-4
                      sm:p-5
                      rounded-2xl
                      bg-[#111728]
                      border border-cyan-500/30
                      space-y-3
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-3
                        pb-3
                        border-b border-white/10
                      "
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-cyan-400">
                          Roadmap Specification
                        </span>

                        <h4 className="text-sm sm:text-base font-bold text-white break-words">
                          {businessName
                            ? `${businessName} (${niche})`
                            : niche || "Digital Growth Project"}
                        </h4>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-[10px] text-slate-400 block">
                          Estimated Budget
                        </span>

                        <span className="text-sm font-mono font-bold text-emerald-400">
                          {formatPrice(
                            estimatedMinUSD,
                            currentCurrency
                          )}
                          {" – "}
                          {formatPrice(
                            estimatedMaxUSD,
                            currentCurrency
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 space-y-2">
                      <div className="break-words">
                        <strong>Services:</strong>{" "}
                        {selectedServices.join(", ") || "Custom"}
                      </div>

                      <div className="break-words">
                        <strong>Platforms:</strong>{" "}
                        {selectedPlatforms.join(", ") ||
                          "Not specified"}
                      </div>

                      <div className="break-words">
                        <strong>Goals:</strong>{" "}
                        {selectedGoals.join(", ") ||
                          "Not specified"}
                      </div>

                      <div>
                        <strong>Target Timeline:</strong>{" "}
                        {timeline}
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Where should we send your formal proposal?
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Your Name *
                        </label>

                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) =>
                            setName(e.target.value)
                          }
                          placeholder="Full Name"
                          className="
                            w-full
                            px-3
                            py-2.5
                            bg-white/5
                            border border-white/10
                            focus:border-cyan-500
                            focus:outline-none
                            rounded-xl
                            text-xs
                            text-white
                            placeholder-slate-500
                          "
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Work Email *
                        </label>

                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          placeholder="name@company.com"
                          className="
                            w-full
                            px-3
                            py-2.5
                            bg-white/5
                            border border-white/10
                            focus:border-cyan-500
                            focus:outline-none
                            rounded-xl
                            text-xs
                            text-white
                            placeholder-slate-500
                          "
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Phone / WhatsApp *
                        </label>

                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) =>
                            setPhone(e.target.value)
                          }
                          placeholder="+91 98200 00000"
                          className="
                            w-full
                            px-3
                            py-2.5
                            bg-white/5
                            border border-white/10
                            focus:border-cyan-500
                            focus:outline-none
                            rounded-xl
                            text-xs
                            text-white
                            placeholder-slate-500
                          "
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Country
                        </label>

                        <input
                          type="text"
                          value={country}
                          onChange={(e) =>
                            setCountry(e.target.value)
                          }
                          placeholder="India, USA, UAE..."
                          className="
                            w-full
                            px-3
                            py-2.5
                            bg-white/5
                            border border-white/10
                            focus:border-cyan-500
                            focus:outline-none
                            rounded-xl
                            text-xs
                            text-white
                            placeholder-slate-500
                          "
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Additional Project Details or Notes
                      </label>

                      <textarea
                        rows={3}
                        value={projectDescription}
                        onChange={(e) =>
                          setProjectDescription(
                            e.target.value
                          )
                        }
                        placeholder="Any existing website link or specific features required..."
                        className="
                          w-full
                          px-3
                          py-2.5
                          bg-white/5
                          border border-white/10
                          focus:border-cyan-500
                          focus:outline-none
                          rounded-xl
                          text-xs
                          text-white
                          placeholder-slate-500
                          resize-none
                        "
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {errorMessage && (
                    <div
                      className="
                        p-3
                        rounded-lg
                        bg-rose-500/10
                        border border-rose-500/20
                        text-rose-300
                        text-xs
                      "
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* Step 5 actions */}
                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      gap-2.5
                      pt-1
                    "
                  >
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        bg-emerald-500/15
                        hover:bg-emerald-500/25
                        border border-emerald-500/30
                        text-emerald-300
                        text-xs
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      Send via WhatsApp
                    </a>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-600
                        hover:from-cyan-400
                        hover:to-blue-500
                        text-white
                        font-semibold
                        text-xs
                        sm:text-sm
                        shadow-md
                        transition-all
                        flex
                        items-center
                        justify-center
                        gap-2
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                      "
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Proposal Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Bottom navigation */}
        {!submitted && (
          <div
            className="
              shrink-0
              px-4
              py-3
              sm:px-6
              sm:py-4
              md:px-8
              md:py-5
              bg-[#080a10]
              border-t border-white/10
              pb-[calc(0.75rem+env(safe-area-inset-bottom))]
              sm:pb-4
            "
          >
            <div className="flex items-center justify-between gap-3">
              {/* Previous */}
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage("");
                    setStep((currentStep) =>
                      Math.max(1, currentStep - 1)
                    );
                  }}
                  className="
                    min-h-11
                    px-4
                    rounded-xl
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-slate-300
                    hover:text-white
                    bg-white/5
                    hover:bg-white/10
                    border border-white/10
                    flex items-center
                    justify-center
                    gap-1.5
                    transition-colors
                    shrink-0
                  "
                >
                  <ArrowLeft className="w-4 h-4" />

                  <span className="hidden sm:inline">
                    Previous
                  </span>
                </button>
              ) : (
                <div className="w-10 sm:w-20" />
              )}

              {/* Mobile counter */}
              <span
                className="
                  text-[10px]
                  text-slate-500
                  sm:hidden
                  whitespace-nowrap
                "
              >
                {step} / 5
              </span>

              {/* Next */}
              {step < 5 && (
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage("");
                    setStep((currentStep) =>
                      Math.min(5, currentStep + 1)
                    );
                  }}
                  className="
                    min-h-11
                    px-5
                    rounded-xl
                    text-xs
                    sm:text-sm
                    font-semibold
                    text-white
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    hover:from-cyan-400
                    hover:to-blue-500
                    shadow-md
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    transition-all
                    shrink-0
                  "
                >
                  <span>Next Step</span>

                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Success footer */}
        {submitted && (
          <div
            className="
              shrink-0
              px-4
              py-3
              sm:px-6
              sm:py-4
              bg-[#080a10]
              border-t border-white/10
              pb-[calc(0.75rem+env(safe-area-inset-bottom))]
              sm:pb-4
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                w-full
                min-h-11
                px-5
                py-3
                rounded-xl
                bg-white/5
                hover:bg-white/10
                border border-white/10
                text-slate-300
                hover:text-white
                text-xs
                sm:text-sm
                font-semibold
                transition-colors
              "
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectConfigurator;