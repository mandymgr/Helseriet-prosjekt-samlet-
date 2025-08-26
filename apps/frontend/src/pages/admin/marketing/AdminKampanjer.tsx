import { Link } from 'react-router';

export default function AdminKampanjer() {
  return (
    <div>
      <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
      <h1 className="text-2xl font-bold">Helsekost Admin</h1>
      <span className="text-gray-400">|</span>
      <span className="text-gray-300">Kampanjer</span>
      </div>
      <div className="flex items-center space-x-6">
      <Link to="/hjemmeside-svart-hvitt" className="text-gray-300 hover:text-white">
      🌐 Til nettbutikk
      </Link>
      <button onClick={() => { alert('Admin profil - kommer snart!') }} className="text-gray-300 hover:text-white">
      👤 Admin Bruker
      </button>
      <button onClick={() => { if(confirm('Er du sikker på at du vil logge ut?')) window.location.href='helsekost-hjemmeside-svart-hvitt.html' }} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
      Logg ut
      </button>
      </div>
      </div>
      </div>
      </header>
      <div className="flex">
      <aside className="w-64 bg-white shadow-md min-h-screen">
      <nav className="p-4">
      <ul className="space-y-2">
      <li>
      <Link to="/admin-dashboard" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      🏠 Dashboard
      </Link>
      </li>
      <li>
      <Link to="/admin-produkter" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      📦 Produkter
      </Link>
      </li>
      <li>
      <Link to="/admin-ordrer" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      🛒 Ordrer
      </Link>
      </li>
      <li>
      <Link to="/admin-kunder" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      👥 Kunder
      </Link>
      </li>
      <li>
      <Link to="/admin-blogg" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      📝 Blogg
      </Link>
      </li>
      <li>
      <Link to="/admin-kampanjer" className="sidebar-link bg-gray-700 text-white block p-3 rounded">
      🎯 Kampanjer
      </Link>
      </li>
      <li>
      <Link to="/admin-annonser" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      📢 Annonser
      </Link>
      </li>
      <li>
      <Link to="/admin-analyser" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      📊 Analyser
      </Link>
      </li>
      <li>
      <Link to="/admin-ekspertrad" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      💬 Ekspertråd
      </Link>
      </li>
      <li>
      <Link to="/admin-rapport" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      📈 Rapporter
      </Link>
      </li>
      <li>
      <Link to="/admin-innstillinger" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      ⚙️ Innstillinger
      </Link>
      </li>
      </ul>
      </nav>
      </aside>
      <main className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
      <div>
      <h2 className="text-3xl font-bold text-gray-800">Kampanjeadministrasjon</h2>
      <p className="text-gray-600 mt-2">Opprett og administrer rabatter, tilbud og kampanjer</p>
      </div>
      <button onClick={() => { alert('Oppretter ny kampanje...') }} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
      ➕ Ny kampanje
      </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <button onClick={() => { alert('Oppretter prosentkampanje...') }} className="bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <div className="text-3xl mb-2">📊</div>
      <p className="font-medium">Prosentrabatt</p>
      <p className="text-sm text-gray-600">10%, 20%, 50% avslag</p>
      </button>
      <button onClick={() => { alert('Oppretter fast beløp kampanje...') }} className="bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <div className="text-3xl mb-2">💵</div>
      <p className="font-medium">Fast beløp</p>
      <p className="text-sm text-gray-600">Kr 50, Kr 100 avslag</p>
      </button>
      <button onClick={() => { alert('Oppretter kjøp X få Y kampanje...') }} className="bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <div className="text-3xl mb-2">🎁</div>
      <p className="font-medium">Kjøp X få Y</p>
      <p className="text-sm text-gray-600">3 for 2, 2+1 gratis</p>
      </button>
      <button onClick={() => { alert('Oppretter fri frakt kampanje...') }} className="bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <div className="text-3xl mb-2">🚚</div>
      <p className="font-medium">Fri frakt</p>
      <p className="text-sm text-gray-600">Ved kjøp over X kr</p>
      </button>
      </div>
      <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-6 border-b">
      <h3 className="text-lg font-semibold">Aktive kampanjer</h3>
      </div>
      <div className="p-6 space-y-4">
      <div className="campaign-card border rounded-lg p-4 hover:shadow-md">
      <div className="flex items-center justify-between">
      <div className="flex-1">
      <div className="flex items-center space-x-3 mb-2">
      <h4 className="font-medium text-lg">Vinterens Vitaminer - 25% rabatt</h4>
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">AKTIV</span>
      </div>
      <p className="text-gray-600 text-sm mb-3">25% rabatt på alle vitaminer og mineraler</p>
      <div className="flex items-center space-x-6 text-sm text-gray-500">
      <span>📅 1. jan - 31. jan 2025</span>
      <span>🏷️ Kode: VINTER25</span>
      <span>📊 Brukt 156 ganger</span>
      <span>💰 Spart: Kr 23,450</span>
      </div>
      </div>
      <div className="flex items-center space-x-4">
      <label className="toggle-switch">
      <input type="checkbox" checked={true} />
      <span className="slider"></span>
      </label>
      <button onClick={() => { alert('Redigerer kampanje...') }} className="text-blue-600 hover:text-blue-900">✏️</button>
      <button onClick={() => { alert('Viser kampanjestatistikk...') }} className="text-gray-600 hover:text-gray-900">📊</button>
      </div>
      </div>
      </div>
      <div className="campaign-card border rounded-lg p-4 hover:shadow-md">
      <div className="flex items-center justify-between">
      <div className="flex-1">
      <div className="flex items-center space-x-3 mb-2">
      <h4 className="font-medium text-lg">Omega-3 pakketilbud</h4>
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">AKTIV</span>
      </div>
      <p className="text-gray-600 text-sm mb-3">Kjøp 3 betal for 2 på alle Omega-3 produkter</p>
      <div className="flex items-center space-x-6 text-sm text-gray-500">
      <span>📅 15. des 2024 - 15. feb 2025</span>
      <span>🏷️ Automatisk</span>
      <span>📊 Brukt 89 ganger</span>
      <span>💰 Spart: Kr 15,670</span>
      </div>
      </div>
      <div className="flex items-center space-x-4">
      <label className="toggle-switch">
      <input type="checkbox" checked={true} />
      <span className="slider"></span>
      </label>
      <button onClick={() => { alert('Redigerer kampanje...') }} className="text-blue-600 hover:text-blue-900">✏️</button>
      <button onClick={() => { alert('Viser kampanjestatistikk...') }} className="text-gray-600 hover:text-gray-900">📊</button>
      </div>
      </div>
      </div>
      <div className="campaign-card border rounded-lg p-4 hover:shadow-md opacity-60">
      <div className="flex items-center justify-between">
      <div className="flex-1">
      <div className="flex items-center space-x-3 mb-2">
      <h4 className="font-medium text-lg">Fri frakt over Kr 500</h4>
      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">PAUSERT</span>
      </div>
      <p className="text-gray-600 text-sm mb-3">Gratis levering på alle ordrer over Kr 500</p>
      <div className="flex items-center space-x-6 text-sm text-gray-500">
      <span>📅 Løpende</span>
      <span>🏷️ Automatisk</span>
      <span>📊 Brukt 1,234 ganger</span>
      <span>💰 Spart: Kr 45,890</span>
      </div>
      </div>
      <div className="flex items-center space-x-4">
      <label className="toggle-switch">
      <input type="checkbox" />
      <span className="slider"></span>
      </label>
      <button onClick={() => { alert('Redigerer kampanje...') }} className="text-blue-600 hover:text-blue-900">✏️</button>
      <button onClick={() => { alert('Viser kampanjestatistikk...') }} className="text-gray-600 hover:text-gray-900">📊</button>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-6 border-b">
      <h3 className="text-lg font-semibold">Planlagte kampanjer</h3>
      </div>
      <div className="p-6">
      <div className="campaign-card border border-blue-200 bg-blue-50 rounded-lg p-4">
      <div className="flex items-center justify-between">
      <div>
      <div className="flex items-center space-x-3 mb-2">
      <h4 className="font-medium text-lg">Valentines-kampanje</h4>
      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">PLANLAGT</span>
      </div>
      <p className="text-gray-600 text-sm mb-3">14% rabatt på utvalgte produkter</p>
      <div className="flex items-center space-x-6 text-sm text-gray-500">
      <span>📅 Starter 10. feb 2025</span>
      <span>🏷️ Kode: LOVE14</span>
      <span>⏰ Starter om 3 dager</span>
      </div>
      </div>
      <div className="flex items-center space-x-4">
      <button onClick={() => { alert('Redigerer planlagt kampanje...') }} className="text-blue-600 hover:text-blue-900">✏️</button>
      <button onClick={() => { alert('Sletter kampanje...') }} className="text-red-600 hover:text-red-900">🗑️</button>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Kampanjestatistikk</h3>
      <div className="space-y-3">
      <div className="flex justify-between">
      <span className="text-gray-600">Aktive kampanjer:</span>
      <span className="font-medium">3</span>
      </div>
      <div className="flex justify-between">
      <span className="text-gray-600">Total rabatt gitt:</span>
      <span className="font-medium">Kr 85,010</span>
      </div>
      <div className="flex justify-between">
      <span className="text-gray-600">Antall bruk totalt:</span>
      <span className="font-medium">1,479</span>
      </div>
      <div className="flex justify-between">
      <span className="text-gray-600">Konverteringsrate:</span>
      <span className="font-medium text-green-600">23.5%</span>
      </div>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Rabattkoder</h3>
      <div className="space-y-2">
      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
      <code className="text-sm font-mono">VINTER25</code>
      <button onClick={() => { navigator.clipboard.writeText('VINTER25'); alert('Kopiert!') }} className="text-blue-600 hover:text-blue-900 text-sm">
      📋 Kopier
      </button>
      </div>
      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
      <code className="text-sm font-mono">NYHETSBREV10</code>
      <button onClick={() => { navigator.clipboard.writeText('NYHETSBREV10'); alert('Kopiert!') }} className="text-blue-600 hover:text-blue-900 text-sm">
      📋 Kopier
      </button>
      </div>
      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
      <code className="text-sm font-mono">VELKOMMEN15</code>
      <button onClick={() => { navigator.clipboard.writeText('VELKOMMEN15'); alert('Kopiert!') }} className="text-blue-600 hover:text-blue-900 text-sm">
      📋 Kopier
      </button>
      </div>
      </div>
      <button onClick={() => { alert('Genererer ny rabattkode...') }} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-sm">
      Generer ny kode
      </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Populære kampanjer</h3>
      <div className="space-y-3">
      <div>
      <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-600">Vinterens Vitaminer</span>
      <span className="text-sm font-medium">156 bruk</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
      </div>
      </div>
      <div>
      <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-600">Omega-3 pakke</span>
      <span className="text-sm font-medium">89 bruk</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
      </div>
      </div>
      <div>
      <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-600">Nyhetsbrev-rabatt</span>
      <span className="text-sm font-medium">234 bruk</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-blue-600 h-2 rounded-full" style={{width: '100%'}}></div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </main>
      </div>
    </div>
  );
}