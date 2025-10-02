import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss()
    ],
    base: '/food_assist_frontend/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
