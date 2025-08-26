import { Link } from 'react-router';

export default function AdminRapport() {
  return (
    <div>
      <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
      <h1 className="text-2xl font-bold">Helsekost Admin</h1>
      <span className="text-gray-400">|</span>
      <span className="text-gray-300">Rapporter</span>
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
      <div className="flex h-screen bg-gray-50">
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
      <Link to="/admin-rapport" className="sidebar-link bg-gray-700 text-white block p-3 rounded">
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
      <main className="flex-1 overflow-y-auto">
      <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Rapporter og analyser</h2>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
      <label className="text-sm font-medium text-gray-700">Periode:</label>
      <select className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
      <option>Siste 7 dager</option>
      <option selected={true}>Siste 30 dager</option>
      <option>Siste 3 måneder</option>
      <option>Siste 12 måneder</option>
      <option>Egendefinert</option>
      </select>
      <input type="date" className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value="2024-01-01" />
      <span className="text-gray-500">til</span>
      <input type="date" className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value="2024-01-31" />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Oppdater</button>
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
      <div className="flex items-center">
      <div className="flex-shrink-0">
      <span className="text-2xl">💰</span>
      </div>
      <div className="ml-5 w-0 flex-1">
      <dl>
      <dt className="text-sm font-medium text-gray-500 truncate">Total omsetning</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">842,500 kr</dd>
      <dd className="mt-1 text-sm text-green-600">+12.5% fra forrige periode</dd>
      </dl>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
      <div className="flex items-center">
      <div className="flex-shrink-0">
      <span className="text-2xl">🛒</span>
      </div>
      <div className="ml-5 w-0 flex-1">
      <dl>
      <dt className="text-sm font-medium text-gray-500 truncate">Antall ordrer</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">1,234</dd>
      <dd className="mt-1 text-sm text-green-600">+8.3% fra forrige periode</dd>
      </dl>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
      <div className="flex items-center">
      <div className="flex-shrink-0">
      <span className="text-2xl">👥</span>
      </div>
      <div className="ml-5 w-0 flex-1">
      <dl>
      <dt className="text-sm font-medium text-gray-500 truncate">Nye kunder</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">342</dd>
      <dd className="mt-1 text-sm text-green-600">+15.2% fra forrige periode</dd>
      </dl>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
      <div className="flex items-center">
      <div className="flex-shrink-0">
      <span className="text-2xl">📊</span>
      </div>
      <div className="ml-5 w-0 flex-1">
      <dl>
      <dt className="text-sm font-medium text-gray-500 truncate">Gjennomsnittlig ordre</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">683 kr</dd>
      <dd className="mt-1 text-sm text-green-600">+4.1% fra forrige periode</dd>
      </dl>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Salgsutvikling</h3>
      <div className="relative h-80">
      <canvas id="salesChart"></canvas>
      </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Salg per kategori</h3>
      <div className="relative h-80">
      <canvas id="categoryChart"></canvas>
      </div>
      </div>
      </div>
      <div className="bg-white shadow rounded-lg mb-8">
      <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Topp 10 produkter</h3>
      <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
      <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produkt</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Antall solgt</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Omsetning</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vekst</th>
      </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
      <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Omega-3 Premium</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fettsyrer</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">234</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">88,686 kr</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+18.5%</td>
      </tr>
      <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Multivitamin Complete</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Vitaminer</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">198</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">79,002 kr</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+12.3%</td>
      </tr>
      <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Probiotika Ultra</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Probiotika</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">156</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">70,044 kr</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+25.1%</td>
      </tr>
      <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Vitamin D3+K2</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Vitaminer</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">189</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">65,961 kr</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+8.7%</td>
      </tr>
      <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Magnesium Glycinate</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mineraler</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">212</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">63,388 kr</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+15.4%</td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Kundefordeling</h3>
      <div className="relative h-48">
      <canvas id="customerChart"></canvas>
      </div>
      <div className="mt-4 space-y-2">
      <div className="flex justify-between text-sm">
      <span className="text-gray-600">Nye kunder</span>
      <span className="font-medium">28%</span>
      </div>
      <div className="flex justify-between text-sm">
      <span className="text-gray-600">Returnerende kunder</span>
      <span className="font-medium">72%</span>
      </div>
      </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Trafikkkilder</h3>
      <div className="space-y-3">
      <div>
      <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-600">Direkte</span>
      <span className="font-medium">45%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
      </div>
      </div>
      <div>
      <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-600">Google</span>
      <span className="font-medium">32%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-green-600 h-2 rounded-full" style={{width: '32%'}}></div>
      </div>
      </div>
      <div>
      <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-600">Sosiale medier</span>
      <span className="font-medium">18%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-purple-600 h-2 rounded-full" style={{width: '18%'}}></div>
      </div>
      </div>
      <div>
      <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-600">E-post</span>
      <span className="font-medium">5%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-yellow-600 h-2 rounded-full" style={{width: '5%'}}></div>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Konverteringsrate</h3>
      <div className="text-center">
      <div className="text-5xl font-bold text-blue-600 mb-2">3.8%</div>
      <p className="text-sm text-gray-600">Gjennomsnittlig konvertering</p>
      <div className="mt-4 space-y-2 text-left">
      <div className="flex justify-between text-sm">
      <span className="text-gray-600">Handlekurv forlatt</span>
      <span className="font-medium text-red-600">68.2%</span>
      </div>
      <div className="flex justify-between text-sm">
      <span className="text-gray-600">Gjennomført kjøp</span>
      <span className="font-medium text-green-600">31.8%</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Eksporter rapporter</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
      <span className="mr-2">📄</span> Eksporter til PDF
      </button>
      <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
      <span className="mr-2">📊</span> Eksporter til Excel
      </button>
      <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
      <span className="mr-2">📧</span> Send rapport på e-post
      </button>
      </div>
      </div>
      </div>
      </div>
      </main>
      </div>
    </div>
  );
}