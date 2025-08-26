# Helseriet Frontend

A React + TypeScript e-commerce platform for health and wellness products built with Vite.

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── layout/          # Layout components (Navbar, Layout)
│   ├── ui/              # UI components (buttons, inputs, etc.)
│   ├── SkeletonLoader.tsx # Loading state components
│   └── index.ts         # Component exports
├── pages/               # Page components
│   ├── Home.tsx         # Homepage
│   ├── Products.tsx     # Main product catalog
│   ├── Kosttilskudd.tsx # Supplements page
│   ├── YogaWellness.tsx # SHAKTI products page
│   └── Utviklersystem.tsx # Design system documentation
├── styles/              # Global styles and Tailwind config
└── assets/              # Static assets
```

## Key Features

- **E-commerce Product Catalog**: Complete product browsing with filtering and search
- **Brand-specific Pages**: Separate pages for supplements (PURE SYNERGY/ORGANIXX) and wellness (SHAKTI)
- **Product Separation**: Bundles vs individual products with distinct UI sections
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Design System**: Consistent styling with organic borders and minimal shadows

## Brand Guidelines

### Colors
The application uses the official Helseriet brand palette:
- **Primary**: `sage` (#9CAF88) - Main brand color
- **Secondary**: `terracotta` (#D4A574) - Accent color
- **Base**: `charcoal`, `warm_white`, `cream`, `stone_light`

**IMPORTANT**: Never use orange colors. Always use sage/terracotta brand palette.

### Typography
- Headers: `ui-serif, Georgia, Cambria, serif`
- Responsive classes: `text-responsive-h1`, `text-responsive-h2`, `text-responsive-body`

### Components
- `organic-border` - Rounded, organic border styling
- `minimal-shadow` - Subtle shadow effects  
- `card-inner` - Internal card padding
- `btn-ghost` - Ghost button styling

## Product Categories

- **PURE SYNERGY** - Health supplements
- **ORGANIXX** - Organic supplements  
- **SHAKTI** - Yoga & wellness products (akupressurmatter, akupressurputer, accessories)

## API Integration

Backend API: `http://localhost:3001/api/products`

Product filtering includes:
- Brand filtering (PURE SYNERGY, ORGANIXX)
- Product type (bundles vs individual)
- Category filtering for SHAKTI products
- Price range and search

## Development

```bash
npm run dev    # Start development server (http://localhost:5176)
npm run build  # Build for production
npm run lint   # Run ESLint
npm run typecheck # TypeScript type checking
```

## Design System Documentation

The `/utviklersystem` route provides comprehensive design system documentation including:
- Live typography examples
- Color palette showcase
- Component demonstrations
- Interactive examples
- Multi-language support (Norwegian, English, Swedish, Danish)
- Dark/light theme toggle

## Routing

- `/` - Homepage
- `/produkter` - Main product catalog
- `/kosttilskudd` - Supplements (PURE SYNERGY/ORGANIXX products)
- `/yoga-wellness` - SHAKTI wellness products
- `/utviklersystem` - Design system documentation (development tool)
