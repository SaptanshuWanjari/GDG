import React from "react";
import Card from "./Card";

const technologies = {
  flutter: {
    name: "Flutter",
    icon: "/Tech/flutter.png",
  },
  web: {
    name: "Web",
    icon: "/Tech/react.png",
  },
  cloud: {
    name: "Cloud",
    icon: "/Tech/cloud.png",
  },
  figma: {
    name: "Figma",
    icon: "/Tech/figma.png",
  },
  firebase: {
    name: "Firebase",
    icon: "/Tech/firebase.png",
  },
  leetcode: {
    name: "LeetCode",
    icon: "/Tech/leetcode.png",
  },
  adobe: {
    name: "Adobe",
    icon: "/Tech/adobe.png",
  },
};
const Technologies = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center my-20 px-10">
        <h1 className="divider text-[70px] font-bold text-main text-center">
          Technologies
        </h1>
        <p className="text-center text-main text-[32px]">
          Domains That Excite Us to Collaborate and Teach
        </p>
      </div>

      <div className="">
        {Object.values(technologies).map((tech) => {
          return <Card img={tech.icon} key={tech.name} title={tech.name} />;
        })}
      </div>
    </div>
  );
};

export default Technologies;
