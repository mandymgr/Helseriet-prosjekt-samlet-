import React, { useState } from 'react';
import { Link } from 'react-router';
import { 
  HiHome,
  HiShoppingBag, 
  HiShoppingCart,
  HiUser,
  HiCog6Tooth,
  HiDocument,
  HiGlobeAlt,
  HiWrenchScrewdriver,
  HiMagnifyingGlass,
  HiOutlineEye,
  HiOutlineQrCode,
  HiOutlineClipboard
} from 'react-icons/hi2';

interface PageInfo {
  path: string;
  name: string;
  description: string;
  status: 'complete' | 'partial' | 'placeholder';
  category: string;
  icon: React.ComponentType<any>;
}

const DevIndex: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const pages: PageInfo[] = [
    // Content Pages
    { path: '/', name: 'Hjem', description: 'Hovedside med hero, featured products og kategorier', status: 'complete', category: 'content', icon: HiHome },
    { path: '/om-oss', name: 'Om Oss', description: 'Bedriftsinformasjon og verdier', status: 'complete', category: 'content', icon: HiGlobeAlt },
    { path: '/kontakt', name: 'Kontakt', description: 'Kontaktinformasjon og -skjema', status: 'complete', category: 'content', icon: HiUser },
    { path: '/faq', name: 'FAQ', description: 'Ofte stilte spørsmål', status: 'complete', category: 'content', icon: HiDocument },
    { path: '/blog', name: 'Blog', description: 'Bloggindeks med artikler', status: 'complete', category: 'content', icon: HiDocument },
    { path: '/blog/artikkel-1', name: 'Blog Artikkel', description: 'Eksempel bloggartikkel', status: 'complete', category: 'content', icon: HiDocument },

    // Shop Pages
    { path: '/produkter', name: 'Produkter', description: 'Produktkatalog med søk og filter', status: 'complete', category: 'shop', icon: HiShoppingBag },
    { path: '/kosttilskudd', name: 'Kosttilskudd', description: 'Bundles og enkeltprodukter for SYNERGY/ORGANIXX', status: 'complete', category: 'shop', icon: HiShoppingBag },
    { path: '/yoga-wellness', name: 'Yoga & Wellness', description: 'SHAKTI produkter med kategorifilter', status: 'complete', category: 'shop', icon: HiShoppingBag },
    { path: '/kategorier', name: 'Kategorier', description: 'Kategoriindeks', status: 'complete', category: 'shop', icon: HiShoppingBag },
    { path: '/produkt/test-produkt', name: 'Produktdetaljer', description: 'Enkeltprodukt med bilder og beskrivelse', status: 'complete', category: 'shop', icon: HiShoppingBag },

    // Cart & Checkout
    { path: '/handlekurv', name: 'Handlekurv', description: 'Handlekurv med produkter og kvantitet', status: 'complete', category: 'cart', icon: HiShoppingCart },
    { path: '/kasse', name: 'Kasse', description: 'Checkout med leveringsinformasjon', status: 'complete', category: 'cart', icon: HiShoppingCart },
    { path: '/betaling', name: 'Betaling', description: 'Betalingsskjema (Stripe/Vipps/Klarna)', status: 'partial', category: 'cart', icon: HiShoppingCart },
    { path: '/ordrebekreftelse', name: 'Ordrebekreftelse', description: 'Bekreftelse etter fullført kjøp', status: 'complete', category: 'cart', icon: HiShoppingCart },

    // Auth Pages
    { path: '/logg-inn', name: 'Logg Inn', description: 'Brukerpålogging', status: 'complete', category: 'auth', icon: HiUser },
    { path: '/registrer', name: 'Registrer', description: 'Ny brukerregistrering', status: 'complete', category: 'auth', icon: HiUser },

    // Bundle Pages
    { path: '/bundles/premium-helse', name: 'Premium Helse Bundle', description: 'Spesifikk bundle-side', status: 'complete', category: 'bundles', icon: HiShoppingBag },
    { path: '/bundles/starter-pakke', name: 'Starter Pakke Bundle', description: 'Spesifikk bundle-side', status: 'complete', category: 'bundles', icon: HiShoppingBag },

    // Marketing Pages
    { path: '/philosophy', name: 'Filosofi', description: 'Bedriftens filosofi og tilnærming', status: 'complete', category: 'marketing', icon: HiGlobeAlt },
    { path: '/specialist', name: 'Spesialist', description: 'Ekspertpresentasjon', status: 'complete', category: 'marketing', icon: HiUser },

    // Legal Pages
    { path: '/vilkar', name: 'Vilkår', description: 'Salgsvilkår og betingelser', status: 'complete', category: 'legal', icon: HiDocument },
    { path: '/personvern', name: 'Personvern', description: 'Personvernerklæring og GDPR', status: 'complete', category: 'legal', icon: HiDocument },
    { path: '/cookies', name: 'Cookies', description: 'Cookie-policy', status: 'complete', category: 'legal', icon: HiDocument },
    { path: '/retur', name: 'Retur', description: 'Returbetingelser', status: 'complete', category: 'legal', icon: HiDocument },
    { path: '/frakt', name: 'Frakt', description: 'Fraktinformasjon og priser', status: 'complete', category: 'legal', icon: HiDocument },

    // Admin Pages
    { path: '/admin', name: 'Admin Dashboard', description: 'Hovedadmin-oversikt', status: 'complete', category: 'admin', icon: HiCog6Tooth },
    { path: '/admin/login', name: 'Admin Login', description: 'Admin pålogging', status: 'complete', category: 'admin', icon: HiCog6Tooth },
    { path: '/admin/produkter', name: 'Admin Produkter', description: 'Produktadministrasjon', status: 'complete', category: 'admin', icon: HiCog6Tooth },
    { path: '/admin/ordrer', name: 'Admin Ordrer', description: 'Ordrebehandling', status: 'complete', category: 'admin', icon: HiCog6Tooth },
    { path: '/admin/kunder', name: 'Admin Kunder', description: 'Kundeadministrasjon', status: 'complete', category: 'admin', icon: HiCog6Tooth },
    { path: '/admin/innstillinger', name: 'Admin Innstillinger', description: 'Systeminnstillinger', status: 'complete', category: 'admin', icon: HiCog6Tooth },
    { path: '/admin/blogg-rediger', name: 'Admin Blogg', description: 'Bloggredigering', status: 'partial', category: 'admin', icon: HiCog6Tooth },
    { path: '/admin/annonser', name: 'Admin Annonser', description: 'Annonsehåndtering', status: 'complete', category: 'admin', icon: HiCog6Tooth },
    { path: '/admin/ekspertrad', name: 'Admin Ekspertråd', description: 'Ekspertråd administrasjon', status: 'complete', category: 'admin', icon: HiCog6Tooth },

    // Development Pages
    { path: '/utviklersystem', name: 'Utviklersystem', description: 'Komplett designsystem og dokumentasjon', status: 'complete', category: 'dev', icon: HiWrenchScrewdriver },
    { path: '/dev-index', name: 'Dev Index', description: 'Denne siden - utviklingsindeks', status: 'complete', category: 'dev', icon: HiOutlineQrCode },
  ];

  const categories = [
    { id: 'all', name: 'Alle Sider', count: pages.length, color: 'slate' },
    { id: 'content', name: 'Innholdssider', count: pages.filter(p => p.category === 'content').length, color: 'sage' },
    { id: 'shop', name: 'E-commerce', count: pages.filter(p => p.category === 'shop').length, color: 'terracotta' },
    { id: 'cart', name: 'Handlekurv & Checkout', count: pages.filter(p => p.category === 'cart').length, color: 'blue' },
    { id: 'auth', name: 'Autentisering', count: pages.filter(p => p.category === 'auth').length, color: 'purple' },
    { id: 'bundles', name: 'Bundle-sider', count: pages.filter(p => p.category === 'bundles').length, color: 'green' },
    { id: 'marketing', name: 'Markedsføring', count: pages.filter(p => p.category === 'marketing').length, color: 'orange' },
    { id: 'legal', name: 'Juridisk', count: pages.filter(p => p.category === 'legal').length, color: 'gray' },
    { id: 'admin', name: 'Admin Panel', count: pages.filter(p => p.category === 'admin').length, color: 'red' },
    { id: 'dev', name: 'Utvikling', count: pages.filter(p => p.category === 'dev').length, color: 'indigo' },
  ];

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         page.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'placeholder': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'complete': return 'Ferdig';
      case 'partial': return 'Delvis';
      case 'placeholder': return 'Placeholder';
      default: return 'Ukjent';
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
      {/* Header */}
      <div className="bg-charcoal text-warm_white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light mb-2" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Frontend Sideindeks
              </h1>
              <p className="text-warm_white/80">
                Navigasjon og oversikt over alle {pages.length} frontend-sider i Helseriet.no
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="px-4 py-2 bg-sage hover:bg-sage_dark text-warm_white rounded-lg transition-colors flex items-center"
              >
                <HiHome className="w-4 h-4 mr-2" />
                Til Hovedside
              </Link>
              <Link 
                to="/utviklersystem" 
                className="px-4 py-2 bg-terracotta hover:bg-terracotta/80 text-warm_white rounded-lg transition-colors flex items-center"
              >
                <HiWrenchScrewdriver className="w-4 h-4 mr-2" />
                Utviklersystem
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 bg-warm_white organic-border minimal-shadow p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal/50" />
                <input
                  type="text"
                  placeholder="Søk i sider..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-stone_light rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-stone_light rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-warm_white organic-border minimal-shadow p-4 text-center">
            <div className="text-2xl font-bold text-sage">{pages.length}</div>
            <div className="text-sm text-charcoal/70">Totalt sider</div>
          </div>
          <div className="bg-warm_white organic-border minimal-shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{pages.filter(p => p.status === 'complete').length}</div>
            <div className="text-sm text-charcoal/70">Ferdig</div>
          </div>
          <div className="bg-warm_white organic-border minimal-shadow p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{pages.filter(p => p.status === 'partial').length}</div>
            <div className="text-sm text-charcoal/70">Delvis</div>
          </div>
          <div className="bg-warm_white organic-border minimal-shadow p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{pages.filter(p => p.status === 'placeholder').length}</div>
            <div className="text-sm text-charcoal/70">Placeholder</div>
          </div>
        </div>

        {/* Pages Grid */}
        <div className="grid gap-4">
          {filteredPages.map((page) => (
            <div key={page.path} className="bg-warm_white organic-border minimal-shadow hover:shadow-md transition-all duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-sage/10 rounded-lg flex items-center justify-center">
                        <page.icon className="w-6 h-6 text-sage" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-charcoal">
                          {page.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(page.status)}`}>
                          {getStatusText(page.status)}
                        </span>
                        <span className="px-2 py-1 bg-stone_light text-charcoal text-xs rounded-full">
                          {page.category}
                        </span>
                      </div>
                      <p className="text-charcoal/70 text-sm mb-3">
                        {page.description}
                      </p>
                      <div className="flex items-center text-xs text-charcoal/50">
                        <HiOutlineClipboard className="w-4 h-4 mr-1" />
                        <code className="bg-stone_light px-2 py-1 rounded">
                          {page.path}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                    <Link
                      to={page.path}
                      className="px-4 py-2 bg-sage hover:bg-sage_dark text-warm_white text-sm rounded-lg transition-colors flex items-center"
                    >
                      <HiOutlineEye className="w-4 h-4 mr-2" />
                      Besøk
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPages.length === 0 && (
          <div className="bg-warm_white organic-border minimal-shadow p-12 text-center">
            <HiMagnifyingGlass className="w-12 h-12 text-charcoal/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-charcoal mb-2">Ingen sider funnet</h3>
            <p className="text-charcoal/70">
              Prøv å endre søkekriteriene eller velg en annen kategori.
            </p>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 bg-charcoal text-warm_white organic-border p-8">
          <h3 className="text-xl font-medium mb-6">Utviklingsinformasjon</h3>
          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-medium mb-3 text-sage">Arkitektur</h4>
              <ul className="space-y-2 text-warm_white/80">
                <li>• <strong>Frontend:</strong> React 19.1.1 + TypeScript 5.8.3</li>
                <li>• <strong>Routing:</strong> React Router 7.8.0</li>
                <li>• <strong>Styling:</strong> Tailwind CSS 4.1.11</li>
                <li>• <strong>Build Tool:</strong> Vite 7.1.0</li>
                <li>• <strong>Icons:</strong> React Icons 5.5.0</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-terracotta">Utviklingsmiljø</h4>
              <ul className="space-y-2 text-warm_white/80">
                <li>• <strong>Dev Server:</strong> http://localhost:5173/</li>
                <li>• <strong>API Backend:</strong> http://localhost:3001/</li>
                <li>• <strong>Hot Reload:</strong> Aktivert</li>
                <li>• <strong>TypeScript:</strong> Strict mode</li>
                <li>• <strong>Linting:</strong> ESLint 9.32.0</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevIndex;