import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const portFilePath = path.resolve(__dirname, '.backend-port');
const backendPort = fs.existsSync(portFilePath)
  ? fs.readFileSync(portFilePath, 'utf8').trim()
  : '5001';

export default defineConfig({
  plugins: [react()],
  base: './', // 👈 This line is the key addition!
  server: {
    proxy: {
      '/login': `http://localhost:${backendPort}`,
      '/register': `http://localhost:${backendPort}`,
      '/api': `http://localhost:${backendPort}`,
    },
  },
});
