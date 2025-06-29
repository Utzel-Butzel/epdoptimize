import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      epdoptimize: path.resolve(__dirname, "../src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../dist/examples"),
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
