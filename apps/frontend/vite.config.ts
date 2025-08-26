import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React ecosystem
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          // Router
          if (id.includes('react-router')) {
            return 'router-vendor';
          }
          // Payment processing
          if (id.includes('@stripe')) {
            return 'stripe-vendor';
          }
          // Rich text editor - only loaded when admin pages are accessed
          if (id.includes('@uiw/react-md-editor') || id.includes('react-md-editor')) {
            return 'editor-vendor';
          }
          // Icons
          if (id.includes('react-icons')) {
            return 'icons-vendor';
          }
          // Admin-specific dependencies
          if (id.includes('/pages/admin/') || id.includes('admin-')) {
            return 'admin-chunk';
          }
          // Utility libraries
          if (id.includes('lodash') || id.includes('date-fns') || id.includes('axios')) {
            return 'utils-vendor';
          }
          // Everything else stays in main bundle
        }
      }
    },
    // Improve build performance
    target: 'esnext',
    minify: 'esbuild', // Switch to esbuild for better compatibility
    sourcemap: false
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
