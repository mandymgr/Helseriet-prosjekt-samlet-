# Helseriet E-commerce Platform

> **🚨 VIKTIG**: Les alltid `PROJECT_STATUS.md` FØRST før du starter arbeid for å vite nøyaktig hvor prosjektet står!

## 🎯 Development Philosophy & Core Principles

### ALLTID BEST LØSNING PRINSIPPET
**Vi jobber alltid mot den beste, mest komplette løsningen - aldri halvveis!**

**Viktige prinsipper:**
- ✅ **ALDRI ekskluder filer eller hopp over problemer** - Vi fikser alt ordentlig
- ✅ **FERDIGSTILL hver oppgave fullstendig** før vi går videre til neste
- ✅ **LØSE problemer når de oppstår** - ikke midlertidige workarounds
- ✅ **PERFEKT implementering** - ikke "funker sånn noenlunde"
- ✅ **SYSTEMET SKAL VÆRE BEDRE ENN ALLE ANDRE** - høyeste kvalitet
- ⛔ **IKKE droppe ting fordi det stopper opp** - press gjennom til løsning

**Når problemer oppstår:**
1. Analyser problemet grundig
2. Finn rot-årsaken, ikke bare symptomene  
3. Implementer en komplett, elegant løsning
4. Test at alt fungerer perfekt
5. Dokumenter løsningen for fremtiden

**Eksempel på riktig tilnærming:**
- ❌ Feil: "La oss ekskludere CartTest.tsx fra TypeScript midlertidig"
- ✅ Riktig: "La oss finne og fikse TypeScript-feilen i CartTest.tsx ordentlig"

## Project Overview
Helseriet is a Norwegian e-commerce platform specializing in health and wellness products. The platform features a React/TypeScript frontend with a Node.js/Express backend and PostgreSQL database with Prisma ORM.

## Architecture
```
helseriet-projekt/
├── helseriet-frontend/     # React/TypeScript frontend (Vite)
│   ├── src/hooks/          # Custom React hooks for business logic
│   ├── src/context/        # React Context for global state
│   ├── src/components/     # Reusable UI components
│   └── src/services/       # API service layer
├── helseriet-backend/      # Node.js/Express backend
│   ├── src/services/       # Business logic services
│   ├── src/controllers/    # HTTP request handlers
│   └── src/middleware/     # Express middleware
└── (removed shared-types/)  # Now using local type definitions
```

## Development Setup
**Frontend**: http://localhost:5173 (Vite dev server)
**Backend**: http://localhost:3001 (Express API)
**Database**: Railway PostgreSQL with Prisma Studio on http://localhost:5555

### Start Commands
```bash
# ⚠️ VIKTIG: Bruk disse kommandoene for å unngå duplikate prosesser

# Ren oppstart (anbefalt)
npm run start:clean

# Eller manuelt:
npm run cleanup          # Stopp alle duplikate prosesser
npm run dev:frontend     # Start kun frontend  
npm run dev:backend      # Start kun backend

# Legacy kommandoer (kan skape duplikater):
cd helseriet-frontend && npm run dev
cd helseriet-backend && npm run dev

# Database Studio
npx prisma studio --browser=none

# No longer needed - using local types
# cd shared-types && npm run build
```

### System Cleanup
```bash
# Sjekk antall aktive prosesser
npm run check:processes

# Stopp alle duplikate prosesser
npm run cleanup

# Eller kjør cleanup script direkte
./scripts/cleanup.sh
```

## Design System (MANDATORY STANDARDS)

**⚠️ CRITICAL**: All new components MUST follow these design standards. 

### **MANDATORY Frontend Design References**
**ALWAYS check these files before any frontend work:**
- `/helseriet-frontend/src/pages/dev/Utviklersystem.tsx` - Complete design system documentation with live examples
- `/helseriet-frontend/src/pages/dev/ProsjektStatus.tsx` - Project status with design consistency examples

These files contain the definitive design patterns, color schemes, typography, and component standards that MUST be followed.

### Brand Colors (NEVER DEVIATE)
- **Primary**: `sage` (#9CAF88) - Main brand color
- **Secondary**: `terracotta` (#D4A574) - Accent color  
- **Base**: `charcoal`, `warm_white`, `cream`, `stone_light`

**FORBIDDEN**: Never use orange, blue, or generic colors. Always use brand palette.

### Typography Hierarchy (STRICT)
```css
/* Headers (serif font family) */
.text-responsive-h1 { font-family: ui-serif, Georgia, Cambria, serif; }
.text-responsive-h2 { font-family: ui-serif, Georgia, Cambria, serif; }
.text-responsive-h3 { font-family: ui-serif, Georgia, Cambria, serif; }

/* Body text */
.text-responsive-body { font-family: Inter, sans-serif; }
```

### Standard Component Classes (MANDATORY)
- `organic-border` - Rounded, organic border styling (required for all cards)
- `minimal-shadow` - Subtle shadow effects (required for elevated elements)
- `card-inner` - Internal card padding and spacing
- `section-spacing` - Consistent section margins
- `page-header` - Standard page header styling
- `btn-ghost` - Ghost button styling (primary button style)
- `group-hover:` - Consistent hover states for interactive elements

### Layout Standards (ENFORCED)
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section spacing**: `section-spacing` class or `py-16 lg:py-24`
- **Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`
- **Cards**: Always use `organic-border minimal-shadow` classes

### Interactive States (REQUIRED)
- **Hover**: Subtle scale/shadow effects using `hover:scale-[1.02] transition-all duration-300`
- **Focus**: Sage color focus rings: `focus:ring-2 focus:ring-sage focus:ring-offset-2`
- **Loading**: Use consistent loading spinners and skeleton states
- **Disabled**: `disabled:opacity-50 disabled:cursor-not-allowed`

### Component Architecture (STANDARD)
```typescript
// All components must follow this structure:
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  // Specific props...
}

const Component: React.FC<ComponentProps> = ({ 
  className = "", 
  children,
  ...props 
}) => {
  return (
    <div className={`organic-border minimal-shadow ${className}`} {...props}>
      {/* Component content using design tokens */}
    </div>
  );
};
```

### Development Standards (NON-NEGOTIABLE)
1. **Always check**: `/src/pages/dev/Utviklersystem.tsx` for live design examples
2. **Never create**: Components without following brand guidelines
3. **Always use**: Design tokens from the established system
4. **Maintain**: Consistent spacing, typography, and color usage
5. **Test**: All components against design system standards

## Frontend Architecture (NEW)

### Custom Hooks System
The frontend now uses a comprehensive custom hooks system for business logic separation:

- **`useProducts`** - Product data fetching and state management
- **`useProductFilters`** - Advanced filtering and sorting logic  
- **`useSearch`** - Debounced search with accessibility announcements
- **`useLoadingState`** - Centralized loading state management
- **`useAnnouncement`** - Screen reader announcements for accessibility
- **`useProductPage`** - Complete page-level logic composition
- **`useDebounce`** - Generic debouncing utility
- **`useLocalStorage`** - Type-safe localStorage management

### Global State Management
- **`AppContext`** - React Context for global application state
- Manages user authentication, cart, favorites, and notifications
- Includes action creators for convenient state updates
- Persists cart and favorites to localStorage

### Reusable UI Components
- **Loading States**: `LoadingSpinner`, `FullPageLoading`, `ProductGridSkeleton`, `LoadingButton`
- **Error States**: `ErrorMessage`, `FullPageError`, `NetworkError`, `NotFound`, `NoResults`
- **Product Components**: `ProductCard` with extensive customization options

### TypeScript Patterns
- Strict typing with shared-types package integration
- Generic hooks with proper type inference
- Component props with optional/required patterns
- Error handling with typed error states

### Usage Example
```typescript
// Modern approach with new architecture
import { useProductPage } from '../hooks';
import { ProductCard, FullPageLoading, NoResults } from '../components';

const Products = () => {
  const {
    filteredProducts,
    loading,
    error,
    filters,
    updateFilter,
    handleAddToCart
  } = useProductPage({
    enableSearch: true,
    enableFilters: true
  });

  if (loading) return <FullPageLoading />;
  if (error) return <ErrorMessage message={error} />;
  if (filteredProducts.length === 0) return <NoResults />;

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};
```

## Product Management

### Product Categories
- **SYNERGY** - Health supplements
- **ORGANIXX** - Organic supplements  
- **SHAKTI** - Yoga & wellness (akupressurmatter, akupressurputer, accessories)

### Product Filtering
- Individual products vs bundles (packages)
- Brand filtering (SYNERGY, ORGANIXX)
- Category filtering for SHAKTI products
- Price range and search functionality

### API Structure
```javascript
// Main products endpoint
GET http://localhost:3001/api/products?limit=50

// Response structure
{
  data: {
    products: [...] // Array of product objects
  }
}

// Product object
{
  id: string,
  name: string,
  price: number,
  comparePrice?: number,
  isBundle?: boolean,
  images?: [{url: string, altText?: string}],
  category?: {id: string, name: string, slug: string},
  avgRating?: number,
  reviewCount?: number
}
```

### Product Name Cleaning
ORGANIXX products require name cleaning:
- Remove file extensions (.webp, .jpg, .png)
- Replace underscores with spaces
- Remove brand prefix "ORGANIXX - "

## Page Structure

### Directory Organization (AUTO-OPPDATERT 22.8.2025)
The frontend pages are now organized into logical folders for better maintainability:

```
src/pages/ (48 totale filer)
├── admin/ (15 filer)
│   ├── analytics/ (2 filer)
│   ├── content/ (4 filer)
│   ├── customers/ (1 filer)
│   ├── marketing/ (1 filer)
│   ├── orders/ (1 filer)
│   ├── products/ (1 filer)
│   ├── settings/ (3 filer)
├── auth/ (3 filer)
├── cart/ (4 filer)
├── content/ (7 filer)
├── dev/ (2 filer)
├── legal/ (6 filer)
├── marketing/ (1 filer)
├── shop/ (10 filer)
│   ├── bundles/ (4 filer)

```
src/pages/
├── admin/              # Admin panel pages
│   ├── AdminDashboard.tsx, AdminLogin.tsx
│   ├── content/        # Content management (blog, ads)
│   ├── products/       # Product management
│   ├── orders/         # Order management  
│   ├── customers/      # Customer management
│   ├── settings/       # System settings
│   ├── marketing/      # Campaigns, promotions
│   └── analytics/      # Reports, analytics
├── shop/               # E-commerce pages
│   ├── Products.tsx, Categories.tsx, Kosttilskudd.tsx
│   ├── YogaWellness.tsx, Product.tsx
│   └── bundles/        # Bundle-specific pages
├── cart/               # Checkout flow
│   ├── Handlekurv.tsx, Kasse.tsx, Betaling.tsx
│   └── Ordrebekreftelse.tsx
├── auth/               # Authentication
│   ├── LoggInn.tsx, Registrer.tsx
├── content/            # Main content pages
│   ├── Home.tsx, Blog.tsx, BlogArticle.tsx
│   ├── OmOss.tsx, Kontakt.tsx, FAQ.tsx
├── legal/              # Legal/policy pages
│   ├── Vilkar.tsx, Cookies.tsx, Retur.tsx
│   └── Frakt.tsx
├── marketing/          # Marketing pages  
│   ├── Philosophy.tsx, Specialist.tsx
│   └── Bundles.tsx
└── dev/                # Development tools
    └── Utviklersystem.tsx
```

### Navigation
- Hjem (/)
- Produkter (/produkter) 
- Kosttilskudd (/kosttilskudd)
- Yoga & Wellness (/yoga-wellness)
- Utviklersystem (/utviklersystem) - Design system documentation (development tool)

### Key Pages
- **Kosttilskudd.tsx**: Separate sections for bundles ("Pakketilbud") and individual products ("Enkeltprodukter")
- **YogaWellness.tsx**: SHAKTI products with category filtering
- **Products.tsx**: Main product catalog
- **Utviklersystem.tsx**: Comprehensive design system documentation with live examples

## Recent Work Completed

### ✅ Major System Optimization (2025-08-23)
**Complete removal of external dependencies and comprehensive cleanup**:
1. **Shared Types System Removal** - Removed @helseriet/shared-types completely
   - Deleted shared-types directory and all references
   - Replaced all imports with local type definitions in api.ts
   - Fixed TypeScript compatibility across 8+ files
   - Prosjektet er nå 100% selvstendige og portabelt

2. **Test Files and Scripts Cleanup** - Comprehensive cleanup of unnecessary files
   - Slettet HTML test filer (7 stk): force-refresh-test.html, test-*.html
   - Fjernet test backup filer (2 stk) og simple test filer
   - Slettet 22 gamle image utility scripts (check-*, fix-*, upload-*)
   - Beholdt 12 funksjonelle Jest tests og essential scripts
   - Bevarte fix-cloudinary-folder-matching.js som ønsket

3. **Build System Optimization** - Perfect builds achieved
   - Frontend: 136 moduler transformert på 1.21s uten feil
   - Backend: TypeScript kompilering uten eksterne avhengigheter
   - Automatisk dokumentasjonsoppdatering kjører perfekt
   - Status: Prosjektet bygger nå perfekt og raskt

### ✅ Critical Infrastructure Improvements (2025-08-21)
1. **Removed duplicate image files** - Saved 63MB disk space by eliminating `/images/` folder duplication
2. **~~Implemented shared type definitions~~** - ~~Created `@helseriet/shared-types` package~~ → **REMOVED 2025-08-23** (now using local types)
3. **Set up comprehensive testing infrastructure** - Jest + Supertest for backend API testing
4. **Standardized error handling** - Unified error responses with proper TypeScript interfaces and React Error Boundary

### ✅ Frontend Architecture Improvements (2025-08-22)
**Implemented comprehensive frontend architecture improvements**:
- **Custom Hooks System**: Created reusable hooks (`useProducts`, `useProductFilters`, `useSearch`, etc.)
- **Global State Management**: React Context with `AppContext` for cart, user, and notifications
- **Reusable UI Components**: Consistent loading states, error states, and product components
- **TypeScript Patterns**: Strict typing with shared-types integration and proper error handling
- **Accessibility**: Screen reader announcements and ARIA-compliant components
- **Directory Reorganization**: Organized 43+ pages into logical folder structure (admin/, shop/, cart/, auth/, content/, legal/, marketing/, dev/)

### ✅ Previous Improvements
- ✅ Fixed design principles on new pages (Kosttilskudd, YogaWellness)
- ✅ Replaced orange colors with correct brand colors (sage/terracotta)
- ✅ Separated bundles from individual products on Kosttilskudd page
- ✅ Fixed ORGANIXX product name formatting
- ✅ Implemented proper design system consistency

## Planned Improvements

### 🟡 Medium Priority
1. **Frontend Architecture Refactoring** (✅ COMPLETED)
   - ✅ Split large components with reusable hooks
   - ✅ Implemented React Context state management
   - ✅ Improved component reusability and maintainability
   - **Status**: Successfully implemented comprehensive frontend improvements

2. **Backend Service Layer**
   - Implement service layer pattern (separate business logic from controllers)
   - Add repository pattern for data access abstraction
   - Improve code organization and testability

3. **Configuration Validation**
   - Add Zod schema validation for environment variables
   - Improve config error handling and debugging
   - Standardize configuration management

### 🔵 Low Priority
1. **Documentation & Developer Experience**
   - API documentation (OpenAPI/Swagger)
   - Component Storybook
   - Comprehensive development guides

2. **Performance Optimization**
   - Advanced Vite build configuration
   - Bundle analysis and optimization
   - Image optimization and lazy loading

3. **Enhanced Security**
   - Input sanitization
   - Enhanced CORS policies
   - Request rate limiting improvements

## Development Guidelines
- Always follow existing design patterns from Home.tsx and Products.tsx
- Use brand colors consistently (sage/terracotta, never orange)
- Maintain responsive design principles
- Include proper loading states and error handling
- Follow TypeScript best practices
- Ensure accessibility with proper ARIA labels

## Testing & Build

### Backend Testing
```bash
cd helseriet-backend
npm test                # Run all tests
npm run test:watch      # Watch mode for development
npm run test:coverage   # Generate coverage report
```

### Build Commands
```bash
# Build all packages (simplified - no external dependencies)
cd helseriet-backend && npm run build     # Backend TypeScript build
cd helseriet-frontend && npm run build    # Frontend Vite build

# Alternative frontend build (skip TypeScript check)
cd helseriet-frontend && npm run build-no-check

# Root build command (builds both)
npm run build
```

### Common Scripts
- `npm run lint` - Code linting
- `npm run typecheck` - TypeScript checking (backend)
- `npm run dev` - Development server

## Type System (Local Definitions)

The project now uses local TypeScript definitions for maximum portability:

### Key Interfaces (in api.ts)
- `Product` - Complete product type with all variants
- `ProductImage` - Image structure with alt text
- `Category` - Product categorization
- `ApiResponse<T>` - Standardized API responses
- `CartItem` - Shopping cart items

### Local Type Benefits
- ✅ No external dependencies
- ✅ Faster builds (no shared package to compile)
- ✅ Better portability for new developers
- ✅ Simplified project structure
- ✅ Direct control over all type definitions

### Usage
```typescript
// Frontend - all types imported from api.ts
import type { Product, ApiResponse, ProductImage } from '../services/api';

// Backend - uses standard TypeScript interfaces
// No external type package needed
```

### Error Handling
- **Backend**: Standardized error middleware with structured logging
- **Frontend**: React Error Boundary with user-friendly messages
- **API**: Consistent error format across all endpoints

## Common Issues & Solutions

### System Chaos Prevention 🚨
**PROBLEM**: Duplikate prosesser (63+ Node prosesser samtidig)
**SOLUTION**: 
- Bruk alltid `npm run start:clean` for oppstart
- Kjør `npm run cleanup` før du starter nye prosesser
- Unngå å kjøre `cd helseriet-* && npm run dev` direkte

### Database Issues
**PROBLEM**: Feil database eller tomme produkter
**SOLUTION**: 
- Bruk kun Railway database: `DATABASE_URL` i `.env`
- Aldri opprett lokale databaser (.db, helseriet_produktdb)
- Check `.gitignore` forhindrer feil .env filer

### Build Issues (RESOLVED)
- ✅ Removed shared-types external dependency completely
- ✅ All TypeScript interfaces now local in api.ts
- ✅ Frontend and backend build independently
- ✅ Product names with file extensions need cleaning
- ✅ Bundle vs individual product separation
- ✅ Color consistency (always use brand palette)
- ✅ Port fixed to 5173 consistently

## 🚀 Performance Optimization & Code Splitting (2025-08-25)

### ✅ Implemented Advanced Bundle Optimization

**Code Splitting Results:**
- **Hovedbundle**: 1,210 KB → 730 KB (**39% reduksjon**)
- **Editor bundle**: 1,101 KB → Lazy loaded kun når admin-sider besøkes
- **Admin chunk**: 277 KB - Separat lazy-loaded chunk
- **Total first load**: Fra ~2.3MB → ~730KB (**68% reduksjon**)

### 🎯 Performance Optimalisering Prinsipper

**ALLTID følg disse reglene ved performance-arbeid:**

1. **📊 Mål først, optimaliser deretter**
   - Kjør `npm run build` og analyser bundle sizes
   - Identifiser største flaskehalser (>500KB chunks)
   - Fokuser på det som gir størst effekt først

2. **🔄 Lazy Loading Implementation**
   ```typescript
   // ✅ Korrekt lazy loading
   const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
   
   // ✅ Med proper Suspense wrapper
   <Suspense fallback={<AdminLoading />}>
     <AdminDashboard />
   </Suspense>
   ```

3. **📦 Smart Bundle Chunking**
   ```typescript
   // vite.config.ts - Intelligente chunks
   manualChunks: (id) => {
     if (id.includes('/pages/admin/')) return 'admin-chunk';
     if (id.includes('@uiw/react-md-editor')) return 'editor-vendor';
     if (id.includes('react')) return 'react-vendor';
   }
   ```

4. **🎨 Vakre Loading States**
   - Lag spesielle loading komponenter per område (AdminLoading)
   - Bruk merkevare-farger og design (sage/terracotta)
   - Inkluder progress indikatorer og beskrivende tekst

### 🛠️ Implementerte Optimaliseringer

**Code Splitting:**
- ✅ LazyMDEditor component for rich text editor
- ✅ Alle admin routes lazy loaded med Suspense
- ✅ Separate chunks for admin, editor, og vendor libraries

**Bundle Analysis:**
- ✅ Vite config med intelligent chunking
- ✅ Dynamic imports for store dependencies
- ✅ Separerte vendor chunks for bedre caching

**Loading Experience:**
- ✅ AdminLoading component med merkevare-design
- ✅ Editor-specific loading states
- ✅ Graceful fallbacks og error handling

### 📈 Fremtidige Performance Forbedringer

**Neste nivå optimaliseringer:**
- Service Worker for asset caching
- Image optimization med WebP format
- Preload kritiske routes
- Virtual scrolling for lange lister

**Prinsipp: ALDRI gå tilbake på performance**
- Hver ny feature MÅ følge lazy loading patterns
- Bundle size må overvåkes kontinuerlig
- Loading states MÅ være merkevare-konsistente

# Claude Code Coordination Setup

For å aktivere koordinasjon mellom flere Claude Code terminaler:

```bash
# I hver terminal, kjør:
export CLAUDE_SESSION_ID=$(uuidgen)
source .claude-coordination/claude-hooks.sh
```

## ⚡ Performance Optimized Coordination Active!

Systemet inkluderer følgende optimaliseringer:
- 🧠 **In-memory caching** (30s TTL) - 70-90% raskere session lookups
- 📦 **Batch operations** - 60-80% raskere broadcast operasjoner  
- 🔍 **Lazy loading** - Raskere oppstart og lavere minnesbruk
- 🔄 **Background processing** - Async file writes og cache refresh

## Koordinasjonsfunksjoner

### Inter-session kommunikasjon
- `/sessions` - Vis alle aktive Claude-sesjoner
- `/broadcast <melding>` - Send melding til alle sesjoner
- `/status` - Vis prosjektkoordinasjonsstatus

### Kontekstdeling
- `/context key=value` - Sett prosjektkontext
- `/context key` - Hent prosjektkontext

### Oppgavekoordinering
- `/task beskrivelse` - Sett nåværende oppgave
- `/task` - Tøm nåværende oppgave

### Fillåsing
- Automatisk låsing av filer under redigering
- Forhindrer konflikter mellom sesjoner

### Automatisk opprydning
- `/cleanup` - Manuell opprydning
- Automatisk opprydning hvert 5. minutt
