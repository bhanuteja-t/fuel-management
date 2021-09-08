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
    to: "/Userslist",
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Invoice",
    to: "/Create_invoice",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Docket",
    to: "/Delivery_Docket_Entry",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "DaySheet",
    to: "/daysheetpage",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Fuel Reconsilation",
    to: "/Fuelreconsilation",
    icon: <CIcon name="cil-hand-point-right" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Search Filters',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Invoice List',
        to: '/InvoicelistforSAdmin',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Docket List',
        to: '/Docketsearch',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'DaySheet List',
        to: '/DaySheetList',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Maintanence List',
        to: '/MaintanencesearchSA',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Incident List',
        to: '/IncidentsearchForSA',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Driveoff List',
        to: '/DriveofflistSA',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Inability List',
        to: '/InabilitysearchSA',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Fuel List',
        to: '/GetfuelforSA',
      },
    ]
}
];




export default _nav;
