import React from 'react';
import { Link, useParams } from 'react-router';

interface BlogArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  icon: React.ReactNode;
  excerpt: string;
  tags: string[];
}

// Sample article data - in a real app this would come from an API
const articles: Record<string, BlogArticle> = {
  'immunforsvar-naturlig-styrking': {
    id: '1',
    title: '5 naturlige måter å styrke immunforsvaret på',
    excerpt: 'Oppdag hvordan du kan støtte kroppens naturlige forsvar gjennom kosthold, livsstil og riktige kosttilskudd.',
    author: 'Rose Kristin Gjervik',
    publishDate: '22. januar 2024',
    readTime: '5 min',
    category: 'Immunforsvar',
    icon: (
      <svg className="w-16 h-16 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    tags: ['immunforsvar', 'naturlig helse', 'kosttilskudd', 'livsstil'],
    content: `# Styrk immunforsvaret naturlig

Immunforsvaret er kroppens naturlige beskyttelse mot bakterier, virus og andre skadelige mikroorganismer. I disse tider er det viktigere enn noensinne å holde immunsystemet sterkt og funksjonelt.

## 1. Spis riktig for immunforsvaret

En variert og næringsrik kosthold er fundamentet for et sterkt immunforsvar. Fokuser på:

- **Grønnsaker og frukt**: Rik på antioksidanter og vitamin C
- **Bær**: Naturlige antioksidanter som bekjemper betennelser  
- **Nøtter og frø**: Vitamin E og sink for immunfunksjonen
- **Fisk**: Omega-3 fettsyrer som reduserer betennelser

## 2. Prioriter søvn

Søvn er kritisk for immunfunksjonen. Under søvn produserer kroppen celler som bekjemper infeksjoner.

**Tips for bedre søvn:**
- Gå til sengs samme tid hver kveld
- Skjerm for blått lys 2 timer før sengetid
- Hold soverommet mørkt og kjølig
- Unngå koffein etter klokka 14

## 3. Håndter stress

Kronisk stress svekker immunforsvaret betydelig. Teknikker som hjelper:

- Meditasjon og mindfulness
- Regular mosjon  
- Dype pusteøvelser
- Tid i naturen

## 4. Beveg deg regelmessig

Moderat mosjon styrker immunforsvaret, mens for intens trening kan svekke det midlertidig.

**Anbefalte aktiviteter:**
- 30 minutter gange daglig
- Yoga eller stretching
- Svømming
- Sykling i moderat tempo

## 5. Strategiske kosttilskudd

Selv med god kosthold kan tilskudd være verdifulle:

### Vitamin D3
- Kritisk for immunfunksjonen
- Anbefalt dose: 1000-2000 IE daglig
- Særlig viktig vintermånedene

### Vitamin C
- Kraftig antioksidant
- Støtter hvite blodceller
- 500-1000mg daglig

### Sink
- Essensielt mineral for immunfunksjonen
- 8-11mg daglig
- Finnes i kjøtt, sjømat og nøtter

### Probiotika
- 70% av immunsystemet er i tarmen
- Støtter tarmfloraen
- Velg produkter med minst 10 milliarder CFU

## Konklusjon

Et sterkt immunforsvar bygges over tid gjennom riktige valg hver dag. Kombiner god kosthold, tilstrekkelig søvn, stressmestring og strategiske kosttilskudd for optimal beskyttelse.

Husk at kosttilskudd aldri skal erstatte et variert kosthold, men kan være et verdifullt supplement til en sunn livsstil.`
  },
  'magnesium-bedre-sovn': {
    id: '2', 
    title: 'Magnesium for bedre søvn: Alt du trenger å vite',
    excerpt: 'Lær hvordan magnesium kan forbedre søvnkvaliteten din og hvilken type som er best.',
    author: 'Dr. Lars Hansen',
    publishDate: '15. januar 2024',
    readTime: '3 min',
    category: 'Søvn & Stress',
    icon: (
      <svg className="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
    ),
    tags: ['magnesium', 'søvn', 'mineraler', 'stress'],
    content: `# Magnesium: Naturens sovemedisin

Magnesium er et av de mest undervurderte mineralene når det kommer til søvnkvalitet. Forskning viser at mange nordmenn har for lite magnesium, noe som kan påvirke både søvn og stressnivå.

## Hvordan magnesium påvirker søvn

Magnesium regulerer flere prosesser som er kritiske for god søvn:

- **GABA-aktivitet**: Øker nivået av beroligende nevrotransmittere
- **Melatoninproduksjon**: Støtter kroppens naturlige søvnhormon  
- **Muskelspenning**: Hjelper musklene å slappe av
- **Stresshormon**: Reduserer cortisol-nivået

## Typer magnesium for søvn

### Magnesium Glycinate
- **Beste absorpsjon**
- Minst mageproblemer
- Ideell for søvn

### Magnesium L-Threanat  
- Krysser blod-hjerne-barrieren
- Direkte virkning på hjernen
- Dyrere, men svært effektiv

### Magnesium Citrate
- God absorpsjon
- Kan ha avførende effekt
- Velg lavere doser

## Dosering og timing

**Anbefalt dose:**
- 200-400mg 1-2 timer før sengetid
- Start med lavere dose
- Øk gradvis ved behov

**Timing:**
- Ta med litt mat for bedre toleranse
- Unngå høye doser på tom mage
- Konsistens er viktig

## Kombinere med andre tiltak

Magnesium fungerer best som del av en helhetlig tilnærming:

- **Melatonin**: 0.5-3mg sammen med magnesium
- **L-theanin**: 100-200mg for ekstra avslapning
- **Kamillete**: Naturlig beroligende

## Når merker du effekt?

- **Umiddelbar**: Bedre muskelavslapning første kveld
- **1 uke**: Lettere å sovne
- **2-4 uker**: Dypere søvn og bedre oppvåkning

## Advarsel og bivirkninger

- Start alltid med lav dose
- Kan gi mageproblemer i begynnelsen  
- Konsulter lege hvis du tar medisiner
- Ikke kombiner med alkohol

God søvn er grunnleggende for helse og velvære. Magnesium kan være nøkkelen til bedre søvnkvalitet for mange.`
  }
};

const BlogArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !articles[slug]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
        <section className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="bg-white minimal-shadow organic-border p-12 backdrop-blur-sm max-w-md mx-auto">
              <svg className="w-16 h-16 text-charcoal/70 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h1 className="text-2xl font-medium text-charcoal mb-4">Artikkel ikke funnet</h1>
              <p className="text-charcoal/70 mb-8">Beklager, vi kunne ikke finne artikkelen du leter etter.</p>
              <Link 
                to="/blogg" 
                className="btn-organic inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Tilbake til bloggen
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const article = articles[slug];

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Handle headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-light text-charcoal mt-12 mb-6 first:mt-0">
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-medium text-charcoal mt-10 mb-5">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-medium text-charcoal mt-8 mb-4">
            {line.substring(4)}
          </h3>
        );
      }
      
      // Handle bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="mb-4 text-charcoal/70 leading-relaxed">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="font-semibold text-charcoal">{part}</strong> : part
            )}
          </p>
        );
      }
      
      // Handle list items
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="mb-3 text-charcoal/70 leading-relaxed flex items-start gap-3">
            <div className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0"></div>
            <span>{line.substring(2)}</span>
          </li>
        );
      }
      
      // Regular paragraphs
      if (line.trim()) {
        return (
          <p key={index} className="mb-6 text-charcoal/70 leading-relaxed">
            {line}
          </p>
        );
      }
      
      return null;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {/* Breadcrumb */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="text-sm text-charcoal/70">
            <Link to="/" className="hover:text-sage transition-colors duration-200">Hjem</Link>
            <span className="mx-2 text-sage">›</span>
            <Link to="/blogg" className="hover:text-sage transition-colors duration-200">Blogg</Link>
            <span className="mx-2 text-sage">›</span>
            <span className="text-charcoal font-medium">{article.category}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border p-12 text-center backdrop-blur-sm">
            <div className="flex justify-center mb-8">
              {article.icon}
            </div>
            
            <div className="mb-6">
              <span className="bg-sage/10 text-sage text-sm font-medium px-4 py-2 rounded-full">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-light text-charcoal mb-6 leading-tight" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              {article.title}
            </h1>
            
            <p className="text-xl text-charcoal/70 mb-8 leading-relaxed max-w-3xl mx-auto">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <span className="font-medium text-charcoal">{article.author}</span>
              </div>
              <span className="text-charcoal/70">•</span>
              <span className="text-charcoal/70">{article.publishDate}</span>
              <span className="text-charcoal/70">•</span>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-charcoal/70">{article.readTime} lesetid</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border p-12 backdrop-blur-sm">
            <div className="prose prose-lg max-w-none">
              <div className="text-lg leading-relaxed">
                {renderContent(article.content)}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-sage/10">
              <h4 className="text-sm font-medium text-charcoal mb-4">Emner:</h4>
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-sage/10 text-sage text-sm font-medium px-3 py-2 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-8 bg-gradient-to-br from-sage/5 to-sage_light/10 rounded-2xl">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal text-lg mb-2">{article.author}</h4>
                  <p className="text-charcoal/70 leading-relaxed">
                    Ernæringsfysiolog og helsespesialist med over 10 års erfaring innen naturlig helse. 
                    Spesialisert på kosttilskudd, immunforsvar og optimal næring for nordmenn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation & Actions */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <Link 
                to="/blogg" 
                className="btn-organic flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Tilbake til bloggen
              </Link>
              
              <div className="flex gap-3">
                <button className="btn-ghost flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                  </svg>
                  Del artikkel
                </button>
                <button className="btn-ghost flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H9.5a2 2 0 01-2-2V5a2 2 0 012-2h8A2 2 0 0119.5 5v2M3 15h12v4l-4-4m0 0l4-4"/>
                  </svg>
                  Skriv ut
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section>
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-light text-charcoal mb-12 text-center" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>Relaterte artikler</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/blogg/probiotika-vs-prebiotika" className="group block">
              <article className="bg-white minimal-shadow organic-border overflow-hidden backdrop-blur-sm hover-float transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-green-400/10 to-emerald-500/10 flex items-center justify-center p-8">
                  <svg className="w-12 h-12 text-green-600 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.82.62-3.5 1.64-4.83l11.19 11.19A7.93 7.93 0 0112 20zm6.36-3.17L7.17 5.64A7.93 7.93 0 0112 4c4.41 0 8 3.59 8 8 0 1.82-.62 3.5-1.64 4.83z"/>
                  </svg>
                </div>
                <div className="p-6">
                  <h4 className="font-medium text-lg text-charcoal mb-3 group-hover:text-sage transition-colors duration-200">
                    Probiotika vs Prebiotika: Hva er forskjellen?
                  </h4>
                  <p className="text-charcoal/70 text-sm leading-relaxed">
                    Forstå forskjellen og lær hvordan begge kan støtte din tarmhelse og immunforsvar.
                  </p>
                </div>
              </article>
            </Link>
            
            <Link to="/blogg/d-vitamin-mangel-norge" className="group block">
              <article className="bg-white minimal-shadow organic-border overflow-hidden backdrop-blur-sm hover-float transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-yellow-400/10 to-orange-500/10 flex items-center justify-center p-8">
                  <svg className="w-12 h-12 text-yellow-600 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
                <div className="p-6">
                  <h4 className="font-medium text-lg text-charcoal mb-3 group-hover:text-sage transition-colors duration-200">
                    D-vitamin mangel i Norge: En skjult epidemi?
                  </h4>
                  <p className="text-charcoal/70 text-sm leading-relaxed">
                    Nye studier viser at majoriteten av nordmenn har for lite D-vitamin, særlig vinterstid.
                  </p>
                </div>
              </article>
            </Link>

            <Link to="/blogg/omega-3-komplette-guide" className="group block">
              <article className="bg-white minimal-shadow organic-border overflow-hidden backdrop-blur-sm hover-float transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-cyan-400/10 to-blue-500/10 flex items-center justify-center p-8">
                  <svg className="w-12 h-12 text-cyan-600 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <div className="p-6">
                  <h4 className="font-medium text-lg text-charcoal mb-3 group-hover:text-sage transition-colors duration-200">
                    Omega-3: Den komplette guiden
                  </h4>
                  <p className="text-charcoal/70 text-sm leading-relaxed">
                    Alt du trenger å vite om omega-3 fettsyrer og deres helsefordeler for hjertet.
                  </p>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogArticle;