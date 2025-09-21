import React from "react";
import FeatureCard from "../FeatureCard";

const Features = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-background">
      <div className="py-5">
        <h1 className="font-bold text-foreground text-[50px]">
          Get To Know Us!
        </h1>
      </div>

      <div>
        <FeatureCard variant="mission" />
        <FeatureCard variant="perspective" reverse />
        <FeatureCard variant="keepsGoing" />
      </div>
    </div>
  );
};

export default Features;
