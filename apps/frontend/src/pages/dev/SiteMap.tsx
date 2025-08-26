import React, { useState } from 'react';
import { Link } from 'react-router';
import { 
  HiHome,
  HiShoppingBag, 
  HiShoppingCart,
  HiUser,
  HiCog6Tooth,
  HiDocument,
  HiGlobeAlt,
  HiWrenchScrewdriver,
  HiMagnifyingGlass,
  HiOutlineEye,
  HiOutlineQrCode,
  HiChevronDown,
  HiChevronRight,
  HiOutlineCube
} from 'react-icons/hi2';

interface SiteNode {
  path: string;
  name: string;
  description: string;
  status: 'complete' | 'partial' | 'placeholder';
  icon: React.ComponentType<any>;
  children?: SiteNode[];
}

const SiteMap: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['/shop', '/admin', '/dev']);
  const [searchQuery, setSearchQuery] = useState('');
  const [compactView, setCompactView] = useState(false);
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);

  const siteStructure: SiteNode[] = [
    {
      path: '/',
      name: 'Hjem',
      description: 'Hovedside med hero og featured products',
      status: 'complete',
      icon: HiHome,
      children: [
        { path: '/om-oss', name: 'Om Oss', description: 'Bedriftsinformasjon', status: 'complete', icon: HiGlobeAlt },
        { path: '/kontakt', name: 'Kontakt', description: 'Kontaktskjema', status: 'complete', icon: HiUser },
        { path: '/faq', name: 'FAQ', description: 'Ofte stilte spørsmål', status: 'complete', icon: HiDocument },
        { path: '/blogg', name: 'Blog', description: 'Artikler og innhold', status: 'complete', icon: HiDocument },
        { path: '/blogg/:id', name: 'Blog Artikkel', description: 'Dynamisk bloggartikkel', status: 'complete', icon: HiDocument },
        { path: '/filosofi', name: 'Filosofi', description: 'Bedriftens filosofi', status: 'complete', icon: HiGlobeAlt },
        { path: '/spesialist', name: 'Spesialist', description: 'Ekspertpresentasjon', status: 'complete', icon: HiUser },
        { path: '/ai-chat', name: 'AI Chat', description: 'AI-assistent for kosttilskudd-rådgivning', status: 'complete', icon: HiOutlineQrCode },
        { path: '/avbestilling', name: 'Avbestilling', description: 'Avbestill abonnement', status: 'complete', icon: HiUser },
        { path: '/ekspertrad', name: 'Ekspertråd', description: 'Chat med spesialister', status: 'complete', icon: HiUser },
      ]
    },
    {
      path: '/shop',
      name: 'E-commerce',
      description: 'Produktkatalog og handel',
      status: 'complete',
      icon: HiShoppingBag,
      children: [
        { path: '/produkter', name: 'Produkter', description: 'Hovedkatalog med søk/filter', status: 'complete', icon: HiShoppingBag },
        { path: '/kosttilskudd', name: 'Kosttilskudd', description: 'SYNERGY/ORGANIXX bundles', status: 'complete', icon: HiShoppingBag },
        { path: '/yoga-wellness', name: 'Yoga & Wellness', description: 'SHAKTI produkter', status: 'complete', icon: HiShoppingBag },
        { path: '/kategorier', name: 'Kategorier', description: 'Kategoriindeks', status: 'complete', icon: HiShoppingBag },
        { path: '/produkt/:id', name: 'Produktdetaljer', description: 'Dynamisk produktside', status: 'complete', icon: HiShoppingBag },
        { path: '/search', name: 'Søk', description: 'Produktsøk', status: 'complete', icon: HiMagnifyingGlass },
        {
          path: '/bundles',
          name: 'Bundles',
          description: 'Produktpakker',
          status: 'complete',
          icon: HiOutlineCube,
          children: [
            { path: '/bundles', name: 'Bundles Hovedside', description: 'Bundles oversikt', status: 'complete', icon: HiOutlineCube },
            { path: '/bundle/immunforsvar', name: 'Immunforsvar Bundle', description: 'Immunforsvar produktpakke', status: 'complete', icon: HiOutlineCube },
            { path: '/bundle/premium-helse', name: 'Premium Helse', description: 'Premium bundle', status: 'complete', icon: HiOutlineCube },
            { path: '/bundle/starter-pakke', name: 'Starter Pakke', description: 'Starterpaket', status: 'complete', icon: HiOutlineCube },
          ]
        }
      ]
    },
    {
      path: '/cart',
      name: 'Checkout',
      description: 'Handlekurv og checkout',
      status: 'complete',
      icon: HiShoppingCart,
      children: [
        { path: '/handlekurv', name: 'Handlekurv', description: 'Handlekurv med produkter', status: 'complete', icon: HiShoppingCart },
        { path: '/kasse', name: 'Kasse', description: 'Leveringsinformasjon', status: 'complete', icon: HiShoppingCart },
        { path: '/betaling', name: 'Betaling', description: 'Betalingsskjema', status: 'partial', icon: HiShoppingCart },
        { path: '/ordrebekreftelse', name: 'Ordrebekreftelse', description: 'Bekreftelse etter kjøp', status: 'complete', icon: HiShoppingCart },
        { path: '/ordre/:id', name: 'Ordredetaljer', description: 'Detaljert ordrevisning', status: 'complete', icon: HiShoppingCart },
      ]
    },
    {
      path: '/auth',
      name: 'Brukersystem',
      description: 'Autentisering og kontoer',
      status: 'complete',
      icon: HiUser,
      children: [
        { path: '/logg-inn', name: 'Logg Inn', description: 'Brukerpålogging', status: 'complete', icon: HiUser },
        { path: '/registrer', name: 'Registrer', description: 'Ny brukerregistrering', status: 'complete', icon: HiUser },
        { path: '/account', name: 'Min Konto', description: 'Brukerkonto og innstillinger', status: 'complete', icon: HiUser },
        { path: '/account/orders', name: 'Mine Ordrer', description: 'Ordrehistorikk og sporing', status: 'complete', icon: HiUser },
        { path: '/account/favorites', name: 'Mine Favoritter', description: 'Lagrede produkter og ønskeliste', status: 'complete', icon: HiUser },
        { path: '/account/subscriptions', name: 'Mine Abonnementer', description: 'Abonnementshåndtering', status: 'complete', icon: HiUser },
        { path: '/account/addresses', name: 'Mine Adresser', description: 'Adressebok og leveringsadresser', status: 'complete', icon: HiUser },
        { path: '/glemt-passord', name: 'Glemt Passord', description: 'Passord-reset', status: 'complete', icon: HiUser },
      ]
    },
    {
      path: '/admin',
      name: 'Admin Panel',
      description: 'Administrasjonssystem',
      status: 'complete',
      icon: HiCog6Tooth,
      children: [
        { path: '/admin/login', name: 'Admin Login', description: 'Admin pålogging', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin', name: 'Dashboard', description: 'Hovedoversikt', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/dashboard', name: 'Dashboard Alt', description: 'Alternativ dashboard-rute', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/produkter', name: 'Produkter', description: 'Produktadministrasjon', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/ordrer', name: 'Ordrer', description: 'Ordrebehandling', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/kunder', name: 'Kunder', description: 'Kundeadministrasjon', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/blogg', name: 'Blogg Admin', description: 'Bloggoversikt', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/blogg/rediger/:id?', name: 'Blogg Rediger', description: 'Bloggredigering (ny/rediger)', status: 'partial', icon: HiCog6Tooth },
        { path: '/admin/annonser', name: 'Annonser', description: 'Annonsehåndtering', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/ekspertrad', name: 'Ekspertråd', description: 'Ekspertråd admin', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/kampanjer', name: 'Kampanjer', description: 'Kampanjeadministrasjon', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/analyser', name: 'Analyser', description: 'Analytics og rapporter', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/rapport', name: 'Rapporter', description: 'Rapportgenerering', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/innstillinger', name: 'Innstillinger', description: 'Systeminnstillinger', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/forside-innstillinger', name: 'Forsideinnstillinger', description: 'Forsidekonfigurasjon', status: 'complete', icon: HiCog6Tooth },
        { path: '/admin/sikkerhet', name: 'Sikkerhet', description: 'Sikkerhetsinnstillinger', status: 'complete', icon: HiCog6Tooth },
      ]
    },
    {
      path: '/marketing',
      name: 'Markedsføring',
      description: 'Markedsføringssider',
      status: 'complete',
      icon: HiGlobeAlt,
      children: [
        { path: '/kampanjer', name: 'Kampanjer', description: 'Aktive kampanjer og tilbud', status: 'complete', icon: HiGlobeAlt },
      ]
    },
    {
      path: '/legal',
      name: 'Juridisk',
      description: 'Juridiske dokumenter',
      status: 'complete',
      icon: HiDocument,
      children: [
        { path: '/vilkar', name: 'Vilkår', description: 'Salgsvilkår', status: 'complete', icon: HiDocument },
        { path: '/personvern', name: 'Personvern', description: 'Personvernerklæring', status: 'complete', icon: HiDocument },
        { path: '/cookies', name: 'Cookies', description: 'Cookie-policy', status: 'complete', icon: HiDocument },
        { path: '/retur', name: 'Retur', description: 'Returbetingelser', status: 'complete', icon: HiDocument },
        { path: '/frakt', name: 'Frakt', description: 'Fraktinformasjon', status: 'complete', icon: HiDocument },
      ]
    },
    {
      path: '/dev',
      name: 'Utvikling',
      description: 'Utviklingsverktøy',
      status: 'complete',
      icon: HiWrenchScrewdriver,
      children: [
        { path: '/dev-index', name: 'Dev Index', description: 'Sideindeks', status: 'complete', icon: HiOutlineQrCode },
        { path: '/site-map', name: 'Site Map', description: 'Visuelt sidekart', status: 'complete', icon: HiWrenchScrewdriver },
        { path: '/utviklersystem', name: 'Utviklersystem', description: 'Designsystem og dokumentasjon', status: 'complete', icon: HiWrenchScrewdriver },
        { path: '/prosjekt-status', name: 'Prosjektstatus', description: 'Utviklingsfremdrift', status: 'complete', icon: HiWrenchScrewdriver },
        { path: '/stripe-test', name: 'Stripe Test', description: 'Betalingstesting', status: 'complete', icon: HiWrenchScrewdriver },
      ]
    },
    {
      path: '/missing',
      name: 'Manglende sider',
      description: 'Sider funnet i koden men ikke i App.tsx',
      status: 'placeholder',
      icon: HiWrenchScrewdriver,
      children: [
        { path: '/vitaminer', name: 'Vitaminer', description: 'Vitaminseksjonen (referert i Footer)', status: 'placeholder', icon: HiShoppingBag },
        { path: '/helsepakker', name: 'Helsepakker', description: 'Helsepakker (referert i Footer)', status: 'placeholder', icon: HiOutlineCube },
        { path: '/tilbud', name: 'Tilbud', description: 'Tilbudssiden (referert i Footer)', status: 'placeholder', icon: HiGlobeAlt },
        { path: '/sok', name: 'Søk (kort)', description: 'Søkeside (alternativ til /search)', status: 'placeholder', icon: HiMagnifyingGlass },
        { path: '/min-konto', name: 'Min Konto (kort)', description: 'Kontoprofil (alternativ til /account)', status: 'placeholder', icon: HiUser },
        { path: '/specialist', name: 'Specialist (kort)', description: 'Specialist-side (kort URL)', status: 'placeholder', icon: HiUser },
        { path: '/products', name: 'Products (EN)', description: 'Engelsk produktside', status: 'placeholder', icon: HiShoppingBag },
        { path: '/abonnement-vilkar', name: 'Abonnement Vilkår', description: 'Abonnementsvilkår', status: 'placeholder', icon: HiDocument },
        { path: '/admin-dashboard', name: 'Admin Dashboard (kort)', description: 'Admin dashboard (kort URL)', status: 'placeholder', icon: HiCog6Tooth },
        { path: '/admin-produkter', name: 'Admin Produkter (kort)', description: 'Admin produkter (kort URL)', status: 'placeholder', icon: HiCog6Tooth },
        { path: '/admin-ordrer', name: 'Admin Ordrer (kort)', description: 'Admin ordrer (kort URL)', status: 'placeholder', icon: HiCog6Tooth },
        { path: '/admin-kunder', name: 'Admin Kunder (kort)', description: 'Admin kunder (kort URL)', status: 'placeholder', icon: HiCog6Tooth },
        { path: '/admin-blogg', name: 'Admin Blogg (kort)', description: 'Admin blogg (kort URL)', status: 'placeholder', icon: HiCog6Tooth },
        { path: '/admin-kampanjer', name: 'Admin Kampanjer (kort)', description: 'Admin kampanjer (kort URL)', status: 'placeholder', icon: HiCog6Tooth },
        { path: '/admin-annonser', name: 'Admin Annonser (kort)', description: 'Admin annonser (kort URL)', status: 'placeholder', icon: HiCog6Tooth },
        { path: '/admin-analyser', name: 'Admin Analyser (kort)', description: 'Admin analyser (kort URL)', status: 'placeholder', icon: HiCog6Tooth },
        { path: '/admin-ekspertrad', name: 'Admin Ekspertråd (kort)', description: 'Admin ekspertråd (kort URL)', status: 'placeholder', icon: HiCog6Tooth },
        { path: '/admin-rapport', name: 'Admin Rapport (kort)', description: 'Admin rapporter (kort URL)', status: 'placeholder', icon: HiCog6Tooth },
        { path: '/admin-innstillinger', name: 'Admin Innstillinger (kort)', description: 'Admin innstillinger (kort URL)', status: 'placeholder', icon: HiCog6Tooth }
      ]
    },
    {
      path: '/arkiv',
      name: 'Arkiverte sider',
      description: 'Gamle/utdaterte sider som kan fjernes',
      status: 'placeholder',
      icon: HiDocument,
      children: [
        { path: '/bundle-starter-pakke', name: 'Bundle Starter (kort)', description: 'Starter bundle (kort URL) - arkivert', status: 'placeholder', icon: HiOutlineCube },
        { path: '/bundle-premium-helse', name: 'Bundle Premium (kort)', description: 'Premium bundle (kort URL) - arkivert', status: 'placeholder', icon: HiOutlineCube },
        { path: '/bundle-immunforsvar', name: 'Bundle Immun (kort)', description: 'Immunforsvar bundle (kort URL) - arkivert', status: 'placeholder', icon: HiOutlineCube },
        { path: '/hjemmeside-svart-hvitt', name: 'Hjemmeside S/H', description: 'Sort-hvitt versjon av hjemmeside - arkivert', status: 'placeholder', icon: HiHome }
      ]
    }
  ];

  const toggleNode = (path: string) => {
    setExpandedNodes(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 border-green-300 text-green-800';
      case 'partial': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'placeholder': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };


  const getAllNodes = (nodes: SiteNode[]): SiteNode[] => {
    let allNodes: SiteNode[] = [];
    nodes.forEach(node => {
      allNodes.push(node);
      if (node.children) {
        allNodes = allNodes.concat(getAllNodes(node.children));
      }
    });
    return allNodes;
  };

  // Quick filters
  const filterNodes = (nodes: SiteNode[]): SiteNode[] => {
    let filtered = nodes;
    
    // Status filter
    if (showOnlyIncomplete) {
      filtered = filtered.map(section => ({
        ...section,
        children: section.children?.filter(child => 
          child.status !== 'complete' || 
          (child.children && child.children.some(subChild => subChild.status !== 'complete'))
        )
      })).filter(section => section.children && section.children.length > 0);
    }
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.map(section => ({
        ...section,
        children: section.children?.filter(child =>
          child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          child.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          child.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (child.children && child.children.some(subChild =>
            subChild.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subChild.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subChild.path.toLowerCase().includes(searchQuery.toLowerCase())
          ))
        )
      })).filter(section => section.children && section.children.length > 0);
    }
    
    return filtered;
  };

  const filteredNodes = filterNodes(siteStructure);

  const renderNode = (node: SiteNode, level: number = 0, isLast: boolean = false, siblingIndex: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.includes(node.path);
    const IconComponent = node.icon;

    // Compact view rendering
    if (compactView) {
      return (
        <div key={node.path} className={`mb-1 ${level > 0 ? 'ml-6' : ''}`}>
          <div className="flex items-center space-x-2 py-1.5 px-3 hover:bg-sage/10 rounded-lg group transition-colors">
            {/* Expand button */}
            {hasChildren && (
              <button
                onClick={() => toggleNode(node.path)}
                className="w-5 h-5 flex items-center justify-center text-charcoal/50 hover:text-sage"
              >
                {isExpanded ? <HiChevronDown className="w-3 h-3" /> : <HiChevronRight className="w-3 h-3" />}
              </button>
            )}
            {!hasChildren && <div className="w-5" />}
            
            {/* Status */}
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              node.status === 'complete' ? 'bg-green-400' : 
              node.status === 'partial' ? 'bg-yellow-400' : 'bg-red-400'
            }`} />
            
            {/* Icon */}
            <IconComponent className="w-4 h-4 text-charcoal/60 flex-shrink-0" />
            
            {/* Name & Path */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-charcoal truncate">{node.name}</span>
                <code className="text-xs text-charcoal/50 font-mono bg-charcoal/5 px-1.5 py-0.5 rounded">
                  {node.path}
                </code>
              </div>
            </div>
            
            {/* Quick visit button */}
            <Link
              to={node.path}
              className="opacity-0 group-hover:opacity-100 px-2 py-1 text-xs bg-sage text-warm_white rounded hover:bg-sage_dark transition-all transform hover:scale-105"
              title={`Besøk ${node.name}`}
            >
              →
            </Link>
          </div>
          
          {/* Children */}
          {hasChildren && isExpanded && (
            <div className="ml-4 border-l border-stone_light/50 pl-2">
              {node.children!.map((child, index) => 
                renderNode(child, level + 1, index === node.children!.length - 1, index)
              )}
            </div>
          )}
        </div>
      );
    }

    // Regular view rendering
    return (
      <div key={node.path} className="relative">
        {/* Connection Lines */}
        {level > 0 && (
          <>
            {/* Horizontal line */}
            <div 
              className="absolute top-6 left-0 w-6 h-px bg-gradient-to-r from-sage/40 to-terracotta/40"
              style={{ left: level * 32 - 24 }}
            />
            {/* Vertical line */}
            {!isLast && (
              <div 
                className="absolute top-6 bottom-0 w-px bg-gradient-to-b from-sage/40 to-transparent"
                style={{ left: level * 32 - 24 }}
              />
            )}
            {/* Parent connector */}
            <div 
              className="absolute top-0 bottom-1/2 w-px bg-gradient-to-b from-sage/40 to-terracotta/40"
              style={{ left: level * 32 - 24 }}
            />
          </>
        )}

        {/* Node Card */}
        <div 
          className={`relative ml-${level * 8} mb-6`}
          style={{ 
            marginLeft: level * 32,
            transform: level > 0 ? `translateY(${siblingIndex * 2}px)` : 'none'
          }}
        >
          <div className={`
            relative group overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]
            ${level === 0 
              ? 'bg-gradient-to-br from-sage/10 via-warm_white to-terracotta/5 border-2 border-sage/20 shadow-lg hover:shadow-xl' 
              : 'bg-gradient-to-br from-warm_white to-stone_light/30 border border-stone_light/50 shadow-md hover:shadow-lg'
            }
            ${level === 0 ? 'min-w-80' : 'min-w-64'}
          `}>
            
            {/* Decorative Corner */}
            <div className={`
              absolute top-0 right-0 w-16 h-16 transform rotate-45 translate-x-8 -translate-y-8
              ${level === 0 ? 'bg-sage/10' : 'bg-terracotta/10'}
            `} />

            <div className="relative p-6">
              <div className="flex items-start justify-between">
                {/* Left Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    {/* Expand Button */}
                    {hasChildren && (
                      <button
                        onClick={() => toggleNode(node.path)}
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                          ${isExpanded 
                            ? 'bg-sage/20 text-sage shadow-inner' 
                            : 'bg-stone_light/50 hover:bg-sage/10 text-charcoal/60 hover:text-sage'
                          }
                        `}
                      >
                        {isExpanded ? (
                          <HiChevronDown className="w-4 h-4" />
                        ) : (
                          <HiChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}

                    {/* Icon */}
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center shadow-sm
                      ${level === 0 
                        ? 'bg-gradient-to-br from-sage to-sage_dark text-warm_white' 
                        : 'bg-gradient-to-br from-terracotta to-terracotta/80 text-warm_white'
                      }
                    `}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Status Badge */}
                    <div className={`
                      px-3 py-1 rounded-full text-xs font-medium shadow-sm
                      ${getStatusColor(node.status)}
                    `}>
                      <span className="mr-1">
                        {node.status === 'complete' ? '✅' : node.status === 'partial' ? '🔧' : '📝'}
                      </span>
                      {node.status === 'complete' ? 'Ready' : node.status === 'partial' ? 'In Progress' : 'Planned'}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`
                    ${level === 0 ? 'text-xl font-bold' : 'text-lg font-semibold'} 
                    text-charcoal mb-2 group-hover:text-sage transition-colors
                  `}>
                    {node.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-charcoal/70 mb-3 leading-relaxed">
                    {node.description}
                  </p>

                  {/* Path & Children Count */}
                  <div className="flex items-center space-x-3 text-xs">
                    <code className="bg-charcoal/10 px-2 py-1 rounded-md font-mono text-charcoal/80">
                      {node.path}
                    </code>
                    {hasChildren && (
                      <span className="bg-sage/10 text-sage px-2 py-1 rounded-md font-medium">
                        {node.children!.length} {node.children!.length === 1 ? 'page' : 'pages'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Visit Button */}
                <Link
                  to={node.path}
                  className={`
                    ml-4 px-4 py-3 rounded-xl text-sm font-medium 
                    flex items-center space-x-2 transition-all duration-200 shadow-sm hover:shadow-md
                    transform hover:-translate-y-0.5
                    ${level === 0 
                      ? 'bg-gradient-to-r from-sage to-sage_dark hover:from-sage_dark hover:to-sage text-warm_white' 
                      : 'bg-gradient-to-r from-terracotta to-terracotta/90 hover:from-terracotta/90 hover:to-terracotta text-warm_white'
                    }
                  `}
                >
                  <HiOutlineEye className="w-4 h-4" />
                  <span>Visit</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="relative">
            {node.children!.map((child, index) => 
              renderNode(child, level + 1, index === node.children!.length - 1, index)
            )}
          </div>
        )}
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-warm_white to-stone_light/50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Quick Controls */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-charcoal/50" />
            <input
              type="text"
              placeholder="Søk sider eller stier (f.eks. '/admin')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-stone_light rounded-lg focus:outline-none focus:ring-1 focus:ring-sage/50 focus:border-sage transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => setCompactView(!compactView)}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                compactView 
                  ? 'bg-sage text-warm_white shadow-md' 
                  : 'bg-stone_light/50 text-charcoal hover:bg-sage/20'
              }`}
            >
              {compactView ? '📋 Kompakt visning' : '📋 Kompakt'}
            </button>
            
            <button
              onClick={() => setShowOnlyIncomplete(!showOnlyIncomplete)}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                showOnlyIncomplete 
                  ? 'bg-yellow-500 text-warm_white shadow-md' 
                  : 'bg-stone_light/50 text-charcoal hover:bg-yellow-100'
              }`}
            >
              {showOnlyIncomplete ? '🔧 Under arbeid' : '🔧 Vis kun uferdige'}
            </button>

            <div className="ml-auto flex gap-2 text-xs text-charcoal/60">
              <span className="bg-green-100 px-2 py-1 rounded">✅ {getAllNodes(siteStructure).filter(n => n.status === 'complete').length} ferdig</span>
              <span className="bg-yellow-100 px-2 py-1 rounded">🔧 {getAllNodes(siteStructure).filter(n => n.status === 'partial').length} delvis</span>
              <span className="bg-red-100 px-2 py-1 rounded">📝 {getAllNodes(siteStructure).filter(n => n.status === 'placeholder').length} planlagt</span>
            </div>
          </div>
        </div>

        {/* Site Structure */}
        <div className="space-y-12">
          {filteredNodes.map((node, index) => renderNode(node, 0, index === filteredNodes.length - 1, index))}
        </div>

        {/* No Results */}
        {searchQuery && filteredNodes.length === 0 && (
          <div className="bg-warm_white organic-border minimal-shadow p-12 text-center">
            <HiMagnifyingGlass className="w-16 h-16 text-charcoal/30 mx-auto mb-6" />
            <h3 className="text-2xl font-medium text-charcoal mb-4">Ingen resultater funnet</h3>
            <p className="text-charcoal/70 mb-6">
              Ingen sider matcher søket "{searchQuery}". Prøv med andre søkeord.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-sage hover:bg-sage_dark text-warm_white rounded-xl transition-colors"
            >
              Vis alle sider
            </button>
          </div>
        )}

        {/* Quick Actions Footer */}
        <div className="mt-12 bg-gradient-to-r from-sage/10 to-terracotta/10 rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-charcoal mb-1">Hurtignavigasjon</h4>
              <p className="text-sm text-charcoal/70">Klikk for å åpne de mest brukte seksjonene</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setExpandedNodes(['/shop', '/admin', '/dev'])}
                className="px-4 py-2 bg-sage text-warm_white rounded-lg hover:bg-sage_dark transition-colors text-sm"
              >
                🛍️ Åpne hovedseksjoner
              </button>
              <button
                onClick={() => setExpandedNodes([])}
                className="px-4 py-2 bg-charcoal/10 text-charcoal rounded-lg hover:bg-charcoal/20 transition-colors text-sm"
              >
                📁 Lukk alle
              </button>
              <button
                onClick={() => {
                  const allPaths = getAllNodes(siteStructure).map(n => n.path);
                  setExpandedNodes(allPaths);
                }}
                className="px-4 py-2 bg-terracotta text-warm_white rounded-lg hover:bg-terracotta/90 transition-colors text-sm"
              >
                🗂️ Åpne alle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteMap;