<template>
    <div class="mx-8 mt-8">
        <a href="/"><button class="shadow rounded bg-rose-500 text-rose-100 px-2 py-1">Home</button></a>
    </div>
    <div class="container mx-auto mt-16 flex justify-center">
        <div class="shadow-xl rounded bg-wite w-1/2 border border-gray-100">
            <div class="px-4 py-4">
                <div class="flex flex-row">
                    <div class="flex flex-col">
                        <div class="flex flex-row space-x-6">
                            <span class="text-rose-500 font-medium text-lg">Edit Profile</span>
                            <a @click="editProfile()"><font-awesome-icon class="text-rose-500 cursor-pointer" icon="fa-regular fa-pen-to-square" /></a>
                        </div>
                        <div v-if="!editable" class="flex flex-row justify-between">
                            <span class="text-gray-500">Username:&nbsp;&nbsp;&nbsp;&nbsp;{{profileData.username}}</span>
                        </div>
                        <div v-else class="grid grid-cols-12 mt-4">
                            <div class="col-start-1 col-span-2">
                                <span class="text-gray-500">Username:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                            <div class="col-start-3 col-span-8">
                                <input type="text" v-model="profileData.username" class="w-1/2 h-7 text-sm rounded shadow-inner border border-gray-200 pl-1 focus:ring-0 focus:ring-transparent">
                            </div>
                        </div>
                        <div v-if="!editable">
                            <span class="text-gray-500">Email:&nbsp;&nbsp;&nbsp;&nbsp;{{profileData.email}}</span>
                        </div>
                        <div v-else class="grid grid-cols-12 mt-4">
                            <div class="col-start-1 col-span-2">
                                <span class="text-gray-500">Email:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                            <div class="col-start-3 col-span-8">
                                <input type="text" v-model="profileData.email" class="w-1/2 h-7 text-sm rounded shadow-inner border border-gray-200 pl-1 focus:ring-0 focus:ring-transparent">
                            </div>
                        </div>
                        <!-- Add Ability to Reset Password -->
                        <!-- <div v-if="editable" class="grid grid-cols-12 mt-4">
                            <div class="col-start-1 col-span-2">
                                
                            </div>
                        </div> -->
                    </div>
                    <div class="ml-12">
                        <DropZone></DropZone>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAccountStore } from '../stores/useAccountStore';
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue';
import DropZone from '../components/DropZone.vue'

const accountStore = useAccountStore();
const { userName, userEmail } = accountStore;
const editable = ref(false);
let profileData = reactive({
    username: userName,
    email: userEmail
})


function editProfile() {
    editable.value = !editable.value
}
// onMounted(() => {
//     console.log(userName, userEmail);
// });
</script>