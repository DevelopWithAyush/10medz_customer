import React, { useContext } from "react";
import { HandleContext } from "../hooks/HandleState";
import { FaPhone } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const server = process.env.REACT_APP_API_URL;
const Comformation = () => {
  const { confirmation, confirmationOpen, setConfirmationOpen, setOpenWapper } =
    useContext(HandleContext);
  const navigate = useNavigate(); // Correct hook


  const handleOrderUpdate = async (id, orderStatus) => {
    const toastId = toast.loading("Please wait, updating the order...");

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        `${server}/api/v1/order/updateorder/${id}`,
        { orderStatus },
        config
      );

      toast.success(data.message, { id: toastId });
      setConfirmationOpen(false);
      navigate("/order")
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div
      className={`w-[350px] ${
        confirmationOpen ? "top-5" : "top-[-100%]"
      } z-[10000] transition-all duration-300 ease-in-out  overflow-hidden px-3 py-4 border bg-white rounded-xl border-solid border-[#FE6903] flex flex-col items-center justify-center gap-3  fixed top-5 left-1/2 -translate-x-1/2`}
    >
      <p className="self-start text-[24px] font-psemibold_600 tracking-wider">
        Price of Medicine
      </p>
      <img
        className="w-full h-[300px] object-cover rounded-lg outline-none border-none"
        src={confirmation?.billlink}
        alt={confirmation?.billlink}
      />
      <p className="text-[20px] capitalize font-pmedium_500 tracking-wide ">
        Rs:-{confirmation?.price}
      </p>
      <div className="w-full grid grid-cols-12  mt-2 gap-2">
        <a
          href="tel:+917572077736"
          className="col-span-2 text-white py-3 aspect-square  bg-[#FE6903] flex flex-col items-center justify-center  rounded-full text-[16px] font-pmedium_500"
        >
          <FaPhone />
        </a>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleOrderUpdate(confirmation?._id, "Confirm Order");
          }}
          className="col-span-5 text-white  py-3 bg-[#FE6903] rounded-xl text-[16px] font-pmedium_500"
        >
          Confirm
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setConfirmationOpen(!confirmationOpen);
            setOpenWapper(false);
            handleOrderUpdate(confirmation?._id, "Cancelled");
          }}
          className="col-span-5 text-white  py-3 bg-black/60 rounded-xl text-[16px] font-pmedium_500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Comformation;
