import { motion } from "framer-motion";
import { CheckCircle2, Home, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function RegistrationSuccessfulPage() {
  return (
    // Background wrapper: You can replace this with the <AuthLayout> if you want it to match the split-screen design
    <div className="flex items-center justify-center py-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="bg-white shadow-2xl shadow-brand-primary/10 border-0 rounded-3xl overflow-hidden p-8 md:p-10 text-center relative">
          {/* Decorative background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-400/20 blur-3xl rounded-full pointer-events-none" />

          {/* Success Icon with pop animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="w-20 h-20 mx-auto bg-green-50 rounded-2xl flex items-center justify-center mb-6 relative"
          >
            <CheckCircle2 className="w-10 h-10 text-green-500" />

            {/* Subtle ping animation for the icon */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-green-500/30"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{
                delay: 0.5,
                duration: 1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          </motion.div>

          {/* Typography */}
          <div className="space-y-3 mb-8 relative z-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Sucessfully Submitted!
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-70 mx-auto">
              Your registration was successful. We have sent a confirmation link
              to your email address.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 relative z-10">
            {/* Note: In Next.js or React Router, wrap this Button in a <Link href="/"> tag */}
            <Button className="w-full h-12 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl text-md font-semibold shadow-lg shadow-brand-primary/30 transition-all active:scale-[0.98] flex items-center justify-center space-x-2">
              <Home className="w-4 h-4" />
              <Link to="/">Back to Home</Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full h-12 text-gray-500 hover:text-brand-primary hover:bg-brand-secondary/10 rounded-xl font-medium flex items-center justify-center space-x-2"
            >
              <Link to="/auth/loginv2">Go to Sign In</Link>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
