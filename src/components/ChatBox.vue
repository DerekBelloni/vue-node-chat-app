<template>
    <div class="container mt-6 mx-auto">
        <div class="shadow-inner border border-gray-100 rounded-xl chat-box">
            <div class="flex flex-col justify-start text-start  mx-4 my-2">
                <div v-for="message in receivedMessages">
                    <div class="py-1 mx-2 my-1 flex flex-row">
                        <span 
                        class="rounded px-2 py-1 text-amber-50 bg-amber-500">{{ message.user }}: </span>
                        <span class="px-2 py-1 text-gray-500 text-wrap">{{ message.message }}</span>
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
        background-color:azure
    }
</style>