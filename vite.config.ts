import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["lit"],
      output: {
        globals: {
          vue: "lit",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "./src",
      "~": "./",
    },
  },
  plugins: [dts({ exclude: ["**/*.stories.ts"] })],
});
