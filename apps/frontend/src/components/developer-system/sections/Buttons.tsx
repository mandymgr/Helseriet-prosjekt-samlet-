import React, { useState } from 'react';
import { 
  HiArrowRight, 
  HiOutlineUsers,
  HiEye,
  HiCodeBracket,
  HiCheck,
  HiClipboardDocument
} from 'react-icons/hi2';
import { type Language } from '../translations';

interface ButtonsProps {
  isDarkTheme?: boolean;
  selectedLanguage?: Language;
}

const Buttons: React.FC<ButtonsProps> = () => {
  const [copiedCode, setCopiedCode] = useState<string>('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  // Interactive Button Demo component
  const ButtonDemo: React.FC<{ children: React.ReactNode; variant?: string }> = ({ children, variant = 'primary' }) => {
    const [isClicked, setIsClicked] = useState(false);
    
    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 1000);
    };

    return (
      <button 
        onClick={handleClick}
        className={`btn-${variant === 'primary' ? 'organic' : 'ghost'} ${isClicked ? 'scale-95' : ''} transition-transform`}
      >
        {children} {isClicked ? '✓' : ''}
      </button>
    );
  };

  const CodeBlock: React.FC<{ code: string; language?: string; title?: string; id: string }> = ({ 
    code, 
    language = 'css', 
    title, 
    id 
  }) => (
    <div className="bg-charcoal rounded-lg overflow-hidden mb-4">
      {title && (
        <div className="flex items-center justify-between bg-charcoal/90 px-4 py-2 border-b border-warm_white/10">
          <span className="text-warm_white/80 text-sm font-medium">{title}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-warm_white/50 bg-warm_white/10 px-2 py-1 rounded">{language}</span>
            <button
              onClick={() => copyToClipboard(code, id)}
              className="text-warm_white/70 hover:text-warm_white transition-colors p-1 rounded hover:bg-warm_white/10"
              title="Copy to clipboard"
            >
              {copiedCode === id ? (
                <HiCheck className="w-4 h-4 text-green-400" />
              ) : (
                <HiClipboardDocument className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-warm_white/90 text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );

  return (
    <section id="knapper" className="zen-spacing bg-warm_white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-light mb-12 text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
          Knappesystem
        </h2>
        
        <div className="space-y-12">
          {/* Primary Buttons */}
          <div>
            <h3 className="text-xl font-medium text-charcoal mb-6">Primærknapper</h3>
            <div className="bg-white minimal-shadow organic-border p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Interactive Demo */}
                <div>
                  <h4 className="font-medium text-charcoal mb-4 flex items-center gap-2">
                    <HiEye className="w-5 h-5 text-sage" />
                    Interaktiv Demo
                  </h4>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <ButtonDemo variant="primary">
                        Organic Button
                        <HiArrowRight className="ml-2 w-4 h-4" />
                      </ButtonDemo>
                      <ButtonDemo variant="ghost">
                        Ghost Button
                      </ButtonDemo>
                      <button className="bg-sage hover:bg-sage_dark text-white py-3 px-6 rounded-xl font-medium transition-colors hover:scale-105 active:scale-95">
                        Standard Sage
                      </button>
                    </div>
                    <p className="text-sm text-charcoal/60">👆 Klikk på knappene for å se interaksjon</p>
                  </div>
                </div>

                {/* Code Examples */}
                <div>
                  <h4 className="font-medium text-charcoal mb-4 flex items-center gap-2">
                    <HiCodeBracket className="w-5 h-5 text-terracotta" />
                    Kodeeksempler
                  </h4>
                  <div className="space-y-3">
                    <CodeBlock
                      title="Primary Button"
                      language="tsx"
                      id="btn-organic"
                      code={`<button className="btn-organic">
  Se produkter
  <HiArrowRight className="ml-2 w-5 h-5" />
</button>`}
                    />
                    <CodeBlock
                      title="Ghost Button"
                      language="tsx"
                      id="btn-ghost"
                      code={`<button className="btn-ghost">
  Se produkt
</button>`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button States */}
          <div>
            <h3 className="text-xl font-medium text-charcoal mb-6">Knapp States</h3>
            <div className="bg-white minimal-shadow organic-border p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <button className="btn-organic mb-2">Normal</button>
                  <p className="text-sm text-charcoal/60">Default state</p>
                </div>
                <div className="text-center">
                  <button className="btn-organic bg-sage_dark mb-2">Hover</button>
                  <p className="text-sm text-charcoal/60">Hover state</p>
                </div>
                <div className="text-center">
                  <button className="btn-organic opacity-50 cursor-not-allowed mb-2" disabled>Disabled</button>
                  <p className="text-sm text-charcoal/60">Disabled state</p>
                </div>
              </div>
            </div>
          </div>

          {/* Faktiske Knapper Fra Hovedsider */}
          <div>
            <h3 className="text-xl font-medium text-charcoal mb-6">Faktiske Implementasjoner</h3>
            <div className="bg-white minimal-shadow organic-border p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-charcoal/80 mb-3">Hero Section Knapper (Home.tsx):</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn-organic">
                      Se produkter
                      <HiArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <button className="btn-ghost">
                      Snakk med spesialist
                      <HiOutlineUsers className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-charcoal/80 mb-3">Produktkort Knapper:</p>
                  <div className="flex gap-4">
                    <button className="btn-ghost w-full text-center text-sm font-medium">
                      Se produkt
                    </button>
                    <button className="w-full bg-sage hover:bg-sage_dark text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center group">
                      Legg i kurv
                      <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-charcoal/80 mb-3">Filter Knapper:</p>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-stone_light rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-250">
                      <option>Alle produkter</option>
                      <option>Enkeltprodukter</option>
                      <option>Pakker</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="Søk etter produkter..."
                      className="px-3 py-2 border border-stone_light rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all duration-250"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Buttons;