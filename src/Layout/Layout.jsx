import Header from "@/section/admin/Header";
import Sidebar from "@/section/admin/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = ({ userData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log(userData);
  return (
    <div>
      <Sidebar
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        userData={userData}
      />

      <div className="lg:pl-72">
        <Header
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          userData={userData}
        />

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
