import React from "react";
import CIcon from "@coreui/icons-react";

const _navSuperAdmin = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Employees",
    to: "/Userslist",
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon" />,
  },
];




export default _navSuperAdmin;
