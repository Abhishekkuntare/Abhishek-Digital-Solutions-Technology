export interface RecommendedSolution {
  title: string;
  category: 'Website' | 'Mobile' | 'AI & Automation' | 'Growth & Marketing' | 'Operations & CRM';
  description: string;
  iconName: string;
  impact: string;
}

export interface PackageTier {
  name: 'Starter' | 'Growth' | 'Premium' | 'Custom Enterprise';
  badge?: string;
  description: string;
  idealFor: string;
  keyDeliverables: string[];
}

export interface BusinessNiche {
  id: string;
  name: string;
  category: string;
  icon: string;
  tagline: string;
  synonyms: string[];
  description: string;
  recommendedSolutions: RecommendedSolution[];
  whatWeCanBuild: string[];
  keyIntegrations: string[];
  packages: PackageTier[];
  whatsappPrompt: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
  nichesCount: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
  tags: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  items: ServiceItem[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  tagline: string;
  client: string;
  industry: string;
  isConcept: boolean;
  coverImage: string;
  galleryImages: string[];
  servicesDelivered: string[];
  technologies: string[];
  highlights: string[];
  results: {
    metric: string;
    label: string;
  }[];
  overview: string;
  liveUrl?: string;
}

export interface QuoteLead {
  id: string;
  createdAt: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  country: string;
  businessNiche: string;
  servicesRequired: string[];
  platforms: string[];
  goals: string[];
  timeline: string;
  budgetRange: string;
  projectDescription: string;
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'In Discussion' | 'Won' | 'Lost';
  notes?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  author: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Development' | 'AI & Automation' | 'International & Pricing' | 'Support';
}

export interface BeforeAfterExample {
  id: string;
  niche: string;
  title: string;
  before: {
    title: string;
    description: string;
    issues: string[];
    conversionRate: string;
    mobileSpeed: string;
  };
  after: {
    title: string;
    description: string;
    improvements: string[];
    conversionRate: string;
    mobileSpeed: string;
  };
}

export interface CurrencyConfig {
  code: 'USD' | 'INR' | 'EUR' | 'GBP' | 'AED' | 'CAD' | 'AUD';
  symbol: string;
  rateToUSD: number;
}

export interface ServiceBundle {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  features: string[];
  idealFor: string;
  startingUSD?: number;
  deliveryTime?: string;
  popular?: boolean;
}
