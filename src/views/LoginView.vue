<template>
    <div class="container mt-8 mx-auto">
      <div class="flex justify-center">
        <div class="shadow rounded w-1/2 bg-gray-100">
          <div class="text-center mb-6">
            <h1 class="text-gray-500 font-medium text-xl my-2 px-4">Chat App</h1>
          </div>
          <div class="mx-2 divide-y divide-teal-300">
            <div class="space-y-2 mb-4 ">
              <div class="flex flex-col">
                <div class="ml-6 mb-1">
                  <span class="font-medium text-gray-400">Email</span>
                </div>
                <div class="ml-6">
                  <input v-model="loginAccountData.email" type="text" class="rounded shadow-inner pl-1 border border-gray-200">
                </div>
              </div>
              <div class="flex flex-col">
                <div class="ml-6 mb-2">
                  <span class="font-medium text-gray-400">Password</span>
                </div>
                <div class="ml-6">
                  <input v-model="loginAccountData.password" type="text" class="rounded shadow-inner border border-gray-200 pl-1">
                </div>
              </div>
              <div class="flex justify-end">
                <button @click="login()" class="shadow bg-white text-teal-500 rounded px-2 py-1 is-cursor mr-2">Login</button>
              </div>
            </div>
            <div class="py-4 mx-2 flex flex-row justify-between">
              <span class="text-gray-400">No Account? Get Registered Today!</span>
              <RouterLink to="/registration" class="shadow bg-white  text-teal-500 rounded px-2 py-1 is-cursor">Register</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { reactive } from 'vue'
import { accountService } from '../services/AccountService'
import { useAuthStore } from '@/stores/useAuthStore'
import { useAccountStore } from '@/stores/useAccountStore'

const authStore = useAuthStore();
const accountStore = useAccountStore();
const router = useRouter();

let loginAccountData = reactive({
  email: "",
  password: ""
});

async function login() {
  try {
    const account = await accountService.login(loginAccountData)
    authStore.loggedIn = true;
    authStore.sessionID = account.session_id;
    accountStore.userEmail = account.account[0].email;
    accountStore.userName = account.account[0].username;
    router.push('/');
  } catch (error) {
    console.error("Error: ", error)
  }
}
</script>
  