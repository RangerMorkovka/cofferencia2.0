import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, "../backend/dist"),
    emptyOutDir: true,
  },
  server: {
    host: true, // Разрешает доступ к фронтенду с телефона (трансляция в сеть)
    port: 5173, // Порт фронтенда
    
    proxy: {
      // 1. Прокси для картинок (перехватывает адреса, начинающиеся с /uploads)
      '/uploads': {
        target: 'http://localhost:5174', // Куда перенаправлять (ваш бэкенд)
        changeOrigin: true,
      },
      // 2. Прокси для запросов к бэкенду (перехватывает адреса, начинающиеся с /api)
      '/api': {
        target: 'http://localhost:5174', // Куда перенаправлять
        changeOrigin: true,
      }
    }
  },

});
