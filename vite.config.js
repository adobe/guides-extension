/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import { defineConfig } from "vite";
import path from "path";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'terser',
    lib: {
      entry: path.join(__dirname, "src/index.ts"),
      name: "guides-extension",
      fileName: "guides-extension"
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
        strict: false,
      },
      plugins: [
        terser({
          mangle: {
            reserved: ['_', '$'], // Prevent these names from being used during minification
          },
        })
      ]
    },
  },
});
