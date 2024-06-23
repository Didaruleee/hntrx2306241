"use client";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {MenuIcon} from "../icons/menu-icon";
import {leaderBoardSelect, leaderBoardTable, theDenTopContent} from "../json/the-den";
import {Button, Divider, Select, SelectItem, Tab, Tabs} from "@nextui-org/react";
import {motion} from "framer-motion";
import {usePathname, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import Attributes from "./container/the-den/attributes";
import LeaderBoardTable from "./container/the-den/leaderboard-table";
import Overview from "./container/the-den/overview";
import OverviewSidebar from "./container/the-den/overview-sidebar";
import TopContent from "./container/the-den/top-content";
import { CollectionName } from "components/CollectionBox/CollectionBox.styled";
import LeaderBoardTablenew from "./container/the-den/leaderboard-table copy";


const TheDen = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [savedPath, setSavedPath] = useState("");
  const [selected, setSelected] = useLocalStorage("tabs", savedPath ?? "");
  const [isFixed, setIsFixed] = useState(false);
  const [menubar, setMenubar] = useState<boolean>(false);

  useEffect(() => {
    setSavedPath(pathname + "?" + searchParams);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = currentScrollPos > 124;

      setIsFixed(visible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <p>The den</p>
  );
};

export default TheDen;
