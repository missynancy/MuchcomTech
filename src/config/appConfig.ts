import type { AppConfig } from '../types';

export const defaultConfig: AppConfig = {
  storeName: 'muchcomtech',
  checkoutMode: 'whatsapp',
  whatsappNumber: '+254791618090',
  emailEndpoint: 'https://api.web3forms.com/submit',
  currencySymbol: 'KSh ',
  currencyCode: 'KES',
  taxRate: 0.08,
  freeShippingThreshold: 150,
};

const CONFIG_STORAGE_KEY = 'muchcomtech_app_config';

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
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify({ checkoutMode: updated.checkoutMode }));
  } catch (e) {
    console.error('Failed to save config to localStorage', e);
  }
  return updated;
}
