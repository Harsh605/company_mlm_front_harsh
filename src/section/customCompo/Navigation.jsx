import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className=" flex items-center sm:hidden justify-center">
      <div className="fixed z-50 bottom-0 w-full max-w-md mx-auto">
        <div className="px-7 bg-primary shadow-lg rounded-2xl">
          <div className="flex">
            <div className="flex-1 group">
              <Link
                to="admin"
                className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-secondary-Light group-hover:text-secondary border-b-2 border-transparent group-hover:border-secondary"
              >
                <span className="block px-1 pt-1 pb-2">
                  <i className="far fa-home text-2xl pt-1 mb-1 block"></i>
                  <span className="block text-xs pb-1">Dashboard</span>
                </span>
              </Link>
            </div>
            <div className="flex-1 group">
              <Link
                to="admin/clients"
                className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-secondary-Light group-hover:text-secondary border-b-2 border-transparent group-hover:border-secondary"
              >
                <span className="block px-1 pt-1 pb-2">
                  <i className="far fa-user text-2xl pt-1 mb-1 block"></i>
                  <span className="block text-xs pb-1">Clients</span>
                </span>
              </Link>
            </div>
            <div className="flex-1 group">
              <Link
                to="/"
                className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-secondary-Light group-hover:text-secondary border-b-2 border-transparent group-hover:border-secondary"
              >
                <span className="block px-1 pt-1 pb-2">
                  <i className="far fa-wallet text-2xl pt-1 mb-1 block"></i>
                  <span className="block text-xs pb-1">Wallet</span>
                </span>
              </Link>
            </div>
            <div className="flex-1 group">
              <Link
                to="/"
                className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-secondary-Light group-hover:text-secondary border-b-2 border-transparent group-hover:border-secondary"
              >
                <span className="block px-1 pt-1 pb-2">
                  <i className="far fa-cog text-2xl pt-1 mb-1 block"></i>
                  <span className="block text-xs pb-1">Settings</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
