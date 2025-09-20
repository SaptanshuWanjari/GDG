"use client";
import React from "react";
import Card from "../Card";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const technologies = [
  {
    name: "Flutter",
    icon: "/Tech/flutter.svg",
    content:
      "Build beautiful apps for any platform—mobile, web, and desktop—from a single codebase. With hot reload, you can see your changes instantly, making learning incredibly fast.",
  },
  {
    name: "Web",
    icon: "/Tech/react.svg",
    content:
      "React is all about components. They're like reusable building blocks that let you create complex user interfaces easily. This modular approach makes web development faster and more organized.",
  },
  {
    name: "Cloud",
    icon: "/Tech/cloud.svg",
    content:
      "Stay organized and collaborate with the essential tools of Google Workspace. This suite helps the club run smoothly, from managing documents to scheduling events.",
  },
  {
    name: "Figma",
    icon: "/Tech/figma.svg",
    content:
      "Collaborate on UI/UX projects in real time. Figma is the go-to tool for creating stunning designs for apps, websites, and even club posters.",
  },
  {
    name: "Firebase",
    icon: "/Tech/firebase.svg",
    content:
      "Understand your audience and grow the club's community. Use Firebase Analytics to get insights into user behavior and improve your outreach efforts.",
  },
  {
    name: "LeetCode",
    icon: "/Tech/leetcode.svg",
    content:
      "Test your skills in algorithmic problem-solving with Google's official platforms. Master data structures and algorithms, and get ready for a career in tech.",
  },
  {
    name: "Adobe",
    icon: "/Tech/adobe.svg",
    content:
      "Easily create professional-looking social media content. Adobe Express helps you design engaging graphics and videos to promote club events and share announcements.",
  },
];

const Technologies = () => {
  return (
    <section className="mb-20">
      <div className="flex flex-col items-center justify-center mb-10 px-10">
        <h1 className="divider text-[70px] font-bold text-main text-center mb-4">
          Technologies
        </h1>
        <p className="text-center text-main text-[32px] mb-8">
          Domains That Excite Us to Collaborate and Teach
        </p>
      </div>
      {/* Infinite scroll carousel with smooth motion transitions, no delay */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Carousel
          className="w-full mx-auto"
          opts={{
            align: "center",
            loop: true,
            skipSnaps: false,
            dragFree: false,
          }}
        >
          <motion.div layout>
            <CarouselContent className="flex transition-all duration-500 ease-in-out">
              {technologies.map((tech) => (
                <CarouselItem
                  key={tech.name}
                  className="basis-1/4 flex items-center justify-center px-2"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  >
                    <Card
                      img={tech.icon}
                      title={tech.name}
                      content={tech.content}
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </motion.div>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        {/* Blur overlay for side items */}
        <div className="absolute left-0 top-0 w-1/6 h-full bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none blur-[1px]" />
        <div className="absolute right-0 top-0 w-1/6 h-full bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none blur-[1px]" />
      </motion.div>
    </section>
  );
};

export default Technologies;
