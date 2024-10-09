import { useMemo, useState, useEffect, createContext, useContext } from "react";
import { io } from "socket.io-client";
import { CUSTOMER_COMFORMATION } from "../components/constant/events";
import { HandleContext } from "./HandleState";
import toast from "react-hot-toast";

export const SocketContext = createContext();
const server = process.env.REACT_APP_API_URL;

const SocketProvider = ({ children }) => {
  const { setConfirmation, setConfirmationOpen } = useContext(HandleContext);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  console.log(isConnected);
  console.log(socket);
  console.log(reconnectAttempts);

  useEffect(() => {
    // Initialize socket connection with reconnection options
    const socketConnection = io(server, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      withCredentials: true,
    });

    setSocket(socketConnection);

    // Listen for connection
    socketConnection.on("connect", () => {
      setIsConnected(true);
      setReconnectAttempts(0);
      console.log("Connected to server");
      toast.success("Connected to socket");
    });

    // Listen for disconnection
    socketConnection.on("disconnect", (reason) => {
      setIsConnected(false);
      console.log("Disconnected:", reason);
      toast.error(`Disconnected: ${reason}`);
    });

    // Listen for reconnection attempts
    socketConnection.on("reconnect_attempt", (attemptNumber) => {
      setReconnectAttempts(attemptNumber);
      toast("Reconnection attempt #" + attemptNumber);
      console.log(`Reconnection attempt #${attemptNumber}`);
    });

    // Listen for successful reconnection
    socketConnection.on("reconnect", () => {
      setIsConnected(true);
      toast.success("Reconnected successfully");
      console.log("Reconnected successfully");
    });

    // Listen for reconnection failure
    socketConnection.on("reconnect_failed", () => {
      console.log("Reconnection failed");
    });

    // Cleanup on component unmount
    return () => {
      socketConnection.disconnect();
    };
  }, [server]);

  useEffect(() => {
    if (socket && isConnected) {
      socket.on(CUSTOMER_COMFORMATION, (data) => {
        console.log(data);
        setConfirmation({
          _id: data._id,
          billlink: data.billLink,
          price: data.price,
        });
        if (data.orderStatus === "Price Uploaded") {
          setConfirmationOpen(true);
        } else {
          toast.success(data?.orderStatus);
        }
      });
    }

    // Cleanup event listener when component unmounts or socket changes
    return () => {
      if (socket) {
        socket.off(CUSTOMER_COMFORMATION);
      }
    };
  }, [socket, isConnected, setConfirmation, setConfirmationOpen]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
