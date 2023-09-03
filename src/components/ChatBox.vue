<template>
    <div class="container mt-6 mx-auto">
        <div class="shadow-inner border border-gray-100 rounded-xl chat-box">
            <div class="flex flex-col justify-start text-start  mx-4 my-2">
                <div v-for="message in receivedMessages">
                    <div class="py-1 mx-2 my-1 flex flex-row">
                        <span class="bg-gray-100 rounded px-2 py-1 text-gray-500">{{ message.user }}: </span>
                        <span class="bg-gray-100 rounded px-2 py-1 text-gray-500">{{ message.message }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messages: []
        }
    },
    props: [
        'receivedMessages',
    ]
}
</script>

<style scoped>
    .chat-box {
        min-height: 65vh;
    }
</style>