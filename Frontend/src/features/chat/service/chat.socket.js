import { io } from "socket.io-client";

let socket;

export const initializeSocketConnection = () => {
    socket = io(import.meta.env.VITE_API_URL, {
        withCredentials: true,
    });

    socket.on("connect", () => {
        console.log("Connected to socket server with id:", socket.id);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
    });

    return socket;
};

export const getSocket = () => socket;