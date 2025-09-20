import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center text-center gap-6 flex-1">
        <span>
          <span className="flex items-center justify-center">
            <Image src="/google.svg" alt="logo" width={300} height={300} />
            <h1 className="text-black text-6xl md:text-7xl font-bold font-sans ml-4">
              Developer Groups
            </h1>
          </span>
          <p className="text-[#646464] text-5xl font-semibold font-sans mb-6">
            RBU Chapter
          </p>
        </span>
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
        <button className="font-sans px-5 py-2 bg-blue-500 rounded-lg font-bold text-center text-lg w-38 cursor-pointer">
          Join Us
        </button>
      </div>
      {/* arrows */}
      <div className="mt-10 flex justify-center">
        <Image src="/v3.svg" alt="Hero Image" width={50} height={30} />
      </div>
    </div>
  );
};

export default Hero;
