import React from "react";
import Image from "next/image";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center  bg-white">
      <div>
        <Image src="/v3.svg" alt="Hero Image" width={50} height={30} />
        <Image src="/v1.svg" alt="Hero Image" width={50} height={30} />

        <Image src="/v2.svg" alt="Hero Image" width={50} height={30} />
      </div>

      <div className="py-5">
        <h1 className="font-bold text-[#5F5F5F] text-[40px]">Get To Know Us</h1>
      </div>

      <div>
        <FeatureCard variant="mission"/>
        <FeatureCard variant="perspective" reverse/>
        <FeatureCard variant="keepsGoing"/>
      </div>
    </div>
  );
};

export default Features;
