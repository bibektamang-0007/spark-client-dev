import { Link } from "react-router";
import { motion } from "framer-motion";
import { Compass, MoveLeft } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex max-w-md flex-col items-center"
      >
        <div className="mb-8 rounded-full bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <Compass className="h-20 w-20 text-slate-400" strokeWidth={1.5} />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-slate-800">
          Looks like you're lost
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          We couldn't find the page you're looking for. It might have been
          removed, renamed, or perhaps it never existed in the first place.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Link
            to="/"
            className="group flex items-center justify-center gap-2 rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
