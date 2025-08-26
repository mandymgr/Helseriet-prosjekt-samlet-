import { Routes, Route } from 'react-router';
import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLoading from './components/AdminLoading';
import PageLoading from './components/PageLoading';

// Content Pages
import Home from './pages/content/Home';
import Blog from './pages/content/Blog';
import BlogArticle from './pages/content/BlogArticle';
import OmOss from './pages/content/OmOss';
import Kontakt from './pages/content/Kontakt';
import Philosophy from './pages/content/Philosophy';
import Specialist from './pages/content/Specialist';
import AIChat from './pages/content/AIChat';
import Avbestilling from './pages/content/Avbestilling';
import Ekspertrad from './pages/content/Ekspertrad';

// Shop Pages - Lazy load for better performance
const Products = lazy(() => import('./pages/shop/Products'));
const Kosttilskudd = lazy(() => import('./pages/shop/Kosttilskudd'));
const YogaWellness = lazy(() => import('./pages/shop/YogaWellness'));
const Categories = lazy(() => import('./pages/shop/Categories'));
const Product = lazy(() => import('./pages/shop/Product'));
const Search = lazy(() => import('./pages/shop/Search'));

// Bundle Pages - Lazy load
const Bundles = lazy(() => import('./pages/shop/bundles/Bundles'));
const BundleImmunforsvar = lazy(() => import('./pages/shop/bundles/BundleImmunforsvar'));
const BundlePremiumHelse = lazy(() => import('./pages/shop/bundles/BundlePremiumHelse'));
const BundleStarterPakke = lazy(() => import('./pages/shop/bundles/BundleStarterPakke'));

// Cart & Checkout - Lazy load
const Handlekurv = lazy(() => import('./pages/cart/Handlekurv'));
const Kasse = lazy(() => import('./pages/cart/Kasse'));
const Betaling = lazy(() => import('./pages/cart/Betaling'));
const Ordrebekreftelse = lazy(() => import('./pages/cart/Ordrebekreftelse'));

// Auth Pages - Lazy load
const LoggInn = lazy(() => import('./pages/auth/LoggInn'));
const Registrer = lazy(() => import('./pages/auth/Registrer'));
const Account = lazy(() => import('./pages/auth/Account'));
const AccountOrders = lazy(() => import('./pages/auth/AccountOrders'));
const AccountFavorites = lazy(() => import('./pages/auth/AccountFavorites'));
const AccountSubscriptions = lazy(() => import('./pages/auth/AccountSubscriptions'));
const AccountAddresses = lazy(() => import('./pages/auth/AccountAddresses'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

// Legal Pages - Lazy load
const Vilkar = lazy(() => import('./pages/legal/Vilkar'));
const Cookies = lazy(() => import('./pages/legal/Cookies'));
const Personvern = lazy(() => import('./pages/legal/Personvern'));
const Retur = lazy(() => import('./pages/legal/Retur'));
const Frakt = lazy(() => import('./pages/legal/Frakt'));
const FAQ = lazy(() => import('./pages/legal/FAQ'));

// Marketing - Lazy load
const Kampanjer = lazy(() => import('./pages/marketing/Kampanjer'));

// Admin Pages - Lazy Loaded for Performance
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProdukter = lazy(() => import('./pages/admin/products/AdminProdukter'));
const AdminOrdrer = lazy(() => import('./pages/admin/orders/AdminOrdrer'));
const AdminKunder = lazy(() => import('./pages/admin/customers/AdminKunder'));
const AdminBlogg = lazy(() => import('./pages/admin/content/AdminBlogg'));
const AdminBloggRediger = lazy(() => import('./pages/admin/content/AdminBloggRediger'));
const AdminAnnonser = lazy(() => import('./pages/admin/content/AdminAnnonser'));
const AdminEkspertrad = lazy(() => import('./pages/admin/content/AdminEkspertrad'));
const AdminKampanjer = lazy(() => import('./pages/admin/marketing/AdminKampanjer'));
const AdminAnalyser = lazy(() => import('./pages/admin/analytics/AdminAnalyser'));
const AdminRapport = lazy(() => import('./pages/admin/analytics/AdminRapport'));
const AdminInnstillinger = lazy(() => import('./pages/admin/settings/AdminInnstillinger'));
const AdminForsideinnstillinger = lazy(() => import('./pages/admin/settings/AdminForsideinnstillinger'));
const AdminSikkerhet = lazy(() => import('./pages/admin/settings/AdminSikkerhet'));

// Dev Tools - Lazy load (not needed in production)
const Utviklersystem = lazy(() => import('./pages/dev/Utviklersystem'));
const ProsjektStatus = lazy(() => import('./pages/dev/ProsjektStatus'));
const DevIndex = lazy(() => import('./pages/dev/DevIndex'));
const SiteMap = lazy(() => import('./pages/dev/SiteMap'));
const StripeTest = lazy(() => import('./pages/dev/StripeTest'));
const CartTest = lazy(() => import('./components/CartTest'));

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <div className="bg-white min-h-screen">
        <Navbar />
        <main>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* Content Pages */}
            <Route path="/blogg" element={<Blog />} />
            <Route path="/blogg/:id" element={<BlogArticle />} />
            <Route path="/om-oss" element={<OmOss />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/filosofi" element={<Philosophy />} />
            <Route path="/spesialist" element={<Specialist />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/avbestilling" element={<Avbestilling />} />
            <Route path="/ekspertrad" element={<Ekspertrad />} />
            
            {/* Shop Pages */}
            <Route path="/produkter" element={<Suspense fallback={<PageLoading />}><Products /></Suspense>} />
            <Route path="/kosttilskudd" element={<Suspense fallback={<PageLoading />}><Kosttilskudd /></Suspense>} />
            <Route path="/yoga-wellness" element={<Suspense fallback={<PageLoading />}><YogaWellness /></Suspense>} />
            <Route path="/kategorier" element={<Suspense fallback={<PageLoading />}><Categories /></Suspense>} />
            <Route path="/produkt/:id" element={<Suspense fallback={<PageLoading />}><Product /></Suspense>} />
            <Route path="/search" element={<Suspense fallback={<PageLoading />}><Search /></Suspense>} />
            
            {/* Bundle Pages */}
            <Route path="/bundles" element={<Suspense fallback={<PageLoading />}><Bundles /></Suspense>} />
            <Route path="/bundle/immunforsvar" element={<Suspense fallback={<PageLoading />}><BundleImmunforsvar /></Suspense>} />
            <Route path="/bundle/premium-helse" element={<Suspense fallback={<PageLoading />}><BundlePremiumHelse /></Suspense>} />
            <Route path="/bundle/starter-pakke" element={<Suspense fallback={<PageLoading />}><BundleStarterPakke /></Suspense>} />
            
            {/* Cart & Checkout Flow */}
            <Route path="/handlekurv" element={<Suspense fallback={<PageLoading />}><Handlekurv /></Suspense>} />
            <Route path="/kasse" element={<Suspense fallback={<PageLoading />}><Kasse /></Suspense>} />
            <Route path="/betaling" element={<Suspense fallback={<PageLoading />}><Betaling /></Suspense>} />
            <Route path="/ordrebekreftelse" element={<Suspense fallback={<PageLoading />}><Ordrebekreftelse /></Suspense>} />
            
            {/* Auth Pages */}
            <Route path="/logg-inn" element={<Suspense fallback={<PageLoading />}><LoggInn /></Suspense>} />
            <Route path="/registrer" element={<Suspense fallback={<PageLoading />}><Registrer /></Suspense>} />
            <Route path="/forgot-password" element={<Suspense fallback={<PageLoading />}><ForgotPassword /></Suspense>} />
            <Route path="/account" element={<ProtectedRoute requireAuth={true}><Suspense fallback={<PageLoading />}><Account /></Suspense></ProtectedRoute>} />
            <Route path="/account/orders" element={<ProtectedRoute requireAuth={true}><Suspense fallback={<PageLoading />}><AccountOrders /></Suspense></ProtectedRoute>} />
            <Route path="/account/favorites" element={<ProtectedRoute requireAuth={true}><Suspense fallback={<PageLoading />}><AccountFavorites /></Suspense></ProtectedRoute>} />
            <Route path="/account/subscriptions" element={<ProtectedRoute requireAuth={true}><Suspense fallback={<PageLoading />}><AccountSubscriptions /></Suspense></ProtectedRoute>} />
            <Route path="/account/addresses" element={<ProtectedRoute requireAuth={true}><Suspense fallback={<PageLoading />}><AccountAddresses /></Suspense></ProtectedRoute>} />
            
            {/* Legal Pages */}
            <Route path="/vilkar" element={<Suspense fallback={<PageLoading />}><Vilkar /></Suspense>} />
            <Route path="/cookies" element={<Suspense fallback={<PageLoading />}><Cookies /></Suspense>} />
            <Route path="/personvern" element={<Suspense fallback={<PageLoading />}><Personvern /></Suspense>} />
            <Route path="/retur" element={<Suspense fallback={<PageLoading />}><Retur /></Suspense>} />
            <Route path="/frakt" element={<Suspense fallback={<PageLoading />}><Frakt /></Suspense>} />
            <Route path="/faq" element={<Suspense fallback={<PageLoading />}><FAQ /></Suspense>} />
            
            {/* Marketing */}
            <Route path="/kampanjer" element={<Suspense fallback={<PageLoading />}><Kampanjer /></Suspense>} />
            
            {/* Admin Routes - Lazy Loaded with Suspense */}
            <Route path="/admin/login" element={
              <Suspense fallback={<AdminLoading />}>
                <AdminLogin />
              </Suspense>
            } />
            <Route path="/admin" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/dashboard" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/produkter" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminProdukter /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/ordrer" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminOrdrer /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/kunder" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminKunder /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/blogg" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminBlogg /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/blogg/rediger/:id?" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminBloggRediger /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/annonser" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminAnnonser /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/ekspertrad" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminEkspertrad /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/kampanjer" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminKampanjer /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/analyser" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminAnalyser /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/rapport" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminRapport /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/innstillinger" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminInnstillinger /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/forside-innstillinger" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminForsideinnstillinger /></ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin/sikkerhet" element={
              <Suspense fallback={<AdminLoading />}>
                <ProtectedRoute requireAdmin={true}><AdminSikkerhet /></ProtectedRoute>
              </Suspense>
            } />
            
            {/* Dev Tools */}
            <Route path="/dev-index" element={<Suspense fallback={<PageLoading />}><DevIndex /></Suspense>} />
            <Route path="/site-map" element={<Suspense fallback={<PageLoading />}><SiteMap /></Suspense>} />
            <Route path="/utviklersystem" element={<Suspense fallback={<PageLoading />}><Utviklersystem /></Suspense>} />
            <Route path="/cart-test" element={<Suspense fallback={<PageLoading />}><CartTest /></Suspense>} />
            <Route path="/prosjekt-status" element={<Suspense fallback={<PageLoading />}><ProsjektStatus /></Suspense>} />
            <Route path="/stripe-test" element={<Suspense fallback={<PageLoading />}><StripeTest /></Suspense>} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;