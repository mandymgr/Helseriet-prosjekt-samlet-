import React from 'react';
import { Link } from 'react-router';

const Specialist: React.FC = () => {
  const specialists = [
    {
      name: 'Rose Kristin Gjervik',
      role: 'Ernæringsfysiolog',
      experience: '15+ års erfaring',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      )
    },
    {
      name: 'Dr. Lars Hansen',
      role: 'Allmennlege',
      experience: '20+ års erfaring',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8"/>
        </svg>
      )
    },
    {
      name: 'Anne Mette Olsen',
      role: 'Produktspesialist',
      experience: '12+ års erfaring',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {/* Hero Section */}
      <section className="page-header">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Prat med spesialist
            </h1>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
              Få profesjonell veiledning fra våre erfarne spesialister for optimal helse og velvære
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 card-gap">
            <div className="bg-white minimal-shadow organic-border card-inner hover-float transition-all duration-300">
              <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 className="text-2xl font-light text-charcoal mb-4 text-center" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Kostråd & ernæring
              </h3>
              <p className="text-charcoal/70 mb-8 leading-relaxed text-center">
                Få personlig veiledning fra våre ernæringsfysiologer for å optimalisere din kosthold og oppnå dine helsemål.
              </p>
              <div className="text-center">
                <button className="btn-organic">
                  Book konsultasjon
                </button>
              </div>
            </div>
            
            <div className="bg-white minimal-shadow organic-border card-inner hover-float transition-all duration-300">
              <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-light text-charcoal mb-4 text-center" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Helseveiledning
              </h3>
              <p className="text-charcoal/70 mb-8 leading-relaxed text-center">
                Snakk med våre helsespesialister om dine behov og få tilpassede anbefalinger for din livssituasjon.
              </p>
              <div className="text-center">
                <Link to="/kontakt" className="btn-ghost">
                  Kontakt spesialist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-spacing-lg bg-stone_light/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Møt våre spesialister
            </h2>
            <p className="text-xl font-light text-charcoal/70 max-w-3xl mx-auto">
              Vårt team består av sertifiserte spesialister som er dedikert til din helse og velvære
            </p>
          </div>

          <div className="grid md:grid-cols-3 card-gap">
            {specialists.map((specialist, index) => (
              <div key={index} className="bg-white minimal-shadow organic-border card-inner text-center hover-float transition-all duration-300">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {specialist.icon}
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-2">{specialist.name}</h3>
                <p className="text-sage_dark font-medium mb-4">{specialist.role}</p>
                <p className="text-sm text-charcoal/70">{specialist.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing-lg bg-charcoal text-warm_white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-light mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Klar for å starte din helsereise?
            </h2>
            <p className="text-xl font-light leading-relaxed max-w-3xl mx-auto mb-12 text-warm_white/70">
              Book en konsultasjon med våre spesialister og få personlig veiledning tilpasset dine behov
            </p>
            <div className="flex flex-col sm:flex-row card-gap justify-center items-center">
              <button className="btn-organic">
                Book konsultasjon
              </button>
              <Link to="/kontakt" className="btn-ghost border-warm_white/20 text-warm_white hover:bg-warm_white hover:text-charcoal">
                Kontakt oss
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Specialist;