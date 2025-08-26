import { useState } from 'react';
import { Link } from 'react-router';
import LazyMDEditor from '../../../components/LazyMDEditor';
import { generateSlug } from '../../../utils/adminFunctions';

export default function AdminBloggRediger() {
  const [title, setTitle] = useState('Magnesium for bedre søvn');
  const [slug, setSlug] = useState('magnesium-sovn');
  const [content, setContent] = useState(`# Hvorfor er magnesium viktig for søvn?

Magnesium er et essensielt mineral som spiller en nøkkelrolle i over 300 enzymatiske reaksjoner i kroppen. En av de viktigste funksjonene er regulering av nervesystemet og søvnkvalitet.

## Magnesiums rolle i søvnregulering

Magnesium bidrar til søvn på flere måter:

- Regulerer melatoninproduksjonen
- Aktiverer det parasympatiske nervesystemet
- Reduserer kortisol (stresshormon)
- Binder seg til GABA-reseptorer for avslapning

## Tegn på magnesiummangel

Mange nordmenn har suboptimale magnesiumnivåer. Vanlige tegn inkluderer:

- Søvnproblemer og rastløshet
- Muskelkramper og spenninger
- Hodepine og migrene
- Angst og nervøsitet

## Beste magnesiumkilder

Du kan få magnesium gjennom kosten fra:

- Mørk bladgrønt (spinat, grønnkål)
- Nøtter og frø (mandler, gresskarfrø)
- Fullkorn og havre
- Mørk sjokolade (70%+)
- Avokado og bananer

## Magnesiumtilskudd for bedre søvn

For optimal søvnkvalitet anbefales magnesiumglysinat eller magnesiumcitrat. Disse formene har høy biotilgjengelighet og er skånsomme mot magen. Anbefalt dose er 200-400mg tatt 1-2 timer før sengetid.

**Merk:** Konsulter alltid lege før du starter med nye kosttilskudd, spesielt hvis du tar andre medisiner.`);

  const handleGenerateSlug = () => {
    const newSlug = generateSlug(title);
    setSlug(newSlug);
  };
  return (
    <div>
      <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
      <h1 className="text-2xl font-bold">Helsekost Admin</h1>
      <span className="text-gray-400">|</span>
      <span className="text-gray-300">Rediger artikkel</span>
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
      <Link to="/admin-blogg" className="sidebar-link bg-gray-700 text-white block p-3 rounded">
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
      <nav className="text-sm mb-6">
      <Link to="/admin-dashboard" className="text-gray-500 hover:text-black">Dashboard</Link>
      <span className="mx-2 text-gray-400">/</span>
      <Link to="/admin-blogg" className="text-gray-500 hover:text-black">Blogg</Link>
      <span className="mx-2 text-gray-400">/</span>
      <span className="text-black">Rediger artikkel</span>
      </nav>
      <div className="flex justify-between items-center mb-8">
      <div>
      <h2 className="text-3xl font-bold text-gray-800">Rediger artikkel</h2>
      <p className="text-gray-600 mt-2">Rediger og publiser bloggartikkel</p>
      </div>
      <div className="flex items-center space-x-4">
      <span className="status-badge status-published">
      ✓ Publisert
      </span>
      <button onClick={() => { alert('Forhåndsvisning åpnet i nytt vindu') }} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
      👁️ Forhåndsvis
      </button>
      <Link to="/admin-blogg" className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
      ← Tilbake til oversikt
      </Link>
      </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="space-y-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Tittel *</label>
      <input 
        type="text" 
        id="titleInput" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black" 
        required 
      />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">URL slug *</label>
      <div className="flex items-center space-x-2">
      <span className="text-gray-500">helsekost.no/blogg/</span>
      <input 
        type="text" 
        id="slugInput" 
        value={slug} 
        onChange={(e) => setSlug(e.target.value)}
        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black" 
        required 
      />
      <button onClick={handleGenerateSlug} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm">
      Auto-generer
      </button>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Artikkelinnhold</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Innhold</label>
        <div className="rich-text-editor">
          <LazyMDEditor
            value={content}
            onChange={(val) => setContent(val || '')}
            data-color-mode="light"
            height={500}
            preview="edit"
            visibleDragbar={false}
            textareaProps={{
              placeholder: 'Skriv artikkelinnholdet ditt her... Du kan bruke Markdown-formatering som **fet tekst**, *kursiv tekst*, # overskrifter, og lister.',
            }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 <strong>Tips:</strong> Bruk **fet tekst**, *kursiv*, # for overskrifter, - for punktlister, og [lenke](url) for lenker. Klikk "Preview" for å se hvordan artikkelen ser ut.
        </p>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Bildeadministrasjon</h3>
      <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Hovedbilde</label>
      <div className="image-upload-area" onClick={() => { alert('Åpner filvelger for bildeopplasting...') }}>
      <div className="text-4xl mb-2">💊</div>
      <p className="text-gray-600">Klikk for å laste opp eller dra og slipp</p>
      <p className="text-sm text-gray-500 mt-2">Anbefalt størrelse: 1200x630px</p>
      </div>
      <div className="mt-4">
      <label className="block text-sm text-gray-600 mb-1">Alt-tekst for hovedbilde</label>
      <input type="text" value="Magnesiumtilskudd for bedre søvnkvalitet" className="w-full px-3 py-2 border rounded-lg" />
      </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Artikkelbilder</label>
      <div className="grid grid-cols-3 gap-4">
      <div className="relative group">
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-3xl">🛏️</span>
      </div>
      <input type="text" placeholder="Alt-tekst" value="Kvinne som sover godt" className="mt-2 w-full px-2 py-1 text-sm border rounded" />
      <button className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
      </div>
      <div className="relative group">
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
      <span className="text-3xl">🥬</span>
      </div>
      <input type="text" placeholder="Alt-tekst" value="Magnesiumrike matvarer" className="mt-2 w-full px-2 py-1 text-sm border rounded" />
      <button className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
      </div>
      <div className="image-upload-area aspect-square flex items-center justify-center cursor-pointer" onClick={() => { alert('Legger til nytt bilde...') }}>
      <span className="text-2xl text-gray-400">+ Legg til</span>
      </div>
      </div>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">SEO-innstillinger</h3>
      <div className="space-y-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">SEO-tittel</label>
      <input type="text" value="Magnesium for bedre søvn: Komplett guide 2024" className="w-full px-4 py-2 border rounded-lg" maxLength={60} />
      <p className="text-xs text-gray-500 mt-1">60 tegn maks. Brukt: 45/60</p>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Meta-beskrivelse</label>
      <textarea rows={3} className="w-full px-4 py-2 border rounded-lg" maxLength={160}>Lær hvordan magnesium kan forbedre søvnkvaliteten din. Ekspertråd om dosering, beste magnesiumtyper og naturlige kilder.</textarea>
      <p className="text-xs text-gray-500 mt-1">160 tegn maks. Brukt: 124/160</p>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Fokus nøkkelord</label>
      <input type="text" value="magnesium søvn" className="w-full px-4 py-2 border rounded-lg" />
      <p className="text-xs text-gray-500 mt-1">Nøkkelordet brukes 5 ganger i artikkelen</p>
      </div>
      </div>
      </div>
      </div>
      <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Publisering</h3>
      <div className="space-y-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
      <select className="w-full px-4 py-2 border rounded-lg">
      <option selected={true}>Publisert</option>
      <option>Utkast</option>
      <option>Planlagt</option>
      <option>Under vurdering</option>
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Synlighet</label>
      <select className="w-full px-4 py-2 border rounded-lg">
      <option selected={true}>Offentlig</option>
      <option>Privat</option>
      <option>Passordsbeskyttet</option>
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Publiseringsdato</label>
      <input type="datetime-local" value="2024-10-05T10:00" className="w-full px-4 py-2 border rounded-lg" />
      </div>
      <div className="pt-4 border-t">
      <button onClick={() => { alert('Endringer lagret!') }} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium mb-3">
      💾 Lagre endringer
      </button>
      <button onClick={() => { alert('Lagret som utkast!') }} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg">
      📝 Lagre som utkast
      </button>
      </div>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Forfatter og kategori</h3>
      <div className="space-y-4">
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Forfatter</label>
      <select className="w-full px-4 py-2 border rounded-lg">
      <option>Dr. Erik Hansen</option>
      <option selected={true}>Dr. Maria Olsen</option>
      <option>Admin</option>
      <option>Gjesteskribent</option>
      </select>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
      <select className="w-full px-4 py-2 border rounded-lg">
      <option selected={true}>Kosttilskudd</option>
      <option>Ernæring</option>
      <option>Trening</option>
      <option>Helse</option>
      <option>Forskning</option>
      <option>Guider</option>
      </select>
      </div>
      </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Tags</h3>
      <div className="tag-input" id="tagInput">
      <span className="tag">
      magnesium
      <span className="tag-remove" onClick={() => alert('Remove tag')}>×</span>
      </span>
      <span className="tag">
      søvn
      <span className="tag-remove" onClick={() => alert('Remove tag')}>×</span>
      </span>
      <span className="tag">
      kosttilskudd
      <span className="tag-remove" onClick={() => alert('Remove tag')}>×</span>
      </span>
      <span className="tag">
      helse
      <span className="tag-remove" onClick={() => alert('Remove tag')}>×</span>
      </span>
      <input type="text" placeholder="Legg til tag..." className="flex-1 outline-none" onKeyPress={() => alert('Add tag function')} />
      </div>
      <p className="text-xs text-gray-500 mt-2">Trykk Enter for å legge til tag</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Tilleggsinnstillinger</h3>
      <div className="space-y-3">
      <label className="flex items-center">
      <input type="checkbox" className="mr-3 rounded" checked={true} />
      <span className="text-sm">Tillat kommentarer</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" className="mr-3 rounded" checked={true} />
      <span className="text-sm">Vis forfatterinfo</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" className="mr-3 rounded" />
      <span className="text-sm">Fremhevet artikkel</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" className="mr-3 rounded" checked={true} />
      <span className="text-sm">Vis relaterte artikler</span>
      </label>
      <label className="flex items-center">
      <input type="checkbox" className="mr-3 rounded" checked={true} />
      <span className="text-sm">Inkluder i RSS-feed</span>
      </label>
      </div>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
      <h4 className="font-medium mb-3">Hurtighandlinger</h4>
      <div className="space-y-2">
      <button onClick={() => { alert('Artikkel duplisert!') }} className="w-full text-left text-sm text-gray-700 hover:text-black">
      📋 Dupliser artikkel
      </button>
      <button onClick={() => { alert('Revisjon opprettet!') }} className="w-full text-left text-sm text-gray-700 hover:text-black">
      🔄 Opprett revisjon
      </button>
      <button onClick={() => { if(confirm('Er du sikker på at du vil slette denne artikkelen?')) alert('Artikkel flyttet til papirkurv!') }} className="w-full text-left text-sm text-red-600 hover:text-red-800">
      🗑️ Flytt til papirkurv
      </button>
      </div>
      </div>
      </div>
      </div>
      </main>
      </div>
      <div id="mobilePreviewModal" className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-8">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Mobil forhåndsvisning</h3>
      <button onClick={() => alert('Toggle mobile preview')} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      <div className="mobile-preview">
      <div className="mobile-preview-content">
      <h1 className="text-2xl font-bold mb-3">Magnesium for bedre søvn</h1>
      <p className="text-sm text-gray-600 mb-4">Av Dr. Maria Olsen • 5. oktober 2024</p>
      <div className="prose prose-sm">
      </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}