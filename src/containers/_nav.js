import React from "react";
import CIcon from "@coreui/icons-react";
const _nav = [
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
    to: "/Manageruserslist",
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Search",
    icon: <CIcon name="cil-search" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Invoice List",
    to: "/Invoiceslist",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Docketsearch",
    to: "/Docketlist",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "DaySheet List",
    to: "/DaysheetlistManager",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavItem",
    name: "Maintenance List",
    to: "/Maintanencesearch",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Incidentsearch",
    to: "/Incidentsearchmanager",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Driveofflist",
    to: "/Driveofflistmanager",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Inabilitysearch",
    to: "/Inabilitysearchmanager",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Getfuelreconsilation",
    to: "/Getfuelreconsilation",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
];




export default _nav;
