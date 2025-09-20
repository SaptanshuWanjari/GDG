"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { motion } from "framer-motion";

const AccordionComponent = ({
  trigger,
  content,
  color,
}: {
  trigger: string;
  content: string;
  color: "red" | "green" | "blue" | "yellow";
}) => {
  const variants = {
    open: { opacity: 1, height: "auto", transition: { duration: 1 } },
    closed: { opacity: 0, height: 0, transition: { duration: 1 } },
  };

  const colorMap: Record<
    "red" | "green" | "blue" | "yellow",
    { arrow: string; border: string }
  > = {
    red: { arrow: "text-red-500", border: "bg-red-500" },
    green: { arrow: "text-green-600", border: "bg-green-600" },
    blue: { arrow: "text-blue-500", border: "bg-blue-500" },
    yellow: { arrow: "text-yellow-400", border: "bg-yellow-400" },
  };

  const arrowClass = colorMap[color].arrow;
  const borderClass = colorMap[color].border;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0 }}
      // viewport={{ once: false }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="space-y-5">
          <AccordionTrigger
            className="border-8 text-main font-bold text-2xl text-center border-gray-200 bg-white rounded-full p-5 w-180 "
            color={arrowClass}
          >
            {trigger}
          </AccordionTrigger>
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
          >
            <AccordionContent>
              <div className="max-w-xl mx-auto my-3 flex">
                {/* Left border */}
                <div className={`w-[9px] rounded-l-lg ${borderClass}`}></div>

                {/* Outer container with text */}
                <div className="flex-1 border-9 border-gray-300 rounded-r-3xl p-5 bg-white shadow-md text-gray-700 text-sm leading-relaxed font-sans">
                  <p className=" text-[#5F5F5F] text-[18px] font-medium ">
                    {content}
                  </p>
                </div>
              </div>
            </AccordionContent>
          </motion.div>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default AccordionComponent;
