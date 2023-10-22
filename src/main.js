import './index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import PrimeVue from 'primevue/config';
import Tailwind from "primevue/passthrough/tailwind";
import { accountService } from './services/AccountService';
import { useAccountStore } from './stores/useAccountStore';
import { useAuthStore } from './stores/useAuthStore';
import { useUploadStore } from './stores/useUploadStore';
import App from './App.vue';
import router from './router';
import _ from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faFaceDizzy } from '@fortawesome/free-regular-svg-icons';

library.add(faPencil, faPenToSquare, faFaceDizzy);

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(Toast);
app.use(PrimeVue, { unstyled: true, pt: Tailwind});

const accountStore = useAccountStore();
const authStore = useAuthStore();
const uploadStore = useUploadStore();

const initializeAuthStore = async() => {
    const storedCache = localStorage.getItem('authStoreState');
    const cachedState = storedCache ? JSON.parse(storedCache) : null;

    // probably dont need a dual check
    if (!cachedState || _.isEmpty(cachedState.sessionID)) {
        return;
    }

    authStore.sessionID = cachedState.sessionID;
    authStore.loggedIn = cachedState.loggedIn;

    try {
        const account = await accountService.getAccountBySession(cachedState.sessionID);
        uploadStore.fileName = account.uploads[0]?.file_name ?? null;
        uploadStore.accountID = account.uploads[0]?.accountID ?? null;
        
        accountStore.userEmail = account.account.email ?? null;
        accountStore.userName = account.account.username ?? null;
        accountStore.accountID = account.account._id ?? null;
    } catch (error) {
        router.push('/login');
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