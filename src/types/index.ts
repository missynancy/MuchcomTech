export interface ProductSpec {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[];
  specs: ProductSpec[];
  description: string;
  isFeatured?: boolean;
  isNew?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  itemCount: number;
  image: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes?: string;
}

export type CheckoutMode = 'whatsapp' | 'email';

export interface AppConfig {
  storeName: string;
  checkoutMode: CheckoutMode;
  whatsappNumber: string; // e.g. "15550192834"
  emailEndpoint: string;  // e.g. "https://formspree.io/f/sample"
  currencySymbol: string;
  currencyCode: string;
  taxRate: number;
  freeShippingThreshold: number;
}

export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}
