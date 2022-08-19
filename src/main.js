import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/router.js'

createApp(App).use(VueRouter).use(router).mount('#app')
