import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-router-dom", "react-github-calendar"]
  },
  resolve: {
    alias: {
      "react-router-dom": fileURLToPath(new URL("./node_modules/react-router-dom", import.meta.url)),
      "react-github-calendar": fileURLToPath(new URL("./node_modules/react-github-calendar/dist/index.js", import.meta.url))
    }
  }
});
