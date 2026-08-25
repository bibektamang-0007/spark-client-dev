import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/utils/utils";

export interface AnimatedDivProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  animationKey?: string | number;
  className?: string;
}

export function AnimatedDiv({
  children,
  animationKey,
  className,
  ...props
}: AnimatedDivProps) {
  return (
    <motion.div
      key={animationKey}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className={cn("space-y-6", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
