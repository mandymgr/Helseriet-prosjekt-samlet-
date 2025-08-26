import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { closeNewProductModal, searchRelatedProducts, openNewProductModal, addIngredientRow, fetchProducts, deleteProductById } from '../../../utils/adminFunctions';
import type { Product } from '../../../services/api';

export default function AdminProdukter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: '',
    sort: 'name'
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productList = await fetchProducts();
      setProducts(productList);
      setError(null);
    } catch (err) {
      setError('Feil ved lasting av produkter');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (confirm(`Er du sikker på at du vil slette "${productName}"?`)) {
      const success = await deleteProductById(productId);
      if (success) {
        await loadProducts(); // Reload products
      }
    }
  };

  const handleSearchRelatedProducts = () => {
    const results = searchRelatedProducts(searchTerm);
    console.log('Search results:', results);
  };

  const filteredProducts = products.filter(product => {
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category && product.category?.name !== filters.category) {
      return false;
    }
    return true;
  });

  const formatPrice = (price: number) => {
    return `Kr ${price.toFixed(0)}`;
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { text: 'Utsolgt', color: 'text-red-600', icon: '🚫' };
    if (quantity < 10) return { text: 'Lavt', color: 'text-yellow-600', icon: '⚠️' };
    return { text: 'På lager', color: 'text-green-600', icon: '✅' };
  };
  return (
    <div>
      <header className="bg-black text-white border-b-2 border-gray-200">
      <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
      <h1 className="text-2xl font-bold">Helsekost Admin</h1>
      <span className="text-gray-400">|</span>
      <span className="text-gray-300">Produkter</span>
      </div>
      <div className="flex items-center space-x-6">
      <Link to="/hjemmeside-svart-hvitt" className="text-gray-300 hover:text-white transition-colors duration-200">
      🌐 Til nettbutikk
      </Link>
      <button onClick={() => { alert('Admin profil - kommer snart!') }} className="text-gray-300 hover:text-white transition-colors duration-200">
      👤 Admin Bruker
      </button>
      <button onClick={() => { if(confirm('Er du sikker på at du vil logge ut?')) window.location.href='helsekost-hjemmeside-svart-hvitt.html' }} className="btn-secondary btn-small">
      Logg ut
      </button>
      </div>
      </div>
      </div>
      </header>
      <div className="flex">
      <aside className="w-64 bg-white shadow-md min-h-screen">
      <nav className="p-4">
      <ul className="space-y-2">
      <li>
      <Link to="/admin-dashboard" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      🏠 Dashboard
      </Link>
      </li>
      <li>
      <Link to="/admin-produkter" className="sidebar-link active block p-3 rounded">
      📦 Produkter
      </Link>
      </li>
      <li>
      <Link to="/admin-ordrer" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      🛒 Ordrer
      </Link>
      </li>
      <li>
      <Link to="/admin-kunder" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      👥 Kunder
      </Link>
      </li>
      <li>
      <Link to="/admin-blogg" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      📝 Blogg
      </Link>
      </li>
      <li>
      <Link to="/admin-kampanjer" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      🎯 Kampanjer
      </Link>
      </li>
      <li>
      <Link to="/admin-annonser" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      📢 Annonser
      </Link>
      </li>
      <li>
      <Link to="/admin-analyser" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      📊 Analyser
      </Link>
      </li>
      <li>
      <Link to="/admin-ekspertrad" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      💬 Ekspertråd
      </Link>
      </li>
      <li>
      <Link to="/admin-rapport" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      📈 Rapporter
      </Link>
      </li>
      <li>
      <Link to="/admin-innstillinger" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      ⚙️ Innstillinger
      </Link>
      </li>
      </ul>
      </nav>
      </aside>
      <main className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
      <div>
      <h2 className="text-3xl font-bold text-gray-800">Produktadministrasjon</h2>
      <p className="text-gray-600 mt-2">Administrer produkter, lager, tilbud og forsideutstilling</p>
      </div>
      <button onClick={() => { openNewProductModal() }} className="btn-primary">
      ➕ Legg til nytt produkt
      </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Søk</label>
      <input 
        type="text" 
        placeholder="Søk etter produkt..." 
        className="input-standard" 
        value={filters.search}
        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
      />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
      <select 
        name="category" 
        className="input-standard"
        value={filters.category}
        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
      >
        <option value="">Alle kategorier</option>
        {[...new Set(products.map(p => p.category?.name))].map(categoryName => (
          <option key={categoryName} value={categoryName}>{categoryName}</option>
        ))}
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
      <select name="status" className="input-standard">
      <option>Alle</option>
      <option>På lager</option>
      <option>Lavt lager</option>
      <option>Utsolgt</option>
      <option>På tilbud</option>
      <option>Fremhevet</option>
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Sorter etter</label>
      <select name="sort" className="input-standard">
      <option>Navn (A-Å)</option>
      <option>Navn (Å-A)</option>
      <option>Pris (lav-høy)</option>
      <option>Pris (høy-lav)</option>
      <option>Lager (lav-høy)</option>
      <option>Sist oppdatert</option>
      </select>
      </div>
      </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
      <span className="text-gray-600">⚡</span>
      <span className="font-medium">Hurtighandlinger:</span>
      <button onClick={() => { alert('Masseredigering - velg produkter og rediger flere samtidig') }} className="text-black hover:text-gray-600 hover:underline transition-colors duration-200">Masseredigering</button>
      <span className="text-gray-400">|</span>
      <button onClick={() => { alert('Importer produkter fra CSV/Excel - kommer snart!') }} className="text-black hover:text-gray-600 hover:underline transition-colors duration-200">Importer produkter</button>
      <span className="text-gray-400">|</span>
      <button onClick={() => { alert('Eksporterer produktliste til CSV...') }} className="text-black hover:text-gray-600 hover:underline transition-colors duration-200">Eksporter liste</button>
      </div>
      <div className="text-sm text-gray-600">
      Viser {filteredProducts.length} produkter
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
      <thead className="bg-gray-50">
      <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <input type="checkbox" className="rounded" />
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Produkt
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Kategori
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Innkjøpspris
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Salgspris
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Lager
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Tilbud
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Forside
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Handlinger
      </th>
      </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
      {loading ? (
        <tr>
          <td colSpan={9} className="px-6 py-8 text-center">
            <div className="text-gray-500">Laster produkter...</div>
          </td>
        </tr>
      ) : error ? (
        <tr>
          <td colSpan={9} className="px-6 py-8 text-center">
            <div className="text-red-500">{error}</div>
            <button onClick={loadProducts} className="mt-2 btn-secondary btn-small">
              Prøv igjen
            </button>
          </td>
        </tr>
      ) : filteredProducts.length === 0 ? (
        <tr>
          <td colSpan={9} className="px-6 py-8 text-center">
            <div className="text-gray-500">Ingen produkter funnet</div>
          </td>
        </tr>
      ) : (
        filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.quantity || 0);
          return (
            <tr key={product.id} className="product-row hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-200 rounded mr-3">
                    {product.images?.[0] ? (
                      <img src={product.images[0].url} alt={product.images[0].altText || product.name} className="h-10 w-10 rounded object-cover" />
                    ) : (
                      <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">📦</div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.category?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{formatPrice(Number(product.price))}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatPrice(Number(product.price))}</div>
                {product.comparePrice && (
                  <div className="text-sm text-gray-500 line-through">{formatPrice(Number(product.comparePrice))}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className={`font-medium ${stockStatus.color}`}>{product.quantity || 0}</span>
                  <span className="ml-2 text-xs">{stockStatus.icon} {stockStatus.text}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked={product.isFeatured} />
                  <span className="slider"></span>
                </label>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked={product.isActive ?? true} />
                  <span className="slider"></span>
                </label>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  onClick={() => alert(`Redigerer ${product.name}...`)} 
                  className="text-black hover:text-gray-600 mr-3 transition-colors duration-200"
                >
                  Rediger
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product.id, product.name)} 
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Slett
                </button>
              </td>
            </tr>
          );
        })
      )}
      </tbody>
      </table>
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
      <button onClick={() => { alert('Går til forrige side...') }} className="btn-secondary btn-small">
      Forrige
      </button>
      <button onClick={() => { alert('Går til neste side...') }} className="ml-3 btn-secondary btn-small">
      Neste
      </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
      <p className="text-sm text-gray-700">
      Viser <span className="font-medium">1</span> til <span className="font-medium">{Math.min(10, filteredProducts.length)}</span> av
      <span className="font-medium">{filteredProducts.length}</span> resultater
      </p>
      </div>
      <div>
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
      <button onClick={() => { alert('Går til forrige side...') }} className="relative inline-flex items-center px-2 py-2 rounded-l-md border-2 border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
      ←
      </button>
      <button onClick={() => { alert('Går til side 1') }} className="relative inline-flex items-center px-4 py-2 border-2 border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
      1
      </button>
      <button onClick={() => { alert('Går til side 2') }} className="relative inline-flex items-center px-4 py-2 border-2 border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
      2
      </button>
      <button onClick={() => { alert('Går til side 3') }} className="relative inline-flex items-center px-4 py-2 border-2 border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
      3
      </button>
      <span className="relative inline-flex items-center px-4 py-2 border-2 border-gray-300 bg-white text-sm font-medium text-gray-700">
      ...
      </span>
      <button onClick={() => { alert('Går til side 16') }} className="relative inline-flex items-center px-4 py-2 border-2 border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
      16
      </button>
      <button onClick={() => { alert('Går til neste side...') }} className="relative inline-flex items-center px-2 py-2 rounded-r-md border-2 border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
      →
      </button>
      </nav>
      </div>
      </div>
      </div>
      </div>
      </main>
      </div>
      <div id="newProductModal" className="modal">
      <div className="bg-white rounded-lg border-2 border-gray-300 shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
      <div className="p-6 border-b">
      <h3 className="text-2xl font-bold">Legg til nytt produkt</h3>
      <button onClick={closeNewProductModal} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
      ✕
      </button>
      </div>
      <div className="p-6">
      <form className="space-y-6">
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Grunnleggende informasjon</h3>
      <div className="grid grid-cols-2 gap-6">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Produktnavn *</label>
      <input type="text" className="input-standard" required={true} placeholder="F.eks. Vitamin D3+K2 5000 IU" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
      <input type="text" className="input-standard" required={true} placeholder="F.eks. VD3K2-5000" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Kort beskrivelse *</label>
      <textarea rows={3} className="input-standard" style={{height: 'auto'}} required={true} placeholder="Høydose vitamin D3 kombinert med K2 for optimal absorpsjon og utnyttelse. Perfekt for den norske vinteren!"></textarea>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
      <select className="input-standard" required={true}>
      <option value="active">Aktiv</option>
      <option value="draft">Utkast</option>
      <option value="inactive">Inaktiv</option>
      </select>
      </div>
      </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">🏷️ Kategorisering</h3>
      <div className="grid grid-cols-2 gap-6">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Primær kategori * <span className="text-xs text-gray-500">(Hovedkategori for produktet)</span></label>
      <select className="input-standard" required={true} id="primaryCategory">
      <option value="">Velg primær kategori</option>
      <option value="vitaminer">Vitaminer</option>
      <option value="mineraler">Mineraler</option>
      <option value="kosttilskudd">Kosttilskudd</option>
      <option value="naturmedisin">Naturmedisin</option>
      <option value="probiotika">Probiotika</option>
      <option value="omega-fettsyrer">Omega &amp; Fettsyrer</option>
      <option value="sport-trening">Sport &amp; Trening</option>
      <option value="immunforsvar">Immunforsvar</option>
      <option value="sovn-stress">Søvn &amp; Stressmestring</option>
      <option value="hjernehelse">Hjernehelse</option>
      <option value="hjertehelse">Hjertehelse</option>
      <option value="fordoyelse">Fordøyelse</option>
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Sekundære kategorier <span className="text-xs text-gray-500">(Valgfritt - produktet vises også her)</span></label>
      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded p-3 bg-white">
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="vitaminer" />
      <span>Vitaminer</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="mineraler" />
      <span>Mineraler</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="kosttilskudd" />
      <span>Kosttilskudd</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="naturmedisin" />
      <span>Naturmedisin</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="probiotika" />
      <span>Probiotika</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="omega-fettsyrer" />
      <span>Omega &amp; Fettsyrer</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="sport-trening" />
      <span>Sport &amp; Trening</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="immunforsvar" />
      <span>Immunforsvar</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="sovn-stress" />
      <span>Søvn &amp; Stressmestring</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="hjernehelse" />
      <span>Hjernehelse</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="hjertehelse" />
      <span>Hjertehelse</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="fordoyelse" />
      <span>Fordøyelse</span>
      </label>
      </div>
      </div>
      </div>
      <div className="mt-6 p-4 bg-white border rounded-lg">
      <h4 className="font-medium text-gray-800 mb-2">👁️ Kategori-preview</h4>
      <div id="categoryPreview" className="text-sm text-gray-600">
      <p className="mb-2"><strong>Primær kategori:</strong> <span id="primaryPreview" className="text-gray-400">Ingen valgt</span></p>
      <p><strong>Sekundære kategorier:</strong> <span id="secondaryPreview" className="text-gray-400">Ingen valgt</span></p>
      <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
      <strong>Produktet vil vises i:</strong>
      <div id="categoryDisplay" className="mt-1 text-gray-500">Velg kategorier for å se hvor produktet vises</div>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">💰 Priser og lager</h3>
      <div className="grid grid-cols-3 gap-6">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Innkjøpspris (NOK) *</label>
      <input type="number" className="input-standard" required={true} placeholder="149" step="0.01" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Salgspris (NOK) *</label>
      <input type="number" className="input-standard" required={true} placeholder="349" step="0.01" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Tilbudspris (NOK)</label>
      <input type="number" className="input-standard" placeholder="299" step="0.01" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Lagerbeholdning *</label>
      <input type="number" className="input-standard" required={true} placeholder="50" min="0" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Lavlager-varsel</label>
      <input type="number" className="input-standard" placeholder="10" min="0" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Enhet</label>
      <select className="input-standard">
      <option>stk</option>
      <option>gram</option>
      <option>kg</option>
      <option>liter</option>
      <option>ml</option>
      </select>
      </div>
      </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">📷 Produktbilder</h3>
      <div className="grid grid-cols-2 gap-6">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Hovedbilde *</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-black transition-colors duration-200">
      <button type="button" onClick={() => { alert('Fil-velger åpnes for hovedbilde...') }} className="text-black hover:text-gray-600 transition-colors duration-200">
      📷 Last opp hovedbilde
      </button>
      <p className="text-sm text-gray-500 mt-2">Anbefalt størrelse: 800x800px</p>
      </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail-bilder</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-black transition-colors duration-200">
      <button type="button" onClick={() => { alert('Fil-velger åpnes for thumbnail-bilder...') }} className="text-black hover:text-gray-600 transition-colors duration-200">
      🖼️ Last opp thumbnails
      </button>
      <p className="text-sm text-gray-500 mt-2">Maks 4 bilder, 400x400px</p>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">📝 Detaljert produktinformasjon</h3>
      <div className="space-y-6">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivelse *</label>
      <textarea rows={4} className="input-standard" style={{height: 'auto'}} required={true} placeholder="Detaljert produktbeskrivelse som vises i beskrivelse-fanen..."></textarea>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Helsemessige fordeler</label>
      <textarea rows={4} className="input-standard" style={{height: 'auto'}} placeholder="Liste opp de viktigste helsemessige fordelene ved produktet..."></textarea>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Kvalitetssertifiseringer</label>
      <div className="grid grid-cols-3 gap-4">
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="kvalitetsgaranti" />
      <span>Kvalitetsgaranti</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="laboratorietestet" />
      <span>Laboratorietestet</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="naturlig" />
      <span>Naturlig</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="glutenfri" />
      <span>Glutenfri</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="vegansk" />
      <span>Vegansk</span>
      </label>
      <label className="flex items-center text-sm">
      <input type="checkbox" className="mr-2 rounded" value="gmo-fri" />
      <span>GMO-fri</span>
      </label>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">🧪 Ingredienser og næringsinnhold</h3>
      <div className="space-y-6">
      <div id="ingredientsContainer">
      <label className="block text-sm font-medium text-gray-700 mb-2">Ingredienser per dose</label>
      <div className="space-y-3">
      <div className="ingredient-row grid grid-cols-4 gap-3">
      <input type="text" className="input-standard" placeholder="Ingrediens navn" />
      <input type="text" className="input-standard" placeholder="Mengde" />
      <input type="text" className="input-standard" placeholder="Enhet" />
      <input type="text" className="input-standard" placeholder="% RDI" />
      </div>
      </div>
      <button type="button" onClick={() => { addIngredientRow() }} className="mt-3 btn-secondary btn-small">
      + Legg til ingrediens
      </button>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Andre ingredienser</label>
      <textarea rows={2} className="input-standard" style={{height: 'auto'}} placeholder="Mikrokrystallinsk cellulose, vegetabilsk kapsel (HPMC), magnesiumstearat..."></textarea>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Fri for (allergener)</label>
      <textarea rows={2} className="input-standard" style={{height: 'auto'}} placeholder="Gluten, melk, soya, gjær, sukker, salt, kunstige fargestoffer og konserveringsmidler..."></textarea>
      </div>
      </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">📝 Bruksanvisning</h3>
      <div className="space-y-6">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Anbefalt dosering *</label>
      <textarea rows={2} className="input-standard" style={{height: 'auto'}} required={true} placeholder="1 kapsel daglig med mat, eller etter anvisning fra helsepersonell."></textarea>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Tips for best effekt</label>
      <textarea rows={3} className="input-standard" style={{height: 'auto'}} placeholder="Ta kapselen sammen med et fettrikt måltid for bedre opptak..."></textarea>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Oppbevaringsinstruksjoner</label>
      <textarea rows={2} className="input-standard" style={{height: 'auto'}} placeholder="Oppbevares tørt og kjølig, utilgjengelig for barn."></textarea>
      </div>
      </div>
      </div>
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-yellow-800 mb-4">⚠️ Advarsler og kontraindikasjoner</h3>
      <div className="space-y-6">
      <div>
      <label className="block text-sm font-medium text-yellow-700 mb-2">Generelle advarsler</label>
      <textarea rows={3} className="input-standard" style={{height: 'auto'}} placeholder="Anbefalt daglig dose bør ikke overskrides. Kosttilskudd bør ikke brukes som erstatning for en variert kost..."></textarea>
      </div>
      <div>
      <label className="block text-sm font-medium text-yellow-700 mb-2">Kontraindikasjoner</label>
      <textarea rows={2} className="input-standard" style={{height: 'auto'}} placeholder="Konsulter lege før bruk hvis du er gravid, ammer eller tar medisiner..."></textarea>
      </div>
      <div>
      <label className="block text-sm font-medium text-yellow-700 mb-2">Bivirkninger</label>
      <textarea rows={2} className="input-standard" style={{height: 'auto'}} placeholder="Sjeldne bivirkninger kan inkludere..."></textarea>
      </div>
      </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">🔍 SEO-innstillinger</h3>
      <div className="space-y-6">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Meta-tittel</label>
      <input type="text" className="input-standard" placeholder="Vitamin D3+K2 5000 IU - Helsekost" maxLength={60} />
      <p className="text-xs text-gray-500 mt-1">Maks 60 tegn. Vises i Google-søkeresultater.</p>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Meta-beskrivelse</label>
      <textarea rows={3} className="input-standard" style={{height: 'auto'}} placeholder="Høydose vitamin D3 kombinert med K2 for optimal absorpsjon. Perfekt for nordiske forhold. Fri frakt over 500kr." maxLength={160}></textarea>
      <p className="text-xs text-gray-500 mt-1">Maks 160 tegn. Vises under tittelen i Google-søkeresultater.</p>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Søkeord (kommaseparert)</label>
      <input type="text" className="input-standard" placeholder="vitamin d3, vitamin k2, kosttilskudd, immunforsvar, beinhelse" />
      </div>
      </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">🛍️ Kjøpsalternativer</h3>
      <div className="space-y-6">
      <div className="border rounded-lg p-4 bg-white">
      <h4 className="font-medium mb-3">Salgsalternativer</h4>
      <div className="space-y-3">
      <label className="flex items-center">
      <input type="checkbox" className="mr-2 rounded" checked={true} />
      <span className="text-sm font-medium">Tillat enkeltkjøp</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" className="mr-2 rounded" onChange={(e) => console.log('Subscription toggled:', e.target.checked)} />
      <span className="text-sm font-medium">Tillat abonnement</span>
      </label>
      <div id="subscriptionOptions" className="ml-6 space-y-2 hidden">
      <div className="grid grid-cols-2 gap-4">
      <div>
      <label className="block text-xs text-gray-600">Abonnementspris (NOK)</label>
      <input type="number" className="w-full px-3 py-1 border-2 border-gray-300 rounded focus:border-black focus:outline-none" placeholder="F.eks. 178" />
      </div>
      <div>
      <label className="block text-xs text-gray-600">Rabatt %</label>
      <input type="number" className="w-full px-3 py-1 border-2 border-gray-300 rounded focus:border-black focus:outline-none" placeholder="F.eks. 15" />
      </div>
      </div>
      <div>
      <label className="block text-xs text-gray-600">Leveringsfrekvens</label>
      <select className="w-full px-3 py-1 border-2 border-gray-300 rounded text-sm focus:border-black focus:outline-none">
      <option>Hver måned</option>
      <option>Hver 2. måned</option>
      <option>Hver 3. måned</option>
      <option>Hver 6. måned</option>
      </select>
      </div>
      </div>
      </div>
      </div>
      <div className="border rounded-lg p-4 bg-white">
      <h4 className="font-medium mb-3">Pakkepriser</h4>
      <div className="space-y-2">
      <div className="grid grid-cols-3 gap-4">
      <div>
      <label className="block text-xs text-gray-600">3-pack pris</label>
      <input type="number" className="w-full px-3 py-1 border-2 border-gray-300 rounded focus:border-black focus:outline-none" placeholder="F.eks. 564" />
      </div>
      <div>
      <label className="block text-xs text-gray-600">6-pack pris</label>
      <input type="number" className="w-full px-3 py-1 border-2 border-gray-300 rounded focus:border-black focus:outline-none" placeholder="F.eks. 1066" />
      </div>
      <div>
      <label className="block text-xs text-gray-600">12-pack pris</label>
      <input type="number" className="w-full px-3 py-1 border-2 border-gray-300 rounded focus:border-black focus:outline-none" placeholder="F.eks. 2099" />
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">🔗 Relaterte produkter</h3>
      <div className="space-y-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Velg relaterte produkter</label>
      <div className="flex gap-2 mb-2">
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 input-standard" 
        placeholder="Søk etter produkter..." 
        id="relatedProductSearch" 
      />
      <button type="button" className="btn-secondary btn-small" onClick={handleSearchRelatedProducts}>🔍 Søk</button>
      </div>
      <div id="relatedProductsList" className="space-y-2 max-h-32 overflow-y-auto">
      </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Valgte relaterte produkter</label>
      <div id="selectedRelatedProducts" className="space-y-2 min-h-[60px] border border-gray-300 rounded p-3 bg-white">
      <p className="text-sm text-gray-500">Ingen produkter valgt</p>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">🎁 Bundle-anbefalinger</h3>
      <div className="space-y-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Velg eksisterende bundles</label>
      <div className="space-y-2">
      <label className="flex items-center p-3 border rounded hover:bg-gray-100">
      <input type="checkbox" className="mr-3 rounded" value="starter-helsepakke" />
      <div className="flex-1">
      <div className="font-medium">Starter Helsepakke</div>
      <div className="text-sm text-gray-600">Vitamin D3+K2, Multivitamin, Omega-3 - Spar 22%</div>
      </div>
      <span className="text-sm font-medium">949 kr</span>
      </label>
      <label className="flex items-center p-3 border rounded hover:bg-gray-100">
      <input type="checkbox" className="mr-3 rounded" value="immunforsvar-pakke" />
      <div className="flex-1">
      <div className="font-medium">Immunforsvar Pakke</div>
      <div className="text-sm text-gray-600">Vitamin D3+K2, Vitamin C, Sink - Spar 18%</div>
      </div>
      <span className="text-sm font-medium">799 kr</span>
      </label>
      </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Eller opprett ny bundle</label>
      <div className="grid grid-cols-2 gap-4">
      <input type="text" className="input-standard" placeholder="Bundle navn" />
      <input type="number" className="input-standard" placeholder="Rabatt %" />
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Produktspesifikasjoner</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
      <label className="block text-sm font-medium mb-1">Produktvekt</label>
      <input type="text" className="input-standard" placeholder="85g" />
      </div>
      <div>
      <label className="block text-sm font-medium mb-1">Produsent/Merke</label>
      <input type="text" className="input-standard" placeholder="Nordic Marine" />
      </div>
      <div>
      <label className="block text-sm font-medium mb-1">Holdbarhet (måneder)</label>
      <input type="number" className="input-standard" placeholder="24" />
      </div>
      <div>
      <label className="block text-sm font-medium mb-1">Dimensjoner (L×B×H)</label>
      <input type="text" className="input-standard" placeholder="10×5×15 cm" />
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Levering og frakt</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
      <label className="block text-sm font-medium mb-1">Leveringstid</label>
      <select className="input-standard">
      <option>2-4 virkedager</option>
      <option>1-2 virkedager</option>
      <option>5-7 virkedager</option>
      <option>Spesialbestilling</option>
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium mb-1">Frakttype</label>
      <select className="input-standard">
      <option>Standard</option>
      <option>Ekspressleveranse</option>
      <option>Temperaturkontrollert</option>
      <option>Spesialfrakt</option>
      </select>
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Produktvariasjoner</h3>
      <div className="space-y-4">
      <div>
      <label className="flex items-center">
      <input type="checkbox" className="mr-2" id="hasVariants" onChange={(e) => console.log('Variants toggled:', e.target.checked)} />
      <span>Har størrelsesvarianter</span>
      </label>
      </div>
      <div id="size-variants" className="hidden">
      <label className="block text-sm font-medium mb-1">Tilgjengelige størrelser</label>
      <div className="flex gap-2">
      <label><input type="checkbox" className="mr-1" /> 30 kapsler</label>
      <label><input type="checkbox" className="mr-1" /> 60 kapsler</label>
      <label><input type="checkbox" className="mr-1" /> 90 kapsler</label>
      <label><input type="checkbox" className="mr-1" /> 120 kapsler</label>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">⭐ Anmeldelser og rating</h3>
      <div className="space-y-4">
      <div className="grid grid-cols-2 gap-6">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Gjennomsnittlig rating</label>
      <div className="flex items-center gap-2">
      <input type="number" className="w-16 input-standard" placeholder="4.8" min="0" max="5" step="0.1" />
      <span className="text-sm text-gray-600">av 5 stjerner</span>
      </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Antall anmeldelser</label>
      <input type="number" className="input-standard" placeholder="234" min="0" />
      </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Tillat anmeldelser</label>
      <div className="flex items-center space-x-4">
      <label className="flex items-center">
      <input type="radio" name="reviewsAllowed" value="yes" className="mr-2" checked={true} />
      <span className="text-sm">Ja</span>
      </label>
      <label className="flex items-center">
      <input type="radio" name="reviewsAllowed" value="no" className="mr-2" />
      <span className="text-sm">Nei</span>
      </label>
      </div>
      </div>
      </div>
      </div>
      <div className="flex items-center space-x-6">
      <label className="flex items-center">
      <input type="checkbox" className="mr-2 rounded" />
      <span className="text-sm font-medium">Vis på forsiden</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" className="mr-2 rounded" />
      <span className="text-sm font-medium">Aktiver tilbud</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" className="mr-2 rounded" checked={true} />
      <span className="text-sm font-medium">Publiser umiddelbart</span>
      </label>
      </div>
      <div className="flex justify-end space-x-4 pt-6 border-t">
      <button type="button" onClick={closeNewProductModal} className="btn-secondary">
      Avbryt
      </button>
      <button type="submit" onClick={(e) => { e.preventDefault(); alert('Produkt lagret!'); closeNewProductModal(); }} className="btn-primary">
      Lagre produkt
      </button>
      </div>
      </form>
      </div>
      </div>
      </div>
    </div>
  );
}