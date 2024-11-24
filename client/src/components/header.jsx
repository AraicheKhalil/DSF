import React from 'react'
import { Input } from './ui/input'
import { AlignJustify, Search, SquareMenu, SquareMenuIcon } from 'lucide-react'
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
import { Button } from './ui/button'
import PopupSidebar from './Custom/popupSidebar'
import Notifications from './Custom/notifications'
import UserProfileDrop from './Custom/UserProfileDrop'

export default function Header() {
  return (
    <header className='w-full  shadow-lg h-16 flex justify-between items-center gap-3 px-3 md:px-5'>
      
      <div className='flex items-center gap-2 '>
        <div className='mega-menu h-fit lg:hidden block'>
          <Sheet key={"left"}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-fit p-1 h-fit">
              <AlignJustify   size={26} className='text-gray-500 '/>
              </Button>
            </SheetTrigger >
            <PopupSidebar />
          </Sheet>
        </div>
        <div className='search-popup relative flex' >
          <Search color='#596780' size={22} className="absolute translate-x-1/2  translate-y-1/2 sm:left-2.5 top-0 "/>
          <Input className="rounded-[70px]  text-[#596780] text-sm  placeholder:font-medium sm:pl-14 pl-10 font-medium h-[44px] w-[400px] md:basis-[100%] max-sm:w-[100%] border border-gay-200" placeholder="Search About Somethings" />
        </div>

      </div>

      <div className='user-activities flex items-center gap-2'>
        <Notifications />
        <UserProfileDrop />
      </div>
    </header>
  )
}


