"use client";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuIcon } from "../icons/menu-icon";
import { navigationData, navigationMoreData } from "../json/navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import images from "./images";
import NavLink from "./nav-link";

export default function Navigation({ bgColor }: { bgColor?: string }) {
  // const [logoColor, setLogoColor] = useState<string | false | undefined>();
  const [navbar, setNavbar] = useState<boolean>(false);
  const pathname = usePathname();

  // This logic is not working in tailwindcss or not supporting in tailwindcss
  // useEffect(() => {
  //   const logoColor = Object.entries(colorMap).map(([key, value]) => key === bgColor && value);
  //   setLogoColor(logoColor);
  // }, [bgColor]);
  // console.log("logoColor", logoColor);

  return (
    <Navbar isBordered className={`${bgColor ?? "bg-[#fffdf7]"} py-3 z-50`}>
      <NavbarContent>
        <NavbarBrand>
          <Link className="font-bold text-inherit" href={"/"}>
            <div className="flex items-center">
              <Image
                src={images.logo}
                alt="logo"
                className={`${(bgColor === "bg-primary" && "bg-[#000000]") ||
                  (bgColor === "bg-primary_yellow" && "bg-[#419B69]") ||
                  (bgColor === "bg-primary_orange" && "bg-[#D40000]") ||
                  (bgColor === "bg-primary_pink" && "bg-[#873392]") ||
                  (bgColor === "bg-primary_white" && "bg-[#036B1F]") ||
                  (bgColor === "bg-primary_orange_deep" && "bg-[#002DB9]") ||
                  (bgColor === "bg-primary_gray" && "bg-[#D43AE1]") ||
                  "bg-[#000000]"
                  } rounded-full p-1 w-14 h-14`}
              />
              <Image src={images.logo_text} alt="logo" className="w-36 h-14" />
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="lg:hidden absolute right-5" justify="end">
        <Button isIconOnly variant="light" onClick={() => setNavbar(!navbar)}>
          <MenuIcon />
        </Button>
      </NavbarContent>
      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {navigationData.map(({ link, name }, index) => (
          <NavbarItem key={index}>
            <NavLink href={link ?? ""} className="nav-link">
              {name}
            </NavLink>
          </NavbarItem>
        ))}
        <Dropdown placement="top-end">
          <NavbarItem>
            <DropdownTrigger>
              <button
                className={`${pathname === "" ? "bg-primary text-light font-bold" : "font-bold"}`}
              >
                More
              </button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu
            aria-label={`More Data`}
            className="md:w-[380px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {navigationMoreData?.map(({ description, link, name }, key) => (
              <DropdownItem description={description} key={key} textValue={name}>
                <NavLink href={link ?? ""} className="nav-link text-start">
                  {name}
                </NavLink>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      {pathname === "/" ? (
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex">
            <Image
              priority
              quality={100}
              className="w-8 h-8 bg-black p-2 rounded-full"
              src={images.twitter}
              alt="wallet"
            />
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Image
              priority
              quality={100}
              className="w-8 h-8 bg-black p-2 rounded-full"
              src={images.telegram}
              alt="wallet"
            />
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Image
              priority
              quality={100}
              className="w-8 h-8 bg-black p-2 rounded-full"
              src={images.instagram}
              alt="wallet"
            />
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <div className="text-center flex justify-center items-center">
              <Button size="sm" className="bg-dark text-white">
                <Image
                  priority
                  quality={100}
                  className="w-5 h-5"
                  src={images.wallet}
                  alt="wallet"
                />
                <p>Connect Wallet</p>
              </Button>
            </div>
          </NavbarItem>
        </NavbarContent>
      )}
      {/*navbar for mobile*/}
      {navbar && (
        <motion.section
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
          className="backdrop-blur bg-black/20 w-full h-screen lg:hidden block fixed top-0 right-0 z-50"
        >
          <motion.section
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="bg-white md:min-w-96 sm:min-w-80 min-w-60 h-screen lg:hidden block fixed top-0 right-0"
          >
            <Button
              isIconOnly
              variant="light"
              className="font-bold my-3 ml-5"
              onClick={() => setNavbar(!navbar)}
            >
              X
            </Button>
            <Divider />
            <div className="flex flex-col lg:hidden gap-4 mt-5">
              <div className="flex flex-wrap relative">
                <div className="flex flex-col gap-4">
                  {navigationData.map(({ link, name }, index) => (
                    <div key={index} className="ml-6">
                      <NavLink href={link ?? ""} className="nav-link">
                        {name}
                      </NavLink>
                    </div>
                  ))}
                </div>
                <Image
                  src={images.mobile_nav}
                  alt="logo"
                  className="w-32 h-fit absolute top-1 right-3"
                />
              </div>
              <Dropdown placement="top-start">
                <div>
                  <Divider className="mb-2" />
                  <DropdownTrigger>
                    <button className={`${pathname === "" ? "bg-primary text-light" : ""} ml-9`}>
                      More
                    </button>
                  </DropdownTrigger>
                  <Divider className="mt-2" />
                </div>

                <DropdownMenu
                  aria-label={`More Data`}
                  className="h-60 overflow-y-scroll"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  {navigationMoreData?.map(({ description, link, name }, key) => (
                    <DropdownItem description={description} key={key} textValue={name}>
                      <NavLink href={link ?? ""} className="nav-link text-start">
                        {name}
                      </NavLink>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <section>
              <div className="hidden lg:flex">
                <Image
                  priority
                  quality={100}
                  className="w-8 h-8 bg-black p-2 rounded-full"
                  src={images.twitter}
                  alt="wallet"
                />
              </div>
              <div className="hidden lg:flex">
                <Image
                  priority
                  quality={100}
                  className="w-8 h-8 bg-black p-2 rounded-full"
                  src={images.telegram}
                  alt="wallet"
                />
              </div>
              <div className="hidden lg:flex">
                <Image
                  priority
                  quality={100}
                  className="w-8 h-8 bg-black p-2 rounded-full"
                  src={images.instagram}
                  alt="wallet"
                />
              </div>
            </section>
          </motion.section>
        </motion.section>
      )}
    </Navbar>
  );
}
