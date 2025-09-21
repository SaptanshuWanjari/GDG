"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: string;
  isVisible: boolean;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip = ({ content, isVisible, position = "bottom" }: TooltipProps) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-card",
    bottom:
      "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-card",
    left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-card",
    right:
      "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-card",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: position === "bottom" ? -15 : 15,
          }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: position === "bottom" ? -15 : 15 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}
          className={`absolute z-[99999] ${positionClasses[position]} pointer-events-none`}
          style={{ zIndex: 99999 }}
        >
          <div className="bg-white/98 dark:bg-slate-800/95 backdrop-blur-lg border border-gray-200/80 dark:border-slate-600/60 rounded-xl shadow-xl dark:shadow-slate-900/30 dark:shadow-complementary/10 min-w-48 max-w-sm w-auto p-4 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-complementary/20 max-h-none">
            {/* Arrow */}
            <div
              className={`absolute w-0 h-0 border-[6px] ${arrowClasses[position]}`}
            />

            {/* Content with clean theme colors - auto height */}
            <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed font-medium whitespace-normal break-words">
              {content}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Tooltip;
