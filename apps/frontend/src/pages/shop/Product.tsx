import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { productService } from '../../services/api';
import ProductImageGallery from '../../components/ProductImageGallery';
import { ProductReviews } from '../../components/product/ProductReviews';
import { RatingDisplay } from '../../components/product/RatingDisplay';
import { useReviews } from '../../hooks/useReviews';

interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  sortOrder: number;
}

interface ProductInfo {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  description: string;
  shortDescription?: string;
  sku: string;
  quantity: number;
  images: ProductImage[];
  averageRating: number;
  totalReviews: number;
  isActive: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  reviews: Array<{
    id: string;
    rating: number;
    title: string | null;
    comment: string | null;
    createdAt: string;
    user: {
      firstName: string | null;
      lastName: string | null;
    };
  }>;
}


const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('beskrivelse');
  const [isSubscription, setIsSubscription] = useState(false);
  const [subscriptionFrequency, setSubscriptionFrequency] = useState('monthly');

  // Reviews system
  const {
    userReview,
    reviewStats,
    actions: reviewActions
  } = useReviews(id || '');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await productService.getById(id);
        
        if (response.success && response.data) {
          setProduct({
            ...response.data,
            averageRating: response.data.avgRating,
            totalReviews: response.data.reviewCount
          } as unknown as ProductInfo);
          setError(null);
        } else {
          setError('Produktet ble ikke funnet');
        }
      } catch (err: any) {
        console.error('Error fetching product:', err);
        setError('Produktet ble ikke funnet');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const orderType = isSubscription ? 'subscription' : 'one-time';
    console.log(`Adding ${quantity}x ${product.name} to cart as ${orderType}`, {
      frequency: isSubscription ? subscriptionFrequency : null
    });
    // In a real app, this would add to cart state/context
  };

  const getSubscriptionDiscount = () => {
    return isSubscription ? 0.15 : 0; // 15% discount for subscriptions
  };

  const getDiscountedPrice = () => {
    if (!product) return 0;
    const discount = getSubscriptionDiscount();
    return Math.round(product.price * (1 - discount));
  };

  const subscriptionOptions = [
    { value: 'monthly', label: 'Hver måned', savings: '15%' },
    { value: 'bimonthly', label: 'Hver 2. måned', savings: '15%' },
    { value: 'quarterly', label: 'Hver 3. måned', savings: '15%' }
  ];

  // Review handlers
  const handleReviewSubmit = async (reviewData: { rating: number; title: string; comment: string }) => {
    const success = await reviewActions.submitReview(reviewData);
    if (success) {
      console.log('Review submitted successfully');
    }
  };

  const handleReviewUpdate = async (reviewId: string, reviewData: { rating: number; title: string; comment: string }) => {
    const success = await reviewActions.updateReview(reviewId, reviewData);
    if (success) {
      console.log('Review updated successfully');
    }
  };

  const handleReviewDelete = async (reviewId: string) => {
    const success = await reviewActions.deleteReview(reviewId);
    if (success) {
      console.log('Review deleted successfully');
    }
  };

  const calculateSavings = () => {
    if (!product || !product.comparePrice) return 0;
    return product.comparePrice - product.price;
  };



  // Loading state
  if (loading) {
    return (
      <section className="section-spacing-lg nature-texture">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center">
          <div className="bg-white minimal-shadow organic-border card-inner text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage mx-auto mb-4"></div>
            <div className="text-charcoal">Laster produkt...</div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <section className="section-spacing-lg nature-texture">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center">
          <div className="bg-white minimal-shadow organic-border card-inner text-center max-w-md">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-light text-charcoal mb-4">Produktet ble ikke funnet</h2>
            <p className="text-charcoal_light mb-6">{error || 'Vi kunne ikke finne dette produktet.'}</p>
            <Link 
              to="/produkter" 
              className="inline-block bg-sage hover:bg-sage_dark text-white px-6 py-3 organic-border transition-colors"
            >
              Se alle produkter
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="section-spacing-lg nature-texture">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-sm text-charcoal/60 bg-white minimal-shadow organic-border card-inner">
            <Link to="/" className="hover:text-sage transition-colors micro-interaction">Hjem</Link>
            <span className="mx-2 text-sage">›</span>
            <Link to="/produkter" className="hover:text-sage transition-colors micro-interaction">Produkter</Link>
            <span className="mx-2 text-sage">›</span>
            <Link to={`/kategorier/${product.category.slug}`} className="hover:text-sage transition-colors micro-interaction">{product.category.name}</Link>
            <span className="mx-2 text-sage">›</span>
            <span className="text-charcoal font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="section-spacing bg-stone_light/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border card-inner">
        <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <ProductImageGallery 
                images={product.images} 
                productName={product.name} 
              />
            </div>

            {/* Product Info */}
            <div className="bg-white minimal-shadow organic-border card-inner">
              {/* SKU */}
              <p className="text-sm text-charcoal/60 mb-4 font-mono bg-stone_light/30 px-3 py-1 organic-border inline-block">SKU: {product.sku}</p>

              {/* Product Title & Rating */}
              <h1 className="text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>{product.name}</h1>
              
              {/* Category Tags */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-charcoal text-warm_white text-sm font-medium px-4 py-2 rounded-full">
                  {product.category.name}
                </span>
                {product.sku.includes('BUNDLE') && (
                  <span className="bg-sage text-warm_white text-sm font-medium px-4 py-2 rounded-full">Pakke</span>
                )}
                {product.comparePrice && (
                  <span className="bg-sage text-warm_white text-sm font-medium px-4 py-2 rounded-full">Tilbud</span>
                )}
              </div>

              <div className="mb-4">
                <RatingDisplay
                  rating={reviewStats?.averageRating || product.averageRating || 0}
                  reviewCount={reviewStats?.totalReviews || product.totalReviews || 0}
                  size="lg"
                  showRatingNumber={true}
                />
              </div>

              {/* Short Description */}
              <p className="text-charcoal/80 mb-6 leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* Price Section */}
              <div className="bg-sage-50/50 organic-border card-inner mb-6 minimal-shadow">
                <h3 className="text-xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>Kjøpsalternativer</h3>
                
                {/* Purchase Options Toggle */}
                <div className="flex gap-4 mb-6">
                  <button 
                    onClick={() => setIsSubscription(false)}
                    className={`flex-1 micro-interaction ${
                      !isSubscription 
                        ? 'btn-organic' 
                        : 'btn-ghost'
                    }`}
                  >
                    Enkeltkjøp
                  </button>
                  <button 
                    onClick={() => setIsSubscription(true)}
                    className={`flex-1 micro-interaction ${
                      isSubscription 
                        ? 'btn-organic' 
                        : 'btn-ghost'
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-2">🔄</span>
                      Abonnement (-15%)
                    </span>
                  </button>
                </div>

                {/* Price Display */}
                {!isSubscription ? (
                  <div>
                    <div className="flex items-baseline space-x-3 mb-2">
                      <span className="text-3xl font-bold text-charcoal">{product.price} kr</span>
                      {product.comparePrice && (
                        <>
                          <span className="text-xl text-charcoal/60 line-through">{product.comparePrice} kr</span>
                          <span className="bg-sage text-warm_white text-sm font-medium px-3 py-1 rounded-full">
                            Spar {calculateSavings()} kr
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-charcoal/70">Enkeltpris for dette produktet</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline space-x-3 mb-4">
                      <span className="text-3xl font-bold text-charcoal">{getDiscountedPrice()} kr</span>
                      <span className="text-xl text-charcoal/60 line-through">{product.price} kr</span>
                      <span className="bg-sage text-warm_white text-sm font-medium px-3 py-1 rounded-full">
                        Ekstra 15% rabatt
                      </span>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Leveringsfrekvens
                      </label>
                      <select
                        value={subscriptionFrequency}
                        onChange={(e) => setSubscriptionFrequency(e.target.value)}
                        className="w-full px-4 py-3 border border-stone_light organic-border focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-charcoal"
                      >
                        {subscriptionOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label} (spar {option.savings})
                          </option>
                        ))}
                      </select>
                      <div className="mt-2 p-3 bg-sage/5 organic-border">
                        <div className="flex items-center gap-2 text-sm text-charcoal/70">
                          <svg className="w-4 h-4 text-sage" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span>Avbryt når som helst • Hopp over leveringer • Endre frekvens</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center border border-stone_light organic-border">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-charcoal hover:bg-stone_light/20 transition-colors micro-interaction"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium text-charcoal">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-charcoal hover:bg-stone_light/20 transition-colors micro-interaction"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={product.quantity === 0}
                    className={`flex-1 micro-interaction ${
                      product.quantity > 0 ? 'btn-organic' : 'btn-ghost opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {product.quantity > 0 ? 'Legg i handlekurv' : 'Utsolgt'}
                  </button>
                </div>

                {/* Stock Status */}
                <div className="mt-4">
                  {product.quantity > 0 ? (
                    <div className="flex items-center gap-3 text-sage">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="font-medium">På lager ({product.quantity} stk) - klar for sending</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-red-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                      </svg>
                      <span className="font-medium">Midlertidig utsolgt</span>
                    </div>
                  )}
                </div>

                {/* Trust Signals */}
                <div className="mt-8 pt-6 border-t border-stone_light/30">
                  <h4 className="text-sm font-medium text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>Våre garantier</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-charcoal/70">
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
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-sage flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>Sikker betaling</span>
                </div>
                <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-sage flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                    <span>Rask levering 1-3 dager</span>
                </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          </div>
        </div>
      </section>
      
      {/* Product Tabs */}
      <section className="section-spacing bg-sage-50/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border overflow-hidden">
            <div className="border-b border-stone_light/30 bg-sage-50/30">
              <h2 className="text-2xl font-light text-charcoal card-inner" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>Produktinformasjon</h2>
            </div>
              <div className="border-b border-stone_light/20">
                <nav className="flex">
                  {[
                    { id: 'beskrivelse', label: 'Beskrivelse' },
                    { id: 'ingredienser', label: 'Ingredienser' },
                    { id: 'bruk', label: 'Bruk' },
                    { id: 'anmeldelser', label: `Anmeldelser (${reviewStats?.totalReviews || product.totalReviews || 0})` }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 text-sm micro-interaction ${
                        activeTab === tab.id
                          ? 'btn-organic'
                          : 'btn-ghost'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="card-inner">
                {activeTab === 'beskrivelse' && (
                  <div>
                    <h3 className="text-2xl font-light text-charcoal mb-6">Produktbeskrivelse</h3>
                    <div className="text-charcoal/80 leading-relaxed whitespace-pre-wrap">
                      {product.description || product.shortDescription || 'Ingen beskrivelse tilgjengelig.'}
                    </div>
                  </div>
                )}

                {activeTab === 'ingredienser' && (
                  <div>
                    <h3 className="text-2xl font-light text-charcoal mb-6">Ingredienser</h3>
                    <div className="bg-sage-50/50 organic-border card-inner">
                      <p className="text-charcoal/70">Ingrediensliste kommer snart...</p>
                    </div>
                  </div>
                )}

                {activeTab === 'bruk' && (
                  <div>
                    <h3 className="text-2xl font-light text-charcoal mb-6">Bruksanvisning</h3>
                    <div className="bg-sage-50/50 organic-border card-inner">
                      <p className="text-charcoal/70">Bruksanvisning kommer snart...</p>
                    </div>
                  </div>
                )}

                {activeTab === 'anmeldelser' && (
                  <div>
                    <ProductReviews
                      productId={product.id}
                      userReview={userReview || undefined}
                      onReviewSubmit={handleReviewSubmit}
                      onReviewUpdate={handleReviewUpdate}
                      onReviewDelete={handleReviewDelete}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;