import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import {getepaytotal, getworkersheetformanager, paperworkpost } from '../../Apicalls';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { isAuthenticated } from '../../Auth';
var currentDate = moment().format("DD/MM/YYYY");
var currentDate1 = moment().format("YYYY-MM-DD");
function Daysheetpage() {
  const [users, setUsers] = useState([]);
  const [epay, setEpay] = useState({});
  const currentuser = isAuthenticated();
const uid = currentuser.data.user.userid;
  const [paperwork, setPaperwork] = useState({
    B_FwdFuel: "",
    TotalFuel: "",
    CreditSales: "",
    B_FwdComm: "",
    Banking: "",
    ReferenceNo: "",
    FuelComm:"$465.87",
    Shop_Rent:"$756.74",
    insurance:"$55.30",
    others:"$10.00"
  });
  const { B_FwdFuel, TotalFuel, B_FwdComm, Banking, ReferenceNo,} = paperwork;
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
              assigntomanager: ee.assigntomanager,
              _id:ee._id,
              site: ee.site
            }
          })
        );
      }
    });
    getworkersheetformanager().then((data) => {
      let user = data.data;
      if (data.error) {
      } else {
        setUsers(
          user.map((d) => {
            return {
              _id: d._id,
              OperatorName: d.OperatorName,
              MotorPass: d.MotorPass,
              MotorChange: d.MotorChange,
              Fleet: d.Fleet,
              Eftpos: d.Eftpos,
              ManualEftpos: d.ManualEftpos,
              Amex: d.Amex,
              Diners: d.Diners,
              UnitedCards: d.UnitedCards,
              ManUnitedCard: d.ManUnitedCard,
              MenuLog: d.MenuLog,
              UberEats: d.UberEats,
              Inabilities: d.Inabilities,
              DriveOffs: d.DriveOffs,
              GunneboSafeAmt: d.GunneboSafeAmt,
              ManualFinalDrop: d.ManualFinalDrop,
              NetSales: d.NetSales,
              Difference: d.DifferenceAmount,
              ShopSales: d.ShopSales,
              Surcharge: d.Surcharge,
              TouchEPAY1: d.TouchEPAY1,
              TouchEPAY2: d.TouchEPAY2,
              NetShop: d.NetShopTotal,
              BBQ: d.BBQ,
              PieFace: d.PieFace,
              Refunds: d.Refunds,
              assignto: d.assignto,
              ClearedItems: d.ClearedItems,
              Cancels: d.Cancels,
              CustomerCount: d.CustomerCount,
              SelectShift: d.SelectShift,
              POS: d.POS,
              site: d.site,
              assigntomanager: d.assigntomanager,
              createdOn: d.createdOn,
              totalFromAbove: d.totalFromAbove,
              TouchEPayTotal: d.TouchEPayTotal,
            }
          })
        );
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);
  const history = useHistory();
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setPaperwork({ ...paperwork, [name]: value });
  }
  const submitdone = (event) => {
    event.preventDefault();
    paperworkpost(Totalepay._id,paperwork).then((data) => {
      if (data.error) {
        setPaperwork({ ...paperwork, error: data.error });
      } else {
        setPaperwork({
          ...paperwork,
          B_FwdFuel: data.B_FwdFuel,
          TotalFuel: data.TotalFuel,
          B_FwdComm: data.B_FwdComm,
          CreditSales: data.CreditSales,
          Banking: data.Banking,
          ReferenceNo: data.ReferenceNo,
          Shop_Rent: data.Shop_Rent,
          insurance: data.insurance,
          others: data.others,
          FuelComm: data.FuelComm
        });
      }
      history.push("/dashboard");
    });
  };
  var showday = new Date();
  var displayday = showday.getDay();
  var pos1shift1 = [];
  var pos1shift2 = [];
  var pos1shift3 = [];
  var pos2shift1 = [];
  var pos2shift2 = [];
  var pos2shift3 = [];
  for (let i = 0;i < users.length; i = i + 1) {
    if ( users[i].assigntomanager === uid && users[i].createdOn === currentDate1 && users[i].POS === "POS1" && users[i].SelectShift === 1) {
      pos1shift1 = Object.assign([], users[i]);
    }     
    if ( users[i].assigntomanager === uid && users[i].createdOn === currentDate1 && users[i].POS === "POS1" && users[i].SelectShift === 2) {
      pos1shift2 = Object.assign([], users[i]);
    }
    if ( users[i].assigntomanager === uid && users[i].createdOn === currentDate1 && users[i].POS === "POS1" && users[i].SelectShift === 3) {
      pos1shift3 = Object.assign([], users[i]);
    }
    if ( users[i].assigntomanager === uid && users[i].createdOn === currentDate1 && users[i].POS === "POS2" && users[i].SelectShift === 1) {
      pos2shift1 = Object.assign([], users[i]);
    }
    if ( users[i].assigntomanager === uid && users[i].createdOn === currentDate1 && users[i].POS === "POS2" && users[i].SelectShift === 2) {
      pos2shift2 = Object.assign([], users[i]);
    }
    if ( users[i].assigntomanager === uid && users[i].createdOn === currentDate1 && users[i].POS === "POS2" && users[i].SelectShift === 3) {
      pos2shift3 = Object.assign([], users[i]);
    }
  }
  var Totalepay = [];
  for (let i = 0; i < epay.length; i = i + 1) {
    if (epay[i].createdOn === currentDate1 && epay[i].assigntomanager === uid ) {
      Totalepay = Object.assign([], epay[i]);
    }
  }
  return (
    <React.Fragment>
      <form style={{ marginBottom: '20px' }}>
        <table border="1" cellPadding='0px' style={tablestyle}>
          <tr>
            <th>Date : {currentDate}</th>
            <th style={{ textAlign: "center" }} colSpan="6"><b>UNITED WAGGA WAGGA -2235</b></th>
            <th style={{ textAlign: "center", padding: '0 50px' }}>Day:</th>
            <th style={{ textAlign: "center" }}>{displayday}</th>
          </tr>
          <tr align="center">
            <th>POS</th>
            <th colSpan='3'>POS1</th>
            <th colSpan='3'>POS2</th>
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
            <td>B/Fwd Fuel </td>
            <td>
              <input type='number' value={B_FwdFuel} onChange={handleChange("B_FwdFuel")}></input>
            </td>
          </tr>
          <tr align="center">
            <td>Motor Charge</td>
            <td>{pos1shift1.MotorChange}</td>
            <td>{pos1shift2.MotorChange}</td>
            <td>{pos1shift3.MotorChange}</td>
            <td>{pos2shift1.MotorChange}</td>
            <td>{pos2shift2.MotorChange}</td>
            <td>{pos2shift3.MotorChange}</td>
            <td>Total Fuel </td>
            <td><input type='number' value={TotalFuel} onChange={handleChange("TotalFuel")}></input></td>
          </tr>
          <tr align="center">
            <td>Fleet</td>
            <td>{pos1shift1.Fleet}</td>
            <td>{pos1shift2.Fleet}</td>
            <td>{pos1shift3.Fleet}</td>
            <td>{pos2shift1.Fleet}</td>
            <td>{pos2shift2.Fleet}</td>
            <td>{pos2shift3.Fleet}</td>
            <td>Touch E-Pay </td>
            <td>{Totalepay.Paper_TotalTouchEPay}</td>
          </tr>
          <tr align="center">
            <td>Eftpos</td>
            <td>{pos1shift1.Eftpos}</td>
            <td>{pos1shift2.Eftpos}</td>
            <td>{pos1shift3.Eftpos}</td>
            <td>{pos2shift1.Eftpos}</td>
            <td>{pos2shift2.Eftpos}</td>
            <td>{pos2shift3.Eftpos}</td>
            <td>Credit Sales</td>
            <td>{Totalepay.paper_creditSaleTotal}</td>
          </tr>
          <tr align="center">
            <td>Manual Eftpos</td>
            <td>{pos1shift1.ManualEftpos}</td>
            <td>{pos1shift2.ManualEftpos}</td>
            <td>{pos1shift3.ManualEftpos}</td>
            <td>{pos2shift1.ManualEftpos}</td>
            <td>{pos2shift2.ManualEftpos}</td>
            <td>{pos2shift3.ManualEftpos}</td>
            <td className="abc">B/Fwd Comm</td>
            <td>
              <input type='number' value={B_FwdComm} onChange={handleChange("B_FwdComm")}></input>
            </td>
          </tr>
          <tr align="center">
            <td>Amex</td>
            <td>{pos1shift1.Amex}</td>
            <td>{pos1shift2.Amex}</td>
            <td>{pos1shift3.Amex}</td>
            <td>{pos2shift1.Amex}</td>
            <td>{pos2shift2.Amex}</td>
            <td>{pos2shift3.Amex}</td>
            <td>Fuel Comm</td>
            <td>$465.87</td>
          </tr>
          <tr align="center">
            <td>Diners</td>
            <td>{pos1shift1.Diners}</td>
            <td>{pos1shift2.Diners}</td>
            <td>{pos1shift3.Diners}</td>
            <td>{pos2shift1.Diners}</td>
            <td>{pos2shift2.Diners}</td>
            <td>{pos2shift3.Diners}</td>
            <td>Shop Rent</td>
            <td>$756.74</td>
          </tr>
          <tr align="center">
            <td>United Cards</td>
            <td>{pos1shift1.UnitedCards}</td>
            <td>{pos1shift2.UnitedCards}</td>
            <td>{pos1shift3.UnitedCards}</td>
            <td>{pos2shift1.UnitedCards}</td>
            <td>{pos2shift2.UnitedCards}</td>
            <td>{pos2shift3.UnitedCards}</td>
            <td>Insurance</td>
            <td>$55.30</td>
          </tr>
          <tr align="center">
            <td>Man United Cards</td>
            <td>{pos1shift1.ManUnitedCard}</td>
            <td>{pos1shift2.ManUnitedCard}</td>
            <td>{pos1shift3.ManUnitedCard}</td>
            <td>{pos2shift1.ManUnitedCard}</td>
            <td>{pos2shift2.ManUnitedCard}</td>
            <td>{pos2shift3.ManUnitedCard}</td>
            <td>Others</td>
            <td>$10.00</td>
          </tr>
          <tr align='center'>
            <td>Menulog</td>
            <td>{pos1shift1.MenuLog}</td>
            <td>{pos1shift2.MenuLog}</td>
            <td>{pos1shift3.MenuLog}</td>
            <td>{pos2shift1.MenuLog}</td>
            <td>{pos2shift2.MenuLog}</td>
            <td>{pos2shift3.MenuLog}</td>
            <td>Banking</td>
            <td>
              <input type='number' value={Banking} onChange={handleChange("Banking")}></input>
            </td>
          </tr>
          <tr align='center'>
            <td>Uber Eats</td>
            <td>{pos1shift1.UberEats}</td>
            <td>{pos1shift2.UberEats}</td>
            <td>{pos1shift3.UberEats}</td>
            <td>{pos2shift1.UberEats}</td>
            <td>{pos2shift2.UberEats}</td>
            <td>{pos2shift3.UberEats}</td>
            <td >Reference No</td>
            <td >
              <input type='number' value={ReferenceNo} onChange={handleChange("ReferenceNo")}></input>
            </td>
          </tr >
          <tr align='center'>
            <td>Inabilities</td>
            <td>{pos1shift1.Inabilities}</td>
            <td>{pos1shift2.Inabilities}</td>
            <td>{pos1shift3.Inabilities}</td>
            <td>{pos2shift1.Inabilities}</td>
            <td>{pos2shift2.Inabilities}</td>
            <td>{pos2shift3.Inabilities}</td>
          </tr>
          <tr align='center'>
            <td>Drive offs</td>
            <td>{pos1shift1.DriveOffs}</td>
            <td>{pos1shift2.DriveOffs}</td>
            <td>{pos1shift3.DriveOffs}</td>
            <td>{pos2shift1.DriveOffs}</td>
            <td>{pos2shift2.DriveOffs}</td>
            <td>{pos2shift3.DriveOffs}</td>
          </tr>
          <tr align='center'>
            <td>Gunnebo Safe Amt</td>
            <td>{pos1shift1.GunneboSafeAmt}</td>
            <td>{pos1shift2.GunneboSafeAmt}</td>
            <td>{pos1shift3.GunneboSafeAmt}</td>
            <td>{pos2shift1.GunneboSafeAmt}</td>
            <td>{pos2shift2.GunneboSafeAmt}</td>
            <td>{pos2shift3.GunneboSafeAmt}</td>
          </tr>
          <tr align='center'>
            <td>Manual final drop</td>
            <td>{pos1shift1.ManualFinalDrop}</td>
            <td>{pos1shift2.ManualFinalDrop}</td>
            <td>{pos1shift3.ManualFinalDrop}</td>
            <td>{pos2shift1.ManualFinalDrop}</td>
            <td>{pos2shift2.ManualFinalDrop}</td>
            <td>{pos2shift3.ManualFinalDrop}</td>
          </tr>
          <tr align='center'>
            <td><b>Total From Above</b></td>
            <td>{pos1shift1.totalFromAbove}</td>
            <td>{pos1shift2.totalFromAbove}</td>
            <td>{pos1shift3.totalFromAbove}</td>
            <td>{pos2shift1.totalFromAbove}</td>
            <td>{pos2shift2.totalFromAbove}</td>
            <td>{pos2shift3.totalFromAbove}</td>
          </tr>
          <tr align='center'>
            <td>Net Sales</td>
            <td>{pos1shift1.NetSales}</td>
            <td>{pos1shift2.NetSales}</td>
            <td>{pos1shift3.NetSales}</td>
            <td>{pos2shift1.NetSales}</td>
            <td>{pos2shift2.NetSales}</td>
            <td>{pos2shift3.NetSales}</td>
          </tr>
          <tr align='center'>
            <td>Differences</td>
            <td>{pos1shift1.Difference}</td>
            <td>{pos1shift2.Difference}</td>
            <td>{pos1shift3.Difference}</td>
            <td>{pos2shift1.Difference}</td>
            <td>{pos2shift2.Difference}</td>
            <td>{pos2shift3.Difference}</td>
          </tr>
          <tr align='center'>
            <td>Shop Sales</td>
            <td>{pos1shift1.ShopSales}</td>
            <td>{pos1shift2.ShopSales}</td>
            <td>{pos1shift3.ShopSales}</td>
            <td>{pos2shift1.ShopSales}</td>
            <td>{pos2shift2.ShopSales}</td>
            <td>{pos2shift3.ShopSales}</td>
          </tr>
          <tr align='center'>
            <td>Surcharge</td>
            <td>{pos1shift1.Surcharge}</td>
            <td>{pos1shift2.Surcharge}</td>
            <td>{pos1shift3.Surcharge}</td>
            <td>{pos2shift1.Surcharge}</td>
            <td>{pos2shift2.Surcharge}</td>
            <td>{pos2shift3.Surcharge}</td>
          </tr>
          <tr align='center'>
            <td>Touch Epay 1(-)</td>
            <td>{pos1shift1.TouchEPAY1}</td>
            <td>{pos1shift2.TouchEPAY1}</td>
            <td>{pos1shift3.TouchEPAY1}</td>
            <td>{pos2shift1.TouchEPAY1}</td>
            <td>{pos2shift2.TouchEPAY1}</td>
            <td>{pos2shift3.TouchEPAY1}</td>
          </tr>
          <tr align='center'>
            <td>Touch Epay 2(-)</td>
            <td>{pos1shift1.TouchEPAY2}</td>
            <td>{pos1shift2.TouchEPAY2}</td>
            <td>{pos1shift3.TouchEPAY2}</td>
            <td>{pos2shift1.TouchEPAY2}</td>
            <td>{pos2shift2.TouchEPAY2}</td>
            <td>{pos2shift3.TouchEPAY2}</td>
          </tr>
          <tr align='center'>
            <td>BBQ Gas</td>
            <td>{pos1shift1.BBQ}</td>
            <td>{pos1shift2.BBQ}</td>
            <td>{pos1shift3.BBQ}</td>
            <td>{pos2shift1.BBQ}</td>
            <td>{pos2shift2.BBQ}</td>
            <td>{pos2shift3.BBQ}</td>
          </tr>
          <tr align='center'>
            <td>NET SHOP</td>
            <td>{pos1shift1.NetShop}</td>
            <td>{pos1shift2.NetShop}</td>
            <td>{pos1shift3.NetShop}</td>
            <td>{pos2shift1.NetShop}</td>
            <td>{pos2shift2.NetShop}</td>
            <td>{pos2shift3.NetShop}</td>
          </tr>
          <tr align='center'>
            <td>Pie Face</td>
            <td>{pos1shift1.PieFace}</td>
            <td>{pos1shift2.PieFace}</td>
            <td>{pos1shift3.PieFace}</td>
            <td>{pos2shift1.PieFace}</td>
            <td>{pos2shift2.PieFace}</td>
            <td>{pos2shift3.PieFace}</td>
          </tr>
          <tr align='center'>
            <td>Credit/Refunds</td>
            <td>{pos1shift1.Refunds}</td>
            <td>{pos1shift2.Refunds}</td>
            <td>{pos1shift3.Refunds}</td>
            <td>{pos2shift1.Refunds}</td>
            <td>{pos2shift2.Refunds}</td>
            <td>{pos2shift3.Refunds}</td>
          </tr>
          <tr align='center'>
            <td>Cleared Items</td>
            <td>{pos1shift1.ClearedItems}</td>
            <td>{pos1shift2.ClearedItems}</td>
            <td>{pos1shift3.ClearedItems}</td>
            <td>{pos2shift1.ClearedItems}</td>
            <td>{pos2shift2.ClearedItems}</td>
            <td>{pos2shift3.ClearedItems}</td>
          </tr>
          <tr align='center'>
            <td>Cancels</td>
            <td>{pos1shift1.Cancels}</td>
            <td>{pos1shift2.Cancels}</td>
            <td>{pos1shift3.Cancels}</td>
            <td>{pos2shift1.Cancels}</td>
            <td>{pos2shift2.Cancels}</td>
            <td>{pos2shift3.Cancels}</td>
          </tr>
          <tr align='center'>
            <td>Customer Count</td>
            <td>{pos1shift1.CustomerCount}</td>
            <td>{pos1shift2.CustomerCount}</td>
            <td>{pos1shift3.CustomerCount}</td>
            <td>{pos2shift1.CustomerCount}</td>
            <td>{pos2shift2.CustomerCount}</td>
            <td>{pos2shift3.CustomerCount}</td>
          </tr>
          <tr>
            <td colSpan='7'></td>
            <td colSpan='2' style={{ textAlign: "center" }} onClick={submitdone} ><Button >Submit</Button></td>
          </tr>
        </table>
      </form>
    </React.Fragment>
  );
}
export default Daysheetpage;
const tablestyle = {
  borderSpacing: '2px',
  overflow: "scroll",
  border: "2px solid rgb(24, 94, 132)",
  background: "rgb(255, 255, 255)",
}
