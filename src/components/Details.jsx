import React from "react";
import image5 from "../assets/image/Group 76037.png";
import image3 from "../assets/image/image 176.png";
import image2 from "../assets/image/image 178.png";
import image4 from "../assets/image/image 179.png";
import image6 from "../assets/image/image 186.png";
import image1 from "../assets/image/image 188.png";

const detailData = [
  {
    image: image1,
    title: "Upload prescriptions & get it verified in seconds",
    desc: "Effortlessly upload prescriptions for instant verification through a seamless and efficient process, our pharmacist will promptly add the prescribed medicines to your cart.",
    reverse_row: false,
  },
  {
    image: image2,
    title: "Delivery at your hospital bed or doorstep",
    desc: "Whether you're in a hospital bed or at home, our smooth delivery ensures timely access to your required medications.",
    reverse_row: true,
  },
  {
    image: image3,
    title: "Curated deals for you",
    desc: "Specially curated deals for you, featuring minimum 15% off on all orders to enhance your savings and satisfaction.",
    reverse_row: false,
  },
  {
    image: image4,
    title: "Saved prescriptions for a quick checkout",
    desc: "Streamline your checkout process by utilizing saved prescriptions, eliminating the need for repeated prescription uploads and ensuring a seamless experience.",
    reverse_row: true,
  },
  {
    image: image5,
    title: "Order tracking and status",
    desc: "Stay informed about the progress of your order with our comprehensive order tracking system, providing real-time updates on its status and delivery.",
    reverse_row: false,
  },
  {
    image: image6,
    title: "Pharmacist recommendations",
    desc: "Benefit from personalized guidance and suggestions from our experienced pharmacists, ensuring you make informed decisions about your medications and healthcare.",
    reverse_row: true,
  },
];

const Details = () => {
  return (
    <section className="container mx-auto max-w-[88rem] flex flex-col items-center justify-start mt-[357px]">
      {detailData.map((data, index) => {
        return (
          <Card
            image={data.image}
            key={index}
            title={data.title}
            desc={data.desc}
            row_reverse={data.reverse_row}
          />
        );
      })}
    </section>
  );
};

const Card = ({ image, title, desc, row_reverse }) => {
  return (
    <div
      className={`flex ${
        row_reverse ? "flex-col lg:flex-row-reverse" : " flex-col lg:flex-row"
      } items-center w-full justify-between my-8`}
    >
      <div className="">
        <img src={image} alt={title} className="max-w-[260px]" />
      </div>
      <div className="flex flex-col items-center lg:items-start justify-start gap-[20px] p-4">
        <h3 className=" text-center lg:text-left text-[44px] font-pmedium_500 leading-[62px] tracking-[-0.2%] text-primary max-w-[560px]">
          {title}
        </h3>
        <p className=" text-center lg:text-left font-plight_300 text-[20px] leading-[35px] tracking-[-0.2%] max-w-[572px]">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Details;
