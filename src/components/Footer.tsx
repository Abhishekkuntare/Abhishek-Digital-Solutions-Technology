import React from 'react';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Globe2,
  ShieldCheck,
  ArrowUp,
  Instagram,
  Linkedin,
  Github,
  MessageCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

import { generateWhatsAppUrl } from '../utils/helpers';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenQuote,
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/abhishekkuntare/',
      icon: Instagram,
      label: 'Instagram',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/abhishek-kuntare-65662421b/',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Abhishekkuntare',
      icon: Github,
      label: 'GitHub',
    },
  ];

  const digitalSolutions = [
    'Healthcare & Dental',
    'Restaurants & Food',
    'Real Estate & Homes',
    'Fitness & Athletic Gyms',
    'Commercial Contractors',
    'Corporate Law Firms',
  ];

  const services = [
    'Web Development',
    'iOS & Android Mobile Apps',
    '24/7 WhatsApp AI Bots',
    'Brand Design & Creatives',
    'Google Local SEO & Ads',
    'Cloud Deployment',
  ];

  const interactiveSystems = [
    {
      label: 'Project Configurator',
      action: onOpenQuote,
    },
    {
      label: 'AI Digital Consultant',
      href: '#ai-consultant',
    },
    {
      label: 'Digital Health Score',
      href: '#digital-score',
    },
    {
      label: 'Before/After Transformations',
      href: '#transformations',
    },
    {
      label: 'Case Studies',
      href: '#portfolio',
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#05070b] text-slate-400 border-t border-white/10">
      
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            TOP CTA
        ====================================================== */}
        <div className="border-b border-white/10 py-10 sm:py-12">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 sm:p-8 lg:p-10">
            
            {/* CTA glow */}
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Let's build something great
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Have a project in mind?
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                  From high-converting websites to AI automation and complete
                  digital systems — let's turn your idea into something real.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
                <button
                  onClick={onOpenQuote}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/20"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <a
                  href={generateWhatsAppUrl(
                    'Hi Abhishek, I would like to discuss a project with you.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Me
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">

          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-2">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/10">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#080c14]">
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                </div>
              </div>

              <div>
                <div className="font-display text-lg font-bold tracking-tight text-white">
                  Abhishek
                </div>
                <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-500">
                  Digital Solutions
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
              International digital solutions partner helping businesses build
              modern websites, mobile apps, AI automation, branding, marketing
              systems, and scalable digital experiences.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              
              <a
                href="tel:+919156075536"
                className="group flex items-center gap-3 text-sm transition-colors hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-all group-hover:border-emerald-400/30 group-hover:bg-emerald-400/10">
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                </span>
                <span>+91 9156075536</span>
              </a>

              <a
                href="mailto:abhishekkuntare02@gmail.com"
                className="group flex items-center gap-3 text-sm transition-colors hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-all group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
                  <Mail className="h-3.5 w-3.5 text-cyan-400" />
                </span>
                <span className="break-all">
                  abhishekkuntare02@gmail.com
                </span>
              </a>

              <div className="flex items-center gap-3 text-sm">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                </span>
                <span>Amravati, Maharashtra, India</span>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                  <Globe2 className="h-3.5 w-3.5 text-cyan-400" />
                </span>
                <span className="leading-5">
                  Serving clients worldwide
                  <span className="block text-xs text-slate-600">
                    USA · UK · UAE · Europe · Australia
                  </span>
                </span>
              </div>
            </div>

            {/* Social Links */}
          
          </div>

          {/* DIGITAL SOLUTIONS */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Digital Solutions
            </h3>

            <ul className="space-y-3">
              {digitalSolutions.map((item) => (
                <li key={item}>
                  <a
                    href="#niches"
                    className="group flex items-center gap-2 text-xs transition-colors duration-200 hover:text-cyan-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-700 transition-all group-hover:w-2 group-hover:bg-cyan-400" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Services & Tech
            </h3>

            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="group flex items-center gap-2 text-xs transition-colors duration-200 hover:text-cyan-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-700 transition-all group-hover:w-2 group-hover:bg-cyan-400" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* INTERACTIVE */}
          <div>
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Interactive Systems
            </h3>

            <ul className="space-y-3">
              {interactiveSystems.map((item) => (
                <li key={item.label}>
                  {item.action ? (
                    <button
                      onClick={item.action}
                      className="group flex items-center gap-2 text-left text-xs transition-colors duration-200 hover:text-cyan-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-slate-700 transition-all group-hover:w-2 group-hover:bg-cyan-400" />
                      {item.label}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="group flex items-center gap-2 text-xs transition-colors duration-200 hover:text-cyan-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-slate-700 transition-all group-hover:w-2 group-hover:bg-cyan-400" />
                      {item.label}
                    </a>
                  )}
                </li>
              ))}

              {/* Admin */}
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="group inline-flex items-center gap-2 rounded-lg border border-cyan-400/10 bg-cyan-400/[0.03] px-3 py-2 text-[11px] font-medium text-cyan-400 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Admin Portal
                  <ExternalLink className="h-3 w-3 opacity-50 transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Copyright */}
            <div className="text-center text-[10px] leading-5 text-slate-600 sm:text-left">
              <div>
                © {new Date().getFullYear()} Abhishek. All rights reserved.
              </div>
              <div>
                Full source code ownership guaranteed.
              </div>
            </div>

            {/* Center */}
            <div className="hidden items-center gap-2 text-[10px] text-slate-600 lg:flex">
              <span>Built with precision</span>
              <span className="text-cyan-500">•</span>
              <span>Amravati, India</span>
            </div>

            {/* Social + Top */}
            <div className="flex items-center justify-center gap-2 sm:justify-end">
              
              <a
                href="https://github.com/Abhishekkuntare"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-500 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/abhishek-kuntare-65662421b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-500 transition-all hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-blue-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href="https://www.instagram.com/abhishekkuntare/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-500 transition-all hover:border-pink-400/30 hover:bg-pink-400/10 hover:text-pink-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>

              {/* Back to top */}
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                title="Back to top"
                className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Safe Area */}
        <div className="h-2 sm:hidden" />
      </div>
    </footer>
  );
};