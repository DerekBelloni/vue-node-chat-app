<template>
    <div class="mt-12 mb-6 mx-4 flex justify-center">
        <div class="flex flex-row">
            <textarea v-model="message" cols="75" class="border border-gray-300 rounded p-2"></textarea>
            <div class="ml-2 rounded shadow-sm px-2 flex items-center bg-gray-50 border border-gray-100">
                <button class="text-emerald-400" @click="sendMessage">Send</button>
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