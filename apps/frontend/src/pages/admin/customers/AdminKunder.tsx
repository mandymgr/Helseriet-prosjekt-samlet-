import { Link } from 'react-router';
import { switchTab } from '../../../utils/adminFunctions';

export default function AdminKunder() {
  return (
    <div>
      <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
      <h1 className="text-2xl font-bold">Helsekost Admin</h1>
      <span className="text-gray-400">|</span>
      <span className="text-gray-300">Kunder</span>
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
      <Link to="/admin-kunder" className="sidebar-link bg-gray-700 text-white block p-3 rounded">
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
      <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-800">Kundeadministrasjon</h2>
      <p className="text-gray-600 mt-2">Administrer kunder, medlemskap og kundegrupper</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <span className="text-4xl">👥</span>
      <span className="text-green-500 text-sm">+15%</span>
      </div>
      <h3 className="text-gray-600 text-sm">Totalt antall kunder</h3>
      <p className="text-2xl font-bold">1,234</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <span className="text-4xl">⭐</span>
      <span className="text-blue-500 text-sm">Premium</span>
      </div>
      <h3 className="text-gray-600 text-sm">VIP-medlemmer</h3>
      <p className="text-2xl font-bold">156</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <span className="text-4xl">📧</span>
      <span className="text-purple-500 text-sm">Aktive</span>
      </div>
      <h3 className="text-gray-600 text-sm">Nyhetsbrev-abonnenter</h3>
      <p className="text-2xl font-bold">892</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <span className="text-4xl">💰</span>
      <span className="text-yellow-500 text-sm">Snitt</span>
      </div>
      <h3 className="text-gray-600 text-sm">Gjennomsnittlig ordresum</h3>
      <p className="text-2xl font-bold">Kr 567</p>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow mb-6">
      <div className="border-b">
      <nav className="flex space-x-8 px-6">
      <button className="tab-button active py-4 text-gray-900 font-medium" onClick={() => { switchTab('customers') }}>
      Alle kunder
      </button>
      <button className="tab-button py-4 text-gray-600 hover:text-gray-900 font-medium" onClick={() => { switchTab('vip') }}>
      VIP-medlemmer
      </button>
      <button className="tab-button py-4 text-gray-600 hover:text-gray-900 font-medium" onClick={() => { switchTab('segments') }}>
      Kundesegmenter
      </button>
      <button className="tab-button py-4 text-gray-600 hover:text-gray-900 font-medium" onClick={() => { switchTab('export') }}>
      Eksport
      </button>
      </nav>
      </div>
      <div id="customers-tab" className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div>
      <input type="text" placeholder="Søk etter navn, e-post..." className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
      <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option>Alle kundegrupper</option>
      <option>VIP</option>
      <option>Stamkunder</option>
      <option>Nye kunder</option>
      <option>Inaktive</option>
      </select>
      </div>
      <div>
      <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option>Registrert (nyeste først)</option>
      <option>Registrert (eldste først)</option>
      <option>Mest aktive</option>
      <option>Høyest ordresum</option>
      </select>
      </div>
      <div>
      <button onClick={() => { alert('Eksporterer kundeliste...') }} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
      📥 Eksporter
      </button>
      </div>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full">
      <thead className="bg-gray-50">
      <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <input type="checkbox" className="rounded" />
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Kunde
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      E-post
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Kundegruppe
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Ordrer
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Total kjøp
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Registrert
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Handlinger
      </th>
      </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
      <tr className="customer-row">
      <td className="px-6 py-4 whitespace-nowrap">
      <input type="checkbox" className="rounded" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium">
      KN
      </div>
      <div className="ml-3">
      <p className="text-sm font-medium text-gray-900">Kari Nordmann</p>
      <p className="text-sm text-gray-500">Oslo</p>
      </div>
      </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      kari.nordmann@example.com
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
      VIP
      </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      23
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      Kr 12,450
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      15. jan 2023
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button onClick={() => { alert('Viser kundedetaljer for Kari Nordmann...') }} className="text-blue-600 hover:text-blue-900 mr-3">Se detaljer</button>
      <button onClick={() => { alert('Sender e-post til kunde...') }} className="text-gray-600 hover:text-gray-900">📧</button>
      </td>
      </tr>
      <tr className="customer-row">
      <td className="px-6 py-4 whitespace-nowrap">
      <input type="checkbox" className="rounded" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
      OH
      </div>
      <div className="ml-3">
      <p className="text-sm font-medium text-gray-900">Ole Hansen</p>
      <p className="text-sm text-gray-500">Bergen</p>
      </div>
      </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      ole.hansen@example.com
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
      Stamkunde
      </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      8
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      Kr 3,899
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      3. mars 2023
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button onClick={() => { alert('Viser kundedetaljer for Ole Hansen...') }} className="text-blue-600 hover:text-blue-900 mr-3">Se detaljer</button>
      <button onClick={() => { alert('Sender e-post til kunde...') }} className="text-gray-600 hover:text-gray-900">📧</button>
      </td>
      </tr>
      <tr className="customer-row">
      <td className="px-6 py-4 whitespace-nowrap">
      <input type="checkbox" className="rounded" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
      <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium">
      AL
      </div>
      <div className="ml-3">
      <p className="text-sm font-medium text-gray-900">Anne Larsen</p>
      <p className="text-sm text-gray-500">Trondheim</p>
      </div>
      </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      anne.larsen@example.com
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
      Ny kunde
      </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      1
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      Kr 599
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      2. des 2024
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button onClick={() => { alert('Viser kundedetaljer for Anne Larsen...') }} className="text-blue-600 hover:text-blue-900 mr-3">Se detaljer</button>
      <button onClick={() => { alert('Sender e-post til kunde...') }} className="text-gray-600 hover:text-gray-900">📧</button>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      <div id="vip-tab" className="p-6 hidden">
      <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-900 mb-2">VIP-medlemmer</h3>
      <p className="text-gray-600">156 VIP-kunder med eksklusive fordeler</p>
      <button onClick={() => { alert('Viser VIP-fordeler og administrasjon...') }} className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg">
      Se VIP-program
      </button>
      </div>
      </div>
      <div id="segments-tab" className="p-6 hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
      <h3 className="font-medium text-purple-900 mb-2">VIP-medlemmer</h3>
      <p className="text-3xl font-bold text-purple-900 mb-2">156</p>
      <p className="text-sm text-purple-700">Kunder med over Kr 10,000 i total handel</p>
      <button onClick={() => { alert('Redigerer VIP-segment...') }} className="mt-4 text-purple-600 hover:text-purple-800 text-sm font-medium">
      Rediger kriterier →
      </button>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 className="font-medium text-green-900 mb-2">Stamkunder</h3>
      <p className="text-3xl font-bold text-green-900 mb-2">423</p>
      <p className="text-sm text-green-700">Kunder med 3+ ordrer siste 6 måneder</p>
      <button onClick={() => { alert('Redigerer stamkunde-segment...') }} className="mt-4 text-green-600 hover:text-green-800 text-sm font-medium">
      Rediger kriterier →
      </button>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="font-medium text-blue-900 mb-2">Nye kunder</h3>
      <p className="text-3xl font-bold text-blue-900 mb-2">89</p>
      <p className="text-sm text-blue-700">Registrert siste 30 dager</p>
      <button onClick={() => { alert('Redigerer nye kunder-segment...') }} className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
      Rediger kriterier →
      </button>
      </div>
      </div>
      <div className="mt-6 text-center">
      <button onClick={() => { alert('Oppretter nytt kundesegment...') }} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
      + Opprett nytt segment
      </button>
      </div>
      </div>
      <div id="export-tab" className="p-6 hidden">
      <div className="max-w-2xl mx-auto">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Eksporter kundedata</h3>
      <div className="space-y-4">
      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer" onClick={() => { alert('Eksporterer alle kunder til CSV...') }}>
      <div className="flex items-center justify-between">
      <div>
      <h4 className="font-medium">Alle kunder (CSV)</h4>
      <p className="text-sm text-gray-600">Komplett kundeliste med all informasjon</p>
      </div>
      <span className="text-2xl">📄</span>
      </div>
      </div>
      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer" onClick={() => { alert('Eksporterer e-postliste...') }}>
      <div className="flex items-center justify-between">
      <div>
      <h4 className="font-medium">E-postliste for nyhetsbrev</h4>
      <p className="text-sm text-gray-600">Kun aktive nyhetsbrev-abonnenter</p>
      </div>
      <span className="text-2xl">📧</span>
      </div>
      </div>
      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer" onClick={() => { alert('Eksporterer VIP-liste...') }}>
      <div className="flex items-center justify-between">
      <div>
      <h4 className="font-medium">VIP-medlemmer</h4>
      <p className="text-sm text-gray-600">Liste over premium-kunder</p>
      </div>
      <span className="text-2xl">⭐</span>
      </div>
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