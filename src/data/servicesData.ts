import { ServiceCategory, ServiceBundle } from '../types';

export const SERVICES_CATALOG: ServiceCategory[] = [
  {
    id: 'websites',
    name: 'Websites & Web Apps',
    icon: 'Globe',
    description: 'High-performance, ultra-responsive web platforms built for blistering speed and conversion.',
    items: [
      {
        id: 'business-websites',
        title: 'Business & Corporate Websites',
        description: 'Authority-building corporate digital flagships designed to position your brand as an industry leader.',
        icon: 'Briefcase',
        deliverables: ['Custom Brand Identity', 'Sub-second Loading Speed', 'Mobile & Tablet Responsive', 'SEO Best Practices', 'Contact & Inquiry Systems'],
        tags: ['Corporate', 'Brand Identity', 'Fast Speed']
      },
      {
        id: 'high-converting-landing-pages',
        title: 'High-Converting Landing Pages',
        description: 'Conversion-engineered direct response pages optimized for Google Ads, Meta Ads, and product launches.',
        icon: 'Zap',
        deliverables: ['A/B Test Ready Structure', 'Hero Animation & Proof Points', 'Frictionless Lead Forms', 'Pixel & Analytics Integration', 'Instant WhatsApp Triggers'],
        tags: ['Lead Gen', 'PPC Ads', 'Conversion Opt']
      },
      {
        id: 'ecommerce-platforms',
        title: 'E-commerce & D2C Stores',
        description: 'Full-stack storefronts with fluid product search, international currencies, and one-click checkouts.',
        icon: 'ShoppingBag',
        deliverables: ['Product Catalog & Filtering', 'Multi-Currency Payments', 'Automated Cart Recovery', 'Inventory Sync', 'Review & UGC Galleries'],
        tags: ['D2C', 'Multi-Currency', 'Payments']
      },
      {
        id: 'booking-portals',
        title: 'Booking & Reservation Systems',
        description: 'Self-serve appointment, table, and service reservation platforms that eliminate phone tag.',
        icon: 'CalendarCheck',
        deliverables: ['Real-Time Calendar Sync', 'Automated SMS/WhatsApp Confirmations', 'Deposit & Full Payment Gateways', 'Staff Scheduling Management'],
        tags: ['Appointments', 'Zero No-Shows', 'Automated']
      },
      {
        id: 'custom-web-apps',
        title: 'Custom Web Applications & Portals',
        description: 'Interactive client dashboards, SaaS portals, and internal business operating tools built on modern stacks.',
        icon: 'Layers',
        deliverables: ['Role-Based Access Control', 'Database Architecture', 'Secure API Endpoints', 'Interactive Data Visualizations', 'Continuous Cloud Backups'],
        tags: ['React', 'Node.js', 'PostgreSQL']
      }
    ]
  },
  {
    id: 'mobile-apps',
    name: 'Mobile Applications',
    icon: 'Smartphone',
    description: 'Beautiful, gesture-fluid mobile applications published on Google Play and Apple App Store.',
    items: [
      {
        id: 'android-apps',
        title: 'Android Applications',
        description: 'High-performance Android apps tailored for smartphones and enterprise handheld devices.',
        icon: 'Smartphone',
        deliverables: ['Google Play Store Submission', 'Offline Mode Caching', 'Push Notifications Engine', 'Biometric Authentication', 'Material You Aesthetic'],
        tags: ['Android', 'Play Store', 'Push Alerts']
      },
      {
        id: 'ios-apps',
        title: 'iOS & iPhone Applications',
        description: 'Premium Apple ecosystem experiences with native iOS ergonomics, Apple Pay, and Haptic feedback.',
        icon: 'Apple',
        deliverables: ['Apple App Store Publishing', 'Apple Pay Seamless Flow', 'Face ID / Touch ID Security', 'Widget & Notification Center Support', 'Fluid Swift/React Native Performance'],
        tags: ['iOS', 'App Store', 'Apple Pay']
      },
      {
        id: 'tablet-apps',
        title: 'Tablet-Optimized Applications',
        description: 'Split-screen and high-density layouts optimized for iPads, Android tablets, and point-of-sale displays.',
        icon: 'Tablet',
        deliverables: ['High-Resolution Bento Layouts', 'Landscape & Portrait Auto-Adapt', 'Stylus & Touch Optimization', 'Kiosk / POS Mode Configuration'],
        tags: ['iPad', 'POS Display', 'Split Screen']
      },
      {
        id: 'pwa-apps',
        title: 'Progressive Web Apps (PWA)',
        description: 'Installable web apps that run without app store friction, support offline browsing, and load instantly.',
        icon: 'DownloadCloud',
        deliverables: ['Instant Home Screen Install', 'Offline Asset Caching', 'Background Data Sync', 'Lightweight Zero-Download Size'],
        tags: ['PWA', 'Offline Support', 'Zero Friction']
      }
    ]
  },
  {
    id: 'ai-automation',
    name: 'AI & Business Automation',
    icon: 'Bot',
    description: 'Transform manual operations into 24/7 autonomous engines using intelligent AI agents and workflows.',
    items: [
      {
        id: 'ai-chatbots',
        title: 'AI Customer Support Chatbots',
        description: 'Trained on your business knowledge to answer inquiries, quote prices, and book appointments 24/7.',
        icon: 'MessageSquare',
        deliverables: ['Custom Business Knowledge Training', 'WhatsApp & Website Chat Embed', 'Human Hand-off Triggers', 'Multi-Language Fluency', 'CRM Lead Auto-Sync'],
        tags: ['24/7 Support', 'WhatsApp Bot', 'Instant Lead Capture']
      },
      {
        id: 'ai-agents',
        title: 'Autonomous AI Business Agents',
        description: 'Task-driven intelligent agents that triage emails, generate proposals, and execute complex workflows.',
        icon: 'Cpu',
        deliverables: ['Email Triage & Draft Responses', 'Document & Invoice Data Extraction', 'Autonomous Research & Reporting', 'API Orchestration Pipelines'],
        tags: ['Autonomous', 'Email Triage', 'Workflow Automation']
      },
      {
        id: 'ai-creatives',
        title: 'AI Generative Creatives & Imagery',
        description: 'Photorealistic commercial product photos, campaign graphics, and marketing imagery generated on demand.',
        icon: 'Sparkles',
        deliverables: ['Studio-Grade Product Shots', 'Social Media Campaign Assets', 'High-Res Advertising Visuals', 'Consistent Brand Style Guides'],
        tags: ['Generative AI', 'Studio Visuals', 'Ad Creatives']
      },
      {
        id: 'business-automation',
        title: 'CRM & Business Systems Automation',
        description: 'Eliminate repetitive data entry by interconnecting your forms, CRM, invoices, spreadsheets, and messaging.',
        icon: 'GitBranch',
        deliverables: ['Zapier / Make / Webhook Pipelines', 'Automated Invoicing & Payment Receipts', 'Lead Notification via Slack/WhatsApp', 'Google Sheets Live Sync'],
        tags: ['Zapier', 'No-Code/Code', 'Time Saver']
      }
    ]
  },
  {
    id: 'design-branding',
    name: 'UI/UX & Creative Branding',
    icon: 'Palette',
    description: 'World-class visual identities, user experiences, and marketing collateral that command respect.',
    items: [
      {
        id: 'ui-ux-design',
        title: 'Product UI/UX Design',
        description: 'Wireframing, interactive prototyping, and design systems crafted with mathematical precision.',
        icon: 'Figma',
        deliverables: ['Figma Design System & Tokens', 'Interactive Clickable Prototype', 'User Journey & Empathy Mapping', 'Comprehensive Developer Handoff'],
        tags: ['Figma', 'Prototypes', 'Design Systems']
      },
      {
        id: 'branding-identity',
        title: 'Brand Identity & Logo Craft',
        description: 'Distinctive logos, typography pairings, color palettes, and brand guidelines for international standing.',
        icon: 'Flame',
        deliverables: ['Vector Logo Formats (SVG, EPS, PNG)', 'Typography & Font Licensing Guide', 'Color Palette & Usage Rules', 'Business Cards & Stationary Assets'],
        tags: ['Vector Logo', 'Color Palette', 'Brand Bible']
      },
      {
        id: 'marketing-creatives',
        title: 'Marketing & Advertising Creatives',
        description: 'Attention-grabbing banners, posters, social media carousels, and billboard graphics.',
        icon: 'Image',
        deliverables: ['Social Media Post & Story Templates', 'Display Ads in all IAB standard sizes', 'Promotional Event Posters', 'Product Packaging Graphics'],
        tags: ['Social Media', 'Ad Banners', 'Posters']
      }
    ]
  },
  {
    id: 'growth-marketing',
    name: 'Growth, SEO & Marketing',
    icon: 'TrendingUp',
    description: 'Data-driven customer acquisition engines that drive qualified buyer traffic and revenue.',
    items: [
      {
        id: 'search-engine-optimization',
        title: 'Comprehensive SEO & Local Dominance',
        description: 'Rank at the top of Google for high-intent business search keywords in your city and nationwide.',
        icon: 'Search',
        deliverables: ['Technical SEO & Core Web Vitals Fixes', 'Google Business Profile Optimization', 'On-Page Content & Schema Markup', 'Local Citation & Backlink Strategy'],
        tags: ['Google Rank #1', 'Local Maps', 'Organic Traffic']
      },
      {
        id: 'paid-advertising',
        title: 'Google Ads & Meta Performance Marketing',
        description: 'Laser-targeted PPC campaigns that convert ad spend directly into pre-qualified sales appointments.',
        icon: 'Target',
        deliverables: ['High-Intent Keyword Campaign Setup', 'Ad Copy & Creative Production', 'Conversion Tracking & ROAS Dashboards', 'Negative Keyword Shielding'],
        tags: ['Google Ads', 'Meta Ads', 'High ROAS']
      },
      {
        id: 'analytics-conversion',
        title: 'Conversion Optimization & Analytics',
        description: 'Privacy-compliant user behavior tracking and conversion funnels to extract more revenue from existing traffic.',
        icon: 'BarChart3',
        deliverables: ['Funnel Drop-off Auditing', 'Event Tracking & Heatmap Insights', 'A/B Testing Implementation', 'Executive Monthly Growth Reports'],
        tags: ['Analytics', 'Funnel Tracking', 'ROI Reports']
      }
    ]
  },
  {
    id: 'cloud-infrastructure',
    name: 'Cloud, Security & Maintenance',
    icon: 'Shield',
    description: 'Bulletproof hosting, automatic backups, 99.99% uptime, and long-term technical peace of mind.',
    items: [
      {
        id: 'cloud-deployment',
        title: 'Cloud Deployment & Hosting Setup',
        description: 'Containerized deployment on AWS, Google Cloud, Vercel, and Cloudflare with global CDN edges.',
        icon: 'Cloud',
        deliverables: ['Custom Domain & SSL Provisioning', 'Global CDN Edge Caching', 'DDoS Protection & Firewall Setup', 'Automated CI/CD Deployment Pipelines'],
        tags: ['AWS', 'Google Cloud', 'Global CDN']
      },
      {
        id: 'ongoing-maintenance',
        title: 'Website & App Maintenance Retainers',
        description: 'Proactive software updates, security patches, uptime monitoring, and fast technical changes.',
        icon: 'Wrench',
        deliverables: ['24/7 Automated Uptime Monitoring', 'Daily Automated Cloud Backups', 'Security Vulnerability Patching', 'Monthly Performance Optimization & Fixes'],
        tags: ['Peace of Mind', '24/7 Monitoring', 'Daily Backups']
      },
      {
        id: 'technical-support',
        title: 'Emergency Technical Support',
        description: 'Rapid-response troubleshooting for broken databases, hacked sites, domain issues, and API failures.',
        icon: 'LifeBuoy',
        deliverables: ['Direct WhatsApp Developer Line', 'Fast Emergency Turnaround', 'Bug Diagnostics & Hotfixes', 'Root-Cause Documentation'],
        tags: ['Emergency', 'Direct WhatsApp', 'Fast Fixes']
      }
    ]
  }
];
export interface ServiceBundle {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  features: string[];
  idealFor: string;
  startingUSD: number;
  startingINR: number;
  deliveryTime: string;
  popular: boolean;
}

export const SERVICE_BUNDLES: ServiceBundle[] = [
  {
    id: "local-starter",

    name: "Local Business Starter",

    badge: "Essential",

    tagline:
      "Ideal for local clinics, contractors, restaurants, and independent firms.",

    description:
      "Get your local business found, trusted, and contacted online with zero technical friction.",

    features: [
      "Custom Mobile-Responsive Business Website",
      "Google Business Profile Setup & Local Maps Rank",
      'Fundamental SEO for "services in [city]"',
      "WhatsApp Direct Chat & One-Click Call Triggers",
      "Mobile-Friendly Contact & Inquiry Forms",
      "Cloud Hosting & Fast SSL Security Setup",
      "30 Days Post-Launch Support & Minor Edits",
    ],

    idealFor:
      "Local businesses, solo practitioners, neighborhood stores",

    startingUSD: 399,

    startingINR: 2999,

    deliveryTime: "7–10 Days",

    popular: false,
  },

  {
    id: "growth-package",

    name: "Growth & Customer Acquisition",

    badge: "Most Popular",

    tagline:
      "Scale inquiries, dominate local competitors, and automate customer booking.",

    description:
      "A complete customer-acquisition machine designed to generate daily inbound leads.",

    features: [
      "High-Speed Conversion Engineered Website",
      "Real-Time Appointment / Booking Calendar",
      "Google 5-Star Review Automation Funnel",
      "High-ROI Google / Meta Ads Landing Page",
      "10 Custom Social Media Banners & Promo Creatives",
      "Automated WhatsApp & Email Lead Notifications",
      "Full SEO Optimization & Schema Structured Data",
      "Analytics Dashboard with Conversion Tracking",
    ],

    idealFor:
      "Growing businesses wanting consistent qualified leads",

    startingUSD: 799,

    startingINR: 19990,

    deliveryTime: "2–3 Weeks",

    popular: true,
  },

  {
    id: "digital-transformation",

    name: "Digital Transformation & App Suite",

    badge: "Comprehensive",

    tagline:
      "For established brands seeking full modernization, mobile apps, and automation.",

    description:
      "Full-scale digital overhaul: website, mobile applications, CRM workflows, and AI support.",

    features: [
      "Flagship Web Platform + Custom Client Portal",
      "Cross-Platform Mobile Application (Android & iOS)",
      "24/7 AI Customer Support & Appointment Assistant",
      "Automated Invoicing, CRM & Multi-Tool Integration",
      "Advanced Customer Loyalty / Member Accounts",
      "Multi-Location / Multi-Branch Management",
      "High-Concurrency Cloud Architecture (AWS / GCP)",
      "Dedicated Account Engineer & Priority Uptime SLA",
    ],

    idealFor:
      "Multi-location businesses, dental chains, gym networks, boutique stays",

    startingUSD: 1999,

    startingINR: 35999,

    deliveryTime: "4–6 Weeks",

    popular: false,
  },
];