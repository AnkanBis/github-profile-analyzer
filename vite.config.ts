import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: 'dist', // Change 'dist' to your desired output directory
    },
    base: '/',
    plugins: [react(),],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
