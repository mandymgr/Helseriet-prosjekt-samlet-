import React, { useState } from 'react';
import { Link } from 'react-router';

const Avbestilling: React.FC = () => {
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock subscription data
  const subscription = {
    name: 'Premium Helsepakke',
    price: 1899,
    nextDelivery: '15. september 2025',
    status: 'Aktiv'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowSuccess(true);
    setIsSubmitting(false);
  };

  const handleAlternative = (type: 'pause' | 'change') => {
    // In real app, this would redirect to appropriate pages
    alert(`Omdirigerer til ${type === 'pause' ? 'pause abonnement' : 'endre abonnement'} side...`);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-warm_white organic-border minimal-shadow p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✅</span>
            </div>
            <h1 className="text-2xl font-bold text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Abonnement kansellert
            </h1>
            <p className="text-charcoal/70 mb-6 leading-relaxed">
              Ditt abonnement er nå kansellert. Du vil ikke få flere leveringer etter dagens dato.
            </p>
            <p className="text-sm text-charcoal/60 mb-8">
              Takk for tilbakemeldingen din. Den hjelper oss å forbedre tjenesten vår.
            </p>
            <div className="space-y-3">
              <Link to="/account" className="btn-organic w-full">
                Tilbake til min konto
              </Link>
              <Link to="/" className="btn-ghost w-full">
                Gå til forsiden
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <div className="flex items-center space-x-2 text-charcoal/60">
            <Link to="/" className="hover:text-sage transition-colors">Hjem</Link>
            <span>/</span>
            <Link to="/account" className="hover:text-sage transition-colors">Min konto</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">Avbestill abonnement</span>
          </div>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Avbestill abonnement
          </h1>
          <p className="text-lg text-charcoal/70">
            Vi er lei for at du ønsker å avslutte abonnementet ditt
          </p>
        </div>

        {/* Subscription Info */}
        <div className="bg-gradient-to-r from-stone_light/50 to-sage/10 organic-border p-8 mb-8">
          <h2 className="text-xl font-bold text-charcoal mb-6">Ditt abonnement</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-charcoal/70">Abonnement:</span>
              <span className="font-semibold text-charcoal">{subscription.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-charcoal/70">Pris per måned:</span>
              <span className="font-semibold text-charcoal">{subscription.price.toLocaleString()} kr</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-charcoal/70">Neste levering:</span>
              <span className="font-semibold text-charcoal">{subscription.nextDelivery}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-charcoal/70">Status:</span>
              <span className="font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">
                {subscription.status}
              </span>
            </div>
          </div>
        </div>

        {/* Before You Cancel */}
        <div className="bg-gradient-to-r from-terracotta/10 to-sage/10 border-l-4 border-terracotta organic-border p-8 mb-8">
          <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Før du avbestiller
          </h3>
          <div className="text-charcoal/80 space-y-3">
            <p className="flex items-start gap-2">
              <span className="text-terracotta font-bold">•</span>
              Du kan <strong>pause</strong> abonnementet i stedet for å kansellere
            </p>
            <p className="flex items-start gap-2">
              <span className="text-terracotta font-bold">•</span>
              Du kan <strong>endre leveringsfrekvens</strong> til mindre hyppig
            </p>
            <p className="flex items-start gap-2">
              <span className="text-terracotta font-bold">•</span>
              Du kan <strong>bytte til en rimeligere pakke</strong>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-terracotta font-bold">•</span>
              Du mister <strong>20% rabatt</strong> og gratis frakt ved kansellering
            </p>
          </div>
        </div>

        {/* Alternative Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-warm_white organic-border p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-sage/20 to-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⏸️</span>
            </div>
            <h3 className="font-semibold text-charcoal mb-3 text-lg">Pause abonnement</h3>
            <p className="text-charcoal/70 mb-6 leading-relaxed">
              Ta en pause på 1-6 måneder og gjenoppta når du ønsker
            </p>
            <button 
              onClick={() => handleAlternative('pause')}
              className="btn-ghost w-full"
            >
              Pause i stedet
            </button>
          </div>

          <div className="bg-warm_white organic-border p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-terracotta/20 to-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔄</span>
            </div>
            <h3 className="font-semibold text-charcoal mb-3 text-lg">Endre abonnement</h3>
            <p className="text-charcoal/70 mb-6 leading-relaxed">
              Velg andre produkter, frekvens eller pakke-størrelse
            </p>
            <button 
              onClick={() => handleAlternative('change')}
              className="btn-ghost w-full"
            >
              Endre i stedet
            </button>
          </div>
        </div>

        {/* Cancellation Form */}
        <div className="bg-warm_white organic-border minimal-shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-charcoal mb-8 text-center">
            Kanseller abonnement
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-charcoal mb-3">
                Hvorfor ønsker du å kansellere? (valgfritt)
              </label>
              <select 
                id="reason" 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200"
              >
                <option value="">Velg årsak...</option>
                <option value="too-expensive">For dyrt</option>
                <option value="not-using">Bruker ikke produktene</option>
                <option value="found-alternative">Fant annen leverandør</option>
                <option value="quality-issues">Kvalitetsproblemer</option>
                <option value="delivery-issues">Leveringsproblemer</option>
                <option value="health-reasons">Helseårsaker</option>
                <option value="other">Annet</option>
              </select>
            </div>

            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-charcoal mb-3">
                Tilbakemelding til oss (valgfritt)
              </label>
              <textarea 
                id="feedback" 
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200 resize-none" 
                placeholder="Del dine tanker om hvordan vi kan forbedre oss..."
              />
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-red-600 text-lg">⚠️</span>
                <div>
                  <p className="text-red-800 font-medium mb-2">Viktig informasjon:</p>
                  <p className="text-red-700 text-sm leading-relaxed">
                    Kanselleringen trer i kraft umiddelbart. Du vil ikke få flere leveringer 
                    etter denne datoen og mister alle abonnementsfordeler.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-stone_light/30 rounded-xl">
              <input 
                type="checkbox" 
                id="confirm"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 w-4 h-4 text-sage border-stone_light rounded focus:ring-sage/20"
                required
              />
              <label htmlFor="confirm" className="text-sm text-charcoal/80 leading-relaxed">
                Jeg bekrefter at jeg ønsker å kansellere abonnementet mitt. 
                Jeg forstår at jeg mister rabatten og kan ikke gjenopprette dette abonnementet.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/account" className="btn-ghost flex-1 text-center">
                Gå tilbake
              </Link>
              <button 
                type="submit"
                disabled={!confirmed || isSubmitting}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-red-300 disabled:to-red-400 text-warm_white py-3 px-6 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-warm_white border-t-transparent rounded-full animate-spin"></div>
                    Kansellerer...
                  </>
                ) : (
                  'Kanseller abonnement'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-charcoal mb-4">Trenger du hjelp?</h3>
          <p className="text-charcoal/70 mb-8 leading-relaxed max-w-2xl mx-auto">
            Vårt kundeserviceteam kan hjelpe deg med spørsmål om abonnementet ditt. 
            Vi er her for å finne en løsning som passer deg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kontakt" className="btn-ghost">
              📞 Kontakt kundeservice
            </Link>
            <Link to="/faq" className="btn-ghost">
              ❓ Se vanlige spørsmål
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avbestilling;