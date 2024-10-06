import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { FaTimes } from "react-icons/fa"; // Correctly import the close icon
import { HandleContext } from "../hooks/HandleState";

const server = process.env.REACT_APP_API_URL;

const OrderDialog = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(""); // Added state for form input
  const [file, setFile] = useState(null); // Adjusted for file input
  const [location, setLocation] = useState(""); // Added missing state
  const [remark, setRemark] = useState(""); // Added missing state

  const { openOrder, setOpenOrder, setOpenWapper } = useContext(HandleContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner
    const toastId = toast.loading("Please wait, placing your order...");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("prescription", file); // Use correct file
    formData.append("location", location); // Append location
    formData.append("remark", remark); // Append remark

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/order/order`,
        formData,
        config
      );
      toast.success(data.message, { id: toastId });
      setLoading(false);
      setOpenOrder(false); // Close dialog on success
      setOpenWapper(false);
      setFile(null);
      setName("");
      setLocation(""); // Reset location input
      setRemark(""); // Reset remark input
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div
      className={`${openOrder ? "scale-1" : "scale-0"
        } z-[10000] duration-300 ease-in-out fixed w-[400px] top-1/2 left-1/2 gap-16 flex flex-col items-start justify-start -translate-x-1/2 -translate-y-1/2 py-6 bg-white rounded-xl px-6`}
      style={{ boxShadow: "0px 0px 17px 6px rgba(0, 0, 0, 0.25)" }}
    >
      <FaTimes
        onClick={() => {
          setOpenOrder(false);
          setOpenWapper(false);
        }}
        className="absolute text-[20px] self-end cursor-pointer"
      />

      <p className="text-[48px] text-[#4471D4] font-psemibold_600 leading-[48px]">
        Get <br />{" "}
        <span className="font-pbold_700 text-[#FE6903]">Medicine</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-5"
      >
        <InputSection title={"Name"} data={name} setData={setName} />
        <InputSection title={"Location"} data={location} setData={setLocation} />
        <InputSection title={"Remark"} data={remark} setData={setRemark} />
        <UploadButton setFile={setFile} />

        <button
          type="submit"
          className="px-6 py-3 text-[20px] text-white font-pmedium_500 duration-300 rounded-lg flex flex-row gap-2 items-center justify-center bg-[#FE6903]"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <CgSpinner className="mt-1 animate-spin " />
          ) : (
            "Get Price "
          )}
        </button>
      </form>
    </div>
  );
};

const UploadButton = ({ setFile }) => {
  return (
    <label
      htmlFor="uploadFile1"
      className="flex bg-gray-800 hover:bg-gray-700 text-white text-center px-5 py-10 outline-none flex-row gap-2 items-center justify-center rounded-xl w-full cursor-pointer font-[sans-serif]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 fill-white"
        viewBox="0 0 32 32"
      >
        <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
        <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
      </svg>
      Upload Prescription
      <input
        accept="image/*"
        type="file"
        id="uploadFile1"
        onChange={(e) => setFile(e.target.files[0])}
        className="hidden"
      />
    </label>
  );
};

const InputSection = ({ title, setData, data }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="flex flex-col items-start relative w-full">
      <label
        className={`text-[16px] absolute duration-300 ${focus || data ? "top-0 -translate-y-1/2" : "top-1/2 -translate-y-1/2"
          } bg-white left-5 font-[sans-serif]`}
        htmlFor={title.toLowerCase()} // Dynamically set htmlFor
      >
        Enter your {title}
      </label>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => setData(e.target.value)}
        value={data}
        className="py-3 w-full outline-[#FE6903] rounded-lg px-5 border border-solid border-[#FE6903] bg-transparent"
        type="text"
        id={title.toLowerCase()} // Dynamically set id
      />
    </div>
  );
};

export default OrderDialog;
