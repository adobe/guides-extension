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
      entry: {
        'guides-extension': path.join(__dirname, "src/index.ts"),
        'styles-css': path.join(__dirname, "src/styles/main.css"),
        'styles-scss': path.join(__dirname, "src/styles/main.scss"), 
        'styles-less': path.join(__dirname, "src/styles/main.less"),
      },
      name: "guides-extension",
      fileName: (format, entryName) => {
        if (entryName.startsWith('styles-')) {
          // Generate JS files for style entries, CSS will be handled by assetFileNames
          return `${entryName}.js`;
        }
        return `${entryName}.js`;
      }
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
        strict: false,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'bundle.css'; // All CSS from different entry points → single bundle
          }
          return assetInfo.name;
        }
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
