import React, { FC } from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { AnimatedTooltip } from "../ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "/assets/rupes.jpg",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "/assets/rupes.jpg",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "/assets/rupes.jpg",
  },
  // Uncomment if needed
  // {
  //   id: 4,
  //   name: "Emily Davis",
  //   designation: "UX Designer",
  //   image: "/assets/rupes.jpg",
  // },
  // {
  //   id: 5,
  //   name: "Tyler Durden",
  //   designation: "Soap Developer",
  //   image: "/assets/rupes.jpg",
  // },
  // {
  //   id: 6,
  //   name: "Dora",
  //   designation: "The Explorer",
  //   image: "/assets/rupes.jpg",
  // },
];

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start py-10 lg:py-20 px-4 lg:px-8">
      {/* Hero Image */}
      <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
        <div className="relative w-[50vh] h-[50vh] lg:w-[600px] lg:h-[600px] rounded-full overflow-hidden">
          <Image
            src="/assets/rupes.jpg"
            alt="hero image"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>

      {/* Hero Text and Search */}
      <div className="w-full lg:w-1/2 lg:pl-10 flex flex-col items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0">
        <h2 className="text-2xl lg:text-5xl font-josefin font-semibold text-black dark:text-white mb-4 lg:mb-6 mt-[60px]">
          Improve Your Online Learning Experience Better Instantly
        </h2>
        <p className="text-md lg:text-lg font-josefin font-semibold text-black dark:text-white mb-6">
          We Have 1k+ Online Courses & 10,000+ Registered Students.
        </p>

        <div className="relative w-full lg:w-3/4 bg-transparent mb-6">
          <input
            type="search"
            placeholder="Search Courses..."
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-l-lg p-2 w-full h-full outline-none pl-4"
          />
          <div className="absolute right-0 top-0 bg-[#39c1f3] rounded-r-lg h-full flex items-center justify-center px-4">
            <BiSearch className="text-white" size={24} />
          </div>
        </div>

        {/* Tooltip or additional content */}
        <div className="flex items-center justify-center mb-10">
          <AnimatedTooltip items={people} />
          <p className="dark:text-white text-black text-center mt-2 ml-5">
            10k+ Students Already Trusted Us
           
          </p>
          <Link href={"/"} className="text-blue-400 mt-2 ml-2">
            View Courses
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;
