import { API_BASE_URL } from './api';

export interface HomepageConfig {
  featuredProduct: any | null;
  bundleProducts: any[];
  popularProducts: any[];
  categoriesConfig: Array<{
    name: string;
    slug: string;
    description: string;
    productCount: number;
  }>;
}

export interface UpdateHomepageConfigRequest {
  featuredProductId?: string | null;
  bundleProducts?: string[];
  popularProducts?: string[];
  categoriesConfig?: Array<{
    name: string;
    slug: string;
    description: string;
    productCount: number;
  }>;
}

export const homepageApi = {
  // Get current homepage configuration
  getConfig: async (): Promise<HomepageConfig> => {
    const response = await fetch(`${API_BASE_URL}/homepage/config`);
    if (!response.ok) {
      throw new Error('Failed to fetch homepage configuration');
    }
    return response.json();
  },

  // Update homepage configuration
  updateConfig: async (config: UpdateHomepageConfigRequest): Promise<HomepageConfig> => {
    const response = await fetch(`${API_BASE_URL}/homepage/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update homepage configuration');
    }
    return response.json();
  },
};