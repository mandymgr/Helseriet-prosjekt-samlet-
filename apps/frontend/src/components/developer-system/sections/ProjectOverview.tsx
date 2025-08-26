import React from 'react';
import { 
  HiArrowRight, 
  HiOutlineCube,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineArchiveBox,
  HiOutlineHeart,
  HiOutlineStar,
  HiGlobeAlt,
  HiCog6Tooth,
  HiOutlineCheckCircle
} from 'react-icons/hi2';

const ProjectOverview: React.FC = () => {
  return (
    <section id="prosjektoversikt" className="zen-spacing bg-gradient-to-br from-charcoal to-charcoal/90 text-warm_white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-light mb-12" style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
          Helseriet.no - Prosjektoversikt
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Project Summary */}
          <div>
            <h3 className="text-2xl font-medium mb-6">Prosjektsammendrag</h3>
            <div className="space-y-4 text-warm_white/90">
              <p>
                Helseriet.no er en moderne e-commerce plattform for naturlige helse- og velværeprodukter, 
                bygget med React, TypeScript og Tailwind CSS.
              </p>
              <p>
                Prosjektet fokuserer på å skape en harmonisk brukeropplevelse som kombinerer 
                moderne webutvikling med naturens estetikk.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-2xl font-medium mb-6">Teknologi Stack</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-warm_white/10 rounded-lg p-4">
                <div className="font-medium mb-2">Frontend</div>
                <ul className="text-sm text-warm_white/80 space-y-1">
                  <li>• React 19.1.1</li>
                  <li>• TypeScript 5.8.3</li>
                  <li>• React Router 7.8.0</li>
                  <li>• Vite 7.1.0</li>
                  <li>• Local Type Definitions</li>
                </ul>
              </div>
              <div className="bg-warm_white/10 rounded-lg p-4">
                <div className="font-medium mb-2">Styling</div>
                <ul className="text-sm text-warm_white/80 space-y-1">
                  <li>• Tailwind CSS 4.1.11</li>
                  <li>• PostCSS</li>
                  <li>• React Icons 5.5.0</li>
                  <li>• Custom Design System</li>
                  <li>• Organic Border System</li>
                </ul>
              </div>
              <div className="bg-warm_white/10 rounded-lg p-4">
                <div className="font-medium mb-2">E-commerce</div>
                <ul className="text-sm text-warm_white/80 space-y-1">
                  <li>• Stripe Integration 7.8.0</li>
                  <li>• Payment Processing</li>
                  <li>• Cart Management</li>
                  <li>• Order System</li>
                </ul>
              </div>
              <div className="bg-warm_white/10 rounded-lg p-4">
                <div className="font-medium mb-2">Development</div>
                <ul className="text-sm text-warm_white/80 space-y-1">
                  <li>• ESLint 9.32.0</li>
                  <li>• TypeScript ESLint</li>
                  <li>• Hot Module Reload</li>
                  <li>• Git Workflow</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Project Structure */}
        <div className="mt-12">
          <h3 className="text-2xl font-medium mb-8">Prosjektstruktur</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Pages */}
            <div className="bg-warm_white/10 rounded-lg p-6">
              <h4 className="text-lg font-medium mb-4 text-sage flex items-center">
                <HiOutlineCube className="w-5 h-5 mr-2" />
                Sider (Pages) - 62+ totalt
              </h4>
              <div className="text-sm text-warm_white/80 space-y-3">
                <div>
                  <p className="font-medium text-warm_white mb-1">📁 Ny Mappestruktur (2025-08-22):</p>
                  <ul className="space-y-1 text-xs ml-2">
                    <li>• <strong>admin/</strong> - Admin panel (14 filer + undermapper)</li>
                    <li>• <strong>shop/</strong> - E-commerce sider (6 filer + bundles/)</li>
                    <li>• <strong>cart/</strong> - Checkout flow (4 filer)</li>
                    <li>• <strong>auth/</strong> - Autentisering (3 filer)</li>
                    <li>• <strong>content/</strong> - Hovedinnhold (6 filer)</li>
                    <li>• <strong>legal/</strong> - Juridiske sider (6 filer)</li>
                    <li>• <strong>marketing/</strong> - Markedsføring (1 fil)</li>
                    <li>• <strong>dev/</strong> - Utviklerverktøy (2 filer)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-warm_white mb-1">🔧 Admin Undermapper:</p>
                  <ul className="space-y-1 text-xs ml-2">
                    <li>• <strong>content/</strong> - BloggRediger, Blogg, Annonser, Ekspertråd</li>
                    <li>• <strong>products/</strong> - Produktadministrasjon</li>
                    <li>• <strong>orders/</strong> - Ordrebehandling</li>
                    <li>• <strong>customers/</strong> - Kundeadministrasjon</li>
                    <li>• <strong>settings/</strong> - Innstillinger, Sikkerhet, Forside</li>
                    <li>• <strong>marketing/</strong> - Kampanjer</li>
                    <li>• <strong>analytics/</strong> - Analyser, Rapporter</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-warm_white mb-1">🎯 Fordeler med ny struktur:</p>
                  <ul className="space-y-1 text-xs ml-2">
                    <li>• Bedre organisering av relaterte filer</li>
                    <li>• Enklere navigasjon for utviklere</li>
                    <li>• Skalérbar mappestruktur</li>
                    <li>• Alle import-stier opprettholdt og fungerer</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Components */}
            <div className="bg-warm_white/10 rounded-lg p-6">
              <h4 className="text-lg font-medium mb-4 text-terracotta flex items-center">
                <HiOutlineUsers className="w-5 h-5 mr-2" />
                Komponenter - 26 totalt
              </h4>
              <div className="text-sm text-warm_white/80 space-y-3">
                <div>
                  <p className="font-medium text-warm_white mb-1">Design System (16):</p>
                  <ul className="space-y-1 text-xs ml-2">
                    <li>• <strong>Primitives:</strong> Button, Card, Input, Modal, Select, Textarea, Toast</li>
                    <li>• <strong>Foundations:</strong> Tokens, colors, spacing, typography, shadows</li>
                    <li>• <strong>Developer System:</strong> 9 modulære dokumentasjonsseksjoner</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-warm_white mb-1">Layout (3):</p>
                  <ul className="space-y-1 text-xs ml-2">
                    <li>• <strong>Layout:</strong> Hovedlayout wrapper</li>
                    <li>• <strong>Navbar:</strong> Navigasjon med responsive meny</li>
                    <li>• <strong>Footer:</strong> Bunntekst med lenker</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-warm_white mb-1">Funksjonelle (7):</p>
                  <ul className="space-y-1 text-xs ml-2">
                    <li>• <strong>UI:</strong> ConfirmationDialog, ErrorBoundary, StateComponents</li>
                    <li>• <strong>Sections:</strong> NewsletterSection</li>
                    <li>• <strong>Produkter:</strong> ProductImageGallery, SkeletonLoader</li>
                    <li>• <strong>Testing:</strong> ApiTest</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-warm_white/10 rounded-lg p-6">
              <h4 className="text-lg font-medium mb-4 text-sage flex items-center">
                <HiOutlineShieldCheck className="w-5 h-5 mr-2" />
                Funksjoner
              </h4>
              <ul className="text-sm text-warm_white/80 space-y-2">
                <li><strong>Responsive Design:</strong> Mobil-først tilnærming</li>
                <li><strong>Smooth Animations:</strong> Hover effects og transitions</li>
                <li><strong>Typography System:</strong> Georgia serif + Inter sans</li>
                <li><strong>Color Palette:</strong> Naturinspirerte farger</li>
                <li><strong>Organic Borders:</strong> Unik border-radius system</li>
              </ul>
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE PROJECT ASSESSMENT - CLAUDE EVALUATION 2025-08-24 */}
        <div className="mt-12">
          <h3 className="text-2xl font-medium mb-8">📊 Helseriet Prosjekt - Omfattende Evaluering</h3>
          
          {/* Overall Assessment */}
          <div className="bg-gradient-to-r from-sage/20 to-terracotta/20 border border-sage/30 rounded-lg p-8 mb-8">
            <h4 className="text-2xl font-medium mb-6 text-warm_white flex items-center">
              <HiOutlineShieldCheck className="w-6 h-6 mr-3" />
              🏆 Claude's Prosjektvurdering - 24.8.2025
            </h4>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-sage mb-2">8.5/10</div>
                <div className="text-sm text-warm_white/80">Teknisk Modenhet</div>
                <div className="text-xs text-warm_white/60 mt-1">Moderne teknologier, god arkitektur</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-terracotta mb-2">9/10</div>
                <div className="text-sm text-warm_white/80">Vedlikeholdbarhet</div>
                <div className="text-xs text-warm_white/60 mt-1">Utmerket kodeorganisering</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sage mb-2">8/10</div>
                <div className="text-sm text-warm_white/80">Skalerbarhet</div>
                <div className="text-xs text-warm_white/60 mt-1">Solid fundament for vekst</div>
              </div>
            </div>
            <div className="bg-warm_white/10 p-6 rounded-lg">
              <p className="text-warm_white/90 text-lg italic mb-4">
                "Dette er et velstrukturert, modent prosjekt med solid fundament. Kodearkitekturen er imponerende, 
                spesielt frontend-hooks systemet og den modulære strukturen."
              </p>
              <div className="text-sm text-warm_white/80">
                <strong>Prosjektstørrelse:</strong> 248 TypeScript filer + 104 testfiler + 484 linjer dokumentasjon
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Completed & Strong Points */}
            <div className="bg-sage/10 border border-sage/30 rounded-lg p-6">
              <h4 className="text-xl font-medium mb-4 text-sage flex items-center">
                <HiOutlineCheckCircle className="w-5 h-5 mr-2" />
                🏆 Sterke Sider & Fullført
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-warm_white mb-2">Arkitektur & Struktur:</h5>
                  <ul className="text-sm text-warm_white/80 space-y-1">
                    <li>• Moderne monorepo: React 19 + TypeScript + Vite</li>
                    <li>• 48 sider organisert logisk (admin/, shop/, cart/, auth/)</li>
                    <li>• Robust teknologistabel: Node.js + Prisma + PostgreSQL</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-warm_white mb-2">Kodeorganisering:</h5>
                  <ul className="text-sm text-warm_white/80 space-y-1">
                    <li>• Fremragende hooks-arkitektur (useProducts, useFilters)</li>
                    <li>• Modulær komponentstruktur med design system</li>
                    <li>• TypeScript lokale typer (smart flytting fra shared-types)</li>
                    <li>• Index-filer for ren import-struktur</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-warm_white mb-2">Testing & Kvalitet:</h5>
                  <ul className="text-sm text-warm_white/80 space-y-1">
                    <li>• 104 testfiler (Jest + Supertest)</li>
                    <li>• ESLint + TypeScript strict checking</li>
                    <li>• Comprehensive error handling med ErrorBoundary</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Improvement Areas & Recommendations */}
            <div className="bg-terracotta/10 border border-terracotta/30 rounded-lg p-6">
              <h4 className="text-xl font-medium mb-4 text-terracotta flex items-center">
                <HiOutlineArchiveBox className="w-5 h-5 mr-2" />
                💡 Forbedringspunkter & Anbefalinger
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-warm_white mb-2">Medium Prioritet:</h5>
                  <ul className="text-sm text-warm_white/80 space-y-1">
                    <li>• <strong>Service Layer:</strong> Backend trenger servicelags-pattern</li>
                    <li>• <strong>API dokumentasjon:</strong> Mangler OpenAPI/Swagger spec</li>
                    <li>• <strong>Performance:</strong> Bundle-analyse og optimalisering</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-warm_white mb-2">Lav Prioritet:</h5>
                  <ul className="text-sm text-warm_white/80 space-y-1">
                    <li>• <strong>Monitoring:</strong> Metrics og observability</li>
                    <li>• <strong>Caching:</strong> Redis for bedre performance</li>
                    <li>• <strong>CI/CD:</strong> Automatiserte deployments</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-warm_white mb-2">Kortsiktig (2-4 uker):</h5>
                  <ul className="text-sm text-warm_white/80 space-y-1">
                    <li>• Service Layer Refactoring</li>
                    <li>• OpenAPI implementering</li>
                    <li>• Performance audit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Completed */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-medium mb-4 text-green-700 flex items-center">
              <HiOutlineShieldCheck className="w-5 h-5 mr-2" />
              Nylig Fullført
            </h4>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-medium text-green-600 mb-2">Modularisering ✅</p>
                <ul className="text-green-700 space-y-1">
                  <li>• Utviklersystem: 3,305 linjer → 9 moduler</li>
                  <li>• Improved maintainability</li>
                  <li>• Better code organization</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-600 mb-2">Design System ✅</p>
                <ul className="text-green-700 space-y-1">
                  <li>• 7 primitive komponenter</li>
                  <li>• Color tokens og spacing</li>
                  <li>• Typography system</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-600 mb-2">Project Structure ✅</p>
                <ul className="text-green-700 space-y-1">
                  <li>• 48 sider implementert</li>
                  <li>• 26 komponenter</li>
                  <li>• Modern React 19 setup</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Design Principles */}
        <div className="mt-12">
          <h3 className="text-2xl font-medium mb-8">Designprinsipper</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineHeart className="w-8 h-8 text-sage" />
              </div>
              <h4 className="font-medium mb-2">Naturlig</h4>
              <p className="text-sm text-warm_white/70">Organiske former og naturinspirerte farger</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineArchiveBox className="w-8 h-8 text-terracotta" />
              </div>
              <h4 className="font-medium mb-2">Balansert</h4>
              <p className="text-sm text-warm_white/70">Harmonisk typografi og spacing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineStar className="w-8 h-8 text-sage" />
              </div>
              <h4 className="font-medium mb-2">Elegant</h4>
              <p className="text-sm text-warm_white/70">Subtile animasjoner og micro-interactions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineShieldCheck className="w-8 h-8 text-terracotta" />
              </div>
              <h4 className="font-medium mb-2">Premium</h4>
              <p className="text-sm text-warm_white/70">Høy kvalitet i alle detaljer</p>
            </div>
          </div>
        </div>

        {/* Development Roadmap */}
        <div className="mt-12">
          <h3 className="text-2xl font-medium mb-8">Utviklingsplan Fremover</h3>
          <div className="space-y-8">
            
            {/* Current Status */}
            <div className="bg-warm_white/10 rounded-lg p-8">
              <h4 className="text-xl font-medium mb-6 text-sage flex items-center">
                <HiOutlineShieldCheck className="w-6 h-6 mr-3" />
                Nåværende Status (React Frontend)
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-3 text-warm_white flex items-center">
                    <HiOutlineShieldCheck className="w-4 h-4 mr-2" />
                    Fullført
                  </h5>
                  <ul className="text-sm text-warm_white/80 space-y-1">
                    <li>• Modern React 19.1.1 + TypeScript 5.8.3 arkitektur</li>
                    <li>• Komplett designsystem med 26 komponenter</li>
                    <li>• Responsiv layout med Tailwind CSS 4.1.11</li>
                    <li>• 48 sider implementert (19 offentlige + 14 admin + 15 spesial)</li>
                    <li>• Modularisert utviklersystem (9 seksjoner)</li>
                    <li>• Stripe e-commerce integration</li>
                    <li>• Moderne build-system med Vite 7.1.0</li>
                    <li>• Git workflow med dev/main branches</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-3 text-terracotta flex items-center">
                    <HiArrowRight className="w-4 h-4 mr-2" />
                    Neste Steg
                  </h5>
                  <ul className="text-sm text-warm_white/80 space-y-1">
                    <li>• Integrere eksisterende PostgreSQL database</li>
                    <li>• Koble til Express.js API backend</li>
                    <li>• Implementere produktkatalog med 46+ produkter</li>
                    <li>• Fullføre handlekurv og checkout-funksjonalitet</li>
                    <li>• Admin-system for produktstyring</li>
                    <li>• Brukersystem og autentisering</li>
                    <li>• Blog-system med rich text editor</li>
                    <li>• Betalingsintegrasjon (Stripe/Vipps)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Team Workflow & Git Strategy */}
            <div className="bg-warm_white/10 rounded-lg p-8">
              <h4 className="text-xl font-medium mb-6 text-sage flex items-center">
                <HiOutlineUsers className="w-6 h-6 mr-3" />
                Team Workflow & Git Strategi
              </h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-medium mb-4 text-warm_white flex items-center">
                    <HiGlobeAlt className="w-4 h-4 mr-2" />
                    Branch Struktur
                  </h5>
                  <div className="space-y-3 text-sm text-warm_white/80">
                    <div className="bg-warm_white/5 p-3 rounded-lg">
                      <p><strong className="text-sage">dev branch:</strong> Hovedutvikling og testing</p>
                      <p className="text-xs mt-1">• Alle nye features utvikles her</p>
                      <p className="text-xs">• Safe testing environment</p>
                    </div>
                    <div className="bg-warm_white/5 p-3 rounded-lg">
                      <p><strong className="text-terracotta">main branch:</strong> Produksjonsklar kode</p>
                      <p className="text-xs mt-1">• Kun stable, tested code</p>
                      <p className="text-xs">• Ready for deployment</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-4 text-warm_white flex items-center">
                    <HiCog6Tooth className="w-4 h-4 mr-2" />
                    Development Workflow
                  </h5>
                  <div className="space-y-2 text-sm text-warm_white/80">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-sage rounded-full mr-3"></div>
                      <span>Utvikle på <code className="bg-warm_white/10 px-1 rounded">dev</code> branch</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-sage rounded-full mr-3"></div>
                      <span>Test alle endringer lokalt</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-sage rounded-full mr-3"></div>
                      <span>Pull requests: <code className="bg-warm_white/10 px-1 rounded">dev → main</code></span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-terracotta rounded-full mr-3"></div>
                      <span>Deploy fra <code className="bg-warm_white/10 px-1 rounded">main</code></span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-sage/10 rounded-lg border border-sage/20">
                    <h6 className="font-medium text-sage mb-2 flex items-center">
                      <HiOutlineShieldCheck className="w-4 h-4 mr-2" />
                      Nåværende Status
                    </h6>
                    <p className="text-xs text-warm_white/80">
                      <strong>Frontend:</strong> dev branch opprettet ✅<br/>
                      <strong>Backend:</strong> dev branch opprettet ✅<br/>
                      <strong>Workflow:</strong> Profesjonell git-strategi implementert
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-terracotta/5 rounded-lg border border-terracotta/20">
                <h5 className="font-medium text-terracotta mb-3 flex items-center">
                  <HiOutlineUsers className="w-4 h-4 mr-2" />
                  Team Development Setup
                </h5>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-warm_white/80">
                  <div>
                    <p className="font-medium text-warm_white mb-2">Når teamet vokser:</p>
                    <ul className="space-y-1">
                      <li>• <strong>VS Code Workspaces:</strong> Se frontend+backend samtidig</li>
                      <li>• <strong>Feature branches:</strong> Separate branches per feature</li>
                      <li>• <strong>Code reviews:</strong> Kvalitetsikring via PR</li>
                      <li>• <strong>Automated testing:</strong> CI/CD pipeline</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-warm_white mb-2">Development miljøer:</p>
                    <ul className="space-y-1">
                      <li>• <strong>Local dev:</strong> http://localhost:5173/5174/5176</li>
                      <li>• <strong>Staging:</strong> Testing environment (dev branch)</li>
                      <li>• <strong>Production:</strong> Live site (main branch)</li>
                      <li>• <strong>Database:</strong> Separate per environment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Realistic Next Steps */}
            <div className="bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-lg p-8 border border-green-500/20 mb-8">
              <h4 className="text-xl font-medium mb-6 text-green-300 flex items-center">
                <HiOutlineShieldCheck className="w-6 h-6 mr-3" />
                🎯 Realistisk Roadmap (Neste 6-18 måneder)
              </h4>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Q1 2025 - Immediate */}
                <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                  <h5 className="font-medium text-warm_white mb-4 flex items-center">
                    <HiArrowRight className="w-5 h-5 mr-2 text-green-400" />
                    Q1 2025: Foundation (Nå!)
                  </h5>
                  <ul className="text-sm text-warm_white/80 space-y-2">
                    <li>✅ <strong>TypeScript-feil fikset</strong> (Fullført!)</li>
                    <li>🔧 <strong>Backend-kobling:</strong> Koble til existing Express API</li>
                    <li>🗄️ <strong>Database-integration:</strong> PostgreSQL + Prisma</li>
                    <li>📦 <strong>Produktkatalog:</strong> Laste inn alle 46+ produkter</li>
                    <li>🛒 <strong>Basic handlekurv:</strong> Legg til, fjern, kvantitet</li>
                    <li>💳 <strong>Stripe checkout:</strong> Grunnleggende betalingsflow</li>
                    <li>📱 <strong>Responsive fixes:</strong> Mobil-optimalisering</li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-400/20">
                    <p className="text-xs text-green-300 font-medium">🎯 Mål: Funksjonell nettbutikk</p>
                  </div>
                </div>

                {/* Q2-Q3 2025 - Enhancement */}
                <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                  <h5 className="font-medium text-warm_white mb-4 flex items-center">
                    <HiOutlineCube className="w-5 h-5 mr-2 text-blue-400" />
                    Q2-Q3 2025: Forbedringer
                  </h5>
                  <ul className="text-sm text-warm_white/80 space-y-2">
                    <li>👤 <strong>Brukersystem:</strong> Registrering, innlogging, profil</li>
                    <li>📝 <strong>Ordrehistorikk:</strong> Kunde kan se tidligere kjøp</li>
                    <li>⭐ <strong>Produktanmeldelser:</strong> Enkel rating og kommentarer</li>
                    <li>📧 <strong>Email-varsling:</strong> Ordrebekreftelse og shipping</li>
                    <li>🔍 <strong>Forbedret søk:</strong> Filter på kategori, pris, rating</li>
                    <li>💸 <strong>Vipps-integrasjon:</strong> Norsk betalingsløsning</li>
                    <li>📊 <strong>Admin-dashboard:</strong> Fullføre alle admin-sider</li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
                    <p className="text-xs text-blue-300 font-medium">🎯 Mål: Profesjonell e-commerce</p>
                  </div>
                </div>

                {/* Q4 2025 - Growth */}
                <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                  <h5 className="font-medium text-warm_white mb-4 flex items-center">
                    <HiOutlineUsers className="w-5 h-5 mr-2 text-purple-400" />
                    Q4 2025: Vekst
                  </h5>
                  <ul className="text-sm text-warm_white/80 space-y-2">
                    <li>📝 <strong>Blog-system:</strong> Helse-artikler og SEO</li>
                    <li>💌 <strong>Nyhetsbrev:</strong> Email marketing med Mailchimp</li>
                    <li>🎁 <strong>Gavekort:</strong> Kjøp og innløsningssystem</li>
                    <li>📱 <strong>PWA-funksjoner:</strong> Installering på mobil</li>
                    <li>🚚 <strong>Leveringsalternativer:</strong> Posten, Bring, henting</li>
                    <li>📈 <strong>Google Analytics:</strong> Detaljert brukerdata</li>
                    <li>🔒 <strong>GDPR-compliance:</strong> Cookier og personvern</li>
                  </ul>
                  <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-400/20">
                    <p className="text-xs text-purple-300 font-medium">🎯 Mål: Skalerbar plattform</p>
                  </div>
                </div>

                {/* 2026 - Innovation */}
                <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                  <h5 className="font-medium text-warm_white mb-4 flex items-center">
                    <HiOutlineHeart className="w-5 h-5 mr-2 text-pink-400" />
                    2026: Innovasjon
                  </h5>
                  <ul className="text-sm text-warm_white/80 space-y-2">
                    <li>🤖 <strong>Enkel chatbot:</strong> FAQ og kundestøtte</li>
                    <li>👥 <strong>Terapeutnettverk:</strong> Koble til lokale terapeuter</li>
                    <li>📊 <strong>Personalisering:</strong> Anbefalinger basert på kjøp</li>
                    <li>🏆 <strong>Lojalitetsprogram:</strong> Poeng for gjentatte kjøp</li>
                    <li>📱 <strong>Mobilapp:</strong> React Native eller hybrid</li>
                    <li>🌱 <strong>Bærekraft:</strong> Karbon-kompensasjon på leveranser</li>
                    <li>🇸🇪 <strong>Svensk/Dansk:</strong> Flerspråklig ekspansjon</li>
                  </ul>
                  <div className="mt-4 p-3 bg-pink-500/10 rounded-lg border border-pink-400/20">
                    <p className="text-xs text-pink-300 font-medium">🎯 Mål: Holistisk helseplattform</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-warm_white/5 rounded-lg border border-warm_white/10">
                <h6 className="font-medium text-warm_white mb-3 flex items-center">
                  <HiCog6Tooth className="w-5 h-5 mr-2 text-sage" />
                  💡 Implementeringstips
                </h6>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-warm_white/80">
                  <div>
                    <p className="font-medium text-warm_white mb-2">🔧 Teknisk Prioritering:</p>
                    <ul className="space-y-1">
                      <li>1. <strong>Backend først:</strong> API og database må fungere</li>
                      <li>2. <strong>Core features:</strong> Handlekurv og betaling</li>
                      <li>3. <strong>User experience:</strong> Så brukervennlighet</li>
                      <li>4. <strong>Nice-to-have:</strong> Til slutt de fancy funksjonene</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-warm_white mb-2">💰 Kostnad vs Verdi:</p>
                    <ul className="space-y-1">
                      <li>💚 <strong>Billig/Høy verdi:</strong> Vipps, email-varsling</li>
                      <li>💛 <strong>Medium:</strong> PWA, chatbot, reviews</li>
                      <li>💸 <strong>Dyr/Lang tid:</strong> Mobilapp, AI-personalisering</li>
                      <li>🚀 <strong>Fremtid:</strong> AR/VR, blockchain, quantum</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Future Dreams & Vision */}
            <div className="bg-gradient-to-r from-sage/10 to-terracotta/10 rounded-lg p-8 border border-sage/20">
              <h4 className="text-xl font-medium mb-6 text-sage flex items-center">
                <HiOutlineStar className="w-6 h-6 mr-3" />
                🌟 Lange Drømmer & Visjoner (2027+)
              </h4>
              <p className="text-sm text-warm_white/70 mb-6 italic">
                💭 Disse er inspirerende fremtidsvisjoner - noen realistiske, andre sci-fi fantasier!
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Phase 1: Core E-commerce */}
                <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                  <h5 className="font-medium text-warm_white mb-4 flex items-center">
                    <HiOutlineCube className="w-5 h-5 mr-2 text-sage" />
                    Fase 1: E-commerce Kjerne
                  </h5>
                  <ul className="text-sm text-warm_white/80 space-y-2">
                    <li>🛒 <strong>Avansert handlekurv:</strong> Lagre for senere, favoritter</li>
                    <li>💳 <strong>Vipps integrasjon:</strong> Norsk betalingsløsning</li>
                    <li>📦 <strong>Leveringsalternativer:</strong> Posten, Bring, henting</li>
                    <li>🎁 <strong>Gavekort system:</strong> Kjøp og innløs gavekort</li>
                    <li>🔔 <strong>Email notifikasjoner:</strong> Ordrebekreftelse, shipping</li>
                    <li>⭐ <strong>Anmeldelsessystem:</strong> Kunde-reviews og rating</li>
                    <li>📱 <strong>SMS-varsling:</strong> Ordrestatus via SMS</li>
                  </ul>
                </div>

                {/* Phase 2: Customer Experience */}
                <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                  <h5 className="font-medium text-warm_white mb-4 flex items-center">
                    <HiOutlineHeart className="w-5 h-5 mr-2 text-terracotta" />
                    Fase 2: Kundeopplevelse
                  </h5>
                  <ul className="text-sm text-warm_white/80 space-y-2">
                    <li>🤖 <strong>AI Chatbot:</strong> 24/7 kundestøtte med Claude</li>
                    <li>🎯 <strong>Personalisering:</strong> Anbefalinger basert på kjøpshistorikk</li>
                    <li>📊 <strong>Kunde-dashboard:</strong> Ordrehistorikk, favoritter, profil</li>
                    <li>🔍 <strong>Smart søk:</strong> AI-drevet produktsøk med synonymer</li>
                    <li>💬 <strong>Live chat:</strong> Real-time kundeservice</li>
                    <li>📧 <strong>Nyhetsbrev:</strong> Personaliserte tilbud og tips</li>
                    <li>🏆 <strong>Lojalitetsprogram:</strong> Poeng og belønninger</li>
                  </ul>
                </div>

                {/* Phase 3: Advanced Features */}
                <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                  <h5 className="font-medium text-warm_white mb-4 flex items-center">
                    <HiOutlineShieldCheck className="w-5 h-5 mr-2 text-sage" />
                    Fase 3: Avanserte Funksjoner
                  </h5>
                  <ul className="text-sm text-warm_white/80 space-y-2">
                    <li>🔮 <strong>AR/VR visualisering:</strong> Se produkter i 3D</li>
                    <li>📱 <strong>Progressive Web App:</strong> App-lignende opplevelse</li>
                    <li>🔔 <strong>Push-notifikasjoner:</strong> Tilbud og påminnelser</li>
                    <li>📈 <strong>Advanced Analytics:</strong> Detaljerte brukerinsikter</li>
                    <li>🌐 <strong>Flerspråklig:</strong> Engelsk, svensk, dansk</li>
                    <li>⚡ <strong>Edge caching:</strong> Lynrask lasting globalt</li>
                    <li>🧪 <strong>A/B testing:</strong> Kontinuerlig optimalisering</li>
                  </ul>
                </div>
              </div>

              {/* Dream Features */}
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-300/20">
                <h5 className="font-medium text-warm_white mb-4 flex items-center">
                  <HiOutlineStar className="w-5 h-5 mr-2 text-yellow-300" />
                  🚀 Drømme-funksjoner (Sky's the Limit!)
                </h5>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-warm_white/80">
                  <div>
                    <p className="font-medium text-warm_white mb-2">🧬 Helse & Wellness Integration:</p>
                    <ul className="space-y-1">
                      <li>• <strong>Personlig helseprofil:</strong> Tilpassede anbefalinger</li>
                      <li>• <strong>Symptomsjekker:</strong> AI-drevet helserådgivning</li>
                      <li>• <strong>Måltidplanlegger:</strong> Kosttilskudd + oppskrifter</li>
                      <li>• <strong>Yoga-videoer:</strong> Streaming av velvære-innhold</li>
                      <li>• <strong>Helse-tracking:</strong> Integrasjon med wearables</li>
                      <li>• <strong>Terapeut-nettverk:</strong> Samarbeid med autoriserte terapeuter</li>
                      <li>• <strong>Holistisk behandling:</strong> Kombinere produkter + terapiseanser</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-warm_white mb-2">🌟 Next-Gen Teknologi:</p>
                    <ul className="space-y-1">
                      <li>• <strong>Blockchain sertifisering:</strong> Produktautentisitet</li>
                      <li>• <strong>IoT integration:</strong> Smart hjemme-leveranser</li>
                      <li>• <strong>Voice commerce:</strong> "Alexa, bestill vitaminer"</li>
                      <li>• <strong>Subscription boxes:</strong> Personaliserte månedlige pakker</li>
                      <li>• <strong>Virtual consultations:</strong> 1:1 med helseeksperter</li>
                      <li>• <strong>Terapeut-booking:</strong> Bestill time hos partnere direkte</li>
                      <li>• <strong>Behandlingsplaner:</strong> Integrerte produkt + terapi-pakker</li>
                    </ul>
                  </div>
                </div>
                
                {/* Wild Dreams Section */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg border border-blue-300/20">
                  <h6 className="font-medium text-warm_white mb-4 flex items-center">
                    <HiOutlineHeart className="w-5 h-5 mr-2 text-pink-300" />
                    🌈 Ville Drømmer (Hva om vi virkelig tenker stort?)
                  </h6>
                  <div className="grid md:grid-cols-2 gap-6 text-sm text-warm_white/80">
                    <div>
                      <p className="font-medium text-warm_white mb-2">🌍 Global Impact:</p>
                      <ul className="space-y-1">
                        <li>• <strong>Helseriet International:</strong> Ekspansjon til hele Norden</li>
                        <li>• <strong>Bærekraft-sertifisering:</strong> Karbon-nøytrale leveranser</li>
                        <li>• <strong>Sosial impact:</strong> 1% av omsetning til veldedighet</li>
                        <li>• <strong>Forskningspartnerskap:</strong> Med universiteter om nye produkter</li>
                        <li>• <strong>Wellness-festivaler:</strong> Årlige helse-events i Norge</li>
                        <li>• <strong>Helseriet Academy:</strong> Online kurs i holistisk helse</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-warm_white mb-2">🚀 Sci-Fi Teknologi:</p>
                      <ul className="space-y-1">
                        <li>• <strong>Biometrisk shopping:</strong> Scan fingeravtrykk for personalisering</li>
                        <li>• <strong>Drone-leveranser:</strong> 30 min levering i Oslo</li>
                        <li>• <strong>Hologram konsultasjoner:</strong> 3D terapeut-møter hjemme</li>
                        <li>• <strong>Neuro-feedback:</strong> Måle stressnivå for produktanbefalinger</li>
                        <li>• <strong>Smart mirrors:</strong> AR-speil som viser helsemetrikk</li>
                        <li>• <strong>Quantum computing:</strong> Perfekte molekylære analyser</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Community Dreams */}
                <div className="mt-6 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-300/20">
                  <h6 className="font-medium text-warm_white mb-4 flex items-center">
                    <HiOutlineUsers className="w-5 h-5 mr-2 text-orange-300" />
                    👥 Community & Fellesskap
                  </h6>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-warm_white/80">
                    <div>
                      <p className="font-medium text-warm_white mb-2">🏠 Fysiske Spaces:</p>
                      <ul className="space-y-1">
                        <li>• <strong>Helseriet Café:</strong> Smoothie-bar med produkter</li>
                        <li>• <strong>Wellness Center:</strong> Yoga + produktsalg</li>
                        <li>• <strong>Pop-up apotek:</strong> Midlertidige butikker</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-warm_white mb-2">🤝 Community Features:</p>
                      <ul className="space-y-1">
                        <li>• <strong>Helseriet Stories:</strong> Kunde-transformasjoner</li>
                        <li>• <strong>Wellness Challenges:</strong> Månedlige helse-utfordringer</li>
                        <li>• <strong>Expert AMAs:</strong> Live Q&A med helseeksperter</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-warm_white mb-2">📱 Social Platform:</p>
                      <ul className="space-y-1">
                        <li>• <strong>Helse-journal:</strong> Del din reise</li>
                        <li>• <strong>Buddy-system:</strong> Finn helse-partnere</li>
                        <li>• <strong>Gamification:</strong> Nivåer og achievements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Future Scenarios */}
                <div className="mt-6 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-300/20">
                  <h6 className="font-medium text-warm_white mb-4 flex items-center">
                    <HiOutlineShieldCheck className="w-5 h-5 mr-2 text-indigo-300" />
                    🔮 Fremtidsscenarier (2025-2035)
                  </h6>
                  <div className="space-y-4 text-sm text-warm_white/80">
                    <div className="bg-warm_white/5 p-4 rounded-lg">
                      <p className="font-medium text-warm_white mb-2">📅 2025: "Smart Helse" Launch</p>
                      <p>AI-drevet personalisering, Vipps-integration, full e-commerce funksjonalitet. 1000+ produkter, 50+ terapeuter tilknyttet.</p>
                    </div>
                    <div className="bg-warm_white/5 p-4 rounded-lg">
                      <p className="font-medium text-warm_white mb-2">📅 2027: "Connected Wellness" Era</p>
                      <p>IoT-enheter, wearable-integrasjon, AR produktvisualisering. Første fysiske Helseriet Café åpner i Oslo.</p>
                    </div>
                    <div className="bg-warm_white/5 p-4 rounded-lg">
                      <p className="font-medium text-warm_white mb-2">📅 2030: "Holistisk Helse-Økosystem"</p>
                      <p>Komplett helseplattform med AI-terapeuter, virtual reality behandlinger, og personaliserte molekylære tilskudd basert på DNA-analyse.</p>
                    </div>
                    <div className="bg-warm_white/5 p-4 rounded-lg">
                      <p className="font-medium text-warm_white mb-2">📅 2035: "Quantum Wellness Revolution"</p>
                      <p>Kvantedatamaskin-optimaliserte behandlingsplaner, tele-transporterte konsultasjoner, og biomarker-predikert helse før symptomer oppstår.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-warm_white/5 rounded-lg border border-warm_white/10">
                  <p className="text-sm text-warm_white/70 italic text-center">
                    💡 <strong>Visjon 2030:</strong> "Helseriet.no blir Nordens ledende holistiske helseplattform - 
                    ikke bare en butikk, men din personlige velvære-partner som kombinerer produkter, 
                    kunnskap og teknologi for optimal livskvalitet."
                  </p>
                  <p className="text-xs text-warm_white/60 text-center mt-3">
                    🌟 <em>"Fra en enkel nettbutikk til et komplett livsstil-økosystem som revolusjonerer hvordan nordmenn tenker på helse og velvære."</em>
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;