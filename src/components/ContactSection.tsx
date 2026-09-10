// import React, { useState } from 'react';
// import { 
//   Phone, 
//   Mail, 
//   MapPin, 
//   Clock, 
//   Send, 
//   CheckCircle2, 
//   Sparkles, 
//   ShieldCheck, 
//   Globe2,
//   Loader2
// } from 'lucide-react';
// import { generateWhatsAppUrl } from '../utils/helpers';

// export const ContactSection: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [businessType, setBusinessType] = useState('');
//   const [message, setMessage] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name || !email || !phone) {
//       setErrorMsg('Please complete all required fields.');
//       return;
//     }

//     setSubmitting(true);
//     setErrorMsg('');

//     try {
//       const res = await fetch('/api/leads', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name,
//           email,
//           phone,
//           businessNiche: businessType || 'General Consultation',
//           projectDescription: message,
//           servicesRequired: ['Direct Inquiry'],
//           goals: ['Get Leads'],
//           timeline: 'Flexible'
//         })
//       });

//       const data = await res.json();
//       if (data.success) {
//         setSubmitted(true);
//       } else {
//         setErrorMsg(data.error || 'Submission failed.');
//       }
//     } catch (err) {
//       console.error('Contact error:', err);
//       setErrorMsg('Network error. Please reach Abhishek directly via WhatsApp.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const whatsappDirectUrl = generateWhatsAppUrl(
//     '+919156075536',
//     `Hi Abhishek, I am ${name || 'contacting you from your website'}. I run a ${businessType || 'business'} and would like to discuss building a modern digital solution.`
//   );

//   return (
//     <section id="contact" className="py-20 md:py-28 relative bg-[#090b10]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
//             <Mail className="w-3.5 h-3.5" />
//             <span>Direct Access • Zero Middlemen</span>
//           </div>
//           <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
//             Start Your Digital Project
//           </h2>
//           <p className="mt-3 text-sm sm:text-base text-slate-300">
//             Reach out directly. No junior sales reps or automated ticketing queues. You speak directly with Abhishek.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
//           {/* Left Column: Direct Contact & Location Info */}
//           <div className="lg:col-span-5 space-y-6">
            
//             <div className="p-6 sm:p-8 rounded-3xl bg-[#0c101c] border border-white/10 space-y-6">
              
//               <div>
//                 <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
//                   Primary Contact & Lead Architect
//                 </span>
//                 <h3 className="font-display text-2xl font-extrabold text-white">
//                   Abhishek
//                 </h3>
//                 <p className="text-xs text-slate-400 mt-0.5">
//                   Founder & Full-Stack Digital Architect
//                 </p>
//               </div>

//               <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
                
//                 {/* Phone & WhatsApp */}
//                 <div className="flex items-start gap-3">
//                   <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
//                     <Phone className="w-4 h-4" />
//                   </div>
//                   <div>
//                     <span className="text-slate-400 block mb-0.5">Phone & WhatsApp:</span>
//                     <a 
//                       href="tel:+919156075536" 
//                       className="text-white font-mono font-bold hover:text-cyan-400 transition-colors text-sm"
//                     >
//                       +91 9156075536
//                     </a>
//                     <span className="text-[10px] text-emerald-400 block mt-0.5">
//                       ✓ Instant WhatsApp Chat Available
//                     </span>
//                   </div>
//                 </div>

//                 {/* Direct Email */}
//                 <div className="flex items-start gap-3">
//                   <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
//                     <Mail className="w-4 h-4" />
//                   </div>
//                   <div>
//                     <span className="text-slate-400 block mb-0.5">Direct Project Email:</span>
//                     <a 
//                       href="mailto:abhishekkuntare02@gmail.com" 
//                       className="text-cyan-400 font-mono font-bold hover:underline transition-colors text-sm break-all"
//                     >
//                       abhishekkuntare02@gmail.com
//                     </a>
//                     <span className="text-[10px] text-slate-400 block mt-0.5">
//                       All website inquiries and roadmaps routed directly here
//                     </span>
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="flex items-start gap-3">
//                   <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
//                     <MapPin className="w-4 h-4" />
//                   </div>
//                   <div>
//                     <span className="text-slate-400 block mb-0.5">Headquarters:</span>
//                     <span className="text-white font-medium text-sm">
//                       Amravati, Maharashtra, India
//                     </span>
//                     <span className="text-[10px] text-slate-400 block mt-0.5">
//                       Available for clients worldwide across all major timezones
//                     </span>
//                   </div>
//                 </div>

//                 {/* Response SLA */}
//                 <div className="flex items-start gap-3">
//                   <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
//                     <Clock className="w-4 h-4" />
//                   </div>
//                   <div>
//                     <span className="text-slate-400 block mb-0.5">Response Time:</span>
//                     <span className="text-white font-medium text-sm">
//                       Within 2–4 hours (WhatsApp is fastest)
//                     </span>
//                   </div>
//                 </div>

//               </div>

//               {/* Direct WhatsApp Callout Banner */}
//               <div className="pt-4 border-t border-white/10">
//                 <a
//                   href={whatsappDirectUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
//                 >
//                   <Phone className="w-4 h-4" />
//                   <span>Message Abhishek on WhatsApp</span>
//                 </a>
//               </div>

//             </div>

//             {/* Quick Guarantees */}
//             <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs text-slate-300">
//               <div className="flex items-center gap-2">
//                 <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
//                 <span>NDA & Confidentiality agreement provided on request</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
//                 <span>Zero sales pressure: We recommend only what solves your bottleneck</span>
//               </div>
//             </div>

//           </div>

//           {/* Right Column: Direct Message Form */}
//           <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-[#0c101c] border border-white/10 shadow-2xl">
//             {submitted ? (
//               <div className="text-center py-10 space-y-4 animate-in fade-in duration-200">
//                 <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
//                   <CheckCircle2 className="w-8 h-8" />
//                 </div>
                
//                 <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
//                   <Mail className="w-3.5 h-3.5 text-cyan-400" />
//                   <span>Dispatched to: abhishekkuntare02@gmail.com</span>
//                 </div>

//                 <h3 className="font-display text-2xl font-bold text-white">
//                   Inquiry Received & Dispatched!
//                 </h3>
                
//                 <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
//                   Thank you, <strong>{name}</strong>. Your project inquiry has been securely routed to Abhishek at <span className="text-cyan-400 font-mono font-semibold">abhishekkuntare02@gmail.com</span>. Abhishek will personally review your specifications and get in touch within 2–4 hours.
//                 </p>

//                 <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
//                   <a
//                     href={`mailto:abhishekkuntare02@gmail.com?subject=${encodeURIComponent(`New Project Inquiry: ${name} (${businessType || 'General'})`)}&body=${encodeURIComponent(`Hi Abhishek,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nBusiness Type: ${businessType || 'General'}\n\nProject Scope & Message:\n${message || 'I would like to discuss building a modern digital solution.'}\n\nPlease reach back at your earliest convenience!`)}`}
//                     className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
//                   >
//                     <Mail className="w-3.5 h-3.5 text-cyan-400" />
//                     <span>Open in Email App</span>
//                   </a>

//                   <a
//                     href={whatsappDirectUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
//                   >
//                     <Phone className="w-3.5 h-3.5" />
//                     <span>Chat on WhatsApp</span>
//                   </a>
//                 </div>

//                 <button
//                   onClick={() => setSubmitted(false)}
//                   className="text-xs text-slate-400 hover:text-white underline pt-3 block mx-auto cursor-pointer"
//                 >
//                   Send another inquiry
//                 </button>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <h3 className="font-display text-xl font-bold text-white mb-2">
//                   Send a Direct Project Message
//                 </h3>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-300 mb-1">
//                       Your Name *
//                     </label>
//                     <input
//                       type="text"
//                       required
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       placeholder="e.g. John Doe / Dr. Sharma"
//                       className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-semibold text-slate-300 mb-1">
//                       Work Email *
//                     </label>
//                     <input
//                       type="email"
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="e.g. john@business.com"
//                       className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-300 mb-1">
//                       Phone Number / WhatsApp *
//                     </label>
//                     <input
//                       type="tel"
//                       required
//                       value={phone}
//                       onChange={(e) => setPhone(e.target.value)}
//                       placeholder="+91 91560 75536"
//                       className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-semibold text-slate-300 mb-1">
//                       Business Type / Industry
//                     </label>
//                     <input
//                       type="text"
//                       value={businessType}
//                       onChange={(e) => setBusinessType(e.target.value)}
//                       placeholder="e.g. Dental Clinic, Restaurant, Real Estate..."
//                       className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-slate-300 mb-1">
//                     What would you like to build or modernize?
//                   </label>
//                   <textarea
//                     rows={4}
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Briefly describe your goals, required features, or any specific reference sites..."
//                     className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
//                   />
//                 </div>

//                 {errorMsg && (
//                   <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
//                     {errorMsg}
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       <span>Sending Message...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-4 h-4" />
//                       <span>Send Direct Inquiry to Abhishek</span>
//                     </>
//                   )}
//                 </button>
//               </form>
//             )}
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// };
import React, { useState } from 'react';

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

import { generateWhatsAppUrl } from '../utils/helpers';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  /**
   * Direct email inquiry
   *
   * No API
   * No database
   * No Resend
   * No serverless function
   *
   * Opens the user's default email application with
   * all form information already filled in.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setErrorMsg('');

    const subject = `New Project Inquiry — ${name.trim()}`;

    const emailBody = `
Hi Abhishek,

I would like to discuss a digital project with you.

━━━━━━━━━━━━━━━━━━━━
CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━

Name: ${name.trim()}
Email: ${email.trim()}
Phone / WhatsApp: ${phone.trim()}
Business Type / Industry: ${
      businessType.trim() || 'Not specified'
    }

━━━━━━━━━━━━━━━━━━━━
PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━

Message:
${message.trim() || 'No additional project details provided.'}

━━━━━━━━━━━━━━━━━━━━

Please get back to me regarding this project.

Thank you,
${name.trim()}
    `.trim();

    const mailtoUrl =
      `mailto:abhishekkuntare02@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    // Open user's default email application
    window.location.href = mailtoUrl;
  };

  /**
   * Direct WhatsApp URL
   */
  const whatsappDirectUrl = generateWhatsAppUrl(
    '+919156075536',
    `Hi Abhishek, I am ${
      name.trim() || 'contacting you from your website'
    }. I run a ${
      businessType.trim() || 'business'
    } and would like to discuss building a modern digital solution.

My Email: ${email.trim() || 'Not provided'}
My Phone: ${phone.trim() || 'Not provided'}

Project Details:
${
  message.trim() ||
  'I would like to discuss building a modern digital solution.'
}`
  );

  return (
    <section
      id="contact"
      className="relative bg-[#090b10] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================== */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Mail className="h-3.5 w-3.5" />
            <span>Direct Access • Zero Middlemen</span>
          </div>

          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Start Your Digital Project
          </h2>

          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Reach out directly. No junior sales reps or automated ticketing
            queues. You speak directly with Abhishek.
          </p>
        </div>

        {/* =========================
            MAIN GRID
        ========================== */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">

          {/* =========================
              LEFT COLUMN
          ========================== */}
          <div className="space-y-6 lg:col-span-5">

            <div className="space-y-6 rounded-3xl border border-white/10 bg-[#0c101c] p-6 sm:p-8">

              {/* Contact Header */}
              <div>
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  Primary Contact & Lead Architect
                </span>

                <h3 className="font-display text-2xl font-extrabold text-white">
                  Abhishek
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  Founder & Full-Stack Digital Architect
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-5 border-t border-white/10 pt-4 text-xs">

                {/* =========================
                    PHONE
                ========================== */}
                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400">
                    <Phone className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <span className="mb-0.5 block text-slate-400">
                      Phone & WhatsApp:
                    </span>

                    <a
                      href="tel:+919156075536"
                      className="font-mono text-sm font-bold text-white transition-colors hover:text-cyan-400"
                    >
                      +91 9156075536
                    </a>

                    <span className="mt-0.5 block text-[10px] text-emerald-400">
                      ✓ Instant WhatsApp Chat Available
                    </span>
                  </div>
                </div>

                {/* =========================
                    EMAIL
                ========================== */}
                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2 text-cyan-400">
                    <Mail className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <span className="mb-0.5 block text-slate-400">
                      Direct Project Email:
                    </span>

                    <a
                      href="mailto:abhishekkuntare02@gmail.com"
                      className="break-all font-mono text-sm font-bold text-cyan-400 transition-colors hover:underline"
                    >
                      abhishekkuntare02@gmail.com
                    </a>

                    <span className="mt-0.5 block text-[10px] text-slate-400">
                      All website inquiries are sent directly here
                    </span>
                  </div>
                </div>

                {/* =========================
                    LOCATION
                ========================== */}
                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2 text-cyan-400">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <span className="mb-0.5 block text-slate-400">
                      Headquarters:
                    </span>

                    <span className="text-sm font-medium text-white">
                      Amravati, Maharashtra, India
                    </span>

                    <span className="mt-0.5 block text-[10px] text-slate-400">
                      Available for clients worldwide across all major
                      timezones
                    </span>
                  </div>
                </div>

                {/* =========================
                    RESPONSE TIME
                ========================== */}
                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-xl border border-purple-500/20 bg-purple-500/10 p-2 text-purple-400">
                    <Clock className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <span className="mb-0.5 block text-slate-400">
                      Response Time:
                    </span>

                    <span className="text-sm font-medium text-white">
                      Within 2–4 hours (WhatsApp is fastest)
                    </span>
                  </div>
                </div>

              </div>

              {/* =========================
                  WHATSAPP BUTTON
              ========================== */}
              <div className="border-t border-white/10 pt-4">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex w-full items-center justify-center gap-2
                    rounded-xl
                    bg-gradient-to-r from-emerald-600 to-teal-600
                    px-4 py-3
                    text-xs font-semibold text-white
                    shadow-lg shadow-emerald-500/20
                    transition-all
                    hover:from-emerald-500 hover:to-teal-500
                    sm:text-sm
                  "
                >
                  <Phone className="h-4 w-4 shrink-0" />

                  <span>
                    Message Abhishek on WhatsApp
                  </span>
                </a>
              </div>
            </div>

            {/* =========================
                QUICK GUARANTEES
            ========================== */}
            <div className="space-y-2 rounded-2xl border border-white/5 bg-white/5 p-5 text-xs text-slate-300">

              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />

                <span>
                  NDA & Confidentiality agreement provided on request
                </span>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />

                <span>
                  Zero sales pressure: We recommend only what solves your
                  bottleneck
                </span>
              </div>

            </div>
          </div>

          {/* =========================
              RIGHT COLUMN - FORM
          ========================== */}
          <div className="rounded-3xl border border-white/10 bg-[#0c101c] p-6 shadow-2xl sm:p-10 lg:col-span-7">

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Form Heading */}
              <div className="mb-5">
                <h3 className="font-display text-xl font-bold text-white">
                  Send a Direct Project Message
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Fill in your details and we'll open your email app with
                  everything ready to send directly to Abhishek.
                </p>
              </div>

              {/* =========================
                  NAME + EMAIL
              ========================== */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* NAME */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-300">
                    Your Name *
                  </label>

                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="e.g. John Doe / Dr. Sharma"
                    className="
                      w-full rounded-xl
                      border border-white/10
                      bg-white/5
                      px-3.5 py-2.5
                      text-xs text-white
                      placeholder-slate-500
                      transition-all
                      focus:border-cyan-500
                      focus:outline-none
                      focus:ring-1
                      focus:ring-cyan-500/30
                    "
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-300">
                    Work Email *
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="e.g. john@business.com"
                    className="
                      w-full rounded-xl
                      border border-white/10
                      bg-white/5
                      px-3.5 py-2.5
                      text-xs text-white
                      placeholder-slate-500
                      transition-all
                      focus:border-cyan-500
                      focus:outline-none
                      focus:ring-1
                      focus:ring-cyan-500/30
                    "
                  />
                </div>

              </div>

              {/* =========================
                  PHONE + BUSINESS
              ========================== */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* PHONE */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-300">
                    Phone Number / WhatsApp *
                  </label>

                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="+91 91560 75536"
                    className="
                      w-full rounded-xl
                      border border-white/10
                      bg-white/5
                      px-3.5 py-2.5
                      text-xs text-white
                      placeholder-slate-500
                      transition-all
                      focus:border-cyan-500
                      focus:outline-none
                      focus:ring-1
                      focus:ring-cyan-500/30
                    "
                  />
                </div>

                {/* BUSINESS TYPE */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-300">
                    Business Type / Industry
                  </label>

                  <input
                    type="text"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    placeholder="e.g. Dental Clinic, Restaurant, Real Estate..."
                    className="
                      w-full rounded-xl
                      border border-white/10
                      bg-white/5
                      px-3.5 py-2.5
                      text-xs text-white
                      placeholder-slate-500
                      transition-all
                      focus:border-cyan-500
                      focus:outline-none
                      focus:ring-1
                      focus:ring-cyan-500/30
                    "
                  />
                </div>

              </div>

              {/* =========================
                  MESSAGE
              ========================== */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-300">
                  What would you like to build or modernize?
                </label>

                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly describe your goals, required features, or any specific reference sites..."
                  className="
                    w-full resize-none rounded-xl
                    border border-white/10
                    bg-white/5
                    px-3.5 py-2.5
                    text-xs text-white
                    placeholder-slate-500
                    transition-all
                    focus:border-cyan-500
                    focus:outline-none
                    focus:ring-1
                    focus:ring-cyan-500/30
                  "
                />
              </div>

              {/* =========================
                  ERROR
              ========================== */}
              {errorMsg && (
                <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-2.5 text-xs text-rose-300">
                  {errorMsg}
                </div>
              )}

              {/* =========================
                  DIRECT EMAIL BUTTON
              ========================== */}
              <button
                type="submit"
                className="
                  flex w-full items-center justify-center gap-2
                  rounded-xl
                  bg-gradient-to-r from-cyan-500 to-blue-600
                  px-4 py-3.5
                  text-xs font-semibold text-white
                  shadow-xl shadow-cyan-500/20
                  transition-all
                  hover:from-cyan-400 hover:to-blue-500
                  active:scale-[0.99]
                  sm:text-sm
                "
              >
                <Send className="h-4 w-4 shrink-0" />

                <span>
                  Send Direct Inquiry to Abhishek
                </span>
              </button>

              {/* =========================
                  EMAIL NOTE
              ========================== */}
              <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-slate-500">
                <Mail className="h-3 w-3 shrink-0" />

                <span>
                  Opens your email app • Sends to
                  abhishekkuntare02@gmail.com
                </span>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};