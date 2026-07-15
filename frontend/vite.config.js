import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/cofferencia2.0/",
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "http://192.168.1.200:5174",
        changeOrigin: true,
        secure: false,
        xfwd: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
