import React, { useState } from 'react';
import { Link } from 'react-router';
import logoImage from '../../assets/images/logo_no_background.png';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <>
      {/* Newsletter - Zen Style */}
      <section className="zen-spacing bg-charcoal">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="newsletter-heading mb-6">Hold kontakt med din reise</h2>
          <p className="newsletter-description mb-12 max-w-2xl mx-auto">
            Motta månedlige refleksjoner om helse, eksklusive produktnyheter og personlige tips 
            for å opprettholde balanse i hverdagen.
          </p>
          
          <form className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="din@epost.no" 
                className="newsletter-input flex-1 px-6 py-4 bg-warm_white/10 border border-warm_white/20 rounded-full placeholder-warm_white/50 focus:outline-none focus:border-sage"
              />
              <button type="submit" className="btn-organic">
                Hold kontakt
              </button>
            </div>
          </form>
          
          <p className="newsletter-privacy mt-6">
            Vi respekterer ditt personvern og sender kun meningsfullt innhold.
          </p>
        </div>
      </section>

      <footer className="footer-bg-original">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="footer-grid">
            {/* Brand Section */}
            <div>
              <div className="mb-4">
                <img 
                  src={logoImage} 
                  alt="Helseriet Logo" 
                  className="h-12 w-auto opacity-90 mb-4"
                />
              </div>
              <p className="text-charcoal/60 font-light mb-6 max-w-[28rem] line-height-original">
                Vi skaper rom for naturlig helse og velvære gjennom nøye utvalgte produkter 
                og holistisk veiledning. Din reise mot optimal helse starter her.
              </p>
              
              {/* Social Media */}
              <div className="flex gap-6">
                <a 
                  href="#" 
                  className="text-charcoal/40 hover:text-sage_dark transition-all duration-200 hover:-translate-y-0.5"
                  title="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="text-charcoal/40 hover:text-sage_dark transition-all duration-200 hover:-translate-y-0.5"
                  title="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium text-charcoal mb-4">Utforsk</h4>
              <ul className="footer-list">
                <li>
                  <Link 
                    to="/produkter" 
                    className="text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                  >
                    Alle produkter
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/kategorier" 
                    className="text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                  >
                    Kategorier
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/helsepakker" 
                    className="text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                  >
                    Helsepakker
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/spesialist" 
                    className="text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                  >
                    Konsultasjon
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blogg" 
                    className="text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                  >
                    Helseblogg
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/tilbud" 
                    className="text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                  >
                    Tilbud
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-medium text-charcoal mb-4">Kundeservice</h4>
              <ul className="footer-list">
                <li>
                  <Link 
                    to="/kontakt" 
                    className="text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                  >
                    Kontakt oss
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/faq" 
                    className="text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                  >
                    Ofte stilte spørsmål
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/frakt" 
                    className="text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                  >
                    Frakt og levering
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/retur" 
                    className="text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                  >
                    Retur og refusjon
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-medium text-charcoal mb-4">Kontakt oss</h4>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-charcoal/40">✉</span>
                  <span className="text-charcoal/60">kundeservice@helseriet.no</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-charcoal/40">☎</span>
                  <span className="text-charcoal/60">+47 123 45 678</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-charcoal/40">◔</span>
                  <span className="text-charcoal/60">Man-Fre: 09:00-17:00</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-6">
                <p className="text-xs text-charcoal/50 mb-4">
                  Meld deg på vårt nyhetsbrev:
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Din e-post"
                    className="text-xs px-2 py-1 border border-gray-300 rounded flex-1 focus:outline-none focus:border-sage"
                    required
                  />
                  <button
                    type="submit"
                    className="text-xs bg-sage text-white px-3 py-1 rounded hover:bg-sage_dark transition-colors"
                  >
                    Meld på
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-original mt-12 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-charcoal/50 font-light text-sm m-0">
                © {new Date().getFullYear()} Helseriet. Laget med omtanke for naturlig velvære.
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link 
                  to="/personvern" 
                  className="text-xs text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                >
                  Personvern
                </Link>
                <Link 
                  to="/vilkar" 
                  className="text-xs text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                >
                  Vilkår
                </Link>
                <Link 
                  to="/cookies" 
                  className="text-xs text-charcoal/60 font-light hover:text-sage_dark transition-colors duration-200 border-b border-transparent hover:border-sage_dark"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;