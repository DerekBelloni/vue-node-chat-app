<template>
    <div class="flex flex-row  bg-white shadow-md justify-between items-center">
        <div class="ml-8 py-4">
            <RouterLink to="/"><h1 class="font-semibold text-emerald-500">Chat App</h1></RouterLink>
        </div>
        <div class="flex flex-row px-1 mr-8">
            <div class="mr-8">
                <a href="/profile"><button class="rounded shadow shadow-teal-500 bg-teal-100 px-2 py-1 text-teal-500">Profile Page</button></a>
            </div>
            <div class="mr-8">
                <button @click="logout()" class="rounded shadow shadow-rose-500 bg-rose-100 px-2 py-1 text-rose-500">Logout</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { accountService } from '../services/AccountService';
import { useAuthStore } from '../stores/useAuthStore';
import { useAccountStore } from '../stores/useAccountStore'
import { useToast } from 'vue-toastification';

const router = useRouter();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const toast = useToast();

async function logout() {
    try {
        await accountService.logout();
        localStorage.removeItem('authStoreState');
        authStore.loggedIn = false;
        authStore.sessionID = null;
        this.toast.success(`Goodbye ${accountStore.userName}!`) 
        router.push('/login');
    } catch (error) {
        console.error("Error: ", error);
    }
}

</script>

<style scoped>

</style>