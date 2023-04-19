import { defineConfig } from "vite";
import path from "path";


export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: path.join(__dirname,"src/index.ts"),
      name: "guides-extension",
      fileName:"guides-extension"
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
        strict: false,
      },
    },
  },
});
