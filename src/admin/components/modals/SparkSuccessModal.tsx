import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SparkSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  sparkId: string;
}

export function SparkSuccessModal({
  isOpen,
  onClose,
  sparkId,
}: SparkSuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#22c55e", "#10b981", "#f59e0b", "#3b82f6", "#8b5cf6"], // Rich success colors
          disableForReducedMotion: true,
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 h-8 w-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 z-20"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-400/20 blur-3xl rounded-full pointer-events-none" />

            <div className="relative p-8 pt-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                Application Approved!
              </h2>
              <p className="text-sm text-slate-500 mb-8 max-w-70 leading-relaxed">
                The registration has been successfully processed and verified.
              </p>

              <div className="w-full relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-green-500 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />

                <div className="relative bg-white border border-green-100 p-5 rounded-2xl shadow-sm flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-600">
                    <Sparkles className="w-3.5 h-3.5" />
                    Spark ID Generated
                  </div>

                  <div className="flex items-center gap-3 w-full justify-center bg-slate-50 rounded-xl py-3 px-4 border border-slate-100 mt-1">
                    <span className="font-mono text-xl font-bold text-slate-800 tracking-wider">
                      {sparkId}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={onClose}
                className="w-full mt-8 h-12 bg-brand-primary hover:bg-brand-primary/80 text-white rounded-xl font-semibold shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
              >
                Continue to Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
