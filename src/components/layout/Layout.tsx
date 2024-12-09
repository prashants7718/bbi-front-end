import React, { ReactNode } from "react";
import { useUserContext } from "../../context/UserContext";
import { isAuthenticated } from "../../router";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  hideSidebar?: boolean;
  isHomePage?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  hideSidebar = false,
  isHomePage = false,
}) => {
  const isUserAuthenticated = isAuthenticated();
  const { role } = useUserContext();

  return (
    <div className="flex flex-row h-screen">
      {!hideSidebar && isUserAuthenticated && (
        <div className="flex-shrink-0 h-screen bg-blueBackground w-64 fixed top-0">
          <Sidebar role={role} />
        </div>
      )}
      <div
        className={`wrapper flex-1 ${
          hideSidebar || isHomePage ? "" : "pl-[256px]"
        }`}
      >
        <Header />
        <div className="flex flex-grow bg-grayBackground">
          <div className="flex-1 p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
