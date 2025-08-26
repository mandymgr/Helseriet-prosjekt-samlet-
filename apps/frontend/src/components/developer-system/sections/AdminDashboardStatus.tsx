import React from 'react';
import { 
  HiCheckCircle, 
  HiXCircle, 
  HiClock, 
  HiOutlineShieldCheck,
  HiOutlineArchiveBox,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlinePencilSquare,
  HiOutlineMegaphone,
  HiOutlineChartBarSquare,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineHome
} from 'react-icons/hi2';

interface AdminDashboardStatusProps {
  isDarkTheme?: boolean;
  selectedLanguage?: string;
}

interface FeatureStatus {
  name: string;
  status: 'completed' | 'partial' | 'not-started';
  description: string;
  frontendPath?: string;
  backendEndpoints?: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export const AdminDashboardStatus: React.FC<AdminDashboardStatusProps> = ({ 
  isDarkTheme = false 
}) => {
  
  const features: FeatureStatus[] = [
    {
      name: 'Dashboard Oversikt',
      status: 'completed',
      description: 'Hovedside med statistikk, nylige ordrer og topprodukter',
      frontendPath: '/admin - AdminDashboard.tsx',
      backendEndpoints: ['/api/admin/database/stats'],
      icon: HiOutlineHome
    },
    {
      name: 'Produktadministrasjon',
      status: 'partial',
      description: 'CRUD operasjoner for produkter - List/Create ✓, Update/Delete mangler',
      frontendPath: '/admin/produkter - AdminProdukter.tsx',
      backendEndpoints: [
        '/api/products (GET, POST) ✓',
        '/api/products/:id (PUT, DELETE) ❌'
      ],
      icon: HiOutlineArchiveBox
    },
    {
      name: 'Ordreadministrasjon',
      status: 'not-started',
      description: 'Administrasjon av bestillinger og ordrestatus',
      frontendPath: '/admin/ordrer - AdminOrdrer.tsx (placeholder)',
      backendEndpoints: ['Mangler alle order endpoints'],
      icon: HiOutlineShoppingCart
    },
    {
      name: 'Kundeadministrasjon',
      status: 'partial',
      description: 'User management - basic auth ✓, admin functions mangler',
      frontendPath: '/admin/kunder - AdminKunder.tsx (placeholder)',
      backendEndpoints: [
        '/api/auth/* (basic) ✓',
        '/api/users/admin/* ❌'
      ],
      icon: HiOutlineUsers
    },
    {
      name: 'Bloggadministrasjon',
      status: 'not-started',
      description: 'CMS for blogginnlegg og artikler',
      frontendPath: '/admin/blogg - AdminBlogg.tsx (placeholder)',
      backendEndpoints: ['Mangler alle blog endpoints'],
      icon: HiOutlinePencilSquare
    },
    {
      name: 'Kampanjeadministrasjon',
      status: 'not-started',
      description: 'Administrasjon av tilbud og markedsføringskampanjer',
      frontendPath: '/admin/kampanjer - AdminKampanjer.tsx (placeholder)',
      backendEndpoints: ['Mangler campaign/discount endpoints'],
      icon: HiOutlineMegaphone
    },
    {
      name: 'Analyser og Rapporter',
      status: 'not-started',
      description: 'Salgsstatistikk, KPI dashboards og rapporter',
      frontendPath: '/admin/analyser - AdminAnalyser.tsx (placeholder)',
      backendEndpoints: ['Mangler analytics endpoints'],
      icon: HiOutlineChartBarSquare
    },
    {
      name: 'Systeminnstillinger',
      status: 'partial',
      description: 'Backup system ✓, andre innstillinger mangler',
      frontendPath: '/admin/innstillinger - AdminInnstillinger.tsx',
      backendEndpoints: [
        '/api/admin/backup/* ✓',
        'System config endpoints ❌'
      ],
      icon: HiOutlineAdjustmentsHorizontal
    },
    {
      name: 'Sikkerhet og Tilgangskontroll',
      status: 'partial',
      description: 'Auth middleware ✓, role-based permissions mangler',
      frontendPath: '/admin/sikkerhet - AdminSikkerhet.tsx (placeholder)',
      backendEndpoints: [
        '/api/auth/* (basic) ✓',
        'RBAC endpoints ❌'
      ],
      icon: HiOutlineShieldCheck
    }
  ];

  const getStatusIcon = (status: FeatureStatus['status']) => {
    switch (status) {
      case 'completed':
        return <HiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'partial':
        return <HiClock className="w-5 h-5 text-yellow-500" />;
      case 'not-started':
        return <HiXCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: FeatureStatus['status']) => {
    switch (status) {
      case 'completed':
        return 'Fullført';
      case 'partial':
        return 'Delvis';
      case 'not-started':
        return 'Ikke startet';
    }
  };

  const getStatusColor = (status: FeatureStatus['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'partial':
        return 'border-yellow-200 bg-yellow-50';
      case 'not-started':
        return 'border-red-200 bg-red-50';
    }
  };

  const completedCount = features.filter(f => f.status === 'completed').length;
  const partialCount = features.filter(f => f.status === 'partial').length;
  const notStartedCount = features.filter(f => f.status === 'not-started').length;

  return (
    <section id="admin-dashboard" className={`section-spacing ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-charcoal to-charcoal/80' 
        : 'bg-gradient-to-br from-warm_white to-stone_light/50'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-responsive-h2 font-light mb-6 ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`} style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Admin Dashboard Status
          </h2>
          <p className={`text-responsive-body ${
            isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
          } max-w-3xl mx-auto`}>
            Oversikt over implementert og planlagt admin-funksjonalitet for Helseriet e-commerce plattform.
          </p>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-green-50 border border-green-200 organic-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <HiCheckCircle className="w-8 h-8 text-green-500" />
              <h3 className="text-2xl font-bold text-green-700">{completedCount}</h3>
            </div>
            <p className="text-green-600 font-medium">Fullførte moduler</p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 organic-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <HiClock className="w-8 h-8 text-yellow-500" />
              <h3 className="text-2xl font-bold text-yellow-700">{partialCount}</h3>
            </div>
            <p className="text-yellow-600 font-medium">Delvis implementerte</p>
          </div>
          
          <div className="bg-red-50 border border-red-200 organic-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <HiXCircle className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-bold text-red-700">{notStartedCount}</h3>
            </div>
            <p className="text-red-600 font-medium">Ikke startet</p>
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-6">
          <h3 className={`text-responsive-h3 font-light mb-6 ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`} style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            Admin Moduler
          </h3>
          
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className={`border-2 organic-border p-6 ${getStatusColor(feature.status)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <IconComponent className="w-6 h-6 text-charcoal/70 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-medium text-charcoal">{feature.name}</h4>
                        {getStatusIcon(feature.status)}
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          feature.status === 'completed' ? 'bg-green-100 text-green-700' :
                          feature.status === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {getStatusText(feature.status)}
                        </span>
                      </div>
                      <p className="text-charcoal/70 mb-3 text-sm">
                        {feature.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-xs">
                        {feature.frontendPath && (
                          <div>
                            <span className="font-medium text-sage">Frontend:</span>
                            <div className="mt-1 p-2 bg-white/50 rounded border font-mono text-xs">
                              {feature.frontendPath}
                            </div>
                          </div>
                        )}
                        
                        {feature.backendEndpoints && feature.backendEndpoints.length > 0 && (
                          <div>
                            <span className="font-medium text-terracotta">Backend:</span>
                            <div className="mt-1 p-2 bg-white/50 rounded border">
                              {feature.backendEndpoints.map((endpoint, i) => (
                                <div key={i} className="font-mono text-xs">
                                  {endpoint}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Implementation Notes */}
        <div className="mt-12 bg-sage/10 border border-sage/20 organic-border p-6">
          <h3 className="text-lg font-medium text-charcoal mb-4">
            📝 Implementeringsnotater
          </h3>
          <div className="space-y-3 text-sm text-charcoal/80">
            <p>• <strong>Produktadministrasjon:</strong> Update og Delete endpoints mangler i backend controller</p>
            <p>• <strong>Database Design:</strong> Tabeller for orders, campaigns, blog posts må opprettes</p>
            <p>• <strong>Autentisering:</strong> Role-based access control (RBAC) for admin-funksjoner må implementeres</p>
            <p>• <strong>File Upload:</strong> Mulighet for bulk image upload og management</p>
            <p>• <strong>Email System:</strong> Notifications for orders, campaigns etc.</p>
            <p>• <strong>Analytics:</strong> Integration med analytics tjenester (Google Analytics, custom metrics)</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-terracotta/10 border border-terracotta/20 organic-border p-6">
          <h3 className="text-lg font-medium text-charcoal mb-4">
            🚀 Neste steg
          </h3>
          <ol className="space-y-2 text-sm text-charcoal/80">
            <li><strong>1.</strong> Fullføre produktadministrasjon (UPDATE/DELETE endpoints)</li>
            <li><strong>2.</strong> Implementere ordreadministrasjon med Prisma schema utvidelser</li>
            <li><strong>3.</strong> Sette opp role-based authentication</li>
            <li><strong>4.</strong> Bygge blog/CMS funksjonalitet</li>
            <li><strong>5.</strong> Kampanje og rabatt-system</li>
            <li><strong>6.</strong> Analytics og rapportering</li>
          </ol>
        </div>
      </div>
    </section>
  );
};