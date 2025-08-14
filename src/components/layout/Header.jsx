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
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
 DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu.jsx"
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';
import { displayDate } from "./headerUtils.js" 


// Add mobile navigation and resposive design

export default function Header() {
  const { isAuthenticated, userAccess, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between px-6 lg:-px-0 pt-6 pb-3 border-b  bg-white shadow-xs transition-all duration-300">
      <div className="flex flex-col gap-2 justify-start lg:flex-row lg:gap-8 ">
        <h1 className="text-2xl font-bold text-slate-800 transform hover:scale-105 transition-transform duration-200 cursor-default self-center">
          <Link to="/">Surgery Status Board</Link>
        </h1>
        <p className="self-start lg:self-center text-slate-600 text-sm">{displayDate}</p>
       </div>
      <div className="hidden customMd:block transition-opacity duration-300">
        <NavigationMenu>
          <NavigationMenuList className='flex space-x-2'>
            <NavigationMenuItem className='transform hover:scale-105 transition-all duration-200'>
              <NavLink
                to='/'
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:shadow-md ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-black hover:-translate-y-0.5 hover:scale-105'
                  }`
                }
              >
                Home
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                to={isAuthenticated && userAccess === 'admin' ? '/patient-information' : isAuthenticated && userAccess === 'team' ? '#' : '/login'}
                onClick={e => {
                  if (isAuthenticated && userAccess !== 'admin') {
                    alert('Must have admin access to view this page.');
                  }
                }}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:shadow-md ${
                    isActive && isAuthenticated && userAccess === 'admin'
                      ? 'bg-slate-800 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-black hover:-translate-y-0.5 hover:scale-105'
                  }`
                }
              >
                Patient Information
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                to={!isAuthenticated ? '/login' : '/patient-status-update'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:shadow-md ${
                    isActive && isAuthenticated
                      ? 'bg-slate-800 text-white shadow-lg scale-105'
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
                  `px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:shadow-md ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-black hover:-translate-y-0.5 hover:scale-105'
                  }`
                }
              >
                Patient Status
              </NavLink>
            </NavigationMenuItem>

              {isAuthenticated && (
                <DropdownMenu className='text-sm'>
                  <DropdownMenuTrigger>
                    <CircleUserRound className="stroke-slate-600"/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='absolute right-0 top-9 bg-white shadow-lg border rounded-lg px-2 text-center text-slate-800'>
                    <DropdownMenuLabel className=''>Welcome, {userAccess === 'admin' ? 'Admin' : userAccess === 'team' ? 'Surgery Team Member' : null}!</DropdownMenuLabel>
                    <DropdownMenuGroup className="flex flex-col justify-center items-center px-2 pb-4 w-[160px]">
                      <DropdownMenuItem>
                      <NavLink
                              to={userAccess === 'admin' ? '/admin-home' : userAccess === 'team' ? '/stm-home' : '/'}
                              className={({ isActive }) =>
                                `px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:shadow-md ${
                                  isActive
                                    ? 'bg-slate-800 text-white shadow-md scale-105'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-black hover:-translate-y-0.5 hover:scale-105'
                                }`
                              }
                            >
                              {userAccess === 'admin' ? 'Admin Home' : userAccess === 'team' ? 'STM Home' : null}
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {logout && (
                              <NavLink
                                to='/'
                                onClick={logout} className='px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:shadow-md text-red-500 hover:bg-gray-100 hover:text-black hover:-translate-y-0.5 hover:scale-105'
                              >
                                Logout <LogOut className='inline-block h-4 mt-[-2px]'/>
                              </NavLink>
                            )}
                    </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

            </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation */}

      <div className='customMd:hidden transition-opacity duration-300'>
        <Sheet>
          <SheetTrigger className='text-slate-800 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-110'>
            <Menu className='w-6 h-6 transition-transform duration-200 hover:rotate-90' />
          </SheetTrigger>
          <SheetContent
            side='right'
            hideClose
            className='animate-in slide-in-from-right fade-in duration-500 ease-out text-slate-800'
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
                  to={isAuthenticated && userAccess === 'admin' ? '/patient-information' : isAuthenticated && userAccess === 'team' ? '#' : '/login'}
                onClick={e => {
                  if (isAuthenticated && userAccess !== 'admin') {
                    alert('Must have admin access to view this page.');
                  }
                }}
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

              {isAuthenticated && (
                <div className='flex items-center justify-between px-4 pt-4 pb-2 border-b animate-in fade-in-50 slide-in-from-top-2 duration-400'>
                  <h3 className='text-l font-semibold text-gray-900'>Welcome, {userAccess === 'admin' ? 'Admin' : userAccess === 'team' ? 'Surgery Team Member' : null}!</h3>
                </div>
              )}

               {isAuthenticated && userAccess === 'team' && (
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
                    STM Home
                  </NavLink>
                </SheetClose>
              )}

              {isAuthenticated && userAccess === 'admin' && (
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
                    Admin Home
                  </NavLink>
                </SheetClose>
              )}

              {isAuthenticated && (
                <SheetClose asChild>
                  <NavLink
                    to='/'
                    onClick={logout}
                    className='text-lg transition-all duration-300 ease-out p-3 rounded-lg transform hover:scale-105 hover:shadow-sm text-red-500 hover:bg-gray-100 hover:text-black'
                  >
                    Logout <LogOut className='inline-block h-4 mt-[-2px]'/>
                  </NavLink>
                </SheetClose>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
