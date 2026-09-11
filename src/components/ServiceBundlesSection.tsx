import React from 'react';
import {
  Sparkles,
  Check,
  ArrowRight,
  Clock,
} from 'lucide-react';

import { SERVICE_BUNDLES } from '../data/servicesData';
import { formatPrice } from '../utils/helpers';

interface ServiceBundlesSectionProps {
  onSelectBundle: (bundleName: string) => void;
  currentCurrency: string;
}

export const ServiceBundlesSection: React.FC<ServiceBundlesSectionProps> = ({
  onSelectBundle,
  currentCurrency,
}) => {
  return (
    // <section
    //   className="
    //     relative
    //     w-full
    //     overflow-x-hidden
    //     border-b border-white/10
    //     bg-[#080b11]
    //     py-14
    //     sm:py-20
    //     lg:py-28
    //   "
    // >
    //   {/* =========================================================
    //       BACKGROUND EFFECT
    //   ========================================================== */}

    //   <div
    //     className="
    //       pointer-events-none
    //       absolute
    //       left-1/2
    //       top-0
    //       h-[300px]
    //       w-[600px]
    //       -translate-x-1/2
    //       rounded-full
    //       bg-cyan-500/[0.045]
    //       blur-[120px]
    //     "
    //   />

    //   <div className="relative mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">

    //     {/* =========================================================
    //         HEADER
    //     ========================================================== */}

    //     <div className="mx-auto max-w-3xl text-center">

    //       {/* Badge */}

    //       <div
    //         className="
    //           inline-flex
    //           items-center
    //           gap-2
    //           rounded-full
    //           border
    //           border-cyan-400/20
    //           bg-cyan-400/[0.07]
    //           px-3
    //           py-1.5
    //           text-[10px]
    //           font-bold
    //           uppercase
    //           tracking-[0.12em]
    //           text-cyan-300
    //           sm:text-xs
    //         "
    //       >
    //         <Sparkles className="h-3.5 w-3.5" />

    //         <span>
    //           Structured Investment Packages
    //         </span>
    //       </div>

    //       {/* Heading */}

    //       <h2
    //         className="
    //           mt-4
    //           font-display
    //           text-[30px]
    //           font-extrabold
    //           leading-[1.08]
    //           tracking-tight
    //           text-white

    //           sm:text-4xl

    //           md:text-5xl

    //           lg:text-[52px]
    //         "
    //       >
    //         Curated Digital
    //         <span className="block text-cyan-400">
    //           Growth Bundles
    //         </span>
    //       </h2>

    //       {/* Description */}

    //       <p
    //         className="
    //           mx-auto
    //           mt-4
    //           max-w-2xl
    //           text-sm
    //           leading-6
    //           text-slate-400

    //           sm:text-base
    //           sm:leading-7
    //         "
    //       >
    //         Transparent milestones, zero hidden costs, and complete
    //         code & asset ownership from day one.
    //       </p>
    //     </div>

    //     {/* =========================================================
    //         CARDS
    //     ========================================================== */}

    //     <div
    //       className="
    //         mt-10
    //         grid
    //         grid-cols-1
    //         gap-5

    //         sm:mt-12

    //         md:grid-cols-2
    //         md:gap-6

    //         lg:mt-16
    //         lg:grid-cols-4
    //         lg:items-stretch
    //       "
    //     >
    //       {SERVICE_BUNDLES.map((bundle, index) => {
    //         const isPopular = bundle.popular;

    //         return (
    //           <div
    //             key={bundle.id}
    //             className={`
    //               relative
    //               flex
    //               min-w-0
    //               flex-col
    //               rounded-2xl
    //               border
    //               p-5
    //               transition-all
    //               duration-300

    //               sm:p-6

    //               lg:rounded-3xl
    //               lg:p-7

    //               ${
    //                 isPopular
    //                   ? `
    //                     border-cyan-400/60
    //                     bg-gradient-to-b
    //                     from-[#121b31]
    //                     via-[#0d1425]
    //                     to-[#090d17]

    //                     shadow-[0_15px_50px_rgba(6,182,212,0.10)]

    //                     lg:-translate-y-2
    //                     lg:hover:-translate-y-3
    //                   `
    //                   : `
    //                     border-white/[0.10]
    //                     bg-[#0c1019]

    //                     hover:border-white/[0.20]
    //                     hover:bg-[#0e131e]

    //                     lg:hover:-translate-y-1
    //                   `
    //               }
    //             `}
    //           >

    //             {/* =================================================
    //                 POPULAR BADGE
    //             ================================================== */}

    //             {isPopular && (
    //               <div
    //                 className="
    //                   absolute
    //                   -top-3
    //                   left-5
    //                   z-10
    //                   inline-flex
    //                   items-center
    //                   gap-1.5
    //                   rounded-full
    //                   border
    //                   border-cyan-300/30
    //                   bg-gradient-to-r
    //                   from-cyan-500
    //                   to-blue-600
    //                   px-3
    //                   py-1.5
    //                   text-[9px]
    //                   font-extrabold
    //                   uppercase
    //                   tracking-[0.1em]
    //                   text-white
    //                   shadow-lg
    //                   shadow-cyan-500/20

    //                   sm:left-6
    //                 "
    //               >
    //                 <Sparkles className="h-3 w-3" />

    //                 Most Popular
    //               </div>
    //             )}

    //             {/* =================================================
    //                 TOP CONTENT
    //             ================================================== */}

    //             <div>

    //               {/* Number */}

    //               <div className="mb-5 flex items-center justify-between">

    //                 <span
    //                   className={`
    //                     flex
    //                     h-7
    //                     w-7
    //                     items-center
    //                     justify-center
    //                     rounded-lg
    //                     text-[10px]
    //                     font-bold

    //                     ${
    //                       isPopular
    //                         ? 'bg-cyan-400/10 text-cyan-300'
    //                         : 'bg-white/[0.05] text-slate-500'
    //                     }
    //                   `}
    //                 >
    //                   {String(index + 1).padStart(2, '0')}
    //                 </span>

    //                 {isPopular && (
    //                   <span
    //                     className="
    //                       rounded-md
    //                       border
    //                       border-cyan-400/10
    //                       bg-cyan-400/[0.08]
    //                       px-2
    //                       py-1
    //                       text-[9px]
    //                       font-bold
    //                       uppercase
    //                       tracking-wider
    //                       text-cyan-300
    //                     "
    //                   >
    //                     Best Value
    //                   </span>
    //                 )}
    //               </div>

    //               {/* =================================================
    //                   PACKAGE NAME
    //               ================================================== */}

    //               <h3
    //                 className="
    //                   font-display
    //                   text-xl
    //                   font-bold
    //                   leading-[1.2]
    //                   tracking-tight
    //                   text-white

    //                   sm:text-[22px]

    //                   lg:text-xl
    //                   xl:text-[22px]
    //                 "
    //               >
    //                 {bundle.name}
    //               </h3>

    //               {/* Ideal For */}

    //               <p
    //                 className="
    //                   mt-2
    //                   text-xs
    //                   leading-[1.55]
    //                   text-slate-400
    //                 "
    //               >
    //                 {bundle.idealFor}
    //               </p>

    //               {/* =================================================
    //                   PRICE
    //               ================================================== */}

    //               <div
    //                 className="
    //                   mt-5
    //                   border-y
    //                   border-white/[0.09]
    //                   py-4
    //                 "
    //               >
    //                 <p
    //                   className="
    //                     text-[9px]
    //                     font-semibold
    //                     uppercase
    //                     tracking-[0.15em]
    //                     text-slate-500
    //                   "
    //                 >
    //                   Starting Investment
    //                 </p>

    //                 <p
    //                   className="
    //                     mt-1
    //                     font-mono
    //                     text-[28px]
    //                     font-extrabold
    //                     leading-none
    //                     tracking-tight
    //                     text-white

    //                     sm:text-[30px]
    //                   "
    //                 >
    //                   {formatPrice(
    //                     bundle.startingUSD || 750,
    //                     currentCurrency
    //                   )}
    //                 </p>

    //                 {/* Delivery */}

    //                 <div
    //                   className="
    //                     mt-3
    //                     flex
    //                     items-center
    //                     gap-1.5
    //                     text-[11px]
    //                     text-slate-400
    //                   "
    //                 >
    //                   <Clock
    //                     className="
    //                       h-3.5
    //                       w-3.5
    //                       shrink-0
    //                       text-cyan-400
    //                     "
    //                   />

    //                   <span>
    //                     Delivery:
    //                   </span>

    //                   <span className="font-medium text-slate-300">
    //                     {bundle.deliveryTime || '2 Weeks'}
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>

    //             {/* =================================================
    //                 FEATURES
    //             ================================================== */}

    //             <div className="mt-5 flex-1">

    //               <p
    //                 className="
    //                   mb-3
    //                   text-[9px]
    //                   font-bold
    //                   uppercase
    //                   tracking-[0.15em]
    //                   text-slate-500
    //                 "
    //               >
    //                 Everything Included
    //               </p>

    //               <div className="space-y-3">

    //                 {bundle.features.map((feature, featureIndex) => (
    //                   <div
    //                     key={featureIndex}
    //                     className="
    //                       flex
    //                       items-start
    //                       gap-2.5
    //                       text-xs
    //                       leading-[1.45]
    //                       text-slate-300
    //                     "
    //                   >

    //                     {/* Check */}

    //                     <span
    //                       className={`
    //                         mt-[1px]
    //                         flex
    //                         h-4
    //                         w-4
    //                         shrink-0
    //                         items-center
    //                         justify-center
    //                         rounded-full

    //                         ${
    //                           isPopular
    //                             ? 'bg-cyan-400/10'
    //                             : 'bg-white/[0.04]'
    //                         }
    //                       `}
    //                     >
    //                       <Check
    //                         className="
    //                           h-3
    //                           w-3
    //                           text-cyan-400
    //                         "
    //                         strokeWidth={3}
    //                       />
    //                     </span>

    //                     {/* Feature text */}

    //                     <span className="min-w-0">
    //                       {feature}
    //                     </span>

    //                   </div>
    //                 ))}

    //               </div>
    //             </div>

    //             {/* =================================================
    //                 CTA
    //             ================================================== */}

    //             <button
    //               type="button"
    //               onClick={() => onSelectBundle(bundle.name)}
    //               className={`
    //                 mt-7
    //                 flex
    //                 min-h-[48px]
    //                 w-full
    //                 items-center
    //                 justify-center
    //                 gap-2
    //                 rounded-xl
    //                 px-4
    //                 py-3
    //                 text-center
    //                 text-xs
    //                 font-bold
    //                 leading-4
    //                 transition-all
    //                 duration-200

    //                 active:scale-[0.98]

    //                 focus:outline-none
    //                 focus:ring-2
    //                 focus:ring-cyan-400/50
    //                 focus:ring-offset-2
    //                 focus:ring-offset-[#080b11]

    //                 ${
    //                   isPopular
    //                     ? `
    //                       bg-gradient-to-r
    //                       from-cyan-500
    //                       to-blue-600
    //                       text-white

    //                       shadow-lg
    //                       shadow-cyan-500/20

    //                       hover:from-cyan-400
    //                       hover:to-blue-500
    //                     `
    //                     : `
    //                       bg-white/[0.08]
    //                       text-white

    //                       hover:bg-white/[0.14]
    //                     `
    //                 }
    //               `}
    //             >
    //               <span className="min-w-0 break-words">
    //                 Select {bundle.name}
    //               </span>

    //               <ArrowRight
    //                 className="
    //                   h-4
    //                   w-4
    //                   shrink-0
    //                 "
    //               />
    //             </button>

    //           </div>
    //         );
    //       })}
    //     </div>

    //     {/* =========================================================
    //         BOTTOM TRUST MESSAGE
    //     ========================================================== */}

    //     <div
    //       className="
    //         mx-auto
    //         mt-8
    //         flex
    //         max-w-xl
    //         items-center
    //         justify-center
    //         gap-2
    //         text-center
    //         text-[10px]
    //         leading-5
    //         text-slate-500

    //         sm:mt-10
    //         sm:text-xs
    //       "
    //     >
    //       <Check
    //         className="
    //           h-3.5
    //           w-3.5
    //           shrink-0
    //           text-cyan-400
    //         "
    //       />

    //       <span>
    //         Complete source-code, design & asset ownership included.
    //       </span>
    //     </div>

    //   </div>
    // </section>
    <div>
    </div>
  );
};