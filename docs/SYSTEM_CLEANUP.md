# System Cleanup Guide

## 🚨 Problem: Duplikate Prosesser

Tidligere hadde vi **63+ Node prosesser** som kjørte samtidig, noe som skapte system-kaos og ustabilitet.

## ✅ Løsning: Automatisert Cleanup

Vi har implementert automatiserte scripts og npm kommandoer som forhindrer og løser prosess-kaos.

## 🛠️ Tilgjengelige Kommandoer

### ✅ Anbefalte Kommandoer (Trygg)

```bash
# Ren oppstart (anbefalt) - stopper alt og starter rent
npm run start:clean

# Kun cleanup - stopper alle duplikate prosesser  
npm run cleanup

# Sjekk antall aktive prosesser
npm run check:processes

# Manuell cleanup script
./scripts/cleanup.sh

# Start servere individuelt (etter cleanup)
npm run dev:backend
npm run dev:frontend
```

### ❌ Unngå Disse (Skaper Duplikater)

```bash
# IKKE bruk disse direkte - kan skape duplikater:
cd helseriet-frontend && npm run dev   # ❌ Duplikat frontend
cd helseriet-backend && npm run dev    # ❌ Duplikat backend
```

## 📋 Script Funksjoner

### `cleanup.sh`
- Stopper alle Helseriet backend servere (nodemon)
- Stopper alle Helseriet frontend servere (vite)  
- Stopper alle Prisma Studio instanser
- Force-stopper resterende Helseriet prosesser
- Viser antall resterende prosesser

### NPM Scripts (`package.json`)
- `start:clean` - Cleanup + start begge servere med concurrently
- `cleanup` - Kjører cleanup.sh script
- `check:processes` - Teller aktive Node/development prosesser  
- `dev:frontend` - Starter kun frontend server
- `dev:backend` - Starter kun backend server
- `install:all` - Installerer dependencies i begge prosjekter
- `build:all` - Bygger begge prosjekter

## 🛡️ Forebygging

### `.gitignore` Beskyttelse
Forhindrer problematiske filer:
```gitignore
# Environment files - only allow documented ones
.env.local
.env.development.local
.env.backup
.env.old
.env.temp

# Prevent accidental database files
*.db
*.sqlite
produktdatabase
helseriet_produktdb
```

### Database Beskyttelse
- Kun Railway database brukes: `DATABASE_URL` i `.env`
- Lokale databaser fjernet og blokkert via .gitignore
- Konfigurasjon dokumentert i CLAUDE.md

## 🎯 Beste Praksis

1. **Start alltid med cleanup:**
   ```bash
   npm run start:clean
   ```

2. **Sjekk prosesser regelmessig:**
   ```bash
   npm run check:processes
   ```

3. **Hvis system blir tregt, kjør cleanup:**
   ```bash
   npm run cleanup
   ```

4. **Unngå direkte cd kommandoer** for å starte servere

## 📊 Monitorering

### Normale Prosess-Tall
- **Etter cleanup**: ~20-30 prosesser
- **Under utvikling**: ~35-45 prosesser
- **🚨 Problem**: 60+ prosesser

### Sjekk Status
```bash
# Tell alle Node/development prosesser
npm run check:processes

# Se spesifikke Helseriet prosesser
ps aux | grep -E "helseriet" | grep -v grep

# Se alle Node prosesser
ps aux | grep -E "(node|npm|vite|prisma)" | grep -v grep
```

## 🔧 Feilsøking

### Problem: Frontend viser ingen produkter
1. Sjekk backend connection: `curl http://localhost:3001/health`
2. Sjekk database: Backend logger viser connection status
3. Sjekk CORS: Frontend port (5173) skal matche backend CORS config

### Problem: For mange prosesser
1. Kjør `npm run check:processes`
2. Hvis >50 prosesser: `npm run cleanup`
3. Start på nytt: `npm run start:clean`

### Problem: Server starter ikke
1. Sjekk om port er opptatt: `lsof -i :3001` eller `lsof -i :5173`
2. Kjør cleanup: `npm run cleanup`
3. Prøv igjen: `npm run start:clean`

## 📝 Dokumentasjon

- **CLAUDE.md**: Hovedprosjekt dokumentasjon med oppdaterte kommandoer
- **Utviklersystem**: Frontend dokumentasjon på `/utviklersystem` med interaktiv guide
- **System Cleanup**: Egen seksjon i Utviklersystem med kopierbare kommandoer

---

## 🚀 TL;DR - Quick Start

```bash
# Alt du trenger å huske:
npm run start:clean    # Start alt rent
npm run cleanup        # Stopp kaos
npm run check:processes # Tell prosesser
```

Dette sikrer stabil utvikling uten system-kaos! 🎉