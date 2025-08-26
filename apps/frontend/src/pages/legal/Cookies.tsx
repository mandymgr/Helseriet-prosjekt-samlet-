import React, { useState } from 'react';

interface Cookie {
  name: string;
  purpose: string;
  duration: string;
}

interface CookieCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  cookies: Cookie[];
  required?: boolean;
}

const Cookies: React.FC = () => {
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  const cookieCategories: CookieCategory[] = [
    {
      title: 'Nødvendige cookies',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      description: 'Disse cookies er essensielle for at nettsiden skal fungere korrekt. De kan ikke slås av.',
      required: true,
      cookies: [
        {
          name: 'session_id',
          purpose: 'Opprettholder brukerøkt',
          duration: 'Økt'
        },
        {
          name: 'cart_items',
          purpose: 'Lagrer handlekurv',
          duration: '7 dager'
        }
      ]
    },
    {
      title: 'Analytiske cookies',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      ),
      description: 'Disse cookies hjelper oss å forstå hvordan besøkende bruker nettsiden.',
      cookies: [
        {
          name: '_ga',
          purpose: 'Google Analytics',
          duration: '2 år'
        },
        {
          name: '_gid',
          purpose: 'Google Analytics',
          duration: '24 timer'
        }
      ]
    },
    {
      title: 'Markedsføringscookies',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      ),
      description: 'Disse cookies brukes for å vise relevante annonser og tilbud.',
      cookies: [
        {
          name: '_fbp',
          purpose: 'Facebook Pixel',
          duration: '90 dager'
        },
        {
          name: 'ads_session',
          purpose: 'Google Ads',
          duration: '30 dager'
        }
      ]
    }
  ];

  const managementOptions = [
    {
      icon: (
        <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      title: 'Nettleserinnstillinger',
      description: 'De fleste nettlesere lar deg kontrollere cookies gjennom innstillingene.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
        </svg>
      ),
      title: 'Blokkere cookies',
      description: 'Du kan blokkere cookies, men dette kan påvirke nettsidens funksjonalitet.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      ),
      title: 'Slette cookies',
      description: 'Du kan når som helst slette cookies som allerede er lagret.'
    }
  ];

  const handleSavePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setShowConsentModal(false);
    alert('Cookie-innstillinger lagret!');
  };

  const handleAcceptAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: true
    });
    handleSavePreferences();
  };

  const handleRejectAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false
    });
    handleSavePreferences();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      <section>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Cookie-policy
            </h1>
            <p className="text-xl text-charcoal/70">Informasjon om vår bruk av cookies</p>
          </div>

          <div className="bg-gradient-to-br from-terracotta/10 to-terracotta/5 border border-terracotta/20 rounded-2xl p-8 mb-12 backdrop-blur-sm">
            <div className="w-20 h-20 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
              </svg>
            </div>
            <p className="text-charcoal/70 text-center leading-relaxed">
              Vi bruker cookies for å gi deg en bedre opplevelse på vår nettside. 
              Her finner du informasjon om hvilke cookies vi bruker og hvordan du kan administrere dem.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Hva er cookies?
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <p className="text-charcoal/70 leading-relaxed">
                  Cookies er små tekstfiler som lagres på din enhet når du besøker en nettside. 
                  De hjelper nettsiden å huske informasjon om ditt besøk, som språkvalg og andre 
                  preferanser, slik at ditt neste besøk blir enklere og mer nyttig.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Hvilke cookies bruker vi?
              </h2>
              
              <div className="space-y-8">
                {cookieCategories.map((category, index) => (
                  <div key={index} className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-charcoal mb-2">{category.title}</h3>
                        <p className="text-charcoal/70">{category.description}</p>
                      </div>
                    </div>
                    <div className="bg-stone_light/30 rounded-2xl p-6 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-sage/10">
                            <th className="text-left pb-3 font-medium text-charcoal">Cookie</th>
                            <th className="text-left pb-3 font-medium text-charcoal">Formål</th>
                            <th className="text-left pb-3 font-medium text-charcoal">Varighet</th>
                          </tr>
                        </thead>
                        <tbody className="text-charcoal/70">
                          {category.cookies.map((cookie, cookieIndex) => (
                            <tr key={cookieIndex} className={cookieIndex < category.cookies.length - 1 ? 'border-b border-sage/10' : ''}>
                              <td className="py-3 font-mono text-xs bg-charcoal/5 px-2 rounded">{cookie.name}</td>
                              <td className="py-3">{cookie.purpose}</td>
                              <td className="py-3">{cookie.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Administrer cookies
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <p className="text-charcoal/70 mb-8 leading-relaxed">
                  Du kan kontrollere og administrere cookies på flere måter:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {managementOptions.map((option, index) => (
                    <div key={index} className="bg-stone_light/30 rounded-2xl p-6 hover-float transition-all duration-300">
                      <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mb-4">
                        {option.icon}
                      </div>
                      <h4 className="text-lg font-medium text-charcoal mb-3">{option.title}</h4>
                      <p className="text-charcoal/70 text-sm leading-relaxed">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Cookie-samtykke
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <p className="text-charcoal/70 mb-6 leading-relaxed">
                  Ved ditt første besøk vil du bli bedt om å samtykke til vår bruk av cookies. 
                  Du kan når som helst endre dine preferanser:
                </p>
                <button 
                  onClick={() => setShowConsentModal(true)}
                  className="btn-organic flex items-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Administrer cookie-innstillinger
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                Kontakt oss
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <p className="text-charcoal/70 mb-6 leading-relaxed">
                  Har du spørsmål om vår bruk av cookies? Ta kontakt:
                </p>
                <div className="bg-stone_light/30 rounded-2xl p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      <span className="text-charcoal/70">E-post: personvern@helseriet.no</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      <span className="text-charcoal/70">Telefon: +47 123 45 678</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Back to Top */}
          <div className="mt-16 text-center">
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

      {/* Cookie Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white minimal-shadow organic-border max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-light text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  Cookie-innstillinger
                </h3>
                <button 
                  onClick={() => setShowConsentModal(false)}
                  className="w-8 h-8 bg-charcoal/10 rounded-full flex items-center justify-center hover:bg-charcoal/20 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="bg-stone_light/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-charcoal mb-1">Nødvendige cookies</h4>
                      <p className="text-sm text-charcoal/70">Kreves for at siden skal fungere</p>
                    </div>
                    <div className="w-12 h-6 bg-sage rounded-full flex items-center px-1">
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm transform translate-x-6"></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-stone_light/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-charcoal mb-1">Analytiske cookies</h4>
                      <p className="text-sm text-charcoal/70">Hjelper oss å forbedre siden</p>
                    </div>
                    <label className="relative">
                      <input 
                        type="checkbox" 
                        checked={cookiePreferences.analytics}
                        onChange={(e) => setCookiePreferences(prev => ({
                          ...prev,
                          analytics: e.target.checked
                        }))}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-200 ${
                        cookiePreferences.analytics ? 'bg-sage' : 'bg-stone'
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                          cookiePreferences.analytics ? 'transform translate-x-6' : ''
                        }`}></div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="bg-stone_light/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-charcoal mb-1">Markedsføringscookies</h4>
                      <p className="text-sm text-charcoal/70">For relevante annonser og tilbud</p>
                    </div>
                    <label className="relative">
                      <input 
                        type="checkbox" 
                        checked={cookiePreferences.marketing}
                        onChange={(e) => setCookiePreferences(prev => ({
                          ...prev,
                          marketing: e.target.checked
                        }))}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-200 ${
                        cookiePreferences.marketing ? 'bg-sage' : 'bg-stone'
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                          cookiePreferences.marketing ? 'transform translate-x-6' : ''
                        }`}></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleRejectAll}
                  className="btn-ghost flex-1"
                >
                  Avvis alle
                </button>
                <button 
                  onClick={handleSavePreferences}
                  className="btn-ghost flex-1"
                >
                  Lagre valg
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="btn-organic flex-1"
                >
                  Godta alle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cookies;