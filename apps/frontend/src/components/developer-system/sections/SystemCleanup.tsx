import React, { useState } from 'react';
import { 
  HiWrenchScrewdriver, 
  HiExclamationTriangle, 
  HiCheckCircle,
  HiXCircle,
  HiCog6Tooth,
  HiCommandLine,
  HiDocumentText
} from 'react-icons/hi2';

interface SystemCleanupProps {
  isDarkTheme?: boolean;
  selectedLanguage?: string;
}

const SystemCleanup: React.FC<SystemCleanupProps> = ({ isDarkTheme = false }) => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string, commandName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCommand(commandName);
      setTimeout(() => setCopiedCommand(null), 2000);
    });
  };

  const CodeBlock: React.FC<{ children: React.ReactNode; command?: string; title?: string }> = ({ 
    children, 
    command,
    title 
  }) => (
    <div className="relative group">
      {title && (
        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-sage">
          <HiCommandLine className="w-4 h-4" />
          {title}
        </div>
      )}
      <div className={`p-4 rounded-lg border font-mono text-sm ${
        isDarkTheme 
          ? 'bg-charcoal/50 border-warm_white/20 text-warm_white' 
          : 'bg-stone_light/30 border-sage/20 text-charcoal'
      }`}>
        {children}
        {command && (
          <button
            onClick={() => copyToClipboard(command, title || 'command')}
            className={`absolute top-2 right-2 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-all ${
              copiedCommand === (title || 'command')
                ? 'text-green-500'
                : isDarkTheme 
                  ? 'text-warm_white/60 hover:text-warm_white hover:bg-warm_white/10' 
                  : 'text-charcoal/60 hover:text-charcoal hover:bg-charcoal/10'
            }`}
            title="Kopier kommando"
          >
            {copiedCommand === (title || 'command') ? (
              <HiCheckCircle className="w-4 h-4" />
            ) : (
              <HiDocumentText className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <section id="system-cleanup" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-sage/10 rounded-full">
              <HiWrenchScrewdriver className="w-8 h-8 text-sage" />
            </div>
          </div>
          <h2 className={`text-responsive-h1 font-serif mb-4 ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`}>
            System Cleanup
          </h2>
          <p className={`text-responsive-body max-w-2xl mx-auto ${
            isDarkTheme ? 'text-warm_white/80' : 'text-charcoal/80'
          }`}>
            Verktøy og kommandoer for å forhindre system-kaos og duplikate prosesser
          </p>
        </div>

        {/* Problem Description */}
        <div className={`p-6 rounded-lg border-l-4 border-orange-500 mb-8 ${
          isDarkTheme 
            ? 'bg-orange-500/10 border-orange-500/20' 
            : 'bg-orange-50 border-orange-500'
        }`}>
          <div className="flex items-start gap-3">
            <HiExclamationTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className={`font-semibold mb-2 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                Problem: Duplikate Prosesser
              </h3>
              <p className={`text-sm ${
                isDarkTheme ? 'text-warm_white/80' : 'text-charcoal/70'
              }`}>
                Tidligere hadde vi 63+ Node prosesser som kjørte samtidig, noe som skapte system-kaos. 
                Dette skjedde på grunn av flere parallelle utviklingssesjoner og manglende cleanup.
              </p>
            </div>
          </div>
        </div>

        {/* Solution */}
        <div className={`p-6 rounded-lg border-l-4 border-green-500 mb-8 ${
          isDarkTheme 
            ? 'bg-green-500/10 border-green-500/20' 
            : 'bg-green-50 border-green-500'
        }`}>
          <div className="flex items-start gap-3">
            <HiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className={`font-semibold mb-2 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                Løsning: Automatisert Cleanup
              </h3>
              <p className={`text-sm ${
                isDarkTheme ? 'text-warm_white/80' : 'text-charcoal/70'
              }`}>
                Vi har implementert automatiserte scripts og npm kommandoer som forhindrer og løser prosess-kaos.
              </p>
            </div>
          </div>
        </div>

        {/* Commands Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Recommended Commands */}
          <div>
            <h3 className={`text-responsive-h3 font-semibold mb-6 flex items-center gap-2 ${
              isDarkTheme ? 'text-warm_white' : 'text-charcoal'
            }`}>
              <HiCheckCircle className="w-5 h-5 text-green-500" />
              Anbefalte Kommandoer
            </h3>
            
            <div className="space-y-4">
              <CodeBlock 
                title="Ren oppstart (anbefalt)"
                command="npm run start:clean"
              >
                npm run start:clean
              </CodeBlock>
              
              <CodeBlock 
                title="Kun cleanup"
                command="npm run cleanup"
              >
                npm run cleanup
              </CodeBlock>
              
              <CodeBlock 
                title="Sjekk antall prosesser"
                command="npm run check:processes"
              >
                npm run check:processes
              </CodeBlock>
              
              <CodeBlock 
                title="Manuell cleanup script"
                command="./scripts/cleanup.sh"
              >
                ./scripts/cleanup.sh
              </CodeBlock>
            </div>
          </div>

          {/* Dangerous Commands */}
          <div>
            <h3 className={`text-responsive-h3 font-semibold mb-6 flex items-center gap-2 ${
              isDarkTheme ? 'text-warm_white' : 'text-charcoal'
            }`}>
              <HiXCircle className="w-5 h-5 text-red-500" />
              Unngå Disse (skaper duplikater)
            </h3>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border border-red-500/30 ${
                isDarkTheme 
                  ? 'bg-red-500/10' 
                  : 'bg-red-50'
              }`}>
                <div className="font-mono text-sm text-red-500 mb-2">
                  cd helseriet-frontend && npm run dev
                </div>
                <div className={`text-xs ${
                  isDarkTheme ? 'text-warm_white/60' : 'text-charcoal/60'
                }`}>
                  Kan skape duplikat frontend server
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border border-red-500/30 ${
                isDarkTheme 
                  ? 'bg-red-500/10' 
                  : 'bg-red-50'
              }`}>
                <div className="font-mono text-sm text-red-500 mb-2">
                  cd helseriet-backend && npm run dev
                </div>
                <div className={`text-xs ${
                  isDarkTheme ? 'text-warm_white/60' : 'text-charcoal/60'
                }`}>
                  Kan skape duplikat backend server
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Script Details */}
        <div className="mb-8">
          <h3 className={`text-responsive-h3 font-semibold mb-6 flex items-center gap-2 ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`}>
            <HiCog6Tooth className="w-5 h-5 text-sage" />
            Script Detaljer
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg border ${
              isDarkTheme 
                ? 'bg-charcoal/30 border-warm_white/10' 
                : 'bg-stone_light/30 border-sage/20'
            }`}>
              <h4 className={`font-semibold mb-3 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                cleanup.sh
              </h4>
              <ul className={`space-y-2 text-sm ${
                isDarkTheme ? 'text-warm_white/80' : 'text-charcoal/80'
              }`}>
                <li>• Stopper alle Helseriet backend servere</li>
                <li>• Stopper alle Helseriet frontend servere</li>
                <li>• Stopper alle Prisma Studio instanser</li>
                <li>• Viser antall resterende prosesser</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg border ${
              isDarkTheme 
                ? 'bg-charcoal/30 border-warm_white/10' 
                : 'bg-stone_light/30 border-sage/20'
            }`}>
              <h4 className={`font-semibold mb-3 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                package.json scripts
              </h4>
              <ul className={`space-y-2 text-sm ${
                isDarkTheme ? 'text-warm_white/80' : 'text-charcoal/80'
              }`}>
                <li>• <code>start:clean</code> - Cleanup + start begge servere</li>
                <li>• <code>cleanup</code> - Kun cleanup script</li>
                <li>• <code>check:processes</code> - Tell aktive prosesser</li>
                <li>• <code>dev:frontend/backend</code> - Start enkeltservere</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prevention */}
        <div className={`p-6 rounded-lg border ${
          isDarkTheme 
            ? 'bg-sage/10 border-sage/20' 
            : 'bg-sage/5 border-sage/20'
        }`}>
          <h3 className={`text-responsive-h3 font-semibold mb-4 flex items-center gap-2 ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`}>
            <HiCheckCircle className="w-5 h-5 text-sage" />
            Forebygging
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className={`font-medium mb-2 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                .gitignore
              </h4>
              <p className={`text-sm ${
                isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
              }`}>
                Forhindrer feil .env filer og lokale databaser
              </p>
            </div>
            
            <div>
              <h4 className={`font-medium mb-2 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                Dokumentasjon
              </h4>
              <p className={`text-sm ${
                isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
              }`}>
                Oppdatert CLAUDE.md med beste praksis
              </p>
            </div>
            
            <div>
              <h4 className={`font-medium mb-2 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                Automatisering
              </h4>
              <p className={`text-sm ${
                isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
              }`}>
                Smart npm scripts for trygg utvikling
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemCleanup;