import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from "@coreui/react";
import logo from "../assets/icons/logo1.png";
import navigation from "./_nav";
import SuperAdminNav from "./_navSuperAdmin";
import mobileviewSA from "./mobileviewSA"
import { isAuthenticated } from "../Auth";
const TheSidebar = () => {
  // const dispatch = useDispatch();
  // const show = useSelector((state) => state.sidebarShow);
  return (
    <CSidebar
      // show={show}
      // onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/dashboard">
        <CImg src={logo} alt="Website Logo" height={35} />
      </CSidebarBrand>
      <CSidebarNav>
      {isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && ( 
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
        )}
              {isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && ( 
        <CCreateElement
          items={ window.innerWidth <= 800 ? mobileviewSA : SuperAdminNav }
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
        )}
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};
export default React.memo(TheSidebar);
