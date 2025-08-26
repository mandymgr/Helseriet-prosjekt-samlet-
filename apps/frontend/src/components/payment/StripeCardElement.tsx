import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { HiOutlineCheckCircle, HiOutlineExclamationTriangle, HiOutlineShieldCheck } from 'react-icons/hi2';
import { paymentService } from '../../services/payment';

interface StripeCardElementProps {
  onPaymentSuccess: (paymentResult: any) => void;
  onPaymentError: (error: string) => void;
  orderId: string;
  amount: number;
  isProcessing?: boolean;
  onProcessingChange?: (processing: boolean) => void;
}

const StripeCardElement: React.FC<StripeCardElementProps> = ({
  onPaymentSuccess,
  onPaymentError,
  orderId,
  amount,
  isProcessing = false,
  onProcessingChange
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [saveCard, setSaveCard] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe har ikke lastet ennå. Prøv igjen.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Kort-element ikke funnet');
      return;
    }

    setProcessing(true);
    onProcessingChange?.(true);
    setError(null);

    try {
      // Create payment intent
      const { clientSecret } = await paymentService.createPaymentIntent(orderId, 'stripe');

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: 'Customer Name', // This should come from form data
          },
        },
        setup_future_usage: saveCard ? 'off_session' : undefined,
      });

      if (result.error) {
        setError(result.error.message || 'En feil oppstod ved betaling');
        onPaymentError(result.error.message || 'Payment failed');
      } else {
        onPaymentSuccess(result.paymentIntent);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'En ukjent feil oppstod';
      setError(errorMessage);
      onPaymentError(errorMessage);
    } finally {
      setProcessing(false);
      onProcessingChange?.(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#2D3436',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        '::placeholder': {
          color: '#9CA3AF',
        },
      },
      invalid: {
        color: '#DC3545',
        iconColor: '#DC3545',
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="space-y-6">
      {/* Card Element */}
      <div>
        <label className="block text-sm font-medium text-charcoal mb-3">
          Kortinformasjon
        </label>
        <div className="relative">
          <div className="w-full px-4 py-4 border-2 border-stone rounded-xl focus-within:border-sage transition-colors bg-white">
            <CardElement
              options={cardElementOptions}
              onChange={(event) => {
                setCardComplete(event.complete);
                if (event.error) {
                  setError(event.error.message);
                } else {
                  setError(null);
                }
              }}
            />
          </div>
          {cardComplete && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <HiOutlineCheckCircle className="w-5 h-5 text-sage" />
            </div>
          )}
        </div>
      </div>

      {/* Save Card Option */}
      <div className="bg-terracotta/10 border-2 border-terracotta/20 rounded-xl p-4">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
            className="mt-1 mr-3"
          />
          <div className="text-sm text-charcoal/80">
            <strong className="text-terracotta">Påkrevd for abonnement:</strong> Lagre betalingsmetode for automatiske fremtidige betalinger.
            Kortet lagres sikkert og kryptert i henhold til PCI DSS standarder.
          </div>
        </label>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
          <HiOutlineExclamationTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-700">
            <strong>Betalingsfeil:</strong> {error}
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-center justify-center gap-3 text-charcoal/60 py-4">
        <HiOutlineShieldCheck className="w-6 h-6" />
        <p className="text-sm">Sikker betaling med SSL-kryptering</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!stripe || !cardComplete || processing || isProcessing}
        className={`w-full py-4 px-6 rounded-xl font-medium text-lg transition-all duration-300 ${
          !stripe || !cardComplete || processing || isProcessing
            ? 'bg-stone/50 text-charcoal/50 cursor-not-allowed'
            : 'bg-sage text-white hover:bg-sage_dark hover-float minimal-shadow'
        }`}
      >
        {processing || isProcessing ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Behandler betaling...
          </div>
        ) : (
          `Betal ${amount.toLocaleString('no-NO')} kr`
        )}
      </button>
    </div>
  );
};

export default StripeCardElement;