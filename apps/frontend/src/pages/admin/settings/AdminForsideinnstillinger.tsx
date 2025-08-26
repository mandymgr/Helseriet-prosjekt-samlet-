import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  HiOutlineCube,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineArchiveBox,
  HiOutlineTrash
} from 'react-icons/hi2';
import { homepageApi } from '../../../services/homepageApi';

interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  images?: Array<{
    url: string;
    altText?: string;
  }>;
  isFeatured: boolean;
  isBundle: boolean;
}

interface HomepageConfig {
  featuredProduct?: Product;
  bundleProducts: Product[];
  popularProducts: Product[];
  categories: {
    name: string;
    slug: string;
    description: string;
    productCount: number;
  }[];
}

const AdminForsideinnstillinger: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [config, setConfig] = useState<HomepageConfig>({
    bundleProducts: [],
    popularProducts: [],
    categories: [
      { name: 'Vitaminer', slug: 'vitaminer', description: 'Essensielle vitaminer for daglig helse', productCount: 45 },
      { name: 'Kosttilskudd', slug: 'kosttilskudd', description: 'Naturlige tilskudd for optimal helse', productCount: 78 },
      { name: 'Naturmedisin', slug: 'naturmedisin', description: 'Tradisjonell medisin fra naturen', productCount: 34 },
      { name: 'Supermat', slug: 'supermat', description: 'Næringsrike superfoods', productCount: 56 }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('featured');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch products
        const productsResponse = await fetch('http://localhost:3001/api/products?limit=50');
        const productsData = await productsResponse.json();
        
        if (productsData.success && productsData.data?.products) {
          const mappedProducts = productsData.data.products.map((product: any) => ({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            comparePrice: product.comparePrice ? parseFloat(product.comparePrice) : undefined,
            images: product.images || [],
            isFeatured: product.isFeatured || false,
            isBundle: product.isBundle || false
          }));
          setProducts(mappedProducts);
        }

        // Fetch homepage configuration
        try {
          const homepageConfig = await homepageApi.getConfig();
          setConfig({
            featuredProduct: homepageConfig.featuredProduct,
            bundleProducts: homepageConfig.bundleProducts,
            popularProducts: homepageConfig.popularProducts,
            categories: homepageConfig.categoriesConfig
          });
        } catch (configError) {
          console.log('No homepage config found, using defaults');
          // Set default config based on current data if no saved config exists
          if (productsData.success && productsData.data?.products) {
            const mappedProducts = productsData.data.products.map((product: any) => ({
              id: product.id,
              name: product.name,
              price: parseFloat(product.price),
              comparePrice: product.comparePrice ? parseFloat(product.comparePrice) : undefined,
              images: product.images || [],
              isFeatured: product.isFeatured || false,
              isBundle: product.isBundle || false
            }));
            
            const featured = mappedProducts.find((p: Product) => p.isFeatured && !p.isBundle);
            const bundleProds = mappedProducts.filter((p: Product) => !p.isBundle).slice(0, 4);
            const popularProds = mappedProducts.filter((p: Product) => !p.isBundle && p.isFeatured).slice(0, 3);
            
            setConfig(prev => ({
              ...prev,
              featuredProduct: featured,
              bundleProducts: bundleProds,
              popularProducts: popularProds.length > 0 ? popularProds : mappedProducts.filter((p: Product) => !p.isBundle).slice(0, 3)
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToBundleProducts = (product: Product) => {
    if (config.bundleProducts.length < 4 && !config.bundleProducts.find(p => p.id === product.id)) {
      setConfig(prev => ({
        ...prev,
        bundleProducts: [...prev.bundleProducts, product]
      }));
    }
  };

  const removeFromBundleProducts = (productId: string) => {
    setConfig(prev => ({
      ...prev,
      bundleProducts: prev.bundleProducts.filter(p => p.id !== productId)
    }));
  };

  const addToPopularProducts = (product: Product) => {
    if (config.popularProducts.length < 3 && !config.popularProducts.find(p => p.id === product.id)) {
      setConfig(prev => ({
        ...prev,
        popularProducts: [...prev.popularProducts, product]
      }));
    }
  };

  const removeFromPopularProducts = (productId: string) => {
    setConfig(prev => ({
      ...prev,
      popularProducts: prev.popularProducts.filter(p => p.id !== productId)
    }));
  };

  const setFeaturedProduct = (product: Product) => {
    setConfig(prev => ({
      ...prev,
      featuredProduct: product
    }));
  };

  const saveConfiguration = async () => {
    try {
      setLoading(true);
      
      await homepageApi.updateConfig({
        featuredProductId: config.featuredProduct?.id || null,
        bundleProducts: config.bundleProducts.map(p => p.id),
        popularProducts: config.popularProducts.map(p => p.id),
        categoriesConfig: config.categories
      });
      
      alert('Forsidekonfigurasjon lagret!');
    } catch (error) {
      console.error('Error saving configuration:', error);
      alert('Feil ved lagring av konfigurasjon. Prøv igjen.');
    } finally {
      setLoading(false);
    }
  };

  const getProductIcon = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes('immune')) return <HiOutlineShieldCheck className="w-6 h-6 text-sage" />;
    if (name.includes('heart')) return <HiOutlineUsers className="w-6 h-6 text-terracotta" />;
    if (name.includes('eye')) return <HiOutlineCube className="w-6 h-6 text-sage" />;
    if (name.includes('enzyme')) return <HiOutlineArchiveBox className="w-6 h-6 text-terracotta" />;
    return <HiOutlineCube className="w-6 h-6 text-charcoal/60" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage mx-auto mb-4"></div>
          <p className="text-charcoal">Laster produkter...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-light text-charcoal">Admin Dashboard</h1>
              <span className="text-gray-400">|</span>
              <span className="text-sage font-medium">Forsideinnstillinger</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-charcoal/70 hover:text-sage transition-colors">
                Til forsiden
              </Link>
              <Link to="/admin-dashboard" className="btn-ghost">
                Tilbake til admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-light text-charcoal mb-2">Konfigurer forsiden</h2>
          <p className="text-charcoal/70">Velg hvilke produkter som skal vises i de ulike seksjonene på forsiden</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex space-x-1 p-1">
            {[
              { id: 'featured', label: 'Månedens produkt', icon: '⭐' },
              { id: 'bundle', label: 'Bundle-seksjon', icon: '📦' },
              { id: 'popular', label: 'Populære produkter', icon: '🔥' },
              { id: 'categories', label: 'Kategorier', icon: '📋' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === tab.id 
                    ? 'bg-sage text-white' 
                    : 'text-charcoal/70 hover:text-charcoal hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Featured Product Section */}
            {activeSection === 'featured' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-medium text-charcoal mb-4">Månedens produkt</h3>
                <p className="text-charcoal/70 mb-6">Velg produktet som skal fremheves øverst på forsiden</p>
                
                {config.featuredProduct && (
                  <div className="bg-sage-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-charcoal mb-2">Valgt produkt:</h4>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-sage/20 rounded-lg flex items-center justify-center">
                        {getProductIcon(config.featuredProduct.name)}
                      </div>
                      <div>
                        <p className="font-medium text-charcoal">{config.featuredProduct.name}</p>
                        <p className="text-sm text-charcoal/60">{config.featuredProduct.price} kr</p>
                      </div>
                      <button
                        onClick={() => setConfig(prev => ({ ...prev, featuredProduct: undefined }))}
                        className="ml-auto text-red-600 hover:text-red-700 p-2"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.filter(p => !p.isBundle).slice(0, 8).map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:border-sage/50 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-sage/20 rounded-lg flex items-center justify-center">
                          {getProductIcon(product.name)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-charcoal text-sm">{product.name.replace('SYNERGY - ', '')}</h4>
                          <p className="text-xs text-charcoal/60">{product.price} kr</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setFeaturedProduct(product)}
                        className="w-full btn-ghost btn-sm"
                        disabled={config.featuredProduct?.id === product.id}
                      >
                        {config.featuredProduct?.id === product.id ? 'Valgt' : 'Velg som måndens produkt'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bundle Products Section */}
            {activeSection === 'bundle' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-medium text-charcoal mb-4">Bundle-seksjon produkter</h3>
                <p className="text-charcoal/70 mb-6">Velg opptil 4 produkter som skal vises i bundle-seksjonen (maks 4)</p>
                
                {config.bundleProducts.length > 0 && (
                  <div className="bg-sage-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-charcoal mb-3">Valgte produkter ({config.bundleProducts.length}/4):</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {config.bundleProducts.map((product) => (
                        <div key={product.id} className="flex items-center gap-2 bg-white rounded-lg p-3">
                          <div className="w-8 h-8 bg-sage/20 rounded flex items-center justify-center">
                            {getProductIcon(product.name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-charcoal text-sm truncate">{product.name.replace('SYNERGY - ', '')}</p>
                            <p className="text-xs text-charcoal/60">{product.price} kr</p>
                          </div>
                          <button
                            onClick={() => removeFromBundleProducts(product.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.filter(p => !p.isBundle && !config.bundleProducts.find(bp => bp.id === p.id)).slice(0, 8).map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:border-sage/50 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-sage/20 rounded-lg flex items-center justify-center">
                          {getProductIcon(product.name)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-charcoal text-sm">{product.name.replace('SYNERGY - ', '')}</h4>
                          <p className="text-xs text-charcoal/60">{product.price} kr</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToBundleProducts(product)}
                        className="w-full btn-ghost btn-sm"
                        disabled={config.bundleProducts.length >= 4}
                      >
                        {config.bundleProducts.length >= 4 ? 'Maks 4 produkter' : 'Legg til i bundle'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Products Section */}
            {activeSection === 'popular' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-medium text-charcoal mb-4">Populære produkter</h3>
                <p className="text-charcoal/70 mb-6">Velg 3 produkter som skal vises som populære produkter</p>
                
                {config.popularProducts.length > 0 && (
                  <div className="bg-sage-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-charcoal mb-3">Valgte produkter ({config.popularProducts.length}/3):</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {config.popularProducts.map((product) => (
                        <div key={product.id} className="flex items-center gap-3 bg-white rounded-lg p-3">
                          <div className="w-10 h-10 bg-sage/20 rounded-lg flex items-center justify-center">
                            {getProductIcon(product.name)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-charcoal">{product.name.replace('SYNERGY - ', '')}</p>
                            <p className="text-sm text-charcoal/60">{product.price} kr</p>
                          </div>
                          <button
                            onClick={() => removeFromPopularProducts(product.id)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <HiOutlineTrash className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.filter(p => !p.isBundle && !config.popularProducts.find(pp => pp.id === p.id)).slice(0, 8).map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:border-sage/50 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-sage/20 rounded-lg flex items-center justify-center">
                          {getProductIcon(product.name)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-charcoal text-sm">{product.name.replace('SYNERGY - ', '')}</h4>
                          <p className="text-xs text-charcoal/60">{product.price} kr</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToPopularProducts(product)}
                        className="w-full btn-ghost btn-sm"
                        disabled={config.popularProducts.length >= 3}
                      >
                        {config.popularProducts.length >= 3 ? 'Maks 3 produkter' : 'Legg til som populær'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Section */}
            {activeSection === 'categories' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-medium text-charcoal mb-4">Kategorier</h3>
                <p className="text-charcoal/70 mb-6">Rediger kategoriene som vises på forsiden</p>
                
                <div className="space-y-4">
                  {config.categories.map((category, index) => (
                    <div key={category.slug} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-1">Kategorinavn</label>
                          <input
                            type="text"
                            value={category.name}
                            onChange={(e) => {
                              const newCategories = [...config.categories];
                              newCategories[index].name = e.target.value;
                              setConfig(prev => ({ ...prev, categories: newCategories }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-1">Slug</label>
                          <input
                            type="text"
                            value={category.slug}
                            onChange={(e) => {
                              const newCategories = [...config.categories];
                              newCategories[index].slug = e.target.value;
                              setConfig(prev => ({ ...prev, categories: newCategories }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-1">Antall produkter</label>
                          <input
                            type="number"
                            value={category.productCount}
                            onChange={(e) => {
                              const newCategories = [...config.categories];
                              newCategories[index].productCount = parseInt(e.target.value) || 0;
                              setConfig(prev => ({ ...prev, categories: newCategories }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-charcoal mb-1">Beskrivelse</label>
                        <input
                          type="text"
                          value={category.description}
                          onChange={(e) => {
                            const newCategories = [...config.categories];
                            newCategories[index].description = e.target.value;
                            setConfig(prev => ({ ...prev, categories: newCategories }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-medium text-charcoal mb-4">Forhåndsvisning</h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-charcoal mb-2">Månedens produkt:</h4>
                  {config.featuredProduct ? (
                    <p className="text-charcoal/70">{config.featuredProduct.name.replace('SYNERGY - ', '')}</p>
                  ) : (
                    <p className="text-charcoal/50 italic">Ikke valgt</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-charcoal mb-2">Bundle-produkter ({config.bundleProducts.length}/4):</h4>
                  {config.bundleProducts.length > 0 ? (
                    <ul className="text-charcoal/70 space-y-1">
                      {config.bundleProducts.map(product => (
                        <li key={product.id}>• {product.name.replace('SYNERGY - ', '')}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-charcoal/50 italic">Ingen produkter valgt</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-charcoal mb-2">Populære produkter ({config.popularProducts.length}/3):</h4>
                  {config.popularProducts.length > 0 ? (
                    <ul className="text-charcoal/70 space-y-1">
                      {config.popularProducts.map(product => (
                        <li key={product.id}>• {product.name.replace('SYNERGY - ', '')}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-charcoal/50 italic">Ingen produkter valgt</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-charcoal mb-2">Kategorier:</h4>
                  <ul className="text-charcoal/70 space-y-1">
                    {config.categories.map(category => (
                      <li key={category.slug}>• {category.name} ({category.productCount})</li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={saveConfiguration}
                className="w-full bg-sage text-white py-3 rounded-lg font-medium hover:bg-sage_dark transition-colors mt-6"
              >
                Lagre konfigurasjonen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForsideinnstillinger;