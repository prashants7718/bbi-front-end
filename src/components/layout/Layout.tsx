import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Roles } from "../../constant/enum"; 
import Cookies from "js-cookie";


interface LayoutProps {
  children: ReactNode;
  hideSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children,hideSidebar = false }) => {
  const role: Roles = Roles.EMPLOYEE;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        {!hideSidebar && Cookies.get('user') && JSON.parse(Cookies.get('user'))?.username && <div className="flex-shrink-0">
          <Sidebar role={role} />
        </div>}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;