import React from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import {FormOutlined, HomeOutlined, LogoutOutlined} from "@ant-design/icons";

export const SidebarData = [
  {
    title: "Beranda",
    path: "/home",
    icon: <HomeOutlined />,
    cName: "nav-text",
  },
  {
    title: "Transaksi",
    path: "/transaksi",
    icon: <FormOutlined />,
    cName: "nav-text",
  },
  {
    title: "Keluar",
    path: "/signout",
    icon: <LogoutOutlined />,
    cName: "nav-text",
  },
]
