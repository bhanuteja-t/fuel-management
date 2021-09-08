import axios from "axios";
export const Signin = async (userData)=> axios.post(`http://localhost:5000/api/clogin`,userData);
export const createuser = async (data)=>axios.post(`http://localhost:5000/api/users`,data);
export const createworkersheet = async (data) => axios.post(`http://localhost:5000/api/worksheets`,data);
export const create_invoicesheet = async (invoicedata) => {
   return axios.post(`http://localhost:5000/api/invoices`, invoicedata,{headers:{
       'Content-Type':'multipart/form-data; boundary=someArbitraryUniqueString',
}})}
export const addfuelReconsilations = async (data) => {
  return axios.post(`http://localhost:5000/api/fuelReconsilation`, data,{headers:{
      'Content-Type':'multipart/form-data; boundary=someArbitraryUniqueString',
}})}
export const getfuelreconsilation = async (uid,type) =>axios.get(`http://localhost:5000/api/fuelReconsilation?userid=${uid}&${type.Date}`);
export const getfuelreconsilationPrevDay = async (uid) => axios.get(`http://localhost:5000/api/fuelReconsilation?userid=${uid}`);
export const updatefuelreconsilation = async (recordid,data) => axios.put(`http://localhost:5000/api/fuelReconsilation/${recordid}`,data);
export const getfuelReconsilationbyId = async (recordid) =>axios.get(`http://localhost:5000/api/fuelReconsilationbyId/${recordid}`);
export const getfuelreconsilationforSA = async (type) =>axios.get(`http://localhost:5000/api/fuelReconsilationforSA?${type.Date}${type.site}`);
export const createdocket = async (deliverydata) => axios.post(`http://localhost:5000/api/deliveryDocket`, deliverydata);
export const createmaintenance = async (data) =>axios.post(`http://localhost:5000/api/MaintenanceSheet`,data,{headers:{
    'Content-Type':'application/json; boundary=someArbitraryUniqueString',}});
export const addincidents = async (data) =>axios.post(`http://localhost:5000/api/incidents`,data);
export const adddriveoffs = async (data) =>axios.post(`http://localhost:5000/api/driveOffs`,data);
export const addinabilities = async (data) =>axios.post(`http://localhost:5000/api/inabilities`,data);
export const getusers = async () =>axios.get(`http://localhost:5000/api/users`);
export const getinvoices = async () =>axios.get(`http://localhost:5000/api/invoices`);
export const getUserByID = (id) => axios.get(`http://localhost:5000/api/users/${id}`);
export const UpdateuserByID = (id,data) => axios.put(`http://localhost:5000/api/users/${id}`,data);
export const deleteUserByID = (id) => axios.delete(`http://localhost:5000/api/users/${id}`);
export const paperworkpost = async (id,data) =>axios.put(`http://localhost:5000/api/daysheetPaperWork/${id}`,data);
export const getepaytotal = async ()=> axios.get(`http://localhost:5000/api/daysheetPaperWork`);
export const getInvoiceByID = async (id) =>axios.get(`http://localhost:5000/api/invoices/${id}`);
export const deleteInvoiceByID = async (id) =>axios.delete(`http://localhost:5000/api/invoices/${id}`);
export const Addsiteorsupplier = async (data) =>axios.post(`http://localhost:5000/api/createsiteorsupplier`,data);
export const getsiteorsupplier = async () =>axios.get(`http://localhost:5000/api/getsiteorsupplier`);
export const UpdateInvoiceByID = async (id,data) => { 
  return axios.put(`http://localhost:5000/api/invoices/${id}`,data,{headers:{
  'Content-Type':'multipart/form-data; boundary=someArbitraryUniqueString'}})}
export const getworkersheetByID = async (id) => axios.get(`http://localhost:5000/api/worksheets/${id}`);
export const UpdateWokersheetByID = (id,data) => axios.put(`http://localhost:5000/api/worksheets/${id}`,data);
export const getdeliveryDocket = async () =>axios.get(`http://localhost:5000/api/deliveryDocket`);
export const deletedeliveryDocket = async (id) =>axios.delete(`http://localhost:5000/api/deliveryDocket/${id}`);
export const getdeliveryDocketByID = async (id,data) =>axios.get(`http://localhost:5000/api/deliveryDocket/${id}`,data);
export const UpdatedeliveryDocket = async (id,data) =>axios.put(`http://localhost:5000/api/deliveryDocket/${id}`,data);
export const getMaintanencesearch = async () =>axios.get(`http://localhost:5000/api/MaintenanceSheet`);
export const updateMaintanence = async (id,data) =>axios.put(`http://localhost:5000/api/MaintenanceSheet/${id}`,data);
export const deleteMaintanence = async (id) =>axios.delete(`http://localhost:5000/api/MaintenanceSheet/${id}`);
export const getMaintanenceByID = async (id) =>axios.get(`http://localhost:5000/api/MaintenanceSheet/${id}`);
export const getincidents = async () =>axios.get(`http://localhost:5000/api/incidents`);
export const getincidentsByID = async (id) =>axios.get(`http://localhost:5000/api/incidents/${id}`);
export const deleteincidentsByID = async (id) =>axios.delete(`http://localhost:5000/api/incidents/${id}`);
export const updateincidentsByID = async (id,data) =>axios.put(`http://localhost:5000/api/incidents/${id}`,data);
export const getdriveOffs = async () =>axios.get(`http://localhost:5000/api/driveOffs`);
export const getdriveOffsByID = async (id) =>axios.get(`http://localhost:5000/api/driveOffs/${id}`);
export const UpdatedriveOffsByID = async (id,data) =>axios.put(`http://localhost:5000/api/driveOffs/${id}`,data);
export const deletedriveOffsByID = async (id) =>axios.delete(`http://localhost:5000/api/driveOffs/${id}`);
export const getinabilities = async () =>axios.get(`http://localhost:5000/api/inabilities`);
export const getinabilitiesByID = async (id) =>axios.get(`http://localhost:5000/api/inabilities/${id}`);
export const UpdateinabilitiesByID = async (id,data) =>axios.put(`http://localhost:5000/api/inabilities/${id}`,data);
export const deleteinabilitiesByID = async (id) =>axios.delete(`http://localhost:5000/api/inabilities/${id}`);
export const getdeliveryDocketforSA= (page, type) =>axios.get(
    `http://localhost:5000/api/deliveryDocket?type=ALL&page=${page}&size=5${type.site}${type.Supplier}${type.FromDate}${type.ToDate}`,
  );
  export const getdeliveryDocketformanager= (uid,page, type) =>axios.get(
    `http://localhost:5000/api/deliveryDocketformanager?userid=${uid}&type=ALL&page=${page}&size=5${type.Supplier}${type.FromDate}${type.ToDate}`,
  );
  export const getMaintenanceSheetformanager= (uid,page, type) =>axios.get(
    `http://localhost:5000/api/MaintenanceSheetformanager?userid=${uid}&type=ALL&page=${page}&size=5${type.Status}${type.FromDate}${type.ToDate}`,
  );
  export const getMaintenanceSheetforSA= (page, type) =>axios.get(
    `http://localhost:5000/api/MaintenanceSheet?type=ALL&page=${page}&size=5${type.site}${type.Status}${type.FromDate}${type.ToDate}`,
  );
  export const getinbilityforSA= (page, type) =>axios.get(
    `http://localhost:5000/api/inabilities?type=ALL&page=${page}&size=5${type.site}${type.Status}${type.FromDate}${type.ToDate}`,
  );
  export const getinbilityformanager= (uid,page, type) =>axios.get(
    `http://localhost:5000/api/inabilitiesformanager?userid=${uid}&type=ALL&page=${page}&size=5${type.Status}${type.FromDate}${type.ToDate}`,
  );
  export const getdriveOffsformanager= (uid,page, type) =>axios.get(
    `http://localhost:5000/api/driveOffsformanager?userid=${uid}&type=ALL&page=${page}&size=5${type.Rego}${type.FromDate}${type.ToDate}`,
  );
  export const getdriveOffsforSA= (page, type) =>axios.get(
    `http://localhost:5000/api/driveOffs?type=ALL&page=${page}&size=5${type.site}${type.Rego}${type.FromDate}${type.ToDate}`,
  );
  export const getincidentsforSA= (page, type) => axios.get(
    `http://localhost:5000/api/incidents?type=ALL&page=${page}&size=5${type.site}${type.Status}${type.FromDate}${type.ToDate}`,
  );
  export const getincidentsformanager= (uid,page, type) =>
  axios.get(
    `http://localhost:5000/api/incidentsformanager?userid=${uid}&type=ALL&page=${page}&size=5${type.Status}${type.FromDate}${type.ToDate}`,
  );
  export const getworkersheet = async (uid,type) => axios.get(`http://localhost:5000/api/worksheets?userid=${uid}${type.Date}`);
  export const getworkersheetforSA = async (type) => axios.get(`http://localhost:5000/api/worksheets?${type.site}${type.Date}${type.ToDate}${type.Category}`);
  export const getallworkersheet = async () => axios.get(`http://localhost:5000/api/worksheets`);
  export const getworkersheetformanager  = async () => axios.get(`http://localhost:5000/api/worksheetsforManager`);
  export const addbankdetails = async (data) =>axios.post(`http://localhost:5000/api/bankDetails`,data);
  export const getbankdetails = async () =>axios.get(`http://localhost:5000/api/bankDetails`);
  export const getbankdetailsByID = async (id) =>axios.get(`http://localhost:5000/api/bankDetails/${id}`);
  export const updatebankdetailsByID = async (id,data) =>axios.put(`http://localhost:5000/api/bankDetails/${id}`,data);
  export const changepwdapi = async (id,data) =>axios.put(`http://localhost:5000/api/changepassword/${id}`,data);
  export const Addleave = async (data) =>axios.post(`http://localhost:5000/api/leaves`,data);
  export const getleaves = async (data) =>axios.get(`http://localhost:5000/api/allLeaves`);
  export const getleavesfornotifications = async () =>axios.get(`http://localhost:5000/api/leaves`);
  export const getleavesbyuserid = async (uid) =>axios.get(`http://localhost:5000/api/leaves/${uid}`);
  export const updateleavesapi = async (id,data) =>axios.put(`http://localhost:5000/api/leaves/${id}`,data);
  export const uploadroaster = async (data) =>axios.post(`http://localhost:5000/api/roaster`,data,{headers:{
    'Content-Type':'multipart/form-data; boundary=someArbitraryUniqueString',
}});
export const getroaster = async (uid) =>axios.get(`http://localhost:5000/api/getroaster/${uid}`);