import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { SkipLink } from '../ui';

interface LayoutProps {
  children: React.ReactNode;
  navItems?: Array<{ label: string; href: string; }>;
}

const Layout: React.FC<LayoutProps> = ({ children, navItems }) => {
  return (
    <div className="layout">
      <SkipLink />
      <Navbar navItems={navItems} />
      <main id="main-content" className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;