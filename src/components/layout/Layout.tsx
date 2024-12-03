import React, { ReactNode } from "react";
import { isAuthenticated } from "../../router";
import {
  getUserDetailsFromToken
} from "../../utils/getUserRole";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  hideSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideSidebar = false }) => {
  const user = getUserDetailsFromToken();
  const isUserAuthenticated = isAuthenticated();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        {!hideSidebar && isUserAuthenticated && (
          <div className="flex-shrink-0">
            <Sidebar role={user.role} />
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
