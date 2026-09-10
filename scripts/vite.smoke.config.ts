import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: path.resolve(__dirname, ".."),
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "../src") } },
  build: {
    ssr: true,
    outDir: "dist-smoke",
    rollupOptions: { input: "src/smoke.tsx" },
  },
});
