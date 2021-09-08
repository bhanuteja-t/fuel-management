import React, { useEffect, useState, useRef } from 'react';
import {
  Header,
} from 'semantic-ui-react';
import { useHistory } from "react-router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addfuelReconsilations, getfuelreconsilationPrevDay } from '../../Apicalls';
import { isAuthenticated } from '../../Auth';
toast.configure();
function Fuelreconsilation() {
  const notify = () => {
    toast.success(<h3>Reconsilation Created Successfully</h3>, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };
  const currentuser = isAuthenticated();
  const uid = currentuser.data.user.userid;
  const history = useHistory();
  const [previousdaydipslist, setPreviousdaydipslist] = useState([]);
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
    ULP_PresentDayDIPS,
    PLUS_PresentDayDIPS,
    DIS_PresentDayDIPS,
    PRE95_PresentDayDIPS,
    PRE98_PresentDayDIPS,
    E85_PresentDayDIPS,
    LPG_LTS_PresentDayDIPS,
    ULP_Deliveries,
    PLUS_Deliveries,
    DIS_Deliveries,
    PRE95_Deliveries,
    PRE98_Deliveries,
    E85_Deliveries,
    LPG_LTS_Deliveries,
    ulpwyselitervalue,
    PLUS_WyseLiterValue,
    DIS_WyseLiterValue,
    PRE95_WyseLiterValue,
    PRE98_WyseLiterValue,
    E85_WyseLiterValue,
    LPG_LTS_WyseLiterValue,
    ULP_WyseDollarValue,
    PLUS_WyseDollarValue,
    DIS_WyseDollarValue,
    PRE95_WyseDollarValue,
    PRE98_WyseDollarValue,
    E85_WyseDollarValue,
    LPG_LTS_WyseDollarValue,
    ulpposlitervalue,
    PLUS_POSLiterValue,
    DIS_POSLiterValue,
    PRE95_POSLiterValue,
    PRE98_POSLiterValue,
    E85_POSLiterValue,
    LPG_LTS_POSLiterValue,
    ULP_PosDollarValue,
    PLUS_PosDollarValue,
    DIS_PosDollarValue,
    PRE95_PosDollarValue,
    PRE98_PosDollarValue,
    E85_PosDollarValue,
    LPG_LTS_PosDollarValue,
    formData,
  } = fuel;
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    formData.set(name, value);
    setFuel({ ...fuel, [name]: value });
  };
  let ulpvarinaceliter = 0
  if (document.getElementById('ulpvarinaceliter')) {
    ulpvarinaceliter = parseInt(document.getElementById('ulpvarinaceliter').value);
  }
  let ulpvariancedollar = 0;
  if (document.getElementById('ulpvariancedollar')) {
    ulpvariancedollar = parseInt(document.getElementById('ulpvariancedollar').value);
  }
  let plusvarianceliter = 0;
  if (document.getElementById('plusvarianceliter')) {
    plusvarianceliter = parseInt(document.getElementById('plusvarianceliter').value);
  }
  let plusvariancedollar = 0;
  if (document.getElementById('plusvariancedollar')) {
    plusvariancedollar = parseInt(document.getElementById('plusvariancedollar').value);
  }
  let disvarianceliter = 0;
  if (document.getElementById('disvarianceliter')) {
    disvarianceliter = parseInt(document.getElementById('disvarianceliter').value);
  }
  let disvarinacedollar = 0;
  if (document.getElementById('disvarinacedollar')) {
    disvarinacedollar = parseInt(document.getElementById('disvarinacedollar').value);
  }
  let pre95varianceliter = 0;
  if (document.getElementById('pre95varianceliter')) {
    pre95varianceliter = parseInt(document.getElementById('pre95varianceliter').value);
  }
  let pre95variancedollar = 0;
  if (document.getElementById('pre95variancedollar')) {
    pre95variancedollar = parseInt(document.getElementById('pre95variancedollar').value);
  }
  let pre98varianceliter = 0;
  if (document.getElementById('pre98varianceliter')) {
    pre98varianceliter = parseInt(document.getElementById('pre98varianceliter').value);
  }
  let pre98variancedollar = 0;
  if (document.getElementById('pre98variancedollar')) {
    pre98variancedollar = parseInt(document.getElementById('pre98variancedollar').value);
  }
  let e85varianceliter = 0;
  if (document.getElementById('e85varianceliter')) {
    e85varianceliter = parseInt(document.getElementById('e85varianceliter').value);
  }
  let e85variancedollar = 0;
  if (document.getElementById('e85variancedollar')) {
    e85variancedollar = parseInt(document.getElementById('e85variancedollar').value);
  }
  let lpgltsvarinaceliter = 0;
  if (document.getElementById('lpgltsvarinaceliter')) {
    lpgltsvarinaceliter = parseInt(document.getElementById('lpgltsvarinaceliter').value);
  }
  let ulppreviosdaydips = 0;
  if (document.getElementById('ULP_PreviousDayDIPS')) {
    ulppreviosdaydips = parseInt(document.getElementById('ULP_PreviousDayDIPS').value);
  }
  let pluspreviosdaydips = 0;
  if (document.getElementById('PLUS_PreviousDayDIPS')) {
    pluspreviosdaydips = parseInt(document.getElementById('PLUS_PreviousDayDIPS').value);
  }
  let dispreviosdaydips = 0;
  if (document.getElementById('DIS_PreviousDayDIPS')) {
    dispreviosdaydips = parseInt(document.getElementById('DIS_PreviousDayDIPS').value);
  }
  let pre95previousdaydips = 0;
  if (document.getElementById('PRE95_PreviousDayDIPS')) {
    pre95previousdaydips = parseInt(document.getElementById('PRE95_PreviousDayDIPS').value);
  }
  let pre98previousdaydips = 0;
  if (document.getElementById('PRE98_PreviousDayDIPS')) {
    pre98previousdaydips = parseInt(document.getElementById('PRE98_PreviousDayDIPS').value);
  }
  let e85previousdaydips = 0;
  if (document.getElementById('E85_PreviousDayDIPS')) {
    e85previousdaydips = parseInt(document.getElementById('E85_PreviousDayDIPS').value);
  }
  let lpgltspreviousdaydips = 0;
  if (document.getElementById('LPG_LTS_PreviousDayDIPS')) {
    lpgltspreviousdaydips = parseInt(document.getElementById('LPG_LTS_PreviousDayDIPS').value);
  }
  let ulppresentdaydips = 0;
  if (document.getElementById('ULP_PresentDayDIPS')) {
    ulppresentdaydips = parseInt(document.getElementById('ULP_PresentDayDIPS').value);
  }
  let ulpdeliveries = 0;
  if (document.getElementById('ULP_Deliveries')) {
    ulpdeliveries = parseInt(document.getElementById('ULP_Deliveries').value);
  }
  let ulpwylitervalue = 0;
  if (document.getElementById("ulpwyselitervalue")) {
    ulpwylitervalue = parseInt(document.getElementById('ulpwyselitervalue').value);
  }
  let ulpvariancedips = 0;
  if (document.getElementById("ULP_VarainceDIPS")) {
    ulpvariancedips = parseInt(document.getElementById('ULP_VarainceDIPS').value);
  }
  let pluspresentdaydips = 0;
  if (document.getElementById("PLUS_PresentDayDIPS")) {
    pluspresentdaydips = parseInt(document.getElementById('PLUS_PresentDayDIPS').value);
  }
  let plusdeliveries = 0;
  if (document.getElementById("PLUS_Deliveries")) {
    plusdeliveries = parseInt(document.getElementById('PLUS_Deliveries').value);
  }
  let pluswyselitervalue = 0;
  if (document.getElementById("PLUS_WyseLiterValue")) {
    pluswyselitervalue = parseInt(document.getElementById('PLUS_WyseLiterValue').value);
  }
  let plusvariancedips = 0;
  if (document.getElementById("PLUS_VarainceDIPS")) {
    plusvariancedips = parseInt(document.getElementById("PLUS_VarainceDIPS").value);
  }

  let dispresentdaydips = 0;
  if (document.getElementById("DIS_PresentDayDIPS")) {
    dispresentdaydips = parseInt(document.getElementById('DIS_PresentDayDIPS').value);
  }
  let disdeliveries = 0;
  if (document.getElementById("DIS_Deliveries")) {
    disdeliveries = parseInt(document.getElementById('DIS_Deliveries').value);
  }
  let diswyselitervalue = 0;
  if (document.getElementById("DIS_WyseLiterValue")) {
    diswyselitervalue = parseInt(document.getElementById('DIS_WyseLiterValue').value);
  }
  let disvariancedips = 0;
  if (document.getElementById("DIS_VarainceDIPS")) {
    disvariancedips = parseInt(document.getElementById("DIS_VarainceDIPS").value);
  }

  let pre95presentdaydips = 0;
  if (document.getElementById("PRE95_PresentDayDIPS")) {
    pre95presentdaydips = parseInt(document.getElementById('PRE95_PresentDayDIPS').value);
  }
  let pre95deliveries = 0;
  if (document.getElementById("PRE95_Deliveries")) {
    pre95deliveries = parseInt(document.getElementById('PRE95_Deliveries').value);
  }
  let pre95wyselitervalue = 0;
  if (document.getElementById("PRE95_WyseLiterValue")) {
    pre95wyselitervalue = parseInt(document.getElementById('PRE95_WyseLiterValue').value);
  }
  let pre95variancedips = 0;
  if (document.getElementById("PRE95_VarainceDIPS")) {
    pre95variancedips = parseInt(document.getElementById("PRE95_VarainceDIPS").value);
  }

  let pre98presentdaydips = 0;
  if (document.getElementById("PRE98_PresentDayDIPS")) {
    pre98presentdaydips = parseInt(document.getElementById('PRE98_PresentDayDIPS').value);
  }
  let pre98deliveries = 0;
  if (document.getElementById("PRE98_Deliveries")) {
    pre98deliveries = parseInt(document.getElementById('PRE98_Deliveries').value);
  }
  let pre98wyselitervalue = 0;
  if (document.getElementById("PRE98_WyseLiterValue")) {
    pre98wyselitervalue = parseInt(document.getElementById('PRE98_WyseLiterValue').value);
  }
  let pre98variancedips = 0;
  if (document.getElementById("PRE98_VarainceDIPS")) {
    pre98variancedips = parseInt(document.getElementById("PRE98_VarainceDIPS").value);
  }
  let e85presentdaydips = 0;
  if (document.getElementById("E85_PresentDayDIPS")) {
    e85presentdaydips = parseInt(document.getElementById('E85_PresentDayDIPS').value);
  }
  let e85deliveries = 0;
  if (document.getElementById("E85_Deliveries")) {
    e85deliveries = parseInt(document.getElementById('E85_Deliveries').value);
  }
  let e85wyselitervalue = 0;
  if (document.getElementById("E85_WyseLiterValue")) {
    e85wyselitervalue = parseInt(document.getElementById('E85_WyseLiterValue').value);
  }
  let e85variancedips = 0;
  if (document.getElementById("E85_VarainceDIPS")) {
    e85variancedips = parseInt(document.getElementById("E85_VarainceDIPS").value);
  }

  let lpgltspresentdaydips = 0;
  if (document.getElementById("LPG_LTS_PresentDayDIPS")) {
    lpgltspresentdaydips = parseInt(document.getElementById('LPG_LTS_PresentDayDIPS').value);
  }
  let lpgltsdeliveries = 0;
  if (document.getElementById("LPG_LTS_Deliveries")) {
    lpgltsdeliveries = parseInt(document.getElementById('LPG_LTS_Deliveries').value);
  }
  let lpgltswyselitervalue = 0;
  if (document.getElementById("LPG_LTS_WyseLiterValue")) {
    lpgltswyselitervalue = parseInt(document.getElementById('LPG_LTS_WyseLiterValue').value);
  }
  let lpgltsvariancedips = 0;
  if (document.getElementById("LPG_LTS_VarainceDIPS")) {
    lpgltsvariancedips = parseInt(document.getElementById("LPG_LTS_VarainceDIPS").value);
  }
  useEffect(() => {
    getfuelreconsilationPrevDay(uid).then((data) => {
      if (data.error) {
      } else {
        setPreviousdaydipslist(data.data.previousDayDipsList);
      };
    });
  }, [uid]);
  const Adddetails = (event) => {
    event.preventDefault();
    formData.set('userid', uid);
    formData.set('ulpvariancelitervalue', ulpvarinaceliter)
    formData.set('ULP_VarainceDollarValue', ulpvariancedollar)
    formData.set('PLUS_VarainceLiterValue', plusvarianceliter);
    formData.set('PLUS_VarainceDollarValue', plusvariancedollar);
    formData.set('DIS_VarainceLiterValue', disvarianceliter);
    formData.set('DIS_VarainceDollarValue', disvarinacedollar);
    formData.set('PRE95_VarainceLiterValue', pre95varianceliter);
    formData.set('PRE95_VarainceDollarValue', pre95variancedollar);
    formData.set('PRE98_VarainceLiterValue', pre98varianceliter);
    formData.set('PRE98_VarainceDollarValue', pre98variancedollar);
    formData.set('E85_VarainceLiterValue', e85varianceliter);
    formData.set('E85_VarainceDollarValue', e85variancedollar);
    formData.set('LPG_LTS_VarainceLiterValue', lpgltsvarinaceliter);
    let lpgltsvarinacedollar = parseInt(document.getElementById('lpgltsvarinacedollar').value);
    formData.set('LPG_LTS_VarainceDollarValue', lpgltsvarinacedollar);
    let Total_WyseLiterValue = parseInt(document.getElementById('Total_WyseLiterValue').value);
    formData.set('Total_WyseLiterValue', Total_WyseLiterValue);
    let Total_WyseDollarValue = parseInt(document.getElementById('Total_WyseDollarValue').value);
    formData.set('Total_WyseDollarValue', Total_WyseDollarValue);
    let Total_POSLiterValue = parseInt(document.getElementById('Total_POSLiterValue').value);
    formData.set('Total_POSLiterValue', Total_POSLiterValue);
    let Total_PosDollarValue = parseInt(document.getElementById('Total_PosDollarValue').value);
    formData.set('Total_PosDollarValue', Total_PosDollarValue);
    let Total_VarainceLiterValue = parseInt(document.getElementById('Total_VarainceLiterValue').value);
    formData.set('Total_VarainceLiterValue', Total_VarainceLiterValue);
    let Total_VarainceDollarValue = parseInt(document.getElementById('Total_VarainceDollarValue').value);
    formData.set('Total_VarainceDollarValue', Total_VarainceDollarValue);
    let Total_VarainceDIPS = parseInt(document.getElementById('Total_VarainceDIPS').value);
    formData.set('Total_VarainceDIPS', Total_VarainceDIPS);
    formData.set('ULP_PreviousDayDIPS', ulppreviosdaydips)
    formData.set('PLUS_PreviousDayDIPS', pluspreviosdaydips)
    formData.set('DIS_PreviousDayDIPS', dispreviosdaydips)
    formData.set('PRE95_PreviousDayDIPS', pre95previousdaydips)
    formData.set('PRE98_PreviousDayDIPS', pre98previousdaydips)
    formData.set('E85_PreviousDayDIPS', e85previousdaydips)
    formData.set('LPG_LTS_PreviousDayDIPS', lpgltspreviousdaydips)
    formData.set('ULP_PresentDayDIPS', ulppresentdaydips)
    formData.set('ULP_Deliveries', ulpdeliveries)
    formData.set('ulpwyselitervalue', ulpwylitervalue)
    formData.set('ULP_VarainceDIPS', ulpvariancedips)
    formData.set('PLUS_PresentDayDIPS', pluspresentdaydips)
    formData.set('PLUS_Deliveries', plusdeliveries)
    formData.set('PLUS_WyseLiterValue', pluswyselitervalue)
    formData.set('PLUS_VarainceDIPS', plusvariancedips)
    formData.set('DIS_VarainceDIPS', disvariancedips)
    formData.set('DIS_PresentDayDIPS', dispresentdaydips)
    formData.set('DIS_Deliveries', disdeliveries)
    formData.set('DIS_WyseLiterValue', diswyselitervalue)
    formData.set('PRE95_PresentDayDIPS',pre95presentdaydips)
    formData.set('PRE95_Deliveries',pre95deliveries)
    formData.set('PRE95_WyseLiterValue',pre95wyselitervalue)
    formData.set('PRE95_VarainceDIPS',pre95variancedips)
    formData.set('PRE98_PresentDayDIPS',pre98presentdaydips)
    formData.set('PRE98_Deliveries',pre98deliveries)
    formData.set('PRE98_WyseLiterValue',pre98wyselitervalue)
    formData.set('PRE98_VarainceDIPS',pre98variancedips)
    formData.set('E85_PresentDayDIPS',e85presentdaydips)
    formData.set('E85_Deliveries',e85deliveries)
    formData.set('E85_WyseLiterValue',e85wyselitervalue)
    formData.set('E85_VarainceDIPS',e85variancedips)
    formData.set('LPG_LTS_PresentDayDIPS',lpgltspresentdaydips)
    formData.set('LPG_LTS_Deliveries',lpgltsdeliveries)
    formData.set('LPG_LTS_WyseLiterValue',lpgltswyselitervalue)
    formData.set('LPG_LTS_VarainceDIPS',lpgltsvariancedips)
    addfuelReconsilations(formData).then((data) => {
      if (data.error) {
        setFuel({ ...fuel, error: data.error });
      } else {
        setFuel({
          ...fuel,
        });
        notify();
      }
      history.push("/dashboard");
    });
  };
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
              <th>Date :</th>
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
              <td><input style={{ width: '100px' }} type='number' value={previousdaydipslist.ULP_PreviousDayDIPS} id='ULP_PreviousDayDIPS' /> </td>
              <td><input style={{ width: '100px' }} type='number' value={ULP_PresentDayDIPS} onChange={handleChange("ULP_PresentDayDIPS")} id='ULP_PresentDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={ULP_Deliveries} onChange={handleChange("ULP_Deliveries")} id='ULP_Deliveries' /></td>
              <td><input style={{ width: '100px' }} type='number' value={ulpwyselitervalue} onChange={handleChange("ulpwyselitervalue")} id='ulpwyselitervalue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={ULP_WyseDollarValue} onChange={handleChange("ULP_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={ulpposlitervalue} onChange={handleChange("ulpposlitervalue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={ULP_PosDollarValue} onChange={handleChange("ULP_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={ulpposlitervalue-ulpwyselitervalue} readOnly={true} id='ulpvarinaceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={ULP_PosDollarValue-ULP_WyseDollarValue} readOnly={true} id='ulpvariancedollar' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(ulpdeliveries) - parseInt(ulppresentdaydips) - parseInt(ulpwylitervalue) + parseInt(previousdaydipslist.ULP_PreviousDayDIPS)} readOnly={true} id='ULP_VarainceDIPS' /></td>
            </tr>
            <tr align="center">
              <th>PLUS</th>
              <td><input style={{ width: '100px' }} type='number' value={previousdaydipslist.PLUS_PreviousDayDIPS} id='PLUS_PreviousDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={PLUS_PresentDayDIPS} onChange={handleChange("PLUS_PresentDayDIPS")} id='PLUS_PresentDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={PLUS_Deliveries} onChange={handleChange("PLUS_Deliveries")} id='PLUS_Deliveries' /></td>
              <td><input style={{ width: '100px' }} type='number' value={PLUS_WyseLiterValue} onChange={handleChange("PLUS_WyseLiterValue")} id='PLUS_WyseLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={PLUS_WyseDollarValue} onChange={handleChange("PLUS_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={PLUS_POSLiterValue} onChange={handleChange("PLUS_POSLiterValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={PLUS_PosDollarValue} onChange={handleChange("PLUS_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={PLUS_POSLiterValue-PLUS_WyseLiterValue} readOnly={true} id='plusvarianceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={PLUS_PosDollarValue-PLUS_WyseDollarValue} readOnly={true} id='plusvariancedollar' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(plusdeliveries) - parseInt(pluspresentdaydips) - parseInt(pluswyselitervalue) + parseInt(previousdaydipslist.PLUS_PreviousDayDIPS)} readOnly={true} id='PLUS_VarainceDIPS' /></td>
            </tr>
            <tr align="center">
              <th>DIPS</th>
              <td><input style={{ width: '100px' }} type='number' value={previousdaydipslist.DIS_PreviousDayDIPS} id='DIS_PreviousDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={DIS_PresentDayDIPS} onChange={handleChange("DIS_PresentDayDIPS")} id='DIS_PresentDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={DIS_Deliveries} onChange={handleChange("DIS_Deliveries")} id='DIS_Deliveries' /></td>
              <td><input style={{ width: '100px' }} type='number' value={DIS_WyseLiterValue} onChange={handleChange("DIS_WyseLiterValue")} id='DIS_WyseLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={DIS_WyseDollarValue} onChange={handleChange("DIS_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={DIS_POSLiterValue} onChange={handleChange("DIS_POSLiterValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={DIS_PosDollarValue} onChange={handleChange("DIS_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={DIS_POSLiterValue - DIS_WyseLiterValue} readOnly={true} id='disvarianceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={DIS_PosDollarValue - DIS_WyseDollarValue} readOnly={true} id='disvarinacedollar' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(disdeliveries) - parseInt(dispresentdaydips) - parseInt(diswyselitervalue) + parseInt(previousdaydipslist.DIS_PreviousDayDIPS)} id='DIS_VarainceDIPS'/></td>
            </tr>
            <tr align="center">
              <th>PRE 95</th>
              <td><input style={{ width: '100px' }} type='number' value={previousdaydipslist.PRE95_PreviousDayDIPS} id='PRE95_PreviousDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE95_PresentDayDIPS} onChange={handleChange("PRE95_PresentDayDIPS")} id='PRE95_PresentDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE95_Deliveries} onChange={handleChange("PRE95_Deliveries")} id='PRE95_Deliveries' /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE95_WyseLiterValue} onChange={handleChange("PRE95_WyseLiterValue")} id='PRE95_WyseLiterValue'/></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE95_WyseDollarValue} onChange={handleChange("PRE95_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE95_POSLiterValue} onChange={handleChange("PRE95_POSLiterValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE95_PosDollarValue} onChange={handleChange("PRE95_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE95_POSLiterValue-PRE95_WyseLiterValue} readOnly={true} id='pre95varianceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE95_PosDollarValue-PRE95_WyseDollarValue} readOnly={true} id='pre95variancedollar' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(pre95deliveries) - parseInt(pre95presentdaydips) - parseInt(pre95wyselitervalue) + parseInt(previousdaydipslist.PRE95_PreviousDayDIPS)} id='PRE95_VarainceDIPS'/></td>
            </tr>
            <tr align="center">
              <th>PRE 98</th>
              <td><input style={{ width: '100px' }} type='number' value={previousdaydipslist.PRE98_PreviousDayDIPS} id='PRE98_PreviousDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE98_PresentDayDIPS} onChange={handleChange("PRE98_PresentDayDIPS")} id='PRE98_PresentDayDIPS'/></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE98_Deliveries} onChange={handleChange("PRE98_Deliveries")} id='PRE98_Deliveries'/></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE98_WyseLiterValue} onChange={handleChange("PRE98_WyseLiterValue")} id='PRE98_WyseLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE98_WyseDollarValue} onChange={handleChange("PRE98_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE98_POSLiterValue} onChange={handleChange("PRE98_POSLiterValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE98_PosDollarValue} onChange={handleChange("PRE98_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE98_POSLiterValue-PRE98_WyseLiterValue} readOnly={true} id='pre98varianceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={PRE98_PosDollarValue-PRE98_WyseDollarValue} readOnly={true} id='pre98variancedollar' /></td>
              <td><input style={{ width: '100px' }} type='number'  value={parseInt(pre98deliveries) - parseInt(pre98presentdaydips) - parseInt(pre98wyselitervalue) + parseInt(previousdaydipslist.PRE98_PreviousDayDIPS)} id='PRE98_VarainceDIPS' /></td>
            </tr>
            <tr align="center">
              <th>E85</th>
              <td><input style={{ width: '100px' }} type='number' value={previousdaydipslist.E85_PreviousDayDIPS} id='E85_PreviousDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={E85_PresentDayDIPS} onChange={handleChange("E85_PresentDayDIPS")} id='E85_PresentDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={E85_Deliveries} onChange={handleChange("E85_Deliveries")} id='E85_Deliveries' /></td>
              <td><input style={{ width: '100px' }} type='number' value={E85_WyseLiterValue} onChange={handleChange("E85_WyseLiterValue")} id='E85_WyseLiterValue'/></td>
              <td><input style={{ width: '100px' }} type='number' value={E85_WyseDollarValue} onChange={handleChange("E85_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={E85_POSLiterValue} onChange={handleChange("E85_POSLiterValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={E85_PosDollarValue} onChange={handleChange("E85_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={E85_POSLiterValue-E85_WyseLiterValue} readOnly={true} id='e85varianceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={E85_PosDollarValue-E85_WyseDollarValue} readOnly={true} id='e85variancedollar' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(e85deliveries)-parseInt(e85presentdaydips) - parseInt(e85wyselitervalue) + parseInt(previousdaydipslist.E85_PreviousDayDIPS)} id='E85_VarainceDIPS' /></td>
            </tr>
            <tr align="center">
              <th>LPG LTS</th>
              <td><input style={{ width: '100px' }} type='number' value={previousdaydipslist.LPG_LTS_PreviousDayDIPS} id='LPG_LTS_PreviousDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={LPG_LTS_PresentDayDIPS} onChange={handleChange("LPG_LTS_PresentDayDIPS")} id='LPG_LTS_PresentDayDIPS' /></td>
              <td><input style={{ width: '100px' }} type='number' value={LPG_LTS_Deliveries} onChange={handleChange("LPG_LTS_Deliveries")} id='LPG_LTS_Deliveries' /></td>
              <td><input style={{ width: '100px' }} type='number' value={LPG_LTS_WyseLiterValue} onChange={handleChange("LPG_LTS_WyseLiterValue")} id='LPG_LTS_WyseLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={LPG_LTS_WyseDollarValue} onChange={handleChange("LPG_LTS_WyseDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={LPG_LTS_POSLiterValue} onChange={handleChange("LPG_LTS_POSLiterValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={LPG_LTS_PosDollarValue} onChange={handleChange("LPG_LTS_PosDollarValue")} /></td>
              <td><input style={{ width: '100px' }} type='number' value={LPG_LTS_POSLiterValue-LPG_LTS_WyseLiterValue} readOnly={true} id='lpgltsvarinaceliter' /></td>
              <td><input style={{ width: '100px' }} type='number' value={LPG_LTS_PosDollarValue-LPG_LTS_WyseDollarValue} readOnly={true} id='lpgltsvarinacedollar' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(lpgltsdeliveries) - parseInt(lpgltspresentdaydips) - parseInt(lpgltswyselitervalue) + parseInt(previousdaydipslist.LPG_LTS_PreviousDayDIPS)} id='LPG_LTS_VarainceDIPS' /></td>
            </tr>
            <tr>
              <td colSpan='3'></td>
              <th style={{ textAlign: "center", backgroundColor: 'grey' }} ><b>Totals</b></th>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(ulpwyselitervalue) + parseInt(PLUS_WyseLiterValue) + parseInt(DIS_WyseLiterValue) + parseInt(PRE95_WyseLiterValue) + parseInt(PRE98_WyseLiterValue) + parseInt(E85_WyseLiterValue) + parseInt(LPG_LTS_WyseLiterValue)} readOnly={true} id='Total_WyseLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(ULP_WyseDollarValue) + parseInt(PLUS_WyseDollarValue) + parseInt(DIS_WyseDollarValue) + parseInt(PRE95_WyseDollarValue) + parseInt(PRE98_WyseDollarValue) + parseInt(E85_WyseDollarValue) + parseInt(LPG_LTS_WyseDollarValue)} readOnly={true} id='Total_WyseDollarValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(ulpposlitervalue) + parseInt(PLUS_POSLiterValue) + parseInt(DIS_POSLiterValue) + parseInt(PRE95_POSLiterValue) + parseInt(PRE98_POSLiterValue) + parseInt(E85_POSLiterValue) + parseInt(LPG_LTS_POSLiterValue)} readOnly={true} id='Total_POSLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(ULP_PosDollarValue) + parseInt(PLUS_PosDollarValue) + parseInt(DIS_PosDollarValue) + parseInt(PRE95_PosDollarValue) + parseInt(PRE98_PosDollarValue) + parseInt(E85_PosDollarValue) + parseInt(LPG_LTS_PosDollarValue)} readOnly={true} id='Total_PosDollarValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(ulpvarinaceliter) + parseInt(plusvarianceliter) + parseInt(disvarianceliter) + parseInt(pre95varianceliter) + parseInt(pre98varianceliter) + parseInt(e85varianceliter) + parseInt(lpgltsvarinaceliter)} readOnly={true} id='Total_VarainceLiterValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(parseInt(ULP_PosDollarValue)-parseInt(ULP_WyseDollarValue)) + parseInt(parseInt(PLUS_PosDollarValue) - parseInt(PLUS_WyseDollarValue)) + parseInt(parseInt(DIS_PosDollarValue) - parseInt(DIS_WyseDollarValue)) + parseInt(parseInt(PRE95_PosDollarValue) - parseInt(PRE95_WyseDollarValue)) + parseInt(parseInt(PRE98_PosDollarValue) - parseInt(PRE98_WyseDollarValue)) + parseInt(parseInt(E85_PosDollarValue) - parseInt(E85_WyseDollarValue)) + parseInt(parseInt(LPG_LTS_PosDollarValue) - parseInt(LPG_LTS_WyseDollarValue))} readOnly={true} id='Total_VarainceDollarValue' /></td>
              <td><input style={{ width: '100px' }} type='number' value={parseInt(ulpvariancedips) + parseInt(plusvariancedips)+parseInt(disvariancedips)+parseInt(pre95variancedips)+parseInt(pre98variancedips)+parseInt(e85variancedips)+parseInt(lpgltsvariancedips)} readOnly={true} id='Total_VarainceDIPS' /></td>
            </tr>
            <tr>
              <td colSpan='11' align='center'> <button onClick={Adddetails} >Submit</button>
              </td></tr>
          </table>
        </form>
      </div>
    </div>
  );
}
export default Fuelreconsilation;
const tablestyle = {
  border: "2px solid rgb(24, 94, 132)",
  background: "rgb(255, 255, 25)",
}
