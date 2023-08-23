import { io } from "socket.io-client";

class SocketioService {
    socket;
    rMsgs = [];
    constructor() {}

    setupSocketConnection() {
        this.socket = io(import.meta.env.VITE_VUE_APP_SOCKET_ENDPOINT || "http://localhost:9000");

        this.socket.on('broadcast', (data) => {
            console.log('Message received in client: ', data)
            this.rMsgs.push(data);
            console.log('received messages array: ', this.rMsgs);
        })
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect()
        }
    }

    emit(message) {
        if (this.socket) {
            this.socket.emit('message', message)
        }
    }
}

export default new SocketioService();