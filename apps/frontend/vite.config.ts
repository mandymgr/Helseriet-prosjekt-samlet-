import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 600, // Redusert grense for bedre optimalisering
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React - separat chunk
          if (id.includes('react') && !id.includes('react-router') && !id.includes('react-icons')) {
            return 'react-core';
          }
          // React DOM - separat chunk
          if (id.includes('react-dom')) {
            return 'react-dom';
          }
          // Router - egen chunk
          if (id.includes('react-router')) {
            return 'router';
          }
          // Payment processing
          if (id.includes('@stripe') || id.includes('stripe')) {
            return 'payment-stripe';
          }
          // Rich text editor - lazy loaded
          if (id.includes('@uiw/react-md-editor') || id.includes('react-md-editor')) {
            return 'editor';
          }
          // Icons - egen chunk siden de er store
          if (id.includes('react-icons')) {
            return 'icons';
          }
          // UI komponenter og styling
          if (id.includes('@radix-ui') || id.includes('@headlessui') || id.includes('framer-motion')) {
            return 'ui-components';
          }
          // Admin pages - lazy loaded
          if (id.includes('/pages/admin/')) {
            return 'admin';
          }
          // Shop pages - gruppe for e-commerce sider
          if (id.includes('/pages/shop/') || id.includes('/pages/cart/')) {
            return 'shop';
          }
          // Auth pages - lazy loaded
          if (id.includes('/pages/auth/')) {
            return 'auth';
          }
          // Utility libraries
          if (id.includes('lodash') || id.includes('date-fns')) {
            return 'utils';
          }
          // HTTP libraries
          if (id.includes('axios') || id.includes('ky')) {
            return 'http';
          }
          // Form libraries
          if (id.includes('react-hook-form') || id.includes('yup') || id.includes('zod')) {
            return 'forms';
          }
          // State management
          if (id.includes('zustand') || id.includes('redux')) {
            return 'state';
          }
          // Alle node_modules som ikke er fanget opp
          if (id.includes('node_modules')) {
            const module = id.split('node_modules/')[1].split('/')[0];
            // Grupper små moduler sammen
            if (module.length < 15) {
              return 'vendor-misc';
            }
          }
        }
      }
    },
    // Forbedret build performance
    target: 'es2020', // Moderne nok for de fleste browsere
    minify: 'terser', // Bedre minifisering
    terserOptions: {
      compress: {
        drop_console: true, // Fjern console.log i produksjon
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    sourcemap: false,
    // Preload viktige chunks
    modulePreload: {
      polyfill: true
    }
  },
  // Improve dev server performance
  server: {
    hmr: {
      overlay: false
    }
  },
  // Add path resolution for cleaner imports
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
