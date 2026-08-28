import { Outlet } from "react-router";
import { NODES_DATA } from "../constants/pageConstants";
import { motion } from "framer-motion";
import { AuthNavbar } from "../components/navigation/AuthNavbar";

export const AuthLayout = () => {
  return (
    <section className="h-screen w-full relative overflow-hidden bg-[#fafafa] flex flex-col">
      <AuthNavbar />
      <div className="absolute top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-150 h-150 rounded-full bg-brand-ternary/15 blur-[150px] pointer-events-none" />

      <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative z-10 custom-scrollbar">
        <div className="m-auto w-full max-w-7xl grid grid-cols-1 items-center justify-center gap-14 lg:grid-cols-2 lg:gap-20 px-6 py-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md mx-auto lg:mr-auto lg:ml-0"
          >
            <Outlet />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col relative"
          >
            <h1 className="m-0 text-balance text-center lg:text-left mb-12 font-sans text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight text-stone-900">
              One portal. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-purple-500">
                Every step of your startup journey.
              </span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 relative">
              {NODES_DATA.map((node, i) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileInView={{
                    y: [0, -8, 0],
                    transition: {
                      duration: node.floatDuration
                        ? parseFloat(String(node.floatDuration))
                        : 4,
                      delay: node.animationDelay
                        ? parseFloat(String(node.animationDelay))
                        : i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="group flex items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-md p-3 pr-5 shadow-sm border border-white/60 transition-all duration-300 hover:bg-white hover:shadow-xl hover:scale-105 cursor-default"
                  style={{
                    boxShadow: `0 4px 20px -2px ${node.borderColor}20`,
                  }}
                >
                  <div
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-12"
                    style={{
                      backgroundColor: node.iconBg,
                      color: node.iconColor,
                      border: `1.5px solid ${node.borderColor}`,
                      boxShadow: `0 0 0 4px ${node.borderColor}1A`,
                    }}
                  >
                    <node.icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-bold text-stone-900 mb-0.5">
                      {node.title}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {node.subtitle}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </section>
  );
};
