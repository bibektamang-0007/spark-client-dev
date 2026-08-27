import { Outlet } from "react-router";
import { Navbar } from "../components/navigation/Navbar";

export const PublicLayout = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
};
