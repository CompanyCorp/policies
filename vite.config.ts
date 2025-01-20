import { defineConfig, Plugin, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import deno from "@deno/vite-plugin";

import "react";
import "react-dom";

export default defineConfig({
  base: "/policies",
  plugins: [
    react() as PluginOption[],
    deno() as Plugin[],
  ],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
