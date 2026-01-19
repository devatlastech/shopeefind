import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(async ({ mode }) => {
  let plugins = [react()];

  if (mode === "development") {
    try {
      const { componentTagger } = await import("lovable-tagger");
      plugins.push(componentTagger());
    } catch {}
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },

    preview: {
      host: true,
      port: 8080,
      allowedHosts: [
        "shopfind-shopeefind.zn6b4j.easypanel.host",
      ],
    },

    plugins,

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
