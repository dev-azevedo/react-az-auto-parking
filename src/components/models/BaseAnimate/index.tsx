// components/BaseAnimPage.tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import React from "react";

type BaseAnimateProps = {
  children: ReactNode;
  className?: string;
};

const BaseAnimate = ({ children, className }: BaseAnimateProps) => {
  return (
    <motion.div
      initial={{ opacity: .5, scale: .8 }}
      animate={{ opacity: 1, scale: 1  }}
      exit={{ opacity: .5, scale: .7 }}
      transition={{ duration: .5, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default React.memo(BaseAnimate);