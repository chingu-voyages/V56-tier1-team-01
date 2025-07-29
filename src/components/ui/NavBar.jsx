import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from '@/components/ui/navigation-menu';

export default function NavBar() {
  return (
    <nav className='flex flex-col md:flex-row items-center justify-between px-6 py-3 border-b bg-white'>
      <h1 className='text-lg font-bold text-gray-900'>Surgery Status Board</h1>
      <NavigationMenu>
        <NavigationMenuList className='flex space-x-6'>
          <NavigationMenuItem>
            <NavLink
              to='/'
              end
              className={({ isActive }) =>
                `px-3 py-1 rounded-md transition-colors ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-black'
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
                `px-3 py-1 rounded-md transition-colors ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-black'
                }`
              }
            >
              STM Home
            </NavLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavLink
              to='/patient-information'
              className={({ isActive }) =>
                `px-3 py-1 rounded-md transition-colors ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-black'
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
                `px-3 py-1 rounded-md transition-colors ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-black'
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
                `px-3 py-1 rounded-md transition-colors ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-black'
                }`
              }
            >
              Patient Status
            </NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
