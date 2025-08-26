import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

interface Campaign {
  id: string;
  badge: string;
  badgeColor?: string;
  title: string;
  description: string;
  price: string;
  link: string;
  icon: React.ReactNode;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Kampanjer: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 3,
    hours: 14,
    minutes: 28,
    seconds: 45
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const activeCampaigns: Campaign[] = [
    {
      id: '1',
      badge: '-25%',
      title: 'Omega-3 pakke',
      description: 'Kjøp 3 betal for 2 på alle Omega-3 produkter',
      price: 'Fra 597 kr',
      link: '/produkter?category=omega3',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      )
    },
    {
      id: '2',
      badge: 'PAKKETILBUD',
      title: 'Immunforsvar-pakken',
      description: 'C-vitamin, D-vitamin og Zinc til spesialpris',
      price: '399 kr',
      link: '/bundle-immunforsvar',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      )
    },
    {
      id: '3',
      badge: '-30%',
      title: 'Magnesium salg',
      description: 'Alle magnesium-produkter på salg denne uken',
      price: 'Fra 139 kr',
      link: '/produkter?category=magnesium',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      <section>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Kampanjer og tilbud
            </h1>
            <p className="text-xl text-charcoal/70">Spar stort på våre beste produkter</p>
          </div>

          {/* Featured Campaign */}
          <div className="mb-20">
            <div className="bg-white minimal-shadow organic-border overflow-hidden backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-sage/20 to-sage/10 flex items-center justify-center p-8 lg:p-16">
                  <div className="w-32 h-32 bg-sage/20 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-8 lg:p-16 flex flex-col justify-center">
                  <span className="inline-block bg-terracotta text-warm_white text-sm font-medium px-4 py-2 rounded-full mb-6 self-start">
                    UKENS TILBUD
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                    Spar 40% på utvalgte vitaminer
                  </h2>
                  <p className="text-charcoal/70 mb-8 leading-relaxed">
                    Gjelder alle B-vitaminer, Vitamin C og Multivitaminer. 
                    Tilbudet gjelder t.o.m. søndag 28. januar.
                  </p>
                  <div className="mb-8">
                    <div className="text-sm text-charcoal/70 mb-4">Tilbudet utløper om:</div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-stone_light/30 rounded-2xl p-4 text-center">
                        <div className="text-3xl font-light text-sage" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                          {countdown.days.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-charcoal/70 font-medium">DAGER</div>
                      </div>
                      <div className="bg-stone_light/30 rounded-2xl p-4 text-center">
                        <div className="text-3xl font-light text-sage" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                          {countdown.hours.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-charcoal/70 font-medium">TIMER</div>
                      </div>
                      <div className="bg-stone_light/30 rounded-2xl p-4 text-center">
                        <div className="text-3xl font-light text-sage" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                          {countdown.minutes.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-charcoal/70 font-medium">MIN</div>
                      </div>
                      <div className="bg-stone_light/30 rounded-2xl p-4 text-center">
                        <div className="text-3xl font-light text-sage" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                          {countdown.seconds.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-charcoal/70 font-medium">SEK</div>
                      </div>
                    </div>
                  </div>
                  <Link to="/produkter?sale=vitaminer" className="btn-organic flex items-center gap-3 self-start">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    Se tilbud
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Active Campaigns Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Aktive kampanjer
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {activeCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm hover-float transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <span className="bg-terracotta text-warm_white text-xs font-medium px-3 py-1.5 rounded-full">
                      {campaign.badge}
                    </span>
                    <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center">
                      {campaign.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-charcoal mb-3">{campaign.title}</h3>
                  <p className="text-charcoal/70 text-sm mb-6 leading-relaxed">{campaign.description}</p>
                  <p className="text-2xl font-light text-sage mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                    {campaign.price}
                  </p>
                  <Link 
                    to={campaign.link} 
                    className="text-charcoal hover:text-sage transition-colors duration-200 text-sm font-medium flex items-center gap-2"
                  >
                    {campaign.badge.includes('PAKKE') ? 'Kjøp pakken' : 
                     campaign.badge.includes('%') ? 'Handle nå' : 'Se produkter'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal Offers */}
          <div className="mb-20">
            <h2 className="text-3xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Sesong-tilbud
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-sage/20 to-sage/10 border border-sage/30 rounded-2xl p-8 backdrop-blur-sm">
                <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  Vinter-vitaminer
                </h3>
                <p className="text-charcoal/70 mb-6 leading-relaxed">
                  Støtt immunforsvaret gjennom vinteren med våre spesielt utvalgte produkter.
                </p>
                <Link to="/produkter?season=vinter" className="btn-ghost flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  Se vinter-sortiment
                </Link>
              </div>

              <div className="bg-gradient-to-br from-terracotta/20 to-terracotta/10 border border-terracotta/30 rounded-2xl p-8 backdrop-blur-sm">
                <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  Detox og rens
                </h3>
                <p className="text-charcoal/70 mb-6 leading-relaxed">
                  Start året rett med våre rense- og detox-produkter for ny energi.
                </p>
                <Link to="/produkter?category=detox" className="btn-ghost flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Utforsk detox
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Signup for Exclusive Offers */}
          <div className="bg-gradient-to-br from-charcoal to-charcoal/90 text-warm_white rounded-2xl p-12 text-center mb-16 backdrop-blur-sm">
            <div className="w-20 h-20 bg-warm_white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-warm_white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
              </svg>
            </div>
            <h2 className="text-3xl font-light mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Få eksklusive tilbud først!
            </h2>
            <p className="text-warm_white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Meld deg på vårt nyhetsbrev og få 15% rabatt på første kjøp, 
              pluss tidlig tilgang til alle kampanjer og medlemstilbud.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Din e-postadresse" 
                className="flex-1 px-4 py-3 rounded-2xl text-charcoal border border-warm_white/20 focus:outline-none focus:ring-2 focus:ring-warm_white/50 bg-warm_white"
              />
              <button className="bg-sage text-warm_white px-6 py-3 rounded-2xl hover:bg-sage_dark transition-colors duration-200 font-medium flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                Meld meg på
              </button>
            </div>
          </div>

          {/* Member Benefits */}
          <div className="bg-white minimal-shadow organic-border p-12 text-center backdrop-blur-sm">
            <h2 className="text-3xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Bli medlem for eksklusive tilbud
            </h2>
            <p className="text-charcoal/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Som medlem får du tilgang til medlemspriser, tidlig tilgang til kampanjer og bonuspoeng på alle kjøp.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-3">Medlemspriser</h3>
                <p className="text-sm text-charcoal/70">Ekstra rabatt på utvalgte produkter</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-3">Tidlig tilgang</h3>
                <p className="text-sm text-charcoal/70">Få tilgang til kampanjer før alle andre</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-3">Bonuspoeng</h3>
                <p className="text-sm text-charcoal/70">Opptjen poeng på alle kjøp</p>
              </div>
            </div>
            <Link to="/registrer" className="btn-organic flex items-center gap-3 mx-auto">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Bli medlem gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kampanjer;