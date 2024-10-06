import React from "react";
import Header from "../components/Header";
import Herosection from "../components/Herosection";
import Steps from "../components/Steps";
import App from "../components/App";
import Details from "../components/Details";

const Home = () => {
  return (
    <>
      <Herosection />
      <Steps />
      <App />
      <Details />
    </>
  );
};

export default Home;
