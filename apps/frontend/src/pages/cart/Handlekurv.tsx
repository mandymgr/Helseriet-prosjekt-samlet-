import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { cartService } from '../../services/api';
import type { CartItem as ApiCartItem } from '../../services/api';
import { COPY } from '../../utils/copy';
// import { LoadingState, EmptyState, ErrorState } from '../../components/ui';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  isSubscription?: boolean;
  isBundle?: boolean;
  selected: boolean;
  productId: string;
  stock: number;
}

const Handlekurv: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState(true);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.get();
      
      if (response.success && response.data) {
        const apiItems = response.data.items || [];
        const formattedItems: CartItem[] = apiItems.map((item: ApiCartItem) => ({
          id: item.id,
          productId: item.productId,
          name: item.product?.name || 'Unknown Product',
          price: Number(item.product?.price || 0),
          originalPrice: item.product?.comparePrice ? Number(item.product.comparePrice) : undefined,
          quantity: item.quantity,
          image: item.product?.images?.[0]?.url || '/placeholder-product.jpg',
          stock: item.product?.quantity || 0,
          selected: true,
          isSubscription: false, // TODO: Add subscription logic
          isBundle: false // TODO: Add bundle logic
        }));
        
        setCartItems(formattedItems);
      }
      setError(null);
    } catch (err: any) {
      setError(COPY.errors.cart_error);
      console.error('Error loading cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      loadCart();
    } else {
      setLoading(false);
      setError(COPY.errors.session_expired);
    }
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => item.selected ? sum + (item.price * item.quantity) : sum, 0);
  const shippingThreshold = 1500;
  const shippingProgress = Math.min((subtotal / shippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(shippingThreshold - subtotal, 0);

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await cartService.updateItem(id, newQuantity);
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Feil ved oppdatering av antall');
    }
  };

  const toggleItemSelection = (id: string) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(items => 
      items.map(item => ({ ...item, selected: newSelectAll }))
    );
  };

  const removeSelected = async () => {
    const selectedItems = cartItems.filter(item => item.selected);
    
    try {
      await Promise.all(
        selectedItems.map(item => cartService.removeItem(item.id))
      );
      setCartItems(items => items.filter(item => !item.selected));
    } catch (error) {
      console.error('Error removing items:', error);
      alert('Feil ved fjerning av produkter');
    }
  };

  // const removeItem = async (itemId: string) => {
  //   try {
  //     await cartService.removeItem(itemId);
  //     setCartItems(items => items.filter(item => item.id !== itemId));
  //   } catch (error) {
  //     console.error('Error removing item:', error);
  //     alert('Feil ved fjerning av produkt');
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/5 to-sage_light/10 pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-light text-charcoal mb-8">Handlekurv</h1>
        
        {loading && (
          <div className="text-center py-12">
            <div className="text-gray-500">Laster handlekurv...</div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-8">
            {error}
            {error.includes('innlogget') && (
              <Link to="/logg-inn" className="block mt-2 text-sage hover:text-sage_dark">
                Logg inn her
              </Link>
            )}
          </div>
        )}
        
        {!loading && !error && cartItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-2xl mb-4">🛒</div>
            <div className="text-xl font-light text-charcoal mb-4">Din handlekurv er tom</div>
            <Link 
              to="/produkter" 
              className="inline-block bg-sage hover:bg-sage_dark text-white px-6 py-3 rounded-2xl transition-colors"
            >
              Utforsk produkter
            </Link>
          </div>
        )}
        
        {!loading && !error && cartItems.length > 0 && (
          <div>
        {/* Cart Header with Bulk Actions */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="select-all" 
                className="w-5 h-5 rounded border-sage/20 text-sage focus:ring-sage"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium text-charcoal cursor-pointer">
                Velg alle
              </label>
            </div>
            <button 
              className="px-4 py-2 text-sm font-medium text-charcoal hover:text-sage_dark border border-sage/20 rounded-2xl hover:bg-sage/5 transition-all duration-200"
              onClick={removeSelected}
            >
              Fjern valgte
            </button>
            <button className="px-4 py-2 text-sm font-medium text-charcoal hover:text-sage_dark border border-sage/20 rounded-2xl hover:bg-sage/5 transition-all duration-200">
              Lagre for senere
            </button>
          </div>
          <div className="text-sm text-charcoal_light">
            <span className="font-medium text-charcoal">{totalItems} produkter</span> i handlekurven
          </div>
        </div>
        
        {/* Free Shipping Progress */}
        <div className="bg-white rounded-3xl shadow-lg border border-sage/10 p-6 mb-8 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-charcoal">Fremgang mot gratis frakt</span>
            <span className="text-sm font-medium text-charcoal">{subtotal} kr / {shippingThreshold} kr</span>
          </div>
          <div className="w-full h-3 bg-sage/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sage to-sage_dark transition-all duration-500"
              style={{ width: `${shippingProgress}%` }}
            ></div>
          </div>
          {remainingForFreeShipping > 0 ? (
            <p className="text-sm text-charcoal_light mt-3">
              Legg til produkter for <span className="font-semibold text-sage">{remainingForFreeShipping} kr</span> til for gratis frakt!
            </p>
          ) : (
            <p className="text-sm text-sage mt-3 font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Du har kvalifisert for gratis frakt!
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl shadow-lg border border-sage/10 p-6 backdrop-blur-sm">
                  <div className="flex items-start gap-6">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-sage/20 text-sage focus:ring-sage mt-2"
                      checked={item.selected}
                      onChange={() => toggleItemSelection(item.id)}
                    />
                    
                    <div className="w-24 h-24 bg-gradient-to-br from-sage/5 to-sage_light/10 rounded-2xl flex items-center justify-center overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = '<div class="text-sage text-2xl">📦</div>';
                        }}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-lg text-charcoal mb-2 flex items-center gap-2">
                            {item.name}
                            {item.isSubscription && (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-sage rounded-full">
                                ABONNEMENT
                              </span>
                            )}
                            {item.isBundle && (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-charcoal bg-sage_light rounded-full">
                                PAKKE
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-semibold text-charcoal">{item.price} kr</span>
                            {item.originalPrice && (
                              <span className="text-charcoal_light line-through">{item.originalPrice} kr</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-lg text-charcoal">
                            {item.price * item.quantity} kr
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button 
                            className="w-8 h-8 border border-sage/20 rounded-xl flex items-center justify-center hover:bg-sage/5 transition-colors duration-200 text-charcoal"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                            </svg>
                          </button>
                          <input 
                            type="number" 
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 text-center border border-sage/20 rounded-xl px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                            min="1"
                          />
                          <button 
                            className="w-8 h-8 border border-sage/20 rounded-xl flex items-center justify-center hover:bg-sage/5 transition-colors duration-200 text-charcoal"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                            </svg>
                          </button>
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="px-3 py-2 text-sm font-medium text-charcoal hover:text-sage_dark border border-sage/20 rounded-xl hover:bg-sage/5 transition-all duration-200">
                            Lagre for senere
                          </button>
                          <button 
                            className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 rounded-xl hover:bg-red-50 transition-all duration-200"
                            onClick={() => setCartItems(items => items.filter(i => i.id !== item.id))}
                          >
                            Fjern
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8">
              <Link to="/produkter" className="inline-flex items-center px-6 py-3 text-sm font-medium text-charcoal hover:text-sage_dark border border-sage/20 rounded-2xl hover:bg-sage/5 transition-all duration-200">
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Fortsett å handle
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-sage/10 p-6 backdrop-blur-sm sticky top-32">
              <h2 className="text-xl font-medium text-charcoal mb-6">Sammendrag</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-charcoal_light">Subtotal ({totalItems} produkter)</span>
                  <span className="font-medium text-charcoal">{subtotal} kr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal_light">Frakt</span>
                  <span className="font-medium text-charcoal">
                    {subtotal >= shippingThreshold ? 'Gratis' : '49 kr'}
                  </span>
                </div>
                <hr className="border-sage/10" />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-charcoal">Total</span>
                  <span className="font-semibold text-charcoal">
                    {subtotal + (subtotal >= shippingThreshold ? 0 : 49)} kr
                  </span>
                </div>
              </div>

              {/* Discount Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Rabattkode
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Skriv inn kode"
                    className="flex-1 px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal placeholder-charcoal_light/50"
                  />
                  <button className="px-4 py-3 text-sm font-medium text-charcoal hover:text-sage_dark border border-sage/20 rounded-2xl hover:bg-sage/5 transition-all duration-200">
                    Bruk
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link 
                to="/kasse" 
                className="w-full bg-sage hover:bg-sage_dark text-white font-medium py-4 px-6 rounded-2xl transition-all duration-200 micro-interaction text-center block mb-6"
              >
                Gå til kasse
              </Link>

              {/* Trust Signals */}
              <div className="space-y-3 text-sm text-charcoal_light">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sage flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>Sikker betaling med SSL</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sage flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1s1 .45 1 1v2h4V2c0-.55.45-1 1-1s1 .45 1 1v2h5c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h3z"/>
                  </svg>
                  <span>Gratis frakt over 1500 kr</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sage flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18z"/>
                  </svg>
                  <span>30 dagers returrett</span>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Handlekurv;