import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            app: "/src/app",
            assets: "/src/assets",
            components: "/src/components",
            config: "/src/config",
            constants: "/src/constants",
            hooks: "/src/hooks",
            features: "/src/features",
            pages: "/src/pages",
            routes: "/src/routes",
            utils: "/src/utils"
        }
    },
    plugins: [react()]
});
