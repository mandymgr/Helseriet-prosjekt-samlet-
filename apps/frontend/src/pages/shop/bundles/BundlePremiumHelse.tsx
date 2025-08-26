import { Link } from 'react-router';
import { selectPurchaseOption } from '../../../utils/adminFunctions';

export default function BundlePremiumHelse() {
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
      <li className="text-black">Premium Helsepakke</li>
      </ol>
      </nav>
      <main className="container mx-auto px-4 py-8">
      <div className="premium-gradient rounded-lg p-8 mb-8 text-white">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div>
      <div className="flex items-center gap-2 mb-4">
      <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-semibold">Premium pakke</span>
      <span className="bg-red-500 bg-opacity-90 text-white px-3 py-1 rounded-full text-sm font-semibold">Spar 25%</span>
      </div>
      <h1 className="text-4xl font-bold mb-4">Premium Helsepakke</h1>
      <p className="text-lg mb-6 text-white text-opacity-90">
      Vår mest avanserte helsepakke med premium ingredienser og vitenskapelig dokumenterte doser.
      Perfekt for deg som ønsker maksimal helse og ytelse.
      </p>
      <div className="flex items-center gap-4 mb-6">
      <div className="flex text-yellow-400">
      <span className="text-2xl">⭐⭐⭐⭐⭐</span>
      <span className="ml-2 text-white text-opacity-90">(156 anmeldelser)</span>
      </div>
      <span className="text-green-400 font-semibold">✓ På lager</span>
      </div>
      <div className="flex items-baseline gap-3">
      <span className="text-4xl font-bold">1.899 kr</span>
      <span className="text-xl text-white text-opacity-60 line-through">2.547 kr</span>
      <span className="text-red-300 font-semibold">Spar 648 kr</span>
      </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
      <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
      <div className="text-3xl mb-1">🐟</div>
      <h3 className="font-semibold text-xs">Omega-3</h3>
      <p className="text-xs text-white text-opacity-80">Ultra Pure</p>
      </div>
      <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
      <div className="text-3xl mb-1">🌙</div>
      <h3 className="font-semibold text-xs">Magnesium</h3>
      <p className="text-xs text-white text-opacity-80">Glycinate</p>
      </div>
      <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
      <div className="text-3xl mb-1">🦠</div>
      <h3 className="font-semibold text-xs">Probiotika</h3>
      <p className="text-xs text-white text-opacity-80">50 milliarder</p>
      </div>
      <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
      <div className="text-3xl mb-1">🌿</div>
      <h3 className="font-semibold text-xs">Ashwagandha</h3>
      <p className="text-xs text-white text-opacity-80">KSM-66</p>
      </div>
      <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
      <div className="text-3xl mb-1">🧬</div>
      <h3 className="font-semibold text-xs">CoQ10</h3>
      <p className="text-xs text-white text-opacity-80">Ubiquinol</p>
      </div>
      <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
      <div className="text-3xl mb-1">🍄</div>
      <h3 className="font-semibold text-xs">Lion's Mane</h3>
      <p className="text-xs text-white text-opacity-80">Kognitiv</p>
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
      <div className="text-2xl font-bold text-black mb-2">1.899 kr</div>
      <p className="text-sm text-gray-600">Kjøp en gang, ingen binding</p>
      </div>
      <div className="border-2 border-black rounded-lg p-4 bg-gray-50 cursor-pointer" onClick={() => { selectPurchaseOption('subscription') }}>
      <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-lg">Premium Abonnement</h3>
      <input type="radio" name="purchase-option" id="subscription" checked={true} className="w-4 h-4" />
      </div>
      <div className="flex items-baseline gap-2 mb-2">
      <span className="text-2xl font-bold text-black">1.614 kr</span>
      <span className="text-sm text-gray-500 line-through">1.899 kr</span>
      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold">Spar 15%</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Leveres hver 30. dag</p>
      <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
      <option>Hver 30. dag</option>
      <option>Hver 45. dag</option>
      <option>Hver 60. dag</option>
      </select>
      <div className="mt-3 text-xs text-gray-500">
      • Premium support med direktelinje<br />
      • Gratis konsultasjon med ernæringsfysiolog<br />
      • Eksklusiv tilgang til nye produkter<br />
      • Personlig helserapport hver 3. måned
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
      <h2 className="text-xl font-bold text-black mb-4">Tilpass din Premium pakke</h2>
      <p className="text-gray-600 mb-6">Denne pakken er nøye sammensatt av våre eksperter, men du kan fortsatt justere innholdet</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div className="product-card bg-gray-50 border-2 border-gray-200 rounded-lg p-4 relative">
      <button className="remove-btn">×</button>
      <div className="text-center">
      <div className="text-4xl mb-2">🐟</div>
      <h3 className="font-semibold text-sm mb-1">Omega-3 Ultra Pure</h3>
      <p className="text-xs text-gray-600 mb-2">1500mg EPA/DHA</p>
      <p className="text-sm font-bold">499 kr</p>
      </div>
      </div>
      <div className="product-card bg-gray-50 border-2 border-gray-200 rounded-lg p-4 relative">
      <button className="remove-btn">×</button>
      <div className="text-center">
      <div className="text-4xl mb-2">🌙</div>
      <h3 className="font-semibold text-sm mb-1">Magnesium Glycinate</h3>
      <p className="text-xs text-gray-600 mb-2">600mg høy absorpsjon</p>
      <p className="text-sm font-bold">349 kr</p>
      </div>
      </div>
      <div className="product-card bg-gray-50 border-2 border-gray-200 rounded-lg p-4 relative">
      <button className="remove-btn">×</button>
      <div className="text-center">
      <div className="text-4xl mb-2">🦠</div>
      <h3 className="font-semibold text-sm mb-1">Probiotika Ultra</h3>
      <p className="text-xs text-gray-600 mb-2">50 milliarder CFU</p>
      <p className="text-sm font-bold">549 kr</p>
      </div>
      </div>
      <div className="product-card bg-gray-50 border-2 border-gray-200 rounded-lg p-4 relative">
      <button className="remove-btn">×</button>
      <div className="text-center">
      <div className="text-4xl mb-2">🌿</div>
      <h3 className="font-semibold text-sm mb-1">Ashwagandha KSM-66</h3>
      <p className="text-xs text-gray-600 mb-2">600mg ekstrakt</p>
      <p className="text-sm font-bold">399 kr</p>
      </div>
      </div>
      <div className="product-card bg-gray-50 border-2 border-gray-200 rounded-lg p-4 relative">
      <button className="remove-btn">×</button>
      <div className="text-center">
      <div className="text-4xl mb-2">🧬</div>
      <h3 className="font-semibold text-sm mb-1">CoQ10 Ubiquinol</h3>
      <p className="text-xs text-gray-600 mb-2">200mg aktiv form</p>
      <p className="text-sm font-bold">449 kr</p>
      </div>
      </div>
      <div className="product-card bg-gray-50 border-2 border-gray-200 rounded-lg p-4 relative">
      <button className="remove-btn">×</button>
      <div className="text-center">
      <div className="text-4xl mb-2">🍄</div>
      <h3 className="font-semibold text-sm mb-1">Lion's Mane</h3>
      <p className="text-xs text-gray-600 mb-2">1000mg ekstrakt</p>
      <p className="text-sm font-bold">399 kr</p>
      </div>
      </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
      <div>
      <h3 className="font-semibold mb-3">Legg til produkter</h3>
      <div className="space-y-2">
      <div className="flex items-center justify-between p-2 border rounded">
      <div className="flex items-center gap-2">
      <span className="text-2xl">☀️</span>
      <div>
      <span className="font-medium text-sm">Vitamin D3+K2</span>
      <p className="text-xs text-gray-600">349 kr</p>
      </div>
      </div>
      <button className="text-sm text-blue-600 hover:text-blue-800">+ Legg til</button>
      </div>
      <div className="flex items-center justify-between p-2 border rounded">
      <div className="flex items-center gap-2">
      <span className="text-2xl">🧠</span>
      <div>
      <span className="font-medium text-sm">Rhodiola</span>
      <p className="text-xs text-gray-600">299 kr</p>
      </div>
      </div>
      <button className="text-sm text-blue-600 hover:text-blue-800">+ Legg til</button>
      </div>
      <div className="flex items-center justify-between p-2 border rounded">
      <div className="flex items-center gap-2">
      <span className="text-2xl">💊</span>
      <div>
      <span className="font-medium text-sm">NAD+ Booster</span>
      <p className="text-xs text-gray-600">799 kr</p>
      </div>
      </div>
      <button className="text-sm text-blue-600 hover:text-blue-800">+ Legg til</button>
      </div>
      </div>
      </div>
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Premium pakke sammendrag</h3>
      <div className="space-y-2 text-sm">
      <div className="flex justify-between">
      <span>6 premium produkter</span>
      <span>2.644 kr</span>
      </div>
      <div className="flex justify-between text-purple-600">
      <span>Premium pakkerabatt (25%)</span>
      <span>-661 kr</span>
      </div>
      <div className="flex justify-between text-green-600">
      <span>Ekspertvalg bonus</span>
      <span>-84 kr</span>
      </div>
      <div className="flex justify-between font-bold pt-2 border-t">
      <span>Total</span>
      <span>1.899 kr</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-black mb-4">Hvorfor velge Premium Helsepakke?</h2>
      <div className="grid md:grid-cols-3 gap-6">
      <div>
      <h3 className="font-semibold mb-3 text-purple-600">🏆 Premium ingredienser</h3>
      <ul className="space-y-2 text-sm text-gray-600">
      <li className="flex items-start gap-2">
      <span className="text-green-600">✓</span>
      <span>Patenterte og klinisk testede former</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-green-600">✓</span>
      <span>Høyeste bioverfügbarhet</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-green-600">✓</span>
      <span>Tredjepartstestet for renhet</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-green-600">✓</span>
      <span>GMP-sertifisert produksjon</span>
      </li>
      </ul>
      </div>
      <div>
      <h3 className="font-semibold mb-3 text-purple-600">🎯 Optimale doser</h3>
      <ul className="space-y-2 text-sm text-gray-600">
      <li className="flex items-start gap-2">
      <span className="text-blue-600">🔬</span>
      <span>Vitenskapelig dokumenterte doser</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-blue-600">⚡</span>
      <span>Maksimal effekt og absorpsjon</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-blue-600">🧠</span>
      <span>Kognitiv funksjon og fokus</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-blue-600">💪</span>
      <span>Energi og fysisk ytelse</span>
      </li>
      </ul>
      </div>
      <div>
      <h3 className="font-semibold mb-3 text-purple-600">🌟 Eksklusiv service</h3>
      <ul className="space-y-2 text-sm text-gray-600">
      <li className="flex items-start gap-2">
      <span className="text-purple-600">👨‍⚕️</span>
      <span>Personlig rådgiver tilgjengelig</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-purple-600">📊</span>
      <span>Kvartalsvis helseanalyse</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-purple-600">🎁</span>
      <span>Eksklusive medlemsfordeler</span>
      </li>
      <li className="flex items-start gap-2">
      <span className="text-purple-600">📞</span>
      <span>Prioritert kundeservice</span>
      </li>
      </ul>
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-black mb-4">Ekspertanbefalinger</h2>
      <div className="grid md:grid-cols-2 gap-6">
      <div className="border-l-4 border-purple-600 pl-4">
      <div className="flex items-center gap-3 mb-3">
      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
      <span className="text-2xl">👩‍⚕️</span>
      </div>
      <div>
      <h3 className="font-semibold">Dr. Sarah Hansen</h3>
      <p className="text-sm text-gray-600">Ernæringsfysiolog</p>
      </div>
      </div>
      <p className="text-sm text-gray-700 italic">
      "Premium pakken er perfekt sammensatt for deg som ønsker å optimalisere helsen din.
      Kombinasjonen av Omega-3, Magnesium og Ashwagandha er spesielt kraftfull for stressmestring."
      </p>
      </div>
      <div className="border-l-4 border-blue-600 pl-4">
      <div className="flex items-center gap-3 mb-3">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
      <span className="text-2xl">👨‍⚕️</span>
      </div>
      <div>
      <h3 className="font-semibold">Dr. Michael Berg</h3>
      <p className="text-sm text-gray-600">Naturterapeut</p>
      </div>
      </div>
      <p className="text-sm text-gray-700 italic">
      "CoQ10 og Lion's Mane gjør denne pakken unik. Perfekt for deg som vil støtte både hjerte,
      hjerne og cellulær energiproduksjon samtidig."
      </p>
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-black mb-4">Optimal bruksguide</h2>
      <div className="grid md:grid-cols-2 gap-6">
      <div>
      <h3 className="font-semibold mb-3">Daglig rutine</h3>
      <div className="space-y-3">
      <div className="flex items-start gap-3">
      <div className="bg-yellow-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
      <span className="text-sm font-bold">M</span>
      </div>
      <div>
      <h4 className="font-semibold text-sm">Morgen (med frokost)</h4>
      <p className="text-xs text-gray-600">Omega-3, CoQ10, Lion's Mane</p>
      </div>
      </div>
      <div className="flex items-start gap-3">
      <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
      <span className="text-sm font-bold">L</span>
      </div>
      <div>
      <h4 className="font-semibold text-sm">Lunsj</h4>
      <p className="text-xs text-gray-600">Probiotika (på tom mage)</p>
      </div>
      </div>
      <div className="flex items-start gap-3">
      <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
      <span className="text-sm font-bold">K</span>
      </div>
      <div>
      <h4 className="font-semibold text-sm">Kveld (med middag)</h4>
      <p className="text-xs text-gray-600">Magnesium, Ashwagandha</p>
      </div>
      </div>
      </div>
      </div>
      <div>
      <h3 className="font-semibold mb-3">Viktige tips</h3>
      <div className="space-y-2 text-sm text-gray-600">
      <div className="flex items-start gap-2">
      <span className="text-green-600">💧</span>
      <span>Drikk rikelig med vann</span>
      </div>
      <div className="flex items-start gap-2">
      <span className="text-green-600">🍽️</span>
      <span>Ta med mat for optimal opptak</span>
      </div>
      <div className="flex items-start gap-2">
      <span className="text-green-600">⏰</span>
      <span>Konsistens er nøkkelen</span>
      </div>
      <div className="flex items-start gap-2">
      <span className="text-green-600">📱</span>
      <span>Bruk appen vår for påminnelser</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-black">Kundevurderinger</h2>
      <div className="flex items-center gap-2">
      <span className="text-2xl">⭐⭐⭐⭐⭐</span>
      <span className="text-sm text-gray-600">4.9 (156 anmeldelser)</span>
      </div>
      </div>
      <div className="space-y-4">
      <div className="border-b pb-4">
      <div className="flex items-center gap-2 mb-2">
      <span className="font-semibold">Erik M.</span>
      <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
      <span className="text-sm text-gray-500">3 uker siden</span>
      </div>
      <p className="text-sm text-gray-700">
      "Har brukt Premium pakken i 6 måneder. Fantastisk kvalitet og merker stor forskjell i energi og fokus.
      Abonnementsordningen med personlig rådgiver er helt topp!"
      </p>
      </div>
      <div className="border-b pb-4">
      <div className="flex items-center gap-2 mb-2">
      <span className="font-semibold">Linda T.</span>
      <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
      <span className="text-sm text-gray-500">1 måned siden</span>
      </div>
      <p className="text-sm text-gray-700">
      "Prisen er høy, men kvaliteten er det også. Ashwagandha og magnesium har hjulpet enormt med stresset.
      Anbefaler til alle som tar helsen på alvor."
      </p>
      </div>
      <div>
      <div className="flex items-center gap-2 mb-2">
      <span className="font-semibold">Andreas K.</span>
      <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
      <span className="text-sm text-gray-500">2 uker siden</span>
      </div>
      <p className="text-sm text-gray-700">
      "Som idrettsutøver er jeg opptatt av kvalitet. Denne pakken leverer på alle fronter.
      CoQ10 og Lion's Mane gir meg den mentale skarphet jeg trenger."
      </p>
      </div>
      </div>
      </div>
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
      <h2 className="text-xl font-bold text-black mb-6">Andre helsepakker</h2>
      <div className="grid md:grid-cols-2 gap-6">
      <Link to="/bundle-starter-pakke" className="block border-2 border-gray-200 rounded-lg p-4 hover:border-black transition-colors">
      <div className="flex items-center gap-4">
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-3">
      <span className="text-2xl">🌱</span>
      </div>
      <div className="flex-1">
      <h3 className="font-semibold text-lg mb-1">Starter Helsepakke</h3>
      <p className="text-sm text-gray-600 mb-2">4 grunnleggende produkter for nybegynnere</p>
      <div className="flex items-center gap-2">
      <span className="text-lg font-bold">949 kr</span>
      <span className="text-sm text-gray-500 line-through">1.217 kr</span>
      <span className="text-red-600 text-sm">Spar 268 kr</span>
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