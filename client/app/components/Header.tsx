"use client";
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp"
type Props={
  open:boolean;
  setOpen:(open:boolean)=>void;
  activeItem:number;
  route:string;
  setRoute:(route:string)=>void;
}


const Header: FC<Props> = ({ activeItem, setOpen,route, open,setRoute}) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative mb-4">
      <div
        className={`fixed top-0 left-0 w-full h-[80px] z-[80] border-b transition-all duration-300 ease-in-out ${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white shadow-xl"
            : "bg-transparent dark:bg-gray-900"
        }`}
      >
        <div className="w-full max-w-screen-xl mx-auto py-2 h-full flex items-center justify-between px-4">
          <div className="flex items-center">
            <Link
              href={"/"}
              className="text-[20px] sm:text-[25px] font-Poppins font-[500] text-black dark:text-white"
            >
              LMS
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <NavItems activeItem={activeItem} isMobile={false} />
            <ThemeSwitcher />
            {/* Only for mobile */}
            <div className="block 800px:hidden">
              <HiOutlineMenuAlt3
                size={25}
                className="cursor-pointer dark:text-white text-black transition-transform duration-300 transform hover:scale-110"
                onClick={() => setOpenSidebar(true)}
              />
            </div>
            <HiOutlineUserCircle
              size={25}
              className="hidden 800px:block cursor-pointer dark:text-white text-black transition-transform duration-300 transform hover:scale-110"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>

        {/* Mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[80%] max-w-[350px] fixed z-[99999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 p-5 transition-transform duration-300 transform translate-x-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 text-black dark:text-white transition-transform duration-300 transform hover:scale-110"
                onClick={() => setOpen(true)}
              />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white mt-auto">
                Copyright &copy; 2024 LMS
              </p>
            </div>
          </div>
        )}
      </div>
      {
        route ==="Login" &&(
          <>
          {
            open &&(
            <CustomModel
            open={open}
            setOpen={setOpen}
            setRoute={setRoute}
            activeItem={activeItem}
            component={Login}
            
            />
            )
          }
          
          </>
        )
      }
      
      {
        route ==="Sign-Up" &&(
          <>
          {
            open &&(
            <CustomModel
            open={open}
            setOpen={setOpen}
            setRoute={setRoute}
            activeItem={activeItem}
            component={SignUp}
            
            />
            )
          }
          
          </>
        )
      }
   
    </div>
  );
};

export default Header;
