import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir:  "dist",
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 5173,

    proxy: {
      // 1. Прокси для картинок (перехватывает адреса, начинающиеся с /uploads)
      "/uploads": {
        target: "http://localhost:5174", // Куда перенаправлять (ваш бэкенд)
        changeOrigin: true,
      },
      // 2. Прокси для запросов к бэкенду (перехватывает адреса, начинающиеся с /api)
      "/api": {
        target: "http://localhost:5174", // Куда перенаправлять
        changeOrigin: true,
      },
    },
  },
});
