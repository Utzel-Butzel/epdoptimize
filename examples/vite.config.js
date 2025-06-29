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
    outDir: "../dist/examples",
    rollupOptions: {
      input: "index.html",
    },
  },
  server: {
    open: true,
  },
});
