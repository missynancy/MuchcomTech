import type { Product, Category } from '../types';

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Smartphones & Mobile',
    slug: 'smartphones',
    iconName: 'Smartphone',
    itemCount: 12,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-2',
    name: 'Laptops & Computing',
    slug: 'laptops',
    iconName: 'Laptop',
    itemCount: 18,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-3',
    name: 'Audio & Headphones',
    slug: 'audio',
    iconName: 'Headphones',
    itemCount: 15,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-4',
    name: 'Smartwatches & Wearables',
    slug: 'wearables',
    iconName: 'Watch',
    itemCount: 9,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-5',
    name: 'Gaming & Consoles',
    slug: 'gaming',
    iconName: 'Gamepad2',
    itemCount: 14,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-6',
    name: 'Camera & Drone Tech',
    slug: 'cameras',
    iconName: 'Camera',
    itemCount: 8,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
  },
];

export const mockProducts: Product[] = [
  {
    id: 'prod-101',
    name: 'Apex Pro Wireless ANC Headphones',
    slug: 'apex-pro-wireless-anc-headphones',
    category: 'audio',
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    specs: [
      { name: 'Driver Size', value: '40mm Titanium Drivers' },
      { name: 'Battery Life', value: '45 Hours (ANC On)' },
      { name: 'Connectivity', value: 'Bluetooth 5.3, LDAC, 3.5mm' },
      { name: 'Noise Cancellation', value: 'Hybrid Active Noise Cancelling (-42dB)' },
      { name: 'Weight', value: '250g' }
    ],
    description: 'Immerse yourself in studio-grade acoustic clarity. The Apex Pro Wireless features hybrid active noise cancellation, custom-tuned titanium drivers, and ultra-plush memory foam earcups designed for all-day comfort.',
    isFeatured: true,
    isNew: true,
    inStock: true
  },
  {
    id: 'prod-102',
    name: 'VortexBook Ultra 16 M3 Chip Laptop',
    slug: 'vortexbook-ultra-16-m3-laptop',
    category: 'laptops',
    price: 1899,
    originalPrice: 2099,
    rating: 4.95,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    specs: [
      { name: 'Processor', value: '12-Core NextGen Silicon' },
      { name: 'Memory', value: '32GB Unified LPDDR5X' },
      { name: 'Storage', value: '1TB NVMe Gen4 SSD' },
      { name: 'Display', value: '16" 3.2K Mini-LED 120Hz HDR' },
      { name: 'Battery', value: '99.9Wh (Up to 22 hrs)' }
    ],
    description: 'Engineered for creators and power users. The VortexBook Ultra delivers unmatched rendering power, a 3.2K Liquid XDR display with 120Hz Refresh, and silent thermal performance.',
    isFeatured: true,
    isNew: true,
    inStock: true
  },
  {
    id: 'prod-103',
    name: 'Titan Horizon 5G Flagship Smartphone',
    slug: 'titan-horizon-5g-smartphone',
    category: 'smartphones',
    price: 999,
    originalPrice: 1149,
    rating: 4.8,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    specs: [
      { name: 'Camera System', value: '200MP Main + 50MP Periscope 10x Zoom' },
      { name: 'Screen', value: '6.8" AMOLED LTPO 1-120Hz' },
      { name: 'Chipset', value: 'Snapdragon 8 Gen 3 Extreme' },
      { name: 'Battery', value: '5400mAh with 100W Fast Charge' },
      { name: 'Durability', value: 'IP68 Titanium Frame' }
    ],
    description: 'Capture the world in extraordinary detail with the Titan Horizon. Featuring a groundbreaking 200MP quad-camera matrix, aerospace titanium body, and lightning-fast charging.',
    isFeatured: true,
    isNew: false,
    inStock: true
  },
  {
    id: 'prod-104',
    name: 'PulseWatch GT Titanium Smartwatch',
    slug: 'pulsewatch-gt-titanium-smartwatch',
    category: 'wearables',
    price: 349,
    originalPrice: 399,
    rating: 4.7,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    specs: [
      { name: 'Sensors', value: 'ECG, SpO2, Continuous Heart Rate, Body Temp' },
      { name: 'Water Resistance', value: '100m (10 ATM Diver Standard)' },
      { name: 'GPS', value: 'Dual-Frequency L1+L5 Precision GPS' },
      { name: 'Battery Life', value: '14 Days Standard / 60h GPS' },
      { name: 'Display', value: 'Sapphire Crystal AMOLED 2000 nits' }
    ],
    description: 'The ultimate endurance companion. Crafted with grade-5 titanium and scratch-resistant sapphire glass, PulseWatch GT monitors your vitals, sports performance, and sleep recovery 24/7.',
    isFeatured: true,
    isNew: true,
    inStock: true
  },
  {
    id: 'prod-105',
    name: 'CyberDrive OLED 27" 240Hz Gaming Monitor',
    slug: 'cyberdrive-oled-27-gaming-monitor',
    category: 'gaming',
    price: 799,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    specs: [
      { name: 'Panel Type', value: '27" QD-OLED Quad HD (2560x1440)' },
      { name: 'Refresh Rate', value: '240Hz' },
      { name: 'Response Time', value: '0.03ms Gray-to-Gray' },
      { name: 'HDR', value: 'VESA DisplayHDR True Black 400' },
      { name: 'Ports', value: '2x HDMI 2.1, 1x DP 1.4, USB-C 90W PD' }
    ],
    description: 'Dominate competitive esports with instantaneous response times and infinite contrast ratio. The CyberDrive QD-OLED panel brings games to life with vivid color saturation.',
    isFeatured: false,
    isNew: false,
    inStock: true
  },
  {
    id: 'prod-106',
    name: 'AeroGlide 4K Cinema Drone Bundle',
    slug: 'aeroglide-4k-cinema-drone-bundle',
    category: 'cameras',
    price: 1249,
    originalPrice: 1399,
    rating: 4.85,
    reviewsCount: 53,
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
    ],
    specs: [
      { name: 'Camera', value: '4K/60fps HDR 1-inch CMOS Sensor' },
      { name: 'Flight Time', value: '38 Minutes per battery (3 included)' },
      { name: 'Transmission Range', value: '15km OcuLink HD Video' },
      { name: 'Obstacle Sensing', value: '360-Degree Omnidirectional' }
    ],
    description: 'Elevate your filmmaking with cinematic aerial coverage. The AeroGlide 4K features 3-axis mechanical stabilization, active AI tracking, and intelligent return-to-home.',
    isFeatured: false,
    isNew: true,
    inStock: true
  }
];
