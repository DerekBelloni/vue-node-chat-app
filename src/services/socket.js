import { io } from "socket.io-client"
import { reactive } from "vue"

export const state = reactive({
  connected: false,
  receivedMessages: [],
  userID: ""
})

const URL = "http://localhost:9000"

export const socket = io(URL)

socket.on("connect", () => {
  state.connected = true;
  console.log("socket id: ", socket.id)
  state.userID = socket.id
  console.log("user id: ", state.userID)
})

socket.on("disconnect", () => {
  state.connected = false;
  state.receivedMessages = [];
})

socket.on("message", (message) => {
  console.log("message received: ", message)
})

socket.on("broadcast", (...args) => {
  console.log('Message received in client: ', args)
  state.receivedMessages.push(...args)
  console.log('state messages: ', state.receivedMessages)
})

