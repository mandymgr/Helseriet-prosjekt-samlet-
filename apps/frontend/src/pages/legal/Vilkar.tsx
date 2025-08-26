import React from 'react';
import { Link } from 'react-router';

interface PaymentMethod {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const Vilkar: React.FC = () => {
  const paymentMethods: PaymentMethod[] = [
    {
      name: 'Kortbetaling',
      description: 'Visa, Mastercard - belastes ved sending',
      icon: (
        <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
        </svg>
      )
    },
    {
      name: 'Vipps',
      description: 'Enkel og sikker betaling',
      icon: (
        <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
      )
    },
    {
      name: 'Klarna',
      description: 'Faktura og delbetaling tilgjengelig',
      icon: (
        <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      )
    },
    {
      name: 'Faktura',
      description: '14 dagers betalingsfrist',
      icon: (
        <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      <section>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Vilkår og betingelser
            </h1>
            <p className="text-xl text-charcoal/70">Gjelder fra 1. januar 2024</p>
          </div>

          <div className="bg-gradient-to-br from-sage/10 to-sage/5 border border-sage/20 rounded-2xl p-8 mb-12 backdrop-blur-sm">
            <p className="text-charcoal/70 leading-relaxed">
              Ved å handle hos Helseriet AS aksepterer du følgende vilkår og betingelser. 
              Vennligst les disse nøye før du foretar et kjøp.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                1. Generelt
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <p className="text-charcoal/70 leading-relaxed">
                  Disse vilkårene gjelder for alle kjøp foretatt på helseriet.no. Helseriet AS 
                  (org.nr. 123 456 789) selger kosttilskudd og helseprodukter til forbrukere i Norge 
                  og Norden.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                2. Priser
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <ul className="space-y-3 text-charcoal/70">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sage mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Alle priser er oppgitt i norske kroner inkludert MVA</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sage mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Vi forbeholder oss retten til prisendringer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sage mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Eventuelle kampanjepriser gjelder kun i angitt periode</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sage mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Fraktkostnader kommer i tillegg med mindre annet er oppgitt</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                3. Betaling
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <p className="text-charcoal/70 mb-6 leading-relaxed">Vi aksepterer følgende betalingsmåter:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="bg-stone_light/30 rounded-2xl p-6 hover-float transition-all duration-300">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center">
                          {method.icon}
                        </div>
                        <h3 className="text-lg font-medium text-charcoal">{method.name}</h3>
                      </div>
                      <p className="text-charcoal/70 leading-relaxed">{method.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                4. Levering
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <p className="text-charcoal/70 mb-6 leading-relaxed">
                  Standard leveringstid er 2-4 virkedager. Ved forsinkelser vil kunden bli informert.
                </p>
                <div className="bg-stone_light/30 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-charcoal mb-4">Leveringskostnader:</h3>
                  <ul className="space-y-2 text-charcoal/70">
                    <li className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                      </svg>
                      <span>Standard levering: 59 kr</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                      <span>Ekspress levering: 129 kr</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                      </svg>
                      <span>Gratis frakt ved kjøp over 500 kr</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                5. Angrerett
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <p className="text-charcoal/70 mb-6 leading-relaxed">
                  I henhold til angrerettloven har du 14 dagers angrerett fra du mottar varen. 
                  For kosttilskudd utvides dette til 30 dager åpent kjøp.
                </p>
                <div className="bg-gradient-to-br from-terracotta/10 to-terracotta/5 border border-terracotta/20 rounded-2xl p-6">
                  <p className="font-medium text-charcoal mb-4">Unntak fra angreretten:</p>
                  <ul className="space-y-2 text-charcoal/70">
                    <li className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-terracotta mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
                      <span>Åpnede/brukte produkter</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-terracotta mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
                      <span>Produkter uten originalemballasje</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-terracotta mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
                      <span>Spesialtilpassede produkter</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                6. Reklamasjon
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <p className="text-charcoal/70 mb-6 leading-relaxed">
                  Du har 2 års reklamasjonsrett i henhold til forbrukerkjøpsloven. 
                  Ved feil eller mangler, kontakt kundeservice umiddelbart.
                </p>
                <div className="bg-gradient-to-br from-sage/10 to-sage/5 border-l-4 border-sage rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal mb-2">Meld fra om feil:</p>
                      <p className="text-charcoal/70 leading-relaxed">
                        E-post: kundeservice@helseriet.no<br />
                        Telefon: +47 123 45 678
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                7. Ansvarsbegrensning
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <p className="text-charcoal/70 leading-relaxed">
                  Helseriet AS kan ikke holdes ansvarlig for indirekte tap eller følgeskader. 
                  Produktene er kosttilskudd og erstatter ikke et variert kosthold eller medisinsk behandling.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                8. Personvern
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <p className="text-charcoal/70 leading-relaxed">
                  Vi behandler personopplysninger i henhold til vår{' '}
                  <Link to="/personvern" className="text-sage hover:text-sage_dark underline transition-colors duration-200">
                    personvernerklæring
                  </Link>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                9. Tvisteløsning
              </h2>
              <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
                <p className="text-charcoal/70 mb-6 leading-relaxed">
                  Eventuelle tvister søkes løst i minnelighet. Ved uenighet kan saken bringes inn for:
                </p>
                <div className="bg-stone_light/30 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-charcoal/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal mb-2">Forbrukerrådet</p>
                      <div className="text-charcoal/70 text-sm leading-relaxed">
                        <p>Postboks 4594 Nydalen</p>
                        <p>0404 Oslo</p>
                        <p>www.forbrukerradet.no</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                10. Kontaktinformasjon
              </h2>
              <div className="bg-gradient-to-br from-charcoal to-charcoal/90 text-warm_white rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-warm_white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-warm_white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-light mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                      Helseriet AS
                    </h3>
                    <div className="space-y-2 text-warm_white/90">
                      <p>Org.nr: 123 456 789</p>
                      <p>Adresse: Storgata 123, 0123 Oslo</p>
                      <p>E-post: kundeservice@helseriet.no</p>
                      <p>Telefon: +47 123 45 678</p>
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
    </div>
  );
};

export default Vilkar;