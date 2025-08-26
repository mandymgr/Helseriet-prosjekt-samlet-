import React from 'react';
import { Link } from 'react-router';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  icon: React.ReactNode;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const OmOss: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Rose Kristin Gjervik',
      role: 'Gründer & CEO',
      bio: 'Ernæringsfysiolog med over 15 års erfaring innen naturlig helse og kosttilskudd.',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      )
    },
    {
      name: 'Dr. Lars Hansen',
      role: 'Medisinsk rådgiver',
      bio: 'Lege spesialist i allmennmedisin med fokus på forebyggende helse.',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8"/>
        </svg>
      )
    },
    {
      name: 'Anne Mette Olsen',
      role: 'Produktspesialist',
      bio: 'Master i biokjemi og ekspert på kvalitetssikring av kosttilskudd.',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
        </svg>
      )
    },
    {
      name: 'Marcus Wellness',
      role: 'Treningsekspert',
      bio: 'Personlig trener og ernæringsrådgiver for aktive og idrettsutøvere.',
      icon: (
        <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      )
    }
  ];

  const milestones: Milestone[] = [
    {
      year: '1990',
      title: 'Grunnlagt',
      description: 'Helseriet ble grunnlagt med visjonen om å gjøre naturlig helse tilgjengelig for alle.'
    },
    {
      year: '2000',
      title: 'Utvidelse',
      description: 'Åpnet vår første fysiske butikk og utvidet produktsortimentet betydelig.'
    },
    {
      year: '2010',
      title: 'Digital satsing',
      description: 'Lanserte vår nettbutikk og ble ledende innen online helseprodukter.'
    },
    {
      year: '2020',
      title: 'Bærekraft',
      description: 'Innførte strenge bærekraftskrav og miljøvennlig emballasje.'
    },
    {
      year: '2024',
      title: 'AI-basert rådgivning',
      description: 'Introduserte personlig helserådgivning basert på kunstig intelligens.'
    }
  ];

  const values = [
    {
      icon: (
        <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
        </svg>
      ),
      title: 'Naturlig kvalitet',
      description: 'Vi velger kun de beste naturlige råvarene fra pålitelige leverandører over hele verden.'
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
      title: 'Bærekraft',
      description: 'Vi tar ansvar for miljøet gjennom bærekraftige innkjøp og miljøvennlig emballasje.'
    },
    {
      icon: (
        <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      ),
      title: 'Kundefokus',
      description: 'Dine behov og helse står alltid i sentrum for alt vi gjør.'
    }
  ];

  const stats = [
    { number: '30+', label: 'År med erfaring' },
    { number: '100k+', label: 'Fornøyde kunder' },
    { number: '500+', label: 'Kvalitetsprodukter' },
    { number: '24/7', label: 'Kundeservice' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {/* Hero Section */}
      <section className="page-header">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Din partner for naturlig helse
            </h1>
            <p className="text-xl text-charcoal/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              I over 30 år har vi hjulpet nordmenn med å oppnå optimal helse gjennom 
              naturlige produkter av høyeste kvalitet og evidensbasert rådgivning.
            </p>
            <div className="flex flex-col sm:flex-row card-gap justify-center items-center">
              <Link to="/produkter" className="btn-organic flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                Utforsk produkter
              </Link>
              <Link to="/kontakt" className="btn-ghost flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Kontakt oss
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 card-gap">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white minimal-shadow organic-border card-inner text-center backdrop-blur-sm hover-float transition-all duration-300">
                <div className="text-4xl lg:text-5xl font-light text-sage mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  {stat.number}
                </div>
                <div className="text-charcoal/70 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-spacing-lg bg-stone_light/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Vår historie
            </h2>
            <p className="text-xl font-light text-charcoal/70 max-w-2xl mx-auto">
              En reise gjennom tre tiår med lidenskap for naturlig helse
            </p>
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-white minimal-shadow organic-border card-inner backdrop-blur-sm hover-float transition-all duration-300">
                <div className="flex items-start card-gap">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-sage to-sage_dark text-warm_white rounded-full flex items-center justify-center font-light text-lg" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                      {milestone.title}
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed text-lg">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-spacing-lg bg-warm_white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Våre verdier
            </h2>
            <p className="text-xl font-light text-charcoal/70 max-w-2xl mx-auto">
              Grunnprinsippene som styrer alt vi gjør
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 card-gap">
            {values.map((value, index) => (
              <div key={index} className="bg-white minimal-shadow organic-border card-inner text-center backdrop-blur-sm hover-float transition-all duration-300">
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

      {/* Team Section */}
      <section className="section-spacing-lg bg-stone_light/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Møt vårt team
            </h2>
            <p className="text-xl font-light text-charcoal/70 max-w-2xl mx-auto">
              Ekspertene som gjør Helseriet til en ledende aktør
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 card-gap">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white minimal-shadow organic-border card-inner text-center backdrop-blur-sm hover-float transition-all duration-300">
                <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {member.icon}
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-2">{member.name}</h3>
                <p className="text-sage font-medium mb-4">{member.role}</p>
                <p className="text-sm text-charcoal/70 leading-relaxed">{member.bio}</p>
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

      {/* Certifications */}
      <section className="section-spacing-lg bg-stone_light/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Sertifiseringer og godkjenninger
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 card-gap">
            <div className="bg-white minimal-shadow organic-border card-inner text-center backdrop-blur-sm hover-float transition-all duration-300">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="font-medium text-charcoal mb-2">ISO 9001</p>
              <p className="text-sm text-charcoal/70">Kvalitetsledelse</p>
            </div>
            <div className="bg-white minimal-shadow organic-border card-inner text-center backdrop-blur-sm hover-float transition-all duration-300">
              <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <p className="font-medium text-charcoal mb-2">Økologisk</p>
              <p className="text-sm text-charcoal/70">Sertifiserte produkter</p>
            </div>
            <div className="bg-white minimal-shadow organic-border card-inner text-center backdrop-blur-sm hover-float transition-all duration-300">
              <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                </svg>
              </div>
              <p className="font-medium text-charcoal mb-2">GMP</p>
              <p className="text-sm text-charcoal/70">God produksjonspraksis</p>
            </div>
            <div className="bg-white minimal-shadow organic-border card-inner text-center backdrop-blur-sm hover-float transition-all duration-300">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="font-medium text-charcoal mb-2">FDA</p>
              <p className="text-sm text-charcoal/70">Godkjent fasilitet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-spacing-lg bg-warm_white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border card-inner text-center backdrop-blur-sm">
            <h2 className="text-4xl font-light text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Klar til å starte din helsereise?
            </h2>
            <p className="text-xl font-light text-charcoal/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              La våre eksperter hjelpe deg med å finne de riktige produktene for dine behov
            </p>
            <div className="flex flex-col sm:flex-row card-gap justify-center items-center">
              <Link to="/spesialist" className="btn-organic flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2zm8 0h-2a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2z"/>
                </svg>
                Ta helsetest
              </Link>
              <Link to="/spesialist" className="btn-ghost flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Snakk med ekspert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OmOss;