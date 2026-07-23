import type { Product, Category, FilterOptions } from '../types';
import { mockProducts, mockCategories } from './mockProducts';

/**
 * Product Data Service Layer
 * 
 * Abstracted async interface for fetching catalog data.
 * Currently uses local mock dataset, but can be seamlessly replaced with
 * headless CMS API calls (e.g. Strapi, Contentful, Sanity, Shopify Storefront API).
 */

export async function getProducts(filters?: Partial<FilterOptions>): Promise<Product[]> {
  // Simulate network latency (50-150ms) to emulate headless CMS fetching
  await new Promise((resolve) => setTimeout(resolve, 80));

  let results = [...mockProducts];

  if (!filters) return results;

  if (filters.category && filters.category !== 'all') {
    results = results.filter(
      (p) => p.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    const query = filters.searchQuery.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  if (filters.minPrice !== undefined && filters.minPrice > 0) {
    results = results.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
    results = results.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
  }

  return results;
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  const product = mockProducts.find((p) => p.id === id || p.slug === id);
  return product || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return mockProducts.filter((p) => p.isFeatured);
}

export async function getCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return mockCategories;
}

export async function getRelatedProducts(
  productId: string,
  category: string,
  limit: number = 3
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return mockProducts
    .filter((p) => p.id !== productId && p.category === category)
    .slice(0, limit);
}
