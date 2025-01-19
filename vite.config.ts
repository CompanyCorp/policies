import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import deno from "@deno/vite-plugin";

import "react";
import "react-dom";

export default defineConfig({
  plugins: [
    react(),
    deno() as Plugin[],
  ],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
