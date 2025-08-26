import React, { useState } from 'react';
import { HiCheck } from 'react-icons/hi2';
import { translations, type Language } from '../translations';

interface ColorsProps {
  isDarkTheme?: boolean;
  selectedLanguage?: Language;
}

const Colors: React.FC<ColorsProps> = ({ 
  isDarkTheme = false, 
  selectedLanguage = 'no' 
}) => {
  const t = translations[selectedLanguage];
  const [copiedCode, setCopiedCode] = useState<string>('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  // Enhanced Color Swatch component
  const ColorSwatch: React.FC<{ 
    name: string; 
    hex: string; 
    rgb: string; 
    cssVar?: string;
    usage?: string 
  }> = ({ name, hex, rgb, cssVar, usage }) => (
    <div className="group">
      <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg hover:bg-white/80 transition-colors">
        <div 
          className="w-16 h-16 rounded-xl shadow-md cursor-pointer transition-transform hover:scale-110" 
          style={{backgroundColor: hex}}
          onClick={() => copyToClipboard(hex, `color-${name}`)}
          title="Klikk for å kopiere hex-kode"
        />
        <div className="flex-1">
          <div className="font-medium text-charcoal flex items-center gap-2">
            {name}
            {copiedCode === `color-${name}` && (
              <HiCheck className="w-4 h-4 text-green-500" />
            )}
          </div>
          <div className="text-sm text-charcoal/60 space-y-1">
            <button 
              onClick={() => copyToClipboard(hex, `color-${name}`)}
              className="hover:text-sage cursor-pointer font-mono"
            >
              {hex}
            </button>
            <div className="font-mono">{rgb}</div>
            {cssVar && <div className="font-mono text-terracotta">var(--{cssVar})</div>}
          </div>
          {usage && <div className="text-xs text-charcoal/50 mt-1">{usage}</div>}
        </div>
      </div>
    </div>
  );

  return (
    <section id="farger" className={`zen-spacing ${
      isDarkTheme ? 'bg-charcoal/30' : 'bg-stone_light/30'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className={`text-4xl font-light mb-12 ${
          isDarkTheme ? 'text-warm_white' : 'text-charcoal'
        }`} style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
          {t.colors}
        </h2>
        
        {/* Enhanced Color Palette */}
        <div className="space-y-8 mb-12">
          <div className="bg-white organic-border p-8">
            <h3 className="text-xl font-medium text-charcoal mb-6 flex items-center gap-2">
              <div className="w-4 h-4 bg-sage rounded-full"></div>
              Primærfarger
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ColorSwatch 
                name="Sage" 
                hex="#9CAF88" 
                rgb="rgb(156, 175, 136)"
                cssVar="sage"
                usage="Knapper, ikoner, hover states"
              />
              <ColorSwatch 
                name="Sage Dark" 
                hex="#7A8F6B" 
                rgb="rgb(122, 143, 107)"
                cssVar="sage-dark"
                usage="Hover effekter, aktive tilstander"
              />
              <ColorSwatch 
                name="Terracotta" 
                hex="#D4A574" 
                rgb="rgb(212, 165, 116)"
                cssVar="terracotta"
                usage="Accent elementer, badges"
              />
              <ColorSwatch 
                name="Charcoal" 
                hex="#2C2A26" 
                rgb="rgb(44, 42, 38)"
                cssVar="charcoal"
                usage="Hovedtekst, overskrifter"
              />
            </div>
          </div>

          <div className="bg-white organic-border p-8">
            <h3 className="text-xl font-medium text-charcoal mb-6 flex items-center gap-2">
              <div className="w-4 h-4 bg-warm_white border border-stone_light rounded-full"></div>
              Bakgrunnsfarger
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ColorSwatch 
                name="Warm White" 
                hex="#FDFCF7" 
                rgb="rgb(253, 252, 247)"
                cssVar="warm-white"
                usage="Hovedbakgrunn, kort"
              />
              <ColorSwatch 
                name="Cream" 
                hex="#FAF7F0" 
                rgb="rgb(250, 247, 240)"
                cssVar="cream"
                usage="Produktbilder, subtle sections"
              />
              <ColorSwatch 
                name="Stone Light" 
                hex="#F5F1E8" 
                rgb="rgb(245, 241, 232)"
                cssVar="stone-light"
                usage="Seksjoner, subtle bakgrunner"
              />
              <ColorSwatch 
                name="Stone" 
                hex="#E8E2D5" 
                rgb="rgb(232, 226, 213)"
                cssVar="stone"
                usage="Borders, dividers"
              />
            </div>
          </div>
        </div>

        {/* Color Usage */}
        <div className="bg-white organic-border p-8">
          <h3 className="text-xl font-medium text-charcoal mb-6">Fargebruk Retningslinjer</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-charcoal mb-4">Primær Bruk</h4>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li><strong>Sage (#9CAF88):</strong> Knapper, ikoner, hover states</li>
                <li><strong>Sage Dark (#7A8F6B):</strong> Hover effekter, aktive tilstander</li>
                <li><strong>Charcoal (#2C2A26):</strong> Hovedtekst, overskrifter</li>
                <li><strong>Terracotta (#D4A574):</strong> Accent elementer, badges</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-charcoal mb-4">Bakgrunn Bruk</h4>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li><strong>Warm White (#FDFCF7):</strong> Hovedbakgrunn, kort</li>
                <li><strong>Stone Light (#F5F1E8):</strong> Seksjoner, subtle bakgrunner</li>
                <li><strong>Stone (#E8E2D5):</strong> Borders, dividers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Colors;