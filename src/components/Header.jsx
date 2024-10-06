import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/image/Group 75793.png";
import { Link, useLocation } from "react-router-dom";
import { HandleContext } from "../hooks/HandleState";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  const location = useLocation();
  const [nav, setNav] = useState(false);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 80) {
        setBlur(true);
      } else {
        setBlur(false);
      }
      if (scrollTop > lastScroll) {
        setNav(true);
      } else {
        setNav(false);
      }
      lastScroll = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { handleLogout, setOpenLogin, setOpenWapper, userExist } =
    useContext(HandleContext);
  const [menuBtn, setMenuBtn] = useState(false);
  return (
    <>
      <NavbarForSmallAndMedium setMenuBtn={setMenuBtn} menuBtn={menuBtn} />
      <header
        className={`${blur ? "bg-opacity-100" : "bg-opacity-0"} 
              ${
                menuBtn
                  ? nav
                    ? "top-[1%]"
                    : "top-[1%]"
                  : nav
                  ? "top-[-100%]"
                  : "top-[1%]"
              } 
              z-[1000] duration-500 container mx-auto max-w-[88rem] 
              rounded-xl bg-white flex flex-row items-center justify-between 
              fixed left-1/2 -translate-x-1/2 px-3 md:px-6`}
      >
        <Logo />
        <nav className="hidden md:flex flex-row items-center justify-center gap-[30px]">
          <Link
            to={"/aboutus"}
            className="font-pmedium_500 text-[15px] text-black "
          >
            About Us
          </Link>
          <Link
            to={"/aboutus"}
            className="font-pmedium_500 text-[15px] text-black "
          >
            Contact Us
          </Link>

          {location.pathname === "/order" ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <Button buttonName={"Logout"} />
            </button>
          ) : userExist ? (
            <Link to={"/order"}>
              <Button buttonName={"Orders"} />
            </Link>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenLogin(true);
                setOpenWapper(true);
              }}
            >
              <Button buttonName={"Login"} />
            </button>
          )}
        </nav>
        <button
          onClick={(e) => {
            e.preventDefault();
            setMenuBtn(!menuBtn);
          }}
          className="flex flex-col items-center justify-center md:hidden"
        >
          <IoMenu className="text-[32px] text-[#FE6903]" />
        </button>
      </header>
    </>
  );
};

const Logo = () => {
  return (
    <Link to={"/"}>
      <img src={logo} alt="logo" />
    </Link>
  );
};

const Button = ({ buttonName }) => {
  return (
    <div
      className="text-[20px] text-white rounded-[12px]
         bg-[#FE6903] flex flex-col items-center font-medium justify-center px-6 py-2 "
    >
      {buttonName}
    </div>
  );
};

const NavbarForSmallAndMedium = ({ setMenuBtn, menuBtn }) => {
  const location = useLocation();
  const { setOpenWapper, setOpenLogin, userExist, handleLogout, adminExist } =
    useContext(HandleContext);
  return (
    <nav
      className={` md:hidden fixed  z-[999] duration-500 ease-in-out  w-full ${
        menuBtn ? "top-0" : "top-[-100%]"
      } bg-white pb-10 pt-[85px] flex  flex-col items-center justify-center gap-10 rounded-b-xl `}
      style={{ boxShadow: "0px 0px 17px 12px rgba(0, 0, 0, 0.25)" }}
    >
      <Link
        onClick={() => {
          setMenuBtn(false);
        }}
        className="flex text-black text-[20px] font-medium"
        to={"/"}
      >
        Home
      </Link>
      <Link
        to={"/about"}
        onClick={() => {
          setMenuBtn(false);
        }}
        className="flex text-black text-[20px] font-medium"
      >
        About Us
      </Link>

      {location.pathname === "/order" ? (
        <button
        onClick={handleLogout}
        >
          <Button buttonName={"Logout"} />
        </button>
      ) : userExist ? (
        <Link to={"/order"}>
          <Button buttonName={"Orders"} />
        </Link>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpenLogin(true);
            setOpenWapper(true);
          }}
        >
          <Button buttonName={"Login"} />
        </button>
      )}
    </nav>
  );
};
export default Header;
