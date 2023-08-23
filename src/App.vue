<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ChatBox from './components/ChatBox.vue'
import Navbar from './components/Navbar.vue'
import TextArea from './components/TextArea.vue'
import SocketService from './services/socketio.service.js'
import { socket, state } from "./services/socket"
import { onMounted, watch, reactive, ref } from 'vue'

let msgEvent =  reactive([]);
let connected = ref(false)
let message = ref("")


onMounted(() => {
  msgEvent = state.receivedMessages
  connected = state.connected
  console.log('message event: ', msgEvent)
})

watch(state.receivedMessages, (newValue, oldValue) => {
  console.log("New message", newValue);
})

function connect() {
   socket.connect()
   connected = true;
   console.log('connected: ', connected)
}

function disconnect() {
  socket.disconnect()
  connected = false;
  console.log('connected: ', connected)
}

function sendMessage(message) {
  socket.emit('message', message)
}



</script>

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
      <div class="flex flex-col">
        <div v-for="message in state.receivedMessages">
          {{ message }}
        </div>
      </div>
    </div>
    <ChatBox/>
  </main>
  <footer>
    <TextArea @send:message="sendMessage"/>
  </footer>
</template>

<style scoped>

</style>
