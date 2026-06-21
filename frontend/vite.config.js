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
    base: process.env.NODE_ENV === 'production' ? '/JobFit/' : '/', // Base path for GitHub Pages in production
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