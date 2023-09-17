<template>
    <div class="mt-12 mb-6 mx-4 flex justify-center">
        <div class="flex flex-row items-center">
            <textarea v-model="message" cols="75" class="border border-gray-300 rounded p-2 text-gray-500"></textarea>
            <div class="ml-4 h-8 rounded px-2 flex items-center bg-green-500">
                <button class="text-green-200" @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: ""
        }
    },
    methods: {
        sendMessage() {
            this.$emit('send:message', this.message)
            this.message = null
        }
    }
}
</script>

<style scoped></style>