# 🌿 Helseriet E-commerce Platform

> Modern Norwegian health & wellness e-commerce platform built with React, Node.js, and PostgreSQL.

[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61DAFB?logo=react)](https://github.com/mandymgr/helseriet-frontend)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js)](https://github.com/mandymgr/helseriet-backend)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20Prisma-336791?logo=postgresql)](https://railway.app)

## 🎯 Project Overview

Helseriet is a comprehensive e-commerce platform specializing in health and wellness products, featuring:

- **🛍️ Multi-brand catalog** - SYNERGY supplements, ORGANIXX organic products, SHAKTI yoga accessories
- **🛒 Advanced shopping** - Smart cart, product filtering, bundle packages
- **👤 User management** - Authentication, profiles, order history
- **📱 Responsive design** - Mobile-first with consistent brand design system
- **⚡ High performance** - Optimized builds, lazy loading, code splitting

## 🏗️ Architecture

```
helseriet-projekt/
├── helseriet-frontend/     # React/TypeScript SPA (Vite)
├── helseriet-backend/      # Node.js/Express API
├── CLAUDE.md              # Development guidelines & architecture
├── PROJECT_STATUS.md      # Current project status & progress
└── scripts/               # Utility scripts & automation
```

### 🔧 Technology Stack

**Frontend:**
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds  
- **Tailwind CSS** with custom design system
- **React Router** for client-side routing
- **Custom hooks** for business logic separation

**Backend:**
- **Node.js + Express** for REST API
- **Prisma ORM** with PostgreSQL database
- **TypeScript** for full-stack type safety
- **JWT authentication** with session management
- **Comprehensive testing** with Jest + Supertest

**Infrastructure:**
- **Railway** for PostgreSQL hosting
- **Vercel** for frontend deployment
- **GitHub Actions** for CI/CD (planned)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+
- PostgreSQL database (Railway recommended)

### 1️⃣ Clone with submodules
```bash
git clone --recursive https://github.com/mandymgr/helseriet-projekt.git
cd helseriet-projekt
```

### 2️⃣ Environment setup
```bash
# Backend environment
cp helseriet-backend/.env.example helseriet-backend/.env
# Add your DATABASE_URL and other secrets

# Frontend environment  
cp helseriet-frontend/.env.example helseriet-frontend/.env
```

### 3️⃣ Install dependencies
```bash
# Install root dependencies
npm install

# Install submodule dependencies
cd helseriet-backend && npm install
cd ../helseriet-frontend && npm install
```

### 4️⃣ Database setup
```bash
cd helseriet-backend
npx prisma generate
npx prisma db push
npx prisma db seed    # Optional: seed with sample data
```

### 5️⃣ Start development
```bash
# From root directory - starts both frontend and backend
npm run dev

# Or start individually:
npm run dev:frontend   # http://localhost:5173
npm run dev:backend    # http://localhost:3001
```

## 📊 Performance Metrics

### Frontend Optimization Results:
- **68% reduction** in first load time (2.3MB → 730KB)
- **Code splitting** with intelligent chunking
- **Lazy loading** for admin and editor components
- **Build time**: ~55 seconds including documentation

### Backend Performance:
- **REST API** with standardized error handling
- **Database optimization** with Prisma query efficiency
- **Comprehensive testing** coverage
- **Type-safe** development experience

## 🛠️ Development

### Key Commands
```bash
npm run start:clean          # Clean start (kills duplicates)
npm run cleanup             # Stop all running processes
npm run dev                 # Start both frontend & backend
npm run build               # Build all packages
npm run test                # Run all tests
```

### 📁 Project Structure

**Frontend (`/helseriet-frontend/`):**
```
src/
├── components/            # Reusable UI components
├── hooks/                # Custom business logic hooks  
├── context/              # Global state management
├── pages/                # Route components (organized by feature)
│   ├── admin/           # Admin panel pages
│   ├── shop/            # E-commerce pages
│   ├── auth/            # Authentication
│   └── dev/             # Developer tools
├── services/            # API integration
└── utils/               # Helper functions
```

**Backend (`/helseriet-backend/`):**
```
src/
├── controllers/          # HTTP request handlers
├── services/            # Business logic layer
├── middleware/          # Express middleware
├── routes/              # API route definitions
├── models/              # Database models
└── utils/               # Helper utilities
```

## 🎨 Design System

Helseriet follows a strict design system with:

- **Brand Colors**: Sage (#9CAF88) primary, Terracotta (#D4A574) accent
- **Typography**: Serif headers, Inter body text with responsive sizing
- **Components**: Consistent spacing, organic borders, minimal shadows
- **Accessibility**: ARIA compliance, screen reader support

**📖 Full design documentation**: [`/src/pages/dev/Utviklersystem.tsx`](helseriet-frontend/src/pages/dev/Utviklersystem.tsx)

## 📈 Current Status

### ✅ Completed Features
- **Core e-commerce functionality** - Product catalog, cart, checkout
- **User authentication** - Registration, login, session management  
- **Admin panel** - Product management, order tracking
- **Performance optimization** - Code splitting, lazy loading
- **Design system** - Consistent UI/UX across all pages
- **Database schema** - Complete product, user, order models

### 🚧 In Development
- **TypeScript cleanup** - Resolving remaining compilation issues
- **Payment integration** - Stripe/Vipps implementation
- **Order fulfillment** - Shipping and tracking
- **Enhanced testing** - E2E test coverage

### 🎯 Roadmap
- **Mobile app** - React Native version
- **Analytics dashboard** - Business intelligence
- **Inventory management** - Stock tracking automation
- **Multi-language** - Norwegian + English support

## 🤝 Contributing

1. **Read the guidelines**: Check [`CLAUDE.md`](CLAUDE.md) for development principles
2. **Check status**: Review [`PROJECT_STATUS.md`](PROJECT_STATUS.md) for current priorities  
3. **Follow conventions**: Use established patterns and design system
4. **Test thoroughly**: Ensure all features work correctly
5. **Update docs**: Keep documentation current

### Development Principles
- **"ALLTID BEST LØSNING PRINSIPPET"** - Always aim for the best, complete solution
- **Never skip problems** - Fix issues properly, no temporary workarounds
- **Maintain quality** - Code should be better than industry standards
- **Document decisions** - Keep CLAUDE.md and PROJECT_STATUS.md updated

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🔗 Related Repositories

- **Frontend**: [helseriet-frontend](https://github.com/mandymgr/helseriet-frontend)
- **Backend**: [helseriet-backend](https://github.com/mandymgr/helseriet-backend)

## 📞 Support

For development questions or issues, please refer to:
- [`CLAUDE.md`](CLAUDE.md) - Complete development guide
- [`PROJECT_STATUS.md`](PROJECT_STATUS.md) - Current project status
- [Issues](https://github.com/mandymgr/helseriet-projekt/issues) - Bug reports and feature requests

---

**Built with ❤️ for Norwegian health & wellness**