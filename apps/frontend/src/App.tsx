import { Routes, Route } from 'react-router';
import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLoading from './components/AdminLoading';

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

// Shop Pages
import Products from './pages/shop/Products';
import Kosttilskudd from './pages/shop/Kosttilskudd';
import YogaWellness from './pages/shop/YogaWellness';
import Categories from './pages/shop/Categories';
import Product from './pages/shop/Product';
import Search from './pages/shop/Search';

// Bundle Pages
import Bundles from './pages/shop/bundles/Bundles';
import BundleImmunforsvar from './pages/shop/bundles/BundleImmunforsvar';
import BundlePremiumHelse from './pages/shop/bundles/BundlePremiumHelse';
import BundleStarterPakke from './pages/shop/bundles/BundleStarterPakke';

// Cart & Checkout
import Handlekurv from './pages/cart/Handlekurv';
import Kasse from './pages/cart/Kasse';
import Betaling from './pages/cart/Betaling';
import Ordrebekreftelse from './pages/cart/Ordrebekreftelse';
// Auth Pages
import LoggInn from './pages/auth/LoggInn';
import Registrer from './pages/auth/Registrer';
import Account from './pages/auth/Account';
import AccountOrders from './pages/auth/AccountOrders';
import AccountFavorites from './pages/auth/AccountFavorites';
import AccountSubscriptions from './pages/auth/AccountSubscriptions';
import AccountAddresses from './pages/auth/AccountAddresses';
import ForgotPassword from './pages/auth/ForgotPassword';

// Legal Pages
import Vilkar from './pages/legal/Vilkar';
import Cookies from './pages/legal/Cookies';
import Personvern from './pages/legal/Personvern';
import Retur from './pages/legal/Retur';
import Frakt from './pages/legal/Frakt';
import FAQ from './pages/legal/FAQ';

// Marketing
import Kampanjer from './pages/marketing/Kampanjer';

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

// Dev Tools
import Utviklersystem from './pages/dev/Utviklersystem';
import ProsjektStatus from './pages/dev/ProsjektStatus';
import DevIndex from './pages/dev/DevIndex';
import SiteMap from './pages/dev/SiteMap';
import StripeTest from './pages/dev/StripeTest';
import CartTest from './components/CartTest';

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
            <Route path="/produkter" element={<Products />} />
            <Route path="/kosttilskudd" element={<Kosttilskudd />} />
            <Route path="/yoga-wellness" element={<YogaWellness />} />
            <Route path="/kategorier" element={<Categories />} />
            <Route path="/produkt/:id" element={<Product />} />
            <Route path="/search" element={<Search />} />
            
            {/* Bundle Pages */}
            <Route path="/bundles" element={<Bundles />} />
            <Route path="/bundle/immunforsvar" element={<BundleImmunforsvar />} />
            <Route path="/bundle/premium-helse" element={<BundlePremiumHelse />} />
            <Route path="/bundle/starter-pakke" element={<BundleStarterPakke />} />
            
            {/* Cart & Checkout Flow */}
            <Route path="/handlekurv" element={<Handlekurv />} />
            <Route path="/kasse" element={<Kasse />} />
            <Route path="/betaling" element={<Betaling />} />
            <Route path="/ordrebekreftelse" element={<Ordrebekreftelse />} />
            
            {/* Auth Pages */}
            <Route path="/logg-inn" element={<LoggInn />} />
            <Route path="/registrer" element={<Registrer />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/account" element={<ProtectedRoute requireAuth={true}><Account /></ProtectedRoute>} />
            <Route path="/account/orders" element={<ProtectedRoute requireAuth={true}><AccountOrders /></ProtectedRoute>} />
            <Route path="/account/favorites" element={<ProtectedRoute requireAuth={true}><AccountFavorites /></ProtectedRoute>} />
            <Route path="/account/subscriptions" element={<ProtectedRoute requireAuth={true}><AccountSubscriptions /></ProtectedRoute>} />
            <Route path="/account/addresses" element={<ProtectedRoute requireAuth={true}><AccountAddresses /></ProtectedRoute>} />
            
            {/* Legal Pages */}
            <Route path="/vilkar" element={<Vilkar />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/personvern" element={<Personvern />} />
            <Route path="/retur" element={<Retur />} />
            <Route path="/frakt" element={<Frakt />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Marketing */}
            <Route path="/kampanjer" element={<Kampanjer />} />
            
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
            <Route path="/dev-index" element={<DevIndex />} />
            <Route path="/site-map" element={<SiteMap />} />
            <Route path="/utviklersystem" element={<Utviklersystem />} />
            <Route path="/cart-test" element={<CartTest />} />
            <Route path="/prosjekt-status" element={<ProsjektStatus />} />
            <Route path="/stripe-test" element={<StripeTest />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;