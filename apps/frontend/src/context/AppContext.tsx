import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { User, CartItem } from '../services/api';

// State interface
interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  cart: {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
  };
  favorites: string[]; // Product IDs
  recentlyViewed: string[]; // Product IDs
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: Date;
  }>;
}

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string } // item ID
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_FAVORITES'; payload: string }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'ADD_TO_RECENTLY_VIEWED'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<AppState['notifications'][0], 'id' | 'timestamp'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string } // notification ID
  | { type: 'CLEAR_NOTIFICATIONS' };

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  cart: {
    items: [],
    totalItems: 0,
    totalPrice: 0
  },
  favorites: JSON.parse(localStorage.getItem('helseriet_favorites') || '[]'),
  recentlyViewed: JSON.parse(localStorage.getItem('helseriet_recently_viewed') || '[]'),
  notifications: []
};

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };

    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload,
        user: action.payload ? state.user : null
      };

    case 'ADD_TO_CART': {
      const existingItem = state.cart.items.find(item => item.productId === action.payload.productId);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = state.cart.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.cart.items, action.payload];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

      return {
        ...state,
        cart: {
          items: newItems,
          totalItems,
          totalPrice
        }
      };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.cart.items.filter(item => item.id !== action.payload);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

      return {
        ...state,
        cart: {
          items: newItems,
          totalItems,
          totalPrice
        }
      };
    }

    case 'UPDATE_CART_ITEM': {
      const newItems = state.cart.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

      return {
        ...state,
        cart: {
          items: newItems,
          totalItems,
          totalPrice
        }
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: {
          items: [],
          totalItems: 0,
          totalPrice: 0
        }
      };

    case 'SET_CART': {
      const totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = action.payload.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

      return {
        ...state,
        cart: {
          items: action.payload,
          totalItems,
          totalPrice
        }
      };
    }

    case 'ADD_TO_FAVORITES': {
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem('helseriet_favorites', JSON.stringify(newFavorites));
      return {
        ...state,
        favorites: newFavorites
      };
    }

    case 'REMOVE_FROM_FAVORITES': {
      const newFavorites = state.favorites.filter(id => id !== action.payload);
      localStorage.setItem('helseriet_favorites', JSON.stringify(newFavorites));
      return {
        ...state,
        favorites: newFavorites
      };
    }

    case 'ADD_TO_RECENTLY_VIEWED': {
      const newRecentlyViewed = [
        action.payload,
        ...state.recentlyViewed.filter(id => id !== action.payload)
      ].slice(0, 10); // Keep only last 10 items

      localStorage.setItem('helseriet_recently_viewed', JSON.stringify(newRecentlyViewed));
      return {
        ...state,
        recentlyViewed: newRecentlyViewed
      };
    }

    case 'ADD_NOTIFICATION': {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date()
      };
      return {
        ...state,
        notifications: [...state.notifications, notification]
      };
    }

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Action creators for convenience
export const useAppActions = () => {
  const { dispatch } = useAppContext();

  return {
    setUser: (user: User | null) => dispatch({ type: 'SET_USER', payload: user }),
    setAuthenticated: (authenticated: boolean) => dispatch({ type: 'SET_AUTHENTICATED', payload: authenticated }),
    addToCart: (item: CartItem) => dispatch({ type: 'ADD_TO_CART', payload: item }),
    removeFromCart: (itemId: string) => dispatch({ type: 'REMOVE_FROM_CART', payload: itemId }),
    updateCartItem: (id: string, quantity: number) => dispatch({ type: 'UPDATE_CART_ITEM', payload: { id, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    setCart: (items: CartItem[]) => dispatch({ type: 'SET_CART', payload: items }),
    addToFavorites: (productId: string) => dispatch({ type: 'ADD_TO_FAVORITES', payload: productId }),
    removeFromFavorites: (productId: string) => dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId }),
    addToRecentlyViewed: (productId: string) => dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: productId }),
    addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp'>) => 
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
    removeNotification: (notificationId: string) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: notificationId }),
    clearNotifications: () => dispatch({ type: 'CLEAR_NOTIFICATIONS' })
  };
};