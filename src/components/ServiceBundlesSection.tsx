// import React, { useState } from 'react';

// import {
//   Sparkles,
//   Check,
//   ArrowRight,
//   Clock,
//   X,
//   MessageCircle,
// } from 'lucide-react';

// import { SERVICE_BUNDLES } from '../data/servicesData';

// interface ServiceBundlesSectionProps {
//   onSelectBundle: (bundleName: string) => void;
//   currentCurrency: string;
// }

// export const ServiceBundlesSection: React.FC<
//   ServiceBundlesSectionProps
// > = ({
//   onSelectBundle,
//   currentCurrency,
// }) => {
//   const [selectedBundle, setSelectedBundle] = useState<any>(null);

 
 
//   const indiaPrices = [2999, 19990, 35999];

//   const usdPrices = [399, 799, 1999];

//   const isIndia =
//     currentCurrency === 'INR' ||
//     currentCurrency === 'India' ||
//     currentCurrency === '₹';

//   /*
//    * =========================================================
//    * PRICE FORMATTER
//    * =========================================================
//    */

//   const getPrice = (index: number) => {
//     if (isIndia) {
//       return `₹${indiaPrices[index].toLocaleString('en-IN')}`;
//     }

//     return `$${usdPrices[index].toLocaleString('en-US')}`;
//   };

//   /*
//    * =========================================================
//    * SELECT PLAN
//    * =========================================================
//    */

//   const handleSelectPlan = (bundle: any, index: number) => {
//     setSelectedBundle({
//       ...bundle,
//       index,
//       price: getPrice(index),
//     });
//   };

//   /*
//    * =========================================================
//    * CLOSE MODAL
//    * =========================================================
//    */

//   const closeModal = () => {
//     setSelectedBundle(null);
//   };

//   /*
//    * =========================================================
//    * CONTINUE / CONNECT
//    * =========================================================
//    */

//   const handleConnect = () => {
//     if (!selectedBundle) return;

//     onSelectBundle(selectedBundle.name);

//     setSelectedBundle(null);
//   };

//   /*
//    * Only show first 3 plans
//    */

//   const plans = SERVICE_BUNDLES.slice(0, 3);

//   return (
//     <>
//       {/* =========================================================
//           PRICING SECTION
//       ========================================================== */}

//       <section
//         className="
//           relative
//           w-full
//           overflow-x-hidden
//           border-b border-white/10
//           bg-[#080b11]
//           py-14
//           sm:py-20
//           lg:py-28
//         "
//       >

//         {/* =========================================================
//             BACKGROUND EFFECT
//         ========================================================== */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             left-1/2
//             top-0
//             h-[300px]
//             w-[600px]
//             -translate-x-1/2
//             rounded-full
//             bg-cyan-500/[0.045]
//             blur-[120px]
//           "
//         />

//         <div
//           className="
//             relative
//             mx-auto
//             w-full
//             max-w-[1500px]
//             px-4
//             sm:px-6
//             lg:px-8
//           "
//         >

//           {/* =========================================================
//               HEADER
//           ========================================================== */}

//           <div className="mx-auto max-w-3xl text-center">

//             {/* Badge */}

//             <div
//               className="
//                 inline-flex
//                 items-center
//                 gap-2
//                 rounded-full
//                 border
//                 border-cyan-400/20
//                 bg-cyan-400/[0.07]
//                 px-3
//                 py-1.5
//                 text-[10px]
//                 font-bold
//                 uppercase
//                 tracking-[0.12em]
//                 text-cyan-300
//                 sm:text-xs
//               "
//             >
//               <Sparkles className="h-3.5 w-3.5" />

//               <span>
//                 Structured Investment Packages
//               </span>
//             </div>

//             {/* Heading */}

//             <h2
//               className="
//                 mt-4
//                 font-display
//                 text-[30px]
//                 font-extrabold
//                 leading-[1.08]
//                 tracking-tight
//                 text-white
//                 sm:text-4xl
//                 md:text-5xl
//                 lg:text-[52px]
//               "
//             >
//               Curated Digital

//               <span className="block text-cyan-400">
//                 Growth Bundles
//               </span>
//             </h2>

//             {/* Description */}

//             <p
//               className="
//                 mx-auto
//                 mt-4
//                 max-w-2xl
//                 text-sm
//                 leading-6
//                 text-slate-400
//                 sm:text-base
//                 sm:leading-7
//               "
//             >
//               Transparent milestones, zero hidden costs, and complete
//               code & asset ownership from day one.
//             </p>

//           </div>

//           {/* =========================================================
//               PRICING CARDS
//           ========================================================== */}

//           <div
//             className="
//               mt-10
//               grid
//               grid-cols-1
//               gap-5
//               sm:mt-12
//               md:grid-cols-3
//               md:gap-6
//               lg:mt-16
//               lg:items-stretch
//             "
//           >

//             {plans.map((bundle, index) => {

//               const isPopular = bundle.popular;

//               return (
//                 <div
//                   key={bundle.id}
//                   className={`
//                     relative
//                     flex
//                     min-w-0
//                     flex-col
//                     rounded-2xl
//                     border
//                     p-5
//                     transition-all
//                     duration-300
//                     sm:p-6
//                     lg:rounded-3xl
//                     lg:p-7

//                     ${
//                       isPopular
//                         ? `
//                           border-cyan-400/60
//                           bg-gradient-to-b
//                           from-[#121b31]
//                           via-[#0d1425]
//                           to-[#090d17]
//                           shadow-[0_15px_50px_rgba(6,182,212,0.10)]
//                           lg:-translate-y-2
//                           lg:hover:-translate-y-3
//                         `
//                         : `
//                           border-white/[0.10]
//                           bg-[#0c1019]
//                           hover:border-white/[0.20]
//                           hover:bg-[#0e131e]
//                           lg:hover:-translate-y-1
//                         `
//                     }
//                   `}
//                 >

//                   {/* =================================================
//                       POPULAR BADGE
//                   ================================================== */}

//                   {isPopular && (
//                     <div
//                       className="
//                         absolute
//                         -top-3
//                         left-5
//                         z-10
//                         inline-flex
//                         items-center
//                         gap-1.5
//                         rounded-full
//                         border
//                         border-cyan-300/30
//                         bg-gradient-to-r
//                         from-cyan-500
//                         to-blue-600
//                         px-3
//                         py-1.5
//                         text-[9px]
//                         font-extrabold
//                         uppercase
//                         tracking-[0.1em]
//                         text-white
//                         shadow-lg
//                         shadow-cyan-500/20
//                         sm:left-6
//                       "
//                     >
//                       <Sparkles className="h-3 w-3" />

//                       Most Popular
//                     </div>
//                   )}

//                   {/* =================================================
//                       TOP CONTENT
//                   ================================================== */}

//                   <div>

//                     {/* Number */}

//                     <div className="mb-5 flex items-center justify-between">

//                       <span
//                         className={`
//                           flex
//                           h-7
//                           w-7
//                           items-center
//                           justify-center
//                           rounded-lg
//                           text-[10px]
//                           font-bold

//                           ${
//                             isPopular
//                               ? 'bg-cyan-400/10 text-cyan-300'
//                               : 'bg-white/[0.05] text-slate-500'
//                           }
//                         `}
//                       >
//                         {String(index + 1).padStart(2, '0')}
//                       </span>

//                       {isPopular && (
//                         <span
//                           className="
//                             rounded-md
//                             border
//                             border-cyan-400/10
//                             bg-cyan-400/[0.08]
//                             px-2
//                             py-1
//                             text-[9px]
//                             font-bold
//                             uppercase
//                             tracking-wider
//                             text-cyan-300
//                           "
//                         >
//                           Best Value
//                         </span>
//                       )}

//                     </div>

//                     {/* Package Name */}

//                     <h3
//                       className="
//                         font-display
//                         text-xl
//                         font-bold
//                         leading-[1.2]
//                         tracking-tight
//                         text-white
//                         sm:text-[22px]
//                         lg:text-xl
//                         xl:text-[22px]
//                       "
//                     >
//                       {bundle.name}
//                     </h3>

//                     {/* Ideal For */}

//                     <p
//                       className="
//                         mt-2
//                         text-xs
//                         leading-[1.55]
//                         text-slate-400
//                       "
//                     >
//                       {bundle.idealFor}
//                     </p>

//                     {/* =================================================
//                         PRICE
//                     ================================================== */}

//                     <div
//                       className="
//                         mt-5
//                         border-y
//                         border-white/[0.09]
//                         py-4
//                       "
//                     >

//                       <p
//                         className="
//                           text-[9px]
//                           font-semibold
//                           uppercase
//                           tracking-[0.15em]
//                           text-slate-500
//                         "
//                       >
//                         Starting Investment
//                       </p>

//                       <p
//                         className="
//                           mt-1
//                           font-mono
//                           text-[28px]
//                           font-extrabold
//                           leading-none
//                           tracking-tight
//                           text-white
//                           sm:text-[30px]
//                         "
//                       >
//                         {getPrice(index)}
//                       </p>

//                       {/* Delivery */}

//                       <div
//                         className="
//                           mt-3
//                           flex
//                           items-center
//                           gap-1.5
//                           text-[11px]
//                           text-slate-400
//                         "
//                       >
//                         <Clock
//                           className="
//                             h-3.5
//                             w-3.5
//                             shrink-0
//                             text-cyan-400
//                           "
//                         />

//                         <span>
//                           Delivery:
//                         </span>

//                         <span className="font-medium text-slate-300">
//                           {bundle.deliveryTime || '2 Weeks'}
//                         </span>
//                       </div>

//                     </div>

//                   </div>

//                   {/* =================================================
//                       FEATURES
//                   ================================================== */}

//                   <div className="mt-5 flex-1">

//                     <p
//                       className="
//                         mb-3
//                         text-[9px]
//                         font-bold
//                         uppercase
//                         tracking-[0.15em]
//                         text-slate-500
//                       "
//                     >
//                       Everything Included
//                     </p>

//                     <div className="space-y-3">

//                       {bundle.features.map(
//                         (feature: string, featureIndex: number) => (

//                           <div
//                             key={featureIndex}
//                             className="
//                               flex
//                               items-start
//                               gap-2.5
//                               text-xs
//                               leading-[1.45]
//                               text-slate-300
//                             "
//                           >

//                             <span
//                               className={`
//                                 mt-[1px]
//                                 flex
//                                 h-4
//                                 w-4
//                                 shrink-0
//                                 items-center
//                                 justify-center
//                                 rounded-full

//                                 ${
//                                   isPopular
//                                     ? 'bg-cyan-400/10'
//                                     : 'bg-white/[0.04]'
//                                 }
//                               `}
//                             >
//                               <Check
//                                 className="
//                                   h-3
//                                   w-3
//                                   text-cyan-400
//                                 "
//                                 strokeWidth={3}
//                               />
//                             </span>

//                             <span className="min-w-0">
//                               {feature}
//                             </span>

//                           </div>

//                         )
//                       )}

//                     </div>

//                   </div>

//                   {/* =================================================
//                       CTA
//                   ================================================== */}

//                   <button
//                     type="button"
//                     onClick={() => handleSelectPlan(bundle, index)}
//                     className={`
//                       mt-7
//                       flex
//                       min-h-[48px]
//                       w-full
//                       items-center
//                       justify-center
//                       gap-2
//                       rounded-xl
//                       px-4
//                       py-3
//                       text-center
//                       text-xs
//                       font-bold
//                       leading-4
//                       transition-all
//                       duration-200
//                       active:scale-[0.98]
//                       focus:outline-none
//                       focus:ring-2
//                       focus:ring-cyan-400/50
//                       focus:ring-offset-2
//                       focus:ring-offset-[#080b11]

//                       ${
//                         isPopular
//                           ? `
//                             bg-gradient-to-r
//                             from-cyan-500
//                             to-blue-600
//                             text-white
//                             shadow-lg
//                             shadow-cyan-500/20
//                             hover:from-cyan-400
//                             hover:to-blue-500
//                           `
//                           : `
//                             bg-white/[0.08]
//                             text-white
//                             hover:bg-white/[0.14]
//                           `
//                       }
//                     `}
//                   >

//                     <span>
//                       View Plan Details
//                     </span>

//                     <ArrowRight
//                       className="
//                         h-4
//                         w-4
//                         shrink-0
//                       "
//                     />

//                   </button>

//                 </div>
//               );
//             })}

//           </div>

//           {/* =========================================================
//               BOTTOM TRUST MESSAGE
//           ========================================================== */}

//           <div
//             className="
//               mx-auto
//               mt-8
//               flex
//               max-w-xl
//               items-center
//               justify-center
//               gap-2
//               text-center
//               text-[10px]
//               leading-5
//               text-slate-500
//               sm:mt-10
//               sm:text-xs
//             "
//           >

//             <Check
//               className="
//                 h-3.5
//                 w-3.5
//                 shrink-0
//                 text-cyan-400
//               "
//             />

//             <span>
//               Complete source-code, design & asset ownership included.
//             </span>

//           </div>

//         </div>
//       </section>

//       {/* ============================================================
//           PLAN DETAILS MODAL
//       ============================================================= */}

//       {selectedBundle && (
//         <div
//           className="
//             fixed
//             inset-0
//             z-[9999]
//             flex
//             items-center
//             justify-center
//             bg-black/80
//             p-4
//             backdrop-blur-md
//           "
//           onClick={closeModal}
//         >

//           {/* ========================================================
//               MODAL
//           ========================================================= */}

//           <div
//             className="
//               relative
//               max-h-[90vh]
//               w-full
//               max-w-2xl
//               overflow-y-auto
//               rounded-3xl
//               border
//               border-white/[0.12]
//               bg-[#0b101a]
//               shadow-[0_30px_100px_rgba(0,0,0,0.6)]
//             "
//             onClick={(e) => e.stopPropagation()}
//           >

//             {/* ======================================================
//                 MODAL TOP GLOW
//             ======================================================= */}

//             <div
//               className="
//                 pointer-events-none
//                 absolute
//                 left-1/2
//                 top-0
//                 h-40
//                 w-80
//                 -translate-x-1/2
//                 rounded-full
//                 bg-cyan-500/10
//                 blur-[80px]
//               "
//             />

//             {/* ======================================================
//                 CLOSE BUTTON
//             ======================================================= */}

//             <button
//               type="button"
//               onClick={closeModal}
//               className="
//                 absolute
//                 right-4
//                 top-4
//                 z-20
//                 flex
//                 h-9
//                 w-9
//                 items-center
//                 justify-center
//                 rounded-full
//                 border
//                 border-white/10
//                 bg-white/[0.06]
//                 text-slate-400
//                 transition
//                 hover:bg-white/[0.12]
//                 hover:text-white
//               "
//               aria-label="Close"
//             >
//               <X className="h-4 w-4" />
//             </button>

//             {/* ======================================================
//                 MODAL CONTENT
//             ======================================================= */}

//             <div className="relative p-6 sm:p-8">

//               {/* Plan Number */}

//               <div
//                 className="
//                   inline-flex
//                   items-center
//                   gap-2
//                   rounded-full
//                   border
//                   border-cyan-400/20
//                   bg-cyan-400/[0.07]
//                   px-3
//                   py-1.5
//                   text-[10px]
//                   font-bold
//                   uppercase
//                   tracking-[0.12em]
//                   text-cyan-300
//                 "
//               >
//                 <Sparkles className="h-3.5 w-3.5" />

//                 Plan {String(selectedBundle.index + 1).padStart(2, '0')}
//               </div>

//               {/* Title */}

//               <h3
//                 className="
//                   mt-5
//                   pr-10
//                   font-display
//                   text-3xl
//                   font-extrabold
//                   tracking-tight
//                   text-white
//                   sm:text-4xl
//                 "
//               >
//                 {selectedBundle.name}
//               </h3>

//               {/* Description */}

//               <p
//                 className="
//                   mt-3
//                   max-w-xl
//                   text-sm
//                   leading-6
//                   text-slate-400
//                 "
//               >
//                 {selectedBundle.idealFor}
//               </p>

//               {/* ====================================================
//                   PRICE BOX
//               ===================================================== */}

//               <div
//                 className="
//                   mt-6
//                   rounded-2xl
//                   border
//                   border-cyan-400/15
//                   bg-cyan-400/[0.04]
//                   p-5
//                 "
//               >

//                 <p
//                   className="
//                     text-[9px]
//                     font-bold
//                     uppercase
//                     tracking-[0.15em]
//                     text-slate-500
//                   "
//                 >
//                   Starting Investment
//                 </p>

//                 <div className="mt-2 flex flex-wrap items-end gap-3">

//                   <span
//                     className="
//                       font-mono
//                       text-3xl
//                       font-extrabold
//                       tracking-tight
//                       text-white
//                       sm:text-4xl
//                     "
//                   >
//                     {selectedBundle.price}
//                   </span>

//                   <span
//                     className="
//                       mb-1
//                       flex
//                       items-center
//                       gap-1.5
//                       text-xs
//                       text-slate-400
//                     "
//                   >
//                     <Clock className="h-3.5 w-3.5 text-cyan-400" />

//                     {selectedBundle.deliveryTime || '2 Weeks'}
//                   </span>

//                 </div>

//               </div>

//               {/* ====================================================
//                   ALL FEATURES
//               ===================================================== */}

//               <div className="mt-7">

//                 <p
//                   className="
//                     text-[10px]
//                     font-bold
//                     uppercase
//                     tracking-[0.15em]
//                     text-slate-500
//                   "
//                 >
//                   What's Included
//                 </p>

//                 <div className="mt-4 grid gap-3 sm:grid-cols-2">

//                   {selectedBundle.features.map(
//                     (feature: string, index: number) => (

//                       <div
//                         key={index}
//                         className="
//                           flex
//                           items-start
//                           gap-3
//                           rounded-xl
//                           border
//                           border-white/[0.07]
//                           bg-white/[0.025]
//                           p-3
//                         "
//                       >

//                         <span
//                           className="
//                             mt-0.5
//                             flex
//                             h-5
//                             w-5
//                             shrink-0
//                             items-center
//                             justify-center
//                             rounded-full
//                             bg-cyan-400/10
//                           "
//                         >
//                           <Check
//                             className="
//                               h-3
//                               w-3
//                               text-cyan-400
//                             "
//                             strokeWidth={3}
//                           />
//                         </span>

//                         <span
//                           className="
//                             text-xs
//                             leading-5
//                             text-slate-300
//                           "
//                         >
//                           {feature}
//                         </span>

//                       </div>

//                     )
//                   )}

//                 </div>

//               </div>

//               {/* ====================================================
//                   OWNERSHIP
//               ===================================================== */}

//               <div
//                 className="
//                   mt-6
//                   rounded-xl
//                   border
//                   border-white/[0.07]
//                   bg-white/[0.025]
//                   p-4
//                 "
//               >

//                 <div className="flex items-start gap-3">

//                   <Check
//                     className="
//                       mt-0.5
//                       h-4
//                       w-4
//                       shrink-0
//                       text-cyan-400
//                     "
//                   />

//                   <div>

//                     <p
//                       className="
//                         text-xs
//                         font-semibold
//                         text-white
//                       "
//                     >
//                       Full Ownership
//                     </p>

//                     <p
//                       className="
//                         mt-1
//                         text-xs
//                         leading-5
//                         text-slate-500
//                       "
//                     >
//                       Complete source-code, design and asset ownership
//                       is included with your project.
//                     </p>

//                   </div>

//                 </div>

//               </div>

//               {/* ====================================================
//                   ACTION BUTTONS
//               ===================================================== */}

//               <div className="mt-7 flex flex-col gap-3 sm:flex-row">

//                 {/* Connect */}

//                 <button
//                   type="button"
//                   onClick={handleConnect}
//                   className="
//                     flex
//                     min-h-[52px]
//                     flex-1
//                     items-center
//                     justify-center
//                     gap-2
//                     rounded-xl
//                     bg-gradient-to-r
//                     from-cyan-500
//                     to-blue-600
//                     px-5
//                     py-3
//                     text-sm
//                     font-bold
//                     text-white
//                     shadow-lg
//                     shadow-cyan-500/20
//                     transition-all
//                     hover:from-cyan-400
//                     hover:to-blue-500
//                     active:scale-[0.98]
//                   "
//                 >

//                   <MessageCircle className="h-4 w-4" />

//                   Connect With Us

//                   <ArrowRight className="h-4 w-4" />

//                 </button>

//                 {/* Back */}

//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="
//                     min-h-[52px]
//                     rounded-xl
//                     border
//                     border-white/10
//                     bg-white/[0.05]
//                     px-6
//                     py-3
//                     text-sm
//                     font-semibold
//                     text-slate-300
//                     transition
//                     hover:bg-white/[0.09]
//                     hover:text-white
//                   "
//                 >
//                   Back
//                 </button>

//               </div>

//               {/* Small note */}

//               <p
//                 className="
//                   mt-4
//                   text-center
//                   text-[10px]
//                   leading-5
//                   text-slate-600
//                 "
//               >
//                 Select “Connect With Us” to discuss your project,
//                 requirements and next steps.
//               </p>

//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
import React, { useState } from "react";
import {
  Sparkles,
  Check,
  ArrowRight,
  Clock,
  X,
  MessageCircle,
} from "lucide-react";

import {
  SERVICE_BUNDLES,
  ServiceBundle,
} from "../data/servicesData";

interface ServiceBundlesSectionProps {
  onSelectBundle: (bundleName: string) => void;
  currentCurrency: string;
}

interface SelectedBundle extends ServiceBundle {
  index: number;
  price: string;
}

export const ServiceBundlesSection: React.FC<
  ServiceBundlesSectionProps
> = ({ onSelectBundle, currentCurrency }) => {
  const [selectedBundle, setSelectedBundle] =
    useState<SelectedBundle | null>(null);

  /*
   * =========================================================
   * CURRENCY
   * =========================================================
   */

  const isIndia =
    currentCurrency === "INR" ||
    currentCurrency === "India" ||
    currentCurrency === "₹";

  /*
   * =========================================================
   * PRICE FORMATTER
   * =========================================================
   */

  const getPrice = (bundle: ServiceBundle): string => {
    if (isIndia) {
      return `₹${bundle.startingINR.toLocaleString("en-IN")}`;
    }

    return `$${bundle.startingUSD.toLocaleString("en-US")}`;
  };

  /*
   * =========================================================
   * SELECT PLAN
   * =========================================================
   */

  const handleSelectPlan = (
    bundle: ServiceBundle,
    index: number
  ) => {
    setSelectedBundle({
      ...bundle,
      index,
      price: getPrice(bundle),
    });
  };

  /*
   * =========================================================
   * CLOSE MODAL
   * =========================================================
   */

  const closeModal = () => {
    setSelectedBundle(null);
  };

  /*
   * =========================================================
   * CONNECT
   * =========================================================
   */

  const handleConnect = () => {
    if (!selectedBundle) {
      return;
    }

    onSelectBundle(selectedBundle.name);

    setSelectedBundle(null);
  };

  /*
   * =========================================================
   * ONLY SHOW FIRST 3 PLANS
   * =========================================================
   */

  const plans = SERVICE_BUNDLES.slice(0, 3);

  return (
    <>
      {/* =========================================================
          PRICING SECTION
      ========================================================== */}

      <section
        id="services"
        className="
          relative
          w-full
          overflow-x-hidden
          border-b
          border-white/10
          bg-[#080b11]
          py-14
          sm:py-20
          lg:py-28
        "
      >
        {/* =========================================================
            BACKGROUND EFFECT
        ========================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-[300px]
            w-[600px]
            -translate-x-1/2
            rounded-full
            bg-cyan-500/[0.045]
            blur-[120px]
          "
        />

        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[1500px]
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* =========================================================
              HEADER
          ========================================================== */}

          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/[0.07]
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-cyan-300
                sm:text-xs
              "
            >
              <Sparkles className="h-3.5 w-3.5" />

              <span>
                Structured Investment Packages
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                mt-4
                font-display
                text-[30px]
                font-extrabold
                leading-[1.08]
                tracking-tight
                text-white
                sm:text-4xl
                md:text-5xl
                lg:text-[52px]
              "
            >
              Curated Digital

              <span className="block text-cyan-400">
                Growth Bundles
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-sm
                leading-6
                text-slate-400
                sm:text-base
                sm:leading-7
              "
            >
              Transparent milestones, zero hidden costs, and
              complete code & asset ownership from day one.
            </p>
          </div>

          {/* =========================================================
              PRICING CARDS
          ========================================================== */}

          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-5
              sm:mt-12
              md:grid-cols-3
              md:gap-6
              lg:mt-16
              lg:items-stretch
            "
          >
            {plans.map((bundle, index) => {
              const isPopular = bundle.popular;

              return (
                <div
                  key={bundle.id}
                  className={`
                    relative
                    flex
                    min-w-0
                    flex-col
                    rounded-2xl
                    border
                    p-5
                    transition-all
                    duration-300
                    sm:p-6
                    lg:rounded-3xl
                    lg:p-7

                    ${
                      isPopular
                        ? `
                          border-cyan-400/60
                          bg-gradient-to-b
                          from-[#121b31]
                          via-[#0d1425]
                          to-[#090d17]
                          shadow-[0_15px_50px_rgba(6,182,212,0.10)]
                          lg:-translate-y-2
                          lg:hover:-translate-y-3
                        `
                        : `
                          border-white/[0.10]
                          bg-[#0c1019]
                          hover:border-white/[0.20]
                          hover:bg-[#0e131e]
                          lg:hover:-translate-y-1
                        `
                    }
                  `}
                >
                  {/* =================================================
                      POPULAR BADGE
                  ================================================== */}

                  {isPopular && (
                    <div
                      className="
                        absolute
                        -top-3
                        left-5
                        z-10
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-cyan-300/30
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-600
                        px-3
                        py-1.5
                        text-[9px]
                        font-extrabold
                        uppercase
                        tracking-[0.1em]
                        text-white
                        shadow-lg
                        shadow-cyan-500/20
                        sm:left-6
                      "
                    >
                      <Sparkles className="h-3 w-3" />

                      Most Popular
                    </div>
                  )}

                  {/* =================================================
                      TOP CONTENT
                  ================================================== */}

                  <div>
                    {/* Number */}

                    <div className="mb-5 flex items-center justify-between">
                      <span
                        className={`
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          text-[10px]
                          font-bold

                          ${
                            isPopular
                              ? "bg-cyan-400/10 text-cyan-300"
                              : "bg-white/[0.05] text-slate-500"
                          }
                        `}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {isPopular && (
                        <span
                          className="
                            rounded-md
                            border
                            border-cyan-400/10
                            bg-cyan-400/[0.08]
                            px-2
                            py-1
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-cyan-300
                          "
                        >
                          Best Value
                        </span>
                      )}
                    </div>

                    {/* Package Name */}

                    <h3
                      className="
                        font-display
                        text-xl
                        font-bold
                        leading-[1.2]
                        tracking-tight
                        text-white
                        sm:text-[22px]
                        lg:text-xl
                        xl:text-[22px]
                      "
                    >
                      {bundle.name}
                    </h3>

                    {/* Ideal For */}

                    <p
                      className="
                        mt-2
                        text-xs
                        leading-[1.55]
                        text-slate-400
                      "
                    >
                      {bundle.idealFor}
                    </p>

                    {/* =================================================
                        PRICE
                    ================================================== */}

                    <div
                      className="
                        mt-5
                        border-y
                        border-white/[0.09]
                        py-4
                      "
                    >
                      <p
                        className="
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.15em]
                          text-slate-500
                        "
                      >
                        Starting Investment
                      </p>

                      <p
                        className="
                          mt-1
                          font-mono
                          text-[28px]
                          font-extrabold
                          leading-none
                          tracking-tight
                          text-white
                          sm:text-[30px]
                        "
                      >
                        {getPrice(bundle)}
                      </p>

                      {/* Delivery */}

                      <div
                        className="
                          mt-3
                          flex
                          items-center
                          gap-1.5
                          text-[11px]
                          text-slate-400
                        "
                      >
                        <Clock
                          className="
                            h-3.5
                            w-3.5
                            shrink-0
                            text-cyan-400
                          "
                        />

                        <span>
                          Delivery:
                        </span>

                        <span className="font-medium text-slate-300">
                          {bundle.deliveryTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      FEATURES
                  ================================================== */}

                  <div className="mt-5 flex-1">
                    <p
                      className="
                        mb-3
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-slate-500
                      "
                    >
                      Everything Included
                    </p>

                    <div className="space-y-3">
                      {bundle.features.map(
                        (feature, featureIndex) => (
                          <div
                            key={`${bundle.id}-${featureIndex}`}
                            className="
                              flex
                              items-start
                              gap-2.5
                              text-xs
                              leading-[1.45]
                              text-slate-300
                            "
                          >
                            <span
                              className={`
                                mt-[1px]
                                flex
                                h-4
                                w-4
                                shrink-0
                                items-center
                                justify-center
                                rounded-full

                                ${
                                  isPopular
                                    ? "bg-cyan-400/10"
                                    : "bg-white/[0.04]"
                                }
                              `}
                            >
                              <Check
                                className="
                                  h-3
                                  w-3
                                  text-cyan-400
                                "
                                strokeWidth={3}
                              />
                            </span>

                            <span className="min-w-0">
                              {feature}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* =================================================
                      CTA
                  ================================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      handleSelectPlan(bundle, index)
                    }
                    className={`
                      mt-7
                      flex
                      min-h-[48px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      px-4
                      py-3
                      text-center
                      text-xs
                      font-bold
                      leading-4
                      transition-all
                      duration-200
                      active:scale-[0.98]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-cyan-400/50
                      focus:ring-offset-2
                      focus:ring-offset-[#080b11]

                      ${
                        isPopular
                          ? `
                            bg-gradient-to-r
                            from-cyan-500
                            to-blue-600
                            text-white
                            shadow-lg
                            shadow-cyan-500/20
                            hover:from-cyan-400
                            hover:to-blue-500
                          `
                          : `
                            bg-white/[0.08]
                            text-white
                            hover:bg-white/[0.14]
                          `
                      }
                    `}
                  >
                    <span>
                      View Plan Details
                    </span>

                    <ArrowRight
                      className="
                        h-4
                        w-4
                        shrink-0
                      "
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* =========================================================
              BOTTOM TRUST MESSAGE
          ========================================================== */}

          <div
            className="
              mx-auto
              mt-8
              flex
              max-w-xl
              items-center
              justify-center
              gap-2
              text-center
              text-[10px]
              leading-5
              text-slate-500
              sm:mt-10
              sm:text-xs
            "
          >
            <Check
              className="
                h-3.5
                w-3.5
                shrink-0
                text-cyan-400
              "
            />

            <span>
              Complete source-code, design & asset ownership
              included.
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          PLAN DETAILS MODAL
      ============================================================= */}

      {selectedBundle && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/80
            p-4
            backdrop-blur-md
          "
          onClick={closeModal}
        >
          {/* ========================================================
              MODAL
          ========================================================= */}

          <div
            className="
              relative
              max-h-[90vh]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-3xl
              border
              border-white/[0.12]
              bg-[#0b101a]
              shadow-[0_30px_100px_rgba(0,0,0,0.6)]
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* ======================================================
                MODAL TOP GLOW
            ======================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                h-40
                w-80
                -translate-x-1/2
                rounded-full
                bg-cyan-500/10
                blur-[80px]
              "
            />

            {/* ======================================================
                CLOSE BUTTON
            ======================================================= */}

            <button
              type="button"
              onClick={closeModal}
              className="
                absolute
                right-4
                top-4
                z-20
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.06]
                text-slate-400
                transition
                hover:bg-white/[0.12]
                hover:text-white
              "
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* ======================================================
                MODAL CONTENT
            ======================================================= */}

            <div className="relative p-6 sm:p-8">
              {/* Plan Number */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-cyan-400/20
                  bg-cyan-400/[0.07]
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-cyan-300
                "
              >
                <Sparkles className="h-3.5 w-3.5" />

                Plan{" "}
                {String(
                  selectedBundle.index + 1
                ).padStart(2, "0")}
              </div>

              {/* Badge */}

              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className="
                    rounded-full
                    border
                    border-cyan-400/20
                    bg-cyan-400/[0.07]
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-cyan-300
                  "
                >
                  {selectedBundle.badge}
                </span>

                {selectedBundle.popular && (
                  <span
                    className="
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-600
                      px-3
                      py-1.5
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-white
                    "
                  >
                    Most Popular
                  </span>
                )}
              </div>

              {/* Title */}

              <h3
                className="
                  mt-5
                  pr-10
                  font-display
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                {selectedBundle.name}
              </h3>

              {/* Tagline */}

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                {selectedBundle.tagline}
              </p>

              {/* ====================================================
                  PRICE BOX
              ===================================================== */}

              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-cyan-400/15
                  bg-cyan-400/[0.04]
                  p-5
                "
              >
                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-slate-500
                  "
                >
                  Starting Investment
                </p>

                <div className="mt-2 flex flex-wrap items-end gap-3">
                  <span
                    className="
                      font-mono
                      text-3xl
                      font-extrabold
                      tracking-tight
                      text-white
                      sm:text-4xl
                    "
                  >
                    {selectedBundle.price}
                  </span>

                  <span
                    className="
                      mb-1
                      flex
                      items-center
                      gap-1.5
                      text-xs
                      text-slate-400
                    "
                  >
                    <Clock className="h-3.5 w-3.5 text-cyan-400" />

                    {selectedBundle.deliveryTime}
                  </span>
                </div>
              </div>

              {/* ====================================================
                  DESCRIPTION
              ===================================================== */}

              <div className="mt-7">
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-slate-500
                  "
                >
                  About This Package
                </p>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-slate-400
                  "
                >
                  {selectedBundle.description}
                </p>
              </div>

              {/* ====================================================
                  IDEAL FOR
              ===================================================== */}

              <div
                className="
                  mt-6
                  rounded-xl
                  border
                  border-cyan-400/10
                  bg-cyan-400/[0.04]
                  p-4
                "
              >
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-cyan-400
                  "
                >
                  Ideal For
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-slate-300
                  "
                >
                  {selectedBundle.idealFor}
                </p>
              </div>

              {/* ====================================================
                  ALL FEATURES
              ===================================================== */}

              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-slate-500
                    "
                  >
                    What's Included
                  </p>

                  <span className="text-xs text-slate-600">
                    {selectedBundle.features.length} features
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {selectedBundle.features.map(
                    (feature, index) => (
                      <div
                        key={`${selectedBundle.id}-modal-${index}`}
                        className="
                          flex
                          items-start
                          gap-3
                          rounded-xl
                          border
                          border-white/[0.07]
                          bg-white/[0.025]
                          p-3
                          transition
                          hover:border-cyan-400/20
                          hover:bg-cyan-400/[0.04]
                        "
                      >
                        <span
                          className="
                            mt-0.5
                            flex
                            h-5
                            w-5
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-cyan-400/10
                          "
                        >
                          <Check
                            className="
                              h-3
                              w-3
                              text-cyan-400
                            "
                            strokeWidth={3}
                          />
                        </span>

                        <span
                          className="
                            text-xs
                            leading-5
                            text-slate-300
                          "
                        >
                          {feature}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* ====================================================
                  OWNERSHIP
              ===================================================== */}

              <div
                className="
                  mt-6
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  p-4
                "
              >
                <div className="flex items-start gap-3">
                  <Check
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      text-cyan-400
                    "
                  />

                  <div>
                    <p
                      className="
                        text-xs
                        font-semibold
                        text-white
                      "
                    >
                      Full Ownership
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                        text-slate-500
                      "
                    >
                      Complete source-code, design and
                      asset ownership is included with your
                      project.
                    </p>
                  </div>
                </div>
              </div>

              {/* ====================================================
                  ACTION BUTTONS
              ===================================================== */}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {/* Connect */}

                <button
                  type="button"
                  onClick={handleConnect}
                  className="
                    flex
                    min-h-[52px]
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-cyan-500/20
                    transition-all
                    hover:from-cyan-400
                    hover:to-blue-500
                    active:scale-[0.98]
                  "
                >
                  <MessageCircle className="h-4 w-4" />

                  Connect With Us

                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Back */}

                <button
                  type="button"
                  onClick={closeModal}
                  className="
                    min-h-[52px]
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.05]
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-slate-300
                    transition
                    hover:bg-white/[0.09]
                    hover:text-white
                  "
                >
                  Back
                </button>
              </div>

              {/* Small Note */}

              <p
                className="
                  mt-4
                  text-center
                  text-[10px]
                  leading-5
                  text-slate-600
                "
              >
                Select "Connect With Us" to discuss your
                project, requirements and next steps.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceBundlesSection;