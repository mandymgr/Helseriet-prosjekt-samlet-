import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { HiOutlineHeart, HiHeart, HiOutlineShoppingCart } from 'react-icons/hi2';

interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
  addedDate: string;
}

const AccountFavorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'in-stock' | 'on-sale'>('all');

  // Mock favorites data
  useEffect(() => {
    const mockFavorites: FavoriteProduct[] = [
      {
        id: '1',
        name: 'Omega-3 Premium',
        price: 449,
        comparePrice: 549,
        description: '180 kapsler - Høykonsentrert EPA/DHA for hjerne og hjerte',
        image: '🐟',
        rating: 4.8,
        reviewCount: 127,
        inStock: true,
        category: 'Omega-3',
        addedDate: '15. januar 2024'
      },
      {
        id: '2',
        name: 'Vitamin D3 + K2',
        price: 329,
        description: '90 kapsler - Optimal absorpsjon med K2-vitamin',
        image: '☀️',
        rating: 4.9,
        reviewCount: 203,
        inStock: true,
        category: 'Vitaminer',
        addedDate: '8. januar 2024'
      },
      {
        id: '3',
        name: 'Magnesium Glycinate',
        price: 279,
        comparePrice: 329,
        description: '120 kapsler - Best absorberbare form for søvn og avslapning',
        image: '🌙',
        rating: 4.7,
        reviewCount: 89,
        inStock: false,
        category: 'Mineraler',
        addedDate: '28. desember 2023'
      },
      {
        id: '4',
        name: 'Probiotika Premium',
        price: 399,
        description: '60 kapsler - 50 milliarder levende kulturer',
        image: '🦠',
        rating: 4.6,
        reviewCount: 156,
        inStock: true,
        category: 'Probiotika',
        addedDate: '20. desember 2023'
      },
      {
        id: '5',
        name: 'Ashwagandha KSM-66',
        price: 349,
        comparePrice: 399,
        description: '90 kapsler - Reduserer stress og forbedrer søvn',
        image: '🌿',
        rating: 4.8,
        reviewCount: 94,
        inStock: true,
        category: 'Urter',
        addedDate: '12. desember 2023'
      }
    ];

    setTimeout(() => {
      setFavorites(mockFavorites);
      setLoading(false);
    }, 800);
  }, []);

  const filteredFavorites = favorites.filter(product => {
    if (filter === 'in-stock') return product.inStock;
    if (filter === 'on-sale') return product.comparePrice && product.comparePrice > product.price;
    return true;
  });

  const removeFavorite = (productId: string) => {
    setFavorites(prev => prev.filter(p => p.id !== productId));
  };

  const addToCart = (productId: string) => {
    // In real app, this would add to cart
    alert(`Lagt til i handlekurv: ${favorites.find(p => p.id === productId)?.name}`);
  };

  const getSavingsPercentage = (price: number, comparePrice: number) => {
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-stone_light rounded-xl w-1/3"></div>
            <div className="h-4 bg-stone_light rounded-lg w-2/3"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-warm_white organic-border p-6 space-y-4">
                  <div className="h-20 bg-stone_light rounded-xl"></div>
                  <div className="h-6 bg-stone_light rounded-lg"></div>
                  <div className="h-4 bg-stone_light rounded-lg w-2/3"></div>
                  <div className="h-10 bg-stone_light rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <div className="flex items-center space-x-2 text-charcoal/60">
            <Link to="/" className="hover:text-sage transition-colors">Hjem</Link>
            <span>/</span>
            <Link to="/account" className="hover:text-sage transition-colors">Min konto</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">Favoritter</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Mine favoritter
          </h1>
          <p className="text-charcoal/70 leading-relaxed">
            Produkter du har lagret for senere. Få varsling når de kommer på tilbud!
          </p>
        </div>

        {/* Filter and Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Alle favoritter', count: favorites.length },
              { key: 'in-stock', label: 'På lager', count: favorites.filter(p => p.inStock).length },
              { key: 'on-sale', label: 'På tilbud', count: favorites.filter(p => p.comparePrice && p.comparePrice > p.price).length }
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

          {/* Quick Actions */}
          <div className="flex gap-3">
            <button className="btn-ghost text-sm">
              Legg alle i handlekurv
            </button>
            <button className="text-charcoal/60 hover:text-red-500 transition-colors text-sm">
              Tøm favoritter
            </button>
          </div>
        </div>

        {/* Favorites Grid */}
        {filteredFavorites.length === 0 ? (
          <div className="bg-warm_white organic-border minimal-shadow p-12 text-center">
            <div className="w-20 h-20 bg-stone_light rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineHeart className="w-10 h-10 text-charcoal/40" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-4">
              {filter === 'all' ? 'Ingen favoritter ennå' : 'Ingen favoritter matcher filteret'}
            </h3>
            <p className="text-charcoal/70 mb-6">
              {filter === 'all' 
                ? 'Finn produkter du liker og legg dem til favorittlisten din.'
                : `Du har ingen favoritter ${filter === 'in-stock' ? 'på lager' : 'på tilbud'} akkurat nå.`
              }
            </p>
            <Link to="/produkter" className="btn-organic">
              Utforsk produkter
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((product) => (
              <div key={product.id} className="bg-warm_white organic-border minimal-shadow p-6 hover:shadow-lg transition-all duration-300 group">
                {/* Product Image */}
                <div className="relative mb-4">
                  <div className="w-full h-32 bg-gradient-to-br from-stone_light/30 to-sage/20 rounded-xl flex items-center justify-center">
                    <span className="text-4xl">{product.image}</span>
                  </div>
                  
                  {/* Sale Badge */}
                  {product.comparePrice && product.comparePrice > product.price && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-terracotta to-terracotta/90 text-warm_white px-3 py-1 rounded-full text-xs font-bold">
                      -{getSavingsPercentage(product.price, product.comparePrice)}%
                    </div>
                  )}
                  
                  {/* Favorite Button */}
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-warm_white/90 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  >
                    <HiHeart className="w-4 h-4 text-red-500 hover:text-warm_white transition-colors" />
                  </button>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute bottom-3 left-3 bg-red-500 text-warm_white px-3 py-1 rounded-full text-xs font-medium">
                      Utsolgt
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1 group-hover:text-sage transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-charcoal/70 text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-charcoal/60 text-sm">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-charcoal">
                      {product.price.toLocaleString()} kr
                    </span>
                    {product.comparePrice && (
                      <span className="text-sm text-charcoal/50 line-through">
                        {product.comparePrice.toLocaleString()} kr
                      </span>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-charcoal/60">
                    <span className="bg-stone_light/50 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span>Lagt til {product.addedDate}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className={`
                        flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2
                        ${product.inStock
                          ? 'btn-organic hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }
                      `}
                    >
                      <HiOutlineShoppingCart className="w-4 h-4" />
                      {product.inStock ? 'Legg i kurv' : 'Utsolgt'}
                    </button>
                    <Link
                      to={`/produkt/${product.id}`}
                      className="px-4 py-3 bg-stone_light/50 hover:bg-sage/20 text-charcoal rounded-xl transition-colors flex items-center justify-center"
                    >
                      👁️
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendation Section */}
        <div className="mt-12 bg-gradient-to-r from-sage/10 to-terracotta/10 organic-border p-8">
          <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Anbefalte produkter basert på favorittene dine
          </h3>
          <p className="text-charcoal/70 mb-6 leading-relaxed">
            Siden du liker {favorites[0]?.category?.toLowerCase()}, kan disse produktene også være interessante for deg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/produkter" className="btn-organic">
              Se lignende produkter
            </Link>
            <Link to="/ai-chat" className="btn-ghost">
              Få AI-anbefalinger
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

export default AccountFavorites;