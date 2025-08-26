import { Link } from 'react-router';
import { showSection, saveSettings } from '../../../utils/adminFunctions';

export default function AdminInnstillinger() {
  return (
    <div>
      <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
      <h1 className="text-2xl font-bold">Helsekost Admin</h1>
      <span className="text-gray-400">|</span>
      <span className="text-gray-300">Innstillinger</span>
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
      <Link to="/admin-innstillinger" className="sidebar-link bg-gray-700 text-white block p-3 rounded">
      ⚙️ Innstillinger
      </Link>
      </li>
      </ul>
      </nav>
      </aside>
      <main className="flex-1 p-8">
      <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Systeminnstillinger</h2>
      <p className="text-gray-600">Konfigurer nettbutikkens innstillinger og preferanser</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex space-x-4 overflow-x-auto">
      <button onClick={() => { showSection('general') }} className="settings-nav px-4 py-2 rounded hover:bg-gray-100 font-medium" id="nav-general">
      🏪 Generelt
      </button>
      <button onClick={() => { showSection('payment') }} className="settings-nav px-4 py-2 rounded hover:bg-gray-100" id="nav-payment">
      💳 Betaling
      </button>
      <button onClick={() => { showSection('shipping') }} className="settings-nav px-4 py-2 rounded hover:bg-gray-100" id="nav-shipping">
      🚚 Frakt
      </button>
      <button onClick={() => { showSection('email') }} className="settings-nav px-4 py-2 rounded hover:bg-gray-100" id="nav-email">
      ✉️ E-post
      </button>
      <button onClick={() => { showSection('users') }} className="settings-nav px-4 py-2 rounded hover:bg-gray-100" id="nav-users">
      👥 Brukere
      </button>
      <button onClick={() => { showSection('security') }} className="settings-nav px-4 py-2 rounded hover:bg-gray-100" id="nav-security">
      🔒 Sikkerhet
      </button>
      <button onClick={() => { showSection('integrations') }} className="settings-nav px-4 py-2 rounded hover:bg-gray-100" id="nav-integrations">
      🔌 Integrasjoner
      </button>
      </div>
      </div>
      <div id="section-general" className="settings-section bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-6">Generelle innstillinger</h3>
      <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Butikknavn</label>
      <input type="text" value="Helsekost" className="w-full p-2 border rounded-lg" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Kontakt e-post</label>
      <input type="email" value="post@helsekost.no" className="w-full p-2 border rounded-lg" />
      </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Butikkbeskrivelse</label>
      <textarea className="w-full p-2 border rounded-lg" rows={3}>Norges ledende nettbutikk for helsekost og kosttilskudd</textarea>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Telefonnummer</label>
      <input type="tel" value="+47 12 34 56 78" className="w-full p-2 border rounded-lg" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Organisasjonsnummer</label>
      <input type="text" value="123 456 789 MVA" className="w-full p-2 border rounded-lg" />
      </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Butikkadresse</label>
      <input type="text" value="Helseveien 1, 0001 Oslo" className="w-full p-2 border rounded-lg mb-2" />
      <input type="text" value="Norge" className="w-full p-2 border rounded-lg" />
      </div>
      <div className="border-t pt-4">
      <h4 className="font-medium mb-3">Butikkinnstillinger</h4>
      <div className="space-y-3">
      <label className="flex items-center">
      <input type="checkbox" checked={true} className="mr-2" />
      <span>Vis lagerstatuser på produkter</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" checked={true} className="mr-2" />
      <span>Tillat gjestekjøp (uten registrering)</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" checked={true} className="mr-2" />
      <span>Send ordrebekreftelse automatisk</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" className="mr-2" />
      <span>Vedlikeholdsmodus (kun admin har tilgang)</span>
      </label>
      </div>
      </div>
      </div>
      </div>
      <div id="section-payment" className="settings-section bg-white rounded-lg shadow p-6 hidden">
      <h3 className="text-xl font-semibold mb-6">Betalingsinnstillinger</h3>
      <div className="space-y-6">
      <div>
      <h4 className="font-medium mb-3">Aktive betalingsmetoder</h4>
      <div className="space-y-3">
      <div className="border rounded-lg p-4">
      <label className="flex items-center justify-between">
      <div className="flex items-center">
      <input type="checkbox" checked={true} className="mr-3" />
      <div>
      <p className="font-medium">Vipps</p>
      <p className="text-sm text-gray-600">Rask og enkel betaling</p>
      </div>
      </div>
      <button className="text-blue-600 hover:text-blue-800">Konfigurer</button>
      </label>
      </div>
      <div className="border rounded-lg p-4">
      <label className="flex items-center justify-between">
      <div className="flex items-center">
      <input type="checkbox" checked={true} className="mr-3" />
      <div>
      <p className="font-medium">Kort (Stripe)</p>
      <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
      </div>
      </div>
      <button className="text-blue-600 hover:text-blue-800">Konfigurer</button>
      </label>
      </div>
      <div className="border rounded-lg p-4">
      <label className="flex items-center justify-between">
      <div className="flex items-center">
      <input type="checkbox" checked={true} className="mr-3" />
      <div>
      <p className="font-medium">Klarna</p>
      <p className="text-sm text-gray-600">Faktura og delbetaling</p>
      </div>
      </div>
      <button className="text-blue-600 hover:text-blue-800">Konfigurer</button>
      </label>
      </div>
      <div className="border rounded-lg p-4">
      <label className="flex items-center justify-between">
      <div className="flex items-center">
      <input type="checkbox" className="mr-3" />
      <div>
      <p className="font-medium">PayPal</p>
      <p className="text-sm text-gray-600">Internasjonal betaling</p>
      </div>
      </div>
      <button className="text-blue-600 hover:text-blue-800">Konfigurer</button>
      </label>
      </div>
      </div>
      </div>
      <div>
      <h4 className="font-medium mb-3">Valutainnstillinger</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Hovedvaluta</label>
      <select className="w-full p-2 border rounded-lg">
      <option selected={true}>NOK - Norske kroner</option>
      <option>EUR - Euro</option>
      <option>USD - US Dollar</option>
      <option>SEK - Svenske kroner</option>
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Desimaler</label>
      <select className="w-full p-2 border rounded-lg">
      <option>0</option>
      <option selected={true}>2</option>
      </select>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div id="section-shipping" className="settings-section bg-white rounded-lg shadow p-6 hidden">
      <h3 className="text-xl font-semibold mb-6">Fraktinnstillinger</h3>
      <div className="space-y-6">
      <div>
      <h4 className="font-medium mb-3">Fraktmetoder</h4>
      <div className="space-y-3">
      <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
      <div>
      <p className="font-medium">Standard frakt</p>
      <p className="text-sm text-gray-600">2-5 virkedager</p>
      </div>
      <div className="text-right">
      <p className="font-medium">Kr 49</p>
      <p className="text-sm text-gray-600">Gratis over Kr 500</p>
      </div>
      </div>
      </div>
      <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
      <div>
      <p className="font-medium">Ekspress frakt</p>
      <p className="text-sm text-gray-600">1-2 virkedager</p>
      </div>
      <div className="text-right">
      <p className="font-medium">Kr 99</p>
      </div>
      </div>
      </div>
      <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
      <div>
      <p className="font-medium">Henting i butikk</p>
      <p className="text-sm text-gray-600">Samme dag</p>
      </div>
      <div className="text-right">
      <p className="font-medium">Gratis</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div>
      <h4 className="font-medium mb-3">Fraktsoner</h4>
      <div className="border rounded-lg p-4">
      <p className="font-medium mb-2">Norge</p>
      <p className="text-sm text-gray-600">Alle postnummer</p>
      </div>
      <button className="mt-3 text-blue-600 hover:text-blue-800">+ Legg til fraktsone</button>
      </div>
      </div>
      </div>
      <div id="section-email" className="settings-section bg-white rounded-lg shadow p-6 hidden">
      <h3 className="text-xl font-semibold mb-6">E-postinnstillinger</h3>
      <div className="space-y-6">
      <div>
      <h4 className="font-medium mb-3">E-postmaler</h4>
      <div className="space-y-3">
      <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
      <p className="font-medium">Ordrebekreftelse</p>
      <p className="text-sm text-gray-600">Sendes når en ordre er bekreftet</p>
      </div>
      <button className="text-blue-600 hover:text-blue-800">Rediger mal</button>
      </div>
      <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
      <p className="font-medium">Forsendelse sendt</p>
      <p className="text-sm text-gray-600">Sendes når ordre er sendt</p>
      </div>
      <button className="text-blue-600 hover:text-blue-800">Rediger mal</button>
      </div>
      <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
      <p className="font-medium">Velkommen</p>
      <p className="text-sm text-gray-600">Sendes til nye kunder</p>
      </div>
      <button className="text-blue-600 hover:text-blue-800">Rediger mal</button>
      </div>
      <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
      <p className="font-medium">Forlatt handlekurv</p>
      <p className="text-sm text-gray-600">Påminnelse om ufullførte kjøp</p>
      </div>
      <button className="text-blue-600 hover:text-blue-800">Rediger mal</button>
      </div>
      </div>
      </div>
      <div>
      <h4 className="font-medium mb-3">SMTP-innstillinger</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
      <input type="text" value="smtp.gmail.com" className="w-full p-2 border rounded-lg" />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
      <input type="text" value="587" className="w-full p-2 border rounded-lg" />
      </div>
      </div>
      </div>
      </div>
      </div>
      <div id="section-users" className="settings-section bg-white rounded-lg shadow p-6 hidden">
      <h3 className="text-xl font-semibold mb-6">Brukeradministrasjon</h3>
      <div className="space-y-6">
      <div className="flex justify-between items-center">
      <h4 className="font-medium">Admin-brukere</h4>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      + Ny bruker
      </button>
      </div>
      <div className="overflow-x-auto">
      <table className="min-w-full">
      <thead className="border-b">
      <tr>
      <th className="text-left py-2">Navn</th>
      <th className="text-left py-2">E-post</th>
      <th className="text-left py-2">Rolle</th>
      <th className="text-left py-2">Status</th>
      <th className="text-left py-2">Handlinger</th>
      </tr>
      </thead>
      <tbody>
      <tr className="border-b">
      <td className="py-3">Admin Bruker</td>
      <td className="py-3">admin@helsekost.no</td>
      <td className="py-3">Superadmin</td>
      <td className="py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Aktiv</span></td>
      <td className="py-3">
      <button className="text-blue-600 hover:text-blue-800 mr-3">Rediger</button>
      </td>
      </tr>
      <tr className="border-b">
      <td className="py-3">Support Team</td>
      <td className="py-3">support@helsekost.no</td>
      <td className="py-3">Support</td>
      <td className="py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Aktiv</span></td>
      <td className="py-3">
      <button className="text-blue-600 hover:text-blue-800 mr-3">Rediger</button>
      <button className="text-red-600 hover:text-red-800">Deaktiver</button>
      </td>
      </tr>
      <tr className="border-b">
      <td className="py-3">Lager Manager</td>
      <td className="py-3">lager@helsekost.no</td>
      <td className="py-3">Lager</td>
      <td className="py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Aktiv</span></td>
      <td className="py-3">
      <button className="text-blue-600 hover:text-blue-800 mr-3">Rediger</button>
      <button className="text-red-600 hover:text-red-800">Deaktiver</button>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      <div>
      <h4 className="font-medium mb-3">Roller og tillatelser</h4>
      <div className="space-y-2">
      <div className="border rounded-lg p-3">
      <p className="font-medium">Superadmin</p>
      <p className="text-sm text-gray-600">Full tilgang til alle funksjoner</p>
      </div>
      <div className="border rounded-lg p-3">
      <p className="font-medium">Support</p>
      <p className="text-sm text-gray-600">Ordre, kunder og ekspertråd</p>
      </div>
      <div className="border rounded-lg p-3">
      <p className="font-medium">Lager</p>
      <p className="text-sm text-gray-600">Produkter og lagerstyring</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div id="section-security" className="settings-section bg-white rounded-lg shadow p-6 hidden">
      <h3 className="text-xl font-semibold mb-6">Sikkerhetsinnstillinger</h3>
      <div className="space-y-6">
      <div>
      <h4 className="font-medium mb-3">Passordpolicy</h4>
      <div className="space-y-3">
      <label className="flex items-center">
      <input type="checkbox" checked={true} className="mr-2" />
      <span>Krev minimum 8 tegn</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" checked={true} className="mr-2" />
      <span>Krev store og små bokstaver</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" checked={true} className="mr-2" />
      <span>Krev minst ett tall</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" className="mr-2" />
      <span>Krev spesialtegn</span>
      </label>
      </div>
      </div>
      <div>
      <h4 className="font-medium mb-3">Innloggingssikkerhet</h4>
      <div className="space-y-3">
      <label className="flex items-center">
      <input type="checkbox" checked={true} className="mr-2" />
      <span>Aktiver to-faktor autentisering</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" checked={true} className="mr-2" />
      <span>Lås konto etter 5 mislykkede innlogginger</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" className="mr-2" />
      <span>Krev CAPTCHA ved innlogging</span>
      </label>
      </div>
      </div>
      <div>
      <h4 className="font-medium mb-3">SSL-sertifikat</h4>
      <div className="border rounded-lg p-4 bg-green-50">
      <div className="flex items-center">
      <span className="text-2xl mr-3">🔒</span>
      <div>
      <p className="font-medium text-green-800">SSL aktivt</p>
      <p className="text-sm text-green-600">Utløper: 15. desember 2025</p>
      </div>
      </div>
      </div>
      </div>
      <div>
      <h4 className="font-medium mb-3">Backup</h4>
      <div className="border rounded-lg p-4">
      <p className="mb-3">Automatisk backup kjører daglig kl. 03:00</p>
      <p className="text-sm text-gray-600 mb-3">Siste backup: I dag kl. 03:00</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Kjør backup nå
      </button>
      </div>
      </div>
      </div>
      </div>
      <div id="section-integrations" className="settings-section bg-white rounded-lg shadow p-6 hidden">
      <h3 className="text-xl font-semibold mb-6">Integrasjoner</h3>
      <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
      <h4 className="font-medium">Google Analytics</h4>
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Tilkoblet</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Spor besøkende og konverteringer</p>
      <button className="text-blue-600 hover:text-blue-800">Innstillinger</button>
      </div>
      <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
      <h4 className="font-medium">Facebook Pixel</h4>
      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">Ikke tilkoblet</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Spor konverteringer fra Facebook</p>
      <button className="text-blue-600 hover:text-blue-800">Koble til</button>
      </div>
      <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
      <h4 className="font-medium">Mailchimp</h4>
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Tilkoblet</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">E-postmarkedsføring</p>
      <button className="text-blue-600 hover:text-blue-800">Innstillinger</button>
      </div>
      <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
      <h4 className="font-medium">Trustpilot</h4>
      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">Ikke tilkoblet</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Kundeomtaler</p>
      <button className="text-blue-600 hover:text-blue-800">Koble til</button>
      </div>
      </div>
      <div>
      <h4 className="font-medium mb-3">API-nøkler</h4>
      <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
      <div>
      <p className="font-medium">REST API</p>
      <p className="text-sm text-gray-600">For tilgang til butikkdata</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Generer ny nøkkel
      </button>
      </div>
      <div className="bg-gray-100 p-3 rounded font-mono text-sm">
      sk_live_****************abcd
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="mt-8 flex justify-end">
      <button onClick={() => { saveSettings() }} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
      Lagre endringer
      </button>
      </div>
      </main>
      </div>
    </div>
  );
}