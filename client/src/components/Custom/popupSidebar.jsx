
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Sidebar from '../sidebar'

import {  Combine, FileBarChart2, LayoutDashboardIcon, ListTodo, MessagesSquare, NotebookTabs, PieChart, Power, Settings } from 'lucide-react'
import React, { useContext } from 'react'
import SideBarContext from '@/hooks/context/SideBarContext';
import { Link, useLocation } from 'react-router-dom';



export default function PopupSidebar() {

  const {pathname} = useLocation()

  const Menus = [
    { route : "dashboard", title: "Overview", src: <LayoutDashboardIcon /> },
    { route : "dashboard/custom-view", title: "Custom View", src: <PieChart /> },
    { route : "dashboard/smart-doc", title: "Smart Doc ", src:  <FileBarChart2  /> ,gap: true},
    { route : "dashboard/tasks", title: "Tasks ", src: <Combine />  },
    { route : "dashboard/chat-doc", title: "Chat Doc", src:  <MessagesSquare /> },
    { route : "dashboard/settings", title: "Settings", src:  <Settings  />, gap : true },
    { route : "sign-out", title: "Sign Out ", src:  <Power />,  },
    ];

  return (
    // <div className="sidebar w-[250px] bg-gray-950 border-r ${open ? "w-[250px]" : "w-[80px]"}">
      <SheetContent className={`sidebar flex w-[250px]  p-0 bg-gray-950`}>
        <div
          className={`w-full h-screen p-5 pt-8 relative duration-300`}
        >
          <img
            src="/Logo.png"
            className={`hidden lg:block absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
      border-2 rounded-full `}
            
          />
          <div className="flex gap-x-4 items-center">
            <img
              src="/Logo.png"
              className={`w-10 h-10 cursor-pointer duration-500 `}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200`}
            >
              Smart Doc
            </h1>
          </div>
          <ul className="pt-6 ">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${pathname === `/${Menu.route}` && "bg-gray-900 font-medium"} `}
              >
                <Link to={`/${Menu.route}`} className='flex items-center gap-x-4 w-full'>
                  <div>{Menu.src}</div>
                  <span
                    className={` origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
  );
}