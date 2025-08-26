import { Link } from 'react-router';
import { 
  openPlatformModal, 
  connectPlatform, 
  editCampaign, 
  viewCampaignStats, 
  openNewCampaignModal, 
  pauseAllCampaigns, 
  adjustBudgets, 
  exportReport, 
  selectPlatform,
  previousStep,
  nextStep,
  closeNewCampaignModal,
  createCampaign,
  toggleCampaign
} from '../../../utils/adminFunctions';

export default function AdminAnnonser() {
  return (
    <div>
      <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
      <h1 className="text-2xl font-bold">Helsekost Admin</h1>
      <span className="text-gray-400">|</span>
      <span className="text-gray-300">Annonsehåndtering</span>
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
      <Link to="/admin-kampanjer" className="sidebar-link block p-3 rounded hover:bg-gray-100">
      🎯 Kampanjer
      </Link>
      </li>
      <li>
      <Link to="/admin-annonser" className="sidebar-link bg-gray-700 text-white block p-3 rounded">
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
      <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Annonsehåndtering</h2>
      <p className="text-gray-600">Administrer alle dine annonser på tvers av plattformer</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Aktive kampanjer</h3>
      <span className="text-2xl">🎯</span>
      </div>
      <p className="text-2xl font-bold">24</p>
      <p className="text-xs text-gray-500">På 4 plattformer</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Daglig budsjett</h3>
      <span className="text-2xl">💰</span>
      </div>
      <p className="text-2xl font-bold">Kr 8,500</p>
      <p className="text-xs text-green-600">Brukt: Kr 3,241 (38%)</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Visninger i dag</h3>
      <span className="text-2xl">👁️</span>
      </div>
      <p className="text-2xl font-bold">45.3K</p>
      <p className="text-xs text-gray-500">CPM: Kr 71.60</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Klikk i dag</h3>
      <span className="text-2xl">👆</span>
      </div>
      <p className="text-2xl font-bold">1,234</p>
      <p className="text-xs text-gray-500">CTR: 2.72%</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Konverteringer</h3>
      <span className="text-2xl">🛒</span>
      </div>
      <p className="text-2xl font-bold">87</p>
      <p className="text-xs text-gray-500">CPA: Kr 37.25</p>
      </div>
      </div>
      <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Plattformer</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="platform-card bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
      <span className="text-xl">G</span>
      </div>
      <div>
      <h4 className="font-semibold">Google Ads</h4>
      <p className="text-sm text-gray-600">8 aktive kampanjer</p>
      </div>
      </div>
      <label className="toggle-switch">
      <input type="checkbox" checked={true} />
      <span className="slider"></span>
      </label>
      </div>
      <div className="space-y-2 text-sm">
      <div className="flex justify-between">
      <span className="text-gray-600">Budsjett i dag:</span>
      <span className="font-medium">Kr 3,500</span>
      </div>
      <div className="flex justify-between">
      <span className="text-gray-600">Brukt:</span>
      <span className="font-medium text-green-600">Kr 1,234</span>
      </div>
      <div className="flex justify-between">
      <span className="text-gray-600">Konverteringer:</span>
      <span className="font-medium">42</span>
      </div>
      </div>
      <div className="mt-4 flex space-x-2">
      <button onClick={() => { openPlatformModal('google') }} className="flex-1 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
      Administrer
      </button>
      <button onClick={() => { connectPlatform('google') }} className="px-3 py-2 border rounded text-sm hover:bg-gray-50">
      ⚙️
      </button>
      </div>
      </div>
      <div className="platform-card bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
      <span className="text-xl text-white">f</span>
      </div>
      <div>
      <h4 className="font-semibold">Meta Ads</h4>
      <p className="text-sm text-gray-600">12 aktive kampanjer</p>
      </div>
      </div>
      <label className="toggle-switch">
      <input type="checkbox" checked={true} />
      <span className="slider"></span>
      </label>
      </div>
      <div className="space-y-2 text-sm">
      <div className="flex justify-between">
      <span className="text-gray-600">Budsjett i dag:</span>
      <span className="font-medium">Kr 2,800</span>
      </div>
      <div className="flex justify-between">
      <span className="text-gray-600">Brukt:</span>
      <span className="font-medium text-green-600">Kr 1,456</span>
      </div>
      <div className="flex justify-between">
      <span className="text-gray-600">Konverteringer:</span>
      <span className="font-medium">31</span>
      </div>
      </div>
      <div className="mt-4 flex space-x-2">
      <button onClick={() => { openPlatformModal('meta') }} className="flex-1 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
      Administrer
      </button>
      <button onClick={() => { connectPlatform('meta') }} className="px-3 py-2 border rounded text-sm hover:bg-gray-50">
      ⚙️
      </button>
      </div>
      </div>
      <div className="platform-card bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
      <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center mr-3">
      <span className="text-xl">👻</span>
      </div>
      <div>
      <h4 className="font-semibold">Snapchat Ads</h4>
      <p className="text-sm text-gray-600">3 aktive kampanjer</p>
      </div>
      </div>
      <label className="toggle-switch">
      <input type="checkbox" checked={true} />
      <span className="slider"></span>
      </label>
      </div>
      <div className="space-y-2 text-sm">
      <div className="flex justify-between">
      <span className="text-gray-600">Budsjett i dag:</span>
      <span className="font-medium">Kr 1,200</span>
      </div>
      <div className="flex justify-between">
      <span className="text-gray-600">Brukt:</span>
      <span className="font-medium text-green-600">Kr 456</span>
      </div>
      <div className="flex justify-between">
      <span className="text-gray-600">Konverteringer:</span>
      <span className="font-medium">8</span>
      </div>
      </div>
      <div className="mt-4 flex space-x-2">
      <button onClick={() => { openPlatformModal('snapchat') }} className="flex-1 bg-yellow-400 text-black py-2 rounded text-sm hover:bg-yellow-500">
      Administrer
      </button>
      <button onClick={() => { connectPlatform('snapchat') }} className="px-3 py-2 border rounded text-sm hover:bg-gray-50">
      ⚙️
      </button>
      </div>
      </div>
      <div className="platform-card bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mr-3">
      <span className="text-lg text-white">♪</span>
      </div>
      <div>
      <h4 className="font-semibold">TikTok Ads</h4>
      <p className="text-sm text-gray-600">Ikke tilkoblet</p>
      </div>
      </div>
      <label className="toggle-switch">
      <input type="checkbox" disabled={true} />
      <span className="slider"></span>
      </label>
      </div>
      <div className="space-y-2 text-sm">
      <p className="text-gray-500 text-center py-4">
      Koble til TikTok Ads for å starte annonsering
      </p>
      </div>
      <div className="mt-4">
      <button onClick={() => { connectPlatform('tiktok') }} className="w-full bg-gray-900 text-white py-2 rounded text-sm hover:bg-gray-800">
      Koble til TikTok
      </button>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
      <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold">Aktive kampanjer</h3>
      <button onClick={() => { openNewCampaignModal() }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      + Ny kampanje
      </button>
      </div>
      </div>
      <div className="overflow-x-auto">
      <table className="min-w-full">
      <thead className="bg-gray-50">
      <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Kampanje
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Plattform
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Status
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Budsjett
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Resultater
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Handlinger
      </th>
      </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
      <tr className="campaign-row">
      <td className="px-6 py-4">
      <div>
      <p className="text-sm font-medium text-gray-900">Sommer Omega-3 Kampanje</p>
      <p className="text-sm text-gray-500">Målgruppe: 25-45 år, helsebeviste</p>
      </div>
      </td>
      <td className="px-6 py-4">
      <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
      Google Ads
      </span>
      </td>
      <td className="px-6 py-4">
      <label className="toggle-switch">
      <input type="checkbox" checked={true} onChange={toggleCampaign} />
      <span className="slider"></span>
      </label>
      </td>
      <td className="px-6 py-4">
      <div className="text-sm">
      <p className="font-medium">Kr 500/dag</p>
      <p className="text-gray-500">Brukt: Kr 234</p>
      </div>
      </td>
      <td className="px-6 py-4">
      <div className="text-sm">
      <p>👁️ 12.3K | 👆 234 | 🛒 12</p>
      <p className="text-gray-500">CPA: Kr 19.50</p>
      </div>
      </td>
      <td className="px-6 py-4 text-sm">
      <button onClick={() => { editCampaign('1') }} className="text-blue-600 hover:text-blue-900 mr-3">
      Rediger
      </button>
      <button onClick={() => { viewCampaignStats('1') }} className="text-gray-600 hover:text-gray-900">
      Statistikk
      </button>
      </td>
      </tr>
      <tr className="campaign-row">
      <td className="px-6 py-4">
      <div>
      <p className="text-sm font-medium text-gray-900">Retargeting - Forlatt kurv</p>
      <p className="text-sm text-gray-500">Dynamisk produktannonsering</p>
      </div>
      </td>
      <td className="px-6 py-4">
      <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-600 text-white">
      Meta Ads
      </span>
      </td>
      <td className="px-6 py-4">
      <label className="toggle-switch">
      <input type="checkbox" checked={true} onChange={toggleCampaign} />
      <span className="slider"></span>
      </label>
      </td>
      <td className="px-6 py-4">
      <div className="text-sm">
      <p className="font-medium">Kr 300/dag</p>
      <p className="text-gray-500">Brukt: Kr 156</p>
      </div>
      </td>
      <td className="px-6 py-4">
      <div className="text-sm">
      <p>👁️ 8.5K | 👆 156 | 🛒 8</p>
      <p className="text-gray-500">CPA: Kr 19.50</p>
      </div>
      </td>
      <td className="px-6 py-4 text-sm">
      <button onClick={() => { editCampaign('2') }} className="text-blue-600 hover:text-blue-900 mr-3">
      Rediger
      </button>
      <button onClick={() => { viewCampaignStats('2') }} className="text-gray-600 hover:text-gray-900">
      Statistikk
      </button>
      </td>
      </tr>
      <tr className="campaign-row">
      <td className="px-6 py-4">
      <div>
      <p className="text-sm font-medium text-gray-900">Influencer Collab - Fitness</p>
      <p className="text-sm text-gray-500">Video ads med @fitnessguru</p>
      </div>
      </td>
      <td className="px-6 py-4">
      <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-yellow-400 text-black">
      Snapchat
      </span>
      </td>
      <td className="px-6 py-4">
      <label className="toggle-switch">
      <input type="checkbox" checked={true} onChange={toggleCampaign} />
      <span className="slider"></span>
      </label>
      </td>
      <td className="px-6 py-4">
      <div className="text-sm">
      <p className="font-medium">Kr 400/dag</p>
      <p className="text-gray-500">Brukt: Kr 156</p>
      </div>
      </td>
      <td className="px-6 py-4">
      <div className="text-sm">
      <p>👁️ 15.2K | 👆 423 | 🛒 3</p>
      <p className="text-gray-500">CPA: Kr 52.00</p>
      </div>
      </td>
      <td className="px-6 py-4 text-sm">
      <button onClick={() => { editCampaign('3') }} className="text-blue-600 hover:text-blue-900 mr-3">
      Rediger
      </button>
      <button onClick={() => { viewCampaignStats('3') }} className="text-gray-600 hover:text-gray-900">
      Statistikk
      </button>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Hurtighandlinger</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button onClick={() => { pauseAllCampaigns() }} className="border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-50">
      <span className="text-2xl mb-2 block">⏸️</span>
      <p className="font-medium">Pause alle kampanjer</p>
      <p className="text-sm text-gray-600">Stopp all annonsering midlertidig</p>
      </button>
      <button onClick={() => { adjustBudgets() }} className="border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-50">
      <span className="text-2xl mb-2 block">💰</span>
      <p className="font-medium">Juster budsjetter</p>
      <p className="text-sm text-gray-600">Optimaliser utgifter på tvers av plattformer</p>
      </button>
      <button onClick={() => { exportReport() }} className="border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-50">
      <span className="text-2xl mb-2 block">📊</span>
      <p className="font-medium">Eksporter rapport</p>
      <p className="text-sm text-gray-600">Last ned detaljert kampanjerapport</p>
      </button>
      </div>
      </div>
      </main>
      </div>
      <div id="newCampaignModal" className="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 shadow-lg rounded-md bg-white">
      <div className="mt-3">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Opprett ny kampanje</h3>
      <div id="step1" className="space-y-4">
      <h4 className="font-medium">Velg plattform</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <button onClick={() => { selectPlatform('google') }} className="platform-select border-2 rounded-lg p-4 hover:border-blue-500">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
      <span className="text-xl">G</span>
      </div>
      <p className="font-medium">Google Ads</p>
      </button>
      <button onClick={() => { selectPlatform('meta') }} className="platform-select border-2 rounded-lg p-4 hover:border-blue-500">
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
      <span className="text-xl text-white">f</span>
      </div>
      <p className="font-medium">Meta Ads</p>
      </button>
      <button onClick={() => { selectPlatform('snapchat') }} className="platform-select border-2 rounded-lg p-4 hover:border-blue-500">
      <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-2">
      <span className="text-xl">👻</span>
      </div>
      <p className="font-medium">Snapchat</p>
      </button>
      <button onClick={() => { selectPlatform('tiktok') }} className="platform-select border-2 rounded-lg p-4 hover:border-blue-500 opacity-50" disabled={true}>
      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-2">
      <span className="text-lg text-white">♪</span>
      </div>
      <p className="font-medium">TikTok</p>
      </button>
      </div>
      </div>
      <div id="step2" className="hidden space-y-4">
      <h4 className="font-medium">Kampanjedetaljer</h4>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Kampanjenavn</label>
      <input type="text" className="w-full p-2 border rounded-lg" placeholder="F.eks. Sommer salg 2025" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Kampanjemål</label>
      <select className="w-full p-2 border rounded-lg">
      <option>Øke salg</option>
      <option>Øke trafikk</option>
      <option>Bygge merkevare</option>
      <option>Få flere leads</option>
      </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Daglig budsjett</label>
      <input type="number" className="w-full p-2 border rounded-lg" placeholder="Kr 500" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Varighet</label>
      <select className="w-full p-2 border rounded-lg">
      <option>Løpende</option>
      <option>7 dager</option>
      <option>14 dager</option>
      <option>30 dager</option>
      <option>Egendefinert</option>
      </select>
      </div>
      </div>
      </div>
      <div id="step3" className="hidden space-y-4">
      <h4 className="font-medium">Annonseinnhold</h4>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Annonseformat</label>
      <select className="w-full p-2 border rounded-lg" onChange={(e) => console.log('Format changed:', e.target.value)}>
      <option value="image">Bilde</option>
      <option value="video">Video</option>
      <option value="carousel">Karusell</option>
      <option value="collection">Kolleksjon</option>
      </select>
      </div>
      <div id="mediaUpload">
      <label className="block text-sm font-medium text-gray-700 mb-2">Last opp media</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <p className="text-gray-600 mb-2">Dra og slipp filer her eller</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Velg filer
      </button>
      <p className="text-xs text-gray-500 mt-2">Støtter JPG, PNG, MP4 (maks 100MB)</p>
      </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Overskrift</label>
      <input type="text" className="w-full p-2 border rounded-lg" placeholder="F.eks. Premium Omega-3 - 30% rabatt!" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivelse</label>
      <textarea className="w-full p-2 border rounded-lg" rows={3} placeholder="Beskriv produktet og tilbudet..."></textarea>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Destinasjons-URL</label>
      <input type="url" className="w-full p-2 border rounded-lg" placeholder="https://helsekost.no/produkter/omega-3" />
      </div>
      </div>
      <div id="step4" className="hidden space-y-4">
      <h4 className="font-medium">Målgruppe</h4>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Alder</label>
      <div className="flex items-center space-x-4">
      <input type="number" className="w-20 p-2 border rounded-lg" placeholder="18" min="18" />
      <span>til</span>
      <input type="number" className="w-20 p-2 border rounded-lg" placeholder="65" max="65" />
      </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Kjønn</label>
      <div className="space-x-4">
      <label className="inline-flex items-center">
      <input type="checkbox" className="mr-2" checked={true} />
      <span>Alle</span>
      </label>
      <label className="inline-flex items-center">
      <input type="checkbox" className="mr-2" />
      <span>Menn</span>
      </label>
      <label className="inline-flex items-center">
      <input type="checkbox" className="mr-2" />
      <span>Kvinner</span>
      </label>
      </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Interesser</label>
      <input type="text" className="w-full p-2 border rounded-lg" placeholder="F.eks. Helse, Fitness, Ernæring..." />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Geografisk område</label>
      <select className="w-full p-2 border rounded-lg">
      <option>Hele Norge</option>
      <option>Oslo og omegn</option>
      <option>Bergen og omegn</option>
      <option>Trondheim og omegn</option>
      <option>Egendefinert...</option>
      </select>
      </div>
      </div>
      <div className="mt-6 flex justify-between">
      <button onClick={() => { previousStep() }} id="prevBtn" className="hidden px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
      Tilbake
      </button>
      <div className="ml-auto space-x-3">
      <button onClick={() => { closeNewCampaignModal() }} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
      Avbryt
      </button>
      <button onClick={() => { nextStep() }} id="nextBtn" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Neste
      </button>
      <button onClick={() => { createCampaign() }} id="createBtn" className="hidden px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
      Opprett kampanje
      </button>
      </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}