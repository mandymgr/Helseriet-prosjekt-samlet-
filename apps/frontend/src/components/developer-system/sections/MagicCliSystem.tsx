import React from 'react';
import { 
  HiCommandLine,
  HiCircleStack,
  HiRocketLaunch,
  HiMagnifyingGlass,
  HiChartBarSquare,
  HiCpuChip,
  HiShieldCheck,
  HiDocumentText
} from 'react-icons/hi2';

interface MagicCliSystemProps {
  isDarkTheme: boolean;
  selectedLanguage: string;
}

const MagicCliSystem: React.FC<MagicCliSystemProps> = ({ isDarkTheme }) => {
  const commands = [
    {
      command: 'magic detect',
      description: 'Analyze project and show intelligent recommendations',
      icon: HiMagnifyingGlass,
      color: 'text-blue-400'
    },
    {
      command: 'magic backup create [name]',
      description: 'Create intelligent project backup with compression',
      icon: HiCircleStack,
      color: 'text-green-400'
    },
    {
      command: 'magic backup restore [name]',
      description: 'Restore from any backup point',
      icon: HiRocketLaunch,
      color: 'text-purple-400'
    },
    {
      command: 'magic status',
      description: 'Real-time project health and development metrics',
      icon: HiChartBarSquare,
      color: 'text-orange-400'
    },
    {
      command: 'magic cache stats',
      description: 'View AI response cache performance',
      icon: HiCpuChip,
      color: 'text-cyan-400'
    },
    {
      command: 'magic ai "question"',
      description: 'Get context-aware AI assistance for coding',
      icon: HiShieldCheck,
      color: 'text-pink-400'
    }
  ];

  const features = [
    {
      title: 'Intelligent Backup System',
      description: 'Automated project state preservation with compression and metadata',
      icon: HiCircleStack,
      stats: ['Compression: ~70% size reduction', 'Incremental backups', 'Auto-cleanup old backups']
    },
    {
      title: 'Smart Cache Management',
      description: 'AI response optimization with performance analytics',
      icon: HiCpuChip,
      stats: ['Cache hit rate: 85%+', 'Response time: <50ms', 'Memory efficient']
    },
    {
      title: 'Real-time Status Monitoring',
      description: 'Live project health and development metrics',
      icon: HiChartBarSquare,
      stats: ['WebSocket updates', 'Health checks', 'Performance tracking']
    },
    {
      title: 'Universal Project Detection',
      description: 'Automatically identifies and optimizes any project type',
      icon: HiMagnifyingGlass,
      stats: ['50+ project types', 'Zero configuration', 'Smart defaults']
    }
  ];

  return (
    <section 
      id="magic-cli-system"
      className={`min-h-screen px-6 py-16 ${
        isDarkTheme 
          ? 'bg-gradient-to-br from-charcoal to-charcoal/90' 
          : 'bg-gradient-to-br from-warm_white to-stone_light/30'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
              <HiCommandLine className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-4xl font-bold ${
              isDarkTheme ? 'text-warm_white' : 'text-charcoal'
            }`}>
              🪄 Magic CLI System
            </h2>
          </div>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
            isDarkTheme ? 'text-warm_white/80' : 'text-charcoal/70'
          }`}>
            Unified command-line interface for all development operations with intelligent AI-powered assistance
          </p>
        </div>

        {/* Commands Grid */}
        <div className="mb-20">
          <h3 className={`text-2xl font-bold mb-8 text-center ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`}>
            Available Commands
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commands.map((cmd, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  isDarkTheme 
                    ? 'bg-charcoal/50 border-warm_white/10 hover:border-warm_white/20' 
                    : 'bg-white border-stone_light/30 hover:border-stone_light/50 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10">
                    <cmd.icon className={`w-5 h-5 ${cmd.color}`} />
                  </div>
                  <div className="flex-1">
                    <code className={`text-sm font-mono px-3 py-1 rounded ${
                      isDarkTheme ? 'bg-warm_white/10 text-green-400' : 'bg-stone_light/20 text-green-600'
                    }`}>
                      {cmd.command}
                    </code>
                    <p className={`mt-2 text-sm ${
                      isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/60'
                    }`}>
                      {cmd.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className={`text-2xl font-bold mb-8 text-center ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`}>
            Core Features
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  isDarkTheme 
                    ? 'bg-charcoal/30 border-warm_white/10 hover:border-warm_white/20' 
                    : 'bg-white border-stone_light/30 hover:border-stone_light/50 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className={`text-xl font-bold ${
                    isDarkTheme ? 'text-warm_white' : 'text-charcoal'
                  }`}>
                    {feature.title}
                  </h4>
                </div>
                <p className={`mb-4 ${
                  isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/60'
                }`}>
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {feature.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      <span className={`text-sm ${
                        isDarkTheme ? 'text-warm_white/60' : 'text-charcoal/50'
                      }`}>
                        {stat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Installation Guide */}
        <div className={`p-8 rounded-2xl border ${
          isDarkTheme 
            ? 'bg-charcoal/30 border-warm_white/10' 
            : 'bg-white border-stone_light/30 shadow-lg'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
            isDarkTheme ? 'text-warm_white' : 'text-charcoal'
          }`}>
            <HiDocumentText className="w-6 h-6" />
            Quick Setup Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                1. Install Magic CLI globally
              </h4>
              <code className={`block p-4 rounded-lg font-mono text-sm ${
                isDarkTheme ? 'bg-warm_white/10 text-green-400' : 'bg-stone_light/20 text-green-600'
              }`}>
                npm install -g claude-code-coordination
              </code>
            </div>
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${
                isDarkTheme ? 'text-warm_white' : 'text-charcoal'
              }`}>
                2. Initialize in any project
              </h4>
              <code className={`block p-4 rounded-lg font-mono text-sm ${
                isDarkTheme ? 'bg-warm_white/10 text-green-400' : 'bg-stone_light/20 text-green-600'
              }`}>
                magic init
              </code>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20">
            <p className={`text-sm ${
              isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/60'
            }`}>
              💡 <strong>Pro tip:</strong> Magic CLI works with ANY project type and requires zero configuration. 
              It automatically detects your project structure and optimizes accordingly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagicCliSystem;