import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

export default RootLayout;
