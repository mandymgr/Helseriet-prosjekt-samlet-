import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { HiOutlineArchiveBox } from 'react-icons/hi2';

interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  images?: Array<{
    url: string;
    altText?: string;
  }>;
}

interface BundleItem {
  id: string;
  quantity: number;
  product: Product;
}

interface Bundle extends Product {
  isBundle: boolean;
  shortDescription?: string;
  bundleItems?: BundleItem[];
}

const Bundles: React.FC = () => {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products?limit=50');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Filter only bundle products
        const bundleProducts = data.data.products.filter((product: Bundle) => product.isBundle);
        setBundles(bundleProducts);
      } catch (err) {
        console.error('Error fetching bundles:', err);
        setError('Kunne ikke laste inn pakker. Prøv igjen senere.');
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, []);

  const calculateSavings = (originalPrice: number, bundlePrice: number) => {
    const savings = originalPrice - bundlePrice;
    const percentage = Math.round((savings / originalPrice) * 100);
    return { savings, percentage };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream py-32">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage mx-auto mb-4"></div>
              <p className="text-charcoal">Laster pakker...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream py-32">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl font-light text-charcoal mb-4">Pakker</h1>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-charcoal mb-6">
            Pakketilbud
          </h1>
          <p className="text-lg text-charcoal/80 max-w-2xl mx-auto">
            Spar penger med våre nøye sammensatte pakker. Hver pakke er designet for å gi deg 
            optimale helsefordeler til en redusert pris.
          </p>
        </div>

        {/* Bundles Grid */}
        {bundles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bundles.map((bundle) => {
              const frontImage = bundle.images && bundle.images.length > 0 ? bundle.images[0] : null;
              const savings = bundle.comparePrice ? calculateSavings(bundle.comparePrice, bundle.price) : null;

              return (
                <div 
                  key={bundle.id} 
                  className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Bundle Image */}
                  <div className="aspect-square bg-cream p-8 relative overflow-hidden">
                    {savings && (
                      <div className="absolute top-4 right-4 bg-sage text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                        Spar {savings.percentage}%
                      </div>
                    )}
                    {frontImage ? (
                      <img
                        src={frontImage.url}
                        alt={frontImage.altText || bundle.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-sage-50 rounded-2xl">
                        <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center">
                          <HiOutlineArchiveBox className="w-10 h-10 text-sage" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bundle Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-light text-charcoal mb-2 group-hover:text-sage_dark transition-colors">
                      {bundle.name.replace('SYNERGY - ', '')}
                    </h3>
                    
                    {bundle.shortDescription && (
                      <p className="text-charcoal/70 text-sm mb-4 line-clamp-2">
                        {bundle.shortDescription}
                      </p>
                    )}

                    {/* Pricing */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-medium text-charcoal">
                        {bundle.price} kr
                      </span>
                      {bundle.comparePrice && (
                        <>
                          <span className="text-lg text-charcoal/50 line-through">
                            {bundle.comparePrice} kr
                          </span>
                          {savings && (
                            <span className="bg-sage/10 text-sage text-sm px-2 py-1 rounded-full font-medium">
                              -{savings.savings} kr
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/produkt/${bundle.id}`}
                      className="block w-full text-center bg-sage text-white py-3 rounded-2xl hover:bg-sage_dark transition-all duration-250 font-medium"
                    >
                      Se pakke
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-sm p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineArchiveBox className="w-8 h-8 text-sage" />
              </div>
              <h3 className="text-xl font-light text-charcoal mb-2">Ingen pakker tilgjengelig</h3>
              <p className="text-charcoal/70">Vi jobber med å lage nye pakketilbud for deg.</p>
            </div>
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-light text-charcoal mb-6">Hvorfor velge våre pakker?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-sage/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-medium text-charcoal mb-2">Spar penger</h3>
                <p className="text-charcoal/70 text-sm">Få mer verdi for pengene med våre pakkerabatter</p>
              </div>
              <div className="text-center">
                <div className="bg-sage/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-medium text-charcoal mb-2">Ekspertutvalg</h3>
                <p className="text-charcoal/70 text-sm">Nøye sammensatte produkter for optimal effekt</p>
              </div>
              <div className="text-center">
                <div className="bg-sage/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-charcoal mb-2">Rask start</h3>
                <p className="text-charcoal/70 text-sm">Alt du trenger for å komme i gang med din helsereise</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bundles;