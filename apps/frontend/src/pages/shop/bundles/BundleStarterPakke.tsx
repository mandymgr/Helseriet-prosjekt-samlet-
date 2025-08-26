import { Link } from 'react-router';
import { selectPurchaseOption } from '../../../utils/adminFunctions';

export default function BundleStarterPakke() {
  return (
    <div>
      <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
      <Link to="/ekspertrad" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">Prat med spesialist</Link>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
      <Link to="/hjemmeside-svart-hvitt" className="text-2xl font-bold text-black">Helsekost</Link>
      </div>
      <div className="flex items-center space-x-4">
      <Link to="/sok" className="text-gray-700 hover:text-black transition-colors">
      <span className="text-xl">🔍</span>
      </Link>
      <Link to="/min-konto" className="text-gray-700 hover:text-black transition-colors">
      <span className="text-xl">👤</span>
      </Link>
      <Link to="/handlekurv" className="text-gray-700 hover:text-black transition-colors relative">
      <span className="text-xl">🛒</span>
      <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
      </Link>
      </div>
      </div>
      </div>
      </header>
      <nav className="container mx-auto px-4 py-3 text-sm">
      <ol className="flex items-center space-x-2">
      <li><Link to="/hjemmeside-svart-hvitt" className="text-gray-600 hover:text-black">Hjem</Link></li>
      <li className="text-gray-400">/</li>
      <li><Link to="/bundles" className="text-gray-600 hover:text-black">Helsepakker</Link></li>
      <li className="text-gray-400">/</li>
      <li className="text-black">Starter Helsepakke</li>
      </ol>
      </nav>
      <main className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-8">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div>
      <div className="flex items-center gap-2 mb-4">
      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Starter pakke</span>
      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Spar 22%</span>
      </div>
      <h1 className="text-4xl font-bold text-black mb-4">Starter Helsepakke</h1>
      <p className="text-lg text-gray-600 mb-6">
      Perfekt for deg som ønsker å komme i gang med grunnleggende kosttilskudd.
      Denne pakken inneholder de viktigste næringsstoffene for daglig velvære.
      </p>
      <div className="flex items-center gap-4 mb-6">
      <div className="flex text-yellow-400">
      <span className="text-2xl">⭐⭐⭐⭐⭐</span>
      <span className="ml-2 text-gray-600">(89 anmeldelser)</span>
      </div>
      <span className="text-green-600 font-semibold">✓ På lager</span>
      </div>
      <div className="flex items-baseline gap-3">
      <span className="text-3xl font-bold text-black">949 kr</span>
      <span className="text-xl text-gray-400 line-through">1.217 kr</span>
      <span className="text-red-600 font-semibold">Spar 268 kr</span>
      </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="text-4xl mb-2">☀️</div>
      <h3 className="font-semibold text-sm">Vitamin D3+K2</h3>
      <p className="text-xs text-gray-600">For immunforsvar</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="text-4xl mb-2">🐟</div>
      <h3 className="font-semibold text-sm">Omega-3</h3>
      <p className="text-xs text-gray-600">For hjertehelse</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="text-4xl mb-2">🌟</div>
      <h3 className="font-semibold text-sm">Multivitamin</h3>
      <p className="text-xs text-gray-600">Grunnleggende næring</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="text-4xl mb-2">🍊</div>
      <h3 className="font-semibold text-sm">Vitamin C</h3>
      <p className="text-xs text-gray-600">Antioksidant</p>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-black mb-4">Velg kjøpsalternativ</h2>
      <div className="grid md:grid-cols-2 gap-6">
      <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-black transition-colors cursor-pointer" onClick={() => { selectPurchaseOption('onetime') }}>
      <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-lg">Engangskjøp</h3>
      <input type="radio" name="purchase-option" id="onetime" className="w-4 h-4" />
      </div>
      <div className="text-2xl font-bold text-black mb-2">949 kr</div>
      <p className="text-sm text-gray-600">Kjøp en gang, ingen binding</p>
      </div>
      <div className="border-2 border-black rounded-lg p-4 bg-gray-50 cursor-pointer" onClick={() => { selectPurchaseOption('subscription') }}>
      <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-lg">Abonnement</h3>
      <input type="radio" name="purchase-option" id="subscription" checked={true} className="w-4 h-4" />
      </div>
      <div className="flex items-baseline gap-2 mb-2">
      <span className="text-2xl font-bold text-black">854 kr</span>
      <span className="text-sm text-gray-500 line-through">949 kr</span>
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Spar 10%</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Leveres hver 30. dag</p>
      <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
      <option>Hver 30. dag</option>
      <option>Hver 60. dag</option>
      <option>Hver 90. dag</option>
      </select>
      <div className="mt-3 text-xs text-gray-500">
      • Avbryt eller endre når som helst<br />
      • Prioritert kundeservice<br />
      • Eksklusiv medlemsrabatter
      </div>
      </div>
      </div>
      <div className="mt-6 flex gap-4">
      <button className="btn-primary flex-1">
      Legg i handlekurv
      </button>
      <button className="btn-secondary">
      <span className="text-xl">❤️</span>
      </button>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-black mb-4">Tilpass din pakke</h2>
      <p className="text-gray-600 mb-6">Bytt ut produkter eller legg til flere for å skape din perfekte helsepakke</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="product-card bg-gray-50 border-2 border-gray-200 rounded-lg p-4 relative">
      <button className="remove-btn">×</button>
      <div className="text-center">
      <div className="text-4xl mb-2">☀️</div>
      <h3 className="font-semibold text-sm mb-1">Vitamin D3+K2</h3>
      <p className="text-xs text-gray-600 mb-2">5000 IU</p>
      <p className="text-sm font-bold">349 kr</p>
      </div>
      </div>
      <div className="product-card bg-gray-50 border-2 border-gray-200 rounded-lg p-4 relative">
      <button className="remove-btn">×</button>
      <div className="text-center">
      <div className="text-4xl mb-2">🐟</div>
      <h3 className="font-semibold text-sm mb-1">Omega-3 Premium</h3>
      <p className="text-xs text-gray-600 mb-2">1000mg EPA/DHA</p>
      <p className="text-sm font-bold">379 kr</p>
      </div>
      </div>
      <div className="product-card bg-gray-50 border-2 border-gray-200 rounded-lg p-4 relative">
      <button className="remove-btn">×</button>
      <div className="text-center">
      <div className="text-4xl mb-2">🌟</div>
      <h3 className="font-semibold text-sm mb-1">Multivitamin</h3>
      <p className="text-xs text-gray-600 mb-2">25+ næringsstoffer</p>
      <p className="text-sm font-bold">399 kr</p>
      </div>
      </div>
      <div className="product-card bg-gray-50 border-2 border-gray-200 rounded-lg p-4 relative">
      <button className="remove-btn">×</button>
      <div className="text-center">
      <div className="text-4xl mb-2">🍊</div>
      <h3 className="font-semibold text-sm mb-1">Vitamin C</h3>
      <p className="text-xs text-gray-600 mb-2">1000mg</p>
      <p className="text-sm font-bold">199 kr</p>
      </div>
      </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
      <div>
      <h3 className="font-semibold mb-3">Legg til produkter</h3>
      <div className="space-y-2">
      <div className="flex items-center justify-between p-2 border rounded">
      <div className="flex items-center gap-2">
      <span className="text-2xl">💤</span>
      <div>
      <span className="font-medium text-sm">Magnesium</span>
      <p className="text-xs text-gray-600">299 kr</p>
      </div>
      </div>
      <button className="text-sm text-blue-600 hover:text-blue-800">+ Legg til</button>
      </div>
      <div className="flex items-center justify-between p-2 border rounded">
      <div className="flex items-center gap-2">
      <span className="text-2xl">🦠</span>
      <div>
      <span className="font-medium text-sm">Probiotika</span>
      <p className="text-xs text-gray-600">449 kr</p>
      </div>
      </div>
      <button className="text-sm text-blue-600 hover:text-blue-800">+ Legg til</button>
      </div>
      </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Pakke sammendrag</h3>
      <div className="space-y-2 text-sm">
      <div className="flex justify-between">
      <span>4 produkter (ordinærpris)</span>
      <span>1.217 kr</span>
      </div>
      <div className="flex justify-between text-green-600">
      <span>Pakkerabatt (22%)</span>
      <span>-268 kr</span>
      </div>
      <div className="flex justify-between font-bold pt-2 border-t">
      <span>Total</span>
      <span>949 kr</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-black mb-4">Hvorfor velge Starter Helsepakke?</h2>
      <div className="grid md:grid-cols-2 gap-6">
      <div>
      <h3 className="font-semibold mb-3">Perfekt for nybegynnere</h3>
      <ul className="space-y-2 text-sm text-gray-600">
      <li className="flex items-start gap-2">
      <span className="text-green-600">✓</span>
      <span>Dekker de mest essensielle næringsstoffene</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-green-600">✓</span>
      <span>Enkel daglig rutine med kun 4 produkter</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-green-600">✓</span>
      <span>Kvalitetskontrollerte ingredienser</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-green-600">✓</span>
      <span>Godkjent av våre helseeksperter</span>
      </li>
      </ul>
      </div>
      <div>
      <h3 className="font-semibold mb-3">Helsemessige fordeler</h3>
      <ul className="space-y-2 text-sm text-gray-600">
      <li className="flex items-start gap-2">
      <span className="text-blue-600">🛡️</span>
      <span>Støtter immunforsvaret</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-blue-600">❤️</span>
      <span>Fremmer hjerte- og karsystemet</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-blue-600">🧠</span>
      <span>Bidrar til normal hjernefunksjon</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-blue-600">⚡</span>
      <span>Øker energi og vitalitet</span>
      </li>
      </ul>
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-black mb-4">Slik bruker du pakken</h2>
      <div className="grid md:grid-cols-4 gap-4">
      <div className="text-center">
      <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
      <span className="font-bold">1</span>
      </div>
      <h3 className="font-semibold text-sm mb-1">Morgen</h3>
      <p className="text-xs text-gray-600">Vitamin D3+K2 og Multivitamin med frokost</p>
      </div>
      <div className="text-center">
      <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
      <span className="font-bold">2</span>
      </div>
      <h3 className="font-semibold text-sm mb-1">Lunsj</h3>
      <p className="text-xs text-gray-600">Omega-3 med måltid for best opptak</p>
      </div>
      <div className="text-center">
      <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
      <span className="font-bold">3</span>
      </div>
      <h3 className="font-semibold text-sm mb-1">Middag</h3>
      <p className="text-xs text-gray-600">Vitamin C for optimal absorpsjon</p>
      </div>
      <div className="text-center">
      <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
      <span className="font-bold">💡</span>
      </div>
      <h3 className="font-semibold text-sm mb-1">Tips</h3>
      <p className="text-xs text-gray-600">Ta alltid med mat for best opptak</p>
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-black">Kundevurderinger</h2>
      <div className="flex items-center gap-2">
      <span className="text-2xl">⭐⭐⭐⭐⭐</span>
      <span className="text-sm text-gray-600">4.7 (89 anmeldelser)</span>
      </div>
      </div>
      <div className="space-y-4">
      <div className="border-b pb-4">
      <div className="flex items-center gap-2 mb-2">
      <span className="font-semibold">Ingrid S.</span>
      <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
      <span className="text-sm text-gray-500">2 uker siden</span>
      </div>
      <p className="text-sm text-gray-700">
      "Perfekt startpakke! Enkel å følge og jeg merker allerede forskjell i energinivået.
      Anbefaler til alle som vil komme i gang med kosttilskudd."
      </p>
      </div>
      <div className="border-b pb-4">
      <div className="flex items-center gap-2 mb-2">
      <span className="font-semibold">Thomas K.</span>
      <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
      <span className="text-sm text-gray-500">1 måned siden</span>
      </div>
      <p className="text-sm text-gray-700">
      "Bra sammensatt pakke med gode produkter. Sparer både tid og penger
      sammenlignet med å kjøpe hver for seg."
      </p>
      </div>
      <div>
      <div className="flex items-center gap-2 mb-2">
      <span className="font-semibold">Maria L.</span>
      <span className="text-yellow-400">⭐⭐⭐⭐</span>
      <span className="text-sm text-gray-500">3 uker siden</span>
      </div>
      <p className="text-sm text-gray-700">
      "Veldig fornøyd med kvaliteten. Abonnementsløsningen gjør det enkelt å
      ikke gå tom for produktene."
      </p>
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
      <h2 className="text-xl font-bold text-black mb-6">Andre helsepakker</h2>
      <div className="grid md:grid-cols-2 gap-6">
      <Link to="/bundle-premium-helse" className="block border-2 border-gray-200 rounded-lg p-4 hover:border-black transition-colors">
      <div className="flex items-center gap-4">
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3">
      <span className="text-2xl">👑</span>
      </div>
      <div className="flex-1">
      <h3 className="font-semibold text-lg mb-1">Premium Helsepakke</h3>
      <p className="text-sm text-gray-600 mb-2">6 avanserte produkter for optimal helse</p>
      <div className="flex items-center gap-2">
      <span className="text-lg font-bold">1.899 kr</span>
      <span className="text-sm text-gray-500 line-through">2.447 kr</span>
      <span className="text-red-600 text-sm">Spar 548 kr</span>
      </div>
      </div>
      </div>
      </Link>
      <Link to="/bundle-immunforsvar" className="block border-2 border-gray-200 rounded-lg p-4 hover:border-black transition-colors">
      <div className="flex items-center gap-4">
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-3">
      <span className="text-2xl">🛡️</span>
      </div>
      <div className="flex-1">
      <h3 className="font-semibold text-lg mb-1">Immunforsvar Pakke</h3>
      <p className="text-sm text-gray-600 mb-2">Spesialisert for immunsystemet</p>
      <div className="flex items-center gap-2">
      <span className="text-lg font-bold">1.299 kr</span>
      <span className="text-sm text-gray-500 line-through">1.597 kr</span>
      <span className="text-red-600 text-sm">Spar 298 kr</span>
      </div>
      </div>
      </div>
      </Link>
      </div>
      </div>
      </main>
      <footer className="bg-black text-gray-300 border-t-4 border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8">
      <div className="text-center">
      <p className="text-sm">© 2024 Helsekost. Alle rettigheter reservert.</p>
      </div>
      </div>
      </footer>
    </div>
  );
}