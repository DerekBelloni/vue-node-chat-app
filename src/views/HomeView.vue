<template>
  <header>    
    <Navbar/>
  </header>
  <main>
    <div class="grid grid-cols-12">
      <div class="col-span-3">
        <div class="mx-2 my-4">
          <div class="flex flex-col space-y-8">
            <div class="flex flex-col">
              <div class="flex flex-row space-x-2">
                <button @click="connect()" class="rounded-full hover:shadow hover:shadow-green-400 bg-green-700 px-2 text-green-300">Connect</button>
                <button @click="disconnect()" class="rounded-full hover:shadow hover:shadow-red-400 border bg-red-700 px-2 text-red-300">Disconnect</button>
                <span :class="connected ? 'text-green-500 font-medium' : 'text-red-500 font-medium' ">Connected: {{connected}}</span>
              </div>
            </div>
            <div class="rounded bg-gray-100 shadow-inner mt-6">
              <span class="text-teal-400 font-medium">Available Rooms:</span>
              <div class="flex flex-row justify-between">
                <span class="text-teal-500 pl-2">Room 1</span>
                <div>
                  <button @click="joinRoom('room1')" class="text-teal-600 pr-4 hover:underline">Join</button>
                  <button @click="leaveRoom('room1')" class="text-teal-600 pr-4 hover:underline">Leave</button>
                </div>
              </div>
              <div class="flex flex-row justify-between">
                <span class="text-teal-500 pl-2">Room 2</span>
                <div>
                  <button @click="joinRoom('room2')" class="text-teal-600 pr-4 hover:underline">Join</button>
                  <button @click="leaveRoom('room2')" class="text-teal-600 pr-4 hover:underline">Leave</button>
                </div>
              </div>
            </div>
            <div class="ml-4 mr-8 flex flex-col">
              <img src="" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-9 mr-4">
        <ChatBox :activeRoom="activeRoom" :receivedMessages="state.receivedMessages" :userId="state.userID"/>
      </div>
    </div> 
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
import { computed, onMounted, ref } from 'vue'
import { useAccountStore } from '@/stores/useAccountStore'
import { useUploadStore } from '@/stores/useUploadStore'

const account = useAccountStore();
const upload = useUploadStore();
const activeRoom = ref("");

const connected = computed(() => {
  return state.connected
})

function connect() {
   socket.connect()
}

function disconnect() {
  socket.disconnect()
  activeRoom.value = "";
}

function joinRoom(room) {
  state.room = room;
  activeRoom.value = room;
  socket.emit('joinRoom', activeRoom.value);
}

function leaveRoom(room) {
  if (state.room == room) {
    state.room = '';
  }
  activeRoom.value = "";
  socket.emit('leaveRoom', room);
}

function sendMessage(message) {
  socket.emit('message', {message: message, user: account.userName, imageFilename: upload.fileName, accountID: account.accountID, roomName: activeRoom.value})
}
</script>

<style scoped></style>
