import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5180,
    strictPort: true,
    fs: {
      // Keep review files private even when the development server is reachable.
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/staging/**'],
    },
  },
});
