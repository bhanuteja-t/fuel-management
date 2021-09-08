import React, { useEffect, useState, useRef } from 'react';
import {
  Divider,
  Header,
  Segment,
  Dropdown,
  Select,
} from 'semantic-ui-react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getepaytotal, getsiteorsupplier, getworkersheetforSA } from '../../Apicalls';
toast.configure();
let FinalTotalValue = 0;
function DaySheetList() {
  const [users, setUsers] = useState([]);
  const [totals, setTotals] = useState([]);
  const [date, setDate] = useState([]);
  const [individualsheet, setIndividualsheet] = useState([]);
  const [epay, setEpay] = useState({});
  const [apiurl,setApiUrl] = useState('1');
  const [hidefilter, setHidefilter] = useState({
    valuetodisplay: ''
  });
  const [filter, setFilter] = useState({
    site: '',
    Date: '',
    ToDate: '',
    Category: ''
  });
  const [startDate, setstartdate] = useState({
    datecheck: '',
    localsite: ''
  });
  const [ activepage,setActivePage] = useState(1);
  const [ disabled,setdisabled] = useState(false);
  const [supplierlist, setSupplierlist] = useState({
    listofsuppliers: [],
    sitelist: []
})
const { sitelist } = supplierlist  
  const updateSearch = (e, data) => {
    setFilter({ ...filter, site: `site=${data.value}` });
    setstartdate({ ...startDate, localsite: data.value })
    setActivePage(1);
    setApiUrl(1);
  };
  const updateStartDate = (e, data) => {
    setFilter({ ...filter, Date: `&Date=${data.value}` });
    setstartdate({ ...startDate, datecheck: data.value })
    setActivePage(1);
    setApiUrl(1);
  };
  const updateToDate = (e, data) => {
    setFilter({ ...filter, ToDate: `&ToDate=${data.value}` });
    setstartdate({ ...startDate, datecheck: data.value })
    setActivePage(1);
    setApiUrl(1);
  };
  const updateCategory = (e, data) => {
    setFilter({ ...filter, Category: `&Category=${data.value}` });
    setstartdate({ ...startDate, datecheck: data.value })
    setActivePage(1);
    setApiUrl(1);
  };
  const preload = () => {
    getepaytotal().then((values) => {
      let epayvalue = values.data;
      if (values.error) {
      } else {
        setEpay(
          epayvalue.map((ee) => {
            return {
              Paper_TotalTouchEPay: ee.Paper_TotalTouchEPay,
              paper_creditSaleTotal: ee.paper_creditSaleTotal,
              createdOn: ee.createdOn,
              _id: ee._id,
              B_FwdFuel: ee.B_FwdFuel,
              TotalFuel: ee.TotalFuel,
              B_FwdComm: ee.B_FwdComm,
              Banking: ee.Banking,
              site: ee.site,
              assigntomanager: ee.assigntomanager,
              ReferenceNo: ee.ReferenceNo,
              FuelComm: ee.FuelComm,
              Shop_Rent: ee.Shop_Rent,
              insurance: ee.insurance,
              Others: ee.others
            }
          })
        );
      }
    });
  }
  const preload1 = (filter) => {
    getworkersheetforSA(filter).then((data) => {
      FinalTotalValue = data.data.FinalTotal;
      if (data.error) {
      } else {
        setUsers(data.data.worksheets);
        setTotals(data.data.totals);
        setDate(data.data.dateList);
        setIndividualsheet(data.data.rowWiseTotalMap);
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
  useEffect(() => {
    preload();
    preload1(filter);
  }, [filter]);
  const Selectsite = sitelist.map((obj) => ({
    key: obj.name,
    text: obj.name,
    value: obj.name 
}));
  const Selectcategory = [
    { key: 'Motor Pass', value: 'Motor Pass', text: 'Motor Pass' },
    { key: 'Motor Charge', value: 'Motor Charge', text: 'Motor Charge' },
    { key: 'Fleet', value: 'Fleet', text: 'Fleet' },
    { key: 'Eftpos', value: 'Eftpos', text: 'Eftpos' },
    { key: 'Manual Eftpos', value: 'Manual Eftpos', text: 'Manual Eftpos' },
    { key: 'Amex', value: 'Amex', text: 'Amex' },
    { key: 'Diners', value: 'Diners', text: 'Diners' },
    { key: 'United Cards', value: 'United Cards', text: 'United Cards' },
    { key: 'Man United Cards', value: 'Man United Cards', text: 'Man United Cards' },
    { key: 'Menulog', value: 'Menulog', text: 'Menulog' },
    { key: 'Uber Eats', value: 'Uber Eats', text: 'Uber Eats' },
    { key: 'Inabilities', value: 'Inabilities', text: 'Inabilities' },
    { key: 'Drive Offs', value: 'Drive Offs', text: 'Drive Offs' },
    { key: 'Gunnebo Safe Amt', value: 'Gunnebo Safe Amt', text: 'Gunnebo Safe Amt' },
    { key: 'Manual Final Drop', value: 'Manual Final Drop', text: 'Manual Final Drop' },
    { key: 'Net Sales', value: 'Net Sales', text: 'Net Sales' },
    { key: 'Shop Sales', value: 'Shop Sales', text: 'Shop Sales' },
    { key: 'Surcharge', value: 'Surcharge', text: 'Surcharge' },
    { key: 'Touch Epay 1(-)', value: 'Touch Epay 1(-)', text: 'Touch Epay 1(-)' },
    { key: 'Touch Epay 2(-)', value: 'Touch Epay 2(-)', text: 'Touch Epay 2(-)' },
    { key: 'BBQ Gas', value: 'BBQ Gas', text: 'BBQ Gas' },
    { key: 'Pie Face', value: 'Pie Face', text: 'Pie Face' },
    { key: 'Credit/Refunds', value: 'Credit/Refunds', text: 'Credit/Refunds' },
    { key: 'Cleared Items', value: 'Cleared Items', text: 'Cleared Items' },
    { key: 'Cancels', value: 'Cancels', text: 'Cancels' },
    { key: 'Customer Count', value: 'Customer Count', text: 'Customer Count' },
  ];
  const linkToPrint = () => {
    return (
      <button >Print</button>
    )
  }
  const componentRef = useRef();
  const pdfgenerator = () => {
    const input = document.getElementById("pdf-element");
    const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
    pdf.html(input, { x: 12, y: 36 ,  html2canvas: { scale: 0.37}}).then(() => {
    pdf.save("DaySheet.pdf");
    });
  }
  var pos1shift1 = [];
  var pos1shift2 = [];
  var pos1shift3 = [];
  var pos2shift1 = [];
  var pos2shift2 = [];
  var pos2shift3 = [];
  var selectedpaperworklist = [];
  if (users) {
    for (let i = 0; i < users.length; i = i + 1) {
      if (users[i].createdOn === startDate.datecheck && users[i].site === startDate.localsite && users[i].POS === "POS1" && users[i].SelectShift === 1) {
        pos1shift1 = Object.assign([], users[i]);
      }
      if (users[i].createdOn === startDate.datecheck && users[i].site === startDate.localsite && users[i].POS === "POS1" && users[i].SelectShift === 2) {
        pos1shift2 = Object.assign([], users[i]);
      }
      if (users[i].createdOn === startDate.datecheck && users[i].site === startDate.localsite && users[i].POS === "POS1" && users[i].SelectShift === 3) {
        pos1shift3 = Object.assign([], users[i]);
      }
      if (users[i].createdOn === startDate.datecheck && users[i].site === startDate.localsite && users[i].POS === "POS2" && users[i].SelectShift === 1) {
        pos2shift1 = Object.assign([], users[i]);
      }
      if (users[i].createdOn === startDate.datecheck && users[i].site === startDate.localsite && users[i].POS === "POS2" && users[i].SelectShift === 2) {
        pos2shift2 = Object.assign([], users[i]);
      }
      if (users[i].createdOn === startDate.datecheck && users[i].site === startDate.localsite && users[i].POS === "POS2" && users[i].SelectShift === 3) {
        pos2shift3 = Object.assign([], users[i]);
      }
      for (let i = 0; i < epay.length; i = i + 1) {
        if (epay[i].createdOn === startDate.datecheck && epay[i].site === startDate.localsite) {
          selectedpaperworklist = Object.assign([], epay[i]);
        }
        else {}
      }
    }
  }
  function showTable(table) {
    setHidefilter(table);
    if (table === 't1') {
      document.getElementById('t1').style = "display: none";
      document.getElementById('t2').style = "display: block";
    }
    else if (table === 't2') {
      document.getElementById('t1').style = "display: block";
      document.getElementById('t2').style = "display: none";
    }
  }
  return (
    <div ref={componentRef}>
      <Segment>
        <Header as="h2" color="orange" textAlign="center">
          DaySheet Management
          <button  className="ignoreprintpart" style={{ marginLeft: '25px' }} onClick={() => showTable('t1')} >Daysheet</button>
          <button  className="ignoreprintpart" style={{ marginLeft: '25px' }} onClick={() => showTable('t2')} >Individual Sheet</button>
        </Header>
        <Styledivider />
        <Stylediv className="ignoreprintpart">
          <Styleselect
            placeholder="Select Site"
            options={Selectsite}
            onChange={(e, data) => updateSearch(e, data)}
          />
          <Stylelabel>Date:</Stylelabel>
          <Styleinput
            onClick={() => setdisabled(false)}
            onChange={(data, e) => updateStartDate(e, data.target)}
            type="date"
          ></Styleinput>
          {hidefilter === 't2' && (
            <div>
              <Stylelabel>To Date:</Stylelabel>
              <Styleinput
                onClick={() => setdisabled(false)}
                onChange={(data, e) => updateToDate(e, data.target)}
                type="date"
              ></Styleinput>
              <Dropdown
                placeholder='Select Category'
                search
                selection
                onChange={(e, data) => updateCategory(e, data)}
                options={Selectcategory}
              />
            </div>
          )}
        </Stylediv>
        <div id="pdf-element">
          <form >
            <table border="1" id="t1" style={{
              marginLeft: '330px',
              width:'36%',
              display: 'none',
              border: "2px solid rgb(24, 94, 132)",
              borderSpacing: '2px',
            }}>
              <tr align="center">
                <th style={{ padding: '0 50px' }}>Dates</th>
                <th style={{ padding: '0 50px' }}>Category</th>
                <th style={{ padding: '0 50px' }}>Total</th>
              </tr>
              {individualsheet.map((val) => {
                return (
                  <>
                    <tr style={{ textAlign: 'center' }}>
                      <td>{val.eachDate}</td>
                      <td>{val.Category}</td>
                      <td>{val.rowWiseTotal}</td>
                    </tr>
                  </>
                );
              })}
              <tr style={{ textAlign: 'center' }} >
                <td colSpan='2'><b>Total</b></td>
                {FinalTotalValue && FinalTotalValue > 0 ? (
                <td>{FinalTotalValue}</td>
                ): <td></td>}
              </tr>
            </table>
            <table border="1" id="t2" cellPadding='0px' style={tablestyle}>
              <tr>
                <th>Date :{startDate.datecheck}</th>
                <th style={{ textAlign: "center" }} colSpan="6"><b>UNITED WAGGA WAGGA -2235</b></th>
                <th></th>
                <th style={{ textAlign: "center", padding: '0 50px' }}>Day:</th>
                <th style={{ textAlign: "center", padding: '0 60px' }}></th>
              </tr>
              <tr align="center">
                <th>POS</th>
                <th colSpan='3'>POS1</th>
                <th colSpan='3'>POS2</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <tr align="center">
                <th style={{ padding: '0 50px' }}>SHIFTS</th>
                <th style={{ padding: '0 40px' }}>Shift 1</th>
                <th style={{ padding: '0 40px' }}>Shift 2</th>
                <th style={{ padding: '0 40px' }}>Shift 3</th>
                <th style={{ padding: '0 40px' }}>Shift 1</th>
                <th style={{ padding: '0 40px' }}>Shift 2</th>
                <th style={{ padding: '0 40px' }}>Shift 3</th>
                <th style={{ padding: '0 40px' }}>Total</th>
                <td>{ }</td>
              </tr>
              <tr align="center">
                <th>Operator Name</th>
                <td><Link to={`/Editworkersheet/${pos1shift1._id}`}>{pos1shift1.OperatorName}</Link></td>
                <td><Link to={`/Editworkersheet/${pos1shift2._id}`}>{pos1shift2.OperatorName}</Link></td>
                <td><Link to={`/Editworkersheet/${pos1shift3._id}`}>{pos1shift3.OperatorName}</Link></td>
                <td><Link to={`/Editworkersheet/${pos2shift1._id}`}>{pos2shift1.OperatorName}</Link></td>
                <td><Link to={`/Editworkersheet/${pos2shift2._id}`}>{pos2shift2.OperatorName}</Link></td>
                <td><Link to={`/Editworkersheet/${pos2shift3._id}`}>{pos2shift3.OperatorName}</Link></td>
                <td></td>
                <th colSpan='2'>Paper Work</th>
              </tr>
              <tr align="center">
                <td>Motor Pass</td>
                <td padding='6px'>{pos1shift1.MotorPass}</td>
                <td>{pos1shift2.MotorPass}</td>
                <td>{pos1shift3.MotorPass}</td>
                <td>{pos2shift1.MotorPass}</td>
                <td>{pos2shift2.MotorPass}</td>
                <td>{pos2shift3.MotorPass}</td>
                <td>{totals.MotorPassTotal}</td>
                <td>B/Fwd Fuel </td>
                <td>{selectedpaperworklist.B_FwdFuel} </td>
              </tr>
              <tr align="center">
                <td>Motor Charge</td>
                <td>{pos1shift1.MotorChange}</td>
                <td>{pos1shift2.MotorChange}</td>
                <td>{pos1shift3.MotorChange}</td>
                <td>{pos2shift1.MotorChange}</td>
                <td>{pos2shift2.MotorChange}</td>
                <td>{pos2shift3.MotorChange}</td>
                <td>{totals.MotorChangeTotal}</td>
                <td>Total Fuel </td>
                <td>{selectedpaperworklist.TotalFuel} </td>
              </tr>
              <tr align="center">
                <td>Fleet</td>
                <td>{pos1shift1.Fleet}</td>
                <td>{pos1shift2.Fleet}</td>
                <td>{pos1shift3.Fleet}</td>
                <td>{pos2shift1.Fleet}</td>
                <td>{pos2shift2.Fleet}</td>
                <td>{pos2shift3.Fleet}</td>
                <td>{totals.FleetTotal}</td>
                <td>Touch E-Pay </td>
                <td>{selectedpaperworklist.Paper_TotalTouchEPay} </td>
              </tr>
              <tr align="center">
                <td>Eftpos</td>
                <td>{pos1shift1.Eftpos}</td>
                <td>{pos1shift2.Eftpos}</td>
                <td>{pos1shift3.Eftpos}</td>
                <td>{pos2shift1.Eftpos}</td>
                <td>{pos2shift2.Eftpos}</td>
                <td>{pos2shift3.Eftpos}</td>
                <td>{totals.EftposTotal}</td>
                <td>Credit Sales</td>
                <td>{selectedpaperworklist.paper_creditSaleTotal}</td>
              </tr>
              <tr align="center">
                <td>Manual Eftpos</td>
                <td>{pos1shift1.ManualEftpos}</td>
                <td>{pos1shift2.ManualEftpos}</td>
                <td>{pos1shift3.ManualEftpos}</td>
                <td>{pos2shift1.ManualEftpos}</td>
                <td>{pos2shift2.ManualEftpos}</td>
                <td>{pos2shift3.ManualEftpos}</td>
                <td>{totals.ManualEftposTotal}</td>
                <td className="abc">B/Fwd Comm</td>
                <td>{selectedpaperworklist.B_FwdComm} </td>
              </tr>
              <tr align="center">
                <td>Amex</td>
                <td>{pos1shift1.Amex}</td>
                <td>{pos1shift2.Amex}</td>
                <td>{pos1shift3.Amex}</td>
                <td>{pos2shift1.Amex}</td>
                <td>{pos2shift2.Amex}</td>
                <td>{pos2shift3.Amex}</td>
                <td>{totals.AmexTotal}</td>
                <td>Fuel Comm</td>
                <td>{selectedpaperworklist.FuelComm} </td>
              </tr>
              <tr align="center">
                <td>Diners</td>
                <td>{pos1shift1.Diners}</td>
                <td>{pos1shift2.Diners}</td>
                <td>{pos1shift3.Diners}</td>
                <td>{pos2shift1.Diners}</td>
                <td>{pos2shift2.Diners}</td>
                <td>{pos2shift3.Diners}</td>
                <td>{totals.DinersTotal}</td>
                <td>Shop Rent</td>
                <td> {selectedpaperworklist.Shop_Rent}</td>
              </tr>
              <tr align="center">
                <td>United Cards</td>
                <td>{pos1shift1.UnitedCards}</td>
                <td>{pos1shift2.UnitedCards}</td>
                <td>{pos1shift3.UnitedCards}</td>
                <td>{pos2shift1.UnitedCards}</td>
                <td>{pos2shift2.UnitedCards}</td>
                <td>{pos2shift3.UnitedCards}</td>
                <td>{totals.UnitedCardsTotal}</td>
                <td>Insurance</td>
                <td>{selectedpaperworklist.insurance} </td>
              </tr>
              <tr align="center">
                <td>Man United Cards</td>
                <td>{pos1shift1.ManUnitedCard}</td>
                <td>{pos1shift2.ManUnitedCard}</td>
                <td>{pos1shift3.ManUnitedCard}</td>
                <td>{pos2shift1.ManUnitedCard}</td>
                <td>{pos2shift2.ManUnitedCard}</td>
                <td>{pos2shift3.ManUnitedCard}</td>
                <td>{totals.ManUnitedCardTotal}</td>
                <td>Others</td>
                <td> {selectedpaperworklist.Others}</td>
              </tr>
              <tr align='center'>
                <td>Menulog</td>
                <td>{pos1shift1.MenuLog}</td>
                <td>{pos1shift2.MenuLog}</td>
                <td>{pos1shift3.MenuLog}</td>
                <td>{pos2shift1.MenuLog}</td>
                <td>{pos2shift2.MenuLog}</td>
                <td>{pos2shift3.MenuLog}</td>
                <td>{totals.MenuLogTotal}</td>
                <td>Banking</td>
                <td>{selectedpaperworklist.Banking}</td>
              </tr>
              <tr align='center'>
                <td>Uber Eats</td>
                <td>{pos1shift1.UberEats}</td>
                <td>{pos1shift2.UberEats}</td>
                <td>{pos1shift3.UberEats}</td>
                <td>{pos2shift1.UberEats}</td>
                <td>{pos2shift2.UberEats}</td>
                <td>{pos2shift3.UberEats}</td>
                <td>{totals.UberEatsTotal}</td>
                <td>Reference No</td>
                <td>{selectedpaperworklist.ReferenceNo} </td>
              </tr >
              <tr align='center'>
                <td>Inabilities</td>
                <td>{pos1shift1.Inabilities}</td>
                <td>{pos1shift2.Inabilities}</td>
                <td>{pos1shift3.Inabilities}</td>
                <td>{pos2shift1.Inabilities}</td>
                <td>{pos2shift2.Inabilities}</td>
                <td>{pos2shift3.Inabilities}</td>
                <td>{totals.InabilitiesTotal}</td>
              </tr>
              <tr align='center'>
                <td>Drive offs</td>
                <td>{pos1shift1.DriveOffs}</td>
                <td>{pos1shift2.DriveOffs}</td>
                <td>{pos1shift3.DriveOffs}</td>
                <td>{pos2shift1.DriveOffs}</td>
                <td>{pos2shift2.DriveOffs}</td>
                <td>{pos2shift3.DriveOffs}</td>
                <td>{totals.DriveOffsTotal}</td>
              </tr>
              <tr align='center'>
                <td>Gunnebo Safe Amt</td>
                <td>{pos1shift1.GunneboSafeAmt}</td>
                <td>{pos1shift2.GunneboSafeAmt}</td>
                <td>{pos1shift3.GunneboSafeAmt}</td>
                <td>{pos2shift1.GunneboSafeAmt}</td>
                <td>{pos2shift2.GunneboSafeAmt}</td>
                <td>{pos2shift3.GunneboSafeAmt}</td>
                <td>{totals.GunneboSafeAmtTotal}</td>
              </tr>
              <tr align='center'>
                <td>Manual final drop</td>
                <td>{pos1shift1.ManualFinalDrop}</td>
                <td>{pos1shift2.ManualFinalDrop}</td>
                <td>{pos1shift3.ManualFinalDrop}</td>
                <td>{pos2shift1.ManualFinalDrop}</td>
                <td>{pos2shift2.ManualFinalDrop}</td>
                <td>{pos2shift3.ManualFinalDrop}</td>
                <td>{totals.ManualFinalDropTotal}</td>
              </tr>
              <tr align='center'>
                <td><b>Total From Above</b></td>
                <td>{pos1shift1.totalFromAbove}</td>
                <td>{pos1shift2.totalFromAbove}</td>
                <td>{pos1shift3.totalFromAbove}</td>
                <td>{pos2shift1.totalFromAbove}</td>
                <td>{pos2shift2.totalFromAbove}</td>
                <td>{pos2shift3.totalFromAbove}</td>
                <td>{totals.totalFromAboveTotal}</td>
              </tr>
              <tr align='center'>
                <td>Net Sales</td>
                <td>{pos1shift1.NetSales}</td>
                <td>{pos1shift2.NetSales}</td>
                <td>{pos1shift3.NetSales}</td>
                <td>{pos2shift1.NetSales}</td>
                <td>{pos2shift2.NetSales}</td>
                <td>{pos2shift3.NetSales}</td>
                <td>{totals.NetSalesTotal}</td>
              </tr>
              <tr align='center'>
                <td>Differences</td>
                <td>{pos1shift1.DifferenceAmount}</td>
                <td>{pos1shift2.DifferenceAmount}</td>
                <td>{pos1shift3.DifferenceAmount}</td>
                <td>{pos2shift1.DifferenceAmount}</td>
                <td>{pos2shift2.DifferenceAmount}</td>
                <td>{pos2shift3.DifferenceAmount}</td>
                <td>{totals.DifferenceAmountTotal}</td>
              </tr>
              <tr align='center'>
                <td>Shop Sales</td>
                <td>{pos1shift1.ShopSales}</td>
                <td>{pos1shift2.ShopSales}</td>
                <td>{pos1shift3.ShopSales}</td>
                <td>{pos2shift1.ShopSales}</td>
                <td>{pos2shift2.ShopSales}</td>
                <td>{pos2shift3.ShopSales}</td>
                <td>{totals.ShopSalesTotal}</td>
              </tr>
              <tr align='center'>
                <td>Surcharge</td>
                <td>{pos1shift1.Surcharge}</td>
                <td>{pos1shift2.Surcharge}</td>
                <td>{pos1shift3.Surcharge}</td>
                <td>{pos2shift1.Surcharge}</td>
                <td>{pos2shift2.Surcharge}</td>
                <td>{pos2shift3.Surcharge}</td>
                <td>{totals.SurchargeTotal}</td>
              </tr>
              <tr align='center'>
                <td>Touch Epay 1(-)</td>
                <td>{pos1shift1.TouchEPAY1}</td>
                <td>{pos1shift2.TouchEPAY1}</td>
                <td>{pos1shift3.TouchEPAY1}</td>
                <td>{pos2shift1.TouchEPAY1}</td>
                <td>{pos2shift2.TouchEPAY1}</td>
                <td>{pos2shift3.TouchEPAY1}</td>
                <td>{totals.TouchEPAY1Total}</td>
              </tr>
              <tr align='center'>
                <td>Touch Epay 2(-)</td>
                <td>{pos1shift1.TouchEPAY2}</td>
                <td>{pos1shift2.TouchEPAY2}</td>
                <td>{pos1shift3.TouchEPAY2}</td>
                <td>{pos2shift1.TouchEPAY2}</td>
                <td>{pos2shift2.TouchEPAY2}</td>
                <td>{pos2shift3.TouchEPAY2}</td>
                <td>{totals.TouchEPAY2Total}</td>
              </tr>
              <tr align='center'>
                <td>BBQ Gas</td>
                <td>{pos1shift1.BBQ}</td>
                <td>{pos1shift2.BBQ}</td>
                <td>{pos1shift3.BBQ}</td>
                <td>{pos2shift1.BBQ}</td>
                <td>{pos2shift2.BBQ}</td>
                <td>{pos2shift3.BBQ}</td>
                <td>{totals.BBQTotal}</td>
              </tr>
              <tr align='center'>
                <td>NET SHOP</td>
                <td>{pos1shift1.NetShopTotal}</td>
                <td>{pos1shift2.NetShopTotal}</td>
                <td>{pos1shift3.NetShopTotal}</td>
                <td>{pos2shift1.NetShopTotal}</td>
                <td>{pos2shift2.NetShopTotal}</td>
                <td>{pos2shift3.NetShopTotal}</td>
                <td>{totals.NetShopAmountTotal}</td>
              </tr>
              <tr align='center'>
                <td>Pie Face</td>
                <td>{pos1shift1.PieFace}</td>
                <td>{pos1shift2.PieFace}</td>
                <td>{pos1shift3.PieFace}</td>
                <td>{pos2shift1.PieFace}</td>
                <td>{pos2shift2.PieFace}</td>
                <td>{pos2shift3.PieFace}</td>
                <td>{totals.PieFaceTotal}</td>
              </tr>
              <tr align='center'>
                <td>Credit/Refunds</td>
                <td>{pos1shift1.Refunds}</td>
                <td>{pos1shift2.Refunds}</td>
                <td>{pos1shift3.Refunds}</td>
                <td>{pos2shift1.Refunds}</td>
                <td>{pos2shift2.Refunds}</td>
                <td>{pos2shift3.Refunds}</td>
                <td>{totals.RefundsTotal}</td>
              </tr>
              <tr align='center'>
                <td>Cleared Items</td>
                <td>{pos1shift1.ClearedItems}</td>
                <td>{pos1shift2.ClearedItems}</td>
                <td>{pos1shift3.ClearedItems}</td>
                <td>{pos2shift1.ClearedItems}</td>
                <td>{pos2shift2.ClearedItems}</td>
                <td>{pos2shift3.ClearedItems}</td>
                <td>{totals.ClearedItemsTotal}</td>
              </tr>
              <tr align='center'>
                <td>Cancels</td>
                <td>{pos1shift1.Cancels}</td>
                <td>{pos1shift2.Cancels}</td>
                <td>{pos1shift3.Cancels}</td>
                <td>{pos2shift1.Cancels}</td>
                <td>{pos2shift2.Cancels}</td>
                <td>{pos2shift3.Cancels}</td>
                <td>{totals.CancelsTotal}</td>
              </tr>
              <tr align='center'>
                <td>Customer Count</td>
                <td>{pos1shift1.CustomerCount}</td>
                <td>{pos1shift2.CustomerCount}</td>
                <td>{pos1shift3.CustomerCount}</td>
                <td>{pos2shift1.CustomerCount}</td>
                <td>{pos2shift2.CustomerCount}</td>
                <td>{pos2shift3.CustomerCount}</td>
                <td>{totals.CustomerCountTotal}</td>
              </tr>
            </table>
          </form>
        </div>
      </Segment>
      <div id="footerpart" className="ignoreprintpart" style={{ marginLeft: '1000px' }}>
          <ReactToPrint pageStyle={pageStyle} trigger={linkToPrint} content={() => componentRef.current} />&nbsp;
          <button onClick={pdfgenerator}>Download</button>
        </div>
    </div>
  );
}
export default DaySheetList;
const pageStyle = `
@page {margin-left: 13mm ; border: 0.1px solid rgba(34, 36, 38, 0.5); } 
@media print { 
  .ignoreprintpart { visibility: hidden };
  body { -webkit-print-color-adjust: exact; }
} `
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
const Styleselect = styled(Select)`
  &&&&& {
    margin-right: 2em;
    margin-left: 2em;
  }
`;
const tablestyle = {
  marginTop: '10px',
  borderSpacing: '2px',
  overflow: "scroll",
  border: "2px solid rgb(24, 94, 132)",
  background: "rgb(255, 255, 25)",
}
