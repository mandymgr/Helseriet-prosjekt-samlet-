import React, { useState } from 'react';
import { Link } from 'react-router';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  productCount: number;
  slug: string;
  color: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Vitaminer',
    description: 'Essensielle vitaminer for daglig helse og velvære',
    icon: (
      <svg className="w-8 h-8 text-terracotta" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    productCount: 45,
    slug: 'vitaminer',
    color: 'from-terracotta/10 to-terracotta/20'
  },
  {
    id: '2',
    name: 'Mineraler',
    description: 'Viktige mineraler for optimal kroppsfunksjon',
    icon: (
      <svg className="w-8 h-8 text-sage_dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    productCount: 32,
    slug: 'mineraler',
    color: 'from-sage/10 to-sage_dark/10'
  },
  {
    id: '3',
    name: 'Kosttilskudd',
    description: 'Naturlige tilskudd for optimal helse og energi',
    icon: (
      <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
    ),
    productCount: 78,
    slug: 'kosttilskudd',
    color: 'from-sage/10 to-sage/20'
  },
  {
    id: '4',
    name: 'Naturmedisin',
    description: 'Tradisjonell medisin fra naturens apotek',
    icon: (
      <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4V5z"/>
      </svg>
    ),
    productCount: 34,
    slug: 'naturmedisin',
    color: 'from-charcoal/5 to-charcoal/10'
  },
  {
    id: '5',
    name: 'Probiotika',
    description: 'Tarmbakterier for optimal fordøyelse og immunforsvar',
    icon: (
      <svg className="w-8 h-8 text-terracotta" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.82.62-3.5 1.64-4.83l11.19 11.19A7.93 7.93 0 0112 20zm6.36-3.17L7.17 5.64A7.93 7.93 0 0112 4c4.41 0 8 3.59 8 8 0 1.82-.62 3.5-1.64 4.83z"/>
      </svg>
    ),
    productCount: 23,
    slug: 'probiotika',
    color: 'from-terracotta/10 to-stone/20'
  },
  {
    id: '6',
    name: 'Omega-3',
    description: 'Essensielle fettsyrer fra havet for hjertet',
    icon: (
      <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    ),
    productCount: 18,
    slug: 'omega-3',
    color: 'from-sage/15 to-sage_dark/10'
  },
  {
    id: '7',
    name: 'Urter',
    description: 'Naturlige plantebaserte produkter og remedier',
    icon: (
      <svg className="w-8 h-8 text-sage_dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
      </svg>
    ),
    productCount: 41,
    slug: 'urter',
    color: 'from-sage_dark/10 to-charcoal/5'
  },
  {
    id: '8',
    name: 'Supermat',
    description: 'Næringsrike superfoods for optimal næring',
    icon: (
      <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      </svg>
    ),
    productCount: 56,
    slug: 'supermat',
    color: 'from-terracotta/15 to-stone/10'
  },
  {
    id: '9',
    name: 'Protein',
    description: 'Proteinpulver og aminosyrer for muskelbygging',
    icon: (
      <svg className="w-8 h-8 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
      </svg>
    ),
    productCount: 27,
    slug: 'protein',
    color: 'from-charcoal/10 to-sage/5'
  },
  {
    id: '10',
    name: 'Hud og hår',
    description: 'Produkter for skjønnhet innenfra og ut',
    icon: (
      <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
    productCount: 19,
    slug: 'hud-og-har',
    color: 'from-terracotta/10 to-warm_white/50'
  },
  {
    id: '11',
    name: 'Vekt og stoffskifte',
    description: 'Støtte for vektlegging og økt energiforbrenning',
    icon: (
      <svg className="w-8 h-8 text-sage_dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
      </svg>
    ),
    productCount: 15,
    slug: 'vekt-og-stoffskifte',
    color: 'from-sage_dark/10 to-terracotta/5'
  },
  {
    id: '12',
    name: 'Immunforsvar',
    description: 'Styrk kroppens naturlige forsvarssystem',
    icon: (
      <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    productCount: 29,
    slug: 'immunforsvar',
    color: 'from-sage/10 to-charcoal/5'
  }
];

const Categories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularCategories = categories
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {/* Hero Section */}
      <section className="page-header">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-responsive-h1 text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Produktkategorier
            </h1>
            <p className="text-responsive-body text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
              Utforsk vårt brede utvalg av naturlige helseprodukter organisert etter dine spesifikke behov
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white minimal-shadow organic-border p-2 backdrop-blur-sm">
              <div className="relative">
                <svg className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Søk i kategorier..." 
                  className="w-full pl-14 pr-6 py-4 text-charcoal placeholder-charcoal_light/50 bg-transparent focus:outline-none rounded-2xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 card-gap gpu-accelerated">
            {filteredCategories.map((category, index) => (
              <Link 
                key={category.id}
                to={`/produkter?kategori=${category.slug}`} 
                className="group block"
              >
                <div className="bg-white minimal-shadow organic-border overflow-hidden backdrop-blur-sm subtle-hover stagger-item will-animate" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="card-inner text-center">
                    {/* Large Icon with 3D Effect */}
                    <div className="relative inline-block mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-250 micro-interaction`}></div>
                      <div className="relative w-20 h-20 bg-white rounded-2xl flex items-center justify-center minimal-shadow group-hover:shadow-lg transition-shadow duration-250 micro-interaction">
                        <div className="transform group-hover:scale-110 transition-transform duration-250 micro-interaction">
                          {category.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-inner">
                    <h3 className="text-lg font-medium text-charcoal mb-3 group-hover:text-sage transition-colors duration-250 micro-interaction">
                      {category.name}
                    </h3>
                    <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-sage font-medium bg-sage/10 px-3 py-1 rounded-full">
                        {category.productCount} produkter
                      </span>
                      <svg className="w-5 h-5 text-charcoal/70 group-hover:text-sage transform group-hover:translate-x-1 transition-all duration-250 micro-interaction" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white minimal-shadow organic-border card-inner backdrop-blur-sm max-w-md mx-auto">
                <svg className="w-16 h-16 text-charcoal/70 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <h3 className="text-xl font-medium text-charcoal mb-3">Ingen kategorier funnet</h3>
                <p className="text-charcoal/70">Prøv å justere søkeordene dine eller se alle kategorier</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-6 btn-organic"
                >
                  Nullstill søk
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="section-spacing-lg bg-stone_light/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>Mest populære kategorier</h2>
            <p className="text-xl font-light text-charcoal/70 max-w-2xl mx-auto">Oppdag våre mest etterspurte produktkategorier</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 card-gap">
            {popularCategories.map((category) => (
              <Link 
                key={`popular-${category.id}`}
                to={`/produkter?kategori=${category.slug}`}
                className="group block"
              >
                <div className="bg-white minimal-shadow organic-border card-inner text-center hover-float transition-all duration-250 micro-interaction backdrop-blur-sm">
                  <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-250 micro-interaction">
                    <div className="w-8 h-8 transform group-hover:rotate-12 transition-transform duration-250 micro-interaction">
                      {category.icon}
                    </div>
                  </div>
                  <h4 className="font-medium text-charcoal text-sm mb-2 group-hover:text-sage transition-colors duration-250 micro-interaction">
                    {category.name}
                  </h4>
                  <p className="text-xs text-charcoal/70">
                    {category.productCount} produkter
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing-lg bg-warm_white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border p-16 text-center backdrop-blur-sm">
            <h3 className="text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>Kan ikke finne det du leter etter?</h3>
            <p className="text-xl font-light text-charcoal/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Utforsk vårt komplette produktkatalog eller kontakt våre eksperter for personlig veiledning
            </p>
            <div className="flex flex-col sm:flex-row card-gap justify-center items-center">
              <Link 
                to="/produkter" 
                className="btn-organic flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                Se alle produkter
              </Link>
              <Link 
                to="/spesialist" 
                className="btn-ghost flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Kontakt spesialist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;