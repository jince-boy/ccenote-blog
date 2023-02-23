import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {prismjsPlugin} from 'vite-plugin-prismjs'
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 3001
    },
    plugins: [
        vue(),
        prismjsPlugin({
            languages:'all',
            // plugins:['command-line'],
            // theme:'coy',
            css:true
        })
    ],
    build: {
        target:['edge90','chrome90','firefox90','safari15'],
        emptyOutDir:true,
        rollupOptions: {
            output: {
                manualChunks(id) { //静态资源分拆打包
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
                assetFileNames: assetInfo => {
                    let info = assetInfo.name.split('.')
                    let extType = info[info.length - 1]
                    if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
                        extType = 'media'
                    } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
                        extType = 'images'
                    } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
                        extType = 'fonts'
                    }
                    return `${extType}/[name]-[hash][extname]`
                },
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js'
            }
        }
    }
})
