import { Link } from 'react-router';
import { closeOrderModal } from '../../../utils/adminFunctions';

export default function AdminOrdrer() {
  return (
    <div>
      <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
      <h1 className="text-2xl font-bold">Helsekost Admin</h1>
      <span className="text-gray-400">|</span>
      <span className="text-gray-300">Ordreadministrasjon</span>
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
      <Link to="/admin-ordrer" className="sidebar-link bg-gray-700 text-white block p-3 rounded">
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
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Ordreadministrasjon</h2>
      <p className="text-gray-600">Administrer og behandle kundeordrer</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Nye ordrer</h3>
      <span className="text-2xl">🆕</span>
      </div>
      <p className="text-2xl font-bold">12</p>
      <p className="text-xs text-gray-500">Siste 24 timer</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Under behandling</h3>
      <span className="text-2xl">📦</span>
      </div>
      <p className="text-2xl font-bold">28</p>
      <p className="text-xs text-gray-500">Venter på sending</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Sendt i dag</h3>
      <span className="text-2xl">🚚</span>
      </div>
      <p className="text-2xl font-bold">45</p>
      <p className="text-xs text-gray-500">Kr 67,890</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Kansellerte</h3>
      <span className="text-2xl">❌</span>
      </div>
      <p className="text-2xl font-bold">3</p>
      <p className="text-xs text-gray-500">Denne uken</p>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Søk ordre</label>
      <input type="text" placeholder="Ordrenummer eller kunde..." className="w-full p-2 border rounded-lg" id="searchOrder" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
      <select className="w-full p-2 border rounded-lg" id="filterStatus">
      <option value="">Alle statuser</option>
      <option value="ny">Ny</option>
      <option value="behandles">Under behandling</option>
      <option value="pakket">Pakket</option>
      <option value="sendt">Sendt</option>
      <option value="levert">Levert</option>
      <option value="kansellert">Kansellert</option>
      <option value="refundert">Refundert</option>
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Periode</label>
      <select className="w-full p-2 border rounded-lg" id="filterPeriod">
      <option value="today">I dag</option>
      <option value="week">Denne uken</option>
      <option value="month">Denne måneden</option>
      <option value="all">Alle</option>
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Sortering</label>
      <select className="w-full p-2 border rounded-lg" id="sortOrder">
      <option value="newest">Nyeste først</option>
      <option value="oldest">Eldste først</option>
      <option value="amount-high">Høyeste beløp</option>
      <option value="amount-low">Laveste beløp</option>
      </select>
      </div>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
      <thead className="bg-gray-50">
      <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Ordrenr
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Kunde
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Dato
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Beløp
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Status
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Handlinger
      </th>
      </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200" id="ordersTableBody">
      </tbody>
      </table>
      </div>
      </main>
      </div>
      <div id="orderModal" className="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 shadow-lg rounded-md bg-white">
      <div className="mt-3">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Ordredetaljer</h3>
      <div id="orderDetails">
      </div>
      <div className="mt-4 flex justify-end space-x-3">
      <button onClick={() => { closeOrderModal() }} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
      Lukk
      </button>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}