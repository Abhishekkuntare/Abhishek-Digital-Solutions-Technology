import { BusinessNiche, CategoryInfo } from '../types';

export const CATEGORIES_LIST: CategoryInfo[] = [
  { id: 'technology', name: 'Technology & Software', icon: 'Cpu', description: 'SaaS, AI software, apps, developer tools & cloud infrastructure', nichesCount: 30 },
  { id: 'ecommerce', name: 'E-commerce & Retail', icon: 'ShoppingBag', description: 'Online stores, marketplaces, D2C brands & specialty retail', nichesCount: 25 },
  { id: 'food-beverage', name: 'Food & Beverage', icon: 'UtensilsCrossed', description: 'Restaurants, cafes, cloud kitchens, bakeries & food delivery', nichesCount: 20 },
  { id: 'real-estate', name: 'Real Estate & Property', icon: 'Building2', description: 'Realtors, property management, architecture & construction', nichesCount: 15 },
  { id: 'automotive', name: 'Automotive', icon: 'Car', description: 'Dealerships, repair workshops, detailing, EV charging & parts', nichesCount: 20 },
  { id: 'healthcare', name: 'Healthcare', icon: 'HeartPulse', description: 'Clinics, dental, diagnostics, telemedicine, fitness & elder care', nichesCount: 15 },
  { id: 'education', name: 'Education', icon: 'GraduationCap', description: 'Coaching institutes, online learning, coding bootcamps & academies', nichesCount: 15 },
  { id: 'finance', name: 'Finance & Professional Services', icon: 'DollarSign', description: 'Accounting firms, tax, legal, consulting & wealth management', nichesCount: 15 },
  { id: 'marketing-media', name: 'Marketing & Media', icon: 'Megaphone', description: 'Digital marketing, SEO, creative agencies & video production', nichesCount: 18 },
  { id: 'construction-home', name: 'Construction & Home Services', icon: 'Hammer', description: 'Plumbing, electrical, HVAC, roofing, solar & remodeling', nichesCount: 17 },
  { id: 'logistics', name: 'Logistics & Transportation', icon: 'Truck', description: 'Couriers, freight forwarding, warehousing & trucking', nichesCount: 15 },
  { id: 'agriculture', name: 'Agriculture', icon: 'Wheat', description: 'Organic farming, dairy, poultry, hydroponics & agtech', nichesCount: 15 },
  { id: 'energy', name: 'Energy', icon: 'Zap', description: 'Solar companies, EV charging, battery storage & renewables', nichesCount: 10 },
  { id: 'travel-hospitality', name: 'Travel & Hospitality', icon: 'Plane', description: 'Hotels, resorts, tour operators & vacation rentals', nichesCount: 13 },
  { id: 'beauty-personal-care', name: 'Beauty & Personal Care', icon: 'Sparkles', description: 'Salons, spas, skincare brands, cosmetics & barbershops', nichesCount: 12 },
  { id: 'pet-businesses', name: 'Pet Businesses', icon: 'Dog', description: 'Pet stores, grooming, veterinary clinics & pet training', nichesCount: 10 },
  { id: 'manufacturing', name: 'Manufacturing', icon: 'Factory', description: 'Industrial equipment, electronics, furniture, textiles & materials', nichesCount: 15 },
  { id: 'local-services', name: 'Local Service Businesses', icon: 'Wrench', description: 'Cleaning, laundry, repair services, gardening & event management', nichesCount: 15 },
  { id: 'entertainment', name: 'Entertainment & Creator Economy', icon: 'Gamepad2', description: 'Gaming studios, creators, streaming, music & communities', nichesCount: 15 },
  { id: 'ai-growth', name: 'Newer High-Growth Opportunities', icon: 'Bot', description: 'Autonomous AI agents, robotics, drone solutions & climate tech', nichesCount: 19 },
];

interface RawCategoryDefinition {
  id: string;
  name: string;
  icon: string;
  niches: string[];
}

const RAW_CATEGORY_DEFINITIONS: RawCategoryDefinition[] = [
  {
    id: 'technology',
    name: 'Technology & Software',
    icon: 'Cpu',
    niches: [
      'SaaS business', 'AI software company', 'AI automation agency', 'Web development agency',
      'Mobile app development', 'Cybersecurity company', 'Cloud services', 'IT consulting',
      'Managed IT services', 'Software outsourcing', 'Data analytics company', 'CRM software',
      'ERP software', 'HR software', 'Accounting software', 'Project-management software',
      'Marketing automation', 'E-commerce platform', 'FinTech platform', 'EdTech platform',
      'HealthTech platform', 'PropTech platform', 'Logistics software', 'Restaurant-management software',
      'Booking/reservation software', 'AI chatbot business', 'AI content-generation platform',
      'AI recruitment platform', 'AI customer-support platform', 'Developer tools'
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Retail',
    icon: 'ShoppingBag',
    niches: [
      'General e-commerce store', 'Niche e-commerce store', 'Fashion store', 'Footwear business',
      'Electronics store', 'Smartphone accessories', 'Computer accessories', 'Furniture store',
      'Home-decor store', 'Beauty-products store', 'Cosmetics brand', 'Skincare brand',
      'Jewelry business', 'Watches business', 'Sports equipment', 'Pet-products store',
      'Baby-products store', 'Grocery delivery', 'Subscription-box business', 'Private-label products',
      'Dropshipping', 'Print-on-demand', 'B2B wholesale e-commerce', 'Marketplace platform',
      'D2C brand'
    ]
  },
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    icon: 'UtensilsCrossed',
    niches: [
      'Restaurant', 'Fast-food restaurant', 'Cloud kitchen', 'Café',
      'Bakery', 'Dessert shop', 'Catering', 'Food truck',
      'Juice bar', 'Ice-cream business', 'Meal-preparation business', 'Tiffin service',
      'Packaged-food brand', 'Spice brand', 'Snack brand', 'Frozen-food business',
      'Dairy business', 'Food delivery service', 'Specialty-food store', 'Restaurant franchise'
    ]
  },
  {
    id: 'real-estate',
    name: 'Real Estate & Property',
    icon: 'Building2',
    niches: [
      'Real-estate agency', 'Property management', 'Rental-property business', 'Commercial property',
      'Residential development', 'Construction company', 'Interior-design company', 'Architecture firm',
      'Home renovation', 'Property maintenance', 'Co-working spaces', 'Student housing',
      'Vacation rentals', 'Warehousing', 'Real-estate investment company'
    ]
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: 'Car',
    niches: [
      'Car dealership', 'Used-car dealership', 'Car servicing', 'Automobile repair',
      'Denting & painting', 'Car detailing', 'Car washing', 'Tire shop',
      'Auto-parts business', 'Battery business', 'EV charging stations', 'EV servicing',
      'Motorcycle servicing', 'Motorcycle dealership', 'Vehicle rental', 'Fleet management',
      'Car accessories', 'Roadside assistance', 'Car insurance agency', 'Automobile recycling'
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: 'HeartPulse',
    niches: [
      'Pharmacy', 'Diagnostic laboratory', 'Dental clinic', 'Physiotherapy center',
      'Optical store', 'Medical equipment', 'Home healthcare', 'Elder-care services',
      'Healthcare software', 'Telemedicine platform', 'Medical billing services', 'Healthcare consulting',
      'Fitness center', 'Yoga studio', 'Wellness center'
    ]
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'GraduationCap',
    niches: [
      'Coaching institute', 'Online education platform', 'Coding academy', 'Language school',
      'Test-preparation business', 'Professional-skills training', 'Corporate training', 'Tutoring business',
      'Children\'s education', 'Music school', 'Art school', 'Vocational training',
      'Career consultancy', 'Study-abroad consultancy', 'Educational-content business'
    ]
  },
  {
    id: 'finance',
    name: 'Finance & Professional Services',
    icon: 'DollarSign',
    niches: [
      'Accounting firm', 'Tax consultancy', 'Financial consultancy', 'Insurance agency',
      'Loan consultancy', 'Wealth-management firm', 'Investment advisory', 'Bookkeeping service',
      'Payroll service', 'Business consultancy', 'Legal services', 'Recruitment agency',
      'Staffing company', 'Outsourcing company', 'Virtual-assistant agency'
    ]
  },
  {
    id: 'marketing-media',
    name: 'Marketing & Media',
    icon: 'Megaphone',
    niches: [
      'Digital marketing agency', 'SEO agency', 'Social-media agency', 'Performance-marketing agency',
      'Branding agency', 'Advertising agency', 'PR agency', 'Influencer-management agency',
      'Video-production company', 'Photography business', 'Content agency', 'Copywriting agency',
      'Email-marketing agency', 'Lead-generation agency', 'Podcast production', 'YouTube business',
      'Newsletter business', 'Affiliate marketing'
    ]
  },
  {
    id: 'construction-home',
    name: 'Construction & Home Services',
    icon: 'Hammer',
    niches: [
      'Plumbing', 'Electrical services', 'HVAC services', 'Roofing',
      'Painting', 'Flooring', 'Landscaping', 'Pest control',
      'Cleaning services', 'Security systems', 'Solar installation', 'Home automation',
      'Swimming-pool services', 'Locksmith services', 'Appliance repair', 'Handyman services',
      'Moving services'
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics & Transportation',
    icon: 'Truck',
    niches: [
      'Courier company', 'Last-mile delivery', 'Freight forwarding', 'Trucking company',
      'Logistics company', 'Warehouse business', 'Fulfillment center', 'Cold-chain logistics',
      'Transportation management', 'Fleet-management company', 'Moving company', 'Packaging business',
      'Import/export business', 'Shipping agency', 'Delivery technology platform'
    ]
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    icon: 'Wheat',
    niches: [
      'Organic farming', 'Vegetable farming', 'Fruit farming', 'Dairy farming',
      'Poultry farming', 'Fish farming', 'Goat farming', 'Beekeeping',
      'Mushroom farming', 'Hydroponics', 'Agricultural equipment', 'Fertilizer business',
      'Seeds business', 'Agricultural marketplace', 'Food-processing business'
    ]
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: 'Zap',
    niches: [
      'Solar-energy company', 'Solar installation', 'Solar equipment distribution', 'EV charging',
      'Battery-storage business', 'Energy consulting', 'Energy-efficiency services', 'Renewable-energy projects',
      'Electrical equipment', 'Power-management software'
    ]
  },
  {
    id: 'travel-hospitality',
    name: 'Travel & Hospitality',
    icon: 'Plane',
    niches: [
      'Hotel', 'Resort', 'Hostel', 'Travel agency',
      'Tour operator', 'Travel-management company', 'Vacation-rental management', 'Car rental',
      'Tourism experiences', 'Adventure tourism', 'Corporate travel services', 'Travel booking platform',
      'Hospitality software'
    ]
  },
  {
    id: 'beauty-personal-care',
    name: 'Beauty & Personal Care',
    icon: 'Sparkles',
    niches: [
      'Salon', 'Barbershop', 'Beauty clinic', 'Spa',
      'Nail salon', 'Makeup services', 'Skincare brand', 'Hair-care brand',
      'Cosmetics brand', 'Personal-care products', 'Beauty e-commerce', 'Beauty training academy'
    ]
  },
  {
    id: 'pet-businesses',
    name: 'Pet Businesses',
    icon: 'Dog',
    niches: [
      'Pet store', 'Pet grooming', 'Pet boarding', 'Dog training',
      'Pet sitting', 'Pet food', 'Pet accessories', 'Veterinary clinic',
      'Pet-care subscription', 'Pet-health technology'
    ]
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: 'Factory',
    niches: [
      'Furniture manufacturing', 'Clothing manufacturing', 'Footwear manufacturing', 'Electronics manufacturing',
      'Auto-parts manufacturing', 'Packaging manufacturing', 'Plastic products', 'Metal products',
      'Construction materials', 'Industrial equipment', 'Food manufacturing', 'Textile manufacturing',
      'Chemical manufacturing', 'Medical equipment', 'Consumer products'
    ]
  },
  {
    id: 'local-services',
    name: 'Local Service Businesses',
    icon: 'Wrench',
    niches: [
      'Cleaning company', 'Laundry', 'Dry cleaning', 'Car wash',
      'Home maintenance', 'Gardening', 'Security services', 'Event management',
      'Catering', 'Repair services', 'Delivery services', 'Senior assistance',
      'Childcare', 'Photography', 'Printing services'
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment & Creator Economy',
    icon: 'Gamepad2',
    niches: [
      'Gaming studio', 'Mobile-game company', 'Esports business', 'Streaming platform',
      'YouTube channel', 'Creator agency', 'Music production', 'Event company',
      'Online community', 'Digital-content business', 'Stock-media business', 'Digital-product store',
      'Online courses', 'Newsletter', 'Membership community'
    ]
  },
  {
    id: 'ai-growth',
    name: 'Newer High-Growth Opportunities',
    icon: 'Bot',
    niches: [
      'AI agents', 'AI employees/as-a-service', 'AI customer-service agents', 'AI sales agents',
      'AI recruitment agents', 'AI coding tools', 'AI healthcare tools', 'AI legal tools',
      'AI education tools', 'AI finance tools', 'Robotics services', 'Drone services',
      'IoT solutions', 'Digital-twin platforms', 'Cybersecurity automation', 'Climate technology',
      'Carbon-management software', 'EV technology', 'Battery technology'
    ]
  }
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function generateSynonyms(name: string, category: string): string[] {
  const tokens = name.toLowerCase().split(/[\s\/\-\&]+/);
  const syns = new Set<string>([name.toLowerCase(), ...tokens]);

  // Industry-specific vocabulary expansion for rich search & recommendation
  if (name.includes('AI') || category.includes('High-Growth')) {
    syns.add('artificial intelligence').add('ai bot').add('agentic').add('automation').add('llm').add('chatgpt');
  }
  if (name.includes('SaaS') || name.includes('software')) {
    syns.add('cloud app').add('web application').add('platform').add('tech startup');
  }
  if (name.includes('e-commerce') || name.includes('store') || name.includes('brand')) {
    syns.add('shop').add('online ordering').add('cart').add('checkout').add('catalog');
  }
  if (name.includes('Restaurant') || name.includes('Food') || name.includes('Café') || name.includes('kitchen') || name.includes('Tiffin')) {
    syns.add('dining').add('order online').add('menu').add('delivery').add('catering').add('takeaway');
  }
  if (name.includes('Clinic') || name.includes('Dental') || name.includes('Healthcare') || name.includes('Medical') || name.includes('Physiotherapy')) {
    syns.add('doctor').add('patient').add('dentist').add('appointment').add('treatment').add('health').add('teeth');
  }
  if (name.includes('Car') || name.includes('Auto') || name.includes('Vehicle') || name.includes('EV')) {
    syns.add('mechanic').add('garage').add('dealership').add('repair').add('detailing').add('motor');
  }
  if (name.includes('Real-estate') || name.includes('Property') || name.includes('Rental')) {
    syns.add('realtor').add('broker').add('apartments').add('homes').add('listings').add('commercial');
  }
  if (name.includes('Construction') || name.includes('Roofing') || name.includes('Plumbing') || name.includes('HVAC') || name.includes('Solar')) {
    syns.add('contractor').add('builder').add('home improvement').add('repair').add('installation').add('quotes');
  }
  if (name.includes('Pet') || name.includes('Dog') || name.includes('Veterinary')) {
    syns.add('puppy').add('groomer').add('vet').add('animal').add('pet care');
  }
  if (name.includes('Gym') || name.includes('Fitness') || name.includes('Yoga')) {
    syns.add('workout').add('trainer').add('membership').add('wellness').add('exercise');
  }
  if (name.includes('Law') || name.includes('Legal')) {
    syns.add('attorney').add('lawyer').add('counsel').add('litigation').add('legal advice');
  }
  if (name.includes('Farming') || name.includes('Agriculture') || name.includes('Hydroponics')) {
    syns.add('crops').add('produce').add('organic').add('agri').add('farming');
  }

  return Array.from(syns).filter(s => s.length > 1);
}

// Handcrafted custom profiles for flagship niches
const FLAGSHIP_CUSTOMIZATIONS: Record<string, Partial<BusinessNiche>> = {
  'dental-clinic': {
    tagline: 'Turn your dental practice into a trusted, high-converting digital brand.',
    synonyms: ['dentist', 'dental', 'orthodontist', 'teeth', 'dental care', 'dental surgeon', 'oral clinic', 'implants'],
    description: 'Complete digital ecosystem for dental clinics: dynamic appointment booking, patient portal, Google 5-star review funnel, doctor credentials, WhatsApp automated reminders, and local SEO dominance.',
    recommendedSolutions: [
      { title: 'Interactive Clinic Website', category: 'Website', description: 'High-speed website highlighting treatments, before-after smile gallery, doctor bios, and instant mobile booking.', iconName: 'Globe', impact: '3x Patient Bookings' },
      { title: 'Smart Online Appointment System', category: 'Operations & CRM', description: 'Real-time calendar slot reservation with SMS and WhatsApp confirmations.', iconName: 'CalendarCheck', impact: 'Eliminate No-Shows' },
      { title: 'WhatsApp Patient Assistant', category: 'AI & Automation', description: 'Automated 24/7 inquiry bot answering pricing, operating hours, and appointment requests.', iconName: 'Bot', impact: 'Instant Response Rate' },
      { title: 'Local Google Maps & SEO Engine', category: 'Growth & Marketing', description: 'Top ranking for "best dentist near me" + automated review collection.', iconName: 'MapPin', impact: 'Top 3 Google Ranking' },
    ],
    whatWeCanBuild: [
      'High-Speed Clinic Website with Treatment Portals',
      'Mobile-Friendly Doctor & Staff Profiles',
      'Automated Appointment Booking & Calendar Sync',
      'WhatsApp Consultation & Follow-up Funnel',
      'Patient Inquiry & Smile Evaluation Forms',
      'Google Maps & Local SEO Optimization'
    ],
    keyIntegrations: ['WhatsApp Cloud API', 'Google Calendar', 'Stripe / UPI', 'Twilio SMS', 'Google Reviews'],
    whatsappPrompt: 'Hi Abhishek, I am looking to modernize my Dental Practice with a high-converting website, automated booking system, and WhatsApp patient bot.'
  },
  'restaurant': {
    tagline: 'Zero-commission online ordering, digital menus, and table reservation systems.',
    synonyms: ['cafe', 'dining', 'food', 'bistro', 'eatery', 'bar', 'table booking', 'qr menu', 'takeout'],
    description: 'Transform your restaurant into an independent, profitable dining powerhouse with direct QR ordering, dynamic table reservations, delivery integration, and Google reviews automation.',
    recommendedSolutions: [
      { title: 'Commission-Free Ordering Engine', category: 'Website', description: 'Direct pickup & delivery ordering system saving you 25-30% platform fees.', iconName: 'ShoppingBag', impact: 'Save 30% Marketplace Fees' },
      { title: 'Smart Table Reservation System', category: 'Operations & CRM', description: 'Interactive table picker with real-time floor plan management and SMS confirmations.', iconName: 'Calendar', impact: 'Full Weekend Tables' },
      { title: '24/7 WhatsApp Food Concierge', category: 'AI & Automation', description: 'Instant menu browsing, specials, hours, and automated order confirmations via WhatsApp.', iconName: 'Bot', impact: 'Instant Reorders' },
      { title: 'Digital QR Tabletop Experience', category: 'Mobile', description: 'Contactless dynamic digital menu with allergen filters, chef specials, and direct payment.', iconName: 'QrCode', impact: 'Faster Table Turnaround' },
    ],
    whatWeCanBuild: [
      'Direct Online Ordering & Takeout Web App',
      'Interactive Table Reservation Engine',
      'Contactless QR Menu with Instant Search',
      'WhatsApp Automated Order Status Bot',
      'Google Reviews & Customer Loyalty Funnel',
      'Kitchen Order Management Dashboard (KDS)'
    ],
    keyIntegrations: ['Stripe / Razorpay', 'WhatsApp Business API', 'Google Business Profile', 'Twilio SMS', 'POS Webhook API'],
    whatsappPrompt: 'Hi Abhishek, I want to build a custom direct ordering website and table reservation system for my Restaurant.'
  },
  'construction-company': {
    tagline: 'Win high-ticket commercial & residential projects with high-trust digital proof.',
    synonyms: ['contractor', 'builder', 'renovation', 'commercial construction', 'residential builder', 'civil works'],
    description: 'High-converting portfolio, instant estimate calculator, bid tracking dashboard, client verification portal, and local search dominance built for modern builders.',
    recommendedSolutions: [
      { title: 'High-Trust Construction Showcase', category: 'Website', description: 'Interactive blueprint galleries, verified before/after sliders, and video walkthroughs.', iconName: 'Globe', impact: 'Win Commercial Tenders' },
      { title: 'Instant Project Estimate Calculator', category: 'Operations & CRM', description: 'Custom step-by-step cost estimator capturing qualified client project scopes and budgets.', iconName: 'Calculator', impact: '3.4x Qualified Leads' },
      { title: 'WhatsApp Site Inquiry & Bidding Bot', category: 'AI & Automation', description: 'Fast automated lead triage collecting project type, location, timeline, and architectural plans.', iconName: 'Bot', impact: 'Instant Response Time' },
      { title: 'Client Project Milestones Portal', category: 'Mobile', description: 'Private client dashboard with real-time photo updates, invoice approvals, and change requests.', iconName: 'ShieldCheck', impact: 'Total Client Confidence' },
    ],
    whatWeCanBuild: [
      'Enterprise Construction Portfolio Platform',
      'Interactive Project Budget & Scope Calculator',
      'Client Milestone & Construction Progress Portal',
      'WhatsApp Bid Triage & Document Collector',
      'Subcontractor Pre-qualification Flow',
      'Google Local SEO for Commercial Builders'
    ],
    keyIntegrations: ['DocuSign / HelloSign', 'Procore / PlanGrid API', 'WhatsApp API', 'Stripe Invoicing', 'Google Drive Cloud'],
    whatsappPrompt: 'Hi Abhishek, I want to upgrade my Construction Company digital presence and generate high-ticket commercial project inquiries.'
  },
  'real-estate-agency': {
    tagline: 'High-converting property portal with MLS search, virtual tours, and CRM lead capture.',
    synonyms: ['realtor', 'property broker', 'real estate agent', 'luxury homes', 'commercial broker', 'condos'],
    description: 'Engineered for top-producing agents and agencies: lightning-fast property search, interactive maps, automated valuation calculators, and WhatsApp instant tour bookings.',
    recommendedSolutions: [
      { title: 'Custom Property Listing Portal', category: 'Website', description: 'High-speed search with bedroom, price, and neighborhood filters with interactive Google Maps.', iconName: 'Building2', impact: '4x Tour Bookings' },
      { title: 'Home Valuation Lead Magnet', category: 'Operations & CRM', description: 'Automated estimated property value tool capturing homeowner seller leads.', iconName: 'TrendingUp', impact: 'High-Value Seller Listings' },
      { title: 'WhatsApp Tour Booking Assistant', category: 'AI & Automation', description: 'Instant scheduling for open houses, virtual walkthroughs, and buyer pre-qualification.', iconName: 'Bot', impact: 'Zero Missed Homebuyers' },
      { title: 'Virtual 3D Tour & Drone Showcase', category: 'Mobile', description: 'Matterport & drone video embedding optimized for ultra-smooth mobile loading.', iconName: 'Video', impact: 'Luxury Buyer Engagement' },
    ],
    whatWeCanBuild: [
      'Full-Featured Property Listings Web Platform',
      'Interactive Google Maps Neighborhood Explorer',
      'Instant Home Valuation Calculator Funnel',
      'WhatsApp Open-House Registration Bot',
      'Agent CRM Lead Routing & Follow-up Funnel',
      'Automated PDF Property Brochure Generator'
    ],
    keyIntegrations: ['Google Maps Platform', 'WhatsApp Cloud API', 'Follow Up Boss / HubSpot', 'Matterport 3D', 'DocuSign'],
    whatsappPrompt: 'Hi Abhishek, I need a modern high-performance Real Estate website with property search, map integration, and WhatsApp tour scheduling.'
  },
  'ai-agents': {
    tagline: 'Custom autonomous AI agents, digital workers, and end-to-end automation pipelines.',
    synonyms: ['autonomous agents', 'ai workforce', 'ai employees', 'langchain', 'gemini agents', 'agentic workflow'],
    description: 'We design, train, and deploy enterprise-grade AI agents that operate 24/7 across customer support, outbound sales qualification, recruitment triage, and automated document parsing.',
    recommendedSolutions: [
      { title: 'Autonomous 24/7 Customer Agent', category: 'AI & Automation', description: 'Trained on company documentation, handling complex multi-step queries and database lookups.', iconName: 'Bot', impact: '80% Workload Automation' },
      { title: 'Outbound AI Sales & Triage Agent', category: 'Operations & CRM', description: 'Qualifies incoming prospects, books sales calls directly to calendar, and logs data to CRM.', iconName: 'TrendingUp', impact: 'Instant Lead Qualification' },
      { title: 'Web App & Agent Control Center', category: 'Website', description: 'Modern dashboard for human-in-the-loop oversight, conversation telemetry, and rule tuning.', iconName: 'Cpu', impact: 'Full Operational Control' },
      { title: 'Multi-Channel Integration Hub', category: 'Mobile', description: 'Deploys agents seamlessly to WhatsApp, Slack, web chat widgets, and voice channels.', iconName: 'Layers', impact: 'Universal Reach' },
    ],
    whatWeCanBuild: [
      'Enterprise AI Agent Command Dashboard',
      'WhatsApp & Telegram Autonomous Customer Agent',
      'Document Parsing & Knowledge Graph Vector DB',
      'Human-in-the-Loop Supervisory Console',
      'Automated Lead Discovery & CRM Pipeline',
      'Custom Gemini / OpenAI Model Fine-tuning'
    ],
    keyIntegrations: ['Google Gemini API', 'WhatsApp Cloud API', 'Stripe / Billing', 'PostgreSQL / Vector DB', 'Zapier / Webhooks'],
    whatsappPrompt: 'Hi Abhishek, I want to discuss building custom AI agents and autonomous workflows for my business.'
  },
  'cloud-kitchen': {
    tagline: 'Multi-brand cloud kitchen direct ordering, kitchen display, and re-order retention.',
    synonyms: ['ghost kitchen', 'dark kitchen', 'virtual restaurant', 'delivery-only food', 'multi-brand kitchen'],
    description: 'Unify multiple virtual restaurant brands under one high-speed ordering portal. Reduce aggregator commission dependency, automate kitchen routing, and maximize direct re-orders.',
    recommendedSolutions: [
      { title: 'Multi-Brand Direct Ordering Portal', category: 'Website', description: 'Switch between virtual brands with a unified cart, instant checkout, and live tracking.', iconName: 'Globe', impact: 'Zero Marketplace Cuts' },
      { title: 'WhatsApp Instant Re-Ordering Bot', category: 'AI & Automation', description: 'Automated 1-click re-ordering for favorite meals, delivery updates, and promotional drop notifications.', iconName: 'Bot', impact: '45% Repeat Rate' },
      { title: 'Kitchen Order Management Dashboard', category: 'Operations & CRM', description: 'Real-time order routing by brand, preparation time countdown, and delivery rider dispatch.', iconName: 'Layers', impact: 'Faster Prep Times' },
      { title: 'SMS / Push Notification Retention Engine', category: 'Growth & Marketing', description: 'Automated lunchtime and dinnertime personalized discount alerts driving repeat orders.', iconName: 'Bell', impact: 'Daily Repeat Orders' },
    ],
    whatWeCanBuild: [
      'Unified Multi-Brand Cloud Kitchen Web App',
      'Kitchen Order Ticket & Prep Screen (KDS)',
      'Live Order Tracking & SMS Delivery Updates',
      'WhatsApp 1-Click Reorder Bot',
      'Customer Loyalty & Cash-back Points System',
      'Automated Daily Sales & Inventory Reports'
    ],
    keyIntegrations: ['Razorpay / Stripe', 'WhatsApp Business API', 'Shiprocket / Dunzo / Shadowfax', 'Twilio SMS', 'POS Systems'],
    whatsappPrompt: 'Hi Abhishek, I want to build a dedicated direct ordering and kitchen management platform for my Cloud Kitchen.'
  },
  'solar-installation': {
    tagline: 'High-converting solar proposal engines, savings calculators, and customer portals.',
    synonyms: ['solar power', 'solar panels', 'solar energy', 'clean energy', 'rooftop solar', 'solar contractor'],
    description: 'Attract qualified residential and commercial property owners with instant solar savings estimation, satellite roof mapping, financing breakdowns, and automated proposal pipelines.',
    recommendedSolutions: [
      { title: 'Instant Solar Savings Calculator', category: 'Website', description: 'Interactive tool calculating monthly electricity savings, payback period, and recommended kilowatt size.', iconName: 'Calculator', impact: '4x Qualified Inquiries' },
      { title: 'Automated Solar Proposal Generator', category: 'Operations & CRM', description: 'Generates branded PDF solar system proposals with financing options and equipment specs.', iconName: 'FileText', impact: 'Faster Deal Closes' },
      { title: 'WhatsApp Solar Lead Qualification Bot', category: 'AI & Automation', description: 'Collects electric bill photos, roof type, and contact details 24/7 automatically.', iconName: 'Bot', impact: 'Instant Lead Triage' },
      { title: 'Installation Tracking Portal', category: 'Mobile', description: 'Keeps customers updated through permit approval, equipment shipment, installation, and grid hookup.', iconName: 'ShieldCheck', impact: 'Eliminate Customer Anxiety' },
    ],
    whatWeCanBuild: [
      'Solar Rooftop Savings Estimation Platform',
      'Interactive Solar System Size & Battery Selector',
      'Automated Electric Bill Upload & Parsing Flow',
      'WhatsApp Consultation & Survey Scheduler',
      'Customer Installation Milestones Dashboard',
      'Local Solar SEO & Commercial Lead Funnel'
    ],
    keyIntegrations: ['Google Maps Solar API', 'WhatsApp Cloud API', 'DocuSign', 'Stripe Financing', 'HubSpot CRM'],
    whatsappPrompt: 'Hi Abhishek, I want to build a solar savings calculator and lead generation platform for my Solar Installation business.'
  }
};

// Builder function that creates complete, production-grade BusinessNiche objects
function buildNiche(name: string, categoryDef: RawCategoryDefinition): BusinessNiche {
  const id = slugify(name);
  const icon = categoryDef.icon;
  const synonyms = generateSynonyms(name, categoryDef.name);

  // Standard high-quality baseline
  const baseNiche: BusinessNiche = {
    id,
    name,
    category: categoryDef.name,
    icon,
    tagline: `Accelerate your ${name} with a high-converting digital platform, automated workflows, and market dominance.`,
    synonyms,
    description: `Full-suite modern digital infrastructure engineered for ${name}. Custom responsive web platform, automated inquiry & booking funnel, 24/7 WhatsApp AI concierge, client dashboard, and top search ranking.`,
    recommendedSolutions: [
      {
        title: `High-Converting ${name} Platform`,
        category: 'Website',
        description: `Ultra-fast modern web application optimized for mobile responsiveness, speed, and maximum customer conversion.`,
        iconName: 'Globe',
        impact: '2.8x Inbound Customers'
      },
      {
        title: `24/7 WhatsApp & Web AI Assistant`,
        category: 'AI & Automation',
        description: `Automated assistant handling FAQs, service inquiries, instant pricing quotes, and appointment scheduling around the clock.`,
        iconName: 'Bot',
        impact: 'Zero Missed Inquiries'
      },
      {
        title: `Client Portal & Operations Dashboard`,
        category: 'Operations & CRM',
        description: `Centralized operations hub for client management, order/lead tracking, invoices, and service status tracking.`,
        iconName: 'Layers',
        impact: 'Streamlined Operations'
      },
      {
        title: `Search Engine & Local SEO Dominance`,
        category: 'Growth & Marketing',
        description: `Top Google search visibility, automated 5-star review collection pipeline, and high-intent customer acquisition.`,
        iconName: 'TrendingUp',
        impact: 'Top Google Rankings'
      }
    ],
    whatWeCanBuild: [
      `Custom Responsive ${name} Web Application`,
      `Interactive Client Inquiry & Booking Funnel`,
      `WhatsApp Business Cloud API Automation`,
      `Local SEO & Google Maps Optimization`,
      `Secure Payment Gateway Integration (Stripe/UPI)`,
      `Admin Management & Lead CRM Dashboard`,
      `Automated Email & SMS Notification Pipeline`,
      `Cloud Hosting Setup with 99.9% Uptime Guarantee`
    ],
    keyIntegrations: [
      'WhatsApp Business API',
      'Stripe / Razorpay',
      'Google Maps API',
      'Twilio / SendGrid',
      'Zapier / Webhooks'
    ],
    packages: [
      {
        name: 'Starter',
        description: `Essential modern digital launchpad for ${name} with portfolio/services showcase and direct inquiry capture.`,
        idealFor: `New or independent ${name} operators`,
        keyDeliverables: [
          'High-Speed Mobile-First Website',
          'Complete Services & Offerings Pages',
          'WhatsApp Chat Lead Capture',
          'Google Maps Location Integration'
        ]
      },
      {
        name: 'Growth',
        badge: 'Most Popular',
        description: `Comprehensive growth engine with interactive booking/ordering, automated reviews, and local search SEO setup.`,
        idealFor: `Established ${name} businesses ready to scale revenue`,
        keyDeliverables: [
          'Interactive Booking / Order Engine',
          'Google 5-Star Review Funnel',
          'Local SEO & Schema Optimization',
          'Social Media Asset Pack & Banners'
        ]
      },
      {
        name: 'Premium',
        description: `Complete digital ecosystem with custom client portal, 24/7 AI conversational agent, and multi-location management.`,
        idealFor: `High-volume or multi-branch ${name} businesses`,
        keyDeliverables: [
          'Custom Client Portal Dashboard',
          '24/7 AI Smart Conversational Bot',
          'Multi-Location / Staff Management',
          'Automated CRM & Payment Workflows'
        ]
      },
      {
        name: 'Custom Enterprise',
        description: `Proprietary iOS & Android mobile apps, custom ERP/inventory integrations, SLA uptime guarantee, and dedicated engineering.`,
        idealFor: `Enterprise organizations and franchises`,
        keyDeliverables: [
          'Native iOS & Android Mobile Apps',
          'Custom API & Enterprise ERP Sync',
          'Dedicated Engineering SLA',
          'Security, Auditing & Cloud Scaling'
        ]
      }
    ],
    whatsappPrompt: `Hi Abhishek, I am interested in building a high-converting digital solution for my ${name}.`
  };

  // Merge flagship customization if present
  const custom = FLAGSHIP_CUSTOMIZATIONS[id];
  if (custom) {
    return {
      ...baseNiche,
      ...custom,
      // Merge arrays cleanly
      synonyms: Array.from(new Set([...baseNiche.synonyms, ...(custom.synonyms || [])])),
      recommendedSolutions: custom.recommendedSolutions || baseNiche.recommendedSolutions,
      whatWeCanBuild: custom.whatWeCanBuild || baseNiche.whatWeCanBuild,
      keyIntegrations: custom.keyIntegrations || baseNiche.keyIntegrations,
      packages: custom.packages || baseNiche.packages
    };
  }

  return baseNiche;
}

// Generate the complete database across all 20 categories and 329 niches
export const NICHES_DATABASE: BusinessNiche[] = [];

RAW_CATEGORY_DEFINITIONS.forEach(categoryDef => {
  categoryDef.niches.forEach(nicheName => {
    NICHES_DATABASE.push(buildNiche(nicheName, categoryDef));
  });
});

/**
 * Intelligent fuzzy and synonym search across all 329 business niches.
 * Returns sorted results with highest relevance matches first.
 */
export function searchNiches(query: string): BusinessNiche[] {
  if (!query || !query.trim()) {
    return NICHES_DATABASE;
  }

  const cleanQuery = query.toLowerCase().trim();
  const searchTokens = cleanQuery.split(/[\s,\-\.]+/).filter(t => t.length > 0);

  interface ScoredNiche {
    niche: BusinessNiche;
    score: number;
  }

  const scored: ScoredNiche[] = [];

  for (const niche of NICHES_DATABASE) {
    const nameLower = niche.name.toLowerCase();
    const catLower = niche.category.toLowerCase();
    const descLower = niche.description.toLowerCase();
    let score = 0;

    // Exact full name match
    if (nameLower === cleanQuery) {
      score += 100;
    } else if (nameLower.startsWith(cleanQuery)) {
      score += 60;
    } else if (nameLower.includes(cleanQuery)) {
      score += 40;
    }

    // Category match
    if (catLower === cleanQuery || catLower.includes(cleanQuery)) {
      score += 30;
    }

    // Synonyms match
    for (const syn of niche.synonyms) {
      const synLower = syn.toLowerCase();
      if (synLower === cleanQuery) {
        score += 50;
        break;
      } else if (synLower.includes(cleanQuery) || cleanQuery.includes(synLower)) {
        score += 25;
        break;
      }
    }

    // Individual token matching
    for (const token of searchTokens) {
      if (nameLower.includes(token)) score += 15;
      if (catLower.includes(token)) score += 8;
      if (niche.synonyms.some(s => s.toLowerCase().includes(token))) score += 10;
      if (descLower.includes(token)) score += 4;
      if (niche.whatWeCanBuild.some(w => w.toLowerCase().includes(token))) score += 4;
    }

    if (score > 0) {
      scored.push({ niche, score });
    }
  }

  // Sort by highest score descending
  scored.sort((a, b) => b.score - a.score);

  return scored.map(s => s.niche);
}

/**
 * Retrieves all niches under a specific category ID or Name
 */
export function getNichesByCategory(categoryIdentifier: string): BusinessNiche[] {
  const cat = CATEGORIES_LIST.find(
    c => c.id.toLowerCase() === categoryIdentifier.toLowerCase() ||
         c.name.toLowerCase() === categoryIdentifier.toLowerCase()
  );
  if (!cat) return [];
  return NICHES_DATABASE.filter(n => n.category.toLowerCase() === cat.name.toLowerCase());
}

/**
 * Retrieves a single niche by its unique slug ID
 */
export function getNicheById(id: string): BusinessNiche | undefined {
  return NICHES_DATABASE.find(n => n.id === id);
}
