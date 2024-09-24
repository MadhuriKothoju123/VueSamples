
import { createApp } from 'vue'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';
import  router from './router'
import App from './App.vue'
import { Chart } from 'vue-chartjs';

const pinia = createPinia();
const vuetify = createVuetify({
icons:
{
    iconfont: 'mdi',
}
})
pinia.use(piniaPluginPersistedstate);
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(vuetify).mount('#app')
