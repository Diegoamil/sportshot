import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Garante que os arquivos JS sejam servidos com o MIME type correto
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // Copia arquivos estáticos para a pasta dist
    copyPublicDir: true
  },
  // Adiciona base path para deploy em subdiretórios
  base: './',
  // Configuração do servidor de desenvolvimento
  server: {
    port: 3000,
    host: true,
    cors: true
  }
});
