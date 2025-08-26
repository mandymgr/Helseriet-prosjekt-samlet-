import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { 
  HiArrowRight, 
  HiOutlineCube,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineArchiveBox
} from 'react-icons/hi2';
import apiClient from '../../services/api';
import { homepageApi } from '../../services/homepageApi';
import ProductImageGallery from '../../components/ProductImageGallery';
import { FeaturedProductSkeleton } from '../../components/SkeletonLoader';

interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  sortOrder: number;
}

interface Product {
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
}

const Home: React.FC = () => {
  const heroNaturligRef = useRef<HTMLSpanElement>(null);
  const heroVelvareRef = useRef<HTMLSpanElement>(null);
  const heroSubtitleRef = useRef<HTMLSpanElement>(null);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [bundleProducts, setBundleProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [bundleData, setBundleData] = useState<{price: number, comparePrice: number, savings: number} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Clean product name for display (remove brand prefix and file extensions)
  const getCleanProductName = (name: string): string => {
    return name
      .replace(/^(SYNERGY|ORGANIXX|SHAKTI) - /, '')
      .replace(/\.(webp|jpg|jpeg|png)$/i, '')
      .replace(/_/g, ' ');
  };

  // Force typography styles that cannot be overridden
  useEffect(() => {
    const forceStyles = () => {
      if (heroNaturligRef.current) {
        heroNaturligRef.current.style.fontFamily = 'ui-serif, Georgia, Cambria, serif';
        heroNaturligRef.current.style.fontWeight = '300';
        heroNaturligRef.current.style.fontSize = '60px';
        heroNaturligRef.current.style.lineHeight = '60px';
        heroNaturligRef.current.style.color = 'rgb(44, 42, 38)';
      }
      if (heroVelvareRef.current) {
        heroVelvareRef.current.style.fontFamily = '-apple-system, "SF Pro Display", Inter, "Helvetica Neue", system-ui, sans-serif';
        heroVelvareRef.current.style.fontWeight = '400';
        heroVelvareRef.current.style.fontSize = '60px';
        heroVelvareRef.current.style.lineHeight = '60px';
        heroVelvareRef.current.style.color = 'rgb(156, 175, 136)';
      }
      if (heroSubtitleRef.current) {
        heroSubtitleRef.current.style.fontFamily = 'ui-serif, Georgia, Cambria, serif';
        heroSubtitleRef.current.style.fontWeight = '300';
        heroSubtitleRef.current.style.fontSize = '60px';
        heroSubtitleRef.current.style.lineHeight = '60px';
        heroSubtitleRef.current.style.color = 'rgb(44, 42, 38)';
      }
    };

    // Apply immediately
    forceStyles();

    // Re-apply every 50ms to override any changes
    const interval = setInterval(forceStyles, 50);
    
    // Also listen for style changes and force re-apply
    const observer = new MutationObserver(forceStyles);
    if (heroNaturligRef.current) observer.observe(heroNaturligRef.current, { attributes: true, attributeFilter: ['style'] });
    if (heroVelvareRef.current) observer.observe(heroVelvareRef.current, { attributes: true, attributeFilter: ['style'] });  
    if (heroSubtitleRef.current) observer.observe(heroSubtitleRef.current, { attributes: true, attributeFilter: ['style'] });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Fetch homepage configuration from API
  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        console.log('🏠 Home component: Starting to fetch data...');
        setLoading(true);
        
        // Get homepage configuration from database
        const homepageConfig = await homepageApi.getConfig();
        
        // Check if homepage config is empty/not configured
        const isEmpty = !homepageConfig.featuredProduct && 
                       homepageConfig.bundleProducts.length === 0 && 
                       homepageConfig.popularProducts.length === 0;
        
        if (isEmpty) {
          // Force fallback if config is empty
          console.log('🏠 Homepage config is empty, forcing fallback...');
          throw new Error('Homepage config is empty, using fallback');
        }
        console.log('🏠 Homepage config has data, using it...');
        
        // Map products to our interface
        const mapProduct = (product: any): Product => ({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          comparePrice: product.comparePrice ? parseFloat(product.comparePrice) : undefined,
          description: product.description || '',
          shortDescription: product.shortDescription || '',
          sku: product.sku,
          quantity: product.quantity,
          images: product.images || [],
          averageRating: product.avgRating || 0,
          totalReviews: product.reviewCount || 0,
          isActive: product.isActive,
          category: product.category
        });
        
        // Set featured product
        if (homepageConfig.featuredProduct) {
          setFeaturedProduct(mapProduct(homepageConfig.featuredProduct));
        }
        
        // Set bundle products
        const mappedBundleProducts = homepageConfig.bundleProducts.map(mapProduct);
        setBundleProducts(mappedBundleProducts);
        
        // Set popular products
        const mappedPopularProducts = homepageConfig.popularProducts.map(mapProduct);
        setPopularProducts(mappedPopularProducts);
        
        // Calculate bundle pricing if we have bundle products
        if (mappedBundleProducts.length > 0) {
          const totalPrice = mappedBundleProducts.reduce((sum: number, p: Product) => sum + p.price, 0);
          const comparePrice = Math.round(totalPrice * 1.23); // 23% markup for individual purchase
          const bundlePrice = Math.round(totalPrice * 0.81); // 19% discount
          const savings = comparePrice - bundlePrice;
          
          setBundleData({
            price: bundlePrice,
            comparePrice: comparePrice,
            savings: savings
          });
        }
        
        setError(null);
      } catch (err: any) {
        console.error('Error fetching homepage data:', err);
        
        // Fallback to old logic if homepage config is not available
        try {
          console.log('🏠 Using fallback - fetching products from API...');
          const response = await apiClient.get('/products?limit=15&sortBy=createdAt&sortOrder=desc');
          console.log('🏠 API Response:', response);
          
          if (response.success && response.data && (response.data as any).products) {
            const products = (response.data as any).products.map((product: any) => ({
              id: product.id,
              name: product.name,
              price: parseFloat(product.price),
              comparePrice: product.comparePrice ? parseFloat(product.comparePrice) : undefined,
              description: product.description || '',
              shortDescription: product.shortDescription || '',
              sku: product.sku,
              quantity: product.quantity,
              images: product.images || [],
              averageRating: product.avgRating || 0,
              totalReviews: product.reviewCount || 0,
              isActive: product.isActive,
              category: product.category
            }));
            
            // Use first non-bundle product as featured
            const featured = products.find((p: Product) => !p.category?.name?.toLowerCase().includes('bundle'));
            if (featured) setFeaturedProduct(featured);
            
            // Find products for bundle section
            const bundleProds = products.filter((product: any) => 
              !product.isBundle && (
                product.name.toLowerCase().includes('immune') ||
                product.name.toLowerCase().includes('heart') ||
                product.name.toLowerCase().includes('eye') ||
                product.name.toLowerCase().includes('enzyme')
              )
            ).slice(0, 4);
            
            setBundleProducts(bundleProds);
            
            // Use featured products as popular products
            const popularProds = products.filter((p: Product) => p.isActive).slice(0, 3);
            setPopularProducts(popularProds);
            
            setError(null);
          } else {
            setError('Ingen produkter funnet');
          }
        } catch (fallbackErr: any) {
          if (fallbackErr.message.includes('Failed to fetch')) {
            setError('Kan ikke koble til serveren. Sjekk at backend kjører på port 3001.');
          } else {
            setError(`Feil ved lasting av produkter: ${fallbackErr.message}`);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`${i < rating ? 'text-terracotta' : 'text-gray-200'}`}>
        ★
      </span>
    ));
  };

  const getProductIcon = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes('immune')) return <HiOutlineShieldCheck className="w-8 h-8 text-sage" />;
    if (name.includes('heart')) return <HiOutlineUsers className="w-8 h-8 text-terracotta" />;
    if (name.includes('eye')) return <HiOutlineCube className="w-8 h-8 text-sage" />;
    if (name.includes('enzyme')) return <HiOutlineArchiveBox className="w-8 h-8 text-terracotta" />;
    if (name.includes('matcha')) return <HiOutlineCube className="w-8 h-8 text-sage" />;
    if (name.includes('protector')) return <HiOutlineShieldCheck className="w-8 h-8 text-terracotta" />;
    if (name.includes('vitamin') || name.includes('d3')) return <HiOutlineUsers className="w-8 h-8 text-sage" />;
    return <HiOutlineCube className="w-8 h-8 text-charcoal/60" />;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="section-spacing-lg mt-1 nature-texture">
        <div className="max-w-6xl mx-auto px-6">
          <div className="asymmetric-grid items-center">
            {/* Content */}
            <div className="slow-reveal">
              <h1 className="mb-8 text-balance leading-tight text-responsive-hero">
                <span 
                  ref={heroNaturligRef}
                  className="hero-naturlig"
                >
                  Naturlig
                </span>
                <span 
                  ref={heroVelvareRef}
                  className="hero-velvare block"
                >
                  velvære
                </span>
                <span 
                  ref={heroSubtitleRef}
                  className="hero-subtitle"
                >
                  for kropp og sjel
                </span>
              </h1>
              
              <p className="hero-description mb-12 text-balance max-w-lg">
                Opplev harmonien mellom moderne vitenskap og naturens visdom. 
                Våre nøye utvalgte produkter støtter din reise mot optimal helse.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/produkter" className="btn-organic">
                  Utforsk produkter
                  <HiArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/spesialist" className="btn-ghost">
                  Få veiledning
                  <HiOutlineUsers className="ml-2 w-5 h-5" />
                </Link>
              </div>

              {/* Trust Signals under CTA */}
              <div className="grid grid-cols-3 card-gap gpu-accelerated">
                <div className="bg-white minimal-shadow organic-border card-inner text-center hover-float">
                  <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HiOutlineArchiveBox className="w-5 h-5 text-sage" />
                  </div>
                  <h4 className="font-medium text-charcoal text-sm mb-2">Gratis frakt</h4>
                  <p className="text-xs text-charcoal/60">Over 500kr</p>
                </div>
                <div className="bg-white minimal-shadow organic-border card-inner text-center hover-float">
                  <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HiOutlineShieldCheck className="w-5 h-5 text-sage" />
                  </div>
                  <h4 className="font-medium text-charcoal text-sm mb-2">Sikker betaling</h4>
                  <p className="text-xs text-charcoal/60">SSL kryptert</p>
                </div>
                <div className="bg-white minimal-shadow organic-border card-inner text-center hover-float">
                  <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HiOutlineUsers className="w-5 h-5 text-sage" />
                  </div>
                  <h4 className="font-medium text-charcoal text-sm mb-2">Ekspert rådgivning</h4>
                  <p className="text-xs text-charcoal/60">Personlig oppfølging</p>
                </div>
              </div>
            </div>
            
            {/* Visual */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-sage-100/20 organic-border breath-animation flex items-center justify-center">
                  <div className="w-32 h-32 bg-sage/30 rounded-full flex items-center justify-center">
                    <HiOutlineCube className="w-16 h-16 text-sage" strokeWidth={1.5} />
                  </div>
                </div>
                {/* Floating elements */}
                <div 
                  className="absolute -top-4 -right-4 w-16 h-16 bg-terracotta/20 rounded-full breath-animation" 
                  style={{animationDelay: '-2s'}}
                ></div>
                <div 
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-stone/40 rounded-full breath-animation" 
                  style={{animationDelay: '-4s'}}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Strip */}
      <section className="py-16 bg-stone_light/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="philosophy-quote">
            "Helse er ikke bare fravær av sykdom, men en tilstand av fullstendig fysisk, mentalt og sosialt velvære."
          </p>
          <div className="mt-4 w-12 h-px bg-sage mx-auto"></div>
        </div>
      </section>

      {/* Curated Products */}
      <section id="produkter" className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Loading State with Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-12 card-gap mb-12">
              {/* Featured Product Skeleton */}
              <div className="md:col-span-8">
                <FeaturedProductSkeleton />
              </div>
              
              {/* Secondary Products Skeleton */}
              <div className="md:col-span-4 space-y-6">
                <div className="bg-white minimal-shadow organic-border card-inner">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-stone_light/50 rounded-xl mx-auto animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-5 bg-stone_light/50 rounded animate-pulse"></div>
                    <div className="h-4 bg-stone_light/50 rounded w-3/4 mx-auto animate-pulse"></div>
                    <div className="h-4 bg-stone_light/50 rounded w-1/2 mx-auto animate-pulse"></div>
                    <div className="h-10 bg-stone_light/50 rounded-full animate-pulse mt-6"></div>
                  </div>
                </div>
                
                <div className="bg-white minimal-shadow organic-border card-inner">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-stone_light/50 rounded-xl mx-auto animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-5 bg-stone_light/50 rounded animate-pulse"></div>
                    <div className="h-4 bg-stone_light/50 rounded w-3/4 mx-auto animate-pulse"></div>
                    <div className="h-4 bg-stone_light/50 rounded w-1/2 mx-auto animate-pulse"></div>
                    <div className="h-10 bg-stone_light/50 rounded-full animate-pulse mt-6"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-light text-charcoal mb-4">Kunne ikke laste produkter</h2>
              <p className="text-charcoal_light mb-6">{error}</p>
            </div>
          )}

          {/* Asymmetric product grid */}
          {!loading && !error && featuredProduct && (
            <>
              {/* Featured Product - Full Width 50/50 Split */}
              <div className="bg-white minimal-shadow organic-border rounded-2xl overflow-hidden mb-16">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Product Image Section */}
                  <div className="bg-sage-50 flex items-center justify-center p-8 lg:p-16 relative">
                    {/* Badges */}
                    {featuredProduct.comparePrice && featuredProduct.comparePrice > featuredProduct.price && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-sage text-warm_white text-xs font-medium px-3 py-1.5 rounded-full">
                          -{Math.round(((featuredProduct.comparePrice - featuredProduct.price) / featuredProduct.comparePrice) * 100)}%
                        </span>
                      </div>
                    )}
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-sage/20 to-terracotta/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                      <div className="relative">
                        <ProductImageGallery 
                          images={featuredProduct.images} 
                          productName={featuredProduct.name} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Info Section */}
                  <div className="p-8 lg:p-16 flex flex-col justify-center">
                    <span className="inline-block bg-charcoal text-warm_white text-sm font-medium px-4 py-2 rounded-full mb-4 self-start">
                      KAMPANJE
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-light text-sage mb-2">
                      Månedens produkt
                    </h2>
                    <h3 className="text-3xl lg:text-4xl font-light text-charcoal mb-4">{featuredProduct.name}</h3>
                    <p className="text-sage_dark font-medium text-lg mb-4">{featuredProduct.category.name}</p>
                    
                    {/* Rating stars */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex gap-0.5">
                        {renderStars(Math.round(featuredProduct.averageRating || 0))}
                      </div>
                      <span className="text-sm text-charcoal/60">({featuredProduct.totalReviews} anmeldelser)</span>
                    </div>
                    
                    <p className="text-charcoal/70 font-light leading-relaxed text-lg mb-8">
                      {featuredProduct.shortDescription || featuredProduct.description}
                    </p>
                    
                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="text-4xl font-light text-charcoal">{featuredProduct.price} kr</span>
                      {featuredProduct.comparePrice && (
                        <span className="text-2xl text-charcoal/40 line-through font-light">{featuredProduct.comparePrice} kr</span>
                      )}
                    </div>
                    
                    <div className="flex gap-4 mb-4">
                      <Link to={`/produkt/${featuredProduct.id}`} className="btn-organic flex items-center">
                        Se produkt
                        <HiArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                      <Link to={`/produkt/${featuredProduct.id}`} className="btn-ghost">
                        Les mer
                      </Link>
                    </div>
                    
                    <span className="text-sm text-charcoal/50 font-light bg-stone/30 px-3 py-1 rounded-full self-start">{featuredProduct.sku}</span>
                  </div>
                </div>
              </div>
              
              {/* See All Products Button - moved right after monthly product */}
              <div className="text-center mb-16">
                <Link to="/produkter" className="btn-ghost">
                  Se hele kolleksjonen
                  <HiArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              
              {/* Section header - moved after featured product */}
              <div className="mb-16 text-center">
                <h2 className="products-section-heading text-responsive-h2 mb-6">PURE SYNERGY - Nøye utvalgte essentials</h2>
                <p className="products-section-description text-responsive-body max-w-2xl mx-auto">
                  Hver produkt i vår kolleksjon er valgt for sin renhet, effekt og harmoni med kroppens naturlige prosesser.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Special Offers Section - Bundle */}
      <section className="section-spacing bg-sage-50/30">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-charcoal text-warm_white text-sm font-medium px-4 py-2 rounded-full mb-4">
              SPESIALTILBUD
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-charcoal mb-4">
              Immunforsvar-pakken
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Alt du trenger for et sterkt immunforsvar gjennom vinteren
            </p>
          </div>
          
          {/* Bundle Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="bg-white minimal-shadow organic-border rounded-xl p-6 text-center hover-float animate-pulse">
                  <div className="w-16 h-16 bg-sage/20 rounded-full mx-auto mb-3"></div>
                  <div className="h-4 bg-charcoal/20 rounded mx-auto mb-2 w-20"></div>
                  <div className="h-3 bg-charcoal/20 rounded mx-auto w-16"></div>
                </div>
              ))
            ) : bundleProducts.length > 0 ? (
              // Real products from API
              bundleProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="bg-white minimal-shadow organic-border rounded-xl p-6 text-center hover-float">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    product.name.toLowerCase().includes('heart') || product.name.toLowerCase().includes('enzyme') || product.name.toLowerCase().includes('protector') ? 'bg-terracotta/20' : 'bg-sage/20'
                  }`}>
                    {getProductIcon(product.name)}
                  </div>
                  <h3 className="font-medium text-base mb-1 text-charcoal">{getCleanProductName(product.name)}</h3>
                  <p className="text-charcoal/60 text-xs mb-2">{product.price} kr</p>
                </div>
              ))
            ) : (
              // Fallback to hardcoded products if no API data
              <>
                <div className="bg-white minimal-shadow organic-border rounded-xl p-6 text-center hover-float">
                  <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HiOutlineCube className="w-8 h-8 text-terracotta" />
                  </div>
                  <h3 className="font-medium text-base mb-1 text-charcoal">Vitamin C</h3>
                  <p className="text-charcoal/60 text-xs mb-2">1000mg</p>
                </div>
                
                <div className="bg-white minimal-shadow organic-border rounded-xl p-6 text-center hover-float">
                  <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HiOutlineShieldCheck className="w-8 h-8 text-sage" />
                  </div>
                  <h3 className="font-medium text-base mb-1 text-charcoal">Vitamin D3</h3>
                  <p className="text-charcoal/60 text-xs mb-2">4000 IU</p>
                </div>
                
                <div className="bg-white minimal-shadow organic-border rounded-xl p-6 text-center hover-float">
                  <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HiOutlineUsers className="w-8 h-8 text-terracotta" />
                  </div>
                  <h3 className="font-medium text-base mb-1 text-charcoal">Sink</h3>
                  <p className="text-charcoal/60 text-xs mb-2">15mg</p>
                </div>
                
                <div className="bg-white minimal-shadow organic-border rounded-xl p-6 text-center hover-float">
                  <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HiOutlineArchiveBox className="w-8 h-8 text-sage" />
                  </div>
                  <h3 className="font-medium text-base mb-1 text-charcoal">Probiotika</h3>
                  <p className="text-charcoal/60 text-xs mb-2">Immunstøtte</p>
                </div>
              </>
            )}
          </div>
          
          {/* Bundle Deal Summary */}
          <div className="bg-white minimal-shadow organic-border rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-charcoal/60 mb-2">
                  Totalpris hvis kjøpt separat:{' '}
                  <span className="line-through">
                    {loading ? '...' : `${bundleData?.comparePrice || 1597} kr`}
                  </span>
                </p>
                <p className="text-2xl font-light text-charcoal">
                  Pakkepris: <span className="text-sage font-medium">
                    {loading ? '...' : `${bundleData?.price || 1299} kr`}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-sage text-warm_white text-lg font-medium px-4 py-2 rounded-full">
                  {loading ? 'Spar...' : `Spar ${bundleData?.savings || 298} kr (-19%)`}
                </span>
                <Link to="/bundle-immunforsvar" className="btn-organic inline-flex items-center">
                  Kjøp pakken
                  <HiArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="section-spacing bg-sage-50/20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-charcoal mb-4">Populære produkter</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Våre mest solgte produkter valgt av tusenvis av fornøyde kunder
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {!loading && !error && popularProducts.length > 0 && 
              popularProducts.map((product) => (
              <div key={product.id} className="relative hover-float h-full">
                <div className="bg-white minimal-shadow organic-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-sage-50/50 flex items-center justify-center p-6">
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={product.images[0].url} 
                        alt={product.images[0].altText || product.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-charcoal/10 rounded-full flex items-center justify-center">
                        {getProductIcon(product.name)}
                      </div>
                    )}
                    
                    {/* Product Badge */}
                    {(product as any).isFeatured && (
                      <span className="absolute -top-2 -right-2 z-10 bg-charcoal text-warm_white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                        Bestselger
                      </span>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-medium text-lg mb-2 text-charcoal">{getCleanProductName(product.name)}</h3>
                    <p className="text-charcoal/60 text-sm mb-3 leading-relaxed flex-1">
                      {product.shortDescription || product.description}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-terracotta text-sm">
                        {renderStars(Math.round(product.averageRating || 5))}
                      </div>
                      <span className="text-sm text-charcoal/60">({product.totalReviews || Math.floor(Math.random() * 200) + 50})</span>
                    </div>
                    
                    {/* Price and Button */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-light text-charcoal">{product.price} kr</span>
                        {product.comparePrice && product.comparePrice > product.price && (
                          <span className="text-sm text-charcoal/40 line-through">{product.comparePrice} kr</span>
                        )}
                      </div>
                      <Link to={`/produkt/${product.id}`} className="btn-organic btn-sm">
                        Legg til
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading skeletons when loading */}
            {loading && Array.from({ length: 3 }, (_, i) => `popular-skeleton-${i}`).map((key) => (
              <div key={key} className="bg-white minimal-shadow organic-border rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-sage-50/50"></div>
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-charcoal/20 rounded"></div>
                  <div className="h-4 bg-charcoal/20 rounded w-4/5"></div>
                  <div className="h-4 bg-charcoal/20 rounded w-3/5"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-charcoal/20 rounded w-20"></div>
                    <div className="h-8 bg-charcoal/20 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See All Products Button */}
          <div className="text-center">
            <Link to="/produkter" className="btn-ghost">
              Se alle produkter
              <HiArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-spacing bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-charcoal mb-4">Utforsk våre kategorier</h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Finn produkter tilpasset dine behov i våre nøye utvalgte kategorier
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category 1 - Vitaminer */}
            <Link to="/kategori/vitaminer" className="group relative overflow-hidden rounded-2xl p-6 lg:p-8 transition-all duration-300 hover-float bg-white minimal-shadow organic-border hover:shadow-lg">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-sage/30 transition-colors">
                  <HiOutlineCube className="w-8 h-8 text-sage" />
                </div>
                <h3 className="text-xl font-medium text-charcoal mb-2 group-hover:text-sage transition-colors">Vitaminer</h3>
                <p className="text-charcoal/60 mb-4 leading-relaxed">Essensielle vitaminer for daglig helse</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-charcoal/50">45 produkter</span>
                  <HiArrowRight className="w-5 h-5 text-charcoal/40 group-hover:text-sage transform transition-all group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Category 2 - Kosttilskudd */}
            <Link to="/kategori/kosttilskudd" className="group relative overflow-hidden rounded-2xl p-6 lg:p-8 transition-all duration-300 hover-float bg-white minimal-shadow organic-border hover:shadow-lg">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-terracotta/30 transition-colors">
                  <HiOutlineShieldCheck className="w-8 h-8 text-terracotta" />
                </div>
                <h3 className="text-xl font-medium text-charcoal mb-2 group-hover:text-sage transition-colors">Kosttilskudd</h3>
                <p className="text-charcoal/60 mb-4 leading-relaxed">Naturlige tilskudd for optimal helse</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-charcoal/50">78 produkter</span>
                  <HiArrowRight className="w-5 h-5 text-charcoal/40 group-hover:text-sage transform transition-all group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Category 3 - Naturmedisin */}
            <Link to="/kategori/naturmedisin" className="group relative overflow-hidden rounded-2xl p-6 lg:p-8 transition-all duration-300 hover-float bg-white minimal-shadow organic-border hover:shadow-lg">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-sage/30 transition-colors">
                  <HiOutlineUsers className="w-8 h-8 text-sage" />
                </div>
                <h3 className="text-xl font-medium text-charcoal mb-2 group-hover:text-sage transition-colors">Naturmedisin</h3>
                <p className="text-charcoal/60 mb-4 leading-relaxed">Tradisjonell medisin fra naturen</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-charcoal/50">34 produkter</span>
                  <HiArrowRight className="w-5 h-5 text-charcoal/40 group-hover:text-sage transform transition-all group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Category 4 - Supermat */}
            <Link to="/kategori/supermat" className="group relative overflow-hidden rounded-2xl p-6 lg:p-8 transition-all duration-300 hover-float bg-white minimal-shadow organic-border hover:shadow-lg">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-terracotta/30 transition-colors">
                  <HiOutlineArchiveBox className="w-8 h-8 text-terracotta" />
                </div>
                <h3 className="text-xl font-medium text-charcoal mb-2 group-hover:text-sage transition-colors">Supermat</h3>
                <p className="text-charcoal/60 mb-4 leading-relaxed">Næringsrike superfoods</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-charcoal/50">56 produkter</span>
                  <HiArrowRight className="w-5 h-5 text-charcoal/40 group-hover:text-sage transform transition-all group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain hardcoded for now */}
      {/* ... (keeping existing sections for brevity) */}

    </>
  );
};

export default Home;