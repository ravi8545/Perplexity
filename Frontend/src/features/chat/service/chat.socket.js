import { io } from 'socket.io-client';

let socket;

export const initializeSocketConnection = () => {
    socket = io("http://localhost:3000", {
        withCredentials: true,
    });

    socket.on('connect', () => {
        console.log('Connected to socket server with id:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
    });

    return socket;
};

export const getSocket = () => {
    return socket;
};