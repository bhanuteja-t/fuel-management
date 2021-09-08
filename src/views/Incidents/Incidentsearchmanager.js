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
import { getincidentsformanager } from '../../Apicalls';
toast.configure();
function Incidentsearchmanager() {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const [apiUrl, setApiUrl] = useState('1');
    const [filter, setFilter] = useState({
        Status: '',
        FromDate: '',
        ToDate: '',
    });
    const [activePage, setActivePage] = useState(1);
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
        getincidentsformanager(uid, apiUrl, filter).then((values) => {
            if (values.error) {
            } else {
                setOrder(values.data.incidents);
                setLength(values.data);
            }
        });
    }, [uid,apiUrl, filter]);
    const Statustype = [
        { key: 'Resolved', value: 'Resolved', text: 'Resolved' },
        { key: 'UnResolved', value: 'UnResolved', text: 'UnResolved' },
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
        var headaction = document.getElementById("ignorepdfactionpart");
        headaction.remove();
        order.map((ord, index) => {
                var child1 = document.getElementById(index);
                child1.remove();
        })
        const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
        pdf.html(input, { x: 16, y: 36, html2canvas: { scale: 0.37 } }).then(() => {
              pdf.save("Incident.pdf");
        });
    }
 return (
        <div ref={componentRef}>
            <Stylecontainer style={{ width: "100%" }}>
                <Segment>
                    <Header as="h2" color="orange" textAlign="center">
                        Incident's List
                    </Header>
                    <Styledivider />
                    <Stylediv className="ignoreprintpart">
                        <Dropdown style={{ margin: '5px', width: '250px' }}
                            placeholder='Select Status'
                            fluid
                            search
                            selection
                            onChange={(e, data) => updateSearch(e, data)}
                            options={Statustype}
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
                                    <Table.HeaderCell>RegNo</Table.HeaderCell>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                    <Table.HeaderCell>Event No</Table.HeaderCell>
                                    <Table.HeaderCell>ConstableId</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
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
                                            <Table.Cell>{ord.RegNo}</Table.Cell>
                                            <Table.Cell>{ord.Date}</Table.Cell>
                                            <Table.Cell>{ord.EventNo}</Table.Cell>
                                            <Table.Cell>{ord.ConstableId}</Table.Cell>
                                            <Table.Cell>
                                                <Header as="h5" color={ord.Status === 'Resolved' ? 'green' : 'red'}>{ord.Status} </Header>
                                            </Table.Cell>
                                            <Table.Cell>{ord.Description} </Table.Cell>
                                            <Table.Cell className="ignoreprintpart" id={index}>
                                                <Link to={`/EditIncident/${ord._id}`}>
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

export default Incidentsearchmanager;
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