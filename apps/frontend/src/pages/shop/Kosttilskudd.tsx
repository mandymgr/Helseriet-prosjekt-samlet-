import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ProductCardSkeleton } from '../../components/SkeletonLoader';
import { productService, type Product } from '../../services/api';

const Kosttilskudd: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedHealthArea, setSelectedHealthArea] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [announceMessage, setAnnounceMessage] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all products including bundles
        const response = await productService.getAll({ limit: 100 });
        
        if (response.success && response.data) {
          const allProducts = response.data.products || [];
          
          // Include bundles and SYNERGY/ORGANIXX products
          const supplements = allProducts.filter((product: Product) => 
            product.name.includes('SYNERGY') || 
            product.name.includes('ORGANIXX') ||
            product.isBundle  // Include all bundles
          );
          
          setProducts(supplements);
          setAnnounceMessage(`${supplements.length} kosttilskudd og pakker lastet`);
        } else {
          setError('Kunne ikke laste kosttilskudd');
        }
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError('Kan ikke koble til serveren. Sjekk at backend kjører på port 3001.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper functions for categorization
  const getHealthArea = (product: Product) => {
    const name = product.name.toLowerCase();
    const description = (product.description || '').toLowerCase();
    
    if (name.includes('immune') || name.includes('rapid rescue') || description.includes('immunforsvar')) return 'immune';
    if (name.includes('mood') || name.includes('stress') || name.includes('humør') || description.includes('stress')) return 'mood-stress';
    if (name.includes('brain') || name.includes('choline') || name.includes('hjerne') || name.includes('mental')) return 'brain';
    if (name.includes('heart') || name.includes('hjerte')) return 'heart';
    if (name.includes('eye') || name.includes('øye')) return 'eye';
    if (name.includes('bone') || name.includes('bein')) return 'bone';
    if (name.includes('cell protector') || name.includes('anti-aging') || name.includes('levetid')) return 'anti-aging';
    if (name.includes('superfood') || name.includes('algae') || name.includes('grass') || name.includes('berry')) return 'superfood';
    if (name.includes('vitamin') || name.includes('multivitamin') || name.includes('vita-min')) return 'vitamins';
    if (name.includes('astaxanthin') || name.includes('hud') || name.includes('glow')) return 'skin';
    if (name.includes('women') || name.includes('men') || name.includes('kvinner') || name.includes('menn') || name.includes('overgang')) return 'gender-specific';
    return 'other';
  };

  const getPriceCategory = (price: number) => {
    if (price < 500) return 'under-500';
    if (price < 1000) return '500-1000';
    return 'over-1000';
  };

  // Separate bundles and individual products
  const bundleProducts = products.filter(product => product.isBundle);
  const individualProducts = products.filter(product => !product.isBundle);

  // Universal filter function
  const applyFilters = (productList: Product[]) => {
    return productList.filter(product => {
      // Brand filter
      if (selectedBrand !== 'all') {
        if (selectedBrand === 'synergy' && !product.name.includes('SYNERGY')) return false;
        if (selectedBrand === 'organixx' && !product.name.includes('ORGANIXX')) return false;
      }

      // Type filter
      if (selectedType === 'bundles' && !product.isBundle) return false;
      if (selectedType === 'individual' && product.isBundle) return false;

      // Health area filter
      if (selectedHealthArea !== 'all' && getHealthArea(product) !== selectedHealthArea) return false;

      // Price range filter
      if (selectedPriceRange !== 'all' && getPriceCategory(product.price) !== selectedPriceRange) return false;

      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;

      return true;
    });
  };

  // Universal sort function
  const applySorting = (productList: Product[]) => {
    return [...productList].sort((a, b) => {
      switch (sortBy) {
        case 'featured': 
          // Sort by name since featured property not available
          return a.name.localeCompare(b.name);
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.avgRating || 0) - (a.avgRating || 0);
        case 'newest': return a.name.localeCompare(b.name); // Sort by name since createdAt not available
        case 'name':
        default: return a.name.localeCompare(b.name);
      }
    });
  };

  // Apply filters and sorting
  const filteredIndividualProducts = applySorting(applyFilters(individualProducts));
  const filteredBundleProducts = applySorting(applyFilters(bundleProducts));

  const calculateSavings = (originalPrice: number, currentPrice: number) => {
    const savings = originalPrice - currentPrice;
    const percentage = Math.round((savings / originalPrice) * 100);
    return { savings, percentage };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage mx-auto mb-4"></div>
              <p className="text-charcoal">Laster kosttilskudd...</p>
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
            <h1 className="text-responsive-h1 text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>Kosttilskudd</h1>
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
              Kosttilskudd
            </h1>
            {/* Screen reader announcements */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {announceMessage}
            </div>
            <p className="text-responsive-body text-charcoal/70">
              Høykvalitets kosttilskudd fra Pure Synergy og ORGANIXX. Nøye utvalgte produkter for optimal helse og velvære.
            </p>
          </div>
        </div>
      </section>

      {/* FILTERS & SEARCH */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border card-inner backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Merkevare</label>
                <select 
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-stone_light rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-250"
                >
                  <option value="all">Alle merkevarer</option>
                  <option value="synergy">PURE SYNERGY</option>
                  <option value="organixx">ORGANIXX</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Type</label>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-stone_light rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-250"
                >
                  <option value="all">Alle produkter</option>
                  <option value="individual">Enkeltprodukter</option>
                  <option value="bundles">Pakker</option>
                </select>
              </div>

              {/* Health Area Filter */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Helseområde</label>
                <select 
                  value={selectedHealthArea}
                  onChange={(e) => setSelectedHealthArea(e.target.value)}
                  className="w-full px-3 py-2 border border-stone_light rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-250"
                >
                  <option value="all">Alle områder</option>
                  <option value="immune">Immunforsvar</option>
                  <option value="brain">Hjerne & mental</option>
                  <option value="mood-stress">Humør & stress</option>
                  <option value="heart">Hjerte</option>
                  <option value="skin">Hud</option>
                  <option value="anti-aging">Anti-aging</option>
                  <option value="vitamins">Vitaminer</option>
                  <option value="superfood">Superfood</option>
                  <option value="gender-specific">Kjønnsspesifikk</option>
                  <option value="other">Annet</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Prisklasse</label>
                <select 
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-stone_light rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-250"
                >
                  <option value="all">Alle priser</option>
                  <option value="under-500">Under 500 kr</option>
                  <option value="500-1000">500-1000 kr</option>
                  <option value="over-1000">Over 1000 kr</option>
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
                  <option value="featured">Anbefalte først</option>
                  <option value="name">Navn A-Z</option>
                  <option value="price-low">Pris: Lav til høy</option>
                  <option value="price-high">Pris: Høy til lav</option>
                  <option value="newest">Nyeste først</option>
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
                Viser {filteredIndividualProducts.length + filteredBundleProducts.length} av {products.length} produkter
                {selectedType === 'individual' && ` (${filteredIndividualProducts.length} enkeltprodukter)`}
                {selectedType === 'bundles' && ` (${filteredBundleProducts.length} pakker)`}
                {selectedType === 'all' && ` (${filteredIndividualProducts.length} enkeltprodukter, ${filteredBundleProducts.length} pakker)`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAKKER SECTION */}
      {(selectedType === 'all' || selectedType === 'bundles') && filteredBundleProducts.length > 0 && (
        <section className="section-spacing">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-responsive-h2 text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Pakketilbud
              </h2>
              <p className="text-responsive-body text-charcoal/70">
                Spar penger med våre nøye sammensatte pakker
              </p>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBundleProducts.map((product) => {
                  const frontImage = product.images?.[0] || null;
                  const savings = product.comparePrice ? calculateSavings(product.comparePrice, product.price) : null;

                  return (
                    <div 
                      key={product.id}
                      className="bg-white organic-border minimal-shadow hover:shadow-lg transition-all duration-300 overflow-hidden group"
                    >
                      {/* Product Image */}
                      <div className="aspect-square bg-cream p-6 relative overflow-hidden">
                        <div className="absolute top-3 left-3 bg-terracotta text-white px-2 py-1 rounded-full text-xs font-medium z-10">
                          PAKKE
                        </div>
                        {savings && (
                          <div className="absolute top-3 right-3 bg-sage text-white px-2 py-1 rounded-full text-xs font-medium z-10">
                            -{savings.percentage}%
                          </div>
                        )}
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="card-inner">
                        <div className="mb-2">
                          <span className="text-xs font-medium text-sage bg-sage/10 px-2 py-1 rounded-full">
                            {product.name.includes('SYNERGY') ? 'PURE SYNERGY' : 'ORGANIXX'}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-light text-charcoal mb-2 group-hover:text-sage_dark transition-colors line-clamp-2">
                          {product.name
                            .replace(/^(SYNERGY|ORGANIXX) - /, '')
                            .replace(/\.(webp|jpg|jpeg|png)$/i, '')
                            .replace(/_/g, ' ')
                          }
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
                          Se pakke
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ENKELTPRODUKTER SECTION */}
      {(selectedType === 'all' || selectedType === 'individual') && (
        <section className="section-spacing">
          <div className="max-w-6xl mx-auto px-6">
            {selectedType === 'all' && (
              <div className="text-center mb-8">
                <h2 className="text-responsive-h2 text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  Enkeltprodukter
                </h2>
                <p className="text-responsive-body text-charcoal/70">
                  Vårt utvalg av individuelle kosttilskudd
                </p>
              </div>
            )}
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredIndividualProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredIndividualProducts.map((product) => {
                const frontImage = product.images?.[0] || null;
                const savings = product.comparePrice ? calculateSavings(product.comparePrice, product.price) : null;

                  return (
                    <div 
                      key={product.id}
                      className="bg-white organic-border minimal-shadow hover:shadow-lg transition-all duration-300 overflow-hidden group"
                    >
                      {/* Product Image */}
                      <div className="aspect-square bg-cream p-6 relative overflow-hidden">
                        {savings && (
                          <div className="absolute top-3 right-3 bg-sage text-white px-2 py-1 rounded-full text-xs font-medium z-10">
                            -{savings.percentage}%
                          </div>
                        )}
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="card-inner">
                        <div className="mb-2">
                          <span className="text-xs font-medium text-sage bg-sage/10 px-2 py-1 rounded-full">
                            {product.name.includes('SYNERGY') ? 'PURE SYNERGY' : 'ORGANIXX'}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-light text-charcoal mb-2 group-hover:text-sage_dark transition-colors line-clamp-2">
                          {product.name
                            .replace(/^(SYNERGY|ORGANIXX) - /, '')
                            .replace(/\.(webp|jpg|jpeg|png)$/i, '')
                            .replace(/_/g, ' ')
                          }
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-responsive-h3 text-charcoal mb-2">Ingen enkeltprodukter funnet</h3>
                  <p className="text-responsive-body text-charcoal/70">Prøv å justere filtrene dine.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* EMPTY STATE - hvis begge seksjoner er tomme */}
      {!loading && filteredIndividualProducts.length === 0 && filteredBundleProducts.length === 0 && (
        <section className="section-spacing">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center py-16">
              <div className="bg-white organic-border minimal-shadow card-inner max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="text-responsive-h3 text-charcoal mb-2">Ingen produkter funnet</h3>
                <p className="text-responsive-body text-charcoal/70">Prøv å justere filtrene dine.</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Kosttilskudd;