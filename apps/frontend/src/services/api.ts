// API Service Layer for Helseriet Frontend

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Local type definitions - no external dependencies
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
  errors?: Array<{ message: string }>;
  timestamp?: string;
  path?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  description?: string;
  shortDescription?: string;
  images?: ProductImage[];
  image?: string; // Fallback for hardcoded data
  category?: Category;
  avgRating?: number;
  reviewCount?: number;
  rating?: number; // Fallback for hardcoded data
  reviews?: number; // Fallback for hardcoded data
  isBundle?: boolean;
  isFeatured?: boolean;
  quantity?: number;
  sku?: string;
  isActive?: boolean;
  brand?: string;
  badges?: string[];
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product?: Product;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalItems?: number;
  totalPrice?: number;
}

export interface Bundle {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  products: Product[];
}

// Response types
export type ProductsResponse = { products: Product[]; pagination?: any };
export type CategoriesResponse = Category[];
export type ProductResponse = Product;
export type CartResponse = Cart;
export type UserResponse = User;

// HTTP Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      // Handle non-ok responses with standardized error format
      if (!response.ok) {
        // If response contains standardized error format, throw it
        if (data && typeof data === 'object' && 'success' in data && data.success === false) {
          const apiError = new Error('API Error') as any;
          apiError.response = { data: data as ApiError };
          apiError.status = response.status;
          throw apiError;
        }
        
        // Fallback for non-standardized errors
        const fallbackError = new Error('API Error') as any;
        fallbackError.response = {
          data: {
            success: false,
            message: data?.message || `HTTP ${response.status}: ${response.statusText}`,
            code: `HTTP_${response.status}`,
            errors: [{ message: data?.message || response.statusText }],
            timestamp: new Date().toISOString(),
            path: endpoint
          } as ApiError
        };
        fallbackError.status = response.status;
        throw fallbackError;
      }

      return data;
    } catch (error: any) {
      // If it's already a formatted API error, re-throw it
      if (error.response?.data) {
        throw error;
      }
      
      // Handle network errors and other exceptions
      const networkError = new Error('Network Error') as any;
      networkError.response = {
        data: {
          success: false,
          message: 'Nettverksfeil. Sjekk internett-tilkoblingen din.',
          code: 'NETWORK_ERROR',
          errors: [{ message: error.message || 'Network request failed' }],
          timestamp: new Date().toISOString(),
          path: endpoint
        } as ApiError
      };
      networkError.status = 0;
      throw networkError;
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create API client instance
const apiClient = new ApiClient(API_BASE_URL);

// API Service Methods
export const authService = {
  login: async (email: string, password: string) => {
    return apiClient.post<{ user: User; token: string }>('/auth/login', {
      email,
      password,
    });
  },

  register: async (userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => {
    return apiClient.post<{ user: User; token: string }>('/auth/register', userData);
  },

  logout: async () => {
    localStorage.removeItem('auth_token');
    return Promise.resolve();
  },

  getCurrentUser: async () => {
    return apiClient.get<User>('/auth/me');
  },
};

export const productService = {
  getAll: async (params?: { 
    category?: string; 
    featured?: boolean; 
    limit?: number; 
    offset?: number;
    isBundle?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.featured) searchParams.append('featured', 'true');
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());
    if (params?.isBundle !== undefined) searchParams.append('isBundle', params.isBundle.toString());

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    
    return apiClient.get<{products: Product[], pagination: any}>(endpoint);
  },

  getById: async (id: string) => {
    return apiClient.get<Product>(`/products/${id}`);
  },

  getBySlug: async (slug: string) => {
    return apiClient.get<Product>(`/products/slug/${slug}`);
  },
};

export const categoryService = {
  getAll: async () => {
    return apiClient.get<Category[]>('/categories');
  },

  getById: async (id: string) => {
    return apiClient.get<Category>(`/categories/${id}`);
  },
};

export const bundleService = {
  getAll: async (params?: { 
    featured?: boolean; 
    limit?: number; 
    offset?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.featured) searchParams.append('featured', 'true');
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/bundles?${queryString}` : '/bundles';
    
    return apiClient.get<Bundle[]>(endpoint);
  },

  getById: async (id: string) => {
    return apiClient.get<Bundle>(`/bundles/${id}`);
  },

  getBySlug: async (slug: string) => {
    return apiClient.get<Bundle>(`/bundles/slug/${slug}`);
  },
};

export const cartService = {
  // Session-based cart (no authentication required)
  get: async () => {
    return apiClient.get<Cart>('/cart/session');
  },

  addItem: async (productId: string, quantity: number) => {
    return apiClient.post<CartItem>('/cart/session/items', { productId, quantity });
  },

  updateItem: async (productId: string, quantity: number) => {
    return apiClient.put<CartItem>(`/cart/session/items/${productId}`, { quantity });
  },

  removeItem: async (productId: string) => {
    return apiClient.delete<void>(`/cart/session/items/${productId}`);
  },

  clear: async () => {
    return apiClient.delete<void>('/cart/session');
  },

  // Authenticated cart (for logged-in users)
  getUserCart: async () => {
    return apiClient.get<Cart>('/cart');
  },

  addItemToUserCart: async (productId: string, quantity: number) => {
    return apiClient.post<CartItem>('/cart/items', { productId, quantity });
  },

  updateUserCartItem: async (itemId: string, quantity: number) => {
    return apiClient.put<CartItem>(`/cart/items/${itemId}`, { quantity });
  },

  removeUserCartItem: async (itemId: string) => {
    return apiClient.delete<void>(`/cart/items/${itemId}`);
  },

  clearUserCart: async () => {
    return apiClient.delete<void>('/cart');
  },
};

export interface OrderRequest {
  billingAddress: {
    firstName: string;
    lastName: string;
    company?: string;
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  shippingAddress?: {
    firstName: string;
    lastName: string;
    company?: string;
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  email: string;
  phone?: string;
  notes?: string;
}

export const orderService = {
  create: async (orderData: OrderRequest) => {
    return apiClient.post('/orders', orderData);
  },

  getById: async (id: string) => {
    return apiClient.get(`/orders/${id}`);
  },

  getUserOrders: async () => {
    return apiClient.get('/orders');
  },

  cancelOrder: async (orderId: string) => {
    return apiClient.put(`/orders/${orderId}/cancel`, {});
  },
};

// Payment Service
export interface PaymentIntentRequest {
  email: string;
  billingAddress: {
    firstName: string;
    lastName: string;
    company?: string;
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  shippingAddress?: {
    firstName: string;
    lastName: string;
    company?: string;
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  phone?: string;
  notes?: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
}

export const paymentService = {
  // Session-based payment (no authentication required)
  createSessionPaymentIntent: async (paymentData: PaymentIntentRequest) => {
    return apiClient.post<PaymentIntentResponse>('/payments/session/create-intent', paymentData);
  },

  // Authenticated user payment
  createPaymentIntent: async (paymentData: PaymentIntentRequest) => {
    return apiClient.post<PaymentIntentResponse>('/payments/create-intent', paymentData);
  },

  // Confirm payment (works for both session and authenticated)
  confirmPayment: async (paymentIntentId: string) => {
    return apiClient.post('/payments/confirm', { paymentIntentId });
  },

  // Get payment status
  getPaymentStatus: async (paymentIntentId: string) => {
    return apiClient.get(`/payments/${paymentIntentId}/status`);
  },
};

// Health check
export const healthCheck = async () => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const response = await fetch(`${baseUrl}/health`);
  return response.json();
};

export default apiClient;