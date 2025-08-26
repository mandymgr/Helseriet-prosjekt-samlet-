import React, { useState } from 'react';
import { Link } from 'react-router';

interface FAQItem {
  id: number;
  question: string;
  answer: string | React.ReactElement;
  category: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('bestilling');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories: FAQCategory[] = [
    { 
      id: 'bestilling', 
      name: 'Bestilling', 
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"/>
        </svg>
      )
    },
    { 
      id: 'levering', 
      name: 'Levering', 
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
      )
    },
    { 
      id: 'betaling', 
      name: 'Betaling', 
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
        </svg>
      )
    },
    { 
      id: 'produkter', 
      name: 'Produkter', 
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
        </svg>
      )
    }
  ];

  const faqItems: FAQItem[] = [
    {
      id: 1,
      category: 'bestilling',
      question: 'Hvordan bestiller jeg?',
      answer: (
        <div className="space-y-4">
          <p className="text-charcoal/70 leading-relaxed">Det er enkelt å bestille hos oss:</p>
          <ol className="list-decimal ml-6 space-y-2 text-charcoal/70">
            <li>Finn produktene du ønsker og legg dem i handlekurven</li>
            <li>Gå til handlekurven og klikk "Gå til kassen"</li>
            <li>Fyll inn leveringsinformasjon</li>
            <li>Velg betalingsmåte og fullfør bestillingen</li>
          </ol>
          <p className="text-charcoal/70 leading-relaxed">Du får ordrebekreftelse på e-post umiddelbart.</p>
        </div>
      )
    },
    {
      id: 2,
      category: 'bestilling',
      question: 'Kan jeg endre eller kansellere bestillingen?',
      answer: 'Du kan endre eller kansellere bestillingen så lenge den ikke er sendt. Kontakt kundeservice på 123 45 678 eller send e-post til kundeservice@helseriet.no så raskt som mulig.'
    },
    {
      id: 3,
      category: 'bestilling',
      question: 'Hvordan bruker jeg rabattkode?',
      answer: 'I handlekurven finner du et felt for "Rabattkode". Skriv inn koden og klikk "Bruk". Rabatten trekkes automatisk fra totalbeløpet. Merk at kun én rabattkode kan brukes per ordre.'
    },
    {
      id: 4,
      category: 'levering',
      question: 'Hvor lang leveringstid har dere?',
      answer: 'Standard leveringstid er 2-4 virkedager. Bestiller du før kl 14:00 på hverdager, sender vi pakken samme dag. Vi tilbyr også ekspress-levering med levering neste virkedag.'
    },
    {
      id: 5,
      category: 'levering',
      question: 'Hva koster frakt?',
      answer: 'Standardfrakt koster 59 kr, men vi tilbyr gratis frakt på alle bestillinger over 500 kr. Ekspress-levering koster 129 kr uansett ordrestørrelse.'
    },
    {
      id: 6,
      category: 'levering',
      question: 'Leverer dere til utlandet?',
      answer: 'Ja, vi leverer til hele Norden. Frakt til Sverige starter på 89 kr, Danmark 99 kr og Finland 119 kr. Leveringstid er 3-6 virkedager avhengig av destinasjon.'
    },
    {
      id: 7,
      category: 'betaling',
      question: 'Hvilke betalingsmåter tilbyr dere?',
      answer: 'Vi aksepterer Visa, Mastercard, Vipps, Klarna og faktura. Alle betalinger er sikret med SSL-kryptering for din trygghet.'
    },
    {
      id: 8,
      category: 'betaling',
      question: 'Er det trygt å handle hos dere?',
      answer: 'Absolutt! Vi bruker sikker SSL-kryptering på alle sider. Vi lagrer aldri kortinformasjon, og alle transaksjoner håndteres av sertifiserte betalingsleverandører.'
    },
    {
      id: 9,
      category: 'produkter',
      question: 'Er produktene deres godkjente?',
      answer: 'Alle våre produkter følger norske og europeiske regelverk for kosttilskudd. Vi selger kun produkter fra anerkjente produsenter med dokumentert kvalitet og sikkerhet.'
    },
    {
      id: 10,
      category: 'produkter',
      question: 'Hvordan oppbevarer jeg produktene?',
      answer: 'De fleste kosttilskudd bør oppbevares tørt og kjølig, unna direkte sollys. Se alltid produktetiketten for spesifikke oppbevaringsinstrukser. Probiotika kan kreve kjøleskap.'
    }
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const groupedItems = categories.reduce((acc, category) => {
    acc[category.id] = filteredItems.filter(item => item.category === category.id);
    return acc;
  }, {} as Record<string, FAQItem[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {/* Hero Section */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Ofte stilte spørsmål
            </h1>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
              Finn svar på de vanligste spørsmålene om våre produkter og tjenester
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
                  placeholder="Søk etter spørsmål..." 
                  className="w-full pl-14 pr-6 py-4 text-charcoal placeholder-charcoal/50 bg-transparent focus:outline-none rounded-2xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button 
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group bg-white minimal-shadow organic-border p-6 text-center hover-float transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'ring-2 ring-sage' 
                    : ''
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-sage/20' 
                    : 'bg-sage/10 group-hover:bg-sage/20'
                }`}>
                  {category.icon}
                </div>
                <h3 className={`font-medium transition-colors duration-200 ${
                  activeCategory === category.id 
                    ? 'text-sage' 
                    : 'text-charcoal group-hover:text-sage'
                }`}>
                  {category.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            {categories.map((category) => {
              const categoryItems = groupedItems[category.id];
              if (categoryItems.length === 0) return null;

              return (
                <div key={category.id} className="space-y-4">
                  <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                    {category.name}
                  </h2>
                  
                  {categoryItems.map((item) => (
                    <div key={item.id} className="bg-white minimal-shadow organic-border overflow-hidden backdrop-blur-sm">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full p-6 text-left font-medium text-charcoal hover:bg-sage/5 transition-colors duration-200 flex items-center justify-between"
                      >
                        <span className="text-lg">{item.question}</span>
                        <svg 
                          className={`w-5 h-5 text-sage transform transition-transform duration-200 ${
                            openItems.includes(item.id) ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      
                      {openItems.includes(item.id) && (
                        <div className="px-6 pb-6 border-t border-sage/10">
                          <div className="pt-4">
                            {typeof item.answer === 'string' ? (
                              <p className="text-charcoal/70 leading-relaxed">{item.answer}</p>
                            ) : (
                              item.answer
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white minimal-shadow organic-border p-12 backdrop-blur-sm max-w-md mx-auto">
                <svg className="w-16 h-16 text-charcoal/70 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <h3 className="text-xl font-medium text-charcoal mb-3">Ingen resultater funnet</h3>
                <p className="text-charcoal/70 mb-6">Prøv å justere søket ditt eller kontakt kundeservice</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="btn-organic"
                >
                  Nullstill søk
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-spacing-lg bg-stone_light/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border p-12 text-center backdrop-blur-sm">
            <h3 className="text-3xl font-light text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Fant du ikke svaret?
            </h3>
            <p className="text-charcoal/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Vårt kundeserviceteam står klart til å hjelpe deg med alle spørsmål om våre produkter og tjenester
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/kontakt" className="btn-organic flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Chat med oss
              </Link>
              <Link to="/spesialist" className="btn-ghost flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Send e-post
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;