import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: path.resolve("dist"), 
    emptyOutDir: true,
  },
  server: {
    
    host: true,
    port: 5173,
    proxy: {
      // Все запросы, начинающиеся с /api, Vite сам перенаправит на бэкенд
      '/api': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        secure: false,
      },
      // Отдельное правило для картинок, если вы их запрашиваете по этому пути
      '/uploads': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        secure: false,
      }
    }

    
   
  }
});
