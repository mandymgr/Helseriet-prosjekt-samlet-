import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  HiArrowRight, 
  HiOutlineCube,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineArchiveBox,
  HiOutlineHeart,
  HiOutlineStar,
  HiXMark,
  HiSun,
  HiMoon,
  HiCog6Tooth,
  HiMagnifyingGlass,
  HiWrenchScrewdriver,
  HiUsers,
  HiCircleStack,
  HiOutlinePhoto
} from 'react-icons/hi2';

// Import modular components
import { translations, type Language } from '../../components/developer-system/translations';
import { 
  ProjectOverview,
  MagicCliSystem,
  CoordinationSystem,
  BackupSystem,
  AdminDashboardStatus,
  CloudinaryManagement,
  Typography, 
  Colors, 
  Buttons, 
  Cards, 
  Spacing, 
  Grid, 
  Animations, 
  DesignSystem 
} from '../../components/developer-system/sections';

const DeveloperSystem: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('no');
  const [activeSection] = useState('prosjektoversikt');
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[selectedLanguage];

  // Load saved preferences from localStorage on component mount
  useEffect(() => {
    document.body.classList.add('developer-system');
    
    const savedTheme = localStorage.getItem('helseriet-theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
    }
    
    const savedLanguage = localStorage.getItem('helseriet-language') as Language;
    if (savedLanguage && (['no', 'en', 'sv', 'da'] as const).includes(savedLanguage)) {
      setSelectedLanguage(savedLanguage);
    }
    
    return () => {
      document.body.classList.remove('developer-system');
    };
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('helseriet-theme', newTheme ? 'dark' : 'light');
  };

  const handleLanguageChange = (languageCode: Language) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('helseriet-language', languageCode);
  };

  const sections = [
    { id: 'prosjektoversikt', title: t.projectOverview, icon: HiOutlineCube },
    { id: 'magic-cli-system', title: '🪄 Magic CLI System', icon: HiWrenchScrewdriver },
    { id: 'backup-system', title: '💾 Intelligent Backup System', icon: HiCircleStack },
    { id: 'coordination-system', title: '📊 Real-time Monitoring', icon: HiUsers },
    { id: 'admin-dashboard', title: 'Admin Dashboard Status', icon: HiOutlineShieldCheck },
    { id: 'cloudinary-management', title: 'Cloudinary Image Management', icon: HiOutlinePhoto },
    { id: 'typografi', title: t.typography, icon: HiOutlineHeart },
    { id: 'farger', title: t.colors, icon: HiOutlineStar },
    { id: 'knapper', title: t.buttons, icon: HiOutlineShieldCheck },
    { id: 'kort', title: t.cards, icon: HiOutlineArchiveBox },
    { id: 'grid', title: t.grid, icon: HiOutlineUsers },
    { id: 'animasjoner', title: t.animations, icon: HiArrowRight }
  ];

  return (
    <>
      <style>
        {`
          body.developer-system {
            padding-top: 0 !important;
          }
          body.developer-system nav[role="navigation"] {
            display: none !important;
          }
          body.developer-system header {
            display: none !important;
          }
        `}
      </style>
      <div className={`min-h-screen flex ${
        isDarkTheme 
          ? 'bg-gradient-to-br from-charcoal to-charcoal/80' 
          : 'bg-gradient-to-br from-warm_white to-stone_light/50'
      }`}>
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-charcoal text-warm_white transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-6 border-b border-warm_white/10">
            <h1 className="text-2xl font-light" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
              {t.developerSystem}
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-warm_white/10 transition-colors"
            >
              <HiXMark className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="p-6">
            <p className="text-sm text-warm_white/60 mb-6 leading-relaxed">
              Komplett visuell utviklingsguide for alle designelementer på Helseriet.no
            </p>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm_white/50" />
                <input
                  type="text"
                  placeholder="Søk i komponenter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-warm_white/10 border border-warm_white/20 rounded-lg pl-10 pr-4 py-2 text-sm text-warm_white placeholder-warm_white/50 focus:outline-none focus:border-sage/50 focus:bg-warm_white/20 transition-colors"
                />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 mb-8">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-sage/20 text-sage border-r-2 border-sage'
                      : 'text-warm_white/70 hover:text-warm_white hover:bg-warm_white/10'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.title}</span>
                </a>
              ))}
            </div>

            {/* Settings */}
            <div className="border-t border-warm_white/10 pt-6">
              <h3 className="text-sm font-medium text-warm_white/60 mb-4 flex items-center gap-2">
                <HiCog6Tooth className="w-4 h-4" />
                {t.settings}
              </h3>
              
              {/* Theme Toggle */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-warm_white/80">{t.theme}</span>
                <button
                  onClick={handleThemeToggle}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-warm_white/10 transition-colors"
                  title={isDarkTheme ? t.switchToLight : t.switchToDark}
                >
                  {isDarkTheme ? (
                    <HiSun className="w-4 h-4 text-terracotta" />
                  ) : (
                    <HiMoon className="w-4 h-4 text-sage" />
                  )}
                </button>
              </div>

              {/* Language Selector */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-warm_white/80">{t.language}</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as Language)}
                  className="bg-warm_white/10 border border-warm_white/20 rounded px-2 py-1 text-xs text-warm_white focus:outline-none focus:border-sage/50"
                  title={t.selectLanguage}
                >
                  <option value="no">🇳🇴 Norsk</option>
                  <option value="en">🇬🇧 English</option>
                  <option value="sv">🇸🇪 Svenska</option>
                  <option value="da">🇩🇰 Dansk</option>
                </select>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-8 pt-6 border-t border-warm_white/10">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-sm text-warm_white/70 hover:text-warm_white transition-colors"
              >
                <HiArrowRight className="w-4 h-4 rotate-180" />
                {t.backToHome}
              </Link>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-72' : 'ml-0'
        }`}>
          {/* Content Sections */}
          <main className="relative">
            <ProjectOverview />
            <MagicCliSystem isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
            <BackupSystem isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
            <CoordinationSystem isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
            <AdminDashboardStatus isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
            <CloudinaryManagement isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
            <Typography isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
            <Colors isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
            <Buttons isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
            <Cards isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
            <Spacing isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
            <Grid isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
            <Animations isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
            <DesignSystem isDarkTheme={isDarkTheme} selectedLanguage={selectedLanguage} />
          </main>
        </div>
      </div>
    </>
  );
};

export default DeveloperSystem;