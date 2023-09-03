import { defineStore } from "pinia";
import { ref } from 'vue'; 

export const useAccountStore = defineStore('account', () => {
    const userEmail = ref("");
    const userName = ref("");

    return {userEmail, userName}
})