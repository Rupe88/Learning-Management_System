import Link from "next/link";
import React from "react";

export const navItemData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQs",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemData &&
          navItemData.map((i, index) => (
            <Link href={i.url} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[10px] px-6 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {/* Mobile view */}
      {isMobile && (
        <div className="800px:hidden mt-5 ">
          <div className="w-full px-6 py-6">
            <Link href={"/"}>
            <span className={`text-[25px] font-Poppins font-[500] text-black dark:text-white absolute top-0 mt-6`}>
              LMS

            </span>
            </Link>
          </div>
          <div className="w-full text-center flex flex-col items-start px-6">
            {navItemData &&
              navItemData.map((i, index) => (
                <Link href={i.url} key={index} passHref>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-[#37a39a] text-[crimson]"
                        : "dark:text-white text-black "
                    } text-[16px] py-2 font-Poppins font-[400]`}
                  >
                    {i.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
