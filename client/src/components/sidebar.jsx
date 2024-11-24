import { BookMarked, BrainCircuit, ChevronsLeft, Combine, FileBarChart2, LayoutDashboardIcon, ListTodo, MessagesSquare, NotebookTabs, PieChart, Power, Settings, Telescope } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import SideBarContext from '@/hooks/context/SideBarContext';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTools } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import { FaDochub } from "react-icons/fa6";



export default function Sidebar() {

  const {  open, setOpen , logout} = useContext(AppContext);
  const { pathname } = useLocation()


  const Menus = [
    { route: ".", title: "Overview", src: <LayoutDashboardIcon /> },
    // { route : "custom-view", title: "Custom View", src: <PieChart /> },
    { route: "smart-doc", title: "Smart Doc ", src: <FileBarChart2 />, gap: true },
    { route: "tasks", title: "Tasks ", src: <Combine /> },
    { route: "tools", title: "Tools ", src: <Telescope /> },
    { route: "gen_ai", title: "Gen Ai ", src: <BrainCircuit  /> },
    { route: "docs_hub", title: "Doc Hub", src: <BookMarked /> },

    // { route: "chat-doc", title: "Chat Doc", src: <MessagesSquare /> },
    // { route: "settings", title: "Settings", src: <Settings />, gap: true },
    // { route: "sign-out", title: "Sign Out ", src: <Power />, }
  ];



  return (
    // <div className="sidebar w-[250px] bg-gray-950 border-r ${open ? "w-[250px]" : "w-[80px]"}">
    <div className={`sidebar flex max-w-[250px] max-sm:hidden z-10 `}>
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-gray-950 h-screen p-5 pt-8 relative duration-300`}
      >
        <ChevronsLeft 
          size={28}
          className={` bg-yellow-600 lg:block absolute cursor-pointer -right-3 top-9 p-0.5 border-dark-purple
      border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <NavLink to="/dashboard" className="flex gap-x-4 items-center">
          <img
            src="/Logo.png"
            className={`w-10 h-10 cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            Smart Doc
          </h1>
        </NavLink>
        <ul className="pt-6 ">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${pathname === `/dashboard/${Menu.route}` && "bg-gray-900 font-medium"} `}
            >
              <NavLink 
                to={`${Menu.route}`} 
                className='flex items-center gap-x-4 w-full'
                // onClick={() => Menu.route == "sign-out" && logout() }
                >
                <div>{Menu.src}</div>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}