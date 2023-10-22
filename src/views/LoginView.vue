<template>
    <div class="container mt-16 mx-auto">
      <div class="flex justify-center">
        <div class="shadow-xl rounded login-card bg-white border border-gray-100">
          <div class="text-center mb-6">
            <h1 class="text-gray-500 font-medium text-xl my-2 px-4">Chat App</h1>
          </div>
          <div class="mx-2 divide-y divide-teal-300">
            <div class="space-y-4 mb-4 ">
              <div>
                <div class="flex flex-col">
                  <div class="mx-6">
                    <input v-model="loginAccountData.email" type="text" placeholder="Email" class="w-full rounded h-7 text-sm shadow-inner pl-1 border border-gray-200">
                  </div>
                </div>
                <div class="flex flex-col mt-4">
                  <div class="mx-6">
                    <input v-model="loginAccountData.password" type="password" placeholder="Password" class="w-full h-7 text-sm rounded shadow-inner border border-gray-200 pl-1 focus:ring-0 focus:ring-transparent">
                  </div>
                </div>
              </div>
              <div class="flex justify-end mt-4">
                <button @click="login()" class="shadow bg-teal-500 text-teal-200 rounded px-2 py-1 is-cursor mr-6 font-semibold">Login</button>
              </div>
            </div>
            <div class="pt-2 pb-4 mx-2 flex flex-row justify-end mx-6">
              <RouterLink to="/registration" class="is-cursor"><span class="text-teal-400 hover:text-teal-600">No Account? Get Registered Today!</span></RouterLink>
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
import { useUploadStore } from '@/stores/useUploadStore'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore();
const accountStore = useAccountStore();
const uploadStore = useUploadStore();
const router = useRouter();
const toast = useToast();

let loginAccountData = reactive({
  email: "",
  password: ""
});

async function login() {
  try {
    const account = await accountService.login(loginAccountData)

    if (!account) {
      this.toast.error('Invalid login credentials');
      return;
    }

    authStore.loggedIn = true;
    authStore.sessionID = account.session_id;

    accountStore.userEmail = account.account[0].email;
    accountStore.userName = account.account[0].username;
    accountStore.accountID = account.account[0]._id;

    uploadStore.accountID = account.uploads[0]?.accountID ?? null;
    uploadStore.fileName = account.uploads[0]?.file_name ?? null;

    this.toast.success(`Welcome back ${accountStore.userName}!`)
    router.push('/');
  } catch (error) {
    console.error("Error: ", error)
  }
}
</script>
  
<style scoped>
.login-card {
  min-width: 30%;
}
</style>