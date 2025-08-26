import React, { useState } from 'react';
import { Link } from 'react-router';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface OrderDetails {
  orderNumber: string;
  estimatedDelivery: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customer: {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    email: string;
    phone: string;
  };
  payment: {
    method: string;
    lastFour: string;
    transactionId: string;
  };
}

const Ordrebekreftelse: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Sample order data - in real app this would come from URL params or API
  const orderDetails: OrderDetails = {
    orderNumber: '#HR-2024-0523',
    estimatedDelivery: 'Tirsdag 30. januar - Torsdag 1. februar',
    items: [
      { id: 1, name: 'Omega-3 Premium', price: 299, quantity: 2, total: 598 },
      { id: 2, name: 'Multivitamin', price: 249, quantity: 1, total: 249 },
      { id: 3, name: 'Vitamin D3', price: 199, quantity: 1, total: 199 }
    ],
    subtotal: 1046,
    shipping: 59,
    discount: -104,
    total: 1001,
    customer: {
      name: 'Kari Nordmann',
      address: 'Storgata 123',
      postalCode: '0123',
      city: 'Oslo',
      country: 'Norge',
      email: 'kari.nordmann@epost.no',
      phone: '+47 123 45 678'
    },
    payment: {
      method: 'Visa',
      lastFour: '1234',
      transactionId: 'TRX-2024-0523-1234'
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Newsletter subscription:', email);
    setIsSubscribing(false);
    setEmail('');
    alert('Takk! Du er nå påmeldt vårt nyhetsbrev.');
  };

  const steps = [
    {
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      title: 'Ordrebekreftelse sendt',
      description: 'Du vil motta en e-post med alle ordredetaljer'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
      ),
      title: 'Pakking og sending',
      description: 'Vi pakker din ordre og sender den innen 1-2 virkedager'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
        </svg>
      ),
      title: 'Sporingsinformasjon',
      description: 'Du får sporingsnummer når pakken er sendt'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      <section>
        <div className="max-w-4xl mx-auto px-6">
          {/* Success Message */}
          <div className="text-center mb-16">
            <div className="w-32 h-32 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-16 h-16 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Takk for din bestilling!
            </h1>
            <p className="text-xl text-charcoal/70 leading-relaxed">
              Vi har mottatt din ordre og sender deg en bekreftelse på e-post.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white minimal-shadow organic-border p-8 mb-8 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-charcoal mb-3">Ordrenummer</h3>
                <p className="text-3xl font-light text-sage" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  {orderDetails.orderNumber}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-charcoal mb-3">Estimert levering</h3>
                <p className="text-lg text-charcoal/70">{orderDetails.estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white minimal-shadow organic-border p-8 mb-8 backdrop-blur-sm">
            <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Ordresammendrag
            </h2>
            
            {/* Products */}
            <div className="space-y-6 mb-8">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex items-center gap-6 pb-6 border-b border-sage/10">
                  <div className="w-20 h-20 bg-sage/10 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-charcoal mb-1">{item.name}</h3>
                    <p className="text-charcoal/70">{item.quantity} stk × {item.price} kr</p>
                  </div>
                  <p className="text-lg font-medium text-charcoal">{item.total} kr</p>
                </div>
              ))}
            </div>
            
            {/* Price Summary */}
            <div className="bg-stone_light/30 rounded-2xl p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-charcoal/70">Delsum</span>
                <span className="text-charcoal">{orderDetails.subtotal} kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70">Frakt (Standard)</span>
                <span className="text-charcoal">{orderDetails.shipping} kr</span>
              </div>
              <div className="flex justify-between text-sage">
                <span>Rabatt (HELSE10)</span>
                <span>{orderDetails.discount} kr</span>
              </div>
              <div className="border-t border-sage/10 pt-3 flex justify-between text-xl font-medium text-charcoal">
                <span>Totalt betalt</span>
                <span>{orderDetails.total} kr</span>
              </div>
            </div>
          </div>

          {/* Delivery and Payment Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Leveringsadresse
              </h3>
              <div className="space-y-2 text-charcoal/70">
                <p className="font-medium text-charcoal">{orderDetails.customer.name}</p>
                <p>{orderDetails.customer.address}</p>
                <p>{orderDetails.customer.postalCode} {orderDetails.customer.city}</p>
                <p>{orderDetails.customer.country}</p>
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span>{orderDetails.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <span>{orderDetails.customer.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Betalingsmetode
              </h3>
              <div className="space-y-4 text-charcoal/70">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                  <span>{orderDetails.payment.method} ****{orderDetails.payment.lastFour}</span>
                </div>
                <p className="font-medium text-charcoal">Betalt: {orderDetails.total} kr</p>
                <p className="text-sm text-charcoal/60">Transaksjons-ID: {orderDetails.payment.transactionId}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white minimal-shadow organic-border p-8 mb-12 backdrop-blur-sm">
            <h3 className="text-2xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Hva skjer nå?
            </h3>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-lg font-medium text-charcoal mb-2">{step.title}</p>
                    <p className="text-charcoal/70 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/min-konto" className="btn-organic flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Se mine ordrer
            </Link>
            <Link to="/" className="btn-ghost flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"/>
              </svg>
              Fortsett å handle
            </Link>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-sage/10 to-sage/5 border border-sage/20 rounded-2xl p-12 text-center backdrop-blur-sm">
            <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
              </svg>
            </div>
            <h3 className="text-2xl font-light text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Få 15% rabatt på din neste ordre!
            </h3>
            <p className="text-charcoal/70 mb-8 leading-relaxed">
              Meld deg på vårt nyhetsbrev og motta eksklusive tilbud og helsetips
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Din e-postadresse" 
                className="flex-1 px-4 py-3 border border-sage/20 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal placeholder-charcoal/50"
                required
              />
              <button 
                type="submit" 
                className="bg-sage text-warm_white px-6 py-3 rounded-r-2xl hover:bg-sage_dark transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Melder på...
                  </>
                ) : (
                  'Meld meg på'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ordrebekreftelse;