import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ProductCardSkeleton } from '../../components/SkeletonLoader';

interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  description?: string;
  shortDescription?: string;
  images?: Array<{
    url: string;
    altText?: string;
  }>;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  avgRating?: number;
  reviewCount?: number;
}

const YogaWellness: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [announceMessage, setAnnounceMessage] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Clean product name for display (remove brand prefix and file extensions)
  const getCleanProductName = (name: string): string => {
    return name
      .replace(/^(SYNERGY|ORGANIXX|SHAKTI) - /, '')
      .replace(/\.(webp|jpg|jpeg|png)$/i, '')
      .replace(/_/g, ' ');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/products?limit=50');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        const allProducts = Array.isArray(data.data) ? data.data : (data.data.products || []);
        
        // Filter for SHAKTI products only
        const shaktiProducts = allProducts.filter((product: Product) => 
          product.name.includes('SHAKTI') && !(product as any).isBundle
        );
        
        setProducts(shaktiProducts);
        setAnnounceMessage(`${shaktiProducts.length} yoga & wellness produkter lastet`);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Kunne ikke laste yoga & wellness produkter. Prøv igjen senere.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Categorize SHAKTI products
  const getProductCategory = (productName: string) => {
    if (productName.includes('Shaktimatte') || productName.includes('Akupressurmatte')) return 'mats';
    if (productName.includes('Shaktipute') || productName.includes('Akupressurpute')) return 'pillows';
    if (productName.includes('Footpad') || productName.includes('Hodeband')) return 'accessories';
    if (productName.includes('Yogamatte')) return 'yoga';
    if (productName.includes('Bag') || productName.includes('Wonderball')) return 'accessories';
    return 'other';
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Category filter
      if (selectedCategory !== 'all') {
        const productCategory = getProductCategory(product.name);
        if (productCategory !== selectedCategory) return false;
      }

      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.avgRating || 0) - (a.avgRating || 0);
        case 'name':
        default: return a.name.localeCompare(b.name);
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage mx-auto mb-4"></div>
              <p className="text-charcoal">Laster yoga & wellness produkter...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-responsive-h1 text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>Yoga & Wellness</h1>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-responsive-h1 text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Yoga & Wellness
            </h1>
            {/* Screen reader announcements */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {announceMessage}
            </div>
            <p className="text-responsive-body text-charcoal/70">
              Opplev den transformative kraften av SHAKTI akupressurmatter og wellness-produkter. 
              Naturlig smertelindring og dyp avslapning for kropp og sjel.
            </p>
          </div>
        </div>
      </section>

      {/* FILTERS & SEARCH */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border card-inner backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Kategori</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-stone_light rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-250"
                >
                  <option value="all">Alle produkter</option>
                  <option value="mats">Akupressurmatter</option>
                  <option value="pillows">Akupressurputer</option>
                  <option value="accessories">Tilbehør</option>
                  <option value="yoga">Yogautstyr</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Sorter etter</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-stone_light rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-250"
                >
                  <option value="name">Navn A-Z</option>
                  <option value="price-low">Pris: Lav til høy</option>
                  <option value="price-high">Pris: Høy til lav</option>
                  <option value="rating">Høyest rangert</option>
                </select>
              </div>

              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Søk</label>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Søk etter produkter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-stone_light rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-250"
                />
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 pt-4 border-t border-stone_light">
              <p className="text-sm text-charcoal/70">
                Viser {filteredProducts.length} av {products.length} produkter
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const frontImage = product.images && product.images.length > 0 ? product.images[0] : null;
                const categoryName = getProductCategory(product.name);
                const categoryLabels = {
                  mats: 'Akupressurmatte',
                  pillows: 'Akupressurpute', 
                  accessories: 'Tilbehør',
                  yoga: 'Yoga',
                  other: 'SHAKTI'
                };

                return (
                  <div 
                    key={product.id}
                    className="bg-white organic-border minimal-shadow hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-cream p-6 relative overflow-hidden">
                      {frontImage ? (
                        <img
                          src={frontImage.url}
                          alt={frontImage.altText || product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="card-inner">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-sage bg-sage/10 px-2 py-1 rounded-full">
                          {categoryLabels[categoryName as keyof typeof categoryLabels]}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-light text-charcoal mb-2 group-hover:text-sage_dark transition-colors line-clamp-2">
                        {getCleanProductName(product.name)}
                      </h3>

                      {/* Pricing */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-medium text-charcoal">
                          {product.price} kr
                        </span>
                        {product.comparePrice && (
                          <span className="text-sm text-charcoal/50 line-through">
                            {product.comparePrice} kr
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      <Link
                        to={`/produkt/${product.id}`}
                        className="btn-ghost w-full text-center text-sm font-medium"
                      >
                        Se produkt
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white organic-border minimal-shadow card-inner max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <h3 className="text-responsive-h3 text-charcoal mb-2">Ingen produkter funnet</h3>
                <p className="text-responsive-body text-charcoal/70">Prøv å justere filtrene dine.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white organic-border minimal-shadow card-inner">
            <h2 className="text-responsive-h2 text-charcoal mb-6 text-center" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Hvorfor velge SHAKTI?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-sage/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-charcoal mb-2">Naturlig smertelindring</h3>
                <p className="text-charcoal/70 text-sm">Akupressur stimulerer kroppens egne endorfiner for naturlig smertestillende effekt</p>
              </div>
              <div className="text-center">
                <div className="bg-terracotta/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <h3 className="font-medium text-charcoal mb-2">Dyp avslapning</h3>
                <p className="text-charcoal/70 text-sm">Reduserer stress og spenning for bedre søvnkvalitet og mental velvære</p>
              </div>
              <div className="text-center">
                <div className="bg-sage/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-charcoal mb-2">Økt energi</h3>
                <p className="text-charcoal/70 text-sm">Forbedrer sirkulasjonen og stimulerer nervesystemet for økt vitalitet</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YogaWellness;