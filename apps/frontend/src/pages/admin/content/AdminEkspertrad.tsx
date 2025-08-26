import { Link } from 'react-router';
import { openAnswerModal, publishAnswer, closeAnswerModal, submitAnswer } from '../../../utils/adminFunctions';

export default function AdminEkspertrad() {
  return (
    <div>
      <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
      <h1 className="text-2xl font-bold">Helsekost Admin</h1>
      <span className="text-gray-400">|</span>
      <span className="text-gray-300">Ekspertråd</span>
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
      <Link to="/admin-ekspertrad" className="sidebar-link bg-gray-700 text-white block p-3 rounded">
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
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Ekspertråd</h2>
      <p className="text-gray-600">Administrer spørsmål og svar fra kunder</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Ubesvarte</h3>
      <span className="text-2xl">❓</span>
      </div>
      <p className="text-2xl font-bold text-red-600">8</p>
      <p className="text-xs text-gray-500">Venter på svar</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Besvarte i dag</h3>
      <span className="text-2xl">✅</span>
      </div>
      <p className="text-2xl font-bold text-green-600">12</p>
      <p className="text-xs text-gray-500">Gjennomsnitt: 2.5 timer</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Totalt spørsmål</h3>
      <span className="text-2xl">💬</span>
      </div>
      <p className="text-2xl font-bold">342</p>
      <p className="text-xs text-gray-500">Siste 30 dager</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Populære emner</h3>
      <span className="text-2xl">🏆</span>
      </div>
      <p className="text-lg font-bold">Vitaminer</p>
      <p className="text-xs text-gray-500">28% av spørsmål</p>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
      <select className="w-full p-2 border rounded-lg" id="filterStatus">
      <option value="ubesvart">Ubesvarte</option>
      <option value="besvart">Besvarte</option>
      <option value="publisert">Publiserte</option>
      <option value="alle">Alle</option>
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
      <select className="w-full p-2 border rounded-lg" id="filterCategory">
      <option value="">Alle kategorier</option>
      <option value="vitaminer">Vitaminer</option>
      <option value="mineraler">Mineraler</option>
      <option value="omega3">Omega-3</option>
      <option value="trening">Trening &amp; Prestasjon</option>
      <option value="helse">Generell helse</option>
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Ekspert</label>
      <select className="w-full p-2 border rounded-lg" id="filterExpert">
      <option value="">Alle eksperter</option>
      <option value="dr-hansen">Dr. Hansen</option>
      <option value="ern-olsen">Ernæringsfysiolog Olsen</option>
      <option value="farm-berg">Farmasøyt Berg</option>
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Søk</label>
      <input type="text" placeholder="Søk i spørsmål..." className="w-full p-2 border rounded-lg" id="searchQuestion" />
      </div>
      </div>
      </div>
      <div className="space-y-4" id="questionsList">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
      <h3 className="font-semibold text-red-800 mb-3">⚠️ Ubesvarte spørsmål</h3>
      <div className="space-y-3">
      <div className="question-card bg-white p-4 rounded-lg shadow cursor-pointer" onClick={() => { openAnswerModal('1') }}>
      <div className="flex justify-between items-start mb-2">
      <div className="flex-1">
      <p className="font-medium text-gray-900">Kan jeg ta vitamin D sammen med kalsium?</p>
      <p className="text-sm text-gray-600 mt-1">Fra: Anna Hansen • 2 timer siden</p>
      <p className="text-sm text-gray-500 mt-2">Jeg lurer på om det er trygt å ta vitamin D og kalsium samtidig...</p>
      </div>
      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Vitaminer</span>
      </div>
      </div>
      <div className="question-card bg-white p-4 rounded-lg shadow cursor-pointer" onClick={() => { openAnswerModal('2') }}>
      <div className="flex justify-between items-start mb-2">
      <div className="flex-1">
      <p className="font-medium text-gray-900">Beste tiden å ta magnesium?</p>
      <p className="text-sm text-gray-600 mt-1">Fra: Per Olsen • 4 timer siden</p>
      <p className="text-sm text-gray-500 mt-2">Når på dagen er det best å ta magnesium tilskudd?...</p>
      </div>
      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Mineraler</span>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-semibold text-gray-800 mb-4">📝 Nylig besvarte</h3>
      <div className="space-y-4">
      <div className="question-card border-l-4 border-green-500 p-4 bg-gray-50 rounded">
      <div className="flex justify-between items-start">
      <div className="flex-1">
      <p className="font-medium text-gray-900">Forskjell på omega-3 fra fisk og alger?</p>
      <p className="text-sm text-gray-600 mt-1">Fra: Kari Berg • Besvart av: Dr. Hansen • I går</p>
      <div className="mt-3 bg-white p-3 rounded">
      <p className="text-sm text-gray-700"><strong>Svar:</strong> Både fiskeolje og algeolje inneholder EPA og DHA...</p>
      </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Omega-3</span>
      <button onClick={() => { publishAnswer('3') }} className="text-blue-600 hover:text-blue-800 text-sm">
      Publiser på nettside
      </button>
      </div>
      </div>
      </div>
      <div className="question-card border-l-4 border-green-500 p-4 bg-gray-50 rounded">
      <div className="flex justify-between items-start">
      <div className="flex-1">
      <p className="font-medium text-gray-900">Hvor mye protein trenger jeg etter trening?</p>
      <p className="text-sm text-gray-600 mt-1">Fra: Ole Dahl • Besvart av: Ernæringsfysiolog Olsen • I går</p>
      <div className="mt-3 bg-white p-3 rounded">
      <p className="text-sm text-gray-700"><strong>Svar:</strong> Etter trening anbefales det 20-30g protein...</p>
      </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Trening</span>
      <span className="text-green-600 text-sm">✓ Publisert</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="font-semibold text-gray-800 mb-4">👨‍⚕️ Våre eksperter</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="border rounded-lg p-4">
      <h4 className="font-medium">Dr. Hansen</h4>
      <p className="text-sm text-gray-600">Spesialist i ernæring</p>
      <div className="mt-2 text-sm">
      <p>Besvarte: <span className="font-medium">145</span></p>
      <p>Svartid: <span className="font-medium">1.2 timer</span></p>
      </div>
      </div>
      <div className="border rounded-lg p-4">
      <h4 className="font-medium">Ernæringsfysiolog Olsen</h4>
      <p className="text-sm text-gray-600">Idrettsernæring</p>
      <div className="mt-2 text-sm">
      <p>Besvarte: <span className="font-medium">98</span></p>
      <p>Svartid: <span className="font-medium">2.5 timer</span></p>
      </div>
      </div>
      <div className="border rounded-lg p-4">
      <h4 className="font-medium">Farmasøyt Berg</h4>
      <p className="text-sm text-gray-600">Kosttilskudd og legemidler</p>
      <div className="mt-2 text-sm">
      <p>Besvarte: <span className="font-medium">112</span></p>
      <p>Svartid: <span className="font-medium">3.1 timer</span></p>
      </div>
      </div>
      </div>
      </div>
      </main>
      </div>
      <div id="answerModal" className="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 shadow-lg rounded-md bg-white">
      <div className="mt-3">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Besvar spørsmål</h3>
      <div id="questionDetails" className="mb-4">
      </div>
      <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Velg ekspert</label>
      <select className="w-full p-2 border rounded-lg" id="selectExpert">
      <option value="dr-hansen">Dr. Hansen</option>
      <option value="ern-olsen">Ernæringsfysiolog Olsen</option>
      <option value="farm-berg">Farmasøyt Berg</option>
      </select>
      </div>
      <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Svar</label>
      <textarea className="w-full p-3 border rounded-lg" rows={6} id="answerText" placeholder="Skriv ditt svar her..."></textarea>
      </div>
      <div className="mb-4">
      <label className="flex items-center">
      <input type="checkbox" className="mr-2" id="publishCheckbox" />
      <span className="text-sm">Publiser svaret på nettsiden</span>
      </label>
      </div>
      <div className="flex justify-end space-x-3">
      <button onClick={() => { closeAnswerModal() }} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
      Avbryt
      </button>
      <button onClick={() => { submitAnswer() }} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Send svar
      </button>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}