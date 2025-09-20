"use client";
import React from "react";
import { motion } from "framer-motion";
type Props = {
  value: string;
  label: string;
};
const Stats = ({ value, label }: Props) => {
  return (
    <div className="flex flex-col items-center justify-start w-64 min-h-[20rem]">
      <motion.div
        className="w-52 aspect-square relative"
        style={{
          backgroundImage: "url(/ring.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0 }}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[60px] font-bold text-main text-center w-full">
          {value}
        </span>
      </motion.div>
      <motion.span
        className="font-sans text-4xl font-normal text-black text-center mt-4 max-w-[12rem] break-words hyphens-none"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
      >
        {label}
      </motion.span>
    </div>
  );
};

export default Stats;
