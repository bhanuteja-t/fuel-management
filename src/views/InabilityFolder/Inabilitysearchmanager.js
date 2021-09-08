import React, { useEffect, useState, useRef } from 'react';
import {
    Container,
    Divider,
    Header,
    Segment,
    Table,
    Menu,
    Dropdown,
    Button,
    Pagination,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getinbilityformanager } from '../../Apicalls';
import { isAuthenticated } from '../../Auth';
toast.configure();
function Inabilitysearchmanager() {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const [apiUrl, setApiUrl] = useState('1');
    const [filter, setFilter] = useState({
        Status: '',
        FromDate: '',
        ToDate: '',
    });
    const [activePage, setActivePage] = useState(1);
    const [totals, setTotals] = useState([]);
    const [order, setOrder] = useState([]);
    const [length1, setLength] = useState('1');
    const [disabled, setdisabled] = useState(false);
    const updateSearch = (e, data) => {
        setFilter({ ...filter, Status: `&Status=${data.value}` });
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
    const onChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage);
        setApiUrl(pageInfo.activePage.toString());
    };
    useEffect(() => {
        getinbilityformanager(uid, apiUrl, filter).then((values) => {
            if (values.error) {
            } else {
                setOrder(values.data.inabilities);
                setLength(values.data);
                setTotals(values.data.totals);
            }
        });
    }, [uid,apiUrl, filter]);
    const Paymenttype = [
        { key: 'paid', value: 'paid', text: 'paid' },
        { key: 'unpaid', value: 'unpaid', text: 'unpaid' },
    ];
    const linkToPrint = () => {
        return (
            <button>Print</button>
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
        pdf.html(input, { x: 16, y: 36 ,  html2canvas: { scale: 0.37} }).then(() => {
          pdf.save("Inability.pdf");
        });
      }
    return (
        <div ref={componentRef}>
        <Stylecontainer style={{ maxWidth: "210mm", width: "100%", height: "100%", position: "relative", margin: "0" }}>
            <Segment>
                <Header as="h2" color="orange" textAlign="center">
                    Inabilitysearch List
                </Header>
                <Styledivider />
                <Stylediv className="ignoreprintpart">
                    <Dropdown style={{ margin: '5px', width: '250px' }}
                        placeholder='Select Type'
                        fluid
                        search
                        selection
                        onChange={(e, data) => updateSearch(e, data)}
                        options={Paymenttype}
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
                <div id="pdf-element" >
                    <Table style={{ marginTop: '15px' }} celled columns={10}>
                        <Table.Header>
                            <Table.Row>
                            <Table.HeaderCell>S.No</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Product Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Total Amount</Table.HeaderCell>
                            <Table.HeaderCell id="ignorepdfactionpart" className="ignoreprintpart">Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {order.map((ord, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>
                                            {(activePage - 1) * 5 + order.indexOf(ord) + 1}{' '}
                                        </Table.Cell>
                                        <Table.Cell>{ord.Date}</Table.Cell>
                                        <Table.Cell>
                                            <Header as="h5" color={ord.Status === 'paid' ? 'green' : 'red'}>{ord.Status} </Header>
                                        </Table.Cell>
                                        <Table.Cell>{ord.ProductDescription} </Table.Cell>
                                        <Table.Cell>{ord.Amount}</Table.Cell>
                                        <Table.Cell>{ord.TotalAmount}</Table.Cell>
                                        <Table.Cell className="ignoreprintpart" id={index}>
                                            <Link to={`/EditInability/${ord._id}`}>
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
                            <Table.Row>
                            <Table.Cell style={{ textAlign: 'center' }} colSpan='4'><b>Totals</b></Table.Cell>
                            <Table.Cell>{totals.total_Amount}</Table.Cell>
                            <Table.Cell>{totals.total_TotalAmount}</Table.Cell>
                            <Table.Cell id="ignorepdfactionpart1" className="ignoreprintpart"></Table.Cell>
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
export default Inabilitysearchmanager;
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
