import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  server: {
    port: 3000,
  },
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 10000000000,
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      formats: ["iife"],
      name: "MyWidget",
      fileName: () => "index.js",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": {}, // prevent other errors
  },
});


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import { fileURLToPath } from "url";
// import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default defineConfig({
//   plugins: [react(), cssInjectedByJsPlugin()],
//   server: {
//     port: 3000,
//   },
//   build: {
//     cssCodeSplit: false,
//     assetsInlineLimit: 4096, // only inline small assets
//     rollupOptions: {
//       input: path.resolve(__dirname, "src/main.tsx"), // <-- Not 'lib', just input
//       output: {
//         format: "iife",
//         entryFileNames: "widget.js",
//         inlineDynamicImports: true,
//       },
//     },
//   },
//   define: {
//     "process.env.NODE_ENV": JSON.stringify("production"),
//     "process.env": {},
//   },
// });
