import React from 'react';
import { Link, useParams } from 'react-router';

const OrdreDetaljer: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock order data - in real app this would come from API
  const orderData = {
    id: id || 'HK-2024-0523',
    date: '28. januar 2024, 14:32',
    status: 'shipped',
    trackingNumber: '123456789012',
    items: [
      {
        id: 1,
        name: 'Omega-3 Premium',
        description: '180 kapsler - Høykonsentrert',
        sku: 'HK-OM3-180',
        quantity: 2,
        price: 598
      },
      {
        id: 2,
        name: 'Multivitamin',
        description: '90 tabletter - Komplett formula',
        sku: 'HK-MV-90',
        quantity: 1,
        price: 249
      },
      {
        id: 3,
        name: 'Vitamin D3',
        description: '100 kapsler - 50μg',
        sku: 'HK-D3-100',
        quantity: 1,
        price: 199
      }
    ],
    shipping: {
      name: 'Kari Nordmann',
      address: 'Storgata 123',
      city: '0123 Oslo',
      country: 'Norge',
      phone: '+47 123 45 678',
      email: 'kari.nordmann@epost.no'
    },
    summary: {
      subtotal: 1046,
      shipping: 59,
      discount: 104,
      total: 1001,
      paymentMethod: 'Visa ****1234',
      discountCode: 'HELSE10'
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shipped': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'shipped': return 'Sendt';
      case 'processing': return 'Behandles';
      case 'delivered': return 'Levert';
      default: return 'Ukjent';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <div className="flex items-center space-x-2 text-charcoal/60">
            <Link to="/" className="hover:text-sage transition-colors">Hjem</Link>
            <span>/</span>
            <Link to="/account" className="hover:text-sage transition-colors">Min konto</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">Ordre #{orderData.id}</span>
          </div>
        </nav>

        {/* Order Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Ordredetaljer
          </h1>
          <div className="flex flex-wrap gap-6 items-center">
            <div>
              <span className="text-charcoal/70">Ordrenummer:</span>
              <span className="font-bold text-xl ml-2">#{orderData.id}</span>
            </div>
            <div>
              <span className="text-charcoal/70">Bestilt:</span>
              <span className="font-medium ml-2">{orderData.date}</span>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(orderData.status)}`}>
              {getStatusText(orderData.status)}
            </div>
          </div>
        </div>

        {/* Order Status Tracker */}
        <div className="bg-warm_white organic-border minimal-shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Ordrestatus</h2>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-stone_light"></div>
            <div className="absolute top-5 left-0 w-2/3 h-1 bg-gradient-to-r from-sage to-terracotta"></div>
            
            <div className="relative flex justify-between">
              {/* Step 1: Order Placed */}
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-sage to-sage_dark rounded-full flex items-center justify-center text-warm_white font-bold mb-2 shadow-md">
                  ✓
                </div>
                <p className="text-sm font-medium text-charcoal">Ordre mottatt</p>
                <p className="text-xs text-charcoal/60">28. jan 14:32</p>
              </div>
              
              {/* Step 2: Processing */}
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-sage to-sage_dark rounded-full flex items-center justify-center text-warm_white font-bold mb-2 shadow-md">
                  ✓
                </div>
                <p className="text-sm font-medium text-charcoal">Behandles</p>
                <p className="text-xs text-charcoal/60">28. jan 15:45</p>
              </div>
              
              {/* Step 3: Shipped */}
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-terracotta to-terracotta/80 rounded-full flex items-center justify-center text-warm_white font-bold mb-2 shadow-md">
                  ✓
                </div>
                <p className="text-sm font-medium text-charcoal">Sendt</p>
                <p className="text-xs text-charcoal/60">29. jan 09:00</p>
              </div>
              
              {/* Step 4: Delivered */}
              <div className="text-center">
                <div className="w-10 h-10 bg-stone_light rounded-full flex items-center justify-center text-charcoal/50 font-bold mb-2">
                  4
                </div>
                <p className="text-sm font-medium text-charcoal/60">Levert</p>
                <p className="text-xs text-charcoal/50">Estimert 31. jan</p>
              </div>
            </div>
          </div>
          
          {/* Tracking Info */}
          <div className="mt-8 bg-gradient-to-r from-sage/10 to-terracotta/10 organic-border p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-medium text-charcoal">Sporingsnummer: {orderData.trackingNumber}</p>
                <p className="text-sm text-charcoal/70">Fraktselskap: Posten Norge</p>
              </div>
              <a 
                href="#" 
                className="btn-organic flex items-center gap-2"
              >
                📦 Spor pakke
              </a>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <div className="bg-warm_white organic-border minimal-shadow p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6">Ordreinnhold</h2>
              
              <div className="space-y-6">
                {orderData.items.map((item, index) => (
                  <div key={item.id} className={`flex gap-4 ${index < orderData.items.length - 1 ? 'pb-6 border-b border-stone_light' : ''}`}>
                    <div className="w-24 h-24 bg-gradient-to-br from-stone_light to-sage/20 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <span className="text-sage text-2xl">📦</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-charcoal text-lg">{item.name}</h3>
                      <p className="text-charcoal/70 mb-1">{item.description}</p>
                      <p className="text-sm text-charcoal/60 mb-3">Varenummer: {item.sku}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-charcoal/70">Antall: <span className="font-medium text-charcoal">{item.quantity}</span></p>
                        <p className="font-bold text-lg text-charcoal">{item.price} kr</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-warm_white organic-border minimal-shadow p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6">Leveringsadresse</h2>
              <div className="text-charcoal/80 space-y-1">
                <p className="font-semibold text-charcoal text-lg">{orderData.shipping.name}</p>
                <p>{orderData.shipping.address}</p>
                <p>{orderData.shipping.city}</p>
                <p>{orderData.shipping.country}</p>
                <div className="pt-4 space-y-1">
                  <p><span className="text-charcoal/60">Telefon:</span> {orderData.shipping.phone}</p>
                  <p><span className="text-charcoal/60">E-post:</span> {orderData.shipping.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Price Summary */}
            <div className="bg-gradient-to-br from-stone_light/50 to-sage/10 organic-border p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6">Ordresammendrag</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-charcoal/80">
                  <span>Delsum</span>
                  <span>{orderData.summary.subtotal} kr</span>
                </div>
                <div className="flex justify-between text-charcoal/80">
                  <span>Frakt (Standard)</span>
                  <span>{orderData.summary.shipping} kr</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Rabatt ({orderData.summary.discountCode})</span>
                  <span>-{orderData.summary.discount} kr</span>
                </div>
                <div className="border-t border-stone_light pt-3 flex justify-between font-bold text-xl text-charcoal">
                  <span>Totalt betalt</span>
                  <span>{orderData.summary.total} kr</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-stone_light">
                <p className="text-charcoal/60 mb-1">Betalingsmetode</p>
                <p className="font-medium text-charcoal">{orderData.summary.paymentMethod}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button className="w-full btn-organic">
                📄 Last ned faktura (PDF)
              </button>
              
              <button className="w-full btn-ghost">
                🖨️ Skriv ut ordredetaljer
              </button>
              
              <Link 
                to="/account" 
                className="block w-full text-center py-3 text-charcoal/70 hover:text-sage transition-colors"
              >
                ← Tilbake til mine ordrer
              </Link>
            </div>

            {/* Customer Service */}
            <div className="bg-gradient-to-r from-terracotta/10 to-sage/10 organic-border p-6">
              <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                <span className="text-xl">💬</span> Trenger du hjelp?
              </h3>
              <p className="text-sm text-charcoal/70 mb-4 leading-relaxed">
                Vårt kundeservice-team er her for deg.
              </p>
              <Link 
                to="/kontakt" 
                className="text-sage hover:text-sage_dark font-medium inline-flex items-center gap-2 transition-colors"
              >
                Kontakt kundeservice →
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-warm_white organic-border minimal-shadow p-8">
            <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-3">
              <span className="text-2xl">🚚</span> 
              <span className="text-xl">Leveringsinformasjon</span>
            </h3>
            <p className="text-charcoal/70 mb-3 leading-relaxed">
              Din pakke leveres med Posten Norge. Du vil motta SMS-varsling 
              når pakken er klar for levering.
            </p>
            <p className="text-charcoal/70 leading-relaxed">
              Estimert leveringstid: 2-4 virkedager
            </p>
          </div>
          
          <div className="bg-warm_white organic-border minimal-shadow p-8">
            <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-3">
              <span className="text-2xl">↩️</span>
              <span className="text-xl">Retur og bytte</span>
            </h3>
            <p className="text-charcoal/70 mb-4 leading-relaxed">
              Du har 30 dagers åpent kjøp på alle produkter. Uåpnede 
              produkter kan returneres for full refusjon.
            </p>
            <Link 
              to="/retur" 
              className="text-sage hover:text-sage_dark font-medium inline-flex items-center gap-2 transition-colors"
            >
              Les mer om retur →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdreDetaljer;