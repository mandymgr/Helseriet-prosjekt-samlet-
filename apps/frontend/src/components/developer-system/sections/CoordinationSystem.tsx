import React, { useState } from 'react';
import { 
  HiUsers, 
  HiWifi, 
  HiChatBubbleLeftRight,
  HiClipboardDocumentList,
  HiServerStack,
  HiEye,
  HiCommandLine,
  HiCheckCircle,
  HiExclamationTriangle,
  HiDocumentText,
  HiCog6Tooth
} from 'react-icons/hi2';

interface CoordinationSystemProps {
  isDarkTheme?: boolean;
  selectedLanguage?: string;
}

const CoordinationSystem: React.FC<CoordinationSystemProps> = ({ isDarkTheme = false }) => {
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
    <section id="coordination-system" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-terracotta/10 rounded-full">
              <HiUsers className="w-8 h-8 text-terracotta" />
            </div>
          </div>
          <h2 className={`text-responsive-h1 font-serif mb-4 ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`}>
            Claude Coordination System
          </h2>
          <p className={`text-responsive-body max-w-2xl mx-auto ${
            isDarkTheme ? 'text-warm_white/80' : 'text-charcoal/80'
          }`}>
            Avansert koordineringssystem som optimaliserer samarbeid mellom multiple Claude Code sessions
          </p>
        </div>

        {/* System Overview */}
        <div className={`p-6 rounded-lg border-l-4 border-terracotta mb-8 ${
          isDarkTheme 
            ? 'bg-terracotta/10 border-terracotta/20' 
            : 'bg-terracotta/5 border-terracotta'
        }`}>
          <div className="flex items-start gap-3">
            <HiWifi className="w-6 h-6 text-terracotta flex-shrink-0 mt-0.5" />
            <div>
              <h3 className={`font-semibold mb-2 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                Ultra Claude Coordination v3.0
              </h3>
              <p className={`text-sm ${
                isDarkTheme ? 'text-warm_white/80' : 'text-charcoal/70'
              }`}>
                Real-time koordineringssystem som forhindrer konflikter og optimaliserer samarbeid mellom 
                multiple Claude Code sessions. Inkluderer server management, task delegation, og shared workspace.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: HiServerStack,
              title: 'Server Koordinering',
              description: 'Forhindrer duplikate servere ved å koordinere eierskap av backend, frontend og Prisma Studio',
              color: 'text-blue-500'
            },
            {
              icon: HiChatBubbleLeftRight,
              title: 'Real-time Kommunikasjon',
              description: 'Claude sessions kan sende meldinger og announcements til hverandre i real-time',
              color: 'text-green-500'
            },
            {
              icon: HiClipboardDocumentList,
              title: 'Task Delegation',
              description: 'Smart oppgavedelegering med auto-assignment til minst belastede session',
              color: 'text-purple-500'
            },
            {
              icon: HiEye,
              title: 'Shared Workspace',
              description: 'Felles arbeidsområde med shared focus og notater mellom alle sessions',
              color: 'text-orange-500'
            },
            {
              icon: HiCog6Tooth,
              title: 'Intelligent Cleanup',
              description: 'Automatisk opprydding av døde sessions og frigjøring av ressurser',
              color: 'text-red-500'
            },
            {
              icon: HiCheckCircle,
              title: 'Conflict Resolution',
              description: 'Automatisk deteksjon og løsning av konflikter mellom sessions',
              color: 'text-teal-500'
            }
          ].map((feature, index) => (
            <div key={index} className={`p-6 rounded-lg border ${
              isDarkTheme 
                ? 'bg-charcoal/30 border-warm_white/10' 
                : 'bg-stone_light/30 border-sage/20'
            }`}>
              <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
              <h3 className={`font-semibold mb-2 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${
                isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Command Reference */}
        <div className="mb-12">
          <h3 className={`text-responsive-h3 font-semibold mb-6 flex items-center gap-2 ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`}>
            <HiCommandLine className="w-5 h-5 text-terracotta" />
            Kommando Referanse
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Basic Commands */}
            <div>
              <h4 className={`font-medium mb-4 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                Grunnleggende Kommandoer
              </h4>
              
              <div className="space-y-4">
                <CodeBlock 
                  title="Se system status"
                  command=".claude-coordination/ultra-coordinator.js status"
                >
                  .claude-coordination/ultra-coordinator.js status
                </CodeBlock>
                
                <CodeBlock 
                  title="Send melding til alle"
                  command='.claude-coordination/ultra-coordinator.js msg "Hei alle Claude sessions!"'
                >
                  .claude-coordination/ultra-coordinator.js msg "Melding her"
                </CodeBlock>
                
                <CodeBlock 
                  title="Be om server eierskap"
                  command=".claude-coordination/ultra-coordinator.js server request backend"
                >
                  .claude-coordination/ultra-coordinator.js server request backend
                </CodeBlock>
              </div>
            </div>

            {/* Advanced Commands */}
            <div>
              <h4 className={`font-medium mb-4 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                Avanserte Kommandoer
              </h4>
              
              <div className="space-y-4">
                <CodeBlock 
                  title="Deleger oppgave"
                  command='.claude-coordination/ultra-coordinator.js task add "Fix CSS bug" "Button styling issue"'
                >
                  .claude-coordination/ultra-coordinator.js task add "Oppgave" "Beskrivelse"
                </CodeBlock>
                
                <CodeBlock 
                  title="Sett workspace focus"
                  command='.claude-coordination/ultra-coordinator.js focus "Product page development"'
                >
                  .claude-coordination/ultra-coordinator.js focus "Arbeidsområde"
                </CodeBlock>
                
                <CodeBlock 
                  title="Legg til shared note"
                  command='.claude-coordination/ultra-coordinator.js note "Remember to test mobile view"'
                >
                  .claude-coordination/ultra-coordinator.js note "Notat her"
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-12">
          <h3 className={`text-responsive-h3 font-semibold mb-6 ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`}>
            System Arkitektur
          </h3>
          
          <div className={`p-8 rounded-lg border ${
            isDarkTheme 
              ? 'bg-charcoal/20 border-warm_white/10' 
              : 'bg-stone_light/20 border-sage/20'
          }`}>
            <div className="text-center space-y-6">
              {/* Sessions */}
              <div className="flex justify-center gap-4 flex-wrap">
                {['Claude Session 1', 'Claude Session 2', 'Claude Session N'].map((session, i) => (
                  <div key={i} className={`px-4 py-2 rounded-lg border ${
                    isDarkTheme 
                      ? 'bg-sage/20 border-sage/40 text-warm_white' 
                      : 'bg-sage/10 border-sage/30 text-charcoal'
                  }`}>
                    <HiUsers className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs font-medium">{session}</div>
                  </div>
                ))}
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center">
                <div className={`w-px h-8 ${isDarkTheme ? 'bg-warm_white/30' : 'bg-charcoal/30'}`}></div>
              </div>

              {/* Coordination System */}
              <div className={`inline-block px-6 py-4 rounded-lg border-2 ${
                isDarkTheme 
                  ? 'bg-terracotta/20 border-terracotta/50 text-warm_white' 
                  : 'bg-terracotta/10 border-terracotta/40 text-charcoal'
              }`}>
                <HiWifi className="w-6 h-6 mx-auto mb-2 text-terracotta" />
                <div className="font-semibold">Ultra Coordination System</div>
                <div className="text-sm opacity-75">state.json + real-time sync</div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center">
                <div className={`w-px h-8 ${isDarkTheme ? 'bg-warm_white/30' : 'bg-charcoal/30'}`}></div>
              </div>

              {/* Managed Resources */}
              <div className="flex justify-center gap-4 flex-wrap">
                {[
                  { name: 'Backend Server', port: ':3001', icon: HiServerStack },
                  { name: 'Frontend Server', port: ':5173', icon: HiServerStack },
                  { name: 'Shared Workspace', port: '', icon: HiEye }
                ].map((resource, i) => (
                  <div key={i} className={`px-4 py-2 rounded-lg border ${
                    isDarkTheme 
                      ? 'bg-charcoal/40 border-warm_white/20 text-warm_white' 
                      : 'bg-stone_light/40 border-charcoal/20 text-charcoal'
                  }`}>
                    <resource.icon className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs font-medium">{resource.name}</div>
                    {resource.port && <div className="text-xs opacity-60">{resource.port}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className={`p-6 rounded-lg border ${
          isDarkTheme 
            ? 'bg-sage/10 border-sage/20' 
            : 'bg-sage/5 border-sage/20'
        }`}>
          <h3 className={`text-responsive-h3 font-semibold mb-4 flex items-center gap-2 ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`}>
            <HiCheckCircle className="w-5 h-5 text-sage" />
            Fordeler med Koordineringssystemet
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-medium mb-3 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                🚫 Forhindrer Problemer
              </h4>
              <ul className={`space-y-2 text-sm ${
                isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
              }`}>
                <li>• Duplikate server prosesser (fra 63+ til 2)</li>
                <li>• Port konflikter og resource leaks</li>
                <li>• File editing konflikter</li>
                <li>• Arbeid i parallell uten koordinering</li>
                <li>• System ustabilitet</li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-medium mb-3 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                ✅ Muliggjør Effektivitet
              </h4>
              <ul className={`space-y-2 text-sm ${
                isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70'
              }`}>
                <li>• Real-time samarbeid mellom Claude sessions</li>
                <li>• Smart oppgavedelegering</li>
                <li>• Shared workspace og notater</li>
                <li>• Automatisk resource management</li>
                <li>• Zero-conflict development</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integration Note */}
        <div className={`mt-8 p-4 rounded-lg border-l-4 border-blue-500 ${
          isDarkTheme 
            ? 'bg-blue-500/10 border-blue-500/20' 
            : 'bg-blue-50 border-blue-500'
        }`}>
          <div className="flex items-start gap-3">
            <HiExclamationTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className={`font-medium mb-1 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                Integrasjon med Cleanup System
              </h4>
              <p className={`text-sm ${
                isDarkTheme ? 'text-warm_white/80' : 'text-charcoal/70'
              }`}>
                Koordineringssystemet fungerer sammen med det eksisterende cleanup systemet. 
                Hvis koordinering ikke er tilgjengelig, vil cleanup scripts fortsatt fungere som backup.
                <br />
                <code className="text-xs bg-black/20 px-1 rounded mt-1 inline-block">
                  npm run start:clean
                </code> bruker begge systemer for maksimal stabilitet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoordinationSystem;