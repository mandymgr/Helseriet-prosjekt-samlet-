import React from 'react';

interface AnimationsProps {
  isDarkTheme?: boolean;
  selectedLanguage?: string;
}

const Animations: React.FC<AnimationsProps> = () => {
  return (
    <section id="animasjoner" className="zen-spacing bg-stone_light/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-light mb-12 text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
          Animasjonssystem
        </h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium text-charcoal mb-6">Hover Effekter</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white minimal-shadow organic-border p-6 hover-float">
                <h4 className="font-medium text-charcoal mb-2">Float Effect</h4>
                <p className="text-sm text-charcoal/70">Subtle lift on hover (.hover-float)</p>
              </div>
              
              <div className="bg-white minimal-shadow organic-border p-6 cinema-hover">
                <h4 className="font-medium text-charcoal mb-2">Cinema Hover</h4>
                <p className="text-sm text-charcoal/70">3D transform effect (.cinema-hover)</p>
              </div>
              
              <div className="bg-white minimal-shadow organic-border p-6 micro-interaction">
                <h4 className="font-medium text-charcoal mb-2">Micro Interaction</h4>
                <p className="text-sm text-charcoal/70">Small scale change (.micro-interaction)</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium text-charcoal mb-6">Loading States</h3>
            <div className="bg-white minimal-shadow organic-border p-8">
              <div className="slow-reveal">
                <h4 className="font-medium text-charcoal mb-4">Slow Reveal</h4>
                <p className="text-charcoal/70">Content fades in with slight movement (.slow-reveal)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Animations;