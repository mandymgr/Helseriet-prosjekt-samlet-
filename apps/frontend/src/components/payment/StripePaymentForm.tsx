import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCardElement from './StripeCardElement';
import { paymentService } from '../../services/payment';
import { HiOutlineCreditCard } from 'react-icons/hi2';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdef');

interface StripePaymentFormProps {
  orderId: string;
  amount: number;
  onPaymentSuccess: (paymentResult: any) => void;
  onPaymentError: (error: string) => void;
  className?: string;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  orderId,
  amount,
  onPaymentSuccess,
  onPaymentError,
  className = ''
}) => {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const initializePayment = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const paymentIntent = await paymentService.createPaymentIntent(orderId, 'stripe');
        setClientSecret(paymentIntent.clientSecret);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Kunne ikke initialisere betaling';
        setError(errorMessage);
        onPaymentError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      initializePayment();
    }
  }, [orderId, onPaymentError]);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#9CAF88', // sage color
      colorBackground: '#ffffff',
      colorText: '#2D3436', // charcoal
      colorDanger: '#DC3545',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '12px',
      focusBoxShadow: '0 0 0 1px #9CAF88',
    },
    rules: {
      '.Input': {
        border: '2px solid #E5E5E5',
        borderRadius: '12px',
        padding: '12px 16px',
        fontSize: '16px',
        backgroundColor: '#ffffff',
      },
      '.Input:focus': {
        borderColor: '#9CAF88',
        outline: 'none',
        boxShadow: '0 0 0 1px #9CAF88',
      },
      '.Input--invalid': {
        borderColor: '#DC3545',
      },
      '.Label': {
        fontSize: '14px',
        fontWeight: '500',
        color: '#2D3436',
        marginBottom: '8px',
      },
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center gap-3 p-6 border-2 border-sage/20 rounded-xl bg-sage/5">
          <HiOutlineCreditCard className="w-6 h-6 text-sage" />
          <div>
            <p className="font-medium text-charcoal">Initialiserer sikker betaling...</p>
            <p className="text-sm text-charcoal/60">Kobler til Stripe betalingsgateway</p>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="h-12 bg-stone/20 rounded-xl mb-4"></div>
          <div className="h-24 bg-stone/20 rounded-xl mb-4"></div>
          <div className="h-12 bg-stone/20 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl">
          <p className="font-medium text-red-700 mb-2">Kunne ikke laste betalingsskjema</p>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
          <p className="font-medium text-yellow-700">Venter på betalingsinformasjon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-3 p-4 bg-sage/10 border-2 border-sage/20 rounded-xl">
        <HiOutlineCreditCard className="w-6 h-6 text-sage" />
        <div>
          <p className="font-medium text-charcoal">Sikker kortbetaling</p>
          <p className="text-sm text-charcoal/60">Støtter Visa, Mastercard og American Express</p>
        </div>
      </div>

      <Elements stripe={stripePromise} options={options}>
        <StripeCardElement
          orderId={orderId}
          amount={amount}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
          isProcessing={isProcessing}
          onProcessingChange={setIsProcessing}
        />
      </Elements>
    </div>
  );
};

export default StripePaymentForm;