import { BiChevronDown } from "react-icons/bi";
import Image from "next/image";
import React from "react";

interface props {
  img: string;
  title: string;
  content: string;
}

const Card = ({ img, title, content }: props) => {
  return (
    <div className="flex flex-col items-center justify-center mb-15 select-none">
      <span className="bg-red-500 w-[40%] h-2 rounded-lg select-none">
        {""}1
      </span>
      <div className="shadow- w-85 h-55 flex glass items-center justify-center bg-[#e1e1e1] rounded-xl select-none">
        <div className="text-black bg-white shadow-2xl w-82 h-52 p-5 rounded-xl select-none">
          <div className="flex items-center justify-center flex-col select-none">
            <Image
              src={img}
              alt={title}
              width={100}
              height={100}
              className="select-none"
            />
            <h1 className="text-4xl text-main font-bold select-none">
              {title}
            </h1>
            <div>
              <BiChevronDown
                size={40}
                color={``}
                className="cursor-pointer select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
