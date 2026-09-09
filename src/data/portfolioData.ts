import { PortfolioProject } from '../types';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'lumina-dental',
    title: 'Lumina Smile Studio & Dental Hospital',
    tagline: 'High-end cosmetic dentistry platform with real-time booking and AI smile analysis',
    client: 'Lumina Dental Care',
    industry: 'Healthcare & Dental',
    isConcept: true,
    coverImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80'
    ],
    servicesDelivered: ['Websites', 'AI', 'Growth', 'Branding', 'Automation'],
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'WhatsApp API', 'Google Maps API'],
    highlights: [
      'Interactive 3D smile gallery showcasing veneer and aligner transformations',
      'Live appointment scheduler with zero-overlap calendar sync',
      'WhatsApp automated appointment confirmation and day-before reminders',
      'Integrated Google 5-Star review funnel boosting organic clinic footfall'
    ],
    results: [
      { metric: '+240%', label: 'Patient Inquiries in 60 Days' },
      { metric: '94%', label: 'Appointment Attendance Rate' },
      { metric: '#1', label: 'Local Google Maps Ranking' }
    ],
    overview: 'Engineered an end-to-end digital patient acquisition ecosystem. Prior to this, the clinic relied on manual walk-ins and phone calls. We deployed a high-speed web portal, digital smile visualizer, and 24/7 WhatsApp triage bot.'
  },
  {
    id: 'artisan-bistro',
    title: 'Saffron & Sage Artisan Bistro & Cloud Kitchen',
    tagline: 'Zero-commission online food ordering, digital QR menu, and table reservations',
    client: 'Saffron & Sage Culinary Group',
    industry: 'Food & Beverage',
    isConcept: true,
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    servicesDelivered: ['Websites', 'Automation', 'Design', 'Growth', 'E-commerce'],
    technologies: ['TypeScript', 'Express', 'Tailwind CSS', 'Stripe / UPI', 'Twilio'],
    highlights: [
      'Direct online ordering platform bypassing 28% third-party aggregator commissions',
      'QR code contactless dine-in table ordering with kitchen printer dispatch',
      'Table reservation engine with guest party size and allergy preferences',
      'AI food visual enhancements and mouth-watering social media campaign assets'
    ],
    results: [
      { metric: '₹1.8M+', label: 'Saved in Aggregator Commission Fees' },
      { metric: '+310%', label: 'Direct Online Delivery Orders' },
      { metric: '100%', label: 'Weekend Table Capacity Booked' }
    ],
    overview: 'A full-stack culinary commerce and dine-in management platform designed to liberate independent restaurants from heavy third-party marketplace fees while delivering a 5-star digital guest experience.'
  },
  {
    id: 'haven-realty',
    title: 'Haven & Hearth Luxury Real Estate',
    tagline: 'Immersive property discovery engine with 3D virtual tours and instant agent WhatsApp routing',
    client: 'Haven Real Estate Group',
    industry: 'Real Estate',
    isConcept: true,
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    servicesDelivered: ['Websites', 'AI', 'Growth', 'Automation'],
    technologies: ['React', 'Next.js Arch', 'Tailwind', 'Google Maps API', 'HubSpot'],
    highlights: [
      'High-speed map property search with sub-second polygon filtering',
      'Virtual 3D tour embeds and downloadable architectural floor plans',
      'Buyer qualification questionnaire sending instant WhatsApp lead alerts to brokers',
      'Mortgage & EMI amortization calculator with localized interest rates'
    ],
    results: [
      { metric: '$14.2M', label: 'Property Inquiries Generated' },
      { metric: '3.8x', label: 'Increase in Qualified High-Net-Worth Leads' },
      { metric: '< 2 min', label: 'Average Lead Response Time' }
    ],
    overview: 'Crafted a bespoke digital flagship for an upscale real estate brokerage. The platform eliminates unvetted tire-kickers by combining interactive property exploration with automated buyer pre-qualification.'
  },
  {
    id: 'apex-builders',
    title: 'Apex Commercial Builders & Contractors',
    tagline: 'Authoritative commercial construction portal with interactive bid estimators and case studies',
    client: 'Apex Infrastructure & Build Ltd',
    industry: 'Construction & Home Services',
    isConcept: true,
    coverImage: 'https://media.licdn.com/dms/image/v2/D4D10AQHRY1nFTkDl7w/image-shrink_800/B4DZ.8H5wJHQAg-/0/1785567616576?e=2147483647&v=beta&t=Zh7jR_FqzRCs2E1kfL41uQ-9USZ7-XMP26msMNglHA4',
    galleryImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80'
    ],
    servicesDelivered: ['Websites', 'Branding', 'Growth', 'Infrastructure'],
    technologies: ['React', 'Node.js', 'Tailwind', 'Cloudflare CDN', 'DocuSign API'],
    highlights: [
      'Interactive before & after transformation sliders for commercial retrofits',
      'Multi-step bid request estimator gathering architectural specs and timelines',
      'Subcontractor safety verification and compliance document upload portal',
      'Targeted local commercial SEO ranking for regional developer searches'
    ],
    results: [
      { metric: '8 Bids', label: 'Won in Commercial Sector in 90 Days' },
      { metric: '100%', label: 'Lighthouse Performance Score' },
      { metric: '+180%', label: 'Organic Inbound RFP Volume' }
    ],
    overview: 'Replaced a generic 8-year-old brochure website with an authoritative industrial platform that showcases scale, safety certifications, and engineering credentials to win multi-million commercial contracts.'
  },
  {
    id: 'ironpulse-fitness',
    title: 'IronPulse Gym & Athletic Club',
    tagline: 'High-energy fitness club platform with free day-pass vouchers and live class booking',
    client: 'IronPulse Athletic Club',
    industry: 'Health & Beauty',
    isConcept: true,
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    ],
    servicesDelivered: ['Websites', 'Apps', 'Growth', 'Automation'],
    technologies: ['React', 'PWA', 'Tailwind', 'Stripe', 'WhatsApp API'],
    highlights: [
      'Automated "Claim Free 1-Day Trial Pass" lead capture funnel with QR code generation',
      'Interactive weekly class timetable with spot reservation and instructor bios',
      'Trainer personal training booking and member transformation before/after gallery',
      'Installable PWA for members to check class schedules without downloading from stores'
    ],
    results: [
      { metric: '+420', label: 'Trial Day Passes Claimed Monthly' },
      { metric: '38%', label: 'Trial to Paid Member Conversion' },
      { metric: 'Zero', label: 'Overbooked Group Fitness Classes' }
    ],
    overview: 'Built a member acquisition machine that converts casual neighborhood fitness seekers into committed recurring members through frictionless trial passes and engaging trainer spotlights.'
  },
  {
    id: 'clarion-legal',
    title: 'Clarion & Sterling Corporate Attorneys',
    tagline: 'Prestigious legal counsel portal with confidential intake triage and practice area guides',
    client: 'Clarion & Sterling LLP',
    industry: 'Legal',
    isConcept: true,
    coverImage: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80'
    ],
    servicesDelivered: ['Websites', 'AI', 'Branding', 'Infrastructure'],
    technologies: ['React', 'Node.js', 'Tailwind', 'Encrypted S3', 'Clio API'],
    highlights: [
      'High-security confidential case intake form with end-to-end encryption',
      'Structured legal knowledge base ranking top-3 for corporate compliance topics',
      'Partner directory showcasing bar admissions, landmark verdicts, and publications',
      'Automated initial case qualification routing to appropriate practice groups'
    ],
    results: [
      { metric: '+190%', label: 'Corporate Retainer Inquiries' },
      { metric: '100%', label: 'End-to-End Encrypted Submissions' },
      { metric: 'Top 3', label: 'Rank for Corporate Law in Region' }
    ],
    overview: 'Positioned a boutique commercial litigation firm as premier corporate counsel. Clean typography, muted navy tones, and rigorous confidentiality features instill immediate trust in prospective corporate clients.'
  },
  {
    id: 'kora-skincare',
    title: 'KÖRA Botanical D2C Skincare',
    tagline: 'Modern international e-commerce storefront with multi-currency checkout and bundle builder',
    client: 'KÖRA Botanical Naturals',
    industry: 'E-commerce',
    isConcept: true,
    coverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    ],
    servicesDelivered: ['E-commerce', 'Websites', 'Design', 'Growth', 'Automation'],
    technologies: ['React', 'Tailwind', 'Stripe Multi-Currency', 'Shiprocket', 'Klaviyo'],
    highlights: [
      'Sub-second page loading speed optimized for mobile Instagram/TikTok shoppers',
      'Interactive "Build Your Custom Routine" skincare bundle builder with tier discounts',
      'Seamless multi-currency checkout automatically detecting USD, INR, EUR, and GBP',
      'Automated WhatsApp cart abandonment recovery offering personalized assistance'
    ],
    results: [
      { metric: '4.1%', label: 'E-commerce Conversion Rate' },
      { metric: '+34%', label: 'Average Order Value via Routine Bundles' },
      { metric: '19%', label: 'Abandoned Carts Successfully Recovered' }
    ],
    overview: 'Architected an international direct-to-consumer store for a botanical skincare startup. Enabled them to launch in the US, Europe, and India on day one with zero currency or fulfillment roadblocks.'
  },
  {
    id: 'synapse-flow',
    title: 'SynapseFlow AI Enterprise Workflow Orchestrator',
    tagline: 'Futuristic SaaS product landing page with interactive workflow builder preview and team workspaces',
    client: 'SynapseFlow Technologies',
    industry: 'Technology',
    isConcept: true,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
    ],
    servicesDelivered: ['Websites', 'AI', 'SaaS', 'Infrastructure'],
    technologies: ['React 19', 'Tailwind CSS', 'Motion', 'Node.js', 'PostgreSQL'],
    highlights: [
      'Interactive canvas demonstrating AI workflow node dragging and execution',
      'Tiered pricing comparison table with monthly/annual billing switch and feature checklist',
      'Developer API documentation hub with copyable code snippets in Python, JS, and cURL',
      'Customer self-serve waitlist and authentication onboarding flows'
    ],
    results: [
      { metric: '18,500+', label: 'Pre-Launch Waitlist Signups' },
      { metric: '6.2%', label: 'Landing Page Visitor to Signup Rate' },
      { metric: 'Featured', label: 'On Product Hunt & Tech Media' }
    ],
    overview: 'Built a Stripe/Linear-grade product landing page for an AI developer tooling startup. Showcased the intricate product without requiring visitors to download an app or book a demo call first.'
  }
];
