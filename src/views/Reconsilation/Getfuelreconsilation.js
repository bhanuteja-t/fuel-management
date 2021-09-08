import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Divider,
  Header,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getfuelreconsilation } from '../../Apicalls';
import { isAuthenticated } from '../../Auth';
toast.configure();
function Getfuelreconsilation() {
  const currentuser = isAuthenticated();
  const uid = currentuser.data.user.userid;
  const [filter, setFilter] = useState({
    Date: ''
  });
  const [fuel, setFuel] = useState([])
  const [ previousdaydipslist,setPreviousdaydipslist] = useState([])
  const [ disbaled,setdisabled] = useState(false);
  const updateStartDate = (e, data) => {
    setFilter({ ...filter, Date: `Date=${data.value}` });
  };
  const preloading = (filter) => {
    getfuelreconsilation(uid, filter).then((data) => {
      if (data.error) {
      } else {
        setFuel(data.data.fuelReconsilation);
        setPreviousdaydipslist(data.data.previousDayDipsList);
      };
    });
  }
  useEffect(() => {
    preloading(filter)
  }, [filter])
  const linkToPrint = () => {
    return (
      <button >Print</button>
    )
  }
  const componentRef = useRef();
  const pdfgenerator = () => {
    const input = document.getElementById("pdf-element");
    var child = document.getElementById("ignore-pdfpart");
    child.remove();
    const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
    pdf.html(input, { x: 15, y: 36, html2canvas: { scale: 0.37 } }).then(() => {
      pdf.save("Reconsilation.pdf");
    });
  }
  return (
    <div ref={componentRef}>
      <Stylecontainer style={{ width: "100%" }}>
        <Segment>
          <Header as="h2" color="orange" textAlign="center">
            Fuel Reconsilation
          </Header>
          <Styledivider />
          <div className="ignoreprintpart" style={{ marginLeft: '20px' }}>Date :
            <input
              onClick={() => setdisabled(false)}
              onChange={(data, e) => updateStartDate(e, data.target)}
              type="date"
            ></input>
          </div>
          <div id="pdf-element">
            <form style={{ marginBottom: '10px', marginTop: '10px' }}>
              <table align='center' border="1" cellPadding='0px' style={tablestyle}>
                <tr>
                  <th>Date :{fuel.Date}</th>
                  <th colSpan="7"></th>
                  <th colSpan="4" style={{ textAlign: 'center' }}>Variance</th>
                </tr>
                <tr>
                  <th scope='col' style={{ padding: '0 30px', textAlign: 'center' }}>Product</th>
                  <th scope='col' style={{ width: '100px', textAlign: 'center' }}>Previous Day DIPS</th>
                  <th scope='col' style={{ width: '100px', textAlign: 'center' }}>Present Day DIPS</th>
                  <th scope='col' style={{ textAlign: 'center' }}>Deliveries</th>
                  <th colSpan='2' style={{ textAlign: 'center' }}>Wyse Values</th>
                  <th colSpan='2' style={{ textAlign: 'center' }}>POS Values</th>
                  <th style={{ textAlign: 'center' }}>Liters</th>
                  <th style={{ textAlign: 'center' }}>Dollars</th>
                  <th style={{ textAlign: 'center' }}>Dips</th>
                </tr>
                <tr>
                  <th scope='col' style={{ padding: '0 30px', textAlign: 'center' }}></th>
                  <th scope='col' style={{ width: '100px', textAlign: 'center' }}></th>
                  <th scope='col' style={{ width: '100px', textAlign: 'center' }}></th>
                  <th scope='col' style={{ textAlign: 'center' }}></th>
                  <th style={{ textAlign: 'center' }}>Liters</th>
                  <th style={{ textAlign: 'center' }}>Dollars</th>
                  <th style={{ textAlign: 'center' }}>Liters</th>
                  <th style={{ textAlign: 'center' }}>Dollars</th>
                  <th colSpan='3' style={{ textAlign: 'center' }}></th>
                </tr>
                <tr style={{ width: '100px' }} align="center">
                  <th>ULP</th>
                  <td style={{ width: '100px' }}>{fuel.ULP_PreviousDayDIPS}</td>
                  <td>{fuel.ULP_PresentDayDIPS}</td>
                  <td style={{ width: '100px' }}>{fuel.ULP_Deliveries}</td>
                  <td style={{ width: '100px' }}>{fuel.ulpwyselitervalue}</td>
                  <td style={{ width: '100px' }}>{fuel.ULP_WyseDollarValue}</td>
                  <td style={{ width: '100px' }}>{fuel.ulpposlitervalue}</td>
                  <td style={{ width: '100px' }}>{fuel.ULP_PosDollarValue}</td>
                  <td style={{ width: '100px' }}>{fuel.ulpvariancelitervalue}</td>
                  <td style={{ width: '100px' }}>{fuel.ULP_VarainceDollarValue}</td>
                  <td style={{ width: '100px' }}>{fuel.ULP_VarainceDIPS}</td>
                </tr>
                <tr align="center">
                  <th>PLUS</th>
                  <td>{fuel.PLUS_PreviousDayDIPS}</td>
                  <td>{fuel.PLUS_PresentDayDIPS}</td>
                  <td>{fuel.PLUS_Deliveries}</td>
                  <td>{fuel.PLUS_WyseLiterValue}</td>
                  <td>{fuel.PLUS_WyseDollarValue}</td>
                  <td>{fuel.PLUS_POSLiterValue}</td>
                  <td>{fuel.PLUS_PosDollarValue}</td>
                  <td>{fuel.PLUS_VarainceLiterValue}</td>
                  <td>{fuel.PLUS_VarainceDollarValue}</td>
                  <td>{fuel.PLUS_VarainceDIPS}</td>
                </tr>
                <tr align="center">
                  <th>DIPS</th>
                  <td>{fuel.DIS_PreviousDayDIPS}</td>
                  <td>{fuel.DIS_PresentDayDIPS}</td>
                  <td>{fuel.DIS_Deliveries}</td>
                  <td>{fuel.DIS_WyseLiterValue}</td>
                  <td>{fuel.DIS_WyseDollarValue}</td>
                  <td>{fuel.DIS_POSLiterValue}</td>
                  <td>{fuel.DIS_PosDollarValue}</td>
                  <td>{fuel.DIS_VarainceLiterValue}</td>
                  <td>{fuel.DIS_VarainceDollarValue}</td>
                  <td>{fuel.DIS_VarainceDIPS}</td>
                </tr>
                <tr align="center">
                  <th>PRE 95</th>
                  <td>{fuel.PRE95_PreviousDayDIPS}</td>
                  <td>{fuel.PRE95_PresentDayDIPS}</td>
                  <td>{fuel.PRE95_Deliveries}</td>
                  <td>{fuel.PRE95_WyseLiterValue}</td>
                  <td>{fuel.PRE95_WyseDollarValue}</td>
                  <td>{fuel.PRE95_POSLiterValue}</td>
                  <td>{fuel.PRE95_PosDollarValue}</td>
                  <td>{fuel.PRE95_VarainceLiterValue}</td>
                  <td>{fuel.PRE95_VarainceDollarValue}</td>
                  <td>{fuel.PRE95_VarainceDIPS}</td>
                </tr>
                <tr align="center">
                  <th>PRE 98</th>
                  <td>{fuel.PRE98_PreviousDayDIPS}</td>
                  <td>{fuel.PRE98_PresentDayDIPS}</td>
                  <td>{fuel.PRE98_Deliveries}</td>
                  <td>{fuel.PRE98_WyseLiterValue}</td>
                  <td>{fuel.PRE98_WyseDollarValue}</td>
                  <td>{fuel.PRE98_POSLiterValue}</td>
                  <td>{fuel.PRE98_PosDollarValue}</td>
                  <td>{fuel.PRE98_VarainceLiterValue}</td>
                  <td>{fuel.PRE98_VarainceDollarValue}</td>
                  <td>{fuel.PRE98_VarainceDIPS}</td>
                </tr>
                <tr align="center">
                  <th>E85</th>
                  <td>{fuel.E85_PreviousDayDIPS}</td>
                  <td>{fuel.E85_PresentDayDIPS}</td>
                  <td>{fuel.E85_Deliveries}</td>
                  <td>{fuel.E85_WyseLiterValue}</td>
                  <td>{fuel.E85_WyseDollarValue}</td>
                  <td>{fuel.E85_POSLiterValue}</td>
                  <td>{fuel.E85_PosDollarValue}</td>
                  <td>{fuel.E85_VarainceLiterValue}</td>
                  <td>{fuel.E85_VarainceDollarValue}</td>
                  <td>{fuel.E85_VarainceDIPS}</td>
                </tr>
                <tr align="center">
                  <th>LPG LTS</th>
                  <td>{fuel.LPG_LTS_PreviousDayDIPS}</td>
                  <td>{fuel.LPG_LTS_PresentDayDIPS}</td>
                  <td>{fuel.LPG_LTS_Deliveries}</td>
                  <td>{fuel.LPG_LTS_WyseLiterValue}</td>
                  <td>{fuel.LPG_LTS_WyseDollarValue}</td>
                  <td>{fuel.LPG_LTS_POSLiterValue}</td>
                  <td>{fuel.LPG_LTS_PosDollarValue}</td>
                  <td>{fuel.LPG_LTS_VarainceLiterValue}</td>
                  <td>{fuel.LPG_LTS_VarainceDollarValue}</td>
                  <td>{fuel.LPG_LTS_VarainceDIPS}</td>
                </tr>
                <tr align="center">
                  <td colSpan='3'></td>
                  <th style={{ textAlign: "center", backgroundColor: 'grey' }} ><b>Totals</b></th>
                  <td>{fuel.Total_WyseLiterValue}</td>
                  <td>{fuel.Total_WyseDollarValue}</td>
                  <td>{fuel.Total_POSLiterValue}</td>
                  <td>{fuel.Total_PosDollarValue}</td>
                  <td>{fuel.Total_VarainceLiterValue}</td>
                  <td>{fuel.Total_VarainceDollarValue}</td>
                  <td>{fuel.Total_VarainceDIPS}</td>
                </tr>
              </table>
              <button id="ignore-pdfpart"  className="ignoreprintpart" style={{ marginLeft: '530px', marginTop: '10px', borderRadius: '5px', }}><Link to={`/Editfuelreconsilation/${fuel._id}`}>Edit</Link></button>
            </form>
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
export default Getfuelreconsilation;
const pageStyle = `
@page {margin-left: 12mm ; border: 0.1px solid rgba(34, 36, 38, 0.5); } 
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
const tablestyle = {
  border: "2px solid rgb(24, 94, 132)",
  background: "rgb(255, 255, 25)",
}
