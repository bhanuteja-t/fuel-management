import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { createworkersheet, getusers } from '../../Apicalls';
import { isAuthenticated } from '../../Auth';
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment'; 
var currentDate = moment().format("DD/MM/YYYY");
var uname;
function Workersheet() {
  const [values, seValues] = useState([])
  const notify = () => {
    toast.success(<h3>Workersheet Created Successfully</h3>,{
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
    });
};
const preload = () => {
  getusers().then((data) => {
    if (data.error) {
    } else {
      seValues(data.data);
    }
  });
};
const currentuser = isAuthenticated();
const uid = currentuser.data.user.userid;
 uname = currentuser.data.user.first_name;
useEffect(() => {
  preload();
}, []);
var assigntoname = values.filter((ur) => uid === ur._id);
assigntoname.map((aa) => {
  return {
    siteglobal : aa.site,
    workedunder : aa.assignto,
}
})
const history=useHistory();
const [work, setWork] = useState({
        userid: uid,
        site: "",
        workedunder:"",
        OperatorName : "",
        MotorPass: "",
        MotorChange: "",
        Fleet: "",
        Eftpos: "",
        ManualEftpos: "",
        Amex: "",
        Diners: "",
        UnitedCards: "",
        ManUnitedCard:"",
        MenuLog:"",
        UberEats:"",
        Inabilities: "",
        DriveOffs: "",
        GunneboSafeAmt: "",
        ManualFinalDrop: "",
        NetSales: "",
        ShopSales: "",
        Surcharge:"",
        TouchEPAY1: "",
        TouchEPAY2: "",
        BBQ:"",
        PieFace: "",
        Refunds: "",
        ClearedItems:"",
        Cancels: "",
        CustomerCount: "",
        SelectShift :"",
        POS:"",
      });
      const {
        MotorPass,
        MotorChange,
        Fleet,
        Eftpos,
        ManualEftpos,
        Amex,
        Diners,
        UnitedCards,
        ManUnitedCard,
        MenuLog,
        UberEats,
        Inabilities,
        DriveOffs,
        GunneboSafeAmt,
        ManualFinalDrop,
        NetSales,
        ShopSales,
        TouchEPAY1,
        TouchEPAY2,
        BBQ,
        PieFace,
        Refunds,
        ClearedItems,
        Cancels,
        CustomerCount,
      } = work;
      const handleChange = (name) => (event) => {
        const value = event.target.value;
        setWork({ ...work, [name]: value });
      };
      const Addworkerdetails = (event) => {
        event.preventDefault();
        setWork({ ...work, error: "", loading: true });
        createworkersheet(work).then((data) => {
          if (data.error) {
            setWork({ ...work, error: data.error });
          } else {
            setWork({
              ...work,
        OperatorName : uname,
        MotorPass: data.MotorPass,
        MotorChange: data.MotorChange,
        Fleet: data.Fleet,
        Eftpos: data.Eftpos,
        ManualEftpos: data.ManualEftpos,
        Amex: data.Amex,
        Diners: data.Diners,
        UnitedCards:data.UnitedCards,
        ManUnitedCard: data.ManUnitedCard,
        MenuLog: data.MenuLog,
        UberEats:data.UberEats,
        Inabilities: data.Inabilities,
        DriveOffs: data.DriveOffs,
        GunneboSafeAmt: data.GunneboSafeAmt,
        ManualFinalDrop: data.ManualFinalDrop,
        NetSales: data.NetSales,
        ShopSales: data.ShopSales,
        Surcharge: data.Surcharge,
        TouchEPAY1: data.TouchEPAY1,
        TouchEPAY2: data.TouchEPAY2,
        BBQ: data.BBQ,
        PieFace: data.PieFace,
        Refunds:data.Refunds,
        ClearedItems: data.ClearedItems,
        Cancels: data.Cancels,
        CustomerCount: data.CustomerCount,
        SelectShift : data.SelectShift,
        POS : data.POS,
            });
            notify();
          }
          history.push("/dashboard");
        });
      };
  var showdate = new Date();
  var displayday = showdate.getDay();
  return (
    <form>
      <table border="1" style={tablestyle}>
        <tr>
          <th>Date:{currentDate}</th>
          <th style={{textAlign:"center"}} colSpan='2'>Worker Sheet</th>
          <th>{displayday}</th>
        </tr>
        <tr>
          <th>Operator Name</th>
          <td style={{textAlign: 'center'}} >{uname}</td>
          <th>Motor Pass</th>
          <td><input type='text' value={MotorPass} onChange={handleChange("MotorPass")}/></td>
        </tr>
        <tr>
          <th>Motor Change</th>
          <td><input type='number' value={MotorChange} onChange={handleChange("MotorChange")} /></td>
          <th>Fleet</th>
          <td><input type='number' value={Fleet} onChange={handleChange("Fleet")}/></td>
        </tr>
        <tr>
          <th>Eftpos</th>
          <td><input type='number' value={Eftpos} onChange={handleChange("Eftpos")}/></td>
          <th>Manual Eftpos</th>
          <td><input type='number' value={ManualEftpos} onChange={handleChange("ManualEftpos")}/></td>
          </tr>
        <tr>
          <th>Amex</th>
          <td><input type='number' value={Amex} onChange={handleChange("Amex")}/></td>
          <th>Diners</th>
          <td><input type='number' value={Diners} onChange={handleChange("Diners")}/></td>
        </tr>
        <tr>
          <th>United Cards</th>
          <td><input type='number' value={UnitedCards} onChange={handleChange("UnitedCards")} /></td>
          <th>Man United Card</th>
          <td><input type='number' value={ManUnitedCard} onChange={handleChange("ManUnitedCard")} /></td>
        </tr>
        <tr>
          <th>Menulogs</th>
          <td><input type='number' value={MenuLog} onChange={handleChange("MenuLog")} /></td>
          <th>Uber Eats</th>
          <td><input type='number' value={UberEats} onChange={handleChange("UberEats")} /></td>
        </tr>
        <tr>
          <th>Inabilities</th>
          <td><input type='number' value={Inabilities} onChange={handleChange("Inabilities")} /></td>
          <th>Drive Offs</th>
          <td><input type='number' value={DriveOffs} onChange={handleChange("DriveOffs")} /></td>
        </tr>
        <tr>
          <th>Gunnebo Safe Amt</th>
          <td><input type='number' value={GunneboSafeAmt} onChange={handleChange("GunneboSafeAmt")} /></td>
          <th>Manual Final Drop</th>
          <td><input type='number' value={ManualFinalDrop} onChange={handleChange("ManualFinalDrop")} /></td>
        </tr>
        <tr>
          <th>Net Sales</th>
          <td><input type='number' value={NetSales} onChange={handleChange("NetSales")}/></td>
          <th>BBQ</th>
          <td><input type='number' value={BBQ} onChange={handleChange("BBQ")}/></td>
        </tr>
        <tr>
          <th>Shop Sales</th>
          <td><input type='number' value={ShopSales} onChange={handleChange("ShopSales")} /></td>
          <th>Surcharge</th>
          <td><input type='number' onChange={handleChange("Surcharge")}/></td>
        </tr>
        <tr>
          <th>Touch EPAY1</th>
          <td><input type='number' value={TouchEPAY1} onChange={handleChange("TouchEPAY1")}/></td>
          <th>Touch EPAY2</th>
          <td><input type='number' value={TouchEPAY2} onChange={handleChange("TouchEPAY2")}/></td>
        </tr>
        <tr>
          <th>Pie Face</th>
          <td><input type='number' value={PieFace} onChange={handleChange("PieFace")}/></td>
          <th>Credits/Refunds</th>
          <td><input type='text' value={Refunds} onChange={handleChange("Refunds")}/></td>
        </tr>
        <tr>
          <th>Cleared Items</th>
          <td><input type='number' value={ClearedItems} onChange={handleChange("ClearedItems")}/></td>
          <th>Cancels</th>
          <td><input type='number' value={Cancels} onChange={handleChange("Cancels")}/></td>
        </tr>
        <tr>
          <th>Customer Count</th>
          <td><input type='number' value={CustomerCount} onChange={handleChange("CustomerCount")}/></td>
          <th>Select Shift</th>
          <td><select 
          name="SelectShift"
          id="SelectShift"
          onChange={handleChange("SelectShift")}
          >
          <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            </td> 
        </tr>
        <tr>
        <th>Select POS</th>
          <td><select 
          name="POS"
          id="POS"
          onChange={handleChange("POS")}
          >
          <option value="">Select</option>
                <option value="POS1">POS1</option>
                <option value="POS2">POS2</option>
            </select>
            </td> 
          <td align='center' colSpan='3'><Button onClick={Addworkerdetails}>Submit</Button></td>
        </tr>
      </table>
    </form>
  );
}
export default Workersheet;
const tablestyle = {
  display: "inline-block",
  marginLeft:"300px",
  marginTop:"60px",
  overflow: "scroll",
  maxWidth: "100%",
  border: "2px solid rgb(24, 94, 132)",
  background: "rgb(255, 255, 255)"
}