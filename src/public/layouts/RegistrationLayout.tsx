import { Outlet } from "react-router";
import { motion } from "framer-motion";
import { AuthNavbar } from "../components/navigation/AuthNavbar";

export const RegistrationLayout = () => {
  return (
    <section className="h-screen w-full relative overflow-hidden bg-[#fafafa] flex flex-col">
      <AuthNavbar />
      <div className="absolute top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-150 h-150 rounded-full bg-brand-ternary/15 blur-[150px] pointer-events-none" />
      <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative z-10 custom-scrollbar">
        <div className="m-auto w-full items-center justify-center gap-14 px-6 py-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex items-center justify-center"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </section>
  );
};
