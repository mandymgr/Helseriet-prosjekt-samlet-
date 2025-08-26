import React from 'react';
import { Link } from 'react-router';
import { HiArrowRight, HiOutlineCube } from 'react-icons/hi2';
import { type Language } from '../translations';

interface CardsProps {
  isDarkTheme?: boolean;
  selectedLanguage?: Language;
}

const Cards: React.FC<CardsProps> = () => {

  return (
    <section id="kort" className="zen-spacing bg-stone_light/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-light mb-12 text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
          Kortsystem
        </h2>
        
        <div className="space-y-12">
          {/* Category Cards */}
          <div className="mb-12">
            <h4 className="text-lg font-medium text-charcoal mb-6">Kategori Kort</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white minimal-shadow organic-border p-8 text-center hover-float group">
                <div className="w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 bg-sage/30 rounded-full flex items-center justify-center">
                    <HiOutlineCube className="w-10 h-10 text-sage group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  Vitaminer
                </h3>
                <p className="text-charcoal/70 font-light mb-8 leading-relaxed">
                  Essensielle vitaminer for optimal daglig helse og vitalitet
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-charcoal/50 font-light">45 produkter</span>
                  <Link to="/vitaminer" className="text-charcoal font-medium hover:text-sage_dark micro-interaction flex items-center">
                    Utforsk
                    <HiArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Product Cards */}
          <div className="mb-12">
            <h4 className="text-lg font-medium text-charcoal mb-6">Produkt Kort</h4>
            <div className="space-y-10">
              {/* Featured Product Card */}
              <div>
                <h5 className="text-md font-medium text-charcoal mb-4">Hovedprodukt Kort</h5>
                <div className="bg-white minimal-shadow organic-border hover-float relative max-w-sm mx-auto overflow-hidden">
                  {/* Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <span className="bg-terracotta text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">Bestseller</span>
                  </div>
                  
                  {/* Product Content */}
                  <div className="p-8 text-center">
                    {/* Product Image Placeholder */}
                    <div className="w-32 h-32 bg-cream rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <span className="text-sage text-sm">Produkt</span>
                    </div>
                    
                    {/* Product Info */}
                    <h3 className="text-xl font-medium text-charcoal mb-3" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                      Pure Synergy Superfood
                    </h3>
                    <p className="text-charcoal/60 text-sm mb-6 leading-relaxed">
                      Komplett superfood blend med 60+ næringsstoffer
                    </p>
                    
                    {/* Price */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <span className="text-2xl font-medium text-charcoal">kr 899</span>
                      <span className="text-lg text-charcoal/50 line-through">kr 1299</span>
                    </div>
                    
                    {/* Actions */}
                    <div className="space-y-3">
                      <button className="w-full bg-sage hover:bg-sage_dark text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center group">
                        Legg i kurv
                        <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="btn-ghost w-full text-center text-sm font-medium">
                        Se produkt
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Specifications */}
              <div>
                <h5 className="text-md font-medium text-charcoal mb-4">Kort Spesifikasjoner</h5>
                <div className="bg-white organic-border p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h6 className="font-medium text-charcoal mb-3">Styling Klasser</h6>
                      <ul className="text-sm text-charcoal/70 space-y-1">
                        <li>• <code className="bg-stone_light px-2 py-1 rounded">.organic-border</code> - Avrundede hjørner</li>
                        <li>• <code className="bg-stone_light px-2 py-1 rounded">.minimal-shadow</code> - Subtil skygge</li>
                        <li>• <code className="bg-stone_light px-2 py-1 rounded">.hover-float</code> - Hover animasjon</li>
                        <li>• <code className="bg-stone_light px-2 py-1 rounded">.card-inner</code> - Indre padding</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-charcoal mb-3">Design Prinsipper</h6>
                      <ul className="text-sm text-charcoal/70 space-y-1">
                        <li>• Konsistent spacing og padding</li>
                        <li>• Tydelig visuell hierarki</li>
                        <li>• Smooth hover-effekter</li>
                        <li>• Naturinspirerte farger</li>
                      </ul>
                    </div>
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

export default Cards;