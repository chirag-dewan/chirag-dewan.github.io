import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // No 'base' for a user/organization GH Pages site like chirag-dewan.github.io
  optimizeDeps: {
    // Not strictly required, but can help ensure these are pre-bundled
    include: ["react-router-dom", "react-github-calendar"]
  },
});
