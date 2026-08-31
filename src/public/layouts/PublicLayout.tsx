import { Outlet } from "react-router";
import { Navbar } from "../components/navigation/Navbar";
import { Footer } from "../components/sections/landingPage/FooterSection/FooterSection";

export const PublicLayout = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
