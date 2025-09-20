import { IoLocationOutline } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import { FaLinkedinIn } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import React from "react";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-[#ECECEC] px-0 pt-10 pb-0 flex flex-col items-center w-full">
      <div className="flex w-full max-w-6xl items-center justify-center gap-10 mx-auto">
        {/* left section */}
        <aside className="flex flex-col items-center justify-center px-4">
          <Image
            src="/gdg.svg"
            alt="Logo"
            width={140}
            height={140}
            className="mb-2"
          />
          <h1 className="text-main font-medium text-3xl mb-1">
            Google Developer Groups
          </h1>
          <p className="text-lg font-medium text-main mb-1">
            <span className="text-blue-500">On Campus</span> • Ramdeobaba
            University
          </p>
        </aside>
        <div className="flex flex-col items-center">
          <div className="h-66 rounded-lg w-1 bg-gray-400 mx-8 mt-5 self-center" />
        </div>

        {/* right section */}
        <div className=" flex flex-col gap-6 px-4 items-center">
          <span className="flex items-center gap-4 ">
            <IoLocationOutline size={48} color="black" />
            <div className="flex flex-col text-black text-base leading-tight">
              <span>
                Shri Ramdeobaba College of Engineering and Management,
              </span>
              <span>Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur-440013</span>
            </div>
          </span>
          <div className="flex flex-row items-start justify-between gap-8 w-full">
            <Link href="#" className="text-black underline">
              <span className="flex items-center gap-3">
                <CgMail size={48} color="black" />
                <p className="text-black text-lg">dsc.rknec@gmail.com</p>
              </span>
            </Link>

            {/* social media  */}
            <div className="flex flex-col items-start gap-2">
              <p className="text-black text-lg font-semibold">Follow Us:</p>
              <div className="flex gap-4 items-center">
                <Link
                  href="https://www.instagram.com/gdgrknec/"
                  target="_blank"
                  className="rounded-full p-2 flex items-center justify-center bg-gray-100 hover:bg-gray-400/20 transition-all duration-300 ease-in-out"
                >
                  <AiOutlineInstagram size={32} color="black" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/gdg-rknec/"
                  target="_blank"
                  className="rounded-full p-2 flex items-center justify-center bg-gray-100 hover:bg-gray-400/20 transition-all duration-300 ease-in-out"
                >
                  <FaLinkedinIn size={32} color="black" />
                </Link>
                <Link
                  href="https://www.facebook.com/gdgrknec"
                  target="_blank"
                  className="rounded-full p-2 flex items-center justify-center bg-gray-100 hover:bg-gray-400/20 transition-all duration-300 ease-in-out"
                >
                  <Image src="/X.svg" alt="X" width={32} height={32} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom pic */}
      <div className="w-full mt-12">
        <Image
          src="/footer-pic.svg"
          alt="Footer"
          width={1920}
          height={180}
          className="w-full h-52 object-cover"
        />
      </div>
    </footer>
  );
};

export default Footer;
