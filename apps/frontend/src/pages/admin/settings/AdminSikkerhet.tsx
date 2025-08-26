import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  HiOutlineShieldCheck,
  HiOutlineDocumentArrowDown,
  HiOutlineTrash,
  HiOutlineExclamationTriangle,
  HiOutlineCloudArrowUp
} from 'react-icons/hi2';
import { ConfirmationDialog } from '../../../components/ui/ConfirmationDialog';

interface DatabaseStats {
  products: number;
  categories: number;
  images: number;
  users: number;
  homepageConfigs: number;
  lastUpdated: string;
}

interface Backup {
  filename: string;
  created: string;
  reason: string;
}

const AdminSikkerhet: React.FC = () => {
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => Promise<void>;
    requireTyping?: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: async () => {}
  });

  useEffect(() => {
    fetchStats();
    fetchBackups();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin-protection/database/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchBackups = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin-protection/backup/list');
      const data = await response.json();
      if (data.success) {
        setBackups(data.backups);
      }
    } catch (error) {
      console.error('Error fetching backups:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBackup = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/admin-protection/backup/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'manual' })
      });
      
      const data = await response.json();
      if (data.success) {
        alert('✅ Backup opprettet!');
        fetchBackups();
      } else {
        alert('❌ Feil ved oppretting av backup');
      }
    } catch (error) {
      alert('❌ Feil ved oppretting av backup');
      console.error('Error creating backup:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearDatabase = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/admin-protection/database/clear-all', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          confirmDelete: 'I_UNDERSTAND_THIS_WILL_DELETE_DATA',
          confirmationCode: 'HELSERIET_ADMIN_OVERRIDE'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        alert('✅ Database tømt! (Brukere bevart)');
        fetchStats();
      } else {
        alert(`❌ Feil: ${data.error}`);
      }
    } catch (error) {
      alert('❌ Feil ved tømming av database');
      console.error('Error clearing database:', error);
    } finally {
      setLoading(false);
    }
  };

  const openConfirmDialog = (title: string, message: string, onConfirm: () => Promise<void>, requireTyping?: string) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm,
      requireTyping
    });
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage mx-auto mb-4"></div>
          <p>Laster sikkerhetspanel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <HiOutlineShieldCheck className="w-8 h-8 text-sage mr-3" />
                Database Sikkerhet
              </h1>
              <p className="text-gray-600 mt-2">
                Administrer database-sikkerhet, backups og farlige operasjoner
              </p>
            </div>
            <Link 
              to="/admin"
              className="bg-sage text-white px-4 py-2 rounded-lg hover:bg-sage-dark transition-colors"
            >
              Tilbake til Admin
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Database Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <HiOutlineCloudArrowUp className="w-6 h-6 text-blue-600 mr-2" />
              Database Status
            </h2>
            
            {stats && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sage-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-sage">{stats.products}</div>
                    <div className="text-sm text-sage-dark">Produkter</div>
                  </div>
                  <div className="bg-terracotta-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-terracotta">{stats.images}</div>
                    <div className="text-sm text-terracotta-dark">Bilder</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.categories}</div>
                    <div className="text-sm text-blue-700">Kategorier</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{stats.users}</div>
                    <div className="text-sm text-purple-700">Brukere</div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  Sist oppdatert: {new Date(stats.lastUpdated).toLocaleString('no-NO')}
                </div>
              </div>
            )}
          </div>

          {/* Backup Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <HiOutlineDocumentArrowDown className="w-6 h-6 text-green-600 mr-2" />
              Backup Administrasjon
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={createBackup}
                disabled={loading}
                className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                <HiOutlineDocumentArrowDown className="w-5 h-5 mr-2" />
                {loading ? 'Oppretter...' : 'Opprett Backup Nå'}
              </button>
              
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  Tilgjengelige Backups ({backups.length})
                </h3>
                
                {backups.length === 0 ? (
                  <p className="text-gray-500 text-sm">Ingen backups funnet</p>
                ) : (
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {backups.slice(0, 5).map((backup) => (
                      <div key={backup.filename} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                        <div>
                          <div className="font-medium">{backup.reason}</div>
                          <div className="text-gray-500 text-xs">
                            {new Date(backup.created).toLocaleString('no-NO')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dangerous Operations */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
            <HiOutlineExclamationTriangle className="w-6 h-6 text-red-600 mr-2" />
            Farlige Operasjoner
          </h2>
          
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <div className="flex items-start">
              <HiOutlineTrash className="w-6 h-6 text-red-500 mr-3 mt-1" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900 mb-2">Tøm Database</h3>
                <p className="text-red-700 text-sm mb-4">
                  Dette vil permanent slette alle produkter, kategorier, bilder og homepage-konfigurasjoner. 
                  Brukere vil bli bevart av sikkerhetshensyn. En backup opprettes automatisk.
                </p>
                <button
                  onClick={() => openConfirmDialog(
                    'Tøm Database',
                    'Dette vil permanent slette alt innhold bortsett fra brukere. En backup opprettes automatisk, men denne operasjonen kan ikke angres!',
                    clearDatabase,
                    'TØM DATABASE'
                  )}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Tøm Database
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Sikkerhetsinformasjon
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Automatisk Beskyttelse</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>✅ Alle farlige operasjoner krever dobbel bekreftelse</li>
                <li>✅ Automatisk backup før sletting</li>
                <li>✅ Script-operasjoner krever spesiell autorisasjon</li>
                <li>✅ Alle operasjoner logges med tidsstempel</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Backup System</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>📦 Backups lagres lokalt på serveren</li>
                <li>🗂️ Kun de 10 nyeste backupene beholdes</li>
                <li>📅 Inneholder komplett database-snapshot</li>
                <li>🔐 Passord er ekskludert fra backups</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type="danger"
        confirmText="Utfør Operasjon"
        requireTyping={confirmDialog.requireTyping}
      />
    </div>
  );
};

export default AdminSikkerhet;