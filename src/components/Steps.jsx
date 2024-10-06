import React from "react";
import img1 from "../assets/image/amico.png";
import img3 from "../assets/image/Group 14711.png";
import img2 from "../assets/image/Group 76062.png";

const cardData = [
  {
    image: img1,
    title: "Prescription",
    desc: "Take a picture of the medicine or  share the prescription on whatsapp.",
  },
  {
    image: img3,
    title: "Location",
    desc: "Share your current/ live location on whatsapp",
  },
  {
    image: img2,
    title: "Payment on delivery",
    desc: "After receiving medicines pay directly via preferred method.",
  },
];
const Steps = () => {
  return (
    <section className="container  flex flex-col items-center justify-start gap-[84px] mx-auto max-w-[88rem] mt-[254px] px-3 ">
      <div className="flex flex-col items-center justify-center">
        <p className=" text-black text-[36px] text-center md:text-[44px]  font-plight_300 leading-[50px] tracking-[-0.02px] md:leading-[62px] md:tracking-[-0.2%]">
          Get medicine in 3 simple steps
        </p>
        <p className="text-black leading-[24px] text-[16px] font-pregular_400 tracking-[-0.2%] text-center max-w-[673px]">
          Just send your prescription and current location to WhatsApp, and your
          medicine will be on its way in no time.
        </p>
      </div>

      <div className="grid grid-cols-12 lg:gap-[50px] gap-[40px] w-full  ">
        {cardData.map((item, index) => {
          return (
            <Card
              image={item.image}
              index={index}
              title={item.title}
              desc={item.desc}
            />
          );
        })}
      </div>
    </section>
  );
};

const Card = ({ title, image, desc, index }) => {
  return (
    <div
      className="col-span-12 lg:col-span-4 w-full pt-8 pb-[22px] px-[12px] bg-[#FFFBF4] flex flex-col items-center justify-start gap-[42px] rounded-[24px] "
      style={{ boxShadow: "0px 4px 6px 2px #7EA6FF75" }}
    >
      <img
        src={image}
        className="w-[150px] lg:w-auto h-auto"
        alt={"cartimage" + { index }}
      />
      <div className=" w-full flex flex-col items-center gap-2">
        <p className="text-[24px] leading-[36px] font-psemibold_600 text-black-100">
          {title}
        </p>
        <p className="text-[20px] font-pregular_400 leading-[30px] text-center">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Steps;
