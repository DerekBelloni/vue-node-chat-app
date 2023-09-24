import { defineStore } from "pinia";
import { ref } from 'vue'; 

export const useAccountStore = defineStore('account', () => {
    const userEmail = ref("");
    const userName = ref("");
    const accountID = ref(null);

    return {userEmail, userName, accountID}
})