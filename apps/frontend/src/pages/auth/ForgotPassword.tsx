import React, { useState } from 'react';
import { Link } from 'react-router';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Vennligst skriv inn din e-postadresse');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Ugyldig e-postadresse');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // TODO: Implement actual forgot password API call
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.message || 'Noe gikk galt. Prøv igjen senere.');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Nettverksfeil. Sjekk internett-tilkoblingen din.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage/5 to-sage_light/10 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-md mx-auto">
            {/* Success Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-sage/10 p-8 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sage to-sage_dark rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-semibold text-charcoal mb-4">
                E-post sendt!
              </h1>
              
              <p className="text-charcoal/70 mb-6 leading-relaxed">
                Vi har sendt instruksjoner for å tilbakestille passordet ditt til{' '}
                <span className="font-medium text-charcoal">{email}</span>
              </p>
              
              <div className="bg-sage/5 rounded-2xl p-4 mb-6">
                <p className="text-sm text-charcoal/70">
                  💡 Sjekk også spam-mappen din hvis du ikke finner e-posten i innboksen
                </p>
              </div>

              <div className="space-y-3">
                <Link 
                  to="/logg-inn" 
                  className="w-full btn-organic text-center block"
                >
                  Tilbake til innlogging
                </Link>
                
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                  className="w-full btn-ghost text-center"
                >
                  Send på nytt
                </button>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 text-center">
              <p className="text-charcoal/60 text-sm mb-4">
                Trenger du hjelp? Kontakt vår kundeservice
              </p>
              <Link 
                to="/kontakt" 
                className="text-sage hover:text-sage_dark transition-colors text-sm font-medium"
              >
                📧 Kontakt oss
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/5 to-sage_light/10 pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link 
              to="/logg-inn" 
              className="inline-flex items-center gap-2 text-sage hover:text-sage_dark transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Tilbake til innlogging
            </Link>
          </div>

          {/* Reset Password Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-sage/10 p-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-sage/10 to-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-light text-charcoal mb-3">
                Glemt passord?
              </h1>
              
              <p className="text-charcoal/70 leading-relaxed">
                Ingen problem! Skriv inn e-postadressen din, så sender vi deg en link for å tilbakestille passordet.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                  E-postadresse
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-200 bg-white text-charcoal placeholder-charcoal_light/50"
                  placeholder="din@epost.no"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-sage hover:bg-sage_dark disabled:bg-sage/50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-2xl transition-all duration-200"
              >
                {loading ? 'Sender...' : 'Send tilbakestillingslink'}
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-sage/5 rounded-2xl">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-charcoal mb-1">
                    Husk å sjekke spam-mappen
                  </p>
                  <p className="text-xs text-charcoal/70">
                    E-posten kan havne i spam- eller søppelpostmappen din. Linken er gyldig i 1 time.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <p className="text-charcoal/70 text-sm">
                Husket du passordet? 
                <Link 
                  to="/logg-inn" 
                  className="text-sage hover:text-sage_dark transition-colors font-medium ml-1"
                >
                  Logg inn her
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;