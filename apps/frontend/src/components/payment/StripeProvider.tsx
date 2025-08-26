import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdef');

interface StripeProviderProps {
  children: React.ReactNode;
  clientSecret?: string;
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children, clientSecret }) => {
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#9CAF88', // sage color
        colorBackground: '#ffffff',
        colorText: '#2D3436', // charcoal
        colorDanger: '#DC3545',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '12px',
      },
      rules: {
        '.Input': {
          border: '2px solid #E5E5E5',
          borderRadius: '12px',
          padding: '12px',
          fontSize: '16px',
        },
        '.Input:focus': {
          borderColor: '#9CAF88',
          boxShadow: '0 0 0 1px #9CAF88',
        },
        '.Label': {
          fontSize: '14px',
          fontWeight: '500',
          color: '#2D3436',
          marginBottom: '8px',
        },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={clientSecret ? options : undefined}>
      {children}
    </Elements>
  );
};

export default StripeProvider;