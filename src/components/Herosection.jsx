import React, { useContext } from "react";
import bike from "../assets/image/Group 14787.png";
import party from "../assets/image/Party popper with confetti.png";
import { HandleContext } from "../hooks/HandleState";
const Herosection = () => {
  const {
    userExist,
    setFromOrder,
    setOpenLogin,
    order,
    setOpenOrder,
    setOpenWapper,
  } = useContext(HandleContext);
  return (
    <section className=" flex flex-col md:flex-row  justify-between  container mx-auto max-w-[88rem] mt-[199px]">
      <div className="flex flex-col items-center md:items-start gap-[38px] justify-start ">
        <p className="font-plight_300 text-center md:text-left text-[32px] md:text-[60px] leading-[50px] md:leading-[80px]  ">
          Medicine delivery <br /> in{" "}
          <span className="text-[40px] md:text-[64px] font-psemibold_600 text-primary">
            10 mins
          </span>{" "}
        </p>

        <div className="flex md:hidden w-[200px]">
          <img src={bike} alt="HerosecitonImage" />
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="text-black-100 font-pregular_400 text-[20px] md:text-[24px] leading-normal md:leading-[36px]">
            Get{" "}
            <span className="font-pbold_700  text-[20px] md:text-[36px] leading-[54px] text-secondary">
              15% off
            </span>{" "}
            on orders{" "}
          </p>
          <img className="hidden md:flex"  src={party} alt="party" />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            if (!userExist) {
              setOpenLogin(true);
            } else {
              setOpenOrder(true);
            }
            setFromOrder(true);
            setOpenWapper(true);
          }}
          className="px-[39px] py-[8px] text-[24px] bg-primary text-white font-pmedium_500 capitalize rounded-xl"
          style={{ boxShadow: "0px 4px 6px 4px #678FE83D" }}
        >
          Order now
        </button>
      </div>
      <div className="hidden md:flex">
        <img src={bike} alt="HerosecitonImage" />
      </div>
    </section>
  );
};

export default Herosection;
