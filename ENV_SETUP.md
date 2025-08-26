# 🔧 Environment Configuration Setup

## 📁 Unified .env System

Helseriet-prosjektet bruker nå et **unified environment system** hvor alle environment variabler ligger i **én enkelt fil** i rotmappen.

### 🗂️ Fil Struktur

```
Helseriet-prosjekt-samlet-/
├── .env                           # ✅ MAIN FILE - Alle environment variabler
├── apps/frontend/.env             # 🔄 Auto-generated (ikke rediger manuelt)
├── apps/backend/.env              # 🔄 Auto-generated (ikke rediger manuelt)
├── apps/frontend/.env.production  # 📝 Template for produksjon
└── apps/backend/.env.example      # 📝 Example template
```

### 🎯 Hovedfil: `/Helseriet-prosjekt-samlet-/.env`

**Denne filen inneholder:**
- ✅ Backend konfigurasjon (database, auth, payments)
- ✅ Frontend konfigurasjon (VITE_ variabler)
- ✅ Cloudinary API nøkler
- ✅ Alle payment gateway settings
- ✅ Development og production settings
- ✅ Railway PostgreSQL database URL

### 🚀 Hvordan det fungerer

**Automatisk kopiering:**
```bash
# Scripts kopierer automatisk .env til sub-mapper
npm run dev          # Kopierer .env og starter begge apper
npm run dev:frontend # Kopierer .env og starter kun frontend  
npm run dev:backend  # Kopierer .env og starter kun backend
npm run build        # Kopierer .env og bygger begge apper
```

**Manuelle kommandoer:**
```bash
npm run env:setup    # Kopier .env til begge sub-mapper
npm run env:clean    # Slett .env filer fra sub-mapper
```

### 👥 For Samarbeidspartnere

**Del kun DENNE filen:**
📄 `/Helseriet-prosjekt-samlet-/.env`

**Ikke del disse filene:**
- ❌ `apps/frontend/.env` (auto-generated)
- ❌ `apps/backend/.env` (auto-generated)

### 🔒 Sikkerhet

**Environment variabler inneholder:**
- 🔐 Database credentials (Railway PostgreSQL)
- 🔐 API nøkler (Cloudinary: dtagymjm2)
- 🔐 JWT secrets og authentication tokens
- 🔐 Email konfigurasjon
- 🔐 Stripe, Vipps, og Klarna payment keys

**⚠️ ALDRI commit .env filer til Git!**

### 📝 Oppdatering av Environment Variabler

1. **Rediger kun:** `/Helseriet-prosjekt-samlet-/.env`
2. **Kjør:** `npm run env:setup` (eller neste dev/build kommando)
3. **Ferdig!** Alle sub-mapper får automatisk oppdateringer

### 🛠️ Development Workflow

```bash
# 1. Clone repository
git clone https://github.com/mandymgr/Helseriet-prosjekt-samlet-.git
cd Helseriet-prosjekt-samlet-

# 2. Få .env filen fra teamleder/1Password
# 3. Legg den i rotmappen som .env

# 4. Installer dependencies
npm install

# 5. Start development servere
npm run dev:frontend    # Frontend på http://localhost:5173
npm run dev:backend     # Backend på http://localhost:3001

# Eller start begge samtidig
npm run dev
```

### 🌐 Server URLs

**Development:**
- Frontend: http://localhost:5173 (Vite dev server)
- Backend: http://localhost:3001 (Express API)
- Database: Railway PostgreSQL (hopper.proxy.rlwy.net)
- Prisma Studio: http://localhost:5555

### ⚙️ Production Setup

For produksjon:
1. Kopier `.env` → `.env.production`  
2. Oppdater production verdier:
   - DATABASE_URL → Production database
   - JWT_SECRET → Secure random string
   - STRIPE keys → Production keys
   - CLOUDINARY → Production account
3. Deploy med production environment

### 📊 Database Management

```bash
# Prisma commands (kjør fra backend mappe)
cd apps/backend
npx prisma studio       # Åpne Prisma Studio
npx prisma migrate dev   # Kjør migrations
npx prisma db push      # Push schema til database
```

---
**💡 Tips:** 
- Bruk `npm run cleanup` for å stoppe alle Node prosesser hvis noe henger
- Bruk `npm run env:clean` hvis du trenger å rydde opp i auto-genererte .env filer
- Railway database credentials endres periodisk, sjekk Railway dashboard for oppdateringer