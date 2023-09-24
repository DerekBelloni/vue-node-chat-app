import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { accountService } from './services/AccountService';
import { useAccountStore } from './stores/useAccountStore';
import { useAuthStore } from './stores/useAuthStore'
import App from './App.vue'
import router from './router'
import _ from 'lodash'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'

library.add(faPencil, faPenToSquare)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(Toast)

const accountStore = useAccountStore();
const authStore = useAuthStore();

const initializeAuthStore = async() => {
    const storedCache = localStorage.getItem('authStoreState');
    const cachedState = storedCache ? JSON.parse(storedCache) : null;

    if (!cachedState || _.isEmpty(cachedState.sessionID)) {
        return;
    }

    authStore.sessionID = cachedState.sessionID;
    authStore.loggedIn = cachedState.loggedIn;

    try {
        const account = await accountService.getAccountBySession(cachedState.sessionID);
        accountStore.userName = account.username;
        accountStore.userEmail = account.email;
        accountStore.accountID = account._id;
    } catch (error) {
        console.error("Error fetching account: ", error);
    }
}
accountService.setRouterInstance(router)

initializeAuthStore().then(() => {
    app.mount('#app')
})

window.addEventListener('beforeunload', () => {
    const authStore = pinia.state.value.auth;
    localStorage.setItem('authStoreState', JSON.stringify(authStore));
})