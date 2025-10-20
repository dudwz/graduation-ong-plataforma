import { resolve } from "path";
import { defineConfig } from "vite";

const root = "src";
const outDir = "../dist";

export default defineConfig(({ command, mode }) => {
  const page = process.env.PAGE;
  const emptyOut = process.env.EMPTY_OUT === "1";

  const baseConfig = {
    base: "./",
    root,
    publicDir: "../src",
    build: {
      outDir,
      emptyOutDir: emptyOut || false,
      assetsDir: "assets",
    },
  };

  if (page) {
    return {
      base: "./",
      root,
      publicDir: "../src",
      build: {
        outDir,
        emptyOutDir: emptyOut || false,
        assetsDir: "assets",
        lib: {
          entry: resolve(__dirname, "src/js/main.js"),
          name: page,
          formats: ["iife"],
          fileName: () => `${page}.js`,
        },
        rollupOptions: {
          output: {
            entryFileNames: `assets/${page}.js`,
            assetFileNames: `assets/[name][extname]`,
          },
        },
      },
    };
  }

  return baseConfig;
});
