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
  HiOutlineCalendarDays,
  HiOutlineArrowDownTray,
  HiOutlineChartBar,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTopRightOnSquare
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
    analyticsAndReports: 'Analyser og rapporter',
    getSalesInsights: 'Få innsikt i salg, kunder og produktytelse',
    last7Days: 'Siste 7 dager',
    last30Days: 'Siste 30 dager',
    last3Months: 'Siste 3 måneder',
    lastYear: 'Siste år',
    customPeriod: 'Egendefinert periode',
    vsPreviousPeriod: 'vs. forrige periode',
    exportPDF: 'Eksporter PDF',
    exportExcel: 'Eksporter Excel',
    totalRevenue: 'Total omsetning',
    numberOfOrders: 'Antall ordrer',
    averageOrderValue: 'Gjennomsnittlig ordresum',
    conversionRate: 'Konverteringsrate',
    vs: 'vs.',
    previousPeriod: 'forrige periode',
    salesTrend: 'Salgstrend',
    daily: 'Daglig',
    weekly: 'Ukentlig',
    monthly: 'Månedlig',
    salesChart: 'Salgsdiagram',
    topProducts: 'Topp produkter',
    sold: 'solgt',
    customerInsights: 'Kundeinnsikt',
    newCustomers: 'Nye kunder',
    returningCustomers: 'Returnerende kunder',
    averageCustomerLifetime: 'Gjennomsnittlig kundelivstid',
    trafficSources: 'Trafikkkilder',
    direct: 'Direkte',
    googleSearch: 'Google søk',
    socialMedia: 'Sosiale medier',
    email: 'E-post',
    other: 'Andre',
    campaignPerformance: 'Kampanjeytelse',
    seeAllCampaigns: 'Se alle kampanjer',
    dashboard: 'Dashboard',
    products: 'Produkter',
    orders: 'Ordrer',
    customers: 'Kunder',
    blog: 'Blogg',
    campaigns: 'Kampanjer',
    analytics: 'Analyser'
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
    analyticsAndReports: 'Analytics and Reports',
    getSalesInsights: 'Get insights into sales, customers and product performance',
    last7Days: 'Last 7 days',
    last30Days: 'Last 30 days',
    last3Months: 'Last 3 months',
    lastYear: 'Last year',
    customPeriod: 'Custom period',
    vsPreviousPeriod: 'vs. previous period',
    exportPDF: 'Export PDF',
    exportExcel: 'Export Excel',
    totalRevenue: 'Total revenue',
    numberOfOrders: 'Number of orders',
    averageOrderValue: 'Average order value',
    conversionRate: 'Conversion rate',
    vs: 'vs.',
    previousPeriod: 'previous period',
    salesTrend: 'Sales trend',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    salesChart: 'Sales chart',
    topProducts: 'Top products',
    sold: 'sold',
    customerInsights: 'Customer insights',
    newCustomers: 'New customers',
    returningCustomers: 'Returning customers',
    averageCustomerLifetime: 'Average customer lifetime',
    trafficSources: 'Traffic sources',
    direct: 'Direct',
    googleSearch: 'Google search',
    socialMedia: 'Social media',
    email: 'Email',
    other: 'Other',
    campaignPerformance: 'Campaign performance',
    seeAllCampaigns: 'See all campaigns',
    dashboard: 'Dashboard',
    products: 'Products',
    orders: 'Orders',
    customers: 'Customers',
    blog: 'Blog',
    campaigns: 'Campaigns',
    analytics: 'Analytics'
  }
};

type Language = 'no' | 'en';

interface AnalyticsData {
  totalRevenue: number;
  previousRevenue: number;
  totalOrders: number;
  previousOrders: number;
  averageOrderValue: number;
  previousAverageOrderValue: number;
  conversionRate: number;
  previousConversionRate: number;
}

const AdminAnalyser: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('no');
  const [selectedPeriod, setSelectedPeriod] = useState('last30Days');
  const [chartView, setChartView] = useState('daily');

  const t = (key: keyof typeof translations.no) => {
    return translations[selectedLanguage]?.[key] || translations.no[key];
  };

  useEffect(() => {
    document.body.classList.add('admin-analyser');
    
    const savedTheme = localStorage.getItem('helseriet-theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
    }
    
    const savedLanguage = localStorage.getItem('helseriet-language') as Language;
    if (savedLanguage && ['no', 'en'].includes(savedLanguage)) {
      setSelectedLanguage(savedLanguage);
    }
    
    return () => {
      document.body.classList.remove('admin-analyser');
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

  const sidebarItems = [
    { name: t('dashboard'), icon: HiOutlineHome, path: '/admin', active: false },
    { name: t('products'), icon: HiOutlineArchiveBox, path: '/admin/produkter', badge: '156' },
    { name: t('orders'), icon: HiOutlineShoppingCart, path: '/admin/ordrer', badge: '3', badgeType: 'urgent' },
    { name: t('customers'), icon: HiOutlineUsers, path: '/admin/kunder' },
    { name: t('blog'), icon: HiOutlinePencilSquare, path: '/admin/blogg' },
    { name: t('campaigns'), icon: HiOutlineMegaphone, path: '/admin/kampanjer' },
    { name: t('analytics'), icon: HiOutlineChartBarSquare, path: '/admin/analyser', active: true },
    { name: t('settings'), icon: HiOutlineAdjustmentsHorizontal, path: '/admin/innstillinger' }
  ];

  const analyticsData: AnalyticsData = {
    totalRevenue: 234567,
    previousRevenue: 189890,
    totalOrders: 456,
    previousOrders: 396,
    averageOrderValue: 514,
    previousAverageOrderValue: 475,
    conversionRate: 3.2,
    previousConversionRate: 3.4
  };

  const calculatePercentageChange = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const topProducts = [
    { name: 'Omega-3 Premium', sold: 156, revenue: 46644, color: 'bg-sage' },
    { name: 'Vitamin D3 5000 IU', sold: 143, revenue: 28457, color: 'bg-sage/80' },
    { name: 'Magnesium Citrat', sold: 98, revenue: 24402, color: 'bg-sage/60' },
    { name: 'Probiotika Plus', sold: 87, revenue: 21663, color: 'bg-sage/40' },
    { name: 'Multivitamin Komplett', sold: 76, revenue: 18924, color: 'bg-sage/20' }
  ];

  const trafficSources = [
    { name: t('direct'), percentage: 45, color: 'bg-sage' },
    { name: t('googleSearch'), percentage: 28, color: 'bg-terracotta' },
    { name: t('socialMedia'), percentage: 15, color: 'bg-charcoal' },
    { name: t('email'), percentage: 8, color: 'bg-stone' },
    { name: t('other'), percentage: 4, color: 'bg-stone_light' }
  ];

  const campaigns = [
    { name: 'Vinterens Vitaminer', progress: 85, revenue: 34500 },
    { name: 'Omega-3 pakke', progress: 65, revenue: 23400 },
    { name: 'Nyhetsbrev-rabatt', progress: 45, revenue: 15670 }
  ];

  return (
    <>
      <style>
        {`
          body.admin-analyser {
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
                    { code: 'en', name: 'English', flag: '🇬🇧' }
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
            
            {/* Header */}
            <div className="mb-8">
              <h2 className={`text-4xl font-light mb-4 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`} style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                {t('analyticsAndReports')}
              </h2>
              <p className={`text-lg ${
                isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
              }`}>
                {t('getSalesInsights')}
              </p>
            </div>

            {/* Controls */}
            <div className="bg-warm_white minimal-shadow organic-border p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center gap-2">
                    <HiOutlineCalendarDays className="w-5 h-5 text-charcoal/60" />
                    <select 
                      className="px-4 py-2 border border-stone rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-colors"
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                      <option value="last7Days">{t('last7Days')}</option>
                      <option value="last30Days">{t('last30Days')}</option>
                      <option value="last3Months">{t('last3Months')}</option>
                      <option value="lastYear">{t('lastYear')}</option>
                      <option value="customPeriod">{t('customPeriod')}</option>
                    </select>
                  </div>
                  <span className="text-charcoal/60">{t('vsPreviousPeriod')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => alert('Laster ned rapport som PDF...')}
                    className="btn-ghost flex items-center gap-2"
                  >
                    <HiOutlineArrowDownTray className="w-4 h-4" />
                    {t('exportPDF')}
                  </button>
                  <button 
                    onClick={() => alert('Laster ned data som Excel...')}
                    className="btn-organic flex items-center gap-2"
                  >
                    <HiOutlineChartBar className="w-4 h-4" />
                    {t('exportExcel')}
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-warm_white minimal-shadow organic-border p-6 hover-float">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-sage/20 rounded-xl flex items-center justify-center">
                    <HiOutlineCurrencyDollar className="w-6 h-6 text-sage" />
                  </div>
                  <span className="text-sage text-sm font-medium flex items-center gap-1">
                    <HiOutlineArrowTrendingUp className="w-4 h-4" />
                    +{calculatePercentageChange(analyticsData.totalRevenue, analyticsData.previousRevenue)}%
                  </span>
                </div>
                <h3 className="text-charcoal/60 text-sm mb-2">{t('totalRevenue')}</h3>
                <p className="text-2xl font-bold text-charcoal mb-1">Kr {analyticsData.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-charcoal/50">{t('vs')} Kr {analyticsData.previousRevenue.toLocaleString()} {t('previousPeriod')}</p>
              </div>

              <div className="bg-warm_white minimal-shadow organic-border p-6 hover-float">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-terracotta/20 rounded-xl flex items-center justify-center">
                    <HiOutlineShoppingCart className="w-6 h-6 text-terracotta" />
                  </div>
                  <span className="text-sage text-sm font-medium flex items-center gap-1">
                    <HiOutlineArrowTrendingUp className="w-4 h-4" />
                    +{calculatePercentageChange(analyticsData.totalOrders, analyticsData.previousOrders)}%
                  </span>
                </div>
                <h3 className="text-charcoal/60 text-sm mb-2">{t('numberOfOrders')}</h3>
                <p className="text-2xl font-bold text-charcoal mb-1">{analyticsData.totalOrders}</p>
                <p className="text-xs text-charcoal/50">{t('vs')} {analyticsData.previousOrders} {t('previousPeriod')}</p>
              </div>

              <div className="bg-warm_white minimal-shadow organic-border p-6 hover-float">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-charcoal/20 rounded-xl flex items-center justify-center">
                    <HiOutlineChartBar className="w-6 h-6 text-charcoal" />
                  </div>
                  <span className="text-sage text-sm font-medium flex items-center gap-1">
                    <HiOutlineArrowTrendingUp className="w-4 h-4" />
                    +{calculatePercentageChange(analyticsData.averageOrderValue, analyticsData.previousAverageOrderValue)}%
                  </span>
                </div>
                <h3 className="text-charcoal/60 text-sm mb-2">{t('averageOrderValue')}</h3>
                <p className="text-2xl font-bold text-charcoal mb-1">Kr {analyticsData.averageOrderValue}</p>
                <p className="text-xs text-charcoal/50">{t('vs')} Kr {analyticsData.previousAverageOrderValue} {t('previousPeriod')}</p>
              </div>

              <div className="bg-warm_white minimal-shadow organic-border p-6 hover-float">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-stone/20 rounded-xl flex items-center justify-center">
                    <HiOutlineArrowTopRightOnSquare className="w-6 h-6 text-stone_dark" />
                  </div>
                  <span className="text-terracotta text-sm font-medium flex items-center gap-1">
                    <HiOutlineArrowTrendingDown className="w-4 h-4" />
                    {calculatePercentageChange(analyticsData.conversionRate, analyticsData.previousConversionRate)}%
                  </span>
                </div>
                <h3 className="text-charcoal/60 text-sm mb-2">{t('conversionRate')}</h3>
                <p className="text-2xl font-bold text-charcoal mb-1">{analyticsData.conversionRate}%</p>
                <p className="text-xs text-charcoal/50">{t('vs')} {analyticsData.previousConversionRate}% {t('previousPeriod')}</p>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Sales Trend */}
              <div className="bg-warm_white minimal-shadow organic-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-medium text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                    {t('salesTrend')}
                  </h3>
                  <select 
                    className="text-sm border border-stone rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-colors"
                    value={chartView}
                    onChange={(e) => setChartView(e.target.value)}
                  >
                    <option value="daily">{t('daily')}</option>
                    <option value="weekly">{t('weekly')}</option>
                    <option value="monthly">{t('monthly')}</option>
                  </select>
                </div>
                <div className="h-64 bg-sage/10 organic-border flex items-center justify-center">
                  <div className="text-center">
                    <HiOutlineChartBar className="w-16 h-16 text-sage/60 mx-auto mb-4" />
                    <span className="text-charcoal/60">{t('salesChart')}</span>
                  </div>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-warm_white minimal-shadow organic-border p-6">
                <h3 className="text-xl font-medium text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  {t('topProducts')}
                </h3>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-stone_light/30 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-8 ${product.color} rounded-full`}></div>
                        <div>
                          <p className="font-medium text-charcoal">{product.name}</p>
                          <p className="text-sm text-charcoal/60">{product.sold} {t('sold')}</p>
                        </div>
                      </div>
                      <span className="font-medium text-charcoal">Kr {product.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer Insights */}
              <div className="bg-warm_white minimal-shadow organic-border p-6">
                <h3 className="text-xl font-medium text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  {t('customerInsights')}
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-charcoal/60">{t('newCustomers')}</span>
                      <span className="text-sm font-medium text-charcoal">67</span>
                    </div>
                    <div className="w-full bg-stone_light rounded-full h-2">
                      <div className="bg-sage h-2 rounded-full" style={{width: '67%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-charcoal/60">{t('returningCustomers')}</span>
                      <span className="text-sm font-medium text-charcoal">33</span>
                    </div>
                    <div className="w-full bg-stone_light rounded-full h-2">
                      <div className="bg-terracotta h-2 rounded-full" style={{width: '33%'}}></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-stone">
                    <p className="text-sm text-charcoal/60 mb-1">{t('averageCustomerLifetime')}</p>
                    <p className="text-xl font-bold text-charcoal">Kr 3,456</p>
                  </div>
                </div>
              </div>

              {/* Traffic Sources */}
              <div className="bg-warm_white minimal-shadow organic-border p-6">
                <h3 className="text-xl font-medium text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  {t('trafficSources')}
                </h3>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${source.color} rounded-full`}></div>
                        <span className="text-sm text-charcoal">{source.name}</span>
                      </div>
                      <span className="text-sm font-medium text-charcoal">{source.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaign Performance */}
              <div className="bg-warm_white minimal-shadow organic-border p-6">
                <h3 className="text-xl font-medium text-charcoal mb-6" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  {t('campaignPerformance')}
                </h3>
                <div className="space-y-4">
                  {campaigns.map((campaign, index) => (
                    <div key={index}>
                      <p className="text-sm text-charcoal/60 mb-2">{campaign.name}</p>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex-1 mr-3">
                          <div className="w-full bg-stone_light rounded-full h-2">
                            <div 
                              className="bg-sage h-2 rounded-full transition-all duration-300" 
                              style={{width: `${campaign.progress}%`}}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-charcoal">Kr {campaign.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => alert('Viser alle kampanjer...')}
                  className="mt-6 w-full text-sage hover:text-sage_dark text-sm font-medium flex items-center justify-center gap-2 micro-interaction"
                >
                  {t('seeAllCampaigns')}
                  <HiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminAnalyser;