import React from 'react';

interface SpacingProps {
  isDarkTheme?: boolean;
  selectedLanguage?: string;
}

const Spacing: React.FC<SpacingProps> = () => {

  return (
    <section id="spacing" className="section-spacing-lg bg-charcoal">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-light mb-12 text-warm_white" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
          Spacing System
        </h2>
        
        {/* Spacing Scale */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-medium mb-6 text-warm_white">Design Tokens</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-warm_white/10 p-4 rounded-lg">
                <span className="text-warm_white/80 font-mono text-sm">--space-4</span>
                <span className="text-warm_white text-sm">16px - Base</span>
                <div className="w-4 h-4 bg-sage rounded"></div>
              </div>
              <div className="flex items-center justify-between bg-warm_white/10 p-4 rounded-lg">
                <span className="text-warm_white/80 font-mono text-sm">--space-8</span>
                <span className="text-warm_white text-sm">32px - Large</span>
                <div className="w-8 h-4 bg-sage rounded"></div>
              </div>
              <div className="flex items-center justify-between bg-warm_white/10 p-4 rounded-lg">
                <span className="text-warm_white/80 font-mono text-sm">--space-16</span>
                <span className="text-warm_white text-sm">64px - Section</span>
                <div className="w-16 h-4 bg-sage rounded"></div>
              </div>
              <div className="flex items-center justify-between bg-warm_white/10 p-4 rounded-lg">
                <span className="text-warm_white/80 font-mono text-sm">--space-32</span>
                <span className="text-warm_white text-sm">128px - Hero</span>
                <div className="w-32 h-4 bg-sage rounded"></div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-6 text-warm_white">Faktiske Utility Classes</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-warm_white/10 p-4 rounded-lg">
                <code className="text-sage font-mono">.section-spacing</code>
                <p className="text-warm_white/80 mt-1">Standard spacing for seksjoner - brukes på alle hovedsider</p>
              </div>
              <div className="bg-warm_white/10 p-4 rounded-lg">
                <code className="text-sage font-mono">.section-spacing-lg</code>
                <p className="text-warm_white/80 mt-1">Stor seksjon spacing for hero områder</p>
              </div>
              <div className="bg-warm_white/10 p-4 rounded-lg">
                <code className="text-sage font-mono">.page-header</code>
                <p className="text-warm_white/80 mt-1">Standard page header spacing (pt-32 pb-16)</p>
              </div>
              <div className="bg-warm_white/10 p-4 rounded-lg">
                <code className="text-sage font-mono">.card-inner</code>
                <p className="text-warm_white/80 mt-1">Indre kort padding - brukes i alle produktkort</p>
              </div>
              <div className="bg-warm_white/10 p-4 rounded-lg">
                <code className="text-sage font-mono">.card-gap</code>
                <p className="text-warm_white/80 mt-1">Standard gap mellom kort (gap-6)</p>
              </div>
              <div className="bg-warm_white/10 p-4 rounded-lg">
                <code className="text-sage font-mono">.max-w-6xl mx-auto px-6</code>
                <p className="text-warm_white/80 mt-1">Standard container mønster - brukes på alle sider</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Examples */}
        <div className="bg-warm_white/10 rounded-lg p-8">
          <h3 className="text-xl font-medium mb-6 text-warm_white">Visuell Rytme</h3>
          <div className="space-y-8">
            <div className="bg-sage/20 p-6 rounded-lg">
              <h4 className="font-medium text-warm_white mb-4">Section med .section-spacing</h4>
              <p className="text-warm_white/80 breathe-md">Dette er en seksjon med konsistent spacing.</p>
              <div className="grid md:grid-cols-2 card-gap">
                <div className="card-inner bg-warm_white/10 rounded-lg">
                  <p className="text-warm_white/80">Kort med .card-inner padding</p>
                </div>
                <div className="card-inner bg-warm_white/10 rounded-lg">
                  <p className="text-warm_white/80">32px gap mellom kortene</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-terracotta/10 rounded-lg border border-terracotta/20">
          <h4 className="font-medium text-terracotta mb-3">Spacing Filosofi</h4>
          <p className="text-warm_white/80 text-sm leading-relaxed">
            Helseriet bruker en <strong>matematisk 8px-basert skala</strong> for perfekt pixel-alignment. 
            Designet skaper <strong>"breathing room"</strong> som gjør innholdet lettere å scanne og mer 
            visuelt behagelig. Alle spacing-verdier følger en <strong>harmonisk progresjon</strong> som 
            sikrer konsistens på tvers av hele designsystemet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Spacing;