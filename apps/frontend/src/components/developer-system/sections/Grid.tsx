import React from 'react';

interface GridProps {
  isDarkTheme?: boolean;
  selectedLanguage?: string;
}

const Grid: React.FC<GridProps> = () => {
  return (
    <section id="grid" className="section-spacing bg-warm_white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-light mb-12 text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
          Grid System
        </h2>
        <div className="space-y-6">
          <div>
            <div className="text-sm text-charcoal/60 mb-2">Asymmetric Grid (Golden Ratio)</div>
            <div className="asymmetric-grid gap-8">
              <div className="bg-sage/20 p-8 rounded-lg">
                <h4 className="font-medium text-charcoal mb-2">Main Content (62%)</h4>
                <p className="text-sm text-charcoal/70">Primary content area following golden ratio</p>
              </div>
              <div className="bg-terracotta/20 p-8 rounded-lg">
                <h4 className="font-medium text-charcoal mb-2">Sidebar (38%)</h4>
                <p className="text-sm text-charcoal/70">Secondary content area</p>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm text-charcoal/60 mb-2">Standard Grid (Equal Columns)</div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-sage/10 p-6 rounded-lg text-center">
                <div className="font-medium text-charcoal">Col 1</div>
              </div>
              <div className="bg-sage/10 p-6 rounded-lg text-center">
                <div className="font-medium text-charcoal">Col 2</div>
              </div>
              <div className="bg-sage/10 p-6 rounded-lg text-center">
                <div className="font-medium text-charcoal">Col 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Grid;