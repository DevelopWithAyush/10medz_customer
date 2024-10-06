import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const HandleContext = createContext();

const HandleState = ({ children }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [openWapper, setOpenWapper] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [fromOrder, setFromOrder] = useState(false);
  const [myorder, setMyOrder] = useState([]);
  const [confirmation, setConfirmation] = useState({
    _id: "",
    billlink: "",
    price: "",
    orderStatus: "",
  });
  console.log(confirmation)
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const server = process.env.REACT_APP_API_URL;

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(`${server}/api/v1/user/logout`, config);
      if (data.success) {
        toast.success("Logout successfully");
        setUserExist(false);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const getMyProfile = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(`${server}/api/v1/user/me`, config);
      if (response.data.success) {
        console.log(response.data);
        setUserExist(true);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUserExist(false);
    }
  };

  const handleMyOrders = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(`${server}/api/v1/order/myorder`, config);
      if (response.data.success) {
        setMyOrder(response.data.transformedOrders.reverse());
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, [userExist]);

  return (
    <HandleContext.Provider
      value={{
        openLogin,
        setOpenLogin,
        openWapper,
        setOpenWapper,
        userExist,
        setUserExist,
        handleLogout,
        openOrder,
        setOpenOrder,
        fromOrder,
        setFromOrder,
        myorder,
        setMyOrder,
        getMyProfile,
        setConfirmation,
        confirmation,
        confirmationOpen,
        setConfirmationOpen,
        handleMyOrders,
      }}
    >
      {children}
    </HandleContext.Provider>
  );
};

export default HandleState;
