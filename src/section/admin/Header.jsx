import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotificationDropdown from "../customCompo/NotificationDropdown";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toogle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { logout } from "@/slices/userSlice";

const Header = ({ setSidebarOpen, sidebarOpen, userData }) => {
  const isAuthenticated = true;
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state?.common?.data) || {};
  const { user } = useSelector((state) => state.userSlice?.user || {});

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className="bg-background">
      <nav
        className={`custom-shadow  left-0 top-0 z-50 mx-auto grid h-[80px] w-full grid-cols-12 items-center gap-x-4 overflow-visible border-b bg-background px-4 lg:px-6`}
      >
        <div className="col-span-6 flex w-full items-center gap-x-4 lg:hidden">
          <Link to="/" className=" p-1.5">
            <span className="sr-only">Metablock Logo</span>
            <img
              className="h-[30px] w-auto md:h-[52px]"
              src={settings?.site_logo || "/images/logo-white.png"}
              alt="Company Name"
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <div className="col-span-6 flex flex-1 items-center justify-end gap-x-4 lg:col-span-12">
          <LanguageSwitcher />
          <ModeToggle />
          {isAuthenticated && (
            <NotificationDropdown
              setIsNotificationOpen={setIsNotificationOpen}
              isNotificationOpen={isNotificationOpen}
            />
          )}
          {isAuthenticated && (
            <div className="group relative ml-3 py-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={userData?.avatar?.url || "/images/profile-pic.jpeg"}
                      />
                      <AvatarFallback>{userData?.role}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userData?.name}
                      </p>
                      <p className="text-muted-foreground text-xs leading-none">
                        {userData?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link to="/">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link to="/">
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => dispatch(logout())}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
