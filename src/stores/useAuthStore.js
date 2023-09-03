import { defineStore } from "pinia";
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const loggedIn = ref(false);
    const sessionID = ref(null);

    return {loggedIn, sessionID}
})