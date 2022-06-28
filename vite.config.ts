import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      app: path.resolve("./src/app"),
      assets: path.resolve("./src/assets"),
      components: path.resolve("./src/components"),
      config: path.resolve("./src/config"),
      constants: path.resolve("./src/constants"),
      hooks: path.resolve("./src/hooks"),
      features: path.resolve("./src/features"),
      pages: path.resolve("./src/pages"),
      routes: path.resolve("./src/routes"),
      utils: path.resolve("./src/utils")
    }
  },
  plugins: [react()]
})
