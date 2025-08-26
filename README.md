# 🌿 Helseriet E-commerce Platform (Monorepo)

> **Unified repository** containing both frontend and backend applications for the Helseriet health and wellness e-commerce platform.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/mandymgr/Helseriet-prosjekt-samlet-)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D18.0.0-green)](https://nodejs.org/)

## 🏗️ Monorepo Structure

```
helseriet-monorepo/
├── apps/
│   ├── frontend/          # React/TypeScript frontend (Vite)
│   └── backend/           # Node.js/Express backend
├── packages/              # Shared packages (future use)
├── scripts/               # Utility scripts
├── docs/                  # Documentation
├── .github/workflows/     # CI/CD workflows
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js ≥18.0.0
- npm ≥9.0.0

### Installation
```bash
git clone https://github.com/mandymgr/Helseriet-prosjekt-samlet-.git
cd Helseriet-prosjekt-samlet-
npm run install:all
```

### Development
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start individually
npm run dev:frontend  # Frontend on http://localhost:5173
npm run dev:backend   # Backend on http://localhost:3001
```

### Building
```bash
# Build both applications
npm run build

# Or build individually  
npm run build:frontend
npm run build:backend
```

## 📁 Applications

### Frontend (`apps/frontend/`)
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **State**: React Context + Custom Hooks
- **Deployment**: Vercel

**Key Features:**
- Responsive design with organic aesthetic
- Product catalog with advanced filtering
- Shopping cart and checkout flow
- Admin dashboard with rich text editor
- Performance optimized with code splitting

### Backend (`apps/backend/`)
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: Express Session
- **Payment**: Stripe integration
- **Testing**: Jest + Supertest

**Key Features:**
- RESTful API with proper error handling
- Product management and categories
- User authentication and authorization
- Order processing and payment handling
- Comprehensive test suite

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both apps in development mode |
| `npm run build` | Build both applications for production |
| `npm run test` | Run tests for both applications |
| `npm run lint` | Lint all applications |
| `npm run typecheck` | Type check all TypeScript code |
| `npm run clean` | Clean all node_modules and build artifacts |
| `npm run start:clean` | Clean start with process cleanup |

## 🌐 Environment Setup

### Frontend Environment Variables
Create `apps/frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
VITE_API_BASE_URL=http://localhost:3001/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Backend Environment Variables
Create `apps/backend/.env`:
```env
DATABASE_URL="postgresql://..."
SESSION_SECRET="your-session-secret"
STRIPE_SECRET_KEY="sk_test_..."
CLOUDINARY_URL="cloudinary://..."
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run deploy:frontend
```

### Backend
Backend can be deployed to Railway, Heroku, or any Node.js hosting platform.

## 📖 Documentation

- [Project Documentation](CLAUDE.md) - Complete project guide
- [Project Status](PROJECT_STATUS.md) - Current development status
- [API Documentation](apps/backend/README.md) - Backend API reference
- [Frontend Guide](apps/frontend/README.md) - Frontend development guide

## 🏛️ Architecture

This monorepo follows a clean architecture with:

- **Separation of Concerns**: Frontend and backend are independent applications
- **Shared Configuration**: Common scripts and tooling configuration
- **Type Safety**: Full TypeScript coverage across the stack
- **Modern Tooling**: Vite, Prisma, Jest, ESLint, and more

## 🤝 Contributing

1. Clone the repository
2. Install dependencies: `npm run install:all`
3. Start development: `npm run dev`
4. Make your changes
5. Run tests: `npm run test`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Repositories

- [helseriet-frontend](https://github.com/mandymgr/helseriet-frontend) - Standalone frontend repo
- [helseriet-backend](https://github.com/mandymgr/helseriet-backend) - Standalone backend repo

---

**Made with ❤️ for natural health and wellness**