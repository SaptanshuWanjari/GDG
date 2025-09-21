import { BiChevronDown } from "react-icons/bi";
import Image from "next/image";
import React, { useState } from "react";
import Tooltip from "./Tooltip";

interface props {
  img: string;
  title: string;
  content: string;
  color?: string;
}

const Card = ({ img, title, content, color = "primary" }: props) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // Define color classes for the progress indicator
  const colorClasses = {
    primary: "bg-primary",
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };

  const progressColor =
    colorClasses[color as keyof typeof colorClasses] || colorClasses.primary;

  return (
    <div className="flex flex-col items-center justify-center mb-20 select-none w-full relative overflow-visible">
      {/* Single colored progress indicator */}
      <span
        className={`${progressColor} w-[45%] h-3 rounded-full select-none shadow-md mb-4`}
      />

      {/* Outer container - completely separate light/dark styling */}
      <div className="w-[20rem] sm:w-[22rem] h-64 flex items-center justify-center backdrop-blur-md rounded-3xl select-none border shadow-xl hover:shadow-2xl transition-all duration-700 overflow-visible hover:scale-[1.03] bg-gradient-to-br from-white/95 via-gray-50/90 to-white/95 border-gray-200/60 hover:from-white hover:via-gray-50/95 hover:to-white dark:bg-gradient-to-br dark:from-slate-800/60 dark:via-slate-700/40 dark:to-slate-800/20 dark:border-slate-600/50 dark:shadow-slate-900/50 dark:hover:shadow-complementary/20">
        {/* Inner card - completely separate light/dark styling */}
        <div className="backdrop-blur-sm w-[19rem] sm:w-[21rem] h-60 p-6 rounded-2xl select-none border transition-all duration-700 hover:scale-[1.01] hover:shadow-xl relative overflow-visible bg-white/90 border-gray-200/50 hover:bg-white text-gray-800 dark:bg-slate-800/90 dark:border-slate-600/60 dark:hover:shadow-complementary/30 dark:hover:bg-slate-800/95 dark:text-white">
          <div className="flex items-center justify-between flex-col h-full select-none">
            {/* Top section with image and title */}
            <div className="flex flex-col items-center space-y-4 flex-grow justify-center">
              {/* Image with clean theme-aware hover effects */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 dark:from-complementary/25 dark:to-complementary/10 rounded-full blur-lg transition-all duration-700 opacity-0 group-hover:opacity-100 scale-110"></div>
                <div className="absolute inset-0 bg-primary/8 dark:bg-complementary/12 rounded-full transition-all duration-500 opacity-40 group-hover:opacity-70"></div>
                <Image
                  src={img}
                  alt={title}
                  width={90}
                  height={90}
                  className="select-none relative z-10 transition-transform duration-700 group-hover:scale-110 drop-shadow-lg filter brightness-100 group-hover:brightness-110 dark:brightness-110 dark:group-hover:brightness-125"
                />
              </div>

              {/* Clean title with proper theme handling */}
              <h1 className="text-2xl sm:text-3xl font-bold select-none text-center text-gray-800 dark:text-white transition-all duration-500 hover:scale-105 hover:text-primary dark:hover:text-complementary">
                {title}
              </h1>
            </div>

            {/* Clean chevron with proper theme handling */}
            <div className="relative">
              <div
                className="group cursor-pointer transition-all duration-700 hover:scale-125 hover:bg-primary/15 dark:hover:bg-complementary/25 rounded-full p-3 -m-3 hover:shadow-md dark:hover:shadow-complementary/40"
                onMouseEnter={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
              >
                <BiChevronDown
                  size={32}
                  className="text-gray-600 group-hover:text-primary dark:text-gray-300 dark:group-hover:text-complementary transition-all duration-700 select-none group-hover:drop-shadow-md"
                />
              </div>

              {/* Tooltip positioned below the card */}
              <Tooltip
                content={content}
                isVisible={isTooltipVisible}
                position="bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
