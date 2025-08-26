import React from 'react';
import { Link, useLocation } from 'react-router';
import logoImage from '../../assets/images/logo_no_background.png';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { label: 'Kosttilskudd', href: '/kosttilskudd' },
  { label: 'Yoga & Wellness', href: '/yoga-wellness' },
  { label: 'Blogg', href: '/blogg' },
  { label: 'Veiledning', href: '/spesialist' },
  { label: 'Filosofi', href: '/filosofi' },
];

const Navbar: React.FC<NavbarProps> = ({ 
  navItems = defaultNavItems 
}) => {
  const location = useLocation();

  return (
    <header className="fixed w-full top-0 z-50 header-blur">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-28 header-mobile">
          {/* Left actions */}
          <div className="flex items-center gap-4 actions-mobile">
            <Link 
              to="/search" 
              className="p-2 text-charcoal hover:text-sage_dark transition-all duration-250 micro-interaction focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage rounded-lg" 
              title="Søk" 
              aria-label="Søk etter produkter"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>
          
          {/* Centered Logo with Navigation */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <Link to="/" className="block mb-2 logo-hover">
              <img 
                src={logoImage} 
                alt="Helseriet - Naturlig helse og kosttilskudd" 
                className="h-20 logo-mobile w-auto mx-auto transition-all duration-250"
              />
            </Link>
            {/* Navigation under logo */}
            <nav className="hidden md:flex gap-6 justify-center">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-charcoal font-light text-sm transition-all duration-200 micro-interaction ${
                      isActive ? 'text-sage_dark' : 'hover:text-sage_dark'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* Right actions */}
          <div className="flex items-center gap-3 actions-mobile">
            <Link 
              to="/registrer" 
              className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-white bg-sage hover:bg-sage_dark rounded-2xl transition-all duration-250 micro-interaction focus:outline-none focus:ring-2 focus:ring-sage/50 focus:ring-offset-2"
            >
              Registrer
            </Link>
            <Link 
              to="/logg-inn" 
              className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-charcoal hover:text-sage_dark border border-sage/20 rounded-2xl hover:bg-sage/5 transition-all duration-250 micro-interaction focus:outline-none focus:ring-2 focus:ring-sage/50 focus:ring-offset-2"
            >
              Logg inn
            </Link>
            <Link 
              to="/account" 
              className="p-2 text-charcoal hover:text-sage_dark transition-all duration-250 micro-interaction focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage rounded-lg" 
              title="Min konto" 
              aria-label="Gå til min konto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <Link 
              to="/handlekurv" 
              className="p-2 text-charcoal hover:text-sage_dark transition-all duration-250 micro-interaction focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage rounded-lg" 
              title="Handlekurv" 
              aria-label="Gå til handlekurv"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5" />
              </svg>
            </Link>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;