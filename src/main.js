import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from './App.vue'
import router from './router'
import _ from 'lodash'

const app = createApp(App)
const pinia = createPinia()


app.use(router)
app.use(pinia)
app.use(Toast)

const storedCache = localStorage.getItem('authStoreState');
const cachedState = storedCache ? JSON.parse(storedCache) : null;
if (cachedState && !_.isEmpty(cachedState.sessionID)) {
    pinia.state.value.auth = cachedState;
}

app.mount('#app')

window.addEventListener('beforeunload', () => {
    const authStore = pinia.state.value.auth;
    localStorage.setItem('authStoreState', JSON.stringify(authStore));
})