<template>
  <header>    
    <Navbar/>
  </header>
  <main>
    <div class="mx-4 my-4">
      <div class="flex flex-row items-center">
        <div class="space-x-2">
          <button @click="connect()" class="rounded shadow-sm border border-green-600 p-2 text-green-400">Connect</button>
          <button @click="disconnect()" class="rounded shadow-sm border border-red-600 p-2 text-red-400">Disconnect</button>
        </div>
        <div class="ml-4 mr-8">
          <span :class="connected ? 'text-green-500 font-medium' : 'text-red-500 font-medium' ">Connected: {{connected}}</span>
        </div>
      </div>
    </div>
    <ChatBox :receivedMessages="state.receivedMessages" :userId="state.userID"/>
  </main>
  <footer>
    <TextArea @send:message="sendMessage"/>
  </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ChatBox from '../components/ChatBox.vue'
import Navbar from '../components/Navbar.vue'
import TextArea from '../components/TextArea.vue'
import { socket, state } from "../services/socket"
import { computed, onMounted } from 'vue'
import { useAccountStore } from '@/stores/useAccountStore'

const account = useAccountStore();

const connected = computed(() => {
  return state.connected
})

function connect() {
   socket.connect()
}

function disconnect() {
  socket.disconnect()
}

function sendMessage(message) {
  socket.emit('message', {message: message, user: account.userName})
}
</script>

<style scoped></style>
