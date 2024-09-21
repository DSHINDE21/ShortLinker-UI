import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: { open: true, port: 4000 }, //define port
  plugins: [svgr(), react()],
  publicDir: "src/public",
  resolve: {
    alias: {
      "@ShortLinker": path.resolve("src"),
    },
  },
});
