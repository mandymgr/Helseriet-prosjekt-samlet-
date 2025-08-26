import React, { useState } from 'react';
import { Link } from 'react-router';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  icon: React.ReactNode;
  slug: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 naturlige måter å styrke immunforsvaret på',
    excerpt: 'Oppdag hvordan du kan støtte kroppens naturlige forsvar gjennom kosthold, livsstil og riktige kosttilskudd.',
    author: 'Rose Kristin Gjervik',
    publishDate: '22. januar 2024',
    readTime: '5 min',
    category: 'Immunforsvar',
    icon: (
      <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    slug: 'immunforsvar-naturlig-styrking',
    featured: true
  },
  {
    id: '2',
    title: 'Magnesium for bedre søvn: Alt du trenger å vite',
    excerpt: 'Lær hvordan magnesium kan forbedre søvnkvaliteten din og hvilken type som er best.',
    author: 'Dr. Lars Hansen',
    publishDate: '15. januar 2024',
    readTime: '3 min',
    category: 'Søvn & Stress',
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
    ),
    slug: 'magnesium-bedre-sovn'
  },
  {
    id: '3',
    title: 'Probiotika vs Prebiotika: Hva er forskjellen?',
    excerpt: 'Forstå forskjellen og lær hvordan begge kan støtte din tarmhelse.',
    author: 'Anne Mette Olsen',
    publishDate: '10. januar 2024',
    readTime: '4 min',
    category: 'Fordøyelse',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.82.62-3.5 1.64-4.83l11.19 11.19A7.93 7.93 0 0112 20zm6.36-3.17L7.17 5.64A7.93 7.93 0 0112 4c4.41 0 8 3.59 8 8 0 1.82-.62 3.5-1.64 4.83z"/>
      </svg>
    ),
    slug: 'probiotika-vs-prebiotika'
  },
  {
    id: '4',
    title: 'D-vitamin mangel i Norge: En skjult epidemi?',
    excerpt: 'Nye studier viser at majoriteten av nordmenn har for lite D-vitamin.',
    author: 'Prof. Kari Nordal',
    publishDate: '5. januar 2024',
    readTime: '5 min',
    category: 'Vitaminer',
    icon: (
      <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
    slug: 'd-vitamin-mangel-norge'
  },
  {
    id: '5',
    title: 'Kosttilskudd for aktive: Hva trenger du virkelig?',
    excerpt: 'En guide til essensielle kosttilskudd for deg som trener regelmessig.',
    author: 'Marcus Fitness',
    publishDate: '2. januar 2024',
    readTime: '6 min',
    category: 'Trening',
    icon: (
      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
      </svg>
    ),
    slug: 'kosttilskudd-for-aktive'
  },
  {
    id: '6',
    title: 'Ashwagandha: Naturens svar på stress?',
    excerpt: 'Forskning viser lovende resultater for denne gamle urten.',
    author: 'Dr. Nina Wellness',
    publishDate: '28. desember 2023',
    readTime: '4 min',
    category: 'Mental helse',
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
    slug: 'ashwagandha-mot-stress'
  },
  {
    id: '7',
    title: 'Omega-3: Den komplette guiden',
    excerpt: 'Alt du trenger å vite om omega-3 fettsyrer og deres helsefordeler.',
    author: 'Rose Kristin Gjervik',
    publishDate: '20. desember 2023',
    readTime: '7 min',
    category: 'Vitaminer',
    icon: (
      <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    ),
    slug: 'omega-3-komplette-guide'
  },
  {
    id: '8',
    title: 'Tarmhelse og immunforsvar: Sammenhangen',
    excerpt: 'Oppdag hvorfor 70% av immunsystemet befinner seg i tarmen.',
    author: 'Dr. Gut Health',
    publishDate: '15. desember 2023',
    readTime: '5 min',
    category: 'Fordøyelse',
    icon: (
      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    ),
    slug: 'tarmhelse-immunforsvar'
  }
];

const categories = [
  'Alle',
  'Immunforsvar', 
  'Søvn & Stress',
  'Fordøyelse',
  'Vitaminer',
  'Trening',
  'Mental helse'
];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const filteredPosts = selectedCategory === 'Alle' 
    ? regularPosts 
    : regularPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {/* Hero Section */}
      <section className="page-header">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Helseblogg
            </h1>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
              Tips, råd og vitenskapsbasert kunnskap om naturlig helse og velvære
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="section-spacing">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-white minimal-shadow organic-border overflow-hidden backdrop-blur-sm hover-float transition-all duration-250 micro-interaction">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-sage/10 to-sage_light/20 flex items-center justify-center p-16 lg:p-20">
                  <div className="transform hover:scale-110 transition-transform duration-250 micro-interaction">
                    {featuredPost.icon}
                  </div>
                </div>
                <div className="card-inner lg:card-inner flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-sage text-white text-xs font-medium px-3 py-1 rounded-full">
                      FREMHEVET
                    </span>
                    <span className="text-sage text-xs font-medium">
                      {featuredPost.readTime} lesetid
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-light text-charcoal mb-4 leading-tight" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                    {featuredPost.title}
                  </h2>
                  <p className="text-charcoal/70 mb-6 leading-relaxed text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-charcoal">{featuredPost.author}</span>
                    </div>
                    <span className="text-charcoal/70">•</span>
                    <span className="text-sm text-charcoal/70">{featuredPost.publishDate}</span>
                  </div>
                  <Link 
                    to={`/blogg/${featuredPost.slug}`} 
                    className="btn-organic inline-flex items-center gap-2"
                  >
                    Les artikkelen
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 text-sm font-medium rounded-2xl transition-all duration-250 micro-interaction ${
                  selectedCategory === category
                    ? 'bg-sage text-white shadow-md'
                    : 'text-charcoal hover:text-sage_dark border border-sage/20 hover:bg-sage/5 bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 card-gap">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blogg/${post.slug}`}
                className="group block"
              >
                <article className="bg-white minimal-shadow organic-border overflow-hidden backdrop-blur-sm hover-float transition-all duration-250 micro-interaction">
                  <div className="aspect-video bg-gradient-to-br from-sage/5 to-sage_light/10 flex items-center justify-center card-inner">
                    <div className="transform group-hover:scale-110 transition-transform duration-250 micro-interaction">
                      {post.icon}
                    </div>
                  </div>
                  <div className="card-inner">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-sage bg-sage/10 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-charcoal/70">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-medium text-lg text-charcoal mb-3 leading-tight group-hover:text-sage transition-colors duration-250 micro-interaction">
                      {post.title}
                    </h3>
                    <p className="text-charcoal/70 text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-charcoal/70">{post.publishDate}</span>
                      <div className="flex items-center gap-1 text-sm font-medium text-sage group-hover:gap-2 transition-all duration-250 micro-interaction">
                        Les mer
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-250 micro-interaction" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white minimal-shadow organic-border card-inner backdrop-blur-sm max-w-md mx-auto">
                <svg className="w-16 h-16 text-charcoal/70 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <h3 className="text-xl font-medium text-charcoal mb-3">Ingen artikler funnet</h3>
                <p className="text-charcoal/70 mb-6">Prøv en annen kategori eller se alle artikler</p>
                <button 
                  onClick={() => setSelectedCategory('Alle')}
                  className="btn-organic"
                >
                  Vis alle artikler
                </button>
              </div>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <button className="btn-ghost flex items-center gap-3 mx-auto">
                Last inn flere artikler
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Blog;