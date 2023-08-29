import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {
    const loggedIn = ref(false);
    const sessionId = ref(null);

    return {loggedIn, sessionId}
})