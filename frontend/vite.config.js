import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    // Served at the domain root by default (Vercel / custom domain). For a
    // sub-path host like GitHub Pages, set VITE_BASE_PATH=/JobFit/ at build time.
    base: process.env.VITE_BASE_PATH || '/',
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:5050',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        // Ensure source maps are not included in production
        sourcemap: process.env.NODE_ENV !== 'production',
    },
});