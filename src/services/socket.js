import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default {
  socket,
  connect() {
    socket.connect();
  },
  disconnect() {
    socket.disconnect();
  },
  on(event, callback) {
    socket.on(event, callback);
  },
  off(event, callback) {
    socket.off(event, callback);
  },
  emit(event, data) {
    socket.emit(event, data);
  },
};
