import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { cartService, orderService, type OrderRequest, type CartItem as ApiCartItem } from '../../services/api';
import { paymentService } from '../../services/payment';

interface DeliveryInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  company?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const Kasse: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    country: 'Norge',
    company: ''
  });

  const [selectedPayment, setSelectedPayment] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'vipps',
      name: 'Vipps',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
      ),
      description: 'Betal enkelt med Vipps'
    },
    {
      id: 'card',
      name: 'Kort',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
        </svg>
      ),
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'klarna',
      name: 'Klarna',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      ),
      description: 'Betal senere eller del opp'
    },
    {
      id: 'bankid',
      name: 'BankID',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      ),
      description: 'Direkte fra bankkonto'
    }
  ];

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 1500 ? 0 : 99;
  const total = subtotal + shipping;

  const steps = [
    { number: 1, name: 'Handlekurv', completed: true },
    { number: 2, name: 'Levering', completed: currentStep > 2, active: currentStep === 2 },
    { number: 3, name: 'Betaling', completed: currentStep > 3, active: currentStep === 3 }
  ];

  // Auto-save form data
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('checkoutFormData', JSON.stringify(deliveryInfo));
    }, 1000);
    return () => clearTimeout(timer);
  }, [deliveryInfo]);

  // Load cart data and saved form data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Check if user is logged in
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setError('Du må være innlogget for å gå til kassen');
          return;
        }
        
        // Load cart data
        const cartResponse = await cartService.get();
        if (cartResponse.success && cartResponse.data) {
          const apiItems = cartResponse.data.items || [];
          const formattedItems = apiItems.map((item: ApiCartItem) => ({
            id: item.id,
            productId: item.productId,
            name: item.product?.name || 'Unknown Product',
            price: Number(item.product?.price || 0),
            quantity: item.quantity,
            total: Number(item.product?.price || 0) * item.quantity,
            image: item.product?.images?.[0]?.url || '/placeholder-product.jpg'
          }));
          setCartItems(formattedItems);
        }
        
        // Load saved form data
        const savedData = localStorage.getItem('checkoutFormData');
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            setDeliveryInfo(parsedData);
          } catch (error) {
            console.error('Error loading saved form data:', error);
          }
        }
        
        setError(null);
      } catch (err: any) {
        setError('Feil ved lasting av data');
        console.error('Error loading checkout data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateDeliveryInfo = () => {
    return deliveryInfo.firstName && 
           deliveryInfo.lastName && 
           deliveryInfo.email && 
           deliveryInfo.phone && 
           deliveryInfo.address && 
           deliveryInfo.postalCode && 
           deliveryInfo.city;
  };

  const handlePlaceOrder = async () => {
    if (!acceptTerms) {
      alert('Du må godta vilkårene for å fullføre bestillingen');
      return;
    }
    if (!selectedPayment) {
      alert('Velg en betalingsmetode');
      return;
    }
    
    if (cartItems.length === 0) {
      alert('Handlekurven er tom');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Step 1: Create order
      const orderData: OrderRequest = {
        billingAddress: {
          firstName: deliveryInfo.firstName,
          lastName: deliveryInfo.lastName,
          company: deliveryInfo.company || undefined,
          street: deliveryInfo.address,
          city: deliveryInfo.city,
          postalCode: deliveryInfo.postalCode,
          country: deliveryInfo.country
        },
        email: deliveryInfo.email,
        phone: deliveryInfo.phone,
        notes: `Betalingsmetode: ${selectedPayment}${newsletter ? ' | Nyhetsbrev: Ja' : ''}`
      };
      
      const orderResponse = await orderService.create(orderData);
      
      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Feil ved opprettelse av ordre');
      }

      const orderId = (orderResponse.data as any)?.orderId;
      const orderNumber = (orderResponse.data as any)?.orderNumber;
      
      if (!orderId) {
        throw new Error('Ordre ID ikke mottatt');
      }

      // Step 2: Create payment intent
      if (selectedPayment === 'vipps') {
        // For Vipps, redirect directly to confirmation since it's not implemented yet
        alert('Vipps-integrasjon kommer snart. Ordre er opprettet men ikke betalt.');
        localStorage.removeItem('checkoutFormData');
        navigate(`/ordrebekreftelse?order=${orderNumber || 'unknown'}`);
        return;
      }

      // For card/Stripe payments
      await paymentService.createPaymentIntent(orderId, selectedPayment);
      
      // For now, simulate successful payment since we don't have Stripe Elements setup
      // In a real implementation, you would use Stripe Elements here
      alert('Betalingsintegrasjon er implementert i backend. Frontend Stripe Elements kommer snart.');
      
      // Clear saved form data and navigate to confirmation
      localStorage.removeItem('checkoutFormData');
      navigate(`/ordrebekreftelse?order=${orderNumber || 'unknown'}`);
      
    } catch (error: any) {
      console.error('Error processing order:', error);
      alert(`Feil ved behandling av ordre: ${error.message || 'Ukjent feil'}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage mx-auto mb-4"></div>
              <div className="text-charcoal">Laster data...</div>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
            {error}
            {error.includes('innlogget') && (
              <Link to="/logg-inn" className="block mt-2 text-sage hover:text-sage_dark">
                Logg inn her
              </Link>
            )}
          </div>
        </div>
      )}
      
      {!loading && !error && cartItems.length === 0 && (
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl shadow-lg border border-sage/10 p-8">
            <div className="text-4xl mb-4">🛒</div>
            <h2 className="text-2xl font-light text-charcoal mb-4">Handlekurven er tom</h2>
            <Link to="/produkter" className="inline-block bg-sage hover:bg-sage_dark text-white px-6 py-3 rounded-2xl transition-colors">
              Utforsk produkter
            </Link>
          </div>
        </div>
      )}
      
      {!loading && !error && cartItems.length > 0 && (
        <div>
          {/* Checkout Steps */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                      step.completed 
                        ? 'bg-sage text-white' 
                        : step.active 
                          ? 'bg-sage text-white' 
                          : 'bg-stone text-charcoal/60'
                    }`}>
                      {step.completed ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className={`ml-3 text-sm font-medium ${
                      step.active || step.completed ? 'text-charcoal' : 'text-charcoal/60'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-6 rounded transition-colors duration-200 ${
                      step.completed ? 'bg-sage' : 'bg-stone'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 2: Delivery Information */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                    Leveringsinformasjon
                  </h2>
                  
                  <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Fornavn *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={deliveryInfo.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal placeholder-charcoal/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Etternavn *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={deliveryInfo.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal placeholder-charcoal/50"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Bedrift (valgfritt)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={deliveryInfo.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal placeholder-charcoal/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        E-postadresse *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={deliveryInfo.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal placeholder-charcoal/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Telefonnummer *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={deliveryInfo.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal placeholder-charcoal/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Adresse *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={deliveryInfo.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal placeholder-charcoal/50"
                        placeholder="Gate og husnummer"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Postnummer *
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={deliveryInfo.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal placeholder-charcoal/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Poststed *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={deliveryInfo.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal placeholder-charcoal/50"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Land *
                      </label>
                      <select
                        name="country"
                        value={deliveryInfo.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal"
                        required
                      >
                        <option value="Norge">Norge</option>
                        <option value="Sverige">Sverige</option>
                        <option value="Danmark">Danmark</option>
                      </select>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="pt-6 border-t border-sage/10">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newsletter}
                          onChange={(e) => setNewsletter(e.target.checked)}
                          className="mt-1 w-4 h-4 text-sage bg-gray-100 border-gray-300 rounded focus:ring-sage focus:ring-2"
                        />
                        <div>
                          <span className="text-sm text-charcoal font-medium">Meld meg på nyhetsbrevet</span>
                          <p className="text-xs text-charcoal/60">Få eksklusive tilbud og helsetips</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Link to="/handlekurv" className="btn-ghost flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                      </svg>
                      Tilbake til handlekurv
                    </Link>
                    
                    <button
                      onClick={handleNextStep}
                      disabled={!validateDeliveryInfo()}
                      className="btn-organic flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Fortsett til betaling
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                    Betaling
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Payment Methods */}
                    <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                      <h3 className="text-xl font-medium text-charcoal mb-6">Velg betalingsmetode</h3>
                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <label 
                            key={method.id} 
                            className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-200 hover:border-sage/40 ${
                              selectedPayment === method.id 
                                ? 'border-sage bg-sage/5' 
                                : 'border-sage/20'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={selectedPayment === method.id}
                              onChange={(e) => setSelectedPayment(e.target.value)}
                              className="sr-only"
                            />
                            <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mr-4">
                              {method.icon}
                            </div>
                            <div>
                              <div className="font-medium text-charcoal text-lg">{method.name}</div>
                              <div className="text-sm text-charcoal/70">{method.description}</div>
                            </div>
                            {selectedPayment === method.id && (
                              <div className="ml-auto">
                                <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                </svg>
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          className="mt-1 w-4 h-4 text-sage bg-gray-100 border-gray-300 rounded focus:ring-sage focus:ring-2"
                          required
                        />
                        <div>
                          <span className="text-sm text-charcoal">
                            Jeg godtar{' '}
                            <Link to="/vilkar" className="text-sage hover:text-sage_dark underline">
                              vilkårene og betingelsene
                            </Link>
                            {' '}og{' '}
                            <Link to="/personvern" className="text-sage hover:text-sage_dark underline">
                              personvernerklæringen
                            </Link>
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={handlePreviousStep}
                      className="btn-ghost flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                      </svg>
                      Tilbake
                    </button>
                    
                    <button
                      onClick={handlePlaceOrder}
                      disabled={!selectedPayment || !acceptTerms || submitting}
                      className="btn-organic px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {submitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"/>
                        </svg>
                      )}
                      {submitting ? 'Behandler...' : `Fullfør bestilling - ${total} kr`}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm sticky top-32">
                <h3 className="text-2xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  Ordresammendrag
                </h3>
                
                {/* Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-charcoal">{item.name}</h4>
                        <p className="text-sm text-charcoal/70">Antall: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-charcoal">{item.total} kr</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-sage/10 pt-4 space-y-3">
                  <div className="flex justify-between text-charcoal/70">
                    <span>Subtotal</span>
                    <span>{subtotal} kr</span>
                  </div>
                  <div className="flex justify-between text-charcoal/70">
                    <span>Frakt</span>
                    <span className={shipping === 0 ? 'text-sage font-medium' : ''}>
                      {shipping === 0 ? 'Gratis' : `${shipping} kr`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-sage">🎉 Du har fått gratis frakt!</p>
                  )}
                  <div className="flex justify-between text-xl font-medium text-charcoal pt-3 border-t border-sage/10">
                    <span>Total</span>
                    <span>{total} kr</span>
                  </div>
                </div>

                {/* Security */}
                <div className="mt-8 pt-6 border-t border-sage/10">
                  <div className="space-y-3 text-sm text-charcoal/70">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      <span>SSL-kryptert sikker betaling</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                      <span>30 dagers returrett</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                      </svg>
                      <span>Levering innen 2-4 virkedager</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
      )}
    </div>
  );
};

export default Kasse;