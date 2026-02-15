import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith('mdui-'),
                },
            },
        }),
        tailwindcss()
    ],
    base: process.env.CAPACITOR ? './' : '/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
