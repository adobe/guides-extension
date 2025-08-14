/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import tailwind from "tailwindcss";
import postcss from "postcss";
import * as fs from "fs/promises";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import tailwindConfig from "./tailwind.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This script is now primarily for Tailwind CSS processing
// Main CSS bundling is handled by Vite configuration
const generateTailwindCss = async (contentRaw) => {
  return (
    await postcss([
      tailwind({
        ...tailwindConfig,
        content: [{ raw: contentRaw }],
      }),
    ]).process(
      `${
        contentRaw ? "" : "@tailwind base;"
      }@tailwind components;@tailwind utilities;`,
      {
        from: undefined,
      }
    )
  ).css;
};

(async () => {
  console.log("CSS processing completed by Vite build system.");
  
  // Optional: You can still generate additional Tailwind-specific CSS if needed
  // const buildFile = join(__dirname, "dist", "tailwind-additional.css");
  // ... additional processing if needed
})();
