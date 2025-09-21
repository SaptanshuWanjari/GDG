import { IoLocationOutline } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import { FaLinkedinIn } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full pt-8 bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-gray-200 border-t border-gray-200 dark:border-slate-700">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center">
          {/* left section */}
          <aside className="flex flex-col items-center md:items-start justify-center gap-2">
            <Image
              src="/gdg.svg"
              alt="Logo"
              width={120}
              height={120}
              className="mb-1"
            />
            <h1 className="font-medium text-2xl sm:text-3xl text-center md:text-left">
              Google Developer Groups
            </h1>
            <p className="text-base sm:text-lg font-medium text-muted-foreground text-center md:text-left">
              <span className="text-blue-500">On Campus</span> • Ramdeobaba
              University
            </p>
          </aside>

          {/* divider (only on md+) */}
          <div className="hidden md:flex items-center justify-center">
            <div className="h-64 w-px bg-gray-300 dark:bg-slate-600" />
          </div>

          {/* divider only on sm */}
          <div className="md:hidden w-full ">
            <div className="h-px w-full bg-gray-300 dark:bg-slate-600" />
          </div>

          {/* right section */}
          <div className="flex flex-col gap-6">
            <span className="flex items-start gap-3">
              <IoLocationOutline size={28} />
              <div className="flex flex-col text-sm sm:text-base leading-tight">
                <span>
                  Shri Ramdeobaba College of Engineering and Management,
                </span>
                <span>
                  Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur-440013
                </span>
              </div>
            </span>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 w-full">
              <Link href="#" className="underline text-sm sm:text-base">
                <span className="flex items-center gap-2">
                  <CgMail size={24} />
                  <p>dsc.rknec@gmail.com</p>
                </span>
              </Link>

              {/* social media  */}
              <div className="flex flex-col items-start gap-2">
                <p className="text-base font-semibold">Follow Us:</p>
                <div className="flex gap-3 items-center">
                  <Link
                    href="https://www.instagram.com/gdgrknec/"
                    target="_blank"
                    className="rounded-full p-2 flex items-center justify-center bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-all duration-300 ease-in-out"
                    aria-label="Instagram"
                  >
                    <AiOutlineInstagram size={20} />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/gdg-rknec/"
                    target="_blank"
                    className="rounded-full p-2 flex items-center justify-center bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-all duration-300 ease-in-out"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn size={20} />
                  </Link>
                  <Link
                    href="https://www.facebook.com/gdgrknec"
                    target="_blank"
                    className="rounded-full p-2 flex items-center justify-center bg-muted-foreground/10 hover:bg-muted-foreground/20 transition-all duration-300 ease-in-out"
                    aria-label="X"
                  >
                    <Image src="/X.svg" alt="X" width={20} height={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom pic */}
      <div className="w-full mt-8">
        <Image
          src="/footer-pic.svg"
          alt="Footer"
          width={1920}
          height={180}
          className="w-full h-40 sm:h-48 md:h-52 object-cover"
        />
      </div>
    </footer>
  );
};

export default Footer;
