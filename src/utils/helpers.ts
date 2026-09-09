import { CurrencyConfig } from '../types';

export const CURRENCY_CONFIGS: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rateToUSD: 1 },
  INR: { code: 'INR', symbol: '₹', rateToUSD: 86.5 },
  EUR: { code: 'EUR', symbol: '€', rateToUSD: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rateToUSD: 0.78 },
  AED: { code: 'AED', symbol: 'AED ', rateToUSD: 3.67 },
  CAD: { code: 'CAD', symbol: 'CA$', rateToUSD: 1.38 },
  AUD: { code: 'AUD', symbol: 'AU$', rateToUSD: 1.52 }
};

export function formatPrice(amountInUSD: number, currencyCode: string = 'USD'): string {
  const config = CURRENCY_CONFIGS[currencyCode] || CURRENCY_CONFIGS.USD;
  const converted = Math.round(amountInUSD * config.rateToUSD);
  
  if (config.code === 'INR') {
    return `${config.symbol}${converted.toLocaleString('en-IN')}`;
  }
  return `${config.symbol}${converted.toLocaleString('en-US')}`;
}

export function generateWhatsAppUrl(phone: string = '+919156075536', customText?: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const defaultMessage = "Hi Abhishek, I found your website and I'm interested in building a digital solution for my business.";
  const message = encodeURIComponent(customText || defaultMessage);
  return `https://wa.me/${cleanPhone}?text=${message}`;
}
