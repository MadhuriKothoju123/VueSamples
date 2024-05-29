 import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import store from './store';
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import CustomPlugin from './plugins/CustomPlugin'
import { createPinia } from 'pinia'

const pinia = createPinia()
const vuetify = createVuetify({
icons:
{
    iconfont: 'mdi',
}
})
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker);
app.use(router)
app.provide('message', 'hello')
app.use(CustomPlugin);
app.use(store)  
app.use(pinia)
app.use(vuetify).mount('#app')
