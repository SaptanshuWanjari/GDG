import Image from "next/image";
import React from "react";

interface props {
  img: string;
  title: string;
}

const Card = ({ img, title }: props) => {
  return (
    <div className="text-black">
      <span className="bg-red-500 w-[20%] rounded-lg"></span>
      <div>
        <Image src={img} alt={title} width={100} height={100} />
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Card;
