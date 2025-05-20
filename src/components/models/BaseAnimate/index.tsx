// components/BaseAnimPage.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BaseAnimateProps = {
  children: ReactNode;
  className?: string;
};

export default function BaseAnimate({ children, className }: BaseAnimateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, marginTop: 300 }}
      animate={{ opacity: 1, marginTop: 0  }}
      exit={{ opacity: 0, marginTop: 300 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
