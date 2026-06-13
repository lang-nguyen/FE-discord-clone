import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: Number(env.VITE_DEV_SERVER_PORT || 3000),
    },
    publicDir: "public",
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            redux: ["@reduxjs/toolkit", "react-redux", "axios"],
            realtime: ["@microsoft/signalr"],
            radix: [
              "@radix-ui/react-avatar",
              "@radix-ui/react-dialog",
              "@radix-ui/react-context-menu",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-scroll-area",
              "@radix-ui/react-slot",
              "@radix-ui/react-tooltip",
            ],
          },
        },
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/test/setup.js",
      css: true,
    },
  };
});
