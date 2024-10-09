import { io } from "socket.io-client";

let socket;
const server = process.env.REACT_APP_API_URL

export const initiateSocket = () => {
    if (!socket) {
        socket = io(server, {
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
        });
    }
    return socket;
};

export const getSocket = () => {
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
