import tailwind from "tailwindcss";
import postcss from "postcss";
import * as fs from "fs/promises";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import tailwindConfig from "./tailwind.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  const buildFile = join(__dirname, "dist", "build.css");
  try {
    await fs.unlink(buildFile);
  } catch (err) {}
  const outputStream = (await fs.open(buildFile, "a")).createWriteStream();
  const files = await fs.readdir(join(__dirname, "src"));
  for (const file of files) {
    const fileText = (
      await fs.readFile(join(__dirname, "src", file))
    ).toString();
    outputStream.write(await generateTailwindCss(fileText));
  }
})();
