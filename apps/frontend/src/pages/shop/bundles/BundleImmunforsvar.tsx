import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineMagnifyingGlass,
  HiOutlineShieldCheck,
  HiOutlineStar,
  HiOutlineHeart,
  HiOutlineCheckCircle,
  HiArrowRight,
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineArchiveBox,
  HiOutlineSparkles
} from 'react-icons/hi2';
import api from '../../../services/api';

interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  description: string;
  shortDescription?: string;
  images?: Array<{
    url: string;
    altText?: string;
  }>;
  averageRating?: number;
  totalReviews?: number;
}

interface BundleItem {
  id: string;
  quantity: number;
  product: Product;
}

interface Bundle extends Product {
  isBundle: boolean;
  bundleItems?: BundleItem[];
}

const BundleImmunforsvar: React.FC = () => {
  const [purchaseOption, setPurchaseOption] = useState('subscription');
  const [deliveryFrequency, setDeliveryFrequency] = useState('60');
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [bundleProducts, setBundleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBundleData = async () => {
      try {
        setLoading(true);
        // Try to fetch a real immunforsvar bundle, fall back to immunforsvar-related products
        const response = await api.get('/products?limit=50');
        
        if (response.success && response.data && (response.data as any).products) {
          const products = (response.data as any).products;
          
          // Look for an actual immunforsvar bundle first
          const immunBundle = products.find((p: any) => 
            p.isBundle && p.name.toLowerCase().includes('immun')
          );
          
          if (immunBundle) {
            setBundle({
              id: immunBundle.id,
              name: immunBundle.name,
              price: parseFloat(immunBundle.price),
              comparePrice: immunBundle.comparePrice ? parseFloat(immunBundle.comparePrice) : undefined,
              description: immunBundle.description || '',
              shortDescription: immunBundle.shortDescription || '',
              images: immunBundle.images || [],
              averageRating: immunBundle.avgRating || 4.8,
              totalReviews: immunBundle.reviewCount || 124,
              isBundle: true,
              bundleItems: immunBundle.bundleItems || []
            });
            
            // Set individual products from bundle items
            if (immunBundle.bundleItems && immunBundle.bundleItems.length > 0) {
              setBundleProducts(immunBundle.bundleItems.map((item: any) => item.product));
            }
          } else {
            // Fall back to finding individual immune-related products
            const immunProducts = products.filter((p: any) => 
              !p.isBundle && (
                p.name.toLowerCase().includes('vitamin c') ||
                p.name.toLowerCase().includes('vitamin d') ||
                p.name.toLowerCase().includes('sink') ||
                p.name.toLowerCase().includes('zinc') ||
                p.name.toLowerCase().includes('probiotic') ||
                p.name.toLowerCase().includes('probiotika')
              )
            ).slice(0, 4);
            
            setBundleProducts(immunProducts.map((product: any) => ({
              id: product.id,
              name: product.name,
              price: parseFloat(product.price),
              comparePrice: product.comparePrice ? parseFloat(product.comparePrice) : undefined,
              description: product.description || '',
              shortDescription: product.shortDescription || '',
              images: product.images || [],
              averageRating: product.avgRating || 4.8,
              totalReviews: product.reviewCount || 50
            })));
            
            // Create a virtual bundle from individual products
            const totalPrice = immunProducts.reduce((sum: number, p: any) => sum + parseFloat(p.price), 0);
            const comparePrice = Math.round(totalPrice * 1.23); // 23% markup for individual purchase
            
            setBundle({
              id: 'virtual-immunforsvar',
              name: 'Immunforsvar Pakke',
              price: Math.round(totalPrice * 0.81), // 19% discount
              comparePrice: comparePrice,
              description: 'Spesialisert pakke for å styrke immunforsvaret ditt. Perfekt for høst og vinter, eller når du trenger ekstra støtte for kroppens naturlige forsvar.',
              shortDescription: 'Alt du trenger for et sterkt immunforsvar gjennom vinteren',
              images: [],
              averageRating: 4.8,
              totalReviews: 124,
              isBundle: true,
              bundleItems: []
            });
          }
        } else {
          setError('Kunne ikke laste pakkedata');
        }
      } catch (err: any) {
        console.error('Error fetching bundle data:', err);
        setError('Feil ved lasting av pakkedata');
      } finally {
        setLoading(false);
      }
    };

    fetchBundleData();
  }, []);

  const getProductIcon = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes('vitamin c')) return <HiOutlineCube className="w-8 h-8 text-white" />;
    if (name.includes('vitamin d')) return <HiOutlineShieldCheck className="w-8 h-8 text-white" />;
    if (name.includes('zinc') || name.includes('sink')) return <HiOutlineUsers className="w-8 h-8 text-white" />;
    if (name.includes('probiotic') || name.includes('probiotika')) return <HiOutlineArchiveBox className="w-8 h-8 text-white" />;
    return <HiOutlineCube className="w-8 h-8 text-white" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
      {/* Header */}
      <header className="bg-warm_white border-b-2 border-stone sticky top-0 z-50 minimal-shadow">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/specialist" className="text-sm font-medium text-charcoal/70 hover:text-sage transition-colors">
                Prat med spesialist
              </Link>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="text-2xl font-light text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Helseriet
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/search" className="text-charcoal/70 hover:text-sage transition-colors">
                <HiOutlineMagnifyingGlass className="w-6 h-6" />
              </Link>
              <Link to="/logg-inn" className="text-charcoal/70 hover:text-sage transition-colors">
                <HiOutlineUser className="w-6 h-6" />
              </Link>
              <Link to="/handlekurv" className="text-charcoal/70 hover:text-sage transition-colors relative">
                <HiOutlineShoppingBag className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-sage text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Seasonal Banner */}
      <div className="bg-gradient-to-r from-terracotta/20 to-sage/20 py-4 text-center">
        <p className="text-sm font-medium text-charcoal flex items-center justify-center gap-2">
          Vinterpakke: Ekstra viktig å støtte immunforsvaret i kalde måneder!
        </p>
      </div>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <ol className="flex items-center space-x-3 text-sm">
          <li><Link to="/" className="text-charcoal/60 hover:text-sage transition-colors">Hjem</Link></li>
          <li className="text-charcoal/40">/</li>
          <li><Link to="/bundles" className="text-charcoal/60 hover:text-sage transition-colors">Helsepakker</Link></li>
          <li className="text-charcoal/40">/</li>
          <li className="text-charcoal font-medium">Immunforsvar Pakke</li>
        </ol>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 zen-spacing">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-sage to-sage_dark rounded-xl p-12 mb-12 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">Immunforsvar</span>
                <span className="bg-terracotta text-white px-4 py-2 rounded-full text-sm font-medium">Spar 19%</span>
              </div>
              <h1 className="text-5xl font-light mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                {loading ? 'Laster...' : bundle?.name || 'Immunforsvar Pakke'}
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                {loading ? 'Laster produktinformasjon...' : (bundle?.description || 'Spesialisert pakke for å styrke immunforsvaret ditt. Perfekt for høst og vinter, eller når du trenger ekstra støtte for kroppens naturlige forsvar.')}
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex text-terracotta">
                    <HiOutlineStar className="w-5 h-5 fill-current" />
                    <HiOutlineStar className="w-5 h-5 fill-current" />
                    <HiOutlineStar className="w-5 h-5 fill-current" />
                    <HiOutlineStar className="w-5 h-5 fill-current" />
                    <HiOutlineStar className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-white/80 text-sm">({bundle?.totalReviews || 124} anmeldelser)</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <HiOutlineCheckCircle className="w-5 h-5" />
                  <span className="text-sm">På lager</span>
                </div>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-light" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  {loading ? '...' : `${bundle?.price || 1299} kr`}
                </span>
                {bundle?.comparePrice && (
                  <>
                    <span className="text-2xl text-white/60 line-through">{bundle.comparePrice} kr</span>
                    <span className="bg-terracotta/20 text-terracotta px-3 py-1 rounded-full font-medium">
                      Spar {bundle.comparePrice - bundle.price} kr
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-4">
              {loading ? (
                // Loading skeletons
                Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="bg-white/20 rounded-xl p-6 text-center hover-float animate-pulse">
                    <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-3"></div>
                    <div className="h-4 bg-white/30 rounded mx-auto mb-2 w-20"></div>
                    <div className="h-3 bg-white/20 rounded mx-auto w-16"></div>
                  </div>
                ))
              ) : bundleProducts.length > 0 ? (
                // Real products from API
                bundleProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="bg-white/20 rounded-xl p-6 text-center hover-float">
                    <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      {getProductIcon(product.name)}
                    </div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-white/80">{product.price} kr</p>
                  </div>
                ))
              ) : (
                // Fallback to hardcoded products if no API data
                <>
                  <div className="bg-white/20 rounded-xl p-6 text-center hover-float">
                    <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <HiOutlineCube className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-medium">Vitamin C</h3>
                    <p className="text-sm text-white/80">1000mg</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-6 text-center hover-float">
                    <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <HiOutlineShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-medium">Vitamin D3</h3>
                    <p className="text-sm text-white/80">4000 IU</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-6 text-center hover-float">
                    <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <HiOutlineUsers className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-medium">Sink</h3>
                    <p className="text-sm text-white/80">15mg</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-6 text-center hover-float">
                    <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <HiOutlineArchiveBox className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-medium">Probiotika</h3>
                    <p className="text-sm text-white/80">Immunstøtte</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Purchase Options */}
        <div className="bg-white organic-border minimal-shadow p-8 mb-12">
          <h2 className="text-2xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Velg kjøpsalternativ
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div 
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover-float ${
                purchaseOption === 'onetime' ? 'border-sage bg-sage/5' : 'border-stone hover:border-sage/50'
              }`}
              onClick={() => setPurchaseOption('onetime')}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium text-charcoal">Engangskjøp</h3>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  purchaseOption === 'onetime' ? 'border-sage bg-sage' : 'border-stone'
                }`}>
                  {purchaseOption === 'onetime' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>
              <div className="text-3xl font-light text-charcoal mb-3" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                {bundle?.price || 1299} kr
              </div>
              <p className="text-sm text-charcoal/70">Kjøp en gang, ingen binding</p>
            </div>

            <div 
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover-float ${
                purchaseOption === 'subscription' ? 'border-sage bg-sage/5' : 'border-stone hover:border-sage/50'
              }`}
              onClick={() => setPurchaseOption('subscription')}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium text-charcoal">Immunforsvar Abonnement</h3>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  purchaseOption === 'subscription' ? 'border-sage bg-sage' : 'border-stone'
                }`}>
                  {purchaseOption === 'subscription' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-3xl font-light text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  {bundle ? Math.round(bundle.price * 0.9) : 1169} kr
                </span>
                <span className="text-lg text-charcoal/50 line-through">{bundle?.price || 1299} kr</span>
                <span className="bg-sage/10 text-sage px-3 py-1 rounded-full text-xs font-medium">Spar 10%</span>
              </div>
              <p className="text-sm text-charcoal/70 mb-4">Leveres hver {deliveryFrequency}. dag</p>
              <select 
                className="w-full px-4 py-3 border border-stone rounded-xl text-sm focus:outline-none focus:border-sage transition-colors"
                value={deliveryFrequency}
                onChange={(e) => setDeliveryFrequency(e.target.value)}
              >
                <option value="60">Hver 60. dag (anbefalt)</option>
                <option value="30">Hver 30. dag</option>
                <option value="90">Hver 90. dag</option>
              </select>
              <div className="mt-4 text-xs text-charcoal/60 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-sage rounded-full"></div>
                  <span>Sesongbasert justering (høst/vinter fokus)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-sage rounded-full"></div>
                  <span>Gratis immunforsvar-guide</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-sage rounded-full"></div>
                  <span>Påminnelser om ekstra støtte i forkjølsessesongen</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button className="btn-organic flex-1">
              Styrk immunforsvaret ditt
            </button>
            <button className="btn-ghost p-4">
              <HiOutlineHeart className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* How Immune System Works */}
        <div className="bg-gradient-to-r from-sage/10 to-terracotta/10 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Hvordan virker immunforsvaret?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineShieldCheck className="w-10 h-10 text-sage" />
              </div>
              <h3 className="text-xl font-medium text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Første forsvarslinje
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                Hud, slimhinner og naturlige barrierer som hindrer virus og bakterier
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineUsers className="w-10 h-10 text-terracotta" />
              </div>
              <h3 className="text-xl font-medium text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Adaptiv respons
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                Hvite blodlegemer som lærer å gjenkjenne og bekjempe trusler
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineSparkles className="w-10 h-10 text-sage" />
              </div>
              <h3 className="text-xl font-medium text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Cellereperasjon
              </h3>
              <p className="text-charcoal/70 leading-relaxed">
                Reparerer skader og bygger opp igjen sterke forsvar
              </p>
            </div>
          </div>
        </div>

        {/* Seasonal Support */}
        <div className="bg-white organic-border minimal-shadow p-8 mb-12">
          <h2 className="text-2xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Sesongbasert immunstøtte
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-terracotta pl-6">
              <h3 className="text-xl font-medium text-terracotta mb-4">
                Høst (september-november)
              </h3>
              <ul className="space-y-3 text-charcoal/70">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2 flex-shrink-0"></div>
                  <span>Øk vitamin D-inntaket når sollyset avtar</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ekstra vitamin C når skolen starter</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2 flex-shrink-0"></div>
                  <span>Probiotika for tarmhelse</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sink for rask helbredelse</span>
                </li>
              </ul>
            </div>
            <div className="border-l-4 border-sage pl-6">
              <h3 className="text-xl font-medium text-sage mb-4">
                Vinter (desember-februar)
              </h3>
              <ul className="space-y-3 text-charcoal/70">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                  <span>Maksimal vitamin D for mørke måneder</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                  <span>Daglig vitamin C under forkjølsessesongen</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                  <span>Probiotika for sterk tarmhelse</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sink ved første tegn til sykdom</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="bg-white organic-border minimal-shadow p-8 mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-light text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Kundevurderinger
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex text-terracotta">
                <HiOutlineStar className="w-5 h-5 fill-current" />
                <HiOutlineStar className="w-5 h-5 fill-current" />
                <HiOutlineStar className="w-5 h-5 fill-current" />
                <HiOutlineStar className="w-5 h-5 fill-current" />
                <HiOutlineStar className="w-5 h-5 fill-current" />
              </div>
              <span className="text-sm text-charcoal/60">4.8 (124 anmeldelser)</span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="border-b border-stone pb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-medium text-charcoal">Karin J.</span>
                <div className="flex text-terracotta text-sm">
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm text-charcoal/50">1 måned siden</span>
              </div>
              <p className="text-charcoal/80 leading-relaxed">
                "Har brukt dette siden oktober og har ikke blitt syk en eneste gang!
                Vanligvis blir jeg forkjølet minst 2-3 ganger i løpet av høsten og vinteren."
              </p>
            </div>
            <div className="border-b border-stone pb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-medium text-charcoal">Ove S.</span>
                <div className="flex text-terracotta text-sm">
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm text-charcoal/50">2 uker siden</span>
              </div>
              <p className="text-charcoal/80 leading-relaxed">
                "Kjempefornøyd med denne pakken. Følte meg slapp og ble ofte syk, men nå har jeg mye mer energi.
                Abonnementsløsningen gjør det enkelt å huske på."
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-medium text-charcoal">Astrid M.</span>
                <div className="flex text-terracotta text-sm">
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                  <HiOutlineStar className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm text-charcoal/50">3 uker siden</span>
              </div>
              <p className="text-charcoal/80 leading-relaxed">
                "Perfekt for barnefamilier! Hele familien bruker dette, og vi merker stor forskjell.
                Barna er sjeldnere syke, og jeg slipper så mye sykedager."
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white organic-border minimal-shadow p-8">
          <h2 className="text-2xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Andre helsepakker
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/bundle-starter-pakke" className="block group">
              <div className="border-2 border-stone rounded-xl p-6 hover:border-sage/50 transition-all duration-300 hover-float">
                <div className="flex items-center gap-6">
                  <div className="bg-gradient-to-r from-sage/20 to-terracotta/20 rounded-xl p-4">
                    <HiOutlineShieldCheck className="w-8 h-8 text-sage" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-charcoal mb-2 group-hover:text-sage transition-colors">
                      Starter Helsepakke
                    </h3>
                    <p className="text-sm text-charcoal/60 mb-3">Grunnleggende helsestøtte for nybegynnere</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-light" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>949 kr</span>
                      <span className="text-sm text-charcoal/50 line-through">1.217 kr</span>
                      <span className="text-terracotta text-sm font-medium">Spar 268 kr</span>
                    </div>
                  </div>
                  <HiArrowRight className="w-6 h-6 text-charcoal/40 group-hover:text-sage transition-colors" />
                </div>
              </div>
            </Link>
            <Link to="/bundle-premium-helse" className="block group">
              <div className="border-2 border-stone rounded-xl p-6 hover:border-sage/50 transition-all duration-300 hover-float">
                <div className="flex items-center gap-6">
                  <div className="bg-gradient-to-r from-terracotta/20 to-sage/20 rounded-xl p-4">
                    <HiOutlineSparkles className="w-8 h-8 text-terracotta" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-charcoal mb-2 group-hover:text-sage transition-colors">
                      Premium Helsepakke
                    </h3>
                    <p className="text-sm text-charcoal/60 mb-3">Avansert helsestøtte med premium ingredienser</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-light" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>1.899 kr</span>
                      <span className="text-sm text-charcoal/50 line-through">2.547 kr</span>
                      <span className="text-terracotta text-sm font-medium">Spar 648 kr</span>
                    </div>
                  </div>
                  <HiArrowRight className="w-6 h-6 text-charcoal/40 group-hover:text-sage transition-colors" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BundleImmunforsvar;