import React, { useState } from 'react';
import { Link } from 'react-router';

const GlemtPassord: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsLoading(false);

    // Auto redirect after 5 seconds
    setTimeout(() => {
      window.location.href = '/logg-inn';
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white via-stone_light/30 to-sage/5 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Success Card */}
          <div className="bg-warm_white organic-border minimal-shadow p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h1 className="text-3xl font-bold text-charcoal mb-2" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                E-post sendt!
              </h1>
              <p className="text-charcoal/70 leading-relaxed">
                Vi har sendt instruksjoner for tilbakestilling av passord til <strong>{email}</strong>. 
                Sjekk innboksen din (og spam-mappen).
              </p>
            </div>

            <div className="text-center">
              <Link 
                to="/logg-inn"
                className="btn-ghost inline-flex items-center gap-2 mb-4"
              >
                <span>←</span>
                Tilbake til innlogging
              </Link>
              <p className="text-xs text-charcoal/50">
                Blir automatisk sendt til innlogging om 5 sekunder...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white via-stone_light/30 to-sage/5 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Reset Password Card */}
        <div className="bg-warm_white organic-border minimal-shadow p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h1 className="text-3xl font-bold text-charcoal mb-2" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Glemt passord?
            </h1>
            <p className="text-charcoal/70 leading-relaxed">
              Ingen grunn til bekymring. Vi sender deg instruksjoner for å tilbakestille passordet ditt.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                E-postadresse
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-stone_light rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200"
                placeholder="din@epost.no"
                required
                disabled={isLoading}
              />
              <p className="text-xs text-charcoal/50 mt-2">
                Skriv inn e-postadressen knyttet til din Helseriet-konto
              </p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`
                w-full btn-organic flex items-center justify-center gap-3
                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-warm_white border-t-transparent rounded-full animate-spin"></div>
                  Sender...
                </>
              ) : (
                'Send reset-link'
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-8">
            <Link 
              to="/logg-inn" 
              className="text-charcoal/70 hover:text-sage transition-colors inline-flex items-center gap-2"
            >
              <span>←</span>
              Tilbake til innlogging
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-r from-stone_light/50 to-sage/10 organic-border p-6">
          <h2 className="font-semibold text-charcoal mb-3">Trenger du hjelp?</h2>
          <p className="text-sm text-charcoal/70 mb-4 leading-relaxed">
            Hvis du ikke mottar e-posten, sjekk spam-mappen din. Hvis du fortsatt har problemer, 
            ta kontakt med vår kundeservice.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-charcoal/70">
              <span>📧</span>
              <a 
                href="mailto:kundeservice@helseriet.no" 
                className="hover:text-sage underline transition-colors"
              >
                kundeservice@helseriet.no
              </a>
            </div>
            <div className="flex items-center gap-2 text-charcoal/70">
              <span>📞</span>
              <span>+47 123 45 678</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal/70">
              <span>🕒</span>
              <span>Man-Fre: 09:00-17:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlemtPassord;