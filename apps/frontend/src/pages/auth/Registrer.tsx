import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  newsletter: boolean;
  terms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  terms?: string;
  general?: string;
}

const Registrer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    newsletter: true,
    terms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Fornavn er påkrevd';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Etternavn er påkrevd';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-postadresse er påkrevd';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ugyldig e-postadresse';
    }

    if (!formData.password) {
      newErrors.password = 'Passord er påkrevd';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Passord må være minst 8 tegn';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Passord må inneholde store og små bokstaver samt tall';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passordene stemmer ikke overens';
    }

    if (!formData.terms) {
      newErrors.terms = 'Du må godta vilkårene for å fortsette';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setErrors({});
      
      const result = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      
      if (result.success) {
        // Successfully registered and logged in
        navigate('/account');
      } else {
        setErrors({ general: result.error || 'Registrering feilet' });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/5 to-sage_light/10 pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-lg mx-auto">
          {/* Registration Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-sage/10 p-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-light text-charcoal mb-3">Opprett konto</h1>
              <p className="text-charcoal_light">Bli en del av Helseriet-familien</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
                  {errors.general}
                </div>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-2">
                    Fornavn
                  </label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-200 bg-white text-charcoal placeholder-charcoal_light/50 ${
                      errors.firstName ? 'border-red-400 focus:ring-red-400' : 'border-sage/20'
                    }`}
                    placeholder="Ola"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-charcoal mb-2">
                    Etternavn
                  </label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-200 bg-white text-charcoal placeholder-charcoal_light/50 ${
                      errors.lastName ? 'border-red-400 focus:ring-red-400' : 'border-sage/20'
                    }`}
                    placeholder="Nordmann"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                  E-postadresse
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-200 bg-white text-charcoal placeholder-charcoal_light/50 ${
                    errors.email ? 'border-red-400 focus:ring-red-400' : 'border-sage/20'
                  }`}
                  placeholder="din@epost.no"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                  className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-200 bg-white text-charcoal placeholder-charcoal_light/50 ${
                    errors.password ? 'border-red-400 focus:ring-red-400' : 'border-sage/20'
                  }`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                <p className="text-xs text-charcoal_light mt-1">Minst 8 tegn med store/små bokstaver og tall</p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal mb-2">
                  Bekreft passord
                </label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-200 bg-white text-charcoal placeholder-charcoal_light/50 ${
                    errors.confirmPassword ? 'border-red-400 focus:ring-red-400' : 'border-sage/20'
                  }`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Phone Field (Optional) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                  Telefonnummer <span className="text-charcoal_light font-normal">(valgfritt)</span>
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="w-full px-4 py-3 border border-sage/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-200 bg-white text-charcoal placeholder-charcoal_light/50"
                  placeholder="+47 123 45 678"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              {/* Newsletter Subscription */}
              <div>
                <label className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    name="newsletter"
                    className="mt-1 rounded border-sage/20 text-sage focus:ring-sage"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                  />
                  <div>
                    <span className="text-sm text-charcoal font-medium">Meld meg på nyhetsbrevet</span>
                    <p className="text-xs text-charcoal_light mt-1">Få eksklusive tilbud og helsetips direkte i innboksen din</p>
                  </div>
                </label>
              </div>

              {/* Terms and Conditions */}
              <div>
                <label className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    name="terms"
                    className="mt-1 rounded border-sage/20 text-sage focus:ring-sage"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    required
                  />
                  <div>
                    <span className="text-sm text-charcoal">
                      Jeg godtar{' '}
                      <Link to="/vilkar" className="text-sage hover:text-sage_dark transition-colors duration-200">
                        vilkårene og betingelsene
                      </Link>
                      {' '}og{' '}
                      <Link to="/personvern" className="text-sage hover:text-sage_dark transition-colors duration-200">
                        personvernerklæringen
                      </Link>
                    </span>
                  </div>
                </label>
                {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
              </div>

              {/* Register Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-sage hover:bg-sage_dark disabled:bg-sage/50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-2xl transition-all duration-200 micro-interaction"
              >
                {loading ? 'Oppretter konto...' : 'Opprett konto'}
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

            {/* Social Registration Options */}
            <div className="space-y-3">
              <button className="w-full border border-sage/20 hover:bg-sage/5 text-charcoal font-medium py-3 px-6 rounded-2xl transition-all duration-200 micro-interaction flex items-center justify-center gap-3">
                <svg className="w-5 h-5 text-sage" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm16 0v10H5V7h14z"/>
                  <path d="M7 10h10v1H7zM7 12h6v1H7z"/>
                </svg>
                Registrer med BankID
              </button>
              <button className="w-full border border-sage/20 hover:bg-sage/5 text-charcoal font-medium py-3 px-6 rounded-2xl transition-all duration-200 micro-interaction flex items-center justify-center gap-3">
                <svg className="w-5 h-5 text-sage" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                </svg>
                Registrer med Apple
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-8">
              <p className="text-charcoal_light">
                Har du allerede en konto? 
                <Link 
                  to="/logg-inn" 
                  className="text-sage hover:text-sage_dark transition-colors duration-200 font-medium ml-1"
                >
                  Logg inn her
                </Link>
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-12 text-center">
            <h2 className="text-xl font-light text-charcoal mb-6">Som medlem får du</h2>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="flex items-center justify-center gap-3 text-charcoal_light">
                <svg className="w-5 h-5 text-sage flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>10% rabatt på første bestilling</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-charcoal_light">
                <svg className="w-5 h-5 text-sage flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>Eksklusive tilbud og helsetips</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-charcoal_light">
                <svg className="w-5 h-5 text-sage flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1s1 .45 1 1v2h4V2c0-.55.45-1 1-1s1 .45 1 1v2h5c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h3z"/>
                </svg>
                <span>Gratis frakt på alle bestillinger over 1500 kr</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-charcoal_light">
                <svg className="w-5 h-5 text-sage flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18z"/>
                </svg>
                <span>Raskere utsjekking og ordresporing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrer;