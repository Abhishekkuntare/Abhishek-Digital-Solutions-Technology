// import React, { useEffect, useRef, useState } from "react";
// import {
//   ArrowUpRight,
//   ExternalLink,
//   Github,
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   Monitor,
//   Layers3,
//   MousePointer2,
//   CircleDot,
// } from "lucide-react";

// interface Project {
//   id: string;
//   title: string;
//   subtitle: string;
//   category: string;
//   description: string;
//   url: string;
//   github?: string;
//   tags: string[];
//   accent: "cyan" | "blue";
//   icon: React.ElementType;
//   number: string;
// }

// const PROJECTS: Project[] = [
//   {
//     id: "comfortpro",
//     number: "01",
//     title: "ComfortPro HVAC",
//     subtitle: "Premium HVAC Service Experience",
//     category: "Business • Service",
//     description:
//       "A modern conversion-focused HVAC platform built to turn local visitors into calls, quote requests and service bookings.",
//     url: "https://hvac-service-omega.vercel.app/",
//     github: "https://github.com/Abhishekkuntare/HVAC-Service",
//     tags: [
//       "Responsive UI",
//       "Local Business",
//       "Service Booking",
//       "Conversion UX",
//     ],
//     accent: "cyan",
//     icon: Monitor,
//   },

//   {
//     id: "soleva",
//     number: "02",
//     title: "SOLEVA",
//     subtitle: "Future Wear",
//     category: "E-commerce • Fashion",
//     description:
//       "A cinematic futuristic footwear shopping experience designed around premium product presentation and immersive interactions.",
//     url: "https://soleva-premium-futuristic-footwear.vercel.app/",
//     tags: [
//       "E-commerce",
//       "Product Experience",
//       "Futuristic UI",
//       "Motion Design",
//     ],
//     accent: "blue",
//     icon: Sparkles,
//   },

//   {
//     id: "krishimitra",
//     number: "03",
//     title: "KrishiMitra AI",
//     subtitle: "AI for Smarter Farming",
//     category: "AI • Agriculture",
//     description:
//       "An interactive agricultural AI platform bringing crop recommendations, disease assistance, agricultural intelligence and voice interaction together.",
//     url: "https://krishi-mitra-ai-three.vercel.app/",
//     tags: [
//       "AI Platform",
//       "Agriculture",
//       "Voice Interaction",
//       "Smart UX",
//     ],
//     accent: "cyan",
//     icon: Layers3,
//   },

//   {
//     id: "ambamotors",
//     number: "04",
//     title: "Amba Motors",
//     subtitle: "Smart Automotive Service",
//     category: "Automotive • Services",
//     description:
//       "A modern automotive service platform designed around service discovery, bookings, customer enquiries and direct communication.",
//     url: "https://amba-motors-ten.vercel.app/",
//     tags: [
//       "Automotive",
//       "Service Booking",
//       "Customer UX",
//       "Business Website",
//     ],
//     accent: "blue",
//     icon: Monitor,
//   },

//   {
//     id: "fifa",
//     number: "05",
//     title: "FIFA Pixar Universe",
//     subtitle: "Cinematic Football Experience",
//     category: "3D • Interactive",
//     description:
//       "A cinematic AAA-inspired FIFA World Cup experience combining immersive visuals, interactive storytelling and modern web technology.",
//     url: "https://fifa-black-eta.vercel.app/",
//     github: "https://github.com/Abhishekkuntare/FIFA",
//     tags: [
//       "3D Experience",
//       "Interactive",
//       "Cinematic UI",
//       "WebGL",
//     ],
//     accent: "cyan",
//     icon: Sparkles,
//   },
// ];

// export default function OurWork() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   const [mousePosition, setMousePosition] = useState({
//     x: 0,
//     y: 0,
//   });

//   const previewRef = useRef<HTMLDivElement>(null);

//   const activeProject = PROJECTS[activeIndex];

//   /*
//    * Automatic project rotation.
//    *
//    * Pauses while user interacts with the showcase.
//    */
//   useEffect(() => {
//     if (isPaused) return;

//     const timer = window.setInterval(() => {
//       setActiveIndex((current) =>
//         current === PROJECTS.length - 1 ? 0 : current + 1
//       );
//     }, 6500);

//     return () => window.clearInterval(timer);
//   }, [isPaused]);

//   /*
//    * Mouse based 3D movement.
//    */
//   const handleMouseMove = (
//     event: React.MouseEvent<HTMLDivElement>
//   ) => {
//     if (!previewRef.current) return;

//     const rect =
//       previewRef.current.getBoundingClientRect();

//     const x =
//       ((event.clientX - rect.left) / rect.width - 0.5) * 2;

//     const y =
//       ((event.clientY - rect.top) / rect.height - 0.5) * 2;

//     setMousePosition({
//       x,
//       y,
//     });
//   };

//   const handleMouseLeave = () => {
//     setMousePosition({
//       x: 0,
//       y: 0,
//     });
//   };

//   const nextProject = () => {
//     setActiveIndex((current) =>
//       current === PROJECTS.length - 1 ? 0 : current + 1
//     );
//   };

//   const previousProject = () => {
//     setActiveIndex((current) =>
//       current === 0 ? PROJECTS.length - 1 : current - 1
//     );
//   };

//   return (
//     <section
//       id="our-work"
//       className="
//         relative
//         w-full
//         overflow-hidden
//         py-24
//         sm:py-32
//       "
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       {/* =================================================
//           BACKGROUND ATMOSPHERE
//       ================================================= */}

//       <div className="absolute inset-0 pointer-events-none">

//         {/* Main cyan glow */}
//         <div
//           className="
//             absolute
//             left-[15%]
//             top-[20%]
//             w-[420px]
//             h-[420px]
//             rounded-full
//             bg-cyan-500/[0.055]
//             blur-[120px]
//           "
//         />

//         {/* Blue glow */}
//         <div
//           className="
//             absolute
//             right-[5%]
//             bottom-[10%]
//             w-[500px]
//             h-[500px]
//             rounded-full
//             bg-blue-600/[0.045]
//             blur-[140px]
//           "
//         />

//         {/* Grid */}
//         <div className="absolute inset-0 our-work-grid" />

//         {/* Top light line */}
//         <div
//           className="
//             absolute
//             top-0
//             left-1/2
//             -translate-x-1/2
//             w-[70%]
//             h-px
//             bg-gradient-to-r
//             from-transparent
//             via-cyan-400/30
//             to-transparent
//           "
//         />
//       </div>


//       {/* =================================================
//           CONTENT
//       ================================================= */}

//       <div
//         className="
//           relative
//           z-10
//           max-w-7xl
//           mx-auto
//           px-4
//           sm:px-6
//           lg:px-8
//         "
//       >

//         {/* =================================================
//             SECTION HEADER
//         ================================================= */}

//         <div className="max-w-3xl mb-12 sm:mb-16">

//           <div
//             className="
//               inline-flex
//               items-center
//               gap-2
//               px-3
//               py-1.5
//               rounded-full
//               border
//               border-cyan-400/20
//               bg-cyan-400/[0.06]
//               text-cyan-300
//               text-[10px]
//               sm:text-xs
//               font-semibold
//               uppercase
//               tracking-[0.18em]
//               mb-5
//               our-work-label
//             "
//           >
//             <span
//               className="
//                 w-1.5
//                 h-1.5
//                 rounded-full
//                 bg-cyan-400
//                 shadow-[0_0_10px_rgba(34,211,238,.8)]
//                 animate-pulse
//               "
//             />

//             Selected Work
//           </div>


//           <h2
//             className="
//               text-4xl
//               sm:text-5xl
//               lg:text-6xl
//               font-black
//               tracking-[-0.04em]
//               text-white
//               leading-[0.98]
//             "
//           >
//             We don't just
//             <span
//               className="
//                 block
//                 bg-gradient-to-r
//                 from-cyan-300
//                 via-cyan-400
//                 to-blue-500
//                 bg-clip-text
//                 text-transparent
//               "
//             >
//               build websites.
//             </span>
//           </h2>


//           <p
//             className="
//               mt-5
//               text-sm
//               sm:text-base
//               text-slate-400
//               leading-relaxed
//               max-w-2xl
//             "
//           >
//             We build digital experiences designed to make people
//             stop, explore, interact and remember.
//           </p>

//         </div>


//         {/* =================================================
//             MAIN SHOWCASE
//         ================================================= */}

//         <div
//           className="
//             grid
//             lg:grid-cols-[270px_1fr]
//             gap-5
//             lg:gap-7
//             items-stretch
//           "
//         >

//           {/* =================================================
//               PROJECT SELECTOR
//           ================================================= */}

//           <div
//             className="
//               relative
//               rounded-2xl
//               border
//               border-white/[0.08]
//               bg-white/[0.025]
//               backdrop-blur-xl
//               p-2
//               flex
//               lg:flex-col
//               gap-1.5
//               overflow-hidden
//             "
//           >

//             {/* Selector glow */}
//             <div
//               className="
//                 absolute
//                 top-0
//                 left-0
//                 w-full
//                 h-20
//                 bg-cyan-400/[0.035]
//                 blur-2xl
//                 pointer-events-none
//               "
//             />

//             {PROJECTS.map((project, index) => {
//               const isActive = index === activeIndex;
//               const Icon = project.icon;

//               return (
//                 <button
//                   key={project.id}
//                   onClick={() => setActiveIndex(index)}
//                   className={`
//                     project-selector
//                     relative
//                     flex
//                     items-center
//                     gap-3
//                     text-left
//                     rounded-xl
//                     px-3
//                     py-3
//                     sm:py-3.5
//                     transition-all
//                     duration-500
//                     shrink-0
//                     lg:w-full

//                     ${
//                       isActive
//                         ? `
//                           bg-cyan-400/[0.09]
//                           border
//                           border-cyan-400/20
//                         `
//                         : `
//                           border
//                           border-transparent
//                           hover:bg-white/[0.035]
//                           hover:border-white/[0.07]
//                         `
//                     }
//                   `}
//                 >

//                   {/* Number */}
//                   <span
//                     className={`
//                       font-mono
//                       text-[9px]
//                       w-6
//                       ${
//                         isActive
//                           ? "text-cyan-300"
//                           : "text-slate-600"
//                       }
//                     `}
//                   >
//                     {project.number}
//                   </span>


//                   {/* Icon */}
//                   <div
//                     className={`
//                       w-8
//                       h-8
//                       rounded-lg
//                       flex
//                       items-center
//                       justify-center
//                       transition-all
//                       duration-500

//                       ${
//                         isActive
//                           ? `
//                             bg-cyan-400
//                             text-slate-950
//                             shadow-[0_0_20px_rgba(34,211,238,.2)]
//                           `
//                           : `
//                             bg-white/[0.05]
//                             text-slate-500
//                           `
//                       }
//                     `}
//                   >
//                     <Icon className="w-4 h-4" />
//                   </div>


//                   {/* Name */}
//                   <div className="min-w-0 hidden sm:block lg:block">

//                     <div
//                       className={`
//                         text-xs
//                         font-bold
//                         truncate
//                         ${
//                           isActive
//                             ? "text-white"
//                             : "text-slate-400"
//                         }
//                       `}
//                     >
//                       {project.title}
//                     </div>

//                     <div
//                       className="
//                         text-[9px]
//                         text-slate-600
//                         mt-0.5
//                         truncate
//                       "
//                     >
//                       {project.category}
//                     </div>

//                   </div>


//                   {/* Active indicator */}
//                   {isActive && (
//                     <span
//                       className="
//                         absolute
//                         right-2
//                         w-1
//                         h-1
//                         rounded-full
//                         bg-cyan-300
//                         shadow-[0_0_10px_rgba(34,211,238,.9)]
//                       "
//                     />
//                   )}

//                 </button>
//               );
//             })}

//           </div>


//           {/* =================================================
//               FEATURED PROJECT
//           ================================================= */}

//           <div
//             className="
//               relative
//               min-w-0
//             "
//           >

//             {/* Browser / Project frame */}
//             <div
//               ref={previewRef}
//               onMouseMove={handleMouseMove}
//               onMouseLeave={handleMouseLeave}
//               className="
//                 relative
//                 group
//                 rounded-2xl
//                 sm:rounded-3xl
//                 border
//                 border-white/[0.10]
//                 bg-[#080c14]
//                 p-2
//                 sm:p-3
//                 shadow-2xl
//                 shadow-black/30
//                 transition-transform
//                 duration-500
//                 ease-out
//               "
//               style={{
//                 transform: `
//                   perspective(1600px)
//                   rotateX(${mousePosition.y * -1.3}deg)
//                   rotateY(${mousePosition.x * 1.8}deg)
//                 `,
//               }}
//             >

//               {/* Outer glow */}
//               <div
//                 className="
//                   absolute
//                   -inset-px
//                   rounded-3xl
//                   bg-gradient-to-br
//                   from-cyan-400/20
//                   via-transparent
//                   to-blue-500/20
//                   opacity-0
//                   group-hover:opacity-100
//                   transition-opacity
//                   duration-700
//                   pointer-events-none
//                 "
//               />


//               {/* Browser top bar */}
//               <div
//                 className="
//                   relative
//                   h-9
//                   sm:h-10
//                   flex
//                   items-center
//                   px-2
//                   sm:px-3
//                   rounded-t-xl
//                   bg-[#0d121c]
//                   border-b
//                   border-white/[0.06]
//                 "
//               >

//                 {/* Traffic lights */}
//                 <div className="flex gap-1.5">

//                   <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
//                   <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
//                   <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />

//                 </div>


//                 {/* Address bar */}
//                 <div
//                   className="
//                     absolute
//                     left-1/2
//                     -translate-x-1/2
//                     w-[48%]
//                     hidden
//                     sm:flex
//                     items-center
//                     justify-center
//                     gap-1.5
//                     h-6
//                     rounded-md
//                     bg-white/[0.035]
//                     border
//                     border-white/[0.05]
//                   "
//                 >
//                   <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70" />

//                   <span
//                     className="
//                       text-[8px]
//                       text-slate-600
//                       font-mono
//                       truncate
//                     "
//                   >
//                     {activeProject.url.replace("https://", "")}
//                   </span>
//                 </div>


//                 <div className="ml-auto">
//                   <Monitor className="w-3.5 h-3.5 text-slate-600" />
//                 </div>

//               </div>


//               {/* =================================================
//                   LIVE PREVIEW
//               ================================================= */}

//               <div
//                 key={activeProject.id}
//                 className="
//                   relative
//                   overflow-hidden
//                   rounded-b-xl
//                   bg-[#05080d]
//                   project-preview-enter
//                 "
//               >

//                 {/* Live website */}
//                 <iframe
//                   title={activeProject.title}
//                   src={activeProject.url}
//                   loading="lazy"
//                   className="
//                     block
//                     w-full
//                     h-[330px]
//                     sm:h-[430px]
//                     lg:h-[500px]
//                     border-0
//                     bg-white
//                   "
//                   sandbox="
//                     allow-forms
//                     allow-modals
//                     allow-popups
//                     allow-presentation
//                     allow-same-origin
//                     allow-scripts
//                   "
//                 />


//                 {/* Dark cinematic overlay */}
//                 <div
//                   className="
//                     absolute
//                     inset-0
//                     pointer-events-none
//                     bg-gradient-to-t
//                     from-[#05080d]/60
//                     via-transparent
//                     to-transparent
//                   "
//                 />


//                 {/* Scanning line */}
//                 <div className="project-scanline" />


//                 {/* Corner focus brackets */}
//                 <div
//                   className="
//                     absolute
//                     top-4
//                     left-4
//                     w-7
//                     h-7
//                     border-l
//                     border-t
//                     border-cyan-400/40
//                     pointer-events-none
//                   "
//                 />

//                 <div
//                   className="
//                     absolute
//                     bottom-4
//                     right-4
//                     w-7
//                     h-7
//                     border-r
//                     border-b
//                     border-cyan-400/40
//                     pointer-events-none
//                   "
//                 />


//                 {/* Live label */}
//                 <div
//                   className="
//                     absolute
//                     left-4
//                     bottom-4
//                     flex
//                     items-center
//                     gap-2
//                     px-2.5
//                     py-1.5
//                     rounded-full
//                     bg-black/65
//                     backdrop-blur-md
//                     border
//                     border-white/10
//                   "
//                 >
//                   <span
//                     className="
//                       w-1.5
//                       h-1.5
//                       rounded-full
//                       bg-emerald-400
//                       shadow-[0_0_10px_rgba(52,211,153,.9)]
//                       animate-pulse
//                     "
//                   />

//                   <span
//                     className="
//                       text-[9px]
//                       font-bold
//                       uppercase
//                       tracking-wider
//                       text-slate-300
//                     "
//                   >
//                     Live Experience
//                   </span>
//                 </div>

//               </div>

//             </div>


//             {/* =================================================
//                 PROJECT INFORMATION
//             ================================================= */}

//             <div
//               key={`info-${activeProject.id}`}
//               className="
//                 mt-6
//                 grid
//                 md:grid-cols-[1fr_auto]
//                 gap-5
//                 items-end
//                 project-info-enter
//               "
//             >

//               <div>

//                 {/* Category */}
//                 <div
//                   className="
//                     flex
//                     items-center
//                     gap-2
//                     mb-2
//                   "
//                 >
//                   <CircleDot
//                     className="
//                       w-3
//                       h-3
//                       text-cyan-400
//                     "
//                   />

//                   <span
//                     className="
//                       text-[10px]
//                       uppercase
//                       tracking-[0.18em]
//                       font-semibold
//                       text-cyan-400
//                     "
//                   >
//                     {activeProject.category}
//                   </span>
//                 </div>


//                 {/* Title */}
//                 <div
//                   className="
//                     flex
//                     items-baseline
//                     gap-3
//                     flex-wrap
//                   "
//                 >

//                   <h3
//                     className="
//                       text-2xl
//                       sm:text-3xl
//                       font-black
//                       tracking-tight
//                       text-white
//                     "
//                   >
//                     {activeProject.title}
//                   </h3>

//                   <span
//                     className="
//                       text-xs
//                       sm:text-sm
//                       text-slate-500
//                     "
//                   >
//                     {activeProject.subtitle}
//                   </span>

//                 </div>


//                 {/* Description */}
//                 <p
//                   className="
//                     mt-3
//                     max-w-2xl
//                     text-xs
//                     sm:text-sm
//                     leading-relaxed
//                     text-slate-400
//                   "
//                 >
//                   {activeProject.description}
//                 </p>


//                 {/* Tags */}
//                 <div
//                   className="
//                     flex
//                     flex-wrap
//                     gap-2
//                     mt-4
//                   "
//                 >
//                   {activeProject.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="
//                         px-2.5
//                         py-1
//                         rounded-md
//                         border
//                         border-white/[0.07]
//                         bg-white/[0.025]
//                         text-[9px]
//                         font-medium
//                         text-slate-500
//                       "
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//               </div>


//               {/* =================================================
//                   ACTIONS
//               ================================================= */}

//               <div
//                 className="
//                   flex
//                   items-center
//                   gap-2
//                   shrink-0
//                 "
//               >

//                 {activeProject.github && (
//                   <a
//                     href={activeProject.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="
//                       work-action-secondary
//                       inline-flex
//                       items-center
//                       justify-center
//                       gap-2
//                       h-10
//                       px-3.5
//                       rounded-xl
//                       border
//                       border-white/10
//                       bg-white/[0.025]
//                       text-slate-300
//                       text-xs
//                       font-semibold
//                     "
//                   >
//                     <Github className="w-3.5 h-3.5" />
//                     <span className="hidden sm:inline">
//                       GitHub
//                     </span>
//                   </a>
//                 )}


//                 <a
//                   href={activeProject.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="
//                     work-action-primary
//                     relative
//                     inline-flex
//                     items-center
//                     justify-center
//                     gap-2
//                     h-10
//                     px-4
//                     rounded-xl
//                     overflow-hidden
//                     text-white
//                     text-xs
//                     font-bold
//                   "
//                 >
//                   <span className="work-button-shine" />

//                   <span className="relative z-10">
//                     View Live
//                   </span>

//                   <ExternalLink
//                     className="
//                       relative
//                       z-10
//                       w-3.5
//                       h-3.5
//                     "
//                   />
//                 </a>

//               </div>

//             </div>


//             {/* =================================================
//                 NAVIGATION
//             ================================================= */}

//             <div
//               className="
//                 mt-6
//                 flex
//                 items-center
//                 justify-between
//               "
//             >

//               {/* Progress */}
//               <div className="flex items-center gap-2">

//                 {PROJECTS.map((project, index) => (
//                   <button
//                     key={project.id}
//                     aria-label={`View ${project.title}`}
//                     onClick={() => setActiveIndex(index)}
//                     className={`
//                       h-1
//                       rounded-full
//                       transition-all
//                       duration-500

//                       ${
//                         index === activeIndex
//                           ? `
//                             w-10
//                             bg-cyan-400
//                             shadow-[0_0_10px_rgba(34,211,238,.5)]
//                           `
//                           : `
//                             w-4
//                             bg-white/10
//                             hover:bg-white/20
//                           `
//                       }
//                     `}
//                   />
//                 ))}

//                 <span
//                   className="
//                     ml-2
//                     text-[9px]
//                     font-mono
//                     text-slate-600
//                   "
//                 >
//                   {activeProject.number} / 05
//                 </span>

//               </div>


//               {/* Arrow navigation */}
//               <div className="flex gap-2">

//                 <button
//                   onClick={previousProject}
//                   className="
//                     work-nav-button
//                     w-9
//                     h-9
//                     rounded-lg
//                     border
//                     border-white/10
//                     bg-white/[0.025]
//                     flex
//                     items-center
//                     justify-center
//                     text-slate-400
//                   "
//                   aria-label="Previous project"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                 </button>

//                 <button
//                   onClick={nextProject}
//                   className="
//                     work-nav-button
//                     w-9
//                     h-9
//                     rounded-lg
//                     border
//                     border-white/10
//                     bg-white/[0.025]
//                     flex
//                     items-center
//                     justify-center
//                     text-slate-400
//                   "
//                   aria-label="Next project"
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>


//         {/* =================================================
//             BOTTOM STATEMENT
//         ================================================= */}

//         <div
//           className="
//             mt-20
//             sm:mt-24
//             pt-8
//             border-t
//             border-white/[0.07]
//             flex
//             flex-col
//             sm:flex-row
//             items-start
//             sm:items-center
//             justify-between
//             gap-5
//           "
//         >

//           <div
//             className="
//               flex
//               items-center
//               gap-3
//             "
//           >

//             <div
//               className="
//                 w-9
//                 h-9
//                 rounded-lg
//                 bg-cyan-400/[0.08]
//                 border
//                 border-cyan-400/15
//                 flex
//                 items-center
//                 justify-center
//                 text-cyan-400
//               "
//             >
//               <MousePointer2 className="w-4 h-4" />
//             </div>

//             <div>

//               <div
//                 className="
//                   text-xs
//                   font-bold
//                   text-white
//                 "
//               >
//                 Your idea could be next.
//               </div>

//               <div
//                 className="
//                   text-[10px]
//                   text-slate-500
//                   mt-0.5
//                 "
//               >
//                 Let's turn it into something people remember.
//               </div>

//             </div>

//           </div>


//           <button
//             className="
//               group
//               flex
//               items-center
//               gap-2
//               text-xs
//               font-bold
//               text-cyan-400
//               hover:text-cyan-300
//               transition-colors
//             "
//           >
//             Start your project

//             <ArrowUpRight
//               className="
//                 w-4
//                 h-4
//                 transition-transform
//                 duration-300
//                 group-hover:translate-x-1
//                 group-hover:-translate-y-1
//               "
//             />
//           </button>

//         </div>

//       </div>


//       {/* =================================================
//           STYLES
//       ================================================= */}

//       <style>{`

//         /* ================================================
//            GRID BACKGROUND
//         ================================================ */

//         .our-work-grid {
//           background-image:
//             linear-gradient(
//               rgba(255,255,255,.018) 1px,
//               transparent 1px
//             ),
//             linear-gradient(
//               90deg,
//               rgba(255,255,255,.018) 1px,
//               transparent 1px
//             );

//           background-size:
//             55px 55px;

//           mask-image:
//             linear-gradient(
//               to bottom,
//               black,
//               transparent 90%
//             );
//         }


//         /* ================================================
//            SECTION LABEL
//         ================================================ */

//         .our-work-label {
//           animation:
//             workLabelIn
//             .8s
//             cubic-bezier(.16,1,.3,1)
//             both;
//         }

//         @keyframes workLabelIn {

//           from {
//             opacity: 0;
//             transform:
//               translateY(12px);
//           }

//           to {
//             opacity: 1;
//             transform:
//               translateY(0);
//           }

//         }


//         /* ================================================
//            PROJECT PREVIEW ENTRANCE
//         ================================================ */

//         .project-preview-enter {
//           animation:
//             projectPreviewIn
//             .7s
//             cubic-bezier(.16,1,.3,1)
//             both;
//         }

//         @keyframes projectPreviewIn {

//           from {
//             opacity: 0;
//             transform:
//               translateY(18px)
//               scale(.985);
//             filter:
//               blur(5px);
//           }

//           to {
//             opacity: 1;
//             transform:
//               translateY(0)
//               scale(1);
//             filter:
//               blur(0);
//           }

//         }


//         /* ================================================
//            PROJECT INFO ENTRANCE
//         ================================================ */

//         .project-info-enter {
//           animation:
//             projectInfoIn
//             .7s
//             cubic-bezier(.16,1,.3,1)
//             .08s
//             both;
//         }

//         @keyframes projectInfoIn {

//           from {
//             opacity: 0;
//             transform:
//               translateY(15px);
//           }

//           to {
//             opacity: 1;
//             transform:
//               translateY(0);
//           }

//         }


//         /* ================================================
//            SCAN LINE
//         ================================================ */

//         .project-scanline {

//           position: absolute;

//           left: 0;
//           right: 0;

//           top: -20%;

//           height: 1px;

//           background:
//             linear-gradient(
//               90deg,
//               transparent,
//               rgba(34,211,238,.0),
//               rgba(34,211,238,.45),
//               rgba(59,130,246,.35),
//               transparent
//             );

//           box-shadow:
//             0 0 18px
//             rgba(34,211,238,.22);

//           opacity: .55;

//           pointer-events: none;

//           animation:
//             projectScan
//             6s
//             ease-in-out
//             infinite;
//         }

//         @keyframes projectScan {

//           0% {
//             top: -10%;
//             opacity: 0;
//           }

//           10% {
//             opacity: .5;
//           }

//           50% {
//             opacity: .35;
//           }

//           90% {
//             opacity: .1;
//           }

//           100% {
//             top: 110%;
//             opacity: 0;
//           }

//         }


//         /* ================================================
//            SELECTOR HOVER
//         ================================================ */

//         .project-selector:hover {
//           transform:
//             translateX(3px);
//         }


//         /* ================================================
//            SECONDARY BUTTON
//         ================================================ */

//         .work-action-secondary {

//           transition:
//             transform .35s ease,
//             border-color .35s ease,
//             background .35s ease,
//             color .35s ease;
//         }

//         .work-action-secondary:hover {

//           transform:
//             translateY(-2px);

//           border-color:
//             rgba(34,211,238,.25);

//           background:
//             rgba(34,211,238,.05);

//           color:
//             rgb(103,232,249);
//         }


//         /* ================================================
//            PRIMARY BUTTON
//         ================================================ */

//         .work-action-primary {

//           background:
//             linear-gradient(
//               110deg,
//               rgb(6,182,212),
//               rgb(37,99,235)
//             );

//           border:
//             1px solid
//             rgba(103,232,249,.3);

//           box-shadow:
//             0 7px 25px
//             rgba(6,182,212,.18);

//           transition:
//             transform .4s cubic-bezier(.16,1,.3,1),
//             box-shadow .4s ease;
//         }

//         .work-action-primary:hover {

//           transform:
//             translateY(-3px)
//             scale(1.025);

//           box-shadow:
//             0 12px 35px
//             rgba(6,182,212,.32);
//         }


//         /* ================================================
//            BUTTON SHINE
//         ================================================ */

//         .work-button-shine {

//           position: absolute;

//           top: 0;
//           bottom: 0;

//           left: -70%;

//           width: 45%;

//           background:
//             linear-gradient(
//               90deg,
//               transparent,
//               rgba(255,255,255,.3),
//               transparent
//             );

//           transform:
//             skewX(-20deg);

//           animation:
//             workButtonShine
//             4.5s
//             ease-in-out
//             infinite;
//         }

//         @keyframes workButtonShine {

//           0% {
//             left: -70%;
//           }

//           32%,
//           100% {
//             left: 140%;
//           }

//         }


//         /* ================================================
//            NAV BUTTON
//         ================================================ */

//         .work-nav-button {

//           transition:
//             transform .3s ease,
//             border-color .3s ease,
//             color .3s ease,
//             background .3s ease;
//         }

//         .work-nav-button:hover {

//           transform:
//             translateY(-2px);

//           border-color:
//             rgba(34,211,238,.25);

//           color:
//             rgb(103,232,249);

//           background:
//             rgba(34,211,238,.05);
//         }


//         /* ================================================
//            MOBILE
//         ================================================ */

//         @media (max-width: 1023px) {

//           .project-selector {
//             min-width: 145px;
//           }

//         }


//         @media (max-width: 640px) {

//           .our-work-grid {
//             background-size:
//               35px 35px;
//           }

//           .project-selector {
//             min-width: 58px;
//             justify-content: center;
//           }

//           .project-selector .project-selector-name {
//             display: none;
//           }

//         }


//         /* ================================================
//            REDUCED MOTION
//         ================================================ */

//         @media (prefers-reduced-motion: reduce) {

//           .our-work-label,
//           .project-preview-enter,
//           .project-info-enter,
//           .project-scanline,
//           .work-button-shine {
//             animation: none !important;
//           }

//         }

//       `}</style>
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Monitor,
  Layers3,
  MousePointer2,
  CircleDot,
  Smartphone,
  RotateCw,
  Tablet,
} from "lucide-react";

/* =========================================================
   PROJECT TYPE
========================================================= */

interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  url: string;
  github?: string;
  tags: string[];
  icon: React.ElementType;
}

/* =========================================================
   PROJECTS
========================================================= */

const PROJECTS: Project[] = [
  {
    id: "comfortpro",
    number: "01",
    title: "ComfortPro HVAC",
    subtitle: "Premium HVAC Service Experience",
    category: "Business • Service",
    description:
      "A modern conversion-focused HVAC platform built to turn local visitors into calls, quote requests and service bookings.",
    url: "https://hvac-service-omega.vercel.app/",
    github: "https://github.com/Abhishekkuntare/HVAC-Service",
    tags: [
      "Responsive UI",
      "Local Business",
      "Service Booking",
      "Conversion UX",
    ],
    icon: Monitor,
  },

  {
    id: "soleva",
    number: "02",
    title: "SOLEVA",
    subtitle: "Future Wear",
    category: "E-commerce • Fashion",
    description:
      "A cinematic futuristic footwear shopping experience designed around premium product presentation and immersive interactions.",
    url: "https://soleva-premium-futuristic-footwear.vercel.app/",
    tags: [
      "E-commerce",
      "Product Experience",
      "Futuristic UI",
      "Motion Design",
    ],
    icon: Sparkles,
  },

  {
    id: "krishimitra",
    number: "03",
    title: "KrishiMitra AI",
    subtitle: "AI for Smarter Farming",
    category: "AI • Agriculture",
    description:
      "An interactive agricultural AI platform bringing crop recommendations, disease assistance, agricultural intelligence and voice interaction together.",
    url: "https://krishi-mitra-ai-three.vercel.app/",
    tags: [
      "AI Platform",
      "Agriculture",
      "Voice Interaction",
      "Smart UX",
    ],
    icon: Layers3,
  },

  {
    id: "ambamotors",
    number: "04",
    title: "Amba Motors",
    subtitle: "Smart Automotive Service",
    category: "Automotive • Services",
    description:
      "A modern automotive service platform designed around service discovery, bookings, customer enquiries and direct communication.",
    url: "https://amba-motors-ten.vercel.app/",
    tags: [
      "Automotive",
      "Service Booking",
      "Customer UX",
      "Business Website",
    ],
    icon: Monitor,
  },

  {
    id: "fifa",
    number: "05",
    title: "FIFA Pixar Universe",
    subtitle: "Cinematic Football Experience",
    category: "3D • Interactive",
    description:
      "A cinematic AAA-inspired FIFA World Cup experience combining immersive visuals, interactive storytelling and modern web technology.",
    url: "https://fifa-black-eta.vercel.app/",
    github: "https://github.com/Abhishekkuntare/FIFA",
    tags: [
      "3D Experience",
      "Interactive",
      "Cinematic UI",
      "WebGL",
    ],
    icon: Sparkles,
  },
];

/* =========================================================
   DEVICE TYPES
========================================================= */

type DeviceType =
  | "desktop"
  | "iphone"
  | "samsung"
  | "vivo"
  | "oppo"
  | "ipad";

interface DeviceConfig {
  id: DeviceType;
  name: string;
  shortName: string;
  width: number;
  height: number;
}

/* =========================================================
   DEVICES
========================================================= */

const DEVICES: DeviceConfig[] = [
  {
    id: "desktop",
    name: "Desktop / Laptop",
    shortName: "Desktop",
    width: 1440,
    height: 900,
  },

  {
    id: "iphone",
    name: "iPhone 16 Pro",
    shortName: "iPhone",
    width: 393,
    height: 852,
  },

  {
    id: "samsung",
    name: "Samsung Galaxy S25 Ultra",
    shortName: "Samsung",
    width: 480,
    height: 1092,
  },

  {
    id: "vivo",
    name: "Vivo X200 Pro",
    shortName: "Vivo",
    width: 452,
    height: 1008,
  },

  {
    id: "oppo",
    name: "OPPO Find X8 Pro",
    shortName: "OPPO",
    width: 450,
    height: 1008,
  },

  {
    id: "ipad",
    name: "iPad Pro",
    shortName: "iPad",
    width: 1024,
    height: 1366,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function OurWork() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedDevice, setSelectedDevice] =
    useState<DeviceType>("desktop");

  const [isLandscape, setIsLandscape] =
    useState(false);

  const [isPaused, setIsPaused] =
    useState(false);

  const [deviceChanging, setDeviceChanging] =
    useState(false);

  const activeProject = PROJECTS[activeIndex];

  const activeDevice =
    DEVICES.find(
      (device) => device.id === selectedDevice
    ) || DEVICES[0];

  const isDesktop =
    selectedDevice === "desktop";

  const previewWidth = isLandscape
    ? activeDevice.height
    : activeDevice.width;

  const previewHeight = isLandscape
    ? activeDevice.width
    : activeDevice.height;

  /* =======================================================
     AUTO PROJECT SLIDER
  ======================================================= */

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current >= PROJECTS.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, 6500);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused]);

  /* =======================================================
     PROJECT CHANGE
  ======================================================= */

  const selectProject = (index: number) => {
    setActiveIndex(index);
  };

  const nextProject = () => {
    setActiveIndex((current) => {
      if (current >= PROJECTS.length - 1) {
        return 0;
      }

      return current + 1;
    });
  };

  const previousProject = () => {
    setActiveIndex((current) => {
      if (current <= 0) {
        return PROJECTS.length - 1;
      }

      return current - 1;
    });
  };

  /* =======================================================
     DEVICE CHANGE
  ======================================================= */

  const selectDevice = (device: DeviceType) => {
    if (device === selectedDevice) {
      return;
    }

    setDeviceChanging(true);

    setSelectedDevice(device);

    setIsLandscape(false);

    window.setTimeout(() => {
      setDeviceChanging(false);
    }, 500);
  };

  /* =======================================================
     ROTATE DEVICE
  ======================================================= */

  const rotateDevice = () => {
    setIsLandscape((current) => !current);
  };

  return (
    <section
      id="our-work"
      className="relative w-full overflow-hidden py-24 sm:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[15%] h-[420px] w-[420px] rounded-full bg-cyan-500/[0.055] blur-[120px]" />

        <div className="absolute bottom-[10%] right-[5%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.045] blur-[140px]" />

        <div className="our-work-grid absolute inset-0" />

        <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </div>

      {/* ===================================================
          MAIN CONTAINER
      =================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =================================================
            SECTION HEADING
        ================================================= */}

       <div className="mb-14 sm:mb-20">

  {/* LABEL */}
  <div className="our-work-label mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400 sm:text-xs">
    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,.9)] animate-pulse" />
    Selected Work
  </div>

  {/* HERO-STYLE HEADING */}
  <h2
    className="
      max-w-[1200px]
      font-black
      tracking-[-0.06em]
      leading-[0.9]
      text-white
      text-[clamp(3.2rem,7.5vw,7rem)]
    "
  >
    We don't just{" "}
    <span
      className="
        bg-gradient-to-r
        from-cyan-300
        via-cyan-400
        to-blue-500
        bg-clip-text
        text-transparent
      "
    >
      build websites.
    </span>
  </h2>

  <p
    className="
      mt-7
      max-w-2xl
      text-sm
      sm:text-base
      md:text-lg
      leading-relaxed
      text-slate-400
    "
  >
    We build digital experiences designed to make
    people stop, explore, interact and remember.
  </p>

</div>

        {/* =================================================
            PROJECT AREA
        ================================================= */}

        <div className="grid items-stretch gap-5 lg:grid-cols-[270px_1fr] lg:gap-7">
          {/* ===============================================
              PROJECT SELECTOR
          =============================================== */}

          <div className="relative flex gap-1.5 overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.025] p-2 backdrop-blur-xl lg:flex-col">
            <div className="pointer-events-none absolute left-0 top-0 h-20 w-full bg-cyan-400/[0.035] blur-2xl" />

            {PROJECTS.map((project, index) => {
              const isActive =
                index === activeIndex;

              const Icon = project.icon;

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() =>
                    selectProject(index)
                  }
                  className={`
                    project-selector
                    relative
                    flex
                    shrink-0
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-3
                    py-3
                    text-left
                    transition-all
                    duration-500
                    sm:py-3.5
                    lg:w-full

                    ${
                      isActive
                        ? "border-cyan-400/20 bg-cyan-400/[0.09]"
                        : "border-transparent hover:border-white/[0.07] hover:bg-white/[0.035]"
                    }
                  `}
                >
                  <span
                    className={`
                      w-6
                      font-mono
                      text-[9px]
                      ${
                        isActive
                          ? "text-cyan-300"
                          : "text-slate-600"
                      }
                    `}
                  >
                    {project.number}
                  </span>

                  <div
                    className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      transition-all
                      duration-500

                      ${
                        isActive
                          ? "bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,.2)]"
                          : "bg-white/[0.05] text-slate-500"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="hidden min-w-0 sm:block lg:block">
                    <div
                      className={`
                        truncate
                        text-xs
                        font-bold

                        ${
                          isActive
                            ? "text-white"
                            : "text-slate-400"
                        }
                      `}
                    >
                      {project.title}
                    </div>

                    <div className="mt-0.5 truncate text-[9px] text-slate-600">
                      {project.category}
                    </div>
                  </div>

                  {isActive && (
                    <span className="absolute right-2 h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,.9)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ===============================================
              MAIN PREVIEW
          =============================================== */}

          <div className="relative min-w-0">
            {/* =============================================
                RESPONSIVE LAB HEADER
            ============================================= */}

            <div className="mb-5 flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,.8)]" />

                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                      Responsive Experience
                    </span>
                  </div>

                  <div className="mt-1.5 text-xs text-slate-500">
                    Test the experience across
                    different screen sizes.
                  </div>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]" />

                  <span className="font-mono text-[9px] text-slate-500">
                    RESPONSIVE ENGINE
                  </span>

                  <span className="font-mono text-[9px] text-cyan-400">
                    6 DEVICES
                  </span>
                </div>
              </div>

              {/* ===========================================
                  DEVICE SELECTOR
              =========================================== */}

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.025] p-1 backdrop-blur-xl">
                  {DEVICES.map((device) => {
                    const isActive =
                      selectedDevice ===
                      device.id;

                    return (
                      <button
                        key={device.id}
                        type="button"
                        onClick={() =>
                          selectDevice(
                            device.id
                          )
                        }
                        className={`
                          device-switch
                          relative
                          flex
                          shrink-0
                          items-center
                          gap-1.5
                          overflow-hidden
                          whitespace-nowrap
                          rounded-lg
                          px-3
                          py-2
                          text-[10px]
                          font-semibold
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? "bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,.18)]"
                              : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"
                          }
                        `}
                      >
                        {device.id ===
                        "desktop" ? (
                          <Monitor className="h-3.5 w-3.5" />
                        ) : device.id ===
                          "ipad" ? (
                          <Tablet className="h-3.5 w-3.5" />
                        ) : (
                          <Smartphone className="h-3.5 w-3.5" />
                        )}

                        <span>
                          {device.shortName}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* ROTATE */}

                {!isDesktop && (
                  <button
                    type="button"
                    onClick={rotateDevice}
                    className="device-rotate flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] font-semibold text-slate-400 transition-all hover:border-cyan-400/25 hover:text-cyan-300"
                  >
                    <RotateCw className="h-3.5 w-3.5" />

                    <span>
                      {isLandscape
                        ? "Portrait"
                        : "Landscape"}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* =============================================
                DEVICE INFORMATION
            ============================================= */}

            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.18em] text-slate-600">
                Previewing
              </span>

              <span className="text-[9px] font-bold text-slate-300">
                {activeDevice.name}
              </span>

              <span className="text-[9px] text-slate-700">
                •
              </span>

              <span className="font-mono text-[9px] text-cyan-400/70">
                {previewWidth} ×{" "}
                {previewHeight}
              </span>
            </div>

            {/* =============================================
                DEVICE STAGE
            ============================================= */}

            <div className="device-stage relative flex min-h-[540px] items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-[#03060b] p-5 sm:p-8">
              {/* GRID */}

              <div className="device-stage-grid pointer-events-none absolute inset-0" />

              {/* GLOW */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.045] blur-[120px]" />

              {/* CORNERS */}

              <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l border-t border-cyan-400/20" />

              <div className="pointer-events-none absolute right-5 top-5 h-8 w-8 border-r border-t border-cyan-400/20" />

              <div className="pointer-events-none absolute bottom-5 left-5 h-8 w-8 border-b border-l border-cyan-400/20" />

              <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b border-r border-cyan-400/20" />

              {/* ===========================================
                  DEVICE FRAME
              =========================================== */}

              <div
                className={`
                  device-frame
                  relative

                  ${
                    isDesktop
                      ? "device-desktop"
                      : "device-mobile"
                  }

                  ${
                    deviceChanging
                      ? "device-changing"
                      : ""
                  }
                `}
                style={{
                  width: isDesktop
                    ? "min(100%, 1100px)"
                    : `min(${previewWidth}px, 85vw)`,

                  height: isDesktop
                    ? "min(500px, 62vh)"
                    : `min(${previewHeight}px, 650px)`,
                }}
              >
                {/* =========================================
                    DEVICE BODY
                ========================================= */}

                <div
                  className={`
                    relative
                    h-full
                    w-full
                    overflow-hidden
                    border
                    border-white/[0.13]
                    bg-[#05080d]
                    shadow-[0_30px_100px_rgba(0,0,0,.7)]

                    ${
                      isDesktop
                        ? "rounded-2xl"
                        : "rounded-[34px]"
                    }
                  `}
                >
                  {/* =======================================
                      PHONE CAMERA
                  ======================================= */}

                  {!isDesktop && (
                    <div className="absolute left-1/2 top-2.5 z-30 -translate-x-1/2">
                      <div className="relative h-5 w-[76px] rounded-full border border-white/[0.05] bg-black shadow-inner">
                        <div className="absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-800" />
                      </div>
                    </div>
                  )}

                  {/* =======================================
                      DESKTOP BROWSER BAR
                  ======================================= */}

                  {isDesktop && (
                    <div className="relative z-20 flex h-10 items-center border-b border-white/[0.06] bg-[#0d121c] px-3">
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />

                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />

                        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                      </div>

                      <div className="absolute left-1/2 hidden h-6 w-[48%] -translate-x-1/2 items-center justify-center gap-1.5 rounded-md border border-white/[0.05] bg-white/[0.035] sm:flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/70" />

                        <span className="truncate font-mono text-[8px] text-slate-600">
                          {activeProject.url.replace(
                            "https://",
                            ""
                          )}
                        </span>
                      </div>

                      <Monitor className="ml-auto h-3.5 w-3.5 text-slate-600" />
                    </div>
                  )}

                  {/* =======================================
                      PROJECT WEBSITE
                  ======================================= */}

                  <div
                    key={`
                      ${activeProject.id}
                      -
                      ${selectedDevice}
                      -
                      ${isLandscape}
                    `}
                    className="device-content-enter relative h-full w-full overflow-hidden"
                  >
                    <iframe
                      title={`${activeProject.title} - ${activeDevice.name}`}
                      src={activeProject.url}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full border-0 bg-white"
                      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                    />

                    {/* OVERLAY */}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05080d]/35 via-transparent to-transparent" />

                    {/* SCAN */}

                    <div className="project-scanline" />
                  </div>

                  {/* SIDE LIGHTS */}

                  <div className="pointer-events-none absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-cyan-300/25 to-transparent" />

                  <div className="pointer-events-none absolute inset-y-8 right-0 w-px bg-gradient-to-b from-transparent via-blue-400/20 to-transparent" />
                </div>
              </div>

              {/* ===========================================
                  LIVE BADGE
              =========================================== */}

              <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-3 py-1.5 shadow-xl backdrop-blur-xl">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.9)]" />

                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">
                  Live Preview
                </span>

                <span className="text-[9px] text-slate-600">
                  •
                </span>

                <span className="font-mono text-[9px] text-cyan-300/80">
                  {activeDevice.shortName}
                </span>
              </div>
            </div>

            {/* =============================================
                PROJECT DETAILS
            ============================================= */}

            <div
              key={`info-${activeProject.id}`}
              className="project-info-enter mt-6 grid items-end gap-5 md:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <CircleDot className="h-3 w-3 text-cyan-400" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
                    {activeProject.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                    {activeProject.title}
                  </h3>

                  <span className="text-xs text-slate-500 sm:text-sm">
                    {activeProject.subtitle}
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {activeProject.description}
                </p>

                {/* TAGS */}

                <div className="mt-4 flex flex-wrap gap-2">
                  {activeProject.tags.map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[9px] font-medium text-slate-500"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* ===========================================
                  ACTION BUTTONS
              =========================================== */}

              <div className="flex shrink-0 items-center gap-2">
                {activeProject.github && (
                  <a
                    href={
                      activeProject.github
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-action-secondary inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3.5 text-xs font-semibold text-slate-300"
                  >
                    <Github className="h-3.5 w-3.5" />

                    <span className="hidden sm:inline">
                      GitHub
                    </span>
                  </a>
                )}

                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-action-primary relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-xl px-4 text-xs font-bold text-white"
                >
                  <span className="work-button-shine" />

                  <span className="relative z-10">
                    View Live
                  </span>

                  <ExternalLink className="relative z-10 h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* =============================================
                PROJECT NAVIGATION
            ============================================= */}

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {PROJECTS.map(
                  (project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      aria-label={`View ${project.title}`}
                      onClick={() =>
                        selectProject(index)
                      }
                      className={`
                        h-1
                        rounded-full
                        transition-all
                        duration-500

                        ${
                          index ===
                          activeIndex
                            ? "w-10 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,.5)]"
                            : "w-4 bg-white/10 hover:bg-white/20"
                        }
                      `}
                    />
                  )
                )}

                <span className="ml-2 font-mono text-[9px] text-slate-600">
                  {activeProject.number} / 05
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={previousProject}
                  aria-label="Previous project"
                  className="work-nav-button flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-slate-400"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={nextProject}
                  aria-label="Next project"
                  className="work-nav-button flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-slate-400"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <div className="mt-20 flex flex-col items-start justify-between gap-5 border-t border-white/[0.07] pt-8 sm:mt-24 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.08] text-cyan-400">
              <MousePointer2 className="h-4 w-4" />
            </div>

            <div>
              <div className="text-xs font-bold text-white">
                Your idea could be next.
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                Let's turn it into something people
                remember.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="group flex items-center gap-2 text-xs font-bold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Start your project

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* =====================================================
          CSS ANIMATIONS
      ===================================================== */}

      <style>{`
        /* ================================================
           BACKGROUND GRID
        ================================================= */

        .our-work-grid {
          background-image:
            linear-gradient(
              rgba(255,255,255,.018) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.018) 1px,
              transparent 1px
            );

          background-size: 55px 55px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 90%
            );
        }


        /* ================================================
           HEADER
        ================================================= */

        .our-work-label {
          animation:
            workLabelIn
            .8s
            cubic-bezier(.16,1,.3,1)
            both;
        }

        @keyframes workLabelIn {

          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }


        /* ================================================
           PROJECT SELECTOR
        ================================================= */

        .project-selector:hover {
          transform: translateX(3px);
        }


        /* ================================================
           DEVICE BUTTON
        ================================================= */

        .device-switch::after {
          content: "";

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              110deg,
              transparent 20%,
              rgba(255,255,255,.18) 50%,
              transparent 80%
            );

          transform:
            translateX(-120%);

          transition:
            transform .7s ease;

          pointer-events:
            none;
        }

        .device-switch:hover::after {
          transform:
            translateX(120%);
        }


        /* ================================================
           DEVICE STAGE
        ================================================= */

        .device-stage {
          perspective:
            1800px;
        }


        .device-stage-grid {

          background-image:
            linear-gradient(
              rgba(255,255,255,.018) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.018) 1px,
              transparent 1px
            );

          background-size:
            45px 45px;

          mask-image:
            radial-gradient(
              ellipse at center,
              black 20%,
              transparent 80%
            );
        }


        /* ================================================
           DEVICE FRAME
        ================================================= */

        .device-frame {

          transform-style:
            preserve-3d;

          animation:
            deviceFloat
            7s
            ease-in-out
            infinite;

          transition:
            width .65s cubic-bezier(.16,1,.3,1),
            height .65s cubic-bezier(.16,1,.3,1);
        }


        .device-desktop {

          box-shadow:
            0 35px 100px rgba(0,0,0,.65),
            0 0 70px rgba(34,211,238,.05);
        }


        .device-mobile {

          box-shadow:
            0 30px 100px rgba(0,0,0,.7),
            0 0 50px rgba(34,211,238,.06);
        }


        /* ================================================
           DEVICE FLOAT
        ================================================= */

        @keyframes deviceFloat {

          0%,
          100% {
            transform:
              translateY(0)
              rotateX(0deg);
          }

          50% {
            transform:
              translateY(-5px)
              rotateX(.5deg);
          }

        }


        /* ================================================
           DEVICE CHANGE
        ================================================= */

        .device-changing {

          animation:
            deviceChange
            .5s
            cubic-bezier(.16,1,.3,1)
            both !important;
        }


        @keyframes deviceChange {

          from {
            opacity: .25;

            transform:
              scale(.94)
              translateY(12px)
              rotateX(3deg);
          }

          to {
            opacity: 1;

            transform:
              scale(1)
              translateY(0)
              rotateX(0);
          }

        }


        /* ================================================
           WEBSITE ENTER
        ================================================= */

        .device-content-enter {

          animation:
            deviceContentIn
            .65s
            cubic-bezier(.16,1,.3,1)
            both;
        }


        @keyframes deviceContentIn {

          from {

            opacity: 0;

            transform:
              scale(.96)
              translateY(12px);

            filter:
              blur(5px);
          }

          to {

            opacity: 1;

            transform:
              scale(1)
              translateY(0);

            filter:
              blur(0);
          }

        }


        /* ================================================
           PROJECT INFO
        ================================================= */

        .project-info-enter {

          animation:
            projectInfoIn
            .7s
            cubic-bezier(.16,1,.3,1)
            .08s
            both;
        }


        @keyframes projectInfoIn {

          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }


        /* ================================================
           SCAN LINE
        ================================================= */

        .project-scanline {

          position: absolute;

          left: 0;
          right: 0;

          top: -10%;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(34,211,238,0),
              rgba(34,211,238,.45),
              rgba(59,130,246,.35),
              transparent
            );

          box-shadow:
            0 0 18px
            rgba(34,211,238,.22);

          opacity: .55;

          pointer-events:
            none;

          animation:
            projectScan
            6s
            ease-in-out
            infinite;
        }


        @keyframes projectScan {

          0% {
            top: -10%;
            opacity: 0;
          }

          10% {
            opacity: .5;
          }

          50% {
            opacity: .35;
          }

          90% {
            opacity: .1;
          }

          100% {
            top: 110%;
            opacity: 0;
          }

        }


        /* ================================================
           ROTATE BUTTON
        ================================================= */

        .device-rotate:hover {

          transform:
            translateY(-2px)
            rotate(-2deg);

          background:
            rgba(34,211,238,.045);
        }


        /* ================================================
           SECONDARY ACTION
        ================================================= */

        .work-action-secondary {

          transition:
            transform .35s ease,
            border-color .35s ease,
            background .35s ease,
            color .35s ease;
        }


        .work-action-secondary:hover {

          transform:
            translateY(-2px);

          border-color:
            rgba(34,211,238,.25);

          background:
            rgba(34,211,238,.05);

          color:
            rgb(103,232,249);
        }


        /* ================================================
           PRIMARY ACTION
        ================================================= */

        .work-action-primary {

          background:
            linear-gradient(
              110deg,
              rgb(6,182,212),
              rgb(37,99,235)
            );

          border:
            1px solid
            rgba(103,232,249,.3);

          box-shadow:
            0 7px 25px
            rgba(6,182,212,.18);

          transition:
            transform .4s
              cubic-bezier(.16,1,.3,1),

            box-shadow .4s ease;
        }


        .work-action-primary:hover {

          transform:
            translateY(-3px)
            scale(1.025);

          box-shadow:
            0 12px 35px
            rgba(6,182,212,.32);
        }


        /* ================================================
           BUTTON SHINE
        ================================================= */

        .work-button-shine {

          position: absolute;

          top: 0;
          bottom: 0;

          left: -70%;

          width: 45%;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.3),
              transparent
            );

          transform:
            skewX(-20deg);

          animation:
            workButtonShine
            4.5s
            ease-in-out
            infinite;
        }


        @keyframes workButtonShine {

          0% {
            left: -70%;
          }

          32%,
          100% {
            left: 140%;
          }

        }


        /* ================================================
           NAVIGATION BUTTONS
        ================================================= */

        .work-nav-button {

          transition:
            transform .3s ease,
            border-color .3s ease,
            color .3s ease,
            background .3s ease;
        }


        .work-nav-button:hover {

          transform:
            translateY(-2px);

          border-color:
            rgba(34,211,238,.25);

          color:
            rgb(103,232,249);

          background:
            rgba(34,211,238,.05);
        }


        /* ================================================
           TABLET
        ================================================= */

        @media (max-width: 1023px) {

          .project-selector {
            min-width: 145px;
          }

        }


        /* ================================================
           MOBILE
        ================================================= */

        @media (max-width: 640px) {

          .our-work-grid {
            background-size:
              35px 35px;
          }

          .project-selector {
            min-width:
              58px;

            justify-content:
              center;
          }

          .device-stage {
            min-height:
              480px;

            padding:
              20px 12px;
          }

          .device-mobile {
            border-radius:
              30px;
          }

        }


        /* ================================================
           REDUCED MOTION
        ================================================= */

        @media (prefers-reduced-motion: reduce) {

          .our-work-label,
          .device-frame,
          .device-content-enter,
          .project-info-enter,
          .project-scanline,
          .work-button-shine {

            animation:
              none !important;
          }

        }

      `}</style>
    </section>
  );
}