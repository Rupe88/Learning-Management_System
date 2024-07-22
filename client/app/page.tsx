"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero"
interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <>
      <div>
        <Heading
          title="Lms"
          description="Lms is a platform for students to learn and get help from respected Teachers"
          keywords="Mern, Pern , Machine learning, Programming"
        />
        <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      <Hero/>
      </div>
    </>
  );
};

export default Page;