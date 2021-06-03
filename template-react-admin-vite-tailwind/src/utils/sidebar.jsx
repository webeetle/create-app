import { HomeIcon, CogIcon } from "@heroicons/react/outline";
import React from "react";

const sidebarMenu = (location) => {
  return [
    {
      key: "Dashboard",
      label: "Dashboard",
      icon: <HomeIcon className={`w-5 h-5`} />,
      cls: location.pathname === "/" ? "bg-primary-700" : "",
      props: { path: "/" },
    },
    {
      key: "Settings",
      label: "Settings",
      cls: location.pathname === "/settings" ? "bg-primary-700" : "",
      icon: <CogIcon className="w-5 h-5" />,
      props: { path: "/settings" },
    },
  ];
};

export { sidebarMenu };
