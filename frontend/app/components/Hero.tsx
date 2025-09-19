import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-14 bg-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center gap-6">
        <span className="flex items-center">
          <Image src="/google.svg" alt="logo" width={180} height={180} />

          <h1 className="text-black text-5xl md:text-7xl font-bold font-sans mb-2">
            Developer Groups
          </h1>
        </span>
        <p className="text-[#646464] text-2xl font-semibold font-sans mb-6">
          RBU Chapter
        </p>
        <Image
          src="/hero.svg"
          alt="Hero Image"
          width={500}
          height={300}
          className="object-cover mx-auto"
        />
        <p className="w-[65%] text-[#5F5F5F] text-center font-semibold text-[35px] font-sans">
          Google Developer Groups are community groups for college and
          university students interested in Google developer technologies.
        </p>

        <button className="font-sans px-5 py-2 bg-blue-500 rounded-lg font-bold text-center text-lg w-38">
          Join Us
        </button>
      </div>
    </div>
  );
};

export default Hero;
