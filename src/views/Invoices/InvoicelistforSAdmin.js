import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Divider,
  Header,
  Segment,
  Table,
  Menu,
  Button,
  Select,
  Pagination,
} from 'semantic-ui-react';
import { getOrderid } from '../../containers/InvoiceHandler/index';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteInvoiceByID, getsiteorsupplier } from '../../Apicalls';
toast.configure();
function InvoicelistforSAdmin() {
  const [apiUrl, setApiUrl] = useState('1');
  const [filter, setFilter] = useState({
    site: '',
    paymentStatus: '',
    FromDate: '',
    ToDate: '',
    supplier: '',
    invoiceType: '',
  });
  const [activePage, setActivePage] = useState(1);
  const [order, setOrder] = useState([]);
  const [totals, setTotals] = useState([]);
  const [length1, setLength] = useState('1');
  const [disabled, setdisabled] = useState(false);
  const [supplierlist, setSupplierlist] = useState({
    listofsuppliers: [],
    sitelist: []
  })
  const { listofsuppliers, sitelist } = supplierlist
  const updateSearchsite = (e, data) => {
    setFilter({ ...filter, site: `&site=${data.value}` });
    setActivePage(1);
    setApiUrl(1);
  };
  const updateSearch = (e, data) => {
    setFilter({ ...filter, paymentStatus: `&paymentStatus=${data.value}` });
    setActivePage(1);
    setApiUrl(1);
  };
  const updateStartDate = (e, data) => {
    setFilter({ ...filter, FromDate: `&FromDate=${data.value}` });
    setActivePage(1);
    setApiUrl(1);
  };
  const updateSupplier = (e, data) => {
    setFilter({ ...filter, supplier: `&supplier=${data.value}` });
    setActivePage(1);
    setApiUrl(1);
  };
  const updateinvoicetype = (e, data) => {
    setFilter({ ...filter, invoiceType: `&invoiceType=${data.value}` });
    setActivePage(1);
    setApiUrl(1);
  };
  const updateEndDate = (e, data) => {
    setFilter({
      ...filter,
      ToDate: `&ToDate=${data.value}`,
    });
    setActivePage(1);
    setApiUrl(1);
  };
  const deleteConfirmed = (id) => {
    let answer = window.confirm('Are you sure?');
    if (answer) {
      deleteInvoiceByID(id).then((data) => {
        if (data.error) {
        } else {
          toast.success('Deleted Successfully', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return preload(apiUrl, filter);
        }
      });
    }
  };
  const preload = (apiUrl, filter) => {
    getOrderid(apiUrl, filter).then((values) => {
      if (values.error) {
      } else {
        setOrder(values.data.invoices);
        setTotals(values.data.totals);
        setLength(values.data);
      }
    });
    getsiteorsupplier().then((data) => {
      if (data.error) {
        setSupplierlist({ ...supplierlist, error: data.error });
      } else {
        setSupplierlist({
          ...supplierlist,
          listofsuppliers: data.data.supplierList,
          sitelist: data.data.siteList,
        });
      }
    });
  };
  const onChange = (e, pageInfo) => {
    setActivePage(pageInfo.activePage);
    setApiUrl(pageInfo.activePage.toString());
  };
  useEffect(() => {
    preload(apiUrl, filter);
  }, [apiUrl, filter]);
  const Paymenttype = [
    { key: 'paid', value: 'paid', text: 'Paid' },
    { key: 'unpaid', value: 'unpaid', text: 'Unpaid' },
  ];
  const supplierslist = listofsuppliers.map((obj) => ({
    key: obj.name,
    text: obj.name,
    value: obj.name
  }));
  const selectsite = sitelist.map((obj) => ({
    key: obj.name,
    text: obj.name,
    value: obj.name
  }));
  const invoicetype = [
    { key: 'Purchase', value: 'Purchase', text: 'Purchase' },
    { key: 'Expense', value: 'Expense', text: 'Expense' },
  ]
  const linkToPrint = () => {
    return (
      <button >Print</button>
    )
  }
  const componentRef = useRef();
  const pdfgenerator = () => {
    var input = document.getElementById("pdf-element");
    var child = document.getElementById("ignore-pdfpart");
    child.remove();
    var headaction=document.getElementById("ignorepdfactionpart");
    headaction.remove();
    var headaction1=document.getElementById("ignorepdfactionpart1");
    headaction1.remove();
    order.map((ord,index) => {
      var child1 = document.getElementById(index);
      child1.remove();
      })
    const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
    pdf.html(input, { x: 16, y: 36, html2canvas: { scale: 0.37} }).then(() => {
      pdf.save("Invoice.pdf");
    });
  }
  return (
    <div ref={componentRef}>
      <Stylecontainer style={{ width: window.innerWidth <= 800 ?'': "140%" }}>
        <Segment>
          <Header as="h2" color="orange" textAlign="center">
            Invoices Management
          </Header>
          <Styledivider />
          <div className="ignoreprintpart">
            <Styleselect
              placeholder="Select Site"
              options={selectsite}
              onChange={(e, data) => updateSearchsite(e, data)}
            />
            <Styleselect
              placeholder="Supplier"
              options={supplierslist}
              onChange={(e, data) => updateSupplier(e, data)}
            />
            <Styleselect
              placeholder="Invoice Type"
              options={invoicetype}
              onChange={(e, data) => updateinvoicetype(e, data)}
            />
            <Styleselect
              placeholder="Payment Type"
              options={Paymenttype}
              onChange={(e, data) => updateSearch(e, data)}
            />
            <Stylelabel>Start Date:</Stylelabel>
            <Styleinput
              onClick={() => setdisabled(false)}
              onChange={(data, e) => updateStartDate(e, data.target)}
              type="date"
            ></Styleinput>
            <Stylelabel>End Date:</Stylelabel>
            <Styleinput
              disabled={disabled}
              onChange={(data, e) => updateEndDate(e, data.target)}
              type="date"
            ></Styleinput>
          </div>
          <div id="pdf-element" >
            <Table style={{ marginTop: '10px' }} celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>S.No</Table.HeaderCell>
                  <Table.HeaderCell>Supplier</Table.HeaderCell>
                  <Table.HeaderCell>Payment Status</Table.HeaderCell>
                  <Table.HeaderCell>Invoice Type</Table.HeaderCell>
                  <Table.HeaderCell>Due Date</Table.HeaderCell>
                  <Table.HeaderCell>Invoice Total</Table.HeaderCell>
                  <Table.HeaderCell>Gst Amount</Table.HeaderCell>
                  <Table.HeaderCell>Ex Gst Amt</Table.HeaderCell>
                  <Table.HeaderCell id="ignorepdfactionpart" className="ignoreprintpart">Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body style={{  backgroundColor:'white' }} >
                {order.map((ord, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>
                        {(activePage - 1) * 5 + order.indexOf(ord) + 1}{' '}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/InvoiceDetail_page/${ord._id}`}>{ord.supplier}</Link></Table.Cell>
                      <Table.Cell>
                        <Header as="h5" color={ord.paymentStatus === 'paid' ? 'green' : 'red'}>{ord.paymentStatus} </Header>
                      </Table.Cell>
                      <Table.Cell>{ord.invoiceType}</Table.Cell>
                      <Table.Cell>{ord.dueDate}</Table.Cell>
                      <Table.Cell>{ord.invoiceTotal}</Table.Cell>
                      <Table.Cell>{ord.gstAmount}</Table.Cell>
                      <Table.Cell>{ord.xgstAmount}</Table.Cell>
                      <Table.Cell className="ignoreprintpart" id={index}>
                        <Link to={`/EditInvoice/${ord._id}`}>
                          <Button
                            content="Edit"
                            icon="edit"
                            color="blue"
                          />
                        </Link>
                        <Button
                          content="Delete"
                          icon="trash"
                          color="red"
                          onClick={() => deleteConfirmed(ord._id)}
                        /></Table.Cell>
                    </Table.Row>
                  );
                })}
                <Table.Row>
                  <Table.Cell style={{ textAlign: 'center' }} colSpan='5'><b>Totals</b></Table.Cell>
                  <Table.Cell>{totals.totalAmount}</Table.Cell>
                  <Table.Cell>{totals.totalGstAmount}</Table.Cell>
                  <Table.Cell>{totals.totalXGstAmount}</Table.Cell>
                  <Table.Cell id="ignorepdfactionpart1" className="ignoreprintpart" colSpan='2'></Table.Cell>
                </Table.Row>
              </Table.Body>
              <Table.Footer className="ignoreprintpart" id="ignore-pdfpart">
                <Table.Row>
                  <Table.HeaderCell colSpan="16">
                    <Menu floated="right" pagination>
                      <Pagination
                        disabled={
                          !length1.result > 0 || length1.result < length1.limit + 1
                            ? true
                            : false
                        }
                        activePage={activePage}
                        ellipsisItem={null}
                        totalPages={Math.ceil(length1.result / length1.limit)}
                        firstItem={null}
                        onPageChange={onChange}
                        lastItem={null}
                      />
                    </Menu>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
        </Segment>
        <div className="ignoreprintpart" style={{ marginLeft: '1000px' }}>
          <ReactToPrint pageStyle={pageStyle} trigger={linkToPrint} content={() => componentRef.current} />&nbsp;
          <button onClick={pdfgenerator}>Download</button>
        </div>
      </Stylecontainer>
    </div>
  );
}
export default InvoicelistforSAdmin;
const pageStyle = `
@page {margin-left: 25mm ; border: 0.1px solid rgba(34, 36, 38, 0.5); } 
@media print { 
  .ignoreprintpart { visibility: hidden };
  body { -webkit-print-color-adjust: exact; }
} `
const Stylecontainer = styled(Container)`
  &&&&& {
    margin-top: 2rem;
  }
`;
const Styledivider = styled(Divider)`
  &&&&& {
    border: 0.1px solid rgba(34, 36, 38, 0.5);
  }
`;
const Styleinput = styled.input`
  margin-right: 2em;
  margin-left: 2em;
`;
const Stylelabel = styled.label`
  margin-left: 2em;
`;
const Styleselect = styled(Select)`
  &&&&& {
  
}
`;