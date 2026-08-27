import { Outlet } from "react-router";
import { motion } from "framer-motion";

export const RegistrationLayout = () => {
  return (
    <section className="min-h-screen w-full relative overflow-hidden bg-[#fafafa] flex items-center justify-center">
      <div className="absolute top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-150 h-150 rounded-full bg-brand-ternary/15 blur-[150px] pointer-events-none" />
      <div className="relative container mx-auto gap-14 px-6 z-10 py-12 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex items-center justify-center"
        >
          <Outlet />
        </motion.div>
      </div>
    </section>
  );
};
