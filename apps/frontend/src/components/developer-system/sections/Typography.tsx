import React from 'react';
import { translations, type Language } from '../translations';

interface TypographyProps {
  isDarkTheme?: boolean;
  selectedLanguage?: Language;
}

const Typography: React.FC<TypographyProps> = ({ 
  isDarkTheme = false, 
  selectedLanguage = 'no' 
}) => {
  const t = translations[selectedLanguage];

  return (
    <section id="typografi" className={`zen-spacing ${
      isDarkTheme ? 'bg-charcoal/50' : 'bg-warm_white'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className={`text-4xl font-light mb-12 ${
          isDarkTheme ? 'text-warm_white' : 'text-charcoal'
        }`} style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
          {t.typography}
        </h2>
        
        {/* Typography Display */}
        <div className="space-y-12">
          {/* Hero Typography */}
          <div>
            <h3 className="text-xl font-medium text-charcoal mb-6">Hero Typografi</h3>
            <div className="bg-white minimal-shadow organic-border p-8">
              <div className="mb-8">
                <span className="hero-naturlig">Naturlig</span>
                <span className="hero-velvare block">velvære</span>
                <span className="hero-subtitle">for kropp og sjel</span>
              </div>
              <p className="hero-description text-balance max-w-lg">
                Opplev harmonien mellom moderne vitenskap og naturens visdom. 
                Våre nøye utvalgte produkter støtter din reise mot optimal helse.
              </p>
            </div>
          </div>

          {/* Section Headers */}
          <div>
            <h3 className="text-xl font-medium text-charcoal mb-6">Seksjonsoverskrifter</h3>
            <div className="bg-white minimal-shadow organic-border p-8 space-y-6">
              <h1 className="section-headline">Hovedoverskrift (Georgia Serif)</h1>
              <h2 className="section-title">Seksjon Tittel (Inter Sans)</h2>
              <h3 className="section-subtitle">Undertittel (Inter Medium)</h3>
            </div>
          </div>

          {/* Body Text */}
          <div>
            <h3 className="text-xl font-medium text-charcoal mb-6">Brødtekst</h3>
            <div className="bg-white minimal-shadow organic-border p-8 space-y-6">
              <p className="products-section-description">
                Dette er Georgia serif font som brukes til produktbeskrivelser og viktige tekstseksjoner. 
                Den gir en følelse av kvalitet og tradisjon.
              </p>
              <p className="text-charcoal/80">
                Dette er standard Inter sans-serif font som brukes til vanlig brødtekst. 
                Den er lett å lese og moderne i sin utforming.
              </p>
            </div>
          </div>

          {/* Technical Specifications */}
          <div>
            <h3 className="text-xl font-medium text-charcoal mb-6">Tekniske Spesifikasjoner</h3>
            <div className="bg-white minimal-shadow organic-border p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <strong className="text-charcoal">Georgia Serif:</strong>
                  <ul className="text-charcoal/70 mt-2 space-y-1 whitespace-pre-line">
{`• Hero overskrifter (.hero-naturlig, .hero-velvare)
• Produktbeskrivelser (.products-section-description)
• Seksjon headlines (.section-headline)
• Gir følelse av kvalitet og tradisjon`}
                  </ul>
                </div>
                <div>
                  <strong className="text-charcoal">Inter/SF Pro Display Sans:</strong>
                  <ul className="text-charcoal/70 mt-2 space-y-1 whitespace-pre-line">
{`• Seksjon titler (.section-title)
• Undertitler (.section-subtitle)
• Vanlig brødtekst og UI elementer
• Moderne og lettlest`}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Typography;