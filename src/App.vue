<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ChatBox from './components/ChatBox.vue'
import Navbar from './components/Navbar.vue'
import TextArea from './components/TextArea.vue'
import SocketService from './services/socketio.service.js'
import { onMounted, onBeforeUnmount, reactive } from 'vue'

let msgEvent =  reactive([]);

onMounted(() => {
  SocketService.setupSocketConnection();
})

onBeforeUnmount(() => {
  SocketService.disconnect();
})

function sendMessage(message) {
  SocketService.emit(message)
}

</script>

<template>
  <header>    
    <Navbar/>
  </header>
  <main>
    <ChatBox/>
  </main>
  <footer>
    <TextArea @send:message="sendMessage"/>
  </footer>
</template>

<style scoped>

</style>
