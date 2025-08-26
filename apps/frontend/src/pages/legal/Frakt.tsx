import React, { useState } from 'react';

interface ShippingOption {
  title: string;
  description: string;
  price: string;
  priceColor?: string;
  features: string[];
  icon: React.ReactNode;
}

interface DeliveryTime {
  orderTime: string;
  standard: string;
  express: string;
}

interface Country {
  flag: React.ReactNode;
  name: string;
  price: string;
  delivery: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const Frakt: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const shippingOptions: ShippingOption[] = [
    {
      title: 'Standardlevering',
      description: 'Levering til postkasse eller hentested',
      price: '59 kr',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
      ),
      features: [
        '2-4 virkedager',
        'Sporing inkludert',
        'Leveres av Posten/Bring'
      ]
    },
    {
      title: 'Ekspress levering',
      description: 'Hjemlevering neste virkedag',
      price: '129 kr',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      features: [
        'Neste virkedag (bestill før kl 14:00)',
        'Leveres på døren',
        'SMS-varsling'
      ]
    },
    {
      title: 'Henting i butikk',
      description: 'Hent selv på vårt lager',
      price: 'Gratis',
      priceColor: 'text-sage',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      ),
      features: [
        'Klar for henting innen 2 timer',
        'Åpent man-fre 09-17, lør 10-15',
        'Adresse: Storgata 123, Oslo'
      ]
    }
  ];

  const deliveryTimes: DeliveryTime[] = [
    {
      orderTime: 'Man-fre før 14:00',
      standard: 'Ons-fre',
      express: 'Neste dag'
    },
    {
      orderTime: 'Man-fre etter 14:00',
      standard: 'Tor-man',
      express: 'Om 2 dager'
    },
    {
      orderTime: 'Helg',
      standard: 'Ons-tor',
      express: 'Tirsdag'
    }
  ];

  const internationalCountries: Country[] = [
    {
      flag: (
        <svg className="w-6 h-6 text-terracotta" fill="currentColor" viewBox="0 0 24 24">
          <rect width="24" height="16" y="4" fill="#006AA7"/>
          <rect width="24" height="8" y="4" fill="#FECC00"/>
        </svg>
      ),
      name: 'Sverige',
      price: 'Fra 89 kr',
      delivery: '3-5 virkedager'
    },
    {
      flag: (
        <svg className="w-6 h-6 text-terracotta" fill="currentColor" viewBox="0 0 24 24">
          <rect width="24" height="16" y="4" fill="#C60C30"/>
          <rect width="3" height="16" x="6" y="4" fill="white"/>
          <rect width="24" height="3" y="8.5" fill="white"/>
        </svg>
      ),
      name: 'Danmark',
      price: 'Fra 99 kr',
      delivery: '3-5 virkedager'
    },
    {
      flag: (
        <svg className="w-6 h-6 text-terracotta" fill="currentColor" viewBox="0 0 24 24">
          <rect width="24" height="16" y="4" fill="white"/>
          <rect width="24" height="5" y="4" fill="#003580"/>
          <rect width="24" height="5" y="15" fill="#003580"/>
        </svg>
      ),
      name: 'Finland',
      price: 'Fra 119 kr',
      delivery: '4-6 virkedager'
    }
  ];

  const faqItems: FAQItem[] = [
    {
      question: 'Hvordan sporer jeg pakken min?',
      answer: 'Du vil motta en e-post med sporingsnummer når pakken sendes. Du kan også finne sporingsinformasjon under "Mine bestillinger" når du logger inn.'
    },
    {
      question: 'Hva skjer hvis jeg ikke er hjemme ved levering?',
      answer: 'Ved standardlevering vil pakken leveres til nærmeste hentested. Ved hjemlevering vil sjåføren kontakte deg for å avtale ny leveringstid.'
    },
    {
      question: 'Kan jeg endre leveringsadresse?',
      answer: 'Du kan endre leveringsadresse frem til pakken er sendt. Kontakt kundeservice så raskt som mulig på 123 45 678.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      <section>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Frakt og levering
            </h1>
            <p className="text-xl text-charcoal/70">Alt du trenger å vite om levering av dine produkter</p>
          </div>

          {/* Free Shipping Banner */}
          <div className="bg-gradient-to-br from-sage/20 to-sage/10 border border-sage/30 rounded-2xl p-8 mb-12 text-center backdrop-blur-sm">
            <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
              </svg>
            </div>
            <h2 className="text-3xl font-light text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Gratis frakt over 500 kr!
            </h2>
            <p className="text-charcoal/70 text-lg">Gjelder alle bestillinger i Norge</p>
          </div>

          {/* Shipping Options */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Leveringsalternativer
            </h2>
            <div className="space-y-6">
              {shippingOptions.map((option, index) => (
                <div key={index} className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm hover-float transition-all duration-300">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-medium text-charcoal mb-2">{option.title}</h3>
                          <p className="text-charcoal/70">{option.description}</p>
                        </div>
                        <span className={`text-2xl font-light ${option.priceColor || 'text-charcoal'}`} style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                          {option.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone_light/30 rounded-2xl p-4">
                    <ul className="space-y-2">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3 text-charcoal/70">
                          <svg className="w-4 h-4 text-sage flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Times */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Leveringstider
            </h2>
            <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-sage/10">
                    <th className="text-left pb-4 font-medium text-charcoal">Bestilt</th>
                    <th className="text-left pb-4 font-medium text-charcoal">Standard</th>
                    <th className="text-left pb-4 font-medium text-charcoal">Ekspress</th>
                  </tr>
                </thead>
                <tbody className="text-charcoal/70">
                  {deliveryTimes.map((time, index) => (
                    <tr key={index} className={index < deliveryTimes.length - 1 ? 'border-b border-sage/10' : ''}>
                      <td className="py-4 font-medium">{time.orderTime}</td>
                      <td className="py-4">{time.standard}</td>
                      <td className="py-4">{time.express}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* International Shipping */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Internasjonal frakt
            </h2>
            <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
              <p className="text-charcoal/70 mb-8 leading-relaxed text-lg">
                Vi leverer til hele Norden! Fraktkostnader beregnes ved kassen basert på vekt og destinasjon.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {internationalCountries.map((country, index) => (
                  <div key={index} className="bg-stone_light/30 rounded-2xl p-6 hover-float transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center minimal-shadow">
                        {country.flag}
                      </div>
                      <h4 className="text-lg font-medium text-charcoal">
                        {country.name}
                      </h4>
                    </div>
                    <div className="space-y-2 text-charcoal/70">
                      <p className="font-medium">{country.price}</p>
                      <p className="text-sm">{country.delivery}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Ofte stilte spørsmål
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white minimal-shadow organic-border overflow-hidden backdrop-blur-sm">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left font-medium text-charcoal hover:bg-sage/5 transition-colors duration-200 flex items-center justify-between"
                  >
                    <span className="text-lg">{item.question}</span>
                    <svg 
                      className={`w-5 h-5 text-sage transform transition-transform duration-200 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6 border-t border-sage/10">
                      <div className="pt-4">
                        <p className="text-charcoal/70 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
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

export default Frakt;