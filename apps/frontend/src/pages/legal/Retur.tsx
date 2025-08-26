import React from 'react';
import { Link } from 'react-router';

interface ReturnStep {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ReturnCondition {
  type: 'allowed' | 'not-allowed';
  icon: React.ReactNode;
  title: string;
  items: string[];
}

interface RefundMethod {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Retur: React.FC = () => {
  const returnSteps: ReturnStep[] = [
    {
      number: 1,
      title: 'Registrer retur',
      description: 'Logg inn på "Min konto" og finn ordren du ønsker å returnere. Klikk "Returner produkter" og følg instruksjonene.',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      )
    },
    {
      number: 2,
      title: 'Pakk produktene',
      description: 'Pakk produktene godt i originalemballasjen. Legg ved returskjema som du får på e-post.',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
      )
    },
    {
      number: 3,
      title: 'Send pakken',
      description: 'Lever pakken på nærmeste postkontor. Vi dekker returfrakten ved feil eller mangel.',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
        </svg>
      )
    },
    {
      number: 4,
      title: 'Få refusjon',
      description: 'Refusjon skjer innen 14 dager etter at vi har mottatt returen. Du får bekreftelse på e-post.',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
        </svg>
      )
    }
  ];

  const returnConditions: ReturnCondition[] = [
    {
      type: 'allowed',
      icon: (
        <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
        </svg>
      ),
      title: 'Dette kan returneres:',
      items: [
        'Uåpnede produkter i originalemballasje',
        'Produkter med produksjonsfeil',
        'Feil leverte produkter',
        'Skadet ved levering'
      ]
    },
    {
      type: 'not-allowed',
      icon: (
        <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      ),
      title: 'Dette kan ikke returneres:',
      items: [
        'Åpnede eller brukte produkter',
        'Produkter uten originalemballasje',
        'Spesialtilpassede produkter',
        'Produkter kjøpt for over 30 dager siden'
      ]
    }
  ];

  const refundMethods: RefundMethod[] = [
    {
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
        </svg>
      ),
      title: 'Tilbake til betalingskort',
      description: 'Pengene refunderes automatisk til kortet du brukte ved kjøp. Dette tar normalt 5-10 virkedager.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
        </svg>
      ),
      title: 'Gavekort',
      description: 'Du kan velge å få refusjon som gavekort med 10% bonus. Gavekortet har ingen utløpsdato.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      <section>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Retur og refusjon
            </h1>
            <p className="text-xl text-charcoal/70">Vi ønsker at du skal være 100% fornøyd</p>
          </div>

          {/* Return Policy Banner */}
          <div className="bg-gradient-to-br from-sage/20 to-sage/10 border border-sage/30 rounded-2xl p-8 mb-16 text-center backdrop-blur-sm">
            <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-light text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              30 dagers åpent kjøp
            </h2>
            <p className="text-charcoal/70 text-lg">Full returrett på alle uåpnede produkter</p>
          </div>

          {/* Return Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Slik returnerer du
            </h2>
            <div className="space-y-8">
              {returnSteps.map((step, index) => (
                <div key={index} className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm hover-float transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-light text-sage" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                        {step.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-medium text-charcoal mb-3">{step.title}</h3>
                          <p className="text-charcoal/70 leading-relaxed">{step.description}</p>
                        </div>
                        <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center ml-6">
                          {step.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Return Conditions */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Returvilkår
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {returnConditions.map((condition, index) => (
                <div key={index} className={`bg-white minimal-shadow organic-border p-8 backdrop-blur-sm ${condition.type === 'allowed' ? 'hover-float' : ''} transition-all duration-300`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 ${condition.type === 'allowed' ? 'bg-sage/10' : 'bg-terracotta/10'} rounded-full flex items-center justify-center`}>
                      {condition.icon}
                    </div>
                    <h3 className="text-xl font-medium text-charcoal">
                      {condition.title}
                    </h3>
                  </div>
                  <div className="bg-stone_light/30 rounded-2xl p-4">
                    <ul className="space-y-3">
                      {condition.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-charcoal/70">
                          <div className={`w-2 h-2 ${condition.type === 'allowed' ? 'bg-sage' : 'bg-terracotta'} rounded-full flex-shrink-0 mt-2`}></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Methods */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Refusjonsmetoder
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {refundMethods.map((method, index) => (
                <div key={index} className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm hover-float transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center">
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-medium text-charcoal">
                      {method.title}
                    </h3>
                  </div>
                  <div className="bg-stone_light/30 rounded-2xl p-4">
                    <p className="text-charcoal/70 leading-relaxed">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact for Returns */}
          <div className="bg-gradient-to-br from-charcoal to-charcoal/90 text-warm_white rounded-2xl p-12 text-center mb-16 backdrop-blur-sm">
            <div className="w-20 h-20 bg-warm_white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-warm_white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-light mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Trenger du hjelp med retur?
            </h2>
            <p className="text-warm_white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
              Vårt kundeserviceteam hjelper deg gjerne med alle spørsmål om retur og refusjon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+4712345678" 
                className="bg-sage text-warm_white px-6 py-3 rounded-2xl hover:bg-sage_dark transition-colors duration-200 font-medium flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                Ring 123 45 678
              </a>
              <Link 
                to="/kontakt" 
                className="border-2 border-warm_white text-warm_white px-6 py-3 rounded-2xl hover:bg-warm_white hover:text-charcoal transition-colors duration-200 font-medium flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Send melding
              </Link>
            </div>
          </div>

          {/* Back to Top */}
          <div className="text-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn-ghost flex items-center gap-3 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"/>
              </svg>
              Tilbake til toppen
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Retur;