import React from "react";
import Create_invoice from "./views/Invoices/Create_invoice";
import Delivery_Docket_Entry from "./views/Invoices/Delivery_Docket_Entry";
import Incidents_page from "./views/Incidents/Incidents_page"
import Driveoff_page from "./views/Driveoff/Driveoff_page"
import Invoices from "./views/Invoices/Delivery_Docket_Entry";
import Maintenance from "./views/Repair/Maintenance";
import createuser from "./views/Users/createuser";
import Workersheet from "./views/DaySheet/Workersheet";
import Userslist from "./views/Users/Userslist";
import Bankdetails from "./views/Banking/Bankdetails";
import Applyleave from "./views/Leaves/Applyleave";
import View_profile from "./views/Users/View_profile";
import Inability from "./views/InabilityFolder/Inability";
import Edituser from "./views/Users/Edituser";
import Daysheetpage from "./views/DaySheet/Daysheetpage";
import Invoiceslist from "./views/Invoices/Invoiceslist";
import Driveofflistmanager from "./views/Driveoff/Driveofflistmanager";
import InvoiceDetail_page from "./views/Invoices/InvoiceDetail_page";
import Editworkersheet from "./views/DaySheet/Editworkersheet";
import DaySheetList from "./views/DaySheet/DaySheetList";
import InvoicelistforSAdmin from "./views/Invoices/InvoicelistforSAdmin";
import Docketsearch from "./views/Invoices/Docketsearch";
import Maintanencesearch from "./views/Repair/Maintanencesearch";
import InabilitysearchSA from "./views/InabilityFolder/InabilitysearchSA";
import Docketlist from "./views/Invoices/Docketlist";
import MaintanencesearchSA from "./views/Repair/MaintanencesearchSA";
import IncidentsearchforSA from "./views/Incidents/IncidentsearchforSA";
import Incidentsearchmanager from "./views/Incidents/Incidentsearchmanager";
import DriveofflistSA from "./views/Driveoff/DriveofflistSA";
import Inabilitysearchmanager from "./views/InabilityFolder/Inabilitysearchmanager";
import DaySheetlistManager from "./views/DaySheet/DaysheetlistManager";
import EditInvoice from "./views/Invoices/EditInvoice";
import EditDocket from "./views/Invoices/EditDocket";
import EditIncident from "./views/Incidents/EditIncident";
import EditDriveoff from "./views/Driveoff/EditDriveoff";
import EditInability from "./views/InabilityFolder/EditInability";
import EditMaintanence from "./views/Repair/EditMaintanence";
import Fuelreconsilation from "./views/Reconsilation/Fuelreconsilation";
import Contactdetails from "./views/Users/Contactdetails";
import Getfuelreconsilation from "./views/Reconsilation/Getfuelreconsilation";
import GetfuelforSA from "./views/Reconsilation/GetfuelforSA";
import Editfuelreconsilation from "./views/Reconsilation/Editfuelreconsilation";
import Bankdetailsedit from "./views/Banking/Editbank";
import Changepasword from "./views/Users/Changepassword";
import Manageruserslist from "./views/Users/Manageruserslist";
import UploadRoaster from "./views/Roaster/UploadRoaster";
import Workerroaster from "./views/Roaster/Workerroaster";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/Daysheetpage", exact: true, name: "Daysheetpage", component: Daysheetpage },
  { path: "/Workersheet", exact: true, name: "Workersheet", component: Workersheet},
  { path: "/Invoices",exact: true,name: "Invoices",component: Invoices},
  { path: "/Maintenance", exact: true, name:"Maintenance", component: Maintenance},
  { path: "/Create_invoice", exact: true, name:'Create_invoice', component: Create_invoice},
  { path: "/Delivery_Docket_Entry", exact: true, name: 'Delivery_Docket_Entry', component: Delivery_Docket_Entry},
  { path: "/Incidents_page", exact: true, name:'Incidents_page', component: Incidents_page},
  { path: "/Driveoff_page", exact: true, name: 'Driveoff_page', component: Driveoff_page},
  { path: "/createuser", exact: true, name:'createuser', component: createuser},
  { path: "/Userslist", exact: true, name:'Userslist', component: Userslist},
  { path: "/Bankdetails", exact: true, name:'Bankdetails', component: Bankdetails},
  { path: "/Applyleave", exact: true, name: 'Applyleave', component: Applyleave},
  { path: "/View_profile/:id", exact: true, name: 'View_profile',component: View_profile},
  { path: "/Inability", exact: true, name: 'Inability', component: Inability},
  { path: "/Edituser/:id", exact: true, name: 'Edituser', component: Edituser},
  { path: "/Bankdetailsedit/:id", exact: true, name: 'Bankdetailsedit', component: Bankdetailsedit},
  { path: "/Invoiceslist", exact: true, name: 'Invoiceslist', component: Invoiceslist},
  { path: "/DriveofflistSA", exact: true, name: 'DriveofflistSA', component: DriveofflistSA},
  { path: "/Driveofflistmanager", exact: true, name: 'Driveofflistmanager', component: Driveofflistmanager},
  { path: "/InvoiceDetail_page/:id", exact: true, name: 'InvoiceDetail_page', component: InvoiceDetail_page},
  { path: "/Editworkersheet/:id", exact: true, name: 'Editworkersheet', component: Editworkersheet},
  { path: "/DaySheetList", exact: true, name: 'DaySheetList', component: DaySheetList},
  { path: "/InvoicelistforSAdmin", exact:true, name: 'InvoicelistforSAdmin', component: InvoicelistforSAdmin},
  { path: "/Driveofflistmanager", exact: true, name: 'Driveofflistmanager', component: Driveofflistmanager},
  { path: "/Docketsearch", exact: true, name: 'Docketsearch', component: Docketsearch},
  { path: "/Maintanencesearch", exact: true, name: 'Maintanencesearch', component: Maintanencesearch},
  { path: "/IncidentsearchforSA", exact: true, name: 'IncidentsearchforSA', component: IncidentsearchforSA},
  { path: "/Incidentsearchmanager", exact: true, name: 'Incidentsearchmanager', component: Incidentsearchmanager},
  { path: "/InabilitysearchSA", exact: true, name: 'InabilitysearchSA', component: InabilitysearchSA},
  { path: "/Inabilitysearchmanager", exact: true, name: 'Inabilitysearchmanager', component: Inabilitysearchmanager},
  { path: "/Docketlist", exact: true, name: 'Docketlist', component: Docketlist},
  { path: "/MaintanencesearchSA", exact: true, name: 'MaintanencesearchSA', component: MaintanencesearchSA},
  { path: "/DaysheetlistManager", exact: true, name: 'DaysheetlistManager', component:DaySheetlistManager},
  { path: "/EditInvoice/:id", exact: true, name: 'EditInvoice', component: EditInvoice},
  { path: "/EditDocket/:id", exact: true, name: 'EditDocket', component: EditDocket},
  { path: "/EditIncident/:id", exact: true, name: 'EditIncident', component: EditIncident},
  { path: "/EditDriveoff/:id", exact: true, name: 'Edtdriveoff', component: EditDriveoff},
  { path: "/EditInability/:id", exact: true, name:'EditInability', component: EditInability},
  { path: "/EditMaintanence/:id", exact: true, name: 'EditMaintanence', component: EditMaintanence},
  { path: "/Fuelreconsilation", exact: true, name: 'Fuelreconsilation', component: Fuelreconsilation},
  { path: "/Getfuelreconsilation", exact: true, name: 'Getfuelreconsilation', component: Getfuelreconsilation},
  { path: "/GetfuelforSA", exact: true, name: 'GetfuelforSA', component: GetfuelforSA},
  { path: "/Contactdetails", exact: true, name: 'Contactdetails', component: Contactdetails},
  { path: "/Editfuelreconsilation/:id", exact: true, name: 'Editfuelreconsilation', component: Editfuelreconsilation},
  { path: "/Changepassword", exact: true, name: 'Chnagepassword', component: Changepasword},
  { path: "/Manageruserslist", exact: true, name: 'Manageruserslist', component: Manageruserslist},
  { path: "/UploadRoaster", exact: true, name: 'UploadRoaster', component: UploadRoaster},
  { path: "/Workerroaster", exact: true, name: 'Workerroaster', component: Workerroaster}
];
export default routes;
