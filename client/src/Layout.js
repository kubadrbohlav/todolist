import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const Layout = () => {
  return (
    <>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="TopBar">
        <TopBar />
      </div>
      <div className="main">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
