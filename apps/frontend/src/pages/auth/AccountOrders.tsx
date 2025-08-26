import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'completed' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
  };
  trackingNumber?: string;
}

const AccountOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'shipped' | 'processing'>('all');

  // Mock order data
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'HK-2024-0523',
        date: '28. januar 2024',
        status: 'shipped',
        total: 1001,
        trackingNumber: '123456789012',
        items: [
          { id: '1', name: 'Omega-3 Premium', quantity: 2, price: 598 },
          { id: '2', name: 'Multivitamin', quantity: 1, price: 249 },
          { id: '3', name: 'Vitamin D3', quantity: 1, price: 199 }
        ],
        shippingAddress: {
          name: 'Kari Nordmann',
          address: 'Storgata 123',
          city: '0123 Oslo'
        }
      },
      {
        id: '2',
        orderNumber: 'HK-2024-0487',
        date: '15. januar 2024',
        status: 'completed',
        total: 756,
        items: [
          { id: '4', name: 'Magnesium', quantity: 1, price: 249 },
          { id: '5', name: 'B-Vitamin Kompleks', quantity: 2, price: 458 }
        ],
        shippingAddress: {
          name: 'Kari Nordmann',
          address: 'Storgata 123',
          city: '0123 Oslo'
        }
      },
      {
        id: '3',
        orderNumber: 'HK-2024-0312',
        date: '3. januar 2024',
        status: 'processing',
        total: 1299,
        items: [
          { id: '6', name: 'Premium Helsepakke', quantity: 1, price: 1299 }
        ],
        shippingAddress: {
          name: 'Kari Nordmann',
          address: 'Storgata 123',
          city: '0123 Oslo'
        }
      }
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Levert';
      case 'shipped': return 'Sendt';
      case 'processing': return 'Behandles';
      case 'cancelled': return 'Kansellert';
      default: return 'Ukjent';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-stone_light rounded-xl w-1/3"></div>
            <div className="h-4 bg-stone_light rounded-lg w-2/3"></div>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-warm_white organic-border p-6 space-y-4">
                <div className="h-6 bg-stone_light rounded-lg w-1/4"></div>
                <div className="h-4 bg-stone_light rounded-lg w-1/2"></div>
                <div className="h-20 bg-stone_light rounded-xl"></div>
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
            <span className="text-charcoal font-medium">Mine ordrer</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Mine ordrer
          </h1>
          <p className="text-charcoal/70 leading-relaxed">
            Oversikt over alle dine bestillinger og deres status
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Alle ordrer', count: orders.length },
              { key: 'processing', label: 'Behandles', count: orders.filter(o => o.status === 'processing').length },
              { key: 'shipped', label: 'Sendt', count: orders.filter(o => o.status === 'shipped').length },
              { key: 'completed', label: 'Levert', count: orders.filter(o => o.status === 'completed').length }
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

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-warm_white organic-border minimal-shadow p-12 text-center">
            <div className="w-20 h-20 bg-stone_light rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-4">
              Ingen ordrer funnet
            </h3>
            <p className="text-charcoal/70 mb-6">
              {filter === 'all' 
                ? 'Du har ikke lagt inn noen bestillinger ennå.'
                : `Du har ingen ordrer med status "${getStatusText(filter)}".`
              }
            </p>
            <Link to="/produkter" className="btn-organic">
              Se våre produkter
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-warm_white organic-border minimal-shadow p-8">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-charcoal">
                        Ordre #{order.orderNumber}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="text-charcoal/60 text-sm">
                      Bestilt {order.date}
                    </p>
                    {order.trackingNumber && (
                      <p className="text-charcoal/60 text-sm">
                        Sporingsnummer: <code className="bg-charcoal/10 px-1 py-0.5 rounded text-xs">{order.trackingNumber}</code>
                      </p>
                    )}
                  </div>
                  <div className="text-right mt-4 sm:mt-0">
                    <p className="text-2xl font-bold text-charcoal">
                      {order.total.toLocaleString()} kr
                    </p>
                    <p className="text-charcoal/60 text-sm">
                      {order.items.length} {order.items.length === 1 ? 'produkt' : 'produkter'}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-stone_light pt-6 mb-6">
                  <div className="grid gap-4">
                    {order.items.map((item, index) => (
                      <div key={item.id} className={`flex items-center gap-4 ${index > 0 ? 'border-t border-stone_light/50 pt-4' : ''}`}>
                        <div className="w-16 h-16 bg-gradient-to-br from-stone_light/50 to-sage/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-sage text-xl">📦</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-charcoal truncate">{item.name}</h4>
                          <p className="text-charcoal/60 text-sm">Antall: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-charcoal">{item.price.toLocaleString()} kr</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-start">
                  <div className="text-sm text-charcoal/60">
                    Leveres til: {order.shippingAddress.name}, {order.shippingAddress.address}, {order.shippingAddress.city}
                  </div>
                  <div className="flex gap-3">
                    <Link 
                      to={`/ordre/${order.orderNumber.replace('HK-', '')}`}
                      className="btn-ghost text-sm px-4 py-2"
                    >
                      Se detaljer
                    </Link>
                    {order.status === 'completed' && (
                      <button className="btn-organic text-sm px-4 py-2">
                        Kjøp igjen
                      </button>
                    )}
                    {order.trackingNumber && (
                      <button className="bg-blue-500 hover:bg-blue-600 text-warm_white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                        Spor pakke
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-sage/10 to-terracotta/10 organic-border p-8">
          <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
            <span className="text-xl">💬</span>
            Trenger du hjelp med en ordre?
          </h3>
          <p className="text-charcoal/70 mb-6 leading-relaxed">
            Hvis du har spørsmål om leveringstid, endringer eller problemer med en bestilling, 
            er vårt kundeservice-team klart til å hjelpe deg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/kontakt" className="btn-organic">
              Kontakt kundeservice
            </Link>
            <Link to="/faq" className="btn-ghost">
              Se vanlige spørsmål
            </Link>
            <Link to="/ekspertrad" className="btn-ghost">
              Chat med spesialist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOrders;