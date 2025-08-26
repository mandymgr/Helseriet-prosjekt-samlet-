import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const Account: React.FC = () => {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'profile'>('dashboard');

  const handleLogout = async () => {
    await logout();
    navigate('/logg-inn');
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage mx-auto mb-4"></div>
            <p className="text-charcoal">Laster kontoinformasjon...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-responsive-h1 text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Min konto
            </h1>
            <div className="bg-white organic-border minimal-shadow card-inner max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h3 className="text-responsive-h3 text-charcoal mb-4">Du er ikke logget inn</h3>
              <p className="text-responsive-body text-charcoal/70 mb-6">
                Du må logge inn for å se kontoinformasjonen din.
              </p>
              <div className="space-y-3">
                <Link to="/logg-inn" className="btn-primary w-full text-center">
                  Logg inn
                </Link>
                <Link to="/registrer" className="btn-ghost w-full text-center">
                  Opprett konto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50 pt-32 pb-16">
      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-responsive-h1 text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              Min konto
            </h1>
            <p className="text-responsive-body text-charcoal/70">
              Velkommen tilbake, {user.firstName} {user.lastName}
            </p>
          </div>
        </div>
      </section>

      {/* ACCOUNT CONTENT */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* ACCOUNT NAVIGATION */}
            <div className="lg:col-span-1">
              <div className="bg-white organic-border minimal-shadow p-6">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone_light">
                  <div className="w-12 h-12 bg-gradient-to-br from-sage to-sage_dark rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal">{user.firstName} {user.lastName}</h3>
                    <p className="text-sm text-charcoal/70">{user.email}</p>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveSection('dashboard')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${
                      activeSection === 'dashboard' 
                        ? 'bg-sage text-white' 
                        : 'text-charcoal hover:bg-sage/10'
                    }`}
                  >
                    <span className="text-lg">🏠</span>
                    Oversikt
                  </button>
                  
                  <Link
                    to="/account/orders"
                    className="w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 text-charcoal hover:bg-sage/10"
                  >
                    <span className="text-lg">📦</span>
                    Mine ordrer
                  </Link>
                  
                  <Link
                    to="/account/favorites"
                    className="w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 text-charcoal hover:bg-sage/10"
                  >
                    <span className="text-lg">❤️</span>
                    Favoritter
                  </Link>
                  
                  <Link
                    to="/account/subscriptions"
                    className="w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 text-charcoal hover:bg-sage/10"
                  >
                    <span className="text-lg">📋</span>
                    Abonnementer
                  </Link>
                  
                  <Link
                    to="/account/addresses"
                    className="w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 text-charcoal hover:bg-sage/10"
                  >
                    <span className="text-lg">🏠</span>
                    Adresser
                  </Link>
                  
                  <button
                    onClick={() => setActiveSection('profile')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${
                      activeSection === 'profile' 
                        ? 'bg-sage text-white' 
                        : 'text-charcoal hover:bg-sage/10'
                    }`}
                  >
                    <span className="text-lg">⚙️</span>
                    Innstillinger
                  </button>
                  
                  <hr className="my-4 border-stone_light" />
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 text-red-600 hover:bg-red-50"
                  >
                    <span className="text-lg">🚪</span>
                    Logg ut
                  </button>
                </nav>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-3">
              {activeSection === 'dashboard' && (
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/account/orders" className="bg-gradient-to-br from-sage/10 to-sage/20 organic-border p-6 hover:shadow-lg transition-all duration-200 group">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-charcoal/70">Totalt bestillinger</p>
                          <p className="text-2xl font-bold text-charcoal group-hover:text-sage transition-colors">3</p>
                        </div>
                        <span className="text-3xl">📦</span>
                      </div>
                    </Link>
                    
                    <Link to="/account/favorites" className="bg-gradient-to-br from-terracotta/10 to-terracotta/20 organic-border p-6 hover:shadow-lg transition-all duration-200 group">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-charcoal/70">Favoritter</p>
                          <p className="text-2xl font-bold text-charcoal group-hover:text-terracotta transition-colors">12</p>
                        </div>
                        <span className="text-3xl">❤️</span>
                      </div>
                    </Link>
                    
                    <Link to="/account/subscriptions" className="bg-gradient-to-br from-sage/10 to-terracotta/10 organic-border p-6 hover:shadow-lg transition-all duration-200 group">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-charcoal/70">Aktive abonnementer</p>
                          <p className="text-2xl font-bold text-charcoal group-hover:text-sage transition-colors">2</p>
                        </div>
                        <span className="text-3xl">📋</span>
                      </div>
                    </Link>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="bg-white organic-border minimal-shadow p-6">
                    <h2 className="text-xl font-semibold text-charcoal mb-6">Hurtighandlinger</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Link to="/account/orders" className="btn-organic text-center">
                        📦 Mine ordrer
                      </Link>
                      <Link to="/account/favorites" className="btn-ghost text-center">
                        ❤️ Favoritter
                      </Link>
                      <Link to="/produkter" className="btn-ghost text-center">
                        🛍️ Handle nå
                      </Link>
                      <Link to="/account/addresses" className="btn-ghost text-center">
                        🏠 Adresser
                      </Link>
                    </div>
                  </div>
                  
                  {/* Recent Activity */}
                  <div className="bg-white organic-border minimal-shadow p-6">
                    <h2 className="text-xl font-semibold text-charcoal mb-6">Nylig aktivitet</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-sage/5 rounded-xl">
                        <span className="text-2xl">📦</span>
                        <div className="flex-1">
                          <p className="font-medium text-charcoal">Ordre #HK-2024-0523 er sendt</p>
                          <p className="text-sm text-charcoal/70">2 dager siden</p>
                        </div>
                        <Link to="/account/orders" className="text-sage text-sm font-medium hover:text-sage_dark">
                          Se detaljer →
                        </Link>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-terracotta/5 rounded-xl">
                        <span className="text-2xl">❤️</span>
                        <div className="flex-1">
                          <p className="font-medium text-charcoal">Lagt til 3 nye favoritter</p>
                          <p className="text-sm text-charcoal/70">1 uke siden</p>
                        </div>
                        <Link to="/account/favorites" className="text-terracotta text-sm font-medium hover:text-terracotta/80">
                          Se favoritter →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'profile' && (
                <div className="bg-white organic-border minimal-shadow p-6">
                  <h2 className="text-2xl font-semibold text-charcoal mb-6">Profilinformasjon</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Fornavn</label>
                      <input
                        type="text"
                        value={user.firstName || ''}
                        className="w-full px-4 py-3 border border-stone_light rounded-xl bg-stone_light/30"
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Etternavn</label>
                      <input
                        type="text"
                        value={user.lastName || ''}
                        className="w-full px-4 py-3 border border-stone_light rounded-xl bg-stone_light/30"
                        readOnly
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-charcoal mb-2">E-postadresse</label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-4 py-3 border border-stone_light rounded-xl bg-stone_light/30"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-stone_light">
                    <div className="flex gap-3">
                      <button className="btn-organic">
                        Rediger profil
                      </button>
                      <button className="btn-ghost">
                        Endre passord
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;