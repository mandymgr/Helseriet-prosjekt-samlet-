import React from 'react';
import { Link } from 'react-router';

const Philosophy: React.FC = () => {
  const values = [
    {
      icon: (
        <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
        </svg>
      ),
      title: 'Naturlig kvalitet',
      description: 'Vi bruker kun naturlige ingredienser av høyeste kvalitet fra pålitelige leverandører over hele verden.'
    },
    {
      icon: (
        <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
        </svg>
      ),
      title: 'Vitenskap først',
      description: 'Alle våre produkter er basert på solid vitenskapelig forskning og dokumentasjon.'
    },
    {
      icon: (
        <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      ),
      title: 'Holistisk tilnærming',
      description: 'Vi ser på hele mennesket - kropp, sjel og ånd i vår tilnærming til helse og velvære.'
    }
  ];

  const principles = [
    {
      title: 'Naturens visdom',
      description: 'Århundrer gammel kunnskap om naturens helende kraft kombinert med moderne forskning.'
    },
    {
      title: 'Individuell tilpasning', 
      description: 'Hver person er unik, derfor tilpasser vi våre anbefalinger til dine spesifikke behov.'
    },
    {
      title: 'Forebyggende helse',
      description: 'Vi fokuserer på å forebygge sykdom og fremme optimal helse gjennom naturlige metoder.'
    },
    {
      title: 'Bærekraftig praksis',
      description: 'Vår forpliktelse til miljøet gjenspeiles i alle våre produkter og praksiser.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {/* Hero Section */}
      <section className="page-header">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Vår filosofi
            </h1>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
              Naturlig helse og velvære som livsstil - en helhetlig tilnærming til optimal helse
            </p>
          </div>
        </div>
      </section>

      {/* Main Philosophy */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light text-charcoal mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Naturlig tilnærming til helse
            </h2>
            <p className="text-xl font-light text-charcoal/70 leading-relaxed mb-12">
              Hos Helseriet tror vi på kroppens naturlige evne til å hele seg selv når den får riktig 
              næring og støtte. Vår filosofi er basert på århundrer gammel visdom kombinert med 
              moderne vitenskapelig forskning.
            </p>
            <div className="bg-white minimal-shadow organic-border card-inner max-w-3xl mx-auto">
              <p className="text-2xl font-light text-charcoal leading-relaxed" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif', fontStyle: 'italic'}}>
                "Helse er ikke bare fravær av sykdom, men en tilstand av fullstendig fysisk, mental og sosial velvære"
              </p>
              <p className="text-sage_dark font-medium mt-6">– Verdens helseorganisasjon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-spacing-lg bg-stone_light/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Våre kjerneverdier
            </h2>
            <p className="text-xl font-light text-charcoal/70 max-w-2xl mx-auto">
              Grunnprinsippene som styrer alt vi gjør
            </p>
          </div>

          <div className="grid md:grid-cols-3 card-gap">
            {values.map((value, index) => (
              <div key={index} className="bg-white minimal-shadow organic-border card-inner text-center hover-float transition-all duration-300">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-medium text-charcoal mb-4">{value.title}</h3>
                <p className="text-charcoal/70 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Våre prinsipper
            </h2>
          </div>

          <div className="grid md:grid-cols-2 card-gap">
            {principles.map((principle, index) => (
              <div key={index} className="bg-white minimal-shadow organic-border card-inner hover-float transition-all duration-300">
                <h3 className="text-2xl font-light text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  {principle.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed text-lg">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-spacing-lg bg-charcoal text-warm_white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-light mb-8" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Vår misjon
            </h2>
            <p className="text-2xl font-light leading-relaxed max-w-4xl mx-auto" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              "Å gjøre evidensbasert, naturlig helse tilgjengelig for alle nordmenn, 
              slik at hver enkelt kan leve et sunnere og mer energifyllt liv."
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing-lg bg-warm_white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border card-inner text-center">
            <h2 className="text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Opplev forskjellen
            </h2>
            <p className="text-xl font-light text-charcoal/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              La vår filosofi guide deg mot optimal helse og velvære
            </p>
            <div className="flex flex-col sm:flex-row card-gap justify-center items-center">
              <Link to="/produkter" className="btn-organic">
                Utforsk produkter
              </Link>
              <Link to="/spesialist" className="btn-ghost">
                Snakk med ekspert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Philosophy;