import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getworkersheetByID, UpdateWokersheetByID } from '../../Apicalls';
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from 'semantic-ui-react';
import moment from 'moment';
import { isAuthenticated } from '../../Auth';
toast.configure();
var currentDate = moment().format("DD/MM/YYYY");
function Editworkersheet(props) {
    const notify = () => {
        toast.success(<h3>Details Updated Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const history = useHistory();
    const [work, setWork] = useState({
        OperatorName: "",
        MotorPass: "",
        MotorChange: "",
        Fleet: "",
        Eftpos: "",
        ManualEftpos: "",
        Amex: "",
        Diners: "",
        UnitedCards: "",
        ManUnitedCard: "",
        MenuLog: "",
        UberEats: "",
        Inabilities: "",
        DriveOffs: "",
        GunneboSafeAmt: "",
        ManualFinalDrop: "",
        NetSales: "",
        Difference: "",
        ShopSales: "",
        Surcharge: "",
        TouchEPAY1: "",
        TouchEPAY2: "",
        NetShop: "",
        BBQ: "",
        PieFace: "",
        Refunds: "",
        ClearedItems: "",
        Cancels: "",
        CustomerCount: "",
        SelectShift: "",
        POS: "",
    });
    const {
        OperatorName,
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
        Difference,
        ShopSales,
        TouchEPAY1,
        TouchEPAY2,
        NetShop,
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
    const Updatedworkerdetails = (event) => {
        event.preventDefault();
        setWork({ ...work});
        UpdateWokersheetByID(param, work).then((data) => {
            if (data.error) {
                setWork({ ...work, error: data.error });
            } else {
                setWork({
                    ...work,
                    OperatorName: "",
                    MotorPass:"",
                    MotorChange: "",
                    Fleet: "",
                    Eftpos: "",
                    ManualEftpos: "",
                    Amex: "",
                    Diners: "",
                    UnitedCards: "",
                    ManUnitedCard: "",
                    MenuLog: "",
                    UberEats: "",
                    Inabilities: "",
                    DriveOffs: "",
                    GunneboSafeAmt: "",
                    ManualFinalDrop: "",
                    NetSales: "",
                    Difference: "",
                    ShopSales: "",
                    Surcharge:"",
                    TouchEPAY1: "",
                    TouchEPAY2: "",
                    NetShop: "",
                    BBQ: "",
                    PieFace: "",
                    Refunds: "",
                    ClearedItems: "",
                    Cancels: "",
                    CustomerCount: "",
                    SelectShift: "",
                    POS: "",
                });
                notify();
            }
            isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
                history.push("/DaySheetList")
                )
                isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                    history.push("/DaysheetlistManager")
                    )
        });
    };
    const preload = (param) => {
        getworkersheetByID(param).then((data) => {
            if (data.error) {
                setWork({ ...work, error: data.error });
            } else {
                setWork({
                    ...work,
                    OperatorName: data.data.OperatorName,
                    MotorPass: data.data.MotorPass,
                    MotorChange: data.data.MotorChange,
                    Fleet: data.data.Fleet,
                    Eftpos: data.data.Eftpos,
                    ManualEftpos: data.data.ManualEftpos,
                    Amex: data.data.Amex,
                    Diners: data.data.Diners,
                    UnitedCards: data.data.UnitedCards,
                    ManUnitedCard: data.data.ManUnitedCard,
                    MenuLog: data.data.MenuLog,
                    UberEats: data.data.UberEats,
                    Inabilities: data.data.Inabilities,
                    DriveOffs: data.data.DriveOffs,
                    GunneboSafeAmt: data.data.GunneboSafeAmt,
                    ManualFinalDrop: data.data.ManualFinalDrop,
                    NetSales: data.data.NetSales,
                    Difference: data.data.Difference,
                    ShopSales: data.data.ShopSales,
                    Surcharge: data.data.Surcharge,
                    TouchEPAY1: data.data.TouchEPAY1,
                    TouchEPAY2: data.data.TouchEPAY2,
                    NetShop: data.data.NetShop,
                    BBQ: data.data.BBQ,
                    PieFace: data.data.PieFace,
                    Refunds: data.data.Refunds,
                    ClearedItems: data.data.ClearedItems,
                    Cancels: data.data.Cancels,
                    CustomerCount: data.data.CustomerCount,
                    SelectShift: data.data.SelectShift,
                    POS: data.data.POS,
                });
            }
        });
    }
    const param = props.match.params.id;
    useEffect(() => {
        preload(param);
    }, [param]);
    var showdate = new Date();
    var displayday = showdate.getDay();
    function close() {
        history.push("/DaySheetList");
    }
    return (
        <form>
            <Header style={{ marginTop: '40px' }} as="h2" color="orange" textAlign="center">
                Edit Worker Sheet
            </Header>
            <table border="1" style={tablestyle}>
                <tr>
                    <th>Date:{currentDate}</th>
                    <th style={{ textAlign: "center" }} colSpan='2'>Worker Details</th>
                    <th>{displayday}</th>
                </tr>
                <tr>
                    <th>Operator Name</th>
                    <td><input type='text' value={OperatorName} onChange={handleChange("OperatorName")} /></td>
                    <th>Motor Pass</th>
                    <td><input type='text' value={MotorPass} onChange={handleChange("MotorPass")} /></td>
                </tr>
                <tr>
                    <th>Motor Change</th>
                    <td><input type='number' value={MotorChange} onChange={handleChange("MotorChange")} /></td>
                    <th>Fleet</th>
                    <td><input type='number' value={Fleet} onChange={handleChange("Fleet")} /></td>
                </tr>
                <tr>
                    <th>Eftpos</th>
                    <td><input type='number' value={Eftpos} onChange={handleChange("Eftpos")} /></td>
                    <th>Manual Eftpos</th>
                    <td><input type='number' value={ManualEftpos} onChange={handleChange("ManualEftpos")} /></td>
                </tr>
                <tr>
                    <th>Amex</th>
                    <td><input type='number' value={Amex} onChange={handleChange("Amex")} /></td>
                    <th>Diners</th>
                    <td><input type='number' value={Diners} onChange={handleChange("Diners")} /></td>
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
                    <td><input type='number' value={NetSales} onChange={handleChange("NetSales")} /></td>
                    <th>Difference</th>
                    <td><input type='number' value={Difference} onChange={handleChange("Difference")} /></td>
                </tr>
                <tr>
                    <th>Shop Sales</th>
                    <td><input type='number' value={ShopSales} onChange={handleChange("ShopSales")} /></td>
                    <th>Customer Count</th>
                    <td><input type='number' value={CustomerCount} onChange={handleChange("CustomerCount")} /></td>
                </tr>
                <tr>
                    <th>Touch EPAY1</th>
                    <td><input type='number' value={TouchEPAY1} onChange={handleChange("TouchEPAY1")} /></td>
                    <th>Touch EPAY2</th>
                    <td><input type='number' value={TouchEPAY2} onChange={handleChange("TouchEPAY2")} /></td>
                </tr>
                <tr>
                    <th>BBQ</th>
                    <td><input type='number' value={BBQ} onChange={handleChange("BBQ")} /></td>
                    <th>Net Shop</th>
                    <td><input type='number' value={NetShop} onChange={handleChange("NetShop")} /></td>
                </tr>
                <tr>
                    <th>Pie Face</th>
                    <td><input type='number' value={PieFace} onChange={handleChange("PieFace")} /></td>
                    <th>Credits/Refunds</th>
                    <td><input type='text' value={Refunds} onChange={handleChange("Refunds")} /></td>
                </tr>
                <tr>
                    <th>Cleared Items</th>
                    <td><input type='number' value={ClearedItems} onChange={handleChange("ClearedItems")} /></td>
                    <th>Cancels</th>
                    <td><input type='number' value={Cancels} onChange={handleChange("Cancels")} /></td>
                </tr>
                <tr>
                    <td align='center' colSpan='6'><Button style={{ margin: '5px' }} onClick={Updatedworkerdetails}>Update</Button>
                        <Button onClick={() => close()}>Cancel</Button></td>
                </tr>
            </table>
        </form>
    );
}
export default Editworkersheet;
const tablestyle = {
    display: "inline-block",
    marginLeft: "300px",
    marginTop: "20px",
    overflow: "scroll",
    maxWidth: "100%",
    border: "2px solid rgb(24, 94, 132)",
    background: "rgb(255, 255, 255)"
}