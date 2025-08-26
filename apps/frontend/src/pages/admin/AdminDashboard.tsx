import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  HiArrowRight, 
  HiOutlineUsers,
  HiOutlineArchiveBox,
  HiBars3,
  HiXMark,
  HiSun,
  HiMoon,
  HiCog6Tooth,
  HiOutlineCurrencyDollar,
  HiOutlineShoppingCart,
  HiOutlineChartBarSquare,
  HiOutlinePencilSquare,
  HiOutlineMegaphone,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineHome,
  HiOutlineShieldCheck,
  HiOutlineCommandLine,
  HiOutlineChartPie
} from 'react-icons/hi2';

const translations = {
  no: {
    settings: 'Innstillinger',
    theme: 'Tema',
    language: 'Språk',
    lightMode: 'Lys modus',
    darkMode: 'Mørk modus',
    switchToLight: 'Bytt til lys modus',
    switchToDark: 'Bytt til mørk modus',
    selectLanguage: 'Velg språk',
    backToWebshop: 'Tilbake til nettbutikk',
    adminDashboard: 'Admin Dashboard',
    welcomeBack: 'Velkommen tilbake!',
    todaysActivity: 'Her er en oversikt over dagens aktivitet',
    totalOrders: 'Totale ordrer',
    todaysRevenue: 'Omsetning i dag',
    activeCustomers: 'Aktive kunder',
    productsInStock: 'Produkter på lager',
    recentOrders: 'Nylige ordrer',
    topProducts: 'Toppselgende produkter',
    quickActions: 'Hurtighandlinger',
    seeAll: 'Se alle',
    pending: 'Venter',
    processing: 'Behandles',
    shipped: 'Sendt',
    completed: 'Fullført',
    sold: 'solgt',
    yesterday: 'fra i går',
    dashboard: 'Dashboard',
    products: 'Produkter',
    orders: 'Ordrer',
    customers: 'Kunder',
    blog: 'Blogg',
    campaigns: 'Kampanjer',
    analytics: 'Analyser',
    security: 'Sikkerhet',
    newProduct: 'Nytt produkt',
    newCampaign: 'Ny kampanje',
    newBlogPost: 'Nytt blogginnlegg',
    generateReport: 'Generer rapport',
    developerSystem: 'Utviklersystem',
    projectStatus: 'Prosjektstatus'
  },
  en: {
    settings: 'Settings',
    theme: 'Theme',
    language: 'Language',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    selectLanguage: 'Select language',
    backToWebshop: 'Back to webshop',
    adminDashboard: 'Admin Dashboard',
    welcomeBack: 'Welcome back!',
    todaysActivity: 'Here is an overview of today\'s activity',
    totalOrders: 'Total orders',
    todaysRevenue: 'Today\'s revenue',
    activeCustomers: 'Active customers',
    productsInStock: 'Products in stock',
    recentOrders: 'Recent orders',
    topProducts: 'Top selling products',
    quickActions: 'Quick actions',
    seeAll: 'See all',
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    completed: 'Completed',
    sold: 'sold',
    yesterday: 'from yesterday',
    dashboard: 'Dashboard',
    products: 'Products',
    orders: 'Orders',
    customers: 'Customers',
    blog: 'Blog',
    campaigns: 'Campaigns',
    analytics: 'Analytics',
    security: 'Security',
    newProduct: 'New product',
    newCampaign: 'New campaign',
    newBlogPost: 'New blog post',
    generateReport: 'Generate report',
    developerSystem: 'Developer System',
    projectStatus: 'Project Status'
  },
  sv: {
    settings: 'Inställningar',
    theme: 'Tema',
    language: 'Språk',
    lightMode: 'Ljust läge',
    darkMode: 'Mörkt läge',
    switchToLight: 'Byt till ljust läge',
    switchToDark: 'Byt till mörkt läge',
    selectLanguage: 'Välj språk',
    backToWebshop: 'Tillbaka till webshop',
    adminDashboard: 'Admin Dashboard',
    welcomeBack: 'Välkommen tillbaka!',
    todaysActivity: 'Här är en översikt över dagens aktivitet',
    totalOrders: 'Totala beställningar',
    todaysRevenue: 'Dagens omsättning',
    activeCustomers: 'Aktiva kunder',
    productsInStock: 'Produkter i lager',
    recentOrders: 'Senaste beställningar',
    topProducts: 'Bästsäljande produkter',
    quickActions: 'Snabbåtgärder',
    seeAll: 'Se alla',
    pending: 'Väntar',
    processing: 'Behandlas',
    shipped: 'Skickad',
    completed: 'Slutförd',
    sold: 'såld',
    yesterday: 'från igår',
    dashboard: 'Dashboard',
    products: 'Produkter',
    orders: 'Beställningar',
    customers: 'Kunder',
    blog: 'Blogg',
    campaigns: 'Kampanjer',
    analytics: 'Analyser',
    security: 'Säkerhet',
    newProduct: 'Ny produkt',
    newCampaign: 'Ny kampanj',
    newBlogPost: 'Nytt blogginlägg',
    generateReport: 'Generera rapport',
    developerSystem: 'Utvecklarsystem',
    projectStatus: 'Projektstatus'
  },
  da: {
    settings: 'Indstillinger',
    theme: 'Tema',
    language: 'Sprog',
    lightMode: 'Lys tilstand',
    darkMode: 'Mørk tilstand',
    switchToLight: 'Skift til lys tilstand',
    switchToDark: 'Skift til mørk tilstand',
    selectLanguage: 'Vælg sprog',
    backToWebshop: 'Tilbage til webshop',
    adminDashboard: 'Admin Dashboard',
    welcomeBack: 'Velkommen tilbage!',
    todaysActivity: 'Her er et overblik over dagens aktivitet',
    totalOrders: 'Totale ordrer',
    todaysRevenue: 'Dagens omsætning',
    activeCustomers: 'Aktive kunder',
    productsInStock: 'Produkter på lager',
    recentOrders: 'Seneste ordrer',
    topProducts: 'Bedst sælgende produkter',
    quickActions: 'Hurtige handlinger',
    seeAll: 'Se alle',
    pending: 'Afventer',
    processing: 'Behandles',
    shipped: 'Sendt',
    completed: 'Færdig',
    sold: 'solgt',
    yesterday: 'fra i går',
    dashboard: 'Dashboard',
    products: 'Produkter',
    orders: 'Ordrer',
    customers: 'Kunder',
    blog: 'Blog',
    campaigns: 'Kampagner',
    analytics: 'Analyser',
    security: 'Sikkerhed',
    newProduct: 'Nyt produkt',
    newCampaign: 'Ny kampagne',
    newBlogPost: 'Nyt blogindlæg',
    generateReport: 'Generer rapport',
    developerSystem: 'Udviklersystem',
    projectStatus: 'Projektstatus'
  }
};

type Language = 'no' | 'en' | 'sv' | 'da';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
}

interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'completed';
  date: string;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
}

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('no');

  const t = (key: keyof typeof translations.no) => {
    return translations[selectedLanguage][key] || translations.no[key];
  };

  useEffect(() => {
    document.body.classList.add('admin-dashboard');
    
    const savedTheme = localStorage.getItem('helseriet-theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
    }
    
    const savedLanguage = localStorage.getItem('helseriet-language') as Language;
    if (savedLanguage && ['no', 'en', 'sv', 'da'].includes(savedLanguage)) {
      setSelectedLanguage(savedLanguage);
    }
    
    return () => {
      document.body.classList.remove('admin-dashboard');
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

  const stats: StatCard[] = [
    {
      title: t('totalOrders'),
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: HiOutlineShoppingCart
    },
    {
      title: t('todaysRevenue'),
      value: '45,678 kr',
      change: '+8%',
      changeType: 'positive',
      icon: HiOutlineCurrencyDollar
    },
    {
      title: t('activeCustomers'),
      value: '2,567',
      change: '+5%',
      changeType: 'positive',
      icon: HiOutlineUsers
    },
    {
      title: t('productsInStock'),
      value: '156',
      change: '-3',
      changeType: 'neutral',
      icon: HiOutlineArchiveBox
    }
  ];

  const recentOrders: RecentOrder[] = [
    {
      id: '#HK-1234',
      customer: 'Kari Nordmann',
      amount: 599,
      status: 'processing',
      date: '2024-01-15'
    },
    {
      id: '#HK-1235',
      customer: 'Per Hansen',
      amount: 299,
      status: 'shipped',
      date: '2024-01-15'
    },
    {
      id: '#HK-1236',
      customer: 'Maria Olsen',
      amount: 799,
      status: 'pending',
      date: '2024-01-14'
    },
    {
      id: '#HK-1237',
      customer: 'Lars Andersen',
      amount: 399,
      status: 'completed',
      date: '2024-01-14'
    }
  ];

  const topProducts: TopProduct[] = [
    { name: 'Omega-3 Premium', sales: 145, revenue: 43350 },
    { name: 'Multivitamin', sales: 98, revenue: 24450 },
    { name: 'Vitamin D3', sales: 87, revenue: 17313 },
    { name: 'Magnesium', sales: 76, revenue: 15200 },
    { name: 'Probiotika', sales: 65, revenue: 19500 }
  ];

  const sidebarItems = [
    { name: t('dashboard'), icon: HiOutlineHome, path: '/admin', active: true },
    { name: t('products'), icon: HiOutlineArchiveBox, path: '/admin/produkter', badge: '156' },
    { name: t('orders'), icon: HiOutlineShoppingCart, path: '/admin/ordrer', badge: '3', badgeType: 'urgent' },
    { name: t('customers'), icon: HiOutlineUsers, path: '/admin/kunder' },
    { name: t('blog'), icon: HiOutlinePencilSquare, path: '/admin/blogg' },
    { name: t('campaigns'), icon: HiOutlineMegaphone, path: '/admin/kampanjer' },
    { name: t('analytics'), icon: HiOutlineChartBarSquare, path: '/admin/analyser' },
    { name: t('security'), icon: HiOutlineShieldCheck, path: '/admin/sikkerhet' },
    { name: t('settings'), icon: HiOutlineAdjustmentsHorizontal, path: '/admin/innstillinger' }
  ];

  const getStatusColor = (status: RecentOrder['status']) => {
    switch (status) {
      case 'pending': return 'bg-terracotta/20 text-terracotta';
      case 'processing': return 'bg-sage/20 text-sage_dark';
      case 'shipped': return 'bg-charcoal/20 text-charcoal';
      case 'completed': return 'bg-sage/30 text-sage_dark';
    }
  };

  const getStatusText = (status: RecentOrder['status']) => {
    return t(status);
  };

  return (
    <>
      <style>
        {`
          body.admin-dashboard {
            padding-top: 0 !important;
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
            {t('adminDashboard')}
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
            Administrer din e-commerce plattform for naturlige helse- og velværeprodukter
          </p>
          
          <ul className="space-y-3">
            {sidebarItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                      item.active 
                        ? 'bg-sage text-warm_white' 
                        : 'hover:bg-warm_white/10'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 text-warm_white/70" />
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                      <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                        item.badgeType === 'urgent' 
                          ? 'bg-terracotta text-warm_white' 
                          : 'bg-warm_white/20 text-warm_white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Theme and Language Settings */}
          <div className="mt-8 pt-6 border-t border-warm_white/10">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-warm_white/80 mb-4 flex items-center gap-2">
                <HiCog6Tooth className="w-4 h-4" />
                {t('settings')}
              </h3>
              
              {/* Theme Toggle */}
              <div className="mb-4">
                <div className="text-xs text-warm_white/60 mb-2">{t('theme')}</div>
                <button
                  onClick={handleThemeToggle}
                  aria-label={isDarkTheme ? t('switchToLight') : t('switchToDark')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isDarkTheme 
                      ? 'bg-warm_white/20 text-warm_white' 
                      : 'bg-warm_white/10 text-warm_white/70 hover:bg-warm_white/15'
                  }`}
                >
                  {isDarkTheme ? (
                    <>
                      <HiMoon className="w-4 h-4" />
                      <span className="text-sm">{t('darkMode')}</span>
                    </>
                  ) : (
                    <>
                      <HiSun className="w-4 h-4" />
                      <span className="text-sm">{t('lightMode')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Language Selection */}
              <div>
                <div className="text-xs text-warm_white/60 mb-2">{t('language')}</div>
                <div className="space-y-1" role="radiogroup" aria-label={t('selectLanguage')}>
                  {[
                    { code: 'no', name: 'Norsk', flag: '🇳🇴' },
                    { code: 'en', name: 'English', flag: '🇬🇧' },
                    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
                    { code: 'da', name: 'Dansk', flag: '🇩🇰' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as Language)}
                      role="radio"
                      aria-checked={selectedLanguage === lang.code}
                      aria-label={`${t('selectLanguage')} ${lang.name}`}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all duration-300 text-left ${
                        selectedLanguage === lang.code
                          ? 'bg-warm_white/20 text-warm_white'
                          : 'text-warm_white/70 hover:bg-warm_white/10'
                      }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-warm_white/10">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-warm_white/60 hover:text-warm_white transition-colors"
            >
              <HiArrowRight className="w-4 h-4 rotate-180" />
              {t('backToWebshop')}
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className={`fixed top-4 left-4 z-40 lg:hidden p-3 bg-charcoal text-warm_white rounded-lg shadow-lg transition-opacity ${
          sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <HiBars3 className="w-6 h-6" />
      </button>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'ml-0'}`}>
        <div className="zen-spacing">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Welcome Section */}
            <div className="mb-12">
              <h2 className={`text-4xl font-light mb-4 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`} style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                {t('welcomeBack')}
              </h2>
              <p className={`text-lg ${
                isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
              }`}>
                {t('todaysActivity')}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-warm_white minimal-shadow organic-border p-6 hover-float group">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-charcoal/60 mb-2">{stat.title}</p>
                        <p className="text-2xl font-bold text-charcoal mb-1">{stat.value}</p>
                        <p className={`text-sm ${
                          stat.changeType === 'positive' ? 'text-sage' :
                          stat.changeType === 'negative' ? 'text-terracotta' :
                          'text-charcoal/60'
                        }`}>
                          {stat.change} {t('yesterday')}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-sage" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Recent Orders */}
              <div className="bg-warm_white minimal-shadow organic-border overflow-hidden">
                <div className="border-b border-stone p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                      {t('recentOrders')}
                    </h3>
                    <Link to="/admin/ordrer" className="text-sage hover:text-sage_dark micro-interaction flex items-center">
                      {t('seeAll')}
                      <HiArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-stone_light/30 organic-border">
                        <div>
                          <p className="font-medium text-charcoal">{order.id}</p>
                          <p className="text-sm text-charcoal/60">{order.customer}</p>
                          <p className="text-xs text-charcoal/50">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-charcoal mb-1">{order.amount} kr</p>
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-warm_white minimal-shadow organic-border overflow-hidden">
                <div className="border-b border-stone p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                      {t('topProducts')}
                    </h3>
                    <Link to="/admin/produkter" className="text-sage hover:text-sage_dark micro-interaction flex items-center">
                      {t('seeAll')}
                      <HiArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-charcoal">{product.name}</p>
                          <p className="text-sm text-charcoal/60">{product.sales} {t('sold')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-charcoal">{product.revenue.toLocaleString()} kr</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-warm_white minimal-shadow organic-border p-8">
              <h3 className="text-xl font-medium text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                {t('quickActions')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Link to="/admin/produkter/ny" className="btn-organic text-center">
                  <HiOutlineArchiveBox className="w-5 h-5 mx-auto mb-2" />
                  {t('newProduct')}
                </Link>
                <Link to="/admin/kampanjer/ny" className="btn-organic text-center">
                  <HiOutlineMegaphone className="w-5 h-5 mx-auto mb-2" />
                  {t('newCampaign')}
                </Link>
                <Link to="/admin/blogg/ny" className="btn-organic text-center">
                  <HiOutlinePencilSquare className="w-5 h-5 mx-auto mb-2" />
                  {t('newBlogPost')}
                </Link>
                <Link to="/admin/rapport" className="btn-organic text-center">
                  <HiOutlineChartBarSquare className="w-5 h-5 mx-auto mb-2" />
                  {t('generateReport')}
                </Link>
                <Link to="/utviklersystem" className="btn-organic text-center">
                  <HiOutlineCommandLine className="w-5 h-5 mx-auto mb-2" />
                  {t('developerSystem')}
                </Link>
                <Link to="/prosjekt-status" className="btn-organic text-center">
                  <HiOutlineChartPie className="w-5 h-5 mx-auto mb-2" />
                  {t('projectStatus')}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;