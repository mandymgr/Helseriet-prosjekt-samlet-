import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineShieldCheck,
  HiArrowRight,
  HiOutlineHome
} from 'react-icons/hi2';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login process
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password combination
      if (email && password) {
        localStorage.setItem('admin-token', 'demo-token');
        navigate('/admin');
      } else {
        setError('Vennligst fyll ut alle felt');
      }
    } catch (err) {
      setError('Innlogging feilet. Prøv igjen.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          body {
            padding-top: 0 !important;
          }
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 flex items-center justify-center px-6">
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-sage/10 rounded-full breath-animation"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-terracotta/10 rounded-full breath-animation" style={{animationDelay: '-2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-stone/20 rounded-full breath-animation" style={{animationDelay: '-4s'}}></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6 hover-float">
              <HiOutlineShieldCheck className="w-10 h-10 text-sage" />
            </div>
            <h1 className="text-4xl font-light text-charcoal mb-4" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Admin Innlogging
            </h1>
            <p className="text-charcoal/70 font-light">
              Logg inn for å administrere Helseriet
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white minimal-shadow organic-border p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-terracotta/10 border border-terracotta/20 text-terracotta px-4 py-3 rounded-lg text-sm">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-stone organic-border focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
                  placeholder="admin@helseriet.no"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                  Passord
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-stone organic-border focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal/60 hover:text-charcoal transition-colors"
                  >
                    {showPassword ? (
                      <HiOutlineEyeSlash className="w-5 h-5" />
                    ) : (
                      <HiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-sage focus:ring-sage border-stone organic-border"
                  />
                  <span className="ml-2 text-sm text-charcoal/70">Husk meg</span>
                </label>
                <Link 
                  to="/admin/glemt-passord" 
                  className="text-sm text-sage hover:text-sage_dark micro-interaction"
                >
                  Glemt passord?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full btn-organic flex items-center justify-center ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Logg inn
                    <HiArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-sage/5 organic-border">
              <h4 className="text-sm font-medium text-charcoal mb-2">Demo Tilgang:</h4>
              <p className="text-xs text-charcoal/60 mb-2">
                Bruk hvilken som helst e-post og passord for å logge inn til demo
              </p>
              <div className="space-y-1 text-xs text-charcoal/60">
                <div>E-post: <code className="bg-stone/50 px-1 rounded">admin@helseriet.no</code></div>
                <div>Passord: <code className="bg-stone/50 px-1 rounded">admin123</code></div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-charcoal/60 hover:text-charcoal micro-interaction"
            >
              <HiOutlineHome className="w-4 h-4 mr-2" />
              Tilbake til nettbutikk
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;