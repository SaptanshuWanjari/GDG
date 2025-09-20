import React from "react";
import AccordionComponent from "../AccordionComponent";
const questions = [
  {
    q: "What is GDG?",
    a: "Google Developer Groups (GDG) are community groups for college and university students interested in Google developer technologies. Students from all undergraduate or graduate programs with an interest in growing as a developer are welcome. By joining a GDG, students grow their knowledge in a peer-to-peer learning environment and build solutions for local businesses and their community.",
    color: "red",
  },
  {
    q: "How can you become a part of GDG ?",
    a: "We conduct an annual team recruitment process. The details of recruitment are posted online a few weeks prior. It’s a two step process involving form filling and personal interview. Students acing both rounds are selected to be the part of the core team.",
    color: "green",
  },
  {
    q: "What does a GDG Lead do?",
    a: "A GDG Lead fills a lot of shoes. He works with the university to build the club, recruit the core team, host workshops, build projects, collaborate with local partners.",
    color: "blue",
  },
  {
    q: "How is DSC related to Google?",
    a: "A GDG Lead fills a lot of shoes. He works with the university to build the club, recruit the core team, host workshops, build projects, collaborate with local partners.",
    color: "yellow",
  },
  {
    q: "How to reach us?",
    a: 'Mail us at "dsc.rknec@gmail.com"',
    color: "red",
  },
];
const Faq = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-14 bg-white text-black">
      <h1 className="text-main text-[70px] font-bold my-15">FAQs</h1>
      {questions.map((item, index) => (
        <AccordionComponent
          key={index}
          trigger={item.q}
          content={item.a}
          color={item.color as "red" | "green" | "blue" | "yellow"}
        />
      ))}
    </div>
  );
};

export default Faq;
