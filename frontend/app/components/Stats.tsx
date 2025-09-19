import React from "react";

type Props = {
  value: string;
  label: string;
};
const Stats = ({ value, label }: Props) => {
  return (
    <div className="flex flex-col items-center justify-start w-64 min-h-[20rem]">
      <div
        className="w-52 aspect-square relative"
        style={{
          backgroundImage: "url(/ring.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[60px] font-bold text-main text-center w-full">
          {value}
        </span>
      </div>
      <span className="font-sans text-4xl font-normal text-black text-center mt-4 max-w-[12rem] break-words hyphens-none">
        {label}
      </span>
    </div>
  );
};

export default Stats;
