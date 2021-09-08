import React, { useEffect, useState, useRef } from 'react';
import {
  Header,
} from 'semantic-ui-react';
import { useHistory } from "react-router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getfuelReconsilationbyId,updatefuelreconsilation } from '../../Apicalls';
import { isAuthenticated } from '../../Auth';
toast.configure();
const Editfuelreconsilation = (props) => {
  const notify = () => {
    toast.success(<h3>Reconsilation Updated Successfully</h3>, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };
  const currentuser = isAuthenticated();
  const uid = currentuser.data.user.userid;
  const recordid = props.match.params.id;
  const history = useHistory();
  const [fuel, setFuel] = useState({
    userid: uid,
    ULP_PreviousDayDIPS: "",
    PLUS_PreviousDayDIPS: "",
    DIS_PreviousDayDIPS: "",
    PRE95_PreviousDayDIPS: "",
    PRE98_PreviousDayDIPS: "",
    E85_PreviousDayDIPS: "",
    LPG_LTS_PreviousDayDIPS: "",
    ULP_PresentDayDIPS: "",
    PLUS_PresentDayDIPS: "",
    DIS_PresentDayDIPS: "",
    PRE95_PresentDayDIPS: "",
    PRE98_PresentDayDIPS: "",
    E85_PresentDayDIPS: "",
    LPG_LTS_PresentDayDIPS: "",
    ULP_Deliveries: "",
    PLUS_Deliveries: "",
    DIS_Deliveries: "",
    PRE95_Deliveries: "",
    PRE98_Deliveries: "",
    E85_Deliveries: "",
    LPG_LTS_Deliveries: "",
    ulpwyselitervalue: "",
    PLUS_WyseLiterValue: "",
    DIS_WyseLiterValue: "",
    PRE95_WyseLiterValue: "",
    PRE98_WyseLiterValue: "",
    E85_WyseLiterValue: "",
    LPG_LTS_WyseLiterValue: "",
    Total_WyseLiterValue: "",
    ULP_WyseDollarValue: "",
    PLUS_WyseDollarValue: "",
    DIS_WyseDollarValue: "",
    PRE95_WyseDollarValue: "",
    PRE98_WyseDollarValue: "",
    E85_WyseDollarValue: "",
    LPG_LTS_WyseDollarValue: "",
    Total_WyseDollarValue: "",
    ulpposlitervalue: "",
    PLUS_POSLiterValue: "",
    DIS_POSLiterValue: "",
    PRE95_POSLiterValue: "",
    PRE98_POSLiterValue: "",
    E85_POSLiterValue: "",
    LPG_LTS_POSLiterValue: "",
    Total_POSLiterValue: "",
    ULP_PosDollarValue: "",
    PLUS_PosDollarValue: "",
    DIS_PosDollarValue: "",
    PRE95_PosDollarValue: "",
    PRE98_PosDollarValue: "",
    E85_PosDollarValue: "",
    LPG_LTS_PosDollarValue: "",
    Total_PosDollarValue: "",
    ulpvariancelitervalue: '',
    PLUS_VarainceLiterValue: "",
    DIS_VarainceLiterValue: "",
    PRE95_VarainceLiterValue: "",
    PRE98_VarainceLiterValue: "",
    E85_VarainceLiterValue: "",
    LPG_LTS_VarainceLiterValue: "",
    Total_VarainceLiterValue: "",
    ULP_VarainceDollarValue: "",
    PLUS_VarainceDollarValue: "",
    DIS_VarainceDollarValue: "",
    PRE95_VarainceDollarValue: "",
    PRE98_VarainceDollarValue: "",
    E85_VarainceDollarValue: "",
    LPG_LTS_VarainceDollarValue: "",
    Total_VarainceDollarValue: "",
    ULP_VarainceDIPS: "",
    PLUS_VarainceDIPS: "",
    DIS_VarainceDIPS: "",
    PRE95_VarainceDIPS: "",
    PRE98_VarainceDIPS: "",
    E85_VarainceDIPS: "",
    LPG_LTS_VarainceDIPS: "",
    Total_VarainceDIPS: "",
    formData: new FormData(),
  });
  const {
    ulpwyselitervalue,
    ulpposlitervalue,
  } = fuel;
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setFuel({ ...fuel, [name]: value });
  };
  const Adddetails = (event) => {
    event.preventDefault();
    updatefuelreconsilation(recordid,fuel).then((data) => {
      if (data.error) {
        setFuel({ ...fuel, error: data.error });
      } else {
        setFuel({
          ...fuel,
          ULP_PreviousDayDIPS: "",
          PLUS_PreviousDayDIPS: "",
          DIS_PreviousDayDIPS: "",
          PRE95_PreviousDayDIPS: "",
          PRE98_PreviousDayDIPS: "",
          E85_PreviousDayDIPS: "",
          LPG_LTS_PreviousDayDIPS: "",
          ULP_PresentDayDIPS: "",
          PLUS_PresentDayDIPS: "",
          DIS_PresentDayDIPS: "",
          PRE95_PresentDayDIPS: "",
          PRE98_PresentDayDIPS: "",
          E85_PresentDayDIPS: "",
          LPG_LTS_PresentDayDIPS: "",
          ULP_Deliveries: "",
          PLUS_Deliveries: "",
          DIS_Deliveries: "",
          PRE95_Deliveries: "",
          PRE98_Deliveries: "",
          E85_Deliveries: "",
          LPG_LTS_Deliveries: "",
          ulpwyselitervalue: "",
          PLUS_WyseLiterValue: "",
          DIS_WyseLiterValue: "",
          PRE95_WyseLiterValue: "",
          PRE98_WyseLiterValue: "",
          E85_WyseLiterValue: "",
          LPG_LTS_WyseLiterValue: "",
          Total_WyseLiterValue: "",
          ULP_WyseDollarValue: "",
          PLUS_WyseDollarValue: "",
          DIS_WyseDollarValue: "",
          PRE95_WyseDollarValue: "",
          PRE98_WyseDollarValue: "",
          E85_WyseDollarValue: "",
          LPG_LTS_WyseDollarValue: "",
          Total_WyseDollarValue: "",
          ulpposlitervalue: "",
          PLUS_POSLiterValue: "",
          DIS_POSLiterValue: "",
          PRE95_POSLiterValue: "",
          PRE98_POSLiterValue: "",
          E85_POSLiterValue: "",
          LPG_LTS_POSLiterValue: "",
          Total_POSLiterValue: "",
          ULP_PosDollarValue: "",
          PLUS_PosDollarValue: "",
          DIS_PosDollarValue: "",
          PRE95_PosDollarValue: "",
          PRE98_PosDollarValue: "",
          E85_PosDollarValue: "",
          LPG_LTS_PosDollarValue: "",
          Total_PosDollarValue: "",
          ulpvariancelitervalue: '',
          PLUS_VarainceLiterValue: "",
          DIS_VarainceLiterValue: "",
          PRE95_VarainceLiterValue: "",
          PRE98_VarainceLiterValue: "",
          E85_VarainceLiterValue: "",
          LPG_LTS_VarainceLiterValue: "",
          Total_VarainceLiterValue: "",
          ULP_VarainceDollarValue: "",
          PLUS_VarainceDollarValue: "",
          DIS_VarainceDollarValue: "",
          PRE95_VarainceDollarValue: "",
          PRE98_VarainceDollarValue: "",
          E85_VarainceDollarValue: "",
          LPG_LTS_VarainceDollarValue: "",
          Total_VarainceDollarValue: "",
          ULP_VarainceDIPS: "",
          PLUS_VarainceDIPS: "",
          DIS_VarainceDIPS: "",
          PRE95_VarainceDIPS: "",
          PRE98_VarainceDIPS: "",
          E85_VarainceDIPS: "",
          LPG_LTS_VarainceDIPS: "",
          Total_VarainceDIPS: "",
        });
        notify();
      }
      history.push("/dashboard");
    });
  };
  useEffect(() => {
    getfuelReconsilationbyId(recordid).then((data) => {
      let list = data.data;
      if (data.error) {
      } else {
        setFuel(list);
      };
    });
  }, [recordid])
  const componentRef = useRef();
  return (
    <div>
      <Header as="h2" color="orange" textAlign="center">
        Fuel Reconsilation
      </Header>
      <div ref={componentRef}>
        <form style={{ marginBottom: '20px' }}>
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
            <tr align="center">
              <th>ULP</th>
              <td><input style={{ width: '100px' }} type='number' value={fuel.ULP_PreviousDayDIPS} id='ULP_PreviousDayDIPS' /> </td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.ULP_PresentDayDIPS} onChange={handleChange("ULP_PresentDayDIPS")} id='ULP_PresentDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.ULP_Deliveries} onChange={handleChange("ULP_Deliveries")} id='ULP_Deliveries' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.ulpwyselitervalue} onChange={handleChange("ulpwyselitervalue")} id='ulpwyselitervalue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.ULP_WyseDollarValue} onChange={handleChange("ULP_WyseDollarValue")} id='ULP_WyseDollarValue'/></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.ulpposlitervalue} onChange={handleChange("ulpposlitervalue")} id='ulpposlitervalue'/></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.ULP_PosDollarValue} onChange={handleChange("ULP_PosDollarValue")} id='ULP_PosDollarValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={ulpposlitervalue-ulpwyselitervalue} readOnly={true} id='ulpvarinaceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(fuel.ULP_PosDollarValue)-parseInt(fuel.ULP_WyseDollarValue)} readOnly={true} id='ulpvariancedollar' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(fuel.ULP_Deliveries) - parseInt(fuel.ULP_PresentDayDIPS) - parseInt(fuel.ulpwyselitervalue) + parseInt(fuel.ULP_PreviousDayDIPS)} readOnly={true} id='ULP_VarainceDIPS' /></td>
            </tr>
            <tr align="center">
              <th>PLUS</th>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PLUS_PreviousDayDIPS} id='PLUS_PreviousDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PLUS_PresentDayDIPS} onChange={handleChange("PLUS_PresentDayDIPS")} id='PLUS_PresentDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PLUS_Deliveries} onChange={handleChange("PLUS_Deliveries")} id='PLUS_Deliveries' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PLUS_WyseLiterValue} onChange={handleChange("PLUS_WyseLiterValue")} id='PLUS_WyseLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PLUS_WyseDollarValue} onChange={handleChange("PLUS_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PLUS_POSLiterValue} onChange={handleChange("PLUS_POSLiterValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PLUS_PosDollarValue} onChange={handleChange("PLUS_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PLUS_POSLiterValue-fuel.PLUS_WyseLiterValue} readOnly={true} id='plusvarianceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PLUS_PosDollarValue-fuel.PLUS_WyseDollarValue} readOnly={true} id='plusvariancedollar' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(fuel.PLUS_Deliveries) - parseInt(fuel.PLUS_PresentDayDIPS) - parseInt(fuel.PLUS_WyseLiterValue) + parseInt(fuel.PLUS_PreviousDayDIPS)} readOnly={true} id='PLUS_VarainceDIPS' /></td>
            </tr>
            <tr align="center">
              <th>DIPS</th>
              <td><input style={{ width: '100px' }} type='number' value={fuel.DIS_PreviousDayDIPS} id='DIS_PreviousDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.DIS_PresentDayDIPS} onChange={handleChange("DIS_PresentDayDIPS")} id='DIS_PresentDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.DIS_Deliveries} onChange={handleChange("DIS_Deliveries")} id='DIS_Deliveries' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.DIS_WyseLiterValue} onChange={handleChange("DIS_WyseLiterValue")} id='DIS_WyseLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.DIS_WyseDollarValue} onChange={handleChange("DIS_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.DIS_POSLiterValue} onChange={handleChange("DIS_POSLiterValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.DIS_PosDollarValue} onChange={handleChange("DIS_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.DIS_POSLiterValue - fuel.DIS_WyseLiterValue} readOnly={true} id='disvarianceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.DIS_PosDollarValue - fuel.DIS_WyseDollarValue} readOnly={true} id='disvarinacedollar' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(fuel.DIS_Deliveries) - parseInt(fuel.DIS_PresentDayDIPS) - parseInt(fuel.DIS_WyseLiterValue) + parseInt(fuel.DIS_PreviousDayDIPS)} id='DIS_VarainceDIPS'/></td>
              </tr>
            <tr align="center">
              <th>PRE 95</th>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE95_PreviousDayDIPS} id='PRE95_PreviousDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE95_PresentDayDIPS} onChange={handleChange("PRE95_PresentDayDIPS")} id='PRE95_PresentDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE95_Deliveries} onChange={handleChange("PRE95_Deliveries")} id='PRE95_Deliveries' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE95_WyseLiterValue} onChange={handleChange("PRE95_WyseLiterValue")} id='PRE95_WyseLiterValue'/></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE95_WyseDollarValue} onChange={handleChange("PRE95_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE95_POSLiterValue} onChange={handleChange("PRE95_POSLiterValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE95_PosDollarValue} onChange={handleChange("PRE95_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE95_POSLiterValue-fuel.PRE95_WyseLiterValue} readOnly={true} id='pre95varianceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE95_PosDollarValue-fuel.PRE95_WyseDollarValue} readOnly={true} id='pre95variancedollar' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(fuel.PRE95_Deliveries) - parseInt(fuel.PRE95_PresentDayDIPS) - parseInt(fuel.PRE95_WyseLiterValue) + parseInt(fuel.PRE95_PreviousDayDIPS)} id='PRE95_VarainceDIPS'/></td>
            </tr>
            <tr align="center">
              <th>PRE 98</th>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE98_PreviousDayDIPS} id='PRE98_PreviousDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE98_PresentDayDIPS} onChange={handleChange("PRE98_PresentDayDIPS")} id='PRE98_PresentDayDIPS'/></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE98_Deliveries} onChange={handleChange("PRE98_Deliveries")} id='PRE98_Deliveries'/></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE98_WyseLiterValue} onChange={handleChange("PRE98_WyseLiterValue")} id='PRE98_WyseLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE98_WyseDollarValue} onChange={handleChange("PRE98_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE98_POSLiterValue} onChange={handleChange("PRE98_POSLiterValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE98_PosDollarValue} onChange={handleChange("PRE98_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE98_POSLiterValue-fuel.PRE98_WyseLiterValue} readOnly={true} id='pre98varianceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.PRE98_PosDollarValue-fuel.PRE98_WyseDollarValue} readOnly={true} id='pre98variancedollar' /></td>
              <td><input style={{ width: '100px' }} type='number'  value={parseInt(fuel.PRE98_Deliveries) - parseInt(fuel.PRE98_PresentDayDIPS) - parseInt(fuel.PRE98_WyseLiterValue) + parseInt(fuel.PRE98_PreviousDayDIPS)} id='PRE98_VarainceDIPS' /></td>
            </tr>
            <tr align="center">
              <th>E85</th>
              <td><input style={{ width: '100px' }} type='number' value={fuel.E85_PreviousDayDIPS} id='E85_PreviousDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.E85_PresentDayDIPS} onChange={handleChange("E85_PresentDayDIPS")} id='E85_PresentDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.E85_Deliveries} onChange={handleChange("E85_Deliveries")} id='E85_Deliveries' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.E85_WyseLiterValue} onChange={handleChange("E85_WyseLiterValue")} id='E85_WyseLiterValue'/></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.E85_WyseDollarValue} onChange={handleChange("E85_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.E85_POSLiterValue} onChange={handleChange("E85_POSLiterValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.E85_PosDollarValue} onChange={handleChange("E85_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.E85_POSLiterValue-fuel.E85_WyseLiterValue} readOnly={true} id='e85varianceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.E85_PosDollarValue-fuel.E85_WyseDollarValue} readOnly={true} id='e85variancedollar' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(fuel.E85_Deliveries)-parseInt(fuel.E85_PresentDayDIPS) - parseInt(fuel.E85_WyseLiterValue) + parseInt(fuel.E85_PreviousDayDIPS)} id='E85_VarainceDIPS' /></td>
            </tr>
            <tr align="center">
              <th>LPG LTS</th>
              <td><input style={{ width: '100px' }} type='number' value={fuel.LPG_LTS_PreviousDayDIPS} id='LPG_LTS_PreviousDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.LPG_LTS_PresentDayDIPS} onChange={handleChange("LPG_LTS_PresentDayDIPS")} id='LPG_LTS_PresentDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.LPG_LTS_Deliveries} onChange={handleChange("LPG_LTS_Deliveries")} id='LPG_LTS_Deliveries' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.LPG_LTS_WyseLiterValue} onChange={handleChange("LPG_LTS_WyseLiterValue")} id='LPG_LTS_WyseLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.LPG_LTS_WyseDollarValue} onChange={handleChange("LPG_LTS_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.LPG_LTS_POSLiterValue} onChange={handleChange("LPG_LTS_POSLiterValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.LPG_LTS_PosDollarValue} onChange={handleChange("LPG_LTS_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.LPG_LTS_POSLiterValue-fuel.LPG_LTS_WyseLiterValue} readOnly={true} id='lpgltsvarinaceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={fuel.LPG_LTS_PosDollarValue-fuel.LPG_LTS_WyseDollarValue} readOnly={true} id='lpgltsvarinacedollar' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(fuel.LPG_LTS_Deliveries) - parseInt(fuel.LPG_LTS_PresentDayDIPS) - parseInt(fuel.LPG_LTS_WyseLiterValue) + parseInt(fuel.LPG_LTS_PreviousDayDIPS)} id='LPG_LTS_VarainceDIPS' /></td>
            </tr>
            <tr>
              <td colSpan='3'></td>
              <th style={{ textAlign: "center", backgroundColor: 'grey' }} ><b>Totals</b></th>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(fuel.ulpwyselitervalue) + parseInt(fuel.PLUS_WyseLiterValue) + parseInt(fuel.DIS_WyseLiterValue) + parseInt(fuel.PRE95_WyseLiterValue) + parseInt(fuel.PRE98_WyseLiterValue) + parseInt(fuel.E85_WyseLiterValue) + parseInt(fuel.LPG_LTS_WyseLiterValue)} readOnly={true} id='Total_WyseLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(fuel.ULP_WyseDollarValue) + parseInt(fuel.PLUS_WyseDollarValue) + parseInt(fuel.DIS_WyseDollarValue) + parseInt(fuel.PRE95_WyseDollarValue) + parseInt(fuel.PRE98_WyseDollarValue) + parseInt(fuel.E85_WyseDollarValue) + parseInt(fuel.LPG_LTS_WyseDollarValue)} readOnly={true} id='Total_WyseDollarValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(fuel.ulpposlitervalue) + parseInt(fuel.PLUS_POSLiterValue) + parseInt(fuel.DIS_POSLiterValue) + parseInt(fuel.PRE95_POSLiterValue) + parseInt(fuel.PRE98_POSLiterValue) + parseInt(fuel.E85_POSLiterValue) + parseInt(fuel.LPG_LTS_POSLiterValue)} readOnly={true} id='Total_POSLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(fuel.ULP_PosDollarValue) + parseInt(fuel.PLUS_PosDollarValue) + parseInt(fuel.DIS_PosDollarValue) + parseInt(fuel.PRE95_PosDollarValue) + parseInt(fuel.PRE98_PosDollarValue) + parseInt(fuel.E85_PosDollarValue) + parseInt(fuel.LPG_LTS_PosDollarValue)} readOnly={true} id='Total_PosDollarValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(parseInt(fuel.ulpposlitervalue)-parseInt(fuel.ulpwyselitervalue)) + parseInt(parseInt(fuel.PLUS_POSLiterValue)-parseInt(fuel.PLUS_WyseLiterValue)) + parseInt(parseInt(fuel.DIS_POSLiterValue) - parseInt(fuel.DIS_WyseLiterValue)) + parseInt(parseInt(fuel.PRE95_POSLiterValue)-parseInt(fuel.PRE95_WyseLiterValue)) + parseInt(parseInt(fuel.PRE98_POSLiterValue)-parseInt(fuel.PRE98_WyseLiterValue)) + parseInt(parseInt(fuel.E85_POSLiterValue)-parseInt(fuel.E85_WyseLiterValue)) + parseInt(parseInt(fuel.LPG_LTS_POSLiterValue)-parseInt(fuel.LPG_LTS_WyseLiterValue))} readOnly={true} id='Total_VarainceLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(parseInt(fuel.ULP_PosDollarValue)-parseInt(fuel.ULP_WyseDollarValue)) + parseInt(parseInt(fuel.PLUS_PosDollarValue) - parseInt(fuel.PLUS_WyseDollarValue)) + parseInt(parseInt(fuel.DIS_PosDollarValue) - parseInt(fuel.DIS_WyseDollarValue)) + parseInt(parseInt(fuel.PRE95_PosDollarValue) - parseInt(fuel.PRE95_WyseDollarValue)) + parseInt(parseInt(fuel.PRE98_PosDollarValue) - parseInt(fuel.PRE98_WyseDollarValue)) + parseInt(parseInt(fuel.E85_PosDollarValue) - parseInt(fuel.E85_WyseDollarValue)) + parseInt(parseInt(fuel.LPG_LTS_PosDollarValue) - parseInt(fuel.LPG_LTS_WyseDollarValue))} readOnly={true} id='Total_VarainceDollarValue' /></td>

              <td><input style={{ width: '100px' }} type='number' value={parseInt(parseInt(fuel.ULP_Deliveries) - parseInt(fuel.ULP_PresentDayDIPS) - parseInt(fuel.ulpwyselitervalue) + parseInt(fuel.ULP_PreviousDayDIPS))+ 
                parseInt(parseInt(fuel.PLUS_Deliveries) - parseInt(fuel.PLUS_PresentDayDIPS) - parseInt(fuel.PLUS_WyseLiterValue) + parseInt(fuel.PLUS_PreviousDayDIPS)) +
                parseInt(parseInt(fuel.DIS_Deliveries) - parseInt(fuel.DIS_PresentDayDIPS) - parseInt(fuel.DIS_WyseLiterValue) + parseInt(fuel.DIS_PreviousDayDIPS)) +
                parseInt(parseInt(fuel.PRE95_Deliveries) - parseInt(fuel.PRE95_PresentDayDIPS) - parseInt(fuel.PRE95_WyseLiterValue) + parseInt(fuel.PRE95_PreviousDayDIPS)) + 
                parseInt(parseInt(fuel.PRE98_Deliveries) - parseInt(fuel.PRE98_PresentDayDIPS) - parseInt(fuel.PRE98_WyseLiterValue) + parseInt(fuel.PRE98_PreviousDayDIPS)) +
                parseInt(parseInt(fuel.E85_Deliveries)-parseInt(fuel.E85_PresentDayDIPS) - parseInt(fuel.E85_WyseLiterValue) + parseInt(fuel.E85_PreviousDayDIPS)) +
                parseInt(parseInt(fuel.LPG_LTS_Deliveries) - parseInt(fuel.LPG_LTS_PresentDayDIPS) - parseInt(fuel.LPG_LTS_WyseLiterValue) + parseInt(fuel.LPG_LTS_PreviousDayDIPS))} readOnly={true} id='Total_VarainceDIPS' /></td>
            </tr> 
            <tr>
              <td colSpan='11' align='center'> <button onClick={Adddetails} >Update</button>
              </td></tr>
          </table>
        </form>
      </div>
    </div>
  );
}
export default Editfuelreconsilation;
const tablestyle = {
  border: "2px solid rgb(24, 94, 132)",
  background: "rgb(255, 255, 25)",
}