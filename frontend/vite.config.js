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
    allowedHosts: true,
    host: true,
    port: 5173,

    proxy: {
      // 1. Прокси для картинок (перехватывает адреса, начинающиеся с /uploads)
      "/uploads": {
        target: "https://loose-bobcats-nail.loca.lt/", // Куда перенаправлять (ваш бэкенд)
        changeOrigin: true,
      },
      // 2. Прокси для запросов к бэкенду (перехватывает адреса, начинающиеся с /api)
      "/api": {
        target: "https://loose-bobcats-nail.loca.lt/", // Куда перенаправлять
        changeOrigin: true,
      },
    },
  },
});
