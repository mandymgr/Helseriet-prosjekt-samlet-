import React, { useState, useEffect } from 'react';
import { cartService, productService } from '../services/api';
import type { Cart, Product } from '../services/api';
import { HiShoppingCart, HiPlus, HiMinus, HiTrash, HiArrowPath, HiSparkles } from 'react-icons/hi2';

export const CartTest: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCart = async () => {
    setLoading(true);
    try {
      const response = await cartService.get();
      setCart(response.data || null);
      setError(null);
    } catch (err) {
      console.error('Failed to load cart:', err);
      setError('Kunne ikke laste handlekurv');
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getAll({ limit: 5 });
      setProducts(response.data?.products || []);
      setError(null);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Kunne ikke laste produkter');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string) => {
    setLoading(true);
    try {
      await cartService.addItem(productId, 1);
      await loadCart();
      setError(null);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      setError('Kunne ikke legge til i handlekurv');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    
    setLoading(true);
    try {
      await cartService.updateItem(productId, quantity);
      await loadCart();
      setError(null);
    } catch (err) {
      console.error('Failed to update quantity:', err);
      setError('Kunne ikke oppdatere antall');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setLoading(true);
    try {
      await cartService.removeItem(productId);
      await loadCart();
      setError(null);
    } catch (err) {
      console.error('Failed to remove from cart:', err);
      setError('Kunne ikke fjerne fra handlekurv');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await cartService.clear();
      await loadCart();
      setError(null);
    } catch (err) {
      console.error('Failed to clear cart:', err);
      setError('Kunne ikke tømme handlekurv');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-charcoal/90 to-sage/20 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-warm_white mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Handlekurv API Test
          </h1>
          <p className="text-warm_white/80 text-lg">
            Test system for session-based handlekurv funktionalitet
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Cart Display */}
          <div className="bg-gradient-to-br from-warm_white to-cream organic-border minimal-shadow">
            <div className="card-inner">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  Min Handlekurv
                </h2>
                <button
                  onClick={loadCart}
                  disabled={loading}
                  className="px-4 py-2 organic-border bg-sage/10 hover:bg-sage/20 text-sage font-medium disabled:opacity-50 transition-all duration-300 flex items-center gap-2"
                >
                  <HiArrowPath className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Oppdater
                </button>
              </div>

              {cart ? (
                <div className="space-y-6">
                  {/* Cart Summary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-sage/5 organic-border p-4">
                      <div className="text-2xl font-bold text-sage mb-1">
                        {cart.totalItems}
                      </div>
                      <div className="text-sm text-charcoal/60">
                        <p className="text-sm text-charcoal/60">Total Items</p>
                      </div>
                    </div>
                    <div className="bg-terracotta/5 organic-border p-4">
                      <div className="text-2xl font-bold text-terracotta mb-1">
                        {cart.totalPrice?.toFixed(2) || '0.00'} NOK
                      </div>
                      <div className="text-sm text-charcoal/60">
                        <p className="text-sm text-charcoal/60">Total Price</p>
                      </div>
                    </div>
                  </div>

                  {/* Cart Items */}
                  {cart.items && cart.items.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-responsive-h3 text-charcoal">Produkter i handlekurv:</h3>
                      {cart.items.map((item, index) => (
                        <div key={item.id || index} className="organic-border bg-gradient-to-r from-warm_white to-cream border-stone_light/50 hover:border-sage/30 transition-all duration-300">
                          <div className="card-inner">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-charcoal mb-1">
                                  {item.product?.name || `Produkt ID: ${item.productId}`}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-charcoal/60">
                                  <span>Antall: {item.quantity}</span>
                                  {item.product?.price && (
                                    <span>Pris: {item.product.price} NOK</span>
                                  )}
                                </div>
                              </div>
                              
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  disabled={loading || item.quantity <= 1}
                                  className="w-8 h-8 organic-border bg-warm_white hover:bg-sage/10 text-charcoal disabled:opacity-50 transition-colors flex items-center justify-center"
                                >
                                  <HiMinus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-medium text-charcoal">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  disabled={loading}
                                  className="w-8 h-8 organic-border bg-warm_white hover:bg-sage/10 text-charcoal disabled:opacity-50 transition-colors flex items-center justify-center"
                                >
                                  <HiPlus className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.productId)}
                                  disabled={loading}
                                  className="ml-2 w-8 h-8 organic-border bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-50 transition-colors flex items-center justify-center"
                                >
                                  <HiTrash className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Clear Cart Button */}
                      <button
                        onClick={clearCart}
                        disabled={loading}
                        className="w-full organic-border bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-700 font-medium py-3 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <HiTrash className="w-5 h-5" />
                        Tøm Handlekurv
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <HiShoppingCart className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
                      <p className="text-charcoal/60">Handlekurven er tom</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <HiArrowPath className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
                  <p className="text-charcoal/60">Ingen handlekurv data</p>
                </div>
              )}
            </div>
          </div>

          {/* Product List */}
          <div className="bg-gradient-to-br from-warm_white to-cream organic-border minimal-shadow">
            <div className="card-inner">
              <h2 className="text-2xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Tilgjengelige Produkter
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="organic-border bg-gradient-to-r from-cream to-warm_white border-stone_light/50 hover:border-terracotta/30 transition-all duration-300">
                    <div className="card-inner">
                      <div className="flex items-center gap-4">
                        {product.images?.[0] && (
                          <img
                            src={product.images[0].url}
                            alt={product.images[0].altText || product.name}
                            className="w-16 h-16 object-cover organic-border"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-charcoal mb-1">{product.name}</h4>
                          <p className="text-terracotta font-medium">{product.price} NOK</p>
                        </div>
                        <button
                          onClick={() => addToCart(product.id)}
                          disabled={loading}
                          className="px-6 py-2 organic-border bg-gradient-to-r from-sage to-sage/80 hover:from-sage/80 hover:to-sage text-white font-medium disabled:opacity-50 transition-all duration-300 flex items-center gap-2"
                        >
                          <HiPlus className="w-4 h-4" />
                          Legg til
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* API Control Panel */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-sage/10 to-terracotta/10 organic-border backdrop-blur-sm">
            <div className="card-inner text-center">
              <h3 className="text-xl font-light text-warm_white mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                API Kontrollpanel
              </h3>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={loadCart}
                  disabled={loading}
                  className="px-6 py-3 organic-border bg-sage hover:bg-sage/80 text-white font-medium disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <HiArrowPath className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  Last Handlekurv
                </button>
                <button
                  onClick={loadProducts}
                  disabled={loading}
                  className="px-6 py-3 organic-border bg-terracotta hover:bg-terracotta/80 text-white font-medium disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <HiSparkles className="w-5 h-5" />
                  Last Produkter
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-warm_white/20">
                <p className="text-center text-sm text-warm_white/70">
                  Test system for handlekurv API - Helseriet E-commerce Platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTest;