<template>
    <div class="container mt-6 mx-auto scrollable">
        <span class="text-lg text-teal-500">{{props.activeRoom}}</span>
        <div class="shadow-inner border border-gray-100 rounded-xl chat-box ">
            <div class="flex flex-col justify-start text-start  mx-4 my-2">
                <div v-for="message in receivedMessages">
                    <div class="py-1 mx-2 my-1 flex flex-row items-start" v-if="props.activeRoom == message.roomName">
                        <img :src="imageUrls[message.imageFilename]" class="h-12 w-12 rounded-full" alt="Profile Picture" v-if="imageUrls[message.imageFilename]"/>
                        <div class="bg-gray-100 ml-2 py-2 flex items-center rounded">
                            <span class="ml-2">{{ message.user }}: </span>
                            <span class="px-2 py-1 text-gray-500 text-wrap">{{ message.message }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, defineProps } from 'vue';
import { state } from "../services/socket";
import { uploadsService } from "../services/UploadsService";
import { useToast } from 'vue-toastification';

const imageUrls = ref({});


async function getProfilePic(message) {
    let fileName = message.imageFilename
    return await uploadsService.getProfilePic(fileName);
}

watchEffect(() => {
    if (state.receivedMessages.length) {
        const message = state.receivedMessages[state.receivedMessages.length - 1];
        getProfilePic(message).then(imageUrl => {
            imageUrls.value[message.imageFilename] = imageUrl;
        });
    }
});

const props = defineProps(['receivedMessages', 'activeRoom']); 

</script>

<style scoped>
    .chat-box {
        min-height: 65vh;
        background-color:white;
    }
</style>