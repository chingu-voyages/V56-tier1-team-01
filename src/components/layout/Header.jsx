import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from '@/components/ui/navigation-menu';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import { displayDate } from "./headerUtils.js" 


// Add mobile navigation and resposive design

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm transition-all duration-300">
      <div className="flex flex-col gap-2 justify-start lg:flex-row lg:gap-8">
        <h1 className="text-lg font-bold text-gray-900 transform hover:scale-105 transition-transform duration-200 cursor-default self-center">
          <Link to="/">Surgery Status Board</Link>
        </h1>
        <p className="self-start lg:self-center">{displayDate}</p>
       </div>
      <div className="hidden customMd:block transition-opacity duration-300">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-2">
            <NavigationMenuItem className="transform hover:scale-105 transition-all duration-200">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lr transition-all duration-300 ease-in-out transform hover:shadow-md ${
                    isActive
                      ? 'bg-black text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-black hover:-translate-y-0.5 hover:scale-105'
                  }`
                }
              >
                Home
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to='/stm-home'
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lr transition-all duration-300 ease-in-out transform hover:shadow-md ${
                    isActive
                      ? 'bg-black text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-black hover:-translate-y-0.5 hover:scale-105'
                  }`
                }
              >
                STM
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                to='/admin-home'
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lr transition-all duration-300 ease-in-out transform hover:shadow-md ${
                    isActive
                      ? 'bg-black text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-black hover:-translate-y-0.5 hover:scale-105'
                  }`
                }
              >
                Admin
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                to='/patient-information'
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lr transition-all duration-300 ease-in-out transform hover:shadow-md ${
                    isActive
                      ? 'bg-black text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-black hover:-translate-y-0.5 hover:scale-105'
                  }`
                }
              >
                Patient Information
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                to='/patient-status-update'
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lr transition-all duration-300 ease-in-out transform hover:shadow-md ${
                    isActive
                      ? 'bg-black text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-black hover:-translate-y-0.5 hover:scale-105'
                  }`
                }
              >
                Patient Status Update
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to='/patient-status'
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lr transition-all duration-300 ease-in-out transform hover:shadow-md ${
                    isActive
                      ? 'bg-black text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-black hover:-translate-y-0.5 hover:scale-105'
                  }`
                }
              >
                Patient Status
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className='customMd:hidden transition-opacity duration-300'>
        <Sheet>
          <SheetTrigger className='text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-110'>
            <Menu className='w-6 h-6 transition-transform duration-200 hover:rotate-90' />
          </SheetTrigger>
          <SheetContent
            side='right'
            hideClose
            className='animate-in slide-in-from-right fade-in duration-500 ease-out'
          >
            <div className='flex items-center justify-between px-4 pt-4 pb-2 border-b animate-in fade-in-50 slide-in-from-top-2 duration-400'>
              {' '}
              <h2 className='text-xl font-semibold text-gray-900'>Menu</h2>
              <SheetClose asChild>
                <button className='text-gray-500 hover:text-black p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-110'>
                  <X className='w-5 h-5 transition-transform duration-200 hover:rotate-90' />
                </button>
              </SheetClose>
            </div>

            <nav className='flex flex-col gap-4 mt-8'>
              <SheetClose asChild>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `text-lg transition-all duration-300 ease-out p-3 rounded-lg transform hover:scale-105 hover:shadow-sm ${
                      isActive
                        ? 'text-black font-semibold bg-gray-100 shadow-sm scale-105'
                        : 'text-gray-800 hover:text-black hover:bg-gray-50'
                    }`
                  }
                >
                  Home
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink
                  to='/stm-home'
                  className={({ isActive }) =>
                    `text-lg transition-all duration-300 ease-out p-3 rounded-lg transform hover:scale-105 hover:shadow-sm ${
                      isActive
                        ? 'text-black font-semibold bg-gray-100 shadow-sm scale-105'
                        : 'text-gray-800 hover:text-black hover:bg-gray-50'
                    }`
                  }
                >
                  STM
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink
                  to='/admin-home'
                  className={({ isActive }) =>
                    `text-lg transition-all duration-300 ease-out p-3 rounded-lg transform hover:scale-105 hover:shadow-sm ${
                      isActive
                        ? 'text-black font-semibold bg-gray-100 shadow-sm scale-105'
                        : 'text-gray-800 hover:text-black hover:bg-gray-50'
                    }`
                  }
                >
                  Admin
                </NavLink>
              </SheetClose>

              <SheetClose asChild>
                <NavLink
                  to='/patient-information'
                  className={({ isActive }) =>
                    `text-lg transition-all duration-300 ease-out p-3 rounded-lg transform hover:scale-105 hover:shadow-sm ${
                      isActive
                        ? 'text-black font-semibold bg-gray-100 shadow-sm scale-105'
                        : 'text-gray-800 hover:text-black hover:bg-gray-50'
                    }`
                  }
                >
                  Patient Information
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink
                  to='/patient-status-update'
                  className={({ isActive }) =>
                    `text-lg transition-all duration-300 ease-out p-3 rounded-lg transform hover:scale-105 hover:shadow-sm ${
                      isActive
                        ? 'text-black font-semibold bg-gray-100 shadow-sm scale-105'
                        : 'text-gray-800 hover:text-black hover:bg-gray-50'
                    }`
                  }
                >
                  Patient Status Update
                </NavLink>
              </SheetClose>
              <SheetClose asChild>
                <NavLink
                  to='/patient-status'
                  className={({ isActive }) =>
                    `text-lg transition-all duration-300 ease-out p-3 rounded-lg transform hover:scale-105 hover:shadow-sm ${
                      isActive
                        ? 'text-black font-semibold bg-gray-100 shadow-sm scale-105'
                        : 'text-gray-800 hover:text-black hover:bg-gray-50'
                    }`
                  }
                >
                  Patient Status
                </NavLink>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
