import type { AppConfig } from '../types';

export const defaultConfig: AppConfig = {
  storeName: 'Electromart',
  checkoutMode: 'whatsapp', // Swappable option: 'whatsapp' | 'email'
  whatsappNumber: '+15550192834',
  emailEndpoint: 'https://api.web3forms.com/submit', // Example form-to-email endpoint
  currencySymbol: '$',
  currencyCode: 'USD',
  taxRate: 0.08,
  freeShippingThreshold: 150,
};

// Local storage key for dynamic user toggling during dev/demo
const CONFIG_STORAGE_KEY = 'electromart_app_config';

export function getAppConfig(): AppConfig {
  try {
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (saved) {
      return { ...defaultConfig, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Failed to read config from localStorage', e);
  }
  return defaultConfig;
}

export function saveAppConfig(newConfig: Partial<AppConfig>): AppConfig {
  const current = getAppConfig();
  const updated = { ...current, ...newConfig };
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save config to localStorage', e);
  }
  return updated;
}
