import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  HiArrowRight, 
  HiOutlineUsers,
  HiOutlineArchiveBox,
  HiOutlineHeart,
  HiBars3,
  HiXMark,
  HiSun,
  HiMoon,
  HiCog6Tooth,
  HiOutlineShoppingCart,
  HiOutlineChartBarSquare,
  HiOutlinePencilSquare,
  HiOutlineMegaphone,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineHome,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineMagnifyingGlass,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineDocument,
  HiOutlineTag,
  HiOutlineChartBar,
  HiOutlineListBullet
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
    blogAdministration: 'Bloggadministrasjon',
    manageBlogArticles: 'Administrer bloggartikler, kategorier og publisering',
    newArticle: 'Ny artikkel',
    search: 'Søk',
    searchArticles: 'Søk etter artikkel...',
    category: 'Kategori',
    allCategories: 'Alle kategorier',
    supplements: 'Kosttilskudd',
    nutrition: 'Ernæring',
    exercise: 'Trening',
    health: 'Helse',
    research: 'Forskning',
    guides: 'Guider',
    status: 'Status',
    all: 'Alle',
    published: 'Publisert',
    hidden: 'Skjult',
    draft: 'Utkast',
    scheduled: 'Planlagt',
    sortBy: 'Sorter etter',
    publishDateNewest: 'Publiseringsdato (nyeste)',
    publishDateOldest: 'Publiseringsdato (eldste)',
    titleAZ: 'Tittel (A-Å)',
    titleZA: 'Tittel (Å-A)',
    views: 'Visninger',
    lastEdited: 'Sist redigert',
    bulkActions: 'Massehandlinger',
    selectAction: 'Velg handling...',
    deleteSelected: 'Slett valgte',
    hideSelected: 'Skjul valgte',
    showSelected: 'Vis valgte',
    changeCategory: 'Endre kategori',
    execute: 'Utfør',
    showing: 'Viser',
    articles: 'artikler',
    selectAll: 'Velg alle',
    sortOrder: 'Sorter',
    title: 'Tittel',
    author: 'Forfatter',
    publishDate: 'Publisert',
    actions: 'Handlinger',
    order: 'Rekkefølge',
    edit: 'Rediger',
    delete: 'Slett',
    createNewArticle: 'Opprett ny artikkel',
    cancel: 'Avbryt',
    dashboard: 'Dashboard',
    products: 'Produkter',
    orders: 'Ordrer',
    customers: 'Kunder',
    blog: 'Blogg',
    campaigns: 'Kampanjer',
    ads: 'Annonser',
    analytics: 'Analyser',
    reports: 'Rapporter',
    expertAdvice: 'Ekspertråd',
    preview: 'Forhåndsvis',
    viewStats: 'Vis statistikk'
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
    blogAdministration: 'Blog Administration',
    manageBlogArticles: 'Manage blog articles, categories and publishing',
    newArticle: 'New article',
    search: 'Search',
    searchArticles: 'Search for article...',
    category: 'Category',
    allCategories: 'All categories',
    supplements: 'Supplements',
    nutrition: 'Nutrition',
    exercise: 'Exercise',
    health: 'Health',
    research: 'Research',
    guides: 'Guides',
    status: 'Status',
    all: 'All',
    published: 'Published',
    hidden: 'Hidden',
    draft: 'Draft',
    scheduled: 'Scheduled',
    sortBy: 'Sort by',
    publishDateNewest: 'Publish date (newest)',
    publishDateOldest: 'Publish date (oldest)',
    titleAZ: 'Title (A-Z)',
    titleZA: 'Title (Z-A)',
    views: 'Views',
    lastEdited: 'Last edited',
    bulkActions: 'Bulk actions',
    selectAction: 'Select action...',
    deleteSelected: 'Delete selected',
    hideSelected: 'Hide selected',
    showSelected: 'Show selected',
    changeCategory: 'Change category',
    execute: 'Execute',
    showing: 'Showing',
    articles: 'articles',
    selectAll: 'Select all',
    sortOrder: 'Sort',
    title: 'Title',
    author: 'Author',
    publishDate: 'Published',
    actions: 'Actions',
    order: 'Order',
    edit: 'Edit',
    delete: 'Delete',
    createNewArticle: 'Create new article',
    cancel: 'Cancel',
    dashboard: 'Dashboard',
    products: 'Products',
    orders: 'Orders',
    customers: 'Customers',
    blog: 'Blog',
    campaigns: 'Campaigns',
    ads: 'Ads',
    analytics: 'Analytics',
    reports: 'Reports',
    expertAdvice: 'Expert advice',
    preview: 'Preview',
    viewStats: 'View stats'
  }
};

type Language = 'no' | 'en';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  categoryColor: string;
  publishDate: string;
  status: 'published' | 'hidden' | 'draft' | 'scheduled';
  isActive: boolean;
  order: number;
  views: number;
  icon: string;
}

const AdminBlogg: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('no');
  const [showNewArticleModal, setShowNewArticleModal] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('publishDateNewest');

  const t = (key: keyof typeof translations.no) => {
    return translations[selectedLanguage]?.[key] || translations.no[key];
  };

  useEffect(() => {
    document.body.classList.add('admin-blogg');
    
    const savedTheme = localStorage.getItem('helseriet-theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
    }
    
    const savedLanguage = localStorage.getItem('helseriet-language') as Language;
    if (savedLanguage && ['no', 'en', 'sv', 'da'].includes(savedLanguage)) {
      setSelectedLanguage(savedLanguage);
    }
    
    return () => {
      document.body.classList.remove('admin-blogg');
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
    { name: t('blog'), icon: HiOutlinePencilSquare, path: '/admin/blogg', active: true },
    { name: t('campaigns'), icon: HiOutlineMegaphone, path: '/admin/kampanjer' },
    { name: t('ads'), icon: HiOutlineChartBarSquare, path: '/admin/annonser' },
    { name: t('analytics'), icon: HiOutlineChartBar, path: '/admin/analyser' },
    { name: t('reports'), icon: HiOutlineDocument, path: '/admin/rapport' },
    { name: t('expertAdvice'), icon: HiOutlineHeart, path: '/admin/ekspertrad' },
    { name: t('settings'), icon: HiOutlineAdjustmentsHorizontal, path: '/admin/innstillinger' }
  ];

  const blogArticles: BlogArticle[] = [
    {
      id: '1',
      title: 'Komplett guide til Omega-3',
      slug: 'omega3-guide',
      author: 'Dr. Erik Hansen',
      category: 'Kosttilskudd',
      categoryColor: 'bg-blue-100 text-blue-800',
      publishDate: '15. okt 2024',
      status: 'published',
      isActive: true,
      order: 1,
      views: 1234,
      icon: '🐟'
    },
    {
      id: '2',
      title: 'D-vitamin mangel i Norge',
      slug: 'vitamin-d-mangel',
      author: 'Dr. Maria Olsen',
      category: 'Helse',
      categoryColor: 'bg-green-100 text-green-800',
      publishDate: '12. okt 2024',
      status: 'published',
      isActive: true,
      order: 2,
      views: 987,
      icon: '☀️'
    },
    {
      id: '3',
      title: 'Styrk immunforsvaret naturlig',
      slug: 'immunforsvar',
      author: 'Dr. Erik Hansen',
      category: 'Helse',
      categoryColor: 'bg-green-100 text-green-800',
      publishDate: '8. okt 2024',
      status: 'published',
      isActive: true,
      order: 3,
      views: 756,
      icon: '🛡️'
    },
    {
      id: '4',
      title: 'Magnesium for bedre søvn',
      slug: 'magnesium-sovn',
      author: 'Dr. Maria Olsen',
      category: 'Kosttilskudd',
      categoryColor: 'bg-blue-100 text-blue-800',
      publishDate: '5. okt 2024',
      status: 'published',
      isActive: true,
      order: 4,
      views: 634,
      icon: '💊'
    },
    {
      id: '5',
      title: 'Probiotika: Din tarmmikrobiom',
      slug: 'probiotika',
      author: 'Dr. Erik Hansen',
      category: 'Forskning',
      categoryColor: 'bg-purple-100 text-purple-800',
      publishDate: '1. okt 2024',
      status: 'published',
      isActive: true,
      order: 5,
      views: 543,
      icon: '🦠'
    },
    {
      id: '6',
      title: 'Kosttilskudd for trening',
      slug: 'trening',
      author: 'Dr. Erik Hansen',
      category: 'Trening',
      categoryColor: 'bg-yellow-100 text-yellow-800',
      publishDate: '28. sep 2024',
      status: 'draft',
      isActive: false,
      order: 6,
      views: 0,
      icon: '💪'
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedArticles(blogArticles.map(article => article.id));
    } else {
      setSelectedArticles([]);
    }
  };

  const handleSelectArticle = (articleId: string, checked: boolean) => {
    if (checked) {
      setSelectedArticles([...selectedArticles, articleId]);
    } else {
      setSelectedArticles(selectedArticles.filter(id => id !== articleId));
    }
  };

  const filteredArticles = blogArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      <style>
        {`
          body.admin-blogg {
            padding-top: 0 !important;
          }
          
          .toggle-switch {
            position: relative;
            display: inline-block;
            width: 48px;
            height: 24px;
          }
          
          .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #e5e7eb;
            transition: .3s;
            border-radius: 24px;
          }
          
          .slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .3s;
            border-radius: 50%;
          }
          
          input:checked + .slider {
            background-color: #10b981;
          }
          
          input:checked + .slider:before {
            transform: translateX(24px);
          }
          
          .drag-handle {
            cursor: grab;
          }
          
          .drag-handle:active {
            cursor: grabbing;
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
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className={`text-4xl font-light mb-4 ${
                  isDarkTheme ? 'text-warm_white' : 'text-charcoal'
                }`} style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  {t('blogAdministration')}
                </h2>
                <p className={`text-lg ${
                  isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
                }`}>
                  {t('manageBlogArticles')}
                </p>
              </div>
              <button 
                onClick={() => setShowNewArticleModal(true)}
                className="btn-organic flex items-center gap-2"
              >
                <HiOutlinePlus className="w-5 h-5" />
                {t('newArticle')}
              </button>
            </div>

            {/* Filters */}
            <div className="bg-warm_white minimal-shadow organic-border p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">
                    <HiOutlineMagnifyingGlass className="w-4 h-4 inline mr-2" />
                    {t('search')}
                  </label>
                  <input 
                    type="text" 
                    placeholder={t('searchArticles')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-stone rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">
                    <HiOutlineTag className="w-4 h-4 inline mr-2" />
                    {t('category')}
                  </label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-stone rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-colors"
                  >
                    <option value="all">{t('allCategories')}</option>
                    <option value="Kosttilskudd">{t('supplements')}</option>
                    <option value="Ernæring">{t('nutrition')}</option>
                    <option value="Trening">{t('exercise')}</option>
                    <option value="Helse">{t('health')}</option>
                    <option value="Forskning">{t('research')}</option>
                    <option value="Guider">{t('guides')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">
                    <HiOutlineEye className="w-4 h-4 inline mr-2" />
                    {t('status')}
                  </label>
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-stone rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-colors"
                  >
                    <option value="all">{t('all')}</option>
                    <option value="published">{t('published')}</option>
                    <option value="hidden">{t('hidden')}</option>
                    <option value="draft">{t('draft')}</option>
                    <option value="scheduled">{t('scheduled')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-2">
                    <HiOutlineListBullet className="w-4 h-4 inline mr-2" />
                    {t('sortBy')}
                  </label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-stone rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-colors"
                  >
                    <option value="publishDateNewest">{t('publishDateNewest')}</option>
                    <option value="publishDateOldest">{t('publishDateOldest')}</option>
                    <option value="titleAZ">{t('titleAZ')}</option>
                    <option value="titleZA">{t('titleZA')}</option>
                    <option value="views">{t('views')}</option>
                    <option value="lastEdited">{t('lastEdited')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            <div className="bg-sage/10 border border-sage/20 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <HiCog6Tooth className="w-5 h-5 text-sage" />
                  <span className="font-medium text-charcoal">{t('bulkActions')}:</span>
                  <select className="px-3 py-2 border border-stone rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-colors">
                    <option value="">{t('selectAction')}</option>
                    <option value="delete">{t('deleteSelected')}</option>
                    <option value="hide">{t('hideSelected')}</option>
                    <option value="show">{t('showSelected')}</option>
                    <option value="category">{t('changeCategory')}</option>
                  </select>
                  <button 
                    onClick={() => alert('Utfører massehandling...')}
                    className="text-sage hover:text-sage_dark text-sm font-medium micro-interaction"
                  >
                    {t('execute')}
                  </button>
                </div>
                <div className="text-sm text-charcoal/60">
                  {t('showing')} {filteredArticles.length} {t('articles')}
                </div>
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-warm_white minimal-shadow organic-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-stone_light/30">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input 
                          type="checkbox" 
                          className="rounded border-stone" 
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          checked={selectedArticles.length === blogArticles.length && blogArticles.length > 0}
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">
                        {t('sortOrder')}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">
                        {t('title')}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">
                        {t('author')}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">
                        {t('category')}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">
                        {t('publishDate')}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">
                        {t('status')}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">
                        {t('order')}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-charcoal/70 uppercase tracking-wider">
                        {t('actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-warm_white divide-y divide-stone/50">
                    {filteredArticles.map((article) => (
                      <tr key={article.id} className="hover:bg-stone_light/20 transition-colors">
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            className="rounded border-stone" 
                            checked={selectedArticles.includes(article.id)}
                            onChange={(e) => handleSelectArticle(article.id, e.target.checked)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <span className="drag-handle text-charcoal/60 hover:text-charcoal transition-colors">
                            <HiOutlineListBullet className="w-5 h-5" />
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-stone_light rounded-xl flex items-center justify-center text-xl">
                              {article.icon}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-charcoal">{article.title}</div>
                              <div className="text-xs text-charcoal/60">{article.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-charcoal/60">
                          {article.author}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${article.categoryColor}`}>
                            {article.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-charcoal/60">
                          {article.publishDate}
                        </td>
                        <td className="px-6 py-4">
                          <label className="toggle-switch">
                            <input 
                              type="checkbox" 
                              checked={article.isActive}
                              onChange={() => alert(`Endrer status for "${article.title}"`)}
                            />
                            <span className="slider"></span>
                          </label>
                        </td>
                        <td className="px-6 py-4 text-sm text-charcoal/60 text-center">
                          {article.order}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => alert(`Redigerer "${article.title}"`)}
                              className="p-2 text-sage hover:text-sage_dark micro-interaction rounded-lg hover:bg-sage/10"
                              title={t('edit')}
                            >
                              <HiOutlinePencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => alert(`Forhåndsviser "${article.title}"`)}
                              className="p-2 text-charcoal/60 hover:text-charcoal micro-interaction rounded-lg hover:bg-stone_light/50"
                              title={t('preview')}
                            >
                              <HiOutlineEye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => alert(`Viser statistikk for "${article.title}"`)}
                              className="p-2 text-charcoal/60 hover:text-charcoal micro-interaction rounded-lg hover:bg-stone_light/50"
                              title={t('viewStats')}
                            >
                              <HiOutlineChartBarSquare className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => confirm(`Er du sikker på at du vil slette "${article.title}"?`) && alert('Artikkel slettet!')}
                              className="p-2 text-terracotta hover:text-terracotta/80 micro-interaction rounded-lg hover:bg-terracotta/10"
                              title={t('delete')}
                            >
                              <HiOutlineTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="bg-stone_light/20 px-6 py-4 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="btn-ghost flex items-center gap-2">
                    <HiOutlineChevronLeft className="w-4 h-4" />
                    Forrige
                  </button>
                  <button className="btn-ghost flex items-center gap-2">
                    Neste
                    <HiOutlineChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-charcoal/70">
                      Viser <span className="font-medium">1</span> til <span className="font-medium">{filteredArticles.length}</span> av{' '}
                      <span className="font-medium">{blogArticles.length}</span> resultater
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                      <button className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-stone bg-warm_white text-sm font-medium text-charcoal/60 hover:bg-stone_light/50 transition-colors">
                        <HiOutlineChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-stone bg-warm_white text-sm font-medium text-charcoal hover:bg-stone_light/50 transition-colors">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-stone bg-warm_white text-sm font-medium text-charcoal/60 hover:bg-stone_light/50 transition-colors">
                        <HiOutlineChevronRight className="w-4 h-4" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* New Article Modal */}
      {showNewArticleModal && (
        <div className="fixed inset-0 bg-charcoal/50 flex items-center justify-center z-50 p-4">
          <div className="bg-warm_white rounded-xl shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-stone">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium text-charcoal" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
                  {t('createNewArticle')}
                </h3>
                <button 
                  onClick={() => setShowNewArticleModal(false)}
                  className="p-2 text-charcoal/60 hover:text-charcoal rounded-lg hover:bg-stone_light/50 transition-colors"
                >
                  <HiXMark className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-charcoal/60 text-center py-12">
                Ny artikkel-editor kommer snart...
              </p>
              <div className="flex justify-end gap-3 pt-6 border-t border-stone">
                <button 
                  onClick={() => setShowNewArticleModal(false)}
                  className="btn-ghost"
                >
                  {t('cancel')}
                </button>
                <button 
                  onClick={() => {
                    alert('Artikkel opprettet!');
                    setShowNewArticleModal(false);
                  }}
                  className="btn-organic"
                >
                  {t('createNewArticle')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminBlogg;