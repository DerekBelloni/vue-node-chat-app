<template>
    <div class="container mt-8 mx-auto">
        <div class="mb-8">
            <RouterLink to="/"><button class="shadow bg-white border border-teal-200 text-teal-500 rounded px-2 py-1 is-cursor">Home</button></RouterLink>
        </div>
      <div class="flex justify-center">
        <div class="shadow rounded w-1/2 bg-gray-100">
          <div class="text-center mb-6">
            <h1 class="text-gray-500 font-medium text-xl my-2 px-4">Registration</h1>
          </div>
          <div class="mx-2 divide-y divide-gray-200">
            <div class="space-y-2 mb-4">
              <div class="flex flex-row">
                <div class="ml-6 mb-2">
                  <span class="font-medium text-gray-400">User Name: </span>
                </div>
                <div class="ml-8">
                  <input v-model="newAccountData.username" type="text" class="rounded shadow-inner border border-gray-200 px-1">
                </div>
              </div>
              <div class="flex flex-row">
                <div class="ml-6 mb-2">
                  <span class="font-medium text-gray-400">Email: </span>
                </div>
                <div class="ml-8">
                  <input v-model="newAccountData.email" type="text" class="rounded shadow-inner border border-gray-200 px-1">
                </div>
              </div>
              <div class="flex flex-row">
                <div class="ml-6 mb-2">
                  <span class="font-medium text-gray-400">Password: </span>
                </div>
                <div class="ml-8">
                  <input v-model="newAccountData.password" type="text" class="rounded shadow-inner border border-gray-200 px-1" :error="passErr" error-message="Passwords do not match">
                </div>
              </div>
              <div class="flex flex-row">
                <div class="ml-6 mb-2">
                  <span class="font-medium text-gray-400">Confirm Password: </span>
                </div>
                <div class="ml-8">
                  <input v-model="conPass" type="text" class="rounded shadow-inner border border-gray-200 px-1">
                </div>
              </div>
              <div class="flex justify-end mr-2">
                <button @click="createAccount()" class="shadow bg-white border border-teal-200 text-teal-500 rounded px-2 py-1 is-cursor">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import  { accountService } from '../services/AccountService'
import { useAuthStore } from '@/stores/useAuthStore'
import { useAccountStore } from '@/stores/useAccountStore'

const authStore = useAuthStore();
const accountStore = useAccountStore();
const router = useRouter();

let newAccountData =  reactive({
  username: "",
  email: "",
  password: ""
});

let conPass = ref("")
let passMismatch = ref(false)
let passErr = ref(false);

// function checkPassConfirm() {
//   console.log('soon')
//   try {
//     await accountService.login
//   } catch (error) {
    
//   }
// }

function checkPassMatch() {
  if (newAccountData.password != conPass.value) {
      passMismatch = true;
			passErr = true;
  } else {
			passMismatch = false;
			passErr = false;
	} 
		
}

async function createAccount() {
  checkPassMatch();
  if (!passMismatch) {
    try {
		const account = await accountService.createAccount(newAccountData);
		authStore.loggedIn = true;	
		authStore.sessionID = account.session_id;
		accountStore.userEmail = account.newAccount.email;
		accountStore.userName = account.newAccount.username;
		router.push('/');
    } catch (error) {
      console.log("[Error]: ", error);
    }
  } else {
		console.log("Passwords dont match")
	}
}
</script>