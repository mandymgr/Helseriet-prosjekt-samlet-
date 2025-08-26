import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const LoggInn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState<string | null>(null);
  const { login, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Vennligst fyll ut alle felt');
      return;
    }

    setError(null);
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      // Redirect based on user role
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/account');
      }
    } else {
      setError(result.error || 'Innlogging feilet');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/5 to-sage_light/10 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-md mx-auto">
            {/* Login Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-sage/10 p-8 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-light text-charcoal mb-3">Logg inn</h1>
                <p className="text-charcoal_light">Velkommen tilbake til Helseriet</p>
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
                    name="email" 
                    className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-200 bg-white text-charcoal placeholder-charcoal_light/50"
                    placeholder="din@epost.no"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                    Passord
                  </label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-200 bg-white text-charcoal placeholder-charcoal_light/50"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      name="rememberMe"
                      className="rounded border-sage/20 text-sage focus:ring-sage"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <span className="text-sm text-charcoal">Husk meg</span>
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-sage hover:text-sage_dark transition-colors duration-200"
                  >
                    Glemt passord?
                  </Link>
                </div>

                {/* Login Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-sage hover:bg-sage_dark disabled:bg-sage/50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-2xl transition-all duration-200 micro-interaction"
                >
                  {loading ? 'Logger inn...' : 'Logg inn'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-sage/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-charcoal_light">Eller</span>
                </div>
              </div>

              {/* Social Login Options */}
              <div className="space-y-3">
                <button className="w-full border border-sage/20 hover:bg-sage/5 text-charcoal font-medium py-3 px-6 rounded-2xl transition-all duration-200 micro-interaction flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-sage" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm16 0v10H5V7h14z"/>
                    <path d="M7 10h10v1H7zM7 12h6v1H7z"/>
                  </svg>
                  Fortsett med BankID
                </button>
                <button className="w-full border border-sage/20 hover:bg-sage/5 text-charcoal font-medium py-3 px-6 rounded-2xl transition-all duration-200 micro-interaction flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-sage" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                  </svg>
                  Fortsett med Apple
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-8">
                <p className="text-charcoal_light">
                  Har du ikke en konto? 
                  <Link 
                    to="/registrer" 
                    className="text-sage hover:text-sage_dark transition-colors duration-200 font-medium ml-1"
                  >
                    Registrer deg her
                  </Link>
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-12 text-center">
              <h2 className="text-xl font-light text-charcoal mb-6">Fordeler med å ha en konto</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2 text-charcoal_light">
                  <span className="text-sage">✓</span>
                  <span>Spor dine bestillinger</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-charcoal_light">
                  <span className="text-sage">✓</span>
                  <span>Lagre favoritter</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-charcoal_light">
                  <span className="text-sage">✓</span>
                  <span>Raskere utsjekking</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-charcoal_light">
                  <span className="text-sage">✓</span>
                  <span>Eksklusive tilbud</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoggInn;