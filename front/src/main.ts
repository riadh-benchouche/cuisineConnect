import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import Toast from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {router} from "./router.ts";

createApp(App)
    .use(router)
    .use(Toast)
    .mount('#app')
