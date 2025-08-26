import React from 'react';
import { 
  HiCheckCircle,
  HiTrash,
  HiCodeBracket,
  HiCog6Tooth,
  HiFolder
} from 'react-icons/hi2';

interface CleanupCompleteProps {
  isDarkTheme?: boolean;
}

const CleanupComplete: React.FC<CleanupCompleteProps> = ({ isDarkTheme = false }) => {
  const completedTasks = [
    {
      title: 'Shared Types System Removal',
      description: 'Fjernet alle eksterne @helseriet/shared-types avhengigheter',
      details: [
        'Slettet shared-types directory komplett',
        'Oppdatert package.json i frontend og backend',
        'Erstattet imports med lokale type definisjoner i api.ts',
        'Fikset alle TypeScript kompatibilitetsfeil'
      ],
      impact: 'Prosjektet er nå 100% selvstendige og portabelt'
    },
    {
      title: 'Test Files Cleanup',
      description: 'Ryddet opp i alle unødvendige test filer og scripts',
      details: [
        'Slettet HTML test filer fra root (7 stk)',
        'Fjernet test backup filer (2 stk)',
        'Slettet gamle image utility scripts (22 stk)',
        'Beholdt funksjonelle Jest tests (12 stk)',
        'Bevarte essential scripts (fix-cloudinary-folder-matching.js)'
      ],
      impact: 'Renere prosjektstruktur og raskere builds'
    },
    {
      title: 'Build System Optimization',
      description: 'Optimaliserte build prosessen for begge prosjektdeler',
      details: [
        'Frontend: 136 moduler transformert på 1.21s',
        'Backend: TypeScript kompilering uten feil',
        'Ingen eksterne avhengigheter å bygge',
        'Automatisk dokumentasjonsoppdatering'
      ],
      impact: 'Perfekte builds og raskere utvikling'
    }
  ];

  return (
    <section id="cleanup-complete" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-sage/10 rounded-full">
              <HiCheckCircle className="w-8 h-8 text-sage" />
            </div>
          </div>
          <h2 className={`text-responsive-h1 font-serif mb-4 ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`}>
            Opprydding Fullført ✨
          </h2>
          <p className={`text-responsive-body max-w-2xl mx-auto ${
            isDarkTheme ? 'text-warm_white/80' : 'text-charcoal/80'
          }`}>
            Prosjektet er nå fullstendig optimalisert og selvstendigt
          </p>
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mt-4 ${
            isDarkTheme 
              ? 'bg-sage/20 text-sage border border-sage/30' 
              : 'bg-sage/10 text-sage border border-sage/20'
          }`}>
            Status: 100% Selvstendige • Ingen Eksterne Avhengigheter
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="space-y-8">
          {completedTasks.map((task, index) => (
            <div key={index} className={`p-8 rounded-lg border ${
              isDarkTheme 
                ? 'bg-charcoal/30 border-warm_white/10' 
                : 'bg-warm_white border-sage/20'
            } hover-float`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-sage/10 rounded-lg">
                  {index === 0 && <HiCodeBracket className="w-6 h-6 text-sage" />}
                  {index === 1 && <HiTrash className="w-6 h-6 text-sage" />}
                  {index === 2 && <HiCog6Tooth className="w-6 h-6 text-sage" />}
                </div>
                
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isDarkTheme ? 'text-warm_white' : 'text-charcoal'
                  }`}>
                    {task.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${
                    isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
                  }`}>
                    {task.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className={`font-medium mb-3 ${
                        isDarkTheme ? 'text-warm_white' : 'text-charcoal'
                      }`}>
                        Utført:
                      </h4>
                      <ul className={`space-y-2 text-sm ${
                        isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
                      }`}>
                        {task.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2">
                            <HiCheckCircle className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className={`font-medium mb-3 ${
                        isDarkTheme ? 'text-warm_white' : 'text-charcoal'
                      }`}>
                        Resultat:
                      </h4>
                      <div className={`p-4 rounded-lg border-l-4 border-sage ${
                        isDarkTheme 
                          ? 'bg-sage/5 border-sage/30' 
                          : 'bg-sage/5 border-sage/20'
                      }`}>
                        <p className={`text-sm font-medium ${
                          isDarkTheme ? 'text-warm_white' : 'text-charcoal'
                        }`}>
                          {task.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className={`text-center p-6 rounded-lg border ${
            isDarkTheme 
              ? 'bg-charcoal/30 border-warm_white/10' 
              : 'bg-stone_light/30 border-sage/20'
          }`}>
            <div className="text-2xl font-bold text-sage mb-2">31</div>
            <div className={`text-sm ${
              isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
            }`}>
              Filer Slettet
            </div>
          </div>
          
          <div className={`text-center p-6 rounded-lg border ${
            isDarkTheme 
              ? 'bg-charcoal/30 border-warm_white/10' 
              : 'bg-stone_light/30 border-sage/20'
          }`}>
            <div className="text-2xl font-bold text-sage mb-2">0</div>
            <div className={`text-sm ${
              isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
            }`}>
              Eksterne Deps
            </div>
          </div>
          
          <div className={`text-center p-6 rounded-lg border ${
            isDarkTheme 
              ? 'bg-charcoal/30 border-warm_white/10' 
              : 'bg-stone_light/30 border-sage/20'
          }`}>
            <div className="text-2xl font-bold text-sage mb-2">1.21s</div>
            <div className={`text-sm ${
              isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
            }`}>
              Build Tid
            </div>
          </div>
          
          <div className={`text-center p-6 rounded-lg border ${
            isDarkTheme 
              ? 'bg-charcoal/30 border-warm_white/10' 
              : 'bg-stone_light/30 border-sage/20'
          }`}>
            <div className="text-2xl font-bold text-sage mb-2">100%</div>
            <div className={`text-sm ${
              isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
            }`}>
              Portabilitet
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className={`mt-12 p-8 rounded-lg border ${
          isDarkTheme 
            ? 'bg-terracotta/10 border-terracotta/20' 
            : 'bg-terracotta/5 border-terracotta/20'
        }`}>
          <div className="flex items-start gap-4">
            <HiFolder className="w-6 h-6 text-terracotta flex-shrink-0 mt-1" />
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                Neste Steg
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Already Completed */}
                <div>
                  <h4 className={`font-medium mb-4 flex items-center gap-2 ${
                    isDarkTheme ? 'text-warm_white' : 'text-charcoal'
                  }`}>
                    <HiCheckCircle className="w-5 h-5 text-sage" />
                    Allerede Fullført ✅
                  </h4>
                  <ul className={`space-y-2 text-sm ${
                    isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
                  }`}>
                    <li>• PostgreSQL database integrert (Railway)</li>
                    <li>• Express.js API backend koblet til</li>
                    <li>• Produktkatalog implementert (100+ produkter)</li>
                    <li>• Admin-system for produktstyring (14 sider)</li>
                    <li>• Brukersystem og autentisering</li>
                    <li>• Betalingsintegrasjon (Stripe/Vipps/Klarna)</li>
                    <li>• Komplett checkout flow (handlekurv → kasse → betaling)</li>
                    <li>• Blog-system med admin redigering</li>
                    <li>• E-post service (passord reset, tokens)</li>
                    <li>• Frontend hooks og state management</li>
                    <li>• Design system og UI komponenter</li>
                    <li>• TypeScript optimalisering</li>
                  </ul>
                </div>
                
                {/* Still To Do */}
                <div>
                  <h4 className={`font-medium mb-4 flex items-center gap-2 ${
                    isDarkTheme ? 'text-warm_white' : 'text-charcoal'
                  }`}>
                    <HiFolder className="w-5 h-5 text-terracotta" />
                    Gjenstående Oppgaver 🚧
                  </h4>
                  <ul className={`space-y-2 text-sm ${
                    isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
                  }`}>
                    <li>• Stripe Elements UI komponenter</li>
                    <li>• E-post ordrebekreftelse template</li>
                    <li>• Rich text editor i blog admin</li>
                    <li>• Deploy til produksjonsmiljø</li>
                    <li>• Performance og SEO optimalisering</li>
                    <li>• SSL sertifikat og domenenavn</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleanupComplete;