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
// import { db, messaging } from './firebase'
// import { getToken } from 'firebase/messaging'
// import { onAuthStateChanged } from 'firebase/auth'
// import { doc, setDoc } from 'firebase/firestore'
import { QuillEditor } from '@vueup/vue-quill'; // Import QuillEditor
import 'quill/dist/quill.snow.css';

const pinia = createPinia()
const vuetify = createVuetify({
icons:
{
    iconfont: 'mdi',
}
})
pinia.use(piniaPluginPersistedstate);
// onAuthStateChanged((user) => {
//     console.log(user)
//     if (user) {
//       messaging.requestPermission()
//         .then(() => getToken(messaging))
//         .then((token) => {
//           console.log('FCM Token:', token);
//           // Save the token to the user's Firestore document
//           setDoc(doc(db, 'users', user.uid), { fcmToken: token }, { merge: true });
//         })
//         .catch((err) => {
//           console.error('Permission denied', err);
//         });
//     }
//   });

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker);
app.component('QuillEditor', QuillEditor);
app.use(router)
app.provide('message', 'hello')
app.use(CustomPlugin);
app.use(store)  
app.use(pinia)
app.use(vuetify).mount('#app')
