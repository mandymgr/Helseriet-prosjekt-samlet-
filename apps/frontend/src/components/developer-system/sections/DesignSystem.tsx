import React from 'react';

interface DesignSystemProps {
  isDarkTheme?: boolean;
  selectedLanguage?: string;
}

const DesignSystem: React.FC<DesignSystemProps> = () => {
  return (
    <section id="design-system" className="zen-spacing bg-warm_white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-light mb-12 text-charcoal text-center" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
          Helseriet Designsystem
        </h2>
        
        <div className="space-y-12">
          {/* Design Tokens */}
          <div className="bg-white minimal-shadow organic-border p-8">
            <h3 className="text-2xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Design Tokens
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-sage mb-4">Fargepalett</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-sage rounded-lg"></div>
                    <div className="text-sm">
                      <div className="font-medium">Sage</div>
                      <div className="text-charcoal/60">#9CAF88</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-terracotta rounded-lg"></div>
                    <div className="text-sm">
                      <div className="font-medium">Terracotta</div>
                      <div className="text-charcoal/60">#D4A574</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-charcoal rounded-lg"></div>
                    <div className="text-sm">
                      <div className="font-medium">Charcoal</div>
                      <div className="text-charcoal/60">#2C2A26</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sage mb-4">Typografi</h4>
                <div className="space-y-2">
                  <div className="text-3xl font-light" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>Heading Georgia</div>
                  <div className="text-base">Body text Inter/SF Pro Display</div>
                  <div className="text-sm text-charcoal/70">Small text for captions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Button Components */}
          <div className="bg-white minimal-shadow organic-border p-8">
            <h3 className="text-2xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Button Components
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-sage mb-4">Varianter</h4>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-sage text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg">
                    Primary
                  </button>
                  <button className="px-6 py-3 bg-stone_light text-charcoal rounded-xl font-medium transition-all duration-200 hover:bg-stone">
                    Secondary
                  </button>
                  <button className="px-6 py-3 bg-transparent text-sage border border-sage/20 rounded-xl font-medium transition-all duration-200 hover:bg-sage/10">
                    Outline
                  </button>
                  <button className="px-6 py-3 bg-transparent text-charcoal rounded-xl font-medium transition-all duration-200 hover:bg-sage/10">
                    Ghost
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sage mb-4">Størrelser</h4>
                <div className="flex flex-wrap items-end gap-4">
                  <button className="px-3 py-2 bg-sage text-white rounded-xl text-sm font-medium">
                    Small
                  </button>
                  <button className="px-4 py-3 bg-sage text-white rounded-xl font-medium">
                    Medium
                  </button>
                  <button className="px-6 py-4 bg-sage text-white rounded-xl text-lg font-medium">
                    Large
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Input Components */}
          <div className="bg-white minimal-shadow organic-border p-8">
            <h3 className="text-2xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Input Components
            </h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Standard Input</label>
                  <input 
                    type="text" 
                    placeholder="Skriv her..."
                    className="w-full px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Select Dropdown</label>
                  <select className="w-full px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/50">
                    <option>Velg alternativ</option>
                    <option>Alternativ 1</option>
                    <option>Alternativ 2</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignSystem;