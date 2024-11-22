import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "../Header";
import { Roles } from "../../constant/enum"; 

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const role: Roles = Roles.EMPLOYEE;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <div className="flex-shrink-0">
          <Sidebar role={role} />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;