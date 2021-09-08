import React, { useEffect, useState, useRef } from 'react';
import {
    Container,
    Divider,
    Header,
    Segment,
    Table,
    Menu,
    Button,
    Dropdown,
    Pagination,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from '../../Auth';
import { getdeliveryDocketformanager, getsiteorsupplier } from '../../Apicalls';
toast.configure();
function Docketlist() {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const [apiUrl, setApiUrl] = useState('1');
    const [filter, setFilter] = useState({
        Supplier: '',
        FromDate: '',
        ToDate: '',
    });
    useEffect(() => {
        preload(apiUrl, filter);
    }, [apiUrl, filter]);
    const [activePage, setActivePage] = useState(1);
    const [order, setOrder] = useState([]);
    const [length1, setLength] = useState('1');
    const [disabled, setdisabled] = useState(false);
    const [supplierlist, setSupplierlist] = useState({
        listofsuppliers: [],
        sitelist: []
    })
    const { listofsuppliers } = supplierlist
    const updateSearch = (e, data) => {
        setFilter({ ...filter, Supplier: `&Supplier=${data.value}` });
        setActivePage(1);
        setApiUrl(1);
    };
    const updateStartDate = (e, data) => {
        setFilter({ ...filter, FromDate: `&FromDate=${data.value}` });
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
    const preload = (apiUrl, filter) => {
        getdeliveryDocketformanager(uid, apiUrl, filter).then((values) => {
            if (values.error) {
            } else {
                setOrder(values.data.deliveryDockets);
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
    const supplierslist = listofsuppliers.map((obj) => ({
        key: obj.name,
        text: obj.name,
        value: obj.name
    }));
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
        var headaction = document.getElementById("ignorepdfactionpart");
        headaction.remove();
        order.map((ord, index) => {
                var child1 = document.getElementById(index);
                child1.remove();
            })
        const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
        pdf.html(input, { x: 16, y: 36, html2canvas: { scale: 0.37 } }).then(() => {
            pdf.save("Docket.pdf");
        });
    }
    return (
        <div ref={componentRef}>
            <Stylecontainer style={{ width: "140%" }}>
                <Segment>
                    <Header as="h2" color="orange" textAlign="center">
                        Docket List Management
                    </Header>
                    <Styledivider />
                    <div className="ignoreprintpart">
                        <Stylediv>
                            <Dropdown style={{ margin: '5px', width: '250px' }}
                                placeholder='Select Supplier'
                                fluid
                                search
                                selection
                                onChange={(e, data) => updateSearch(e, data)}
                                options={supplierslist}
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
                        </Stylediv>
                    </div>
                    <div id="pdf-element" >
                        <Table style={{ marginTop: '15px' }} celled columns={10}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>S.No</Table.HeaderCell>
                                    <Table.HeaderCell>Supplier</Table.HeaderCell>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                    <Table.HeaderCell>Docket Number</Table.HeaderCell>
                                    <Table.HeaderCell>Temp Docket No</Table.HeaderCell>
                                    <Table.HeaderCell>Note</Table.HeaderCell>
                                    <Table.HeaderCell id="ignorepdfactionpart" className="ignoreprintpart">Action</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {order.map((ord, index) => {
                                    return (
                                        <Table.Row >
                                            <Table.Cell>
                                                {(activePage - 1) * 5 + order.indexOf(ord) + 1}{' '}
                                            </Table.Cell>
                                            <Table.Cell>{ord.supplier}</Table.Cell>
                                            <Table.Cell>{ord.Date}</Table.Cell>
                                            <Table.Cell>{ord.DocketNo}</Table.Cell>
                                            <Table.Cell>{ord.TempDocketNo}</Table.Cell>
                                            <Table.Cell>{ord.note}</Table.Cell>
                                            <Table.Cell className="ignoreprintpart" id={index}>
                                                <Link to={`/EditDocket/${ord._id}`}>
                                                    <Button
                                                        content="Edit"
                                                        icon="edit"
                                                        color="blue"
                                                    />
                                                </Link>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
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
export default Docketlist;
const pageStyle = `
@page {margin-left: 35mm ; border: 0.1px solid rgba(34, 36, 38, 0.5); } 
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
const Stylediv = styled.div`
  display: flex;
`;
const Styleinput = styled.input`
  margin-right: 2em;
  margin-left: 2em;
`;
const Stylelabel = styled.label`
  margin-left: 2em;
`;