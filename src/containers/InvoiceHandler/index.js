import axios from 'axios';

export const getOrderid = (page, type) =>
  axios.get(
    `http://localhost:5000/api/invoices?type=ALL&page=${page}&size=5${type.site}${type.supplier}${type.invoiceType}${type.paymentStatus}${type.FromDate}${type.ToDate}`,
  );

  export const getInvoiceidformanager = (uid,page, type) =>
  axios.get(
    `http://localhost:5000/api/getinvoicesformanager?userid=${uid}&type=ALL&page=${page}&size=5${type.paymentStatus}${type.invoiceType}${type.FromDate}${type.ToDate}`,
  );