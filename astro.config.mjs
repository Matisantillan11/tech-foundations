import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  compressHTML: false,
  server: { port: 3000, host: '127.0.0.1' },
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
