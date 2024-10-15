import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // Your backend address
export const socket = io(SOCKET_URL);
