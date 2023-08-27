<template>
    <div class="flex bg-gray-200 shadow-md">
        <div class="flex flex-row justify-between items-center">
            <div class="ml-8 py-4">
                <RouterLink to="/"><h1 class="font-semibold text-emerald-500">Chat App</h1></RouterLink>
            </div>
            <div class="ml-8">
                <!-- <button class="rounded shadow shadow-amber-500 bg-white px-2 py-1 text-amber-500">Login</button> -->
                <RouterLink class="rounded shadow shadow-amber-500 bg-white px-2 py-1 text-amber-500" to="/login">Login</RouterLink>
                <!-- <RouterView></RouterView> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>

</style>