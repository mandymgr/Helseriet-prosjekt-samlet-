import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { paymentService, type PaymentIntentRequest } from '../../services/api';
import { 
  HiCreditCard, 
  HiCheckCircle, 
  HiXCircle, 
  HiArrowPath,
  HiShoppingCart,
  HiMapPin,
  HiEnvelope,
  HiPhone,
  HiUser
} from 'react-icons/hi2';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface CheckoutFormProps {
  onSuccess: (orderId: string) => void;
  onError: (error: string) => void;
  amount: number;
  cartItems: any[];
}

const CheckoutFormInner: React.FC<CheckoutFormProps> = ({ onSuccess, onError, amount, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'success' | 'error'>('details');
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<PaymentIntentRequest>({
    email: '',
    billingAddress: {
      firstName: '',
      lastName: '',
      company: '',
      street: '',
      city: '',
      postalCode: '',
      country: 'Norge'
    },
    shippingAddress: undefined,
    phone: '',
    notes: ''
  });
  
  const [sameAsShipping] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = 'E-post er påkrevd';
    if (!formData.billingAddress.firstName) newErrors.firstName = 'Fornavn er påkrevd';
    if (!formData.billingAddress.lastName) newErrors.lastName = 'Etternavn er påkrevd';
    if (!formData.billingAddress.street) newErrors.street = 'Adresse er påkrevd';
    if (!formData.billingAddress.city) newErrors.city = 'By er påkrevd';
    if (!formData.billingAddress.postalCode) newErrors.postalCode = 'Postnummer er påkrevd';
    
    // Validate shipping address if different
    if (!sameAsShipping && formData.shippingAddress) {
      if (!formData.shippingAddress.firstName) newErrors.shippingFirstName = 'Fornavn er påkrevd';
      if (!formData.shippingAddress.lastName) newErrors.shippingLastName = 'Etternavn er påkrevd';
      if (!formData.shippingAddress.street) newErrors.shippingStreet = 'Adresse er påkrevd';
      if (!formData.shippingAddress.city) newErrors.shippingCity = 'By er påkrevd';
      if (!formData.shippingAddress.postalCode) newErrors.shippingPostalCode = 'Postnummer er påkrevd';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      setProcessing(true);
      
      // Prepare payment data
      const paymentData: PaymentIntentRequest = {
        ...formData,
        shippingAddress: sameAsShipping ? formData.billingAddress : formData.shippingAddress
      };
      
      // Create payment intent
      const response = await paymentService.createSessionPaymentIntent(paymentData);
      if (response.success && response.data) {
        setPaymentIntentId(response.data.paymentIntentId);
        setStep('payment');
      } else {
        onError('Kunne ikke opprette betaling');
      }
    } catch (error: any) {
      console.error('Payment intent creation failed:', error);
      onError(error.response?.data?.message || 'Kunne ikke opprette betaling');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !paymentIntentId) {
      return;
    }
    
    setProcessing(true);
    
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onError('Kortinformasjon ikke funnet');
      setProcessing(false);
      return;
    }
    
    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(paymentIntentId, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formData.billingAddress.firstName} ${formData.billingAddress.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.billingAddress.street,
              city: formData.billingAddress.city,
              postal_code: formData.billingAddress.postalCode,
              country: 'NO'
            }
          }
        }
      });
      
      if (error) {
        console.error('Payment confirmation failed:', error);
        onError(error.message || 'Betalingen feilet');
        setStep('error');
      } else if (paymentIntent?.status === 'succeeded') {
        // Confirm with backend
        const confirmResponse = await paymentService.confirmPayment(paymentIntent.id);
        if (confirmResponse.success) {
          setStep('success');
          onSuccess(paymentIntent.id);
        } else {
          onError('Kunne ikke bekrefte bestillingen');
          setStep('error');
        }
      }
    } catch (error: any) {
      console.error('Payment processing error:', error);
      onError(error.response?.data?.message || 'En feil oppstod under behandling av betaling');
      setStep('error');
    } finally {
      setProcessing(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="organic-border bg-gradient-to-br from-sage/5 to-sage/10 border-sage/30">
        <div className="card-inner text-center py-12">
          <HiCheckCircle className="w-20 h-20 text-sage mx-auto mb-6" />
          <h2 className="text-responsive-h2 text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Betaling Fullført!
          </h2>
          <p className="text-responsive-body text-charcoal/80 mb-6">
            Takk for ditt kjøp! Du vil motta en bekreftelse på e-post snart.
          </p>
          <div className="organic-border bg-sage/10 inline-block px-6 py-3">
            <p className="text-sage font-medium">Bestillingsbeløp: {amount} NOK</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div className="organic-border bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <div className="card-inner text-center py-12">
          <HiXCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-responsive-h2 text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Betaling Feilet
          </h2>
          <p className="text-responsive-body text-charcoal/80 mb-6">
            Det oppstod en feil under behandling av betalingen. Vennligst prøv igjen.
          </p>
          <button
            onClick={() => setStep('payment')}
            className="px-6 py-3 organic-border bg-sage hover:bg-sage/80 text-white font-medium transition-all duration-300"
          >
            Prøv igjen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className={`flex items-center space-x-2 ${step === 'details' ? 'text-sage' : step === 'payment' ? 'text-charcoal' : 'text-charcoal/40'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step === 'details' ? 'border-sage bg-sage/10' : 'border-charcoal/20 bg-charcoal/5'}`}>
            <span className="text-sm font-medium">1</span>
          </div>
          <span className="font-medium">Detaljer</span>
        </div>
        <div className="w-12 h-0.5 bg-charcoal/20"></div>
        <div className={`flex items-center space-x-2 ${step === 'payment' ? 'text-sage' : 'text-charcoal/40'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step === 'payment' ? 'border-sage bg-sage/10' : 'border-charcoal/20 bg-charcoal/5'}`}>
            <span className="text-sm font-medium">2</span>
          </div>
          <span className="font-medium">Betaling</span>
        </div>
      </div>

      {/* Order Summary */}
      <div className="organic-border bg-gradient-to-br from-warm_white to-cream border-stone_light/50">
        <div className="card-inner">
          <h3 className="text-responsive-h3 text-charcoal mb-4 flex items-center gap-3" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            <HiShoppingCart className="w-5 h-5 text-sage" />
            Bestillingsoversikt
          </h3>
          
          <div className="space-y-3 mb-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-stone_light/30">
                <div>
                  <span className="font-medium text-charcoal">{item.product?.name || `Produkt ${item.productId}`}</span>
                  <span className="text-sm text-charcoal/60 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-medium text-terracotta">{(item.product?.price || 0) * item.quantity} NOK</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-sage/20">
            <span className="text-responsive-h3 text-charcoal font-bold">Total</span>
            <span className="text-responsive-h3 text-sage font-bold">{amount} NOK</span>
          </div>
        </div>
      </div>

      {/* Step Content */}
      {step === 'details' && (
        <form onSubmit={handleDetailsSubmit} className="space-y-6">
          <div className="organic-border bg-white minimal-shadow">
            <div className="card-inner">
              <h3 className="text-responsive-h3 text-charcoal mb-6 flex items-center gap-3" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                <HiUser className="w-5 h-5 text-sage" />
                Personlige Opplysninger
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    <HiEnvelope className="inline w-4 h-4 mr-1" />
                    E-post *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full organic-border px-3 py-2 text-charcoal focus:border-sage/50 transition-colors ${errors.email ? 'border-red-300' : 'border-stone_light'}`}
                    placeholder="din@epost.no"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    <HiPhone className="inline w-4 h-4 mr-1" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full organic-border border-stone_light px-3 py-2 text-charcoal focus:border-sage/50 transition-colors"
                    placeholder="+47 123 45 678"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="organic-border bg-white minimal-shadow">
            <div className="card-inner">
              <h3 className="text-responsive-h3 text-charcoal mb-6 flex items-center gap-3" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                <HiMapPin className="w-5 h-5 text-terracotta" />
                Fakturaadresse
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Fornavn *</label>
                  <input
                    type="text"
                    value={formData.billingAddress.firstName}
                    onChange={(e) => setFormData({...formData, billingAddress: {...formData.billingAddress, firstName: e.target.value}})}
                    className={`w-full organic-border px-3 py-2 text-charcoal focus:border-sage/50 transition-colors ${errors.firstName ? 'border-red-300' : 'border-stone_light'}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Etternavn *</label>
                  <input
                    type="text"
                    value={formData.billingAddress.lastName}
                    onChange={(e) => setFormData({...formData, billingAddress: {...formData.billingAddress, lastName: e.target.value}})}
                    className={`w-full organic-border px-3 py-2 text-charcoal focus:border-sage/50 transition-colors ${errors.lastName ? 'border-red-300' : 'border-stone_light'}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-1">Firma (valgfritt)</label>
                  <input
                    type="text"
                    value={formData.billingAddress.company}
                    onChange={(e) => setFormData({...formData, billingAddress: {...formData.billingAddress, company: e.target.value}})}
                    className="w-full organic-border border-stone_light px-3 py-2 text-charcoal focus:border-sage/50 transition-colors"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-1">Adresse *</label>
                  <input
                    type="text"
                    value={formData.billingAddress.street}
                    onChange={(e) => setFormData({...formData, billingAddress: {...formData.billingAddress, street: e.target.value}})}
                    className={`w-full organic-border px-3 py-2 text-charcoal focus:border-sage/50 transition-colors ${errors.street ? 'border-red-300' : 'border-stone_light'}`}
                  />
                  {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">By *</label>
                  <input
                    type="text"
                    value={formData.billingAddress.city}
                    onChange={(e) => setFormData({...formData, billingAddress: {...formData.billingAddress, city: e.target.value}})}
                    className={`w-full organic-border px-3 py-2 text-charcoal focus:border-sage/50 transition-colors ${errors.city ? 'border-red-300' : 'border-stone_light'}`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Postnummer *</label>
                  <input
                    type="text"
                    value={formData.billingAddress.postalCode}
                    onChange={(e) => setFormData({...formData, billingAddress: {...formData.billingAddress, postalCode: e.target.value}})}
                    className={`w-full organic-border px-3 py-2 text-charcoal focus:border-sage/50 transition-colors ${errors.postalCode ? 'border-red-300' : 'border-stone_light'}`}
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="organic-border bg-warm_white/50 border-stone_light/50">
            <div className="card-inner">
              <label className="block text-sm font-medium text-charcoal mb-2">Notater til bestillingen (valgfritt)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
                className="w-full organic-border border-stone_light px-3 py-2 text-charcoal focus:border-sage/50 transition-colors resize-none"
                placeholder="Spesielle instruksjoner eller kommentarer..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full px-6 py-4 organic-border bg-gradient-to-r from-sage to-sage/80 hover:from-sage/80 hover:to-sage text-white font-medium disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <HiArrowPath className="w-5 h-5 animate-spin" />
                Behandler...
              </>
            ) : (
              'Fortsett til Betaling'
            )}
          </button>
        </form>
      )}

      {step === 'payment' && (
        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          <div className="organic-border bg-white minimal-shadow">
            <div className="card-inner">
              <h3 className="text-responsive-h3 text-charcoal mb-6 flex items-center gap-3" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                <HiCreditCard className="w-5 h-5 text-sage" />
                Kortinformasjon
              </h3>
              
              <div className="organic-border border-stone_light p-4 mb-4">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#374151',
                        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                        '::placeholder': {
                          color: '#9CA3AF',
                        },
                      },
                      invalid: {
                        color: '#EF4444',
                        iconColor: '#EF4444',
                      },
                    },
                  }}
                />
              </div>
              
              <p className="text-xs text-charcoal/60 mb-6">
                Dine betalingsinformasjoner er sikret med 256-bit SSL-kryptering
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setStep('details')}
              className="flex-1 px-6 py-4 organic-border bg-warm_white hover:bg-stone_light/50 text-charcoal font-medium transition-all duration-300"
            >
              Tilbake
            </button>
            
            <button
              type="submit"
              disabled={processing || !stripe || !elements}
              className="flex-1 px-6 py-4 organic-border bg-gradient-to-r from-sage to-sage/80 hover:from-sage/80 hover:to-sage text-white font-medium disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <HiArrowPath className="w-5 h-5 animate-spin" />
                  Behandler Betaling...
                </>
              ) : (
                <>
                  <HiCreditCard className="w-5 h-5" />
                  Betal {amount} NOK
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const CheckoutForm: React.FC<CheckoutFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner {...props} />
    </Elements>
  );
};

export default CheckoutForm;