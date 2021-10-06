import React from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as BsIcons from "react-icons/bs"

export const SidebarDataAgen = [
  {
    title: "Beranda",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "My Profile",
    path: "/my-profile",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Keluar",
    path: "/signout",
    icon: <FaIcons.FaSignOutAlt />,
    cName: "nav-text",
  },
]
