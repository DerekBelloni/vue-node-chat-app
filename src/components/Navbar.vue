<template>
    <div class="flex bg-gray-200 shadow-md">
        <div class="flex flex-row justify-between items-center">
            <div class="ml-8 py-4">
                <RouterLink to="/"><h1 class="font-semibold text-emerald-500">Chat App</h1></RouterLink>
            </div>
            <div class="ml-8">
                <button @click="logout()" class="rounded shadow shadow-amber-500 bg-white px-2 py-1 text-amber-500">Logout</button>
                <!-- <RouterView></RouterView> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { accountService } from '../services/AccountService';

const router = useRouter();

async function logout() {
    console.log('heres')
    try {
        await accountService.logout();
        router.push('/login');
    } catch (error) {
        console.error("Error: ", error);
    }
}
</script>

<style scoped>

</style>