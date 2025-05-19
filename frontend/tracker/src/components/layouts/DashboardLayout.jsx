import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex flex-1 overflow-hidden">
          
          <div className="hidden lg:block lg:w-64 bg-white border-r">
            <SideMenu activeMenu={activeMenu} />
          </div>

          
          <div className="flex-grow overflow-y-auto p-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
