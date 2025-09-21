"use client";
import React from "react";
import { motion } from "framer-motion";
import QuarterRing from "./QuarterRing";

type Props = {
  value: string;
  label: string;
};

const Stats = ({ value, label }: Props) => {
  return (
    <div className="flex flex-col items-center justify-start w-52 sm:w-56 md:w-64 min-h-[18rem]">
      {/* Ring container with custom QuarterRing */}
      <motion.div
        className="w-44 sm:w-48 md:w-52 aspect-square relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0 }}
      >
        {/* Custom 4-quarter ring */}
        <QuarterRing size={208} strokeWidth={12} className="w-full h-full" />

        {/* Value positioned in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-foreground drop-shadow-sm">
            {value}
          </span>
        </div>
      </motion.div>

      {/* Label */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      >
        <span className="font-sans text-xl sm:text-2xl font-semibold text-center max-w-[12rem] text-foreground block px-2">
          {label}
        </span>
      </motion.div>
    </div>
  );
};

export default Stats;
