import React from 'react';
import { HiShieldCheck, HiArrowPath, HiExclamationTriangle, HiDocumentDuplicate, HiCommandLine } from 'react-icons/hi2';
import type { Language } from '../translations';

interface BackupSystemProps {
  isDarkTheme: boolean;
  selectedLanguage: Language;
}

const BackupSystem: React.FC<BackupSystemProps> = ({ isDarkTheme }) => {
  const cardClass = `${
    isDarkTheme 
      ? 'bg-charcoal/40 border-warm_white/10' 
      : 'bg-warm_white border-stone_light/30'
  } organic-border border minimal-shadow p-6`;

  const textClass = isDarkTheme ? 'text-warm_white' : 'text-charcoal';
  const subtextClass = isDarkTheme ? 'text-warm_white/70' : 'text-charcoal/70';

  return (
    <section id="backup-system" className="section-spacing">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="page-header text-center mb-16">
          <h2 className={`text-responsive-h1 font-light mb-6 ${textClass}`} 
              style={{fontFamily: 'ui-serif, Georgia, Cambria, serif'}}>
            🔒 Database Backup System
          </h2>
          <p className={`text-responsive-body max-w-3xl mx-auto ${subtextClass}`}>
            Robust backup og restore system som beskytter databasen mot datatap med automatisk backup før sletting og enkle restore-muligheter.
          </p>
        </div>

        {/* Status Overview */}
        <div className={cardClass + " mb-12"}>
          <div className="flex items-center gap-4 mb-6">
            <HiShieldCheck className="w-8 h-8 text-sage" />
            <div>
              <h3 className={`text-responsive-h3 font-medium ${textClass}`}>System Status</h3>
              <p className={`text-sm ${subtextClass}`}>Siste test bestått - Alle komponenter fungerer</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className={`text-center p-4 rounded-lg ${isDarkTheme ? 'bg-sage/10' : 'bg-sage/5'}`}>
              <div className="text-2xl font-bold text-sage mb-1">41</div>
              <div className={`text-sm ${subtextClass}`}>Produkter</div>
            </div>
            <div className={`text-center p-4 rounded-lg ${isDarkTheme ? 'bg-terracotta/10' : 'bg-terracotta/5'}`}>
              <div className="text-2xl font-bold text-terracotta mb-1">169</div>
              <div className={`text-sm ${subtextClass}`}>Bilder</div>
            </div>
            <div className={`text-center p-4 rounded-lg ${isDarkTheme ? 'bg-sage/10' : 'bg-sage/5'}`}>
              <div className="text-2xl font-bold text-sage mb-1">5</div>
              <div className={`text-sm ${subtextClass}`}>Kategorier</div>
            </div>
            <div className={`text-center p-4 rounded-lg ${isDarkTheme ? 'bg-terracotta/10' : 'bg-terracotta/5'}`}>
              <div className="text-2xl font-bold text-terracotta mb-1">15</div>
              <div className={`text-sm ${subtextClass}`}>Max Backups</div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className={cardClass}>
            <HiArrowPath className="w-8 h-8 text-sage mb-4" />
            <h3 className={`text-lg font-medium mb-2 ${textClass}`}>Automatisk Backup</h3>
            <p className={`text-sm ${subtextClass}`}>Lager automatisk backup før alle slette-operasjoner</p>
          </div>
          
          <div className={cardClass}>
            <HiDocumentDuplicate className="w-8 h-8 text-terracotta mb-4" />
            <h3 className={`text-lg font-medium mb-2 ${textClass}`}>Enkel Restore</h3>
            <p className={`text-sm ${subtextClass}`}>Gjenopprett fra siste backup med ett kommando</p>
          </div>
          
          <div className={cardClass}>
            <HiExclamationTriangle className="w-8 h-8 text-sage mb-4" />
            <h3 className={`text-lg font-medium mb-2 ${textClass}`}>Emergency Restore</h3>
            <p className={`text-sm ${subtextClass}`}>Rask gjenoppretting ved kritiske problemer</p>
          </div>
          
          <div className={cardClass}>
            <HiShieldCheck className="w-8 h-8 text-terracotta mb-4" />
            <h3 className={`text-lg font-medium mb-2 ${textClass}`}>Sikker Sletting</h3>
            <p className={`text-sm ${subtextClass}`}>Sletting med automatisk backup-beskyttelse</p>
          </div>
        </div>

        {/* Available Scripts */}
        <div className={cardClass + " mb-12"}>
          <h3 className={`text-responsive-h3 font-medium mb-6 ${textClass}`}>
            <HiCommandLine className="w-6 h-6 inline mr-2" />
            Tilgjengelige Scripts
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-medium mb-4 text-sage`}>Backup Operasjoner</h4>
              <div className="space-y-3">
                <div className={`p-3 rounded ${isDarkTheme ? 'bg-charcoal/60' : 'bg-stone_light/30'}`}>
                  <code className="text-sm text-sage">scripts/backup-now.ts</code>
                  <p className={`text-xs mt-1 ${subtextClass}`}>Lag manuell backup nå</p>
                </div>
                <div className={`p-3 rounded ${isDarkTheme ? 'bg-charcoal/60' : 'bg-stone_light/30'}`}>
                  <code className="text-sm text-sage">scripts/test-backup-system.ts</code>
                  <p className={`text-xs mt-1 ${subtextClass}`}>Test at backup-systemet fungerer</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className={`font-medium mb-4 text-terracotta`}>Restore & Sikkerhet</h4>
              <div className="space-y-3">
                <div className={`p-3 rounded ${isDarkTheme ? 'bg-charcoal/60' : 'bg-stone_light/30'}`}>
                  <code className="text-sm text-terracotta">scripts/restore-latest.ts</code>
                  <p className={`text-xs mt-1 ${subtextClass}`}>Gjenopprett fra siste backup</p>
                </div>
                <div className={`p-3 rounded ${isDarkTheme ? 'bg-charcoal/60' : 'bg-stone_light/30'}`}>
                  <code className="text-sm text-terracotta">scripts/emergency-restore.ts</code>
                  <p className={`text-xs mt-1 ${subtextClass}`}>Emergency restore ved kritiske problemer</p>
                </div>
                <div className={`p-3 rounded ${isDarkTheme ? 'bg-charcoal/60' : 'bg-stone_light/30'}`}>
                  <code className="text-sm text-terracotta">scripts/safe-delete-products.ts</code>
                  <p className={`text-xs mt-1 ${subtextClass}`}>Sikker sletting med automatisk backup</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Procedures */}
        <div className={cardClass + " mb-12"}>
          <h3 className={`text-responsive-h3 font-medium mb-6 ${textClass}`}>
            🚨 Emergency Procedures
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-3 text-red-500">Ved Datatap</h4>
              <ol className={`space-y-2 text-sm ${subtextClass}`}>
                <li>1. <strong className={textClass}>IKKE PANIKK</strong> - backups er tilgjengelige</li>
                <li>2. Kjør emergency restore kommando</li>
                <li>3. Verifiser at dataene er tilbake</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-orange-500">Før Farlige Operasjoner</h4>
              <ol className={`space-y-2 text-sm ${subtextClass}`}>
                <li>1. Lag alltid backup først</li>
                <li>2. Bruk sikre scripts i stedet for direkte SQL</li>
                <li>3. Test på en liten mengde data først</li>
              </ol>
            </div>
          </div>
        </div>

        {/* API Usage Example */}
        <div className={cardClass}>
          <h3 className={`text-responsive-h3 font-medium mb-6 ${textClass}`}>
            API Usage
          </h3>
          
          <div className={`p-4 rounded-lg ${isDarkTheme ? 'bg-charcoal/60' : 'bg-stone_light/30'} overflow-x-auto`}>
            <pre className={`text-sm ${textClass}`}>
{`import { backupService } from '../src/utils/backupService';

// Lag backup
const backupPath = await backupService.createBackup('before_migration');

// Sikker sletting med automatisk backup
const deletedCount = await backupService.safeDeleteProducts({
  name: { in: ['Test Product'] }
}, 'cleanup');

// Emergency restore
await backupService.emergencyRestore();`}
            </pre>
          </div>
        </div>

        {/* Best Practices */}
        <div className={`mt-12 p-6 rounded-lg ${isDarkTheme ? 'bg-sage/10 border-sage/20' : 'bg-sage/5 border-sage/30'} border`}>
          <h3 className={`text-lg font-medium mb-4 ${textClass}`}>💡 Best Practices</h3>
          <ul className={`space-y-2 text-sm ${subtextClass}`}>
            <li>• <strong>Daglig backup</strong> i produksjon</li>
            <li>• <strong>Test restore</strong> månedlig</li>
            <li>• <strong>Verifiser backup-innhold</strong> før kritiske operasjoner</li>
            <li>• <strong>Bruk descriptive reasons</strong> for backups (f.eks. "before_product_migration")</li>
            <li>• <strong>Monitor backup-størrelse</strong> for å oppdage problemer tidlig</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BackupSystem;