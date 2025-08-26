import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { ProductCardSkeleton } from '../../components/SkeletonLoader';
import { productService, type Product } from '../../services/api';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const [announceMessage, setAnnounceMessage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Clean product name for display (remove brand prefix and file extensions)
  const getCleanProductName = (name: string): string => {
    return name
      .replace(/^(SYNERGY|ORGANIXX|SHAKTI) - /, '')
      .replace(/\.(webp|jpg|jpeg|png)$/i, '')
      .replace(/_/g, ' ');
  };

  const categories = [
    { id: 'all', name: 'Alle' },
    { id: 'vitamins', name: 'Vitaminer' },
    { id: 'minerals', name: 'Mineraler' },
    { id: 'omega', name: 'Omega-3' },
    { id: 'probiotics', name: 'Probiotika' },
    { id: 'herbs', name: 'Urter' },
  ];

  // Fetch products from API 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productService.getAll();
        
        if (response.success && response.data) {
          // API returns {products: ApiProduct[], pagination: any}
          const apiProducts = response.data.products || [];
          // Filter out bundles - only show individual products
          const individualProducts = apiProducts.filter((product: any) => !product.isBundle);
          setProducts(individualProducts);
          setAnnounceMessage(`${individualProducts.length} produkter lastet`);
        } else {
          setError('Kunne ikke laste produkter');
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

  // Simulate loading when category or search changes
  const handleCategoryChange = (categoryId: string) => {
    setLoading(true);
    setSelectedCategory(categoryId);
    
    const categoryName = categories.find(cat => cat.id === categoryId)?.name || 'Alle';
    setAnnounceMessage(`Laster produkter for kategori: ${categoryName}`);
    
    setTimeout(() => {
      setLoading(false);
      const resultCount = products.filter(product => 
        categoryId === 'all' || 
        (typeof product.category === 'string' ? product.category === categoryId : product.category?.slug === categoryId)
      ).length;
      setAnnounceMessage(`${resultCount} produkter funnet for ${categoryName}`);
    }, 800);
  };

  const handleSearchChange = (value: string) => {
    if (value.length > 2 || value.length === 0) {
      setLoading(true);
      setSearchTerm(value);
      setAnnounceMessage('Søker etter produkter...');
      
      setTimeout(() => {
        setLoading(false);
        const tempFiltered = products.filter(product => {
          const matchesCategory = selectedCategory === 'all' || 
            (typeof product.category === 'string' ? product.category === selectedCategory : product.category?.slug === selectedCategory);
          const matchesSearch = product.name.toLowerCase().includes(value.toLowerCase()) ||
                               (product.brand && product.brand.toLowerCase().includes(value.toLowerCase()));
          return matchesCategory && matchesSearch;
        });
        
        if (value.length === 0) {
          setAnnounceMessage('Viser alle produkter');
        } else {
          setAnnounceMessage(`${tempFiltered.length} produkter funnet for "${value}"`);
        }
      }, 600);
    } else {
      setSearchTerm(value);
    }
  };

  const filteredProducts = products.filter(product => {
    // Handle category matching for both string and object formats
    const categoryMatch = selectedCategory === 'all' || 
      (typeof product.category === 'string' ? product.category === selectedCategory : product.category?.slug === selectedCategory);
    
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'popularity':
        return (b.reviewCount || b.reviews || 0) - (a.reviewCount || a.reviews || 0);
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    return <span>{stars}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-responsive-h1 text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Alle produkter
            </h1>
            {/* Screen reader announcements */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {announceMessage}
            </div>
            <p className="text-responsive-body text-charcoal/70">
              Utforsk vårt komplette utvalg av naturlige helseprodukter
            </p>
          </div>
        </div>
      </section>

      {/* FILTERS & SEARCH */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border card-inner backdrop-blur-sm">
            {/* Categories */}
            <div className="breathe-sm text-center">
              <h3 className="text-lg font-medium text-charcoal mb-6" id="category-heading">
                Kategorier
              </h3>
              <div className="flex flex-wrap gap-4 justify-center" role="group" aria-labelledby="category-heading">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`btn-ghost text-sm transition-all duration-250 micro-interaction focus-ring ${
                      selectedCategory === category.id
                        ? 'bg-sage text-warm_white hover:bg-sage_dark'
                        : ''
                    }`}
                    aria-pressed={selectedCategory === category.id}
                    aria-describedby={selectedCategory === category.id ? 'selected-category' : undefined}
                  >
                    {category.name}
                    {selectedCategory === category.id && (
                      <span className="sr-only" id="selected-category"> (valgt kategori)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row card-gap items-stretch sm:items-center">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="Søk produkter..." 
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 organic-border focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage text-charcoal placeholder-charcoal/50 focus-ring"
                  aria-label="Søk i produktkatalog"
                  aria-describedby="search-instructions"
                />
                <div id="search-instructions" className="sr-only">
                  Skriv minst 3 tegn for å starte søket. Resultater oppdateres automatisk.
                </div>
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sm:w-52 px-4 py-3 organic-border focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage text-charcoal focus-ring"
                aria-label="Sorter produkter etter"
              >
                <option value="name">Sorter etter navn</option>
                <option value="price-low">Pris: Lav til høy</option>
                <option value="price-high">Pris: Høy til lav</option>
                <option value="popularity">Popularitet</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="sr-only" aria-live="polite">
            {loading ? 'Laster produkter...' : `Viser ${sortedProducts.length} produkter`}
          </div>
          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 card-gap">
              {[...Array(6)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          )}
          
          {/* Products Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 card-gap gpu-accelerated">
              {sortedProducts.map((product, index) => (
                <Link 
                  key={product.id} 
                  to={`/produkt/${product.id}`} 
                  className={`bg-white minimal-shadow organic-border subtle-hover relative overflow-hidden block will-animate stagger-item`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Badge */}
                  {product.badges && (
                    <div className="absolute top-6 right-6 z-10">
                      {product.badges.map((badge, index) => (
                        <span
                          key={index}
                          className={`text-xs font-medium px-3 py-1.5 rounded-full shadow-lg ${
                            badge === 'Tilbud' ? 'bg-terracotta text-white' :
                            badge === 'Bestseller' ? 'bg-terracotta text-white' :
                            badge === 'Ny' ? 'bg-sage text-white' :
                            'bg-charcoal text-white'
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Product Content */}
                  <div className="card-inner text-center">
                    {/* Product Image - always show front image first */}
                    <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      {(() => {
                        // Get the first image (front image with sortOrder 0)
                        const frontImage = product.images && product.images.length > 0 
                          ? product.images[0]
                          : null;
                        
                        const imageUrl = frontImage?.url || product.image;
                        
                        if (imageUrl) {
                          return (
                            <img 
                              src={imageUrl} 
                              alt={frontImage?.altText || product.name}
                              className="w-full h-full object-cover rounded-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = '<svg class="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>';
                              }}
                            />
                          );
                        } else {
                          return (
                            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                            </svg>
                          );
                        }
                      })()}
                    </div>
                    
                    <h3 className="text-xl font-medium text-charcoal mb-2">{getCleanProductName(product.name)}</h3>
                    {product.brand && (
                      <p className="text-sage_dark text-sm mb-4">{product.brand}</p>
                    )}
                    
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <div className="flex text-terracotta text-sm">
                        {renderStars(product.avgRating || product.rating || 0)}
                      </div>
                      <span className="text-xs text-charcoal/60">
                        ({product.reviewCount || product.reviews || 0})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <span className="text-2xl font-light text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>{product.price} kr</span>
                      {product.comparePrice && (
                        <span className="text-lg text-charcoal/50 line-through">{product.comparePrice} kr</span>
                      )}
                    </div>
                    
                    <button className="btn-organic w-full flex items-center justify-center group">
                      Legg i kurv
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="empty-state fade-scale active" role="status" aria-live="polite">
              <div className="empty-state-icon">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 13.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <h3 className="text-responsive-h3 text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Feil ved lasting av produkter
              </h3>
              <p className="text-responsive-body mb-6 leading-relaxed">
                {error}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="btn-ghost scale-hover"
              >
                Prøv igjen
              </button>
            </div>
          )}

          {/* No results message */}
          {!loading && !error && sortedProducts.length === 0 && (
            <div className="empty-state fade-scale active" role="status" aria-live="polite">
              <div className="empty-state-icon">
                <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 className="text-responsive-h3 text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Ingen produkter funnet
              </h3>
              <p className="text-responsive-body mb-6 leading-relaxed">
                Prøv å endre søkekriteriene eller filteret ditt.
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                  setAnnounceMessage('Nullstilt alle filtre');
                }}
                className="btn-ghost scale-hover"
              >
                Nullstill filtre
              </button>
            </div>
          )}

          {/* Load More */}
          {!loading && sortedProducts.length > 0 && (
            <div className="text-center breathe-lg">
              <button className="btn-ghost subtle-hover flex items-center gap-3 mx-auto focus-ring" aria-describedby="load-more-desc">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                </svg>
                Last inn flere produkter
              </button>
              <div id="load-more-desc" className="sr-only">
                Last inn flere produkter fra katalogen
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;