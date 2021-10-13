import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import Cookies from "universal-cookie"
import { useAuthorizedContext } from "../../AuthorizedContext"

import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
// import * as FaIcons from "react-icons/fa"

// import { SidebarData } from "../sidebar/SidebarData"
import "../navbar/navbar.css"
import { IconContext } from "react-icons"
import Logo from "../../assets/image/BRI-AJ-v2.png"

const cookies = new Cookies()

function NavbarComponent() {
  const [sidebar, setSidebar] = useState(false)
  const history = useHistory()
  const { isLoggedIn, setAuthorizedValue } = useAuthorizedContext()
  const showSidebar = () => setSidebar(!sidebar)

  const SidebarData = [
    {
      title: "Beranda",
      path: "/home",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
    {
      title: "Transaksi",
      path: "/transaksi",
      icon: <IoIcons.IoIosPaper />,
      cName: "nav-text",
    },
    {
      title: "Keluar",
      // path: "/signout",
      icon: <FaIcons.FaSignOutAlt />,
      cName: "nav-text",
      onClick: () => {
        Swal.fire({
          title: "Konfirmasi",
          text: "Anda yakin ingin keluar?",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Ya",
          confirmButtonColor: "#292961",
          cancelButtonColor: "#292961",
          cancelButtonText: "Tidak",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: "success",
              title: "Logout Sukses",
              showConfirmButton: false,
              timer: 1500,
            })
            setAuthorizedValue(false, null)
            cookies.remove("accessToken")
            history.replace("/")
            window.location.reload()
          } else {
          }
        })
      },
    },
  ]

  return (
    <>
      <IconContext.Provider value={{ color: "#1E212D" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul
            className="nav-menu-items"
            onClick={showSidebar}
            onKeyDown={showSidebar}
          >
            <li className="navbar-toggle">
              <img src={Logo} alt="Logo" />
              <Link to="#" className="menu-bars"></Link>
            </li>
            {SidebarData.map((item, index) => {
              const onClick = () => {
                if (item.onClick) {
                  item.onClick()
                } else if (item.path) {
                  history.push(item.path)
                }
              }
              return (
                <li key={index} className={item.cName} onClick={onClick}>
                  {item.icon}
                  <span style={{ marginLeft: "16px" }}>{item.title}</span>
                </li>
              )
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default NavbarComponent
