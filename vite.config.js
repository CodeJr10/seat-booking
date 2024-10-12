// vite.config.js (or vite.config.mjs if renamed)

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Export the Vite configuration using ESM syntax
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js", // Ensure PostCSS is correctly referenced
  },
});
