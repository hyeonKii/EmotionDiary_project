import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    const PORT = Number(env.VITE_PORT);

    return {
        plugins: [react()],
        define: {
            __APP__: env.APP_ENV,
        },
        server: {
            port: PORT,
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    };
});
