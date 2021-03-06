import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      components: "/src/components",
      pages: "/src/pages",
      routing: "/src/routing",
      store: "/src/store",
      utils: "/src/utils",
    },
  },
});
