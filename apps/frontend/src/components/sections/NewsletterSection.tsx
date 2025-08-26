import React, { useState } from 'react';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter signup
      console.log('Newsletter signup:', email);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="bg-charcoal py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Hold kontakt med din reise
        </h2>
        
        <p className="text-lg text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Motta månedlige refleksjoner om helse, eksklusive produktnyheter og personlige tips 
          for å opprettholde balanse i hverdagen.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="din@epost.no"
            className="flex-1 px-6 py-4 rounded-full bg-neutral-700 border border-neutral-600 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all duration-200"
            required
          />
          <button
            type="submit"
            disabled={!email || isSubmitted}
            className="px-8 py-4 bg-sage-500 text-white font-medium rounded-full hover:bg-sage-600 disabled:bg-sage-400 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
          >
            {isSubmitted ? 'Takk!' : 'Hold kontakt'}
          </button>
        </form>

        {isSubmitted && (
          <p className="text-sage-300 text-sm mt-4 animate-fade-in">
            Takk for at du meldte deg på! Du vil motta en bekreftelse på e-post.
          </p>
        )}

        <p className="text-xs text-neutral-500 mt-6">
          Vi respekterer ditt personvern og sender kun meningsfullt innhold.
        </p>
      </div>

    </section>
  );
};

export default NewsletterSection;