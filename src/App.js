import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Orders from "./Pages/Orders";
import Header from "./components/Header";
import Login from "./components/Login";
import OrderDialog from "./components/OrderDialog";
import Wapper from "./components/Wapper";
import ProtectRoute from "./components/auth/ProtectRoute";
import { HandleContext } from "./hooks/HandleState";
import SocketProvider from "./hooks/SocketProvider";
import Comformation from "./components/Comformation";
import Footer from "./components/Footer";

function App() {
  const { userExist } = useContext(HandleContext);
  return (
    <BrowserRouter>
      <Login />
      <Wapper />
      <OrderDialog />
      <Comformation />
      <Toaster position="top-center" reverseOrder={false} />
      <SocketProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/order"
            element={
              <ProtectRoute user={userExist}>
                <Orders />
              </ProtectRoute>
            }
          />
        </Routes>
      </SocketProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
