import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()


app.use(router)
app.use(pinia)

const cachedState = JSON.parse(localStorage.getItem('authStoreState'));
if (cachedState.sessionID) {
    pinia.state.value.auth = cachedState;
}

app.mount('#app')

window.addEventListener('beforeunload', () => {
    const authStore = pinia.state.value.auth;
    localStorage.setItem('authStoreState', JSON.stringify(authStore));
})