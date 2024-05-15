 import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css';

import store from './store';
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const vuetify = createVuetify({
icons:
{
    iconfont: 'mdi',
}
})

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker);
app.use(router)
app.use(store)  
app.use(vuetify).mount('#app')
