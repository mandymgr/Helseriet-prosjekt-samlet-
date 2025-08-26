import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { HiOutlinePause, HiOutlinePlay, HiOutlineCog6Tooth, HiOutlineXMark } from 'react-icons/hi2';

interface SubscriptionItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Subscription {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'cancelled';
  frequency: 'monthly' | 'bimonthly' | 'quarterly';
  price: number;
  originalPrice: number;
  discount: number;
  nextDelivery: string;
  startDate: string;
  items: SubscriptionItem[];
  totalDeliveries: number;
}

const AccountSubscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');

  // Mock subscription data
  useEffect(() => {
    const mockSubscriptions: Subscription[] = [
      {
        id: '1',
        name: 'Premium Helsepakke',
        status: 'active',
        frequency: 'monthly',
        price: 1519,
        originalPrice: 1899,
        discount: 20,
        nextDelivery: '15. september 2025',
        startDate: '15. januar 2024',
        totalDeliveries: 8,
        items: [
          { id: '1', name: 'Omega-3 Premium', quantity: 1, price: 449 },
          { id: '2', name: 'Multivitamin', quantity: 1, price: 249 },
          { id: '3', name: 'Vitamin D3 + K2', quantity: 1, price: 329 },
          { id: '4', name: 'Probiotika Premium', quantity: 1, price: 399 },
          { id: '5', name: 'Magnesium', quantity: 1, price: 279 }
        ]
      },
      {
        id: '2',
        name: 'Immunforsvar Pakke',
        status: 'paused',
        frequency: 'bimonthly',
        price: 637,
        originalPrice: 797,
        discount: 20,
        nextDelivery: 'Pause til 1. oktober 2025',
        startDate: '10. mars 2024',
        totalDeliveries: 3,
        items: [
          { id: '6', name: 'Vitamin C', quantity: 2, price: 299 },
          { id: '7', name: 'Sink', quantity: 1, price: 199 },
          { id: '8', name: 'Echinacea', quantity: 1, price: 299 }
        ]
      },
      {
        id: '3',
        name: 'Søvn & Avslapning',
        status: 'cancelled',
        frequency: 'monthly',
        price: 517,
        originalPrice: 647,
        discount: 20,
        nextDelivery: 'Kansellert 5. august 2025',
        startDate: '20. mai 2024',
        totalDeliveries: 2,
        items: [
          { id: '9', name: 'Magnesium Glycinate', quantity: 1, price: 279 },
          { id: '10', name: 'L-Teanin', quantity: 1, price: 249 },
          { id: '11', name: 'Melatonin', quantity: 1, price: 119 }
        ]
      }
    ];

    setTimeout(() => {
      setSubscriptions(mockSubscriptions);
      setLoading(false);
    }, 900);
  }, []);

  const filteredSubscriptions = filter === 'all' 
    ? subscriptions 
    : subscriptions.filter(sub => sub.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'paused': return 'Pausert';
      case 'cancelled': return 'Kansellert';
      default: return 'Ukjent';
    }
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'monthly': return 'Månedlig';
      case 'bimonthly': return 'Annenhver måned';
      case 'quarterly': return 'Kvartalsvis';
      default: return frequency;
    }
  };

  const pauseSubscription = (id: string) => {
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id 
          ? { ...sub, status: 'paused' as const, nextDelivery: 'Pausert' }
          : sub
      )
    );
  };

  const resumeSubscription = (id: string) => {
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id 
          ? { ...sub, status: 'active' as const, nextDelivery: '15. oktober 2025' }
          : sub
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-stone_light rounded-xl w-1/3"></div>
            <div className="h-4 bg-stone_light rounded-lg w-2/3"></div>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-warm_white organic-border p-8 space-y-4">
                <div className="h-6 bg-stone_light rounded-lg w-1/4"></div>
                <div className="h-4 bg-stone_light rounded-lg w-1/2"></div>
                <div className="h-24 bg-stone_light rounded-xl"></div>
                <div className="h-10 bg-stone_light rounded-xl w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <div className="flex items-center space-x-2 text-charcoal/60">
            <Link to="/" className="hover:text-sage transition-colors">Hjem</Link>
            <span>/</span>
            <Link to="/account" className="hover:text-sage transition-colors">Min konto</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">Abonnementer</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Mine abonnementer
          </h1>
          <p className="text-charcoal/70 leading-relaxed">
            Administrer dine abonnementer, endre leveringsfrekvens eller pause når du ønsker
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Alle abonnementer', count: subscriptions.length },
              { key: 'active', label: 'Aktive', count: subscriptions.filter(s => s.status === 'active').length },
              { key: 'paused', label: 'Pausert', count: subscriptions.filter(s => s.status === 'paused').length }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${filter === key
                    ? 'bg-gradient-to-r from-sage to-sage_dark text-warm_white shadow-md'
                    : 'bg-stone_light/50 text-charcoal hover:bg-sage/20'
                  }
                `}
              >
                {label}
                <span className={`
                  px-2 py-0.5 rounded-full text-xs
                  ${filter === key ? 'bg-warm_white/20' : 'bg-charcoal/10'}
                `}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Subscriptions List */}
        {filteredSubscriptions.length === 0 ? (
          <div className="bg-warm_white organic-border minimal-shadow p-12 text-center">
            <div className="w-20 h-20 bg-stone_light rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-4">
              Ingen abonnementer funnet
            </h3>
            <p className="text-charcoal/70 mb-6">
              {filter === 'all' 
                ? 'Du har ikke opprettet noen abonnementer ennå.'
                : `Du har ingen ${filter === 'active' ? 'aktive' : 'pauserte'} abonnementer.`
              }
            </p>
            <Link to="/kosttilskudd" className="btn-organic">
              Se våre pakketilbud
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredSubscriptions.map((subscription) => (
              <div key={subscription.id} className="bg-warm_white organic-border minimal-shadow p-8">
                {/* Subscription Header */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6 gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-2xl font-bold text-charcoal">
                        {subscription.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(subscription.status)}`}>
                        {getStatusText(subscription.status)}
                      </span>
                    </div>
                    <div className="text-charcoal/70 space-y-1">
                      <p>Levering: {getFrequencyText(subscription.frequency)}</p>
                      <p>Neste: {subscription.nextDelivery}</p>
                      <p>Opprettet: {subscription.startDate} • {subscription.totalDeliveries} leveringer</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-charcoal">
                        {subscription.price.toLocaleString()} kr
                      </span>
                      {subscription.originalPrice > subscription.price && (
                        <div className="text-right">
                          <div className="text-charcoal/50 line-through text-lg">
                            {subscription.originalPrice.toLocaleString()} kr
                          </div>
                          <div className="text-green-600 text-sm font-medium">
                            Spar {subscription.discount}%
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-charcoal/60 text-sm">per {subscription.frequency === 'monthly' ? 'måned' : 'levering'}</p>
                  </div>
                </div>

                {/* Subscription Items */}
                <div className="bg-gradient-to-r from-stone_light/30 to-sage/10 organic-border p-6 mb-6">
                  <h4 className="font-semibold text-charcoal mb-4">Innhold i abonnementet</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {subscription.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-warm_white/80 rounded-xl p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-sage/20 to-terracotta/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-xs">📦</span>
                          </div>
                          <div>
                            <p className="font-medium text-charcoal text-sm">{item.name}</p>
                            <p className="text-charcoal/60 text-xs">Antall: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium text-charcoal text-sm">
                          {item.price.toLocaleString()} kr
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {subscription.status === 'active' && (
                    <>
                      <button
                        onClick={() => pauseSubscription(subscription.id)}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-warm_white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <HiOutlinePause className="w-4 h-4" />
                        Pause abonnement
                      </button>
                      <button className="flex-1 btn-ghost flex items-center justify-center gap-2">
                        <HiOutlineCog6Tooth className="w-4 h-4" />
                        Endre abonnement
                      </button>
                    </>
                  )}
                  
                  {subscription.status === 'paused' && (
                    <>
                      <button
                        onClick={() => resumeSubscription(subscription.id)}
                        className="flex-1 btn-organic flex items-center justify-center gap-2"
                      >
                        <HiOutlinePlay className="w-4 h-4" />
                        Gjenoppta abonnement
                      </button>
                      <button className="flex-1 btn-ghost flex items-center justify-center gap-2">
                        <HiOutlineCog6Tooth className="w-4 h-4" />
                        Endre abonnement
                      </button>
                    </>
                  )}

                  {subscription.status !== 'cancelled' && (
                    <Link
                      to="/avbestilling"
                      className="flex-1 bg-red-500 hover:bg-red-600 text-warm_white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <HiOutlineXMark className="w-4 h-4" />
                      Avbestill
                    </Link>
                  )}

                  <Link
                    to={`/ordre/${subscription.id}`}
                    className="bg-stone_light hover:bg-stone_light/80 text-charcoal py-3 px-6 rounded-xl font-medium transition-colors"
                  >
                    Se detaljer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-12 bg-gradient-to-r from-sage/10 to-terracotta/10 organic-border p-8">
          <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
            <span className="text-xl">🎁</span>
            Fordeler med abonnement
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💰</span>
              </div>
              <h4 className="font-medium text-charcoal mb-2">20% rabatt</h4>
              <p className="text-charcoal/70 text-sm">Fast rabatt på alle produkter</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🚚</span>
              </div>
              <h4 className="font-medium text-charcoal mb-2">Gratis frakt</h4>
              <p className="text-charcoal/70 text-sm">Alltid gratis levering hjem</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⏸️</span>
              </div>
              <h4 className="font-medium text-charcoal mb-2">Full fleksibilitet</h4>
              <p className="text-charcoal/70 text-sm">Pause, endre eller avbestill når du vil</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/kosttilskudd" className="btn-organic">
              Opprett nytt abonnement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSubscriptions;