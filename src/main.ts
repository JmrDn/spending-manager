import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/assets/styles/index.scss'

import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';

const app = createApp(App)

Locale.use('en-US', enUS);
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.mount('#app')
