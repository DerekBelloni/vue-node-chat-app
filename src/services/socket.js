import { io } from "socket.io-client"
import { reactive } from "vue"

export const state = reactive({
  connected: false,
  receivedMessages: [],
  room: "",
  userID: ""
})

const URL = "http://localhost:9000"

export const socket = io(URL)

socket.on("connect", () => {
  state.connected = true;
  console.log("socket id: ", socket.id);
  state.userID = socket.id;
  console.log("user id: ", state.userID);
})

socket.on("disconnect", () => {
  state.connected = false;
  state.receivedMessages = [];
})

socket.on("message", (message) => {
  console.log("message received: ", message);
})

socket.on("chatHistory", (chatHistory) => {
  const uniqueHistory = chatHistory.filter((msg) => {
    return !state.receivedMessages.some((existingMsg) => existingMsg.id === msg.id);
  })

  uniqueHistory.forEach((msg) => state.receivedMessages.unshift(msg));
})

socket.on("broadcast", (...args) => {
  state.receivedMessages.push(...args);
})

