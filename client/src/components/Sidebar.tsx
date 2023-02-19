import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import {
  LogoIcon,
  LogoutIcon,
} from "./icons";

import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { ListBulletIcon } from "@heroicons/react/20/solid"

// const menuItems = [
//   { id: 1, label: "Home", icon: HomeIcon, link: "/" },
//   { id: 2, label: "Manage Posts", icon: ArticleIcon, link: "/posts" },
//   { id: 3, label: "Manage Users", icon: UsersIcon, link: "/users" },
//   { id: 4, label: "Manage Tutorials", icon: VideosIcon, link: "/tutorials" },
// ];

// const workapceMenuItems = [
//   { id: 1, label: "Manage Workspaces", icon: ListBulletIcon, link: "/workspace" },
//   { id: 2, label: "Create Workspace", icon: ArticleIcon, link: "/workspace/create" },
// ];

export interface menuItems{
  id: number,
  label: string,
  icon?: any,
  link: string,
}



const Sidebar = ({menuItems}:{menuItems: menuItems[]}) => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.asPath),
    [router.asPath]
  );

  const wrapperClasses = classNames(
    "h-[calc(100vh-4.1rem)] px-4 pt-8 pb-4 bg-zinc-50 border border-r-gray-300 flex justify-between flex-col",
    {
      ["w-64"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    " rounded bg-light-lighter absolute right-0 ",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu:menuItems) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-indigo-200"]: activeMenu!==undefined && activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <LogoIcon/>
            <span
              className={classNames("mt-2 text-lg font-medium text-menu", {
                hidden: toggleCollapse,
              })}
            >
              Sidebar
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <ChevronDoubleLeftIcon
                className="h-6 w-6 -mr-12"
                aria-hidden={true}
              />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }, index) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={index} className={classes}>
                <Link
                  className="flex py-4 px-3 items-center w-full h-full"
                  href={menu.link}
                >
                  <div style={{ width: "2.5rem" }}>
                    {Icon && <Icon />}
                  </div>
                  {!toggleCollapse && (
                    <span
                      className={classNames("text-sm font-normal text-menu")}
                    >
                      {menu.label}
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({
        id: 0,
        label: "",
        link: ""
      })} px-3 py-4`}>
        <div style={{ width: "2.5rem" }}>
          <LogoutIcon />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-text-light")}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
