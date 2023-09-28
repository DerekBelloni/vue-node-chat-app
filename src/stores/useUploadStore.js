import { defineStore } from "pinia";
import { ref } from 'vue';

export const useUploadStore = defineStore('upload', () => {
    const accountID = ref(false);
    const fileName = ref(false);

    return {accountID, fileName}
})