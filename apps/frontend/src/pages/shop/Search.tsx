import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';

interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  description?: string;
  shortDescription?: string;
  isBundle?: boolean;
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

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3001/api/products?limit=1000');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      const allProducts = Array.isArray(data.data) ? data.data : (data.data.products || []);
      
      const filteredProducts = allProducts.filter((product: Product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.description || '').toLowerCase().includes(query.toLowerCase()) ||
        (product.shortDescription || '').toLowerCase().includes(query.toLowerCase())
      );
      
      setProducts(filteredProducts);
    } catch (err) {
      console.error('Search error:', err);
      setError('Kunne ikke utføre søket. Prøv igjen senere.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      <section className="page-header">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-responsive-h1 text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Søk i produkter
            </h1>
            <p className="text-responsive-body text-charcoal/70 mb-8">
              Finn akkurat det du leter etter i vårt store utvalg
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-4xl mx-auto px-6">
          <form onSubmit={handleSearch} className="bg-white minimal-shadow organic-border card-inner">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Søk etter produkter, ingredienser eller kategorier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border border-stone_light rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-250"
                autoFocus
              />
              <button
                type="submit"
                className="btn-primary px-8 py-3"
                disabled={loading}
              >
                {loading ? 'Søker...' : 'Søk'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          {searchParams.get('q') && (
            <div className="mb-8">
              <h2 className="text-responsive-h2 text-charcoal mb-4">
                Søkeresultater for "{searchParams.get('q')}"
              </h2>
              <p className="text-charcoal/70">
                {products.length === 0 
                  ? 'Ingen produkter funnet'
                  : `${products.length} ${products.length === 1 ? 'produkt' : 'produkter'} funnet`
                }
              </p>
            </div>
          )}

          {products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white organic-border minimal-shadow hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square bg-cream p-6">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].altText || product.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
                        <span className="text-gray-400">Ingen bilde</span>
                      </div>
                    )}
                  </div>
                  <div className="card-inner">
                    <h3 className="text-lg font-light text-charcoal mb-2 line-clamp-2">
                      {product.name.replace(/^(SYNERGY|ORGANIXX) - /, '')}
                    </h3>
                    <div className="text-xl font-medium text-charcoal mb-3">
                      {product.price} kr
                    </div>
                    <Link
                      to={`/produkt/${product.id}`}
                      className="btn-ghost w-full text-center text-sm font-medium"
                    >
                      Se produkt
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!searchParams.get('q') && (
            <div className="text-center py-16">
              <h3 className="text-responsive-h3 text-charcoal mb-2">Klar for å søke?</h3>
              <p className="text-responsive-body text-charcoal/70">
                Skriv inn hva du leter etter i søkefeltet ovenfor.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Search;