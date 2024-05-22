import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import useVuelidate from '@vuelidate/core'

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [
    vue( ),
    vueJsx(),
    useVuelidate,
    VueDevTools(),
    vuetify({ autoImport: true }),
 
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
