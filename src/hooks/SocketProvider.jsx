import { useMemo } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import { CUSTOMER_COMFORMATION } from "../components/constant/events";
import { useContext } from "react";
import { HandleContext } from "./HandleState";
import toast from "react-hot-toast";

export const SocketContext = createContext();
const server = process.env.REACT_APP_API_URL;

const SocketProvider = ({ children }) => {
  const { setConfirmation, setConfirmationOpen } = useContext(HandleContext);
  const socket = useMemo(() => io(server, { withCredentials: true }), []);

  useEffect(() => {
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
    return () => {
      socket.off(CUSTOMER_COMFORMATION);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
