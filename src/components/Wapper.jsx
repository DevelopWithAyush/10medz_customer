import React, { useContext } from "react";
import { HandleContext } from "../hooks/HandleState";

const Wapper = () => {
  const { openWapper, setOpenWapper, setOpenLogin, setOpenOrder, setConfirmationOpen } = useContext(HandleContext);
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        setOpenLogin(false);
        setOpenWapper(false);
        setOpenOrder(false)
        
      }}
      className={`${
        openWapper ? "scale-1" : "scale-0"
      } z-[999] fixed w-[100vw] h-[100vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 ease-in-out `}
      style={{
        backdropFilter: "blur(10px)",
      }}
    />
  );
};

export default Wapper;
