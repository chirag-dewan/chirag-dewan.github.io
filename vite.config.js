import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  // Ensure react-router-dom is included in the pre-bundling step
  optimizeDeps: {
    include: ['react-router-dom']
  },
  resolve: {
    alias: {
      // This alias helps Vite locate react-router-dom in your node_modules directory
      'react-router-dom': fileURLToPath(new URL('./node_modules/react-router-dom', import.meta.url))
    }
  }
});
