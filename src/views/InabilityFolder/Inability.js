import React, { useState } from 'react';
import { Button, Form, Segment, Divider } from 'semantic-ui-react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import { addinabilities } from '../../Apicalls';
import { isAuthenticated } from '../../Auth';
function Inability() {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const notify = () => {
        toast.success(<h3>Inability Noted Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const [incident, setIncident] = useState({
        userid:uid,
        ProductDescription: "",
              Date: "",
              Amount: "",
              TotalAmount: "",
              Status: "",
    });
    const { ProductDescription, Date, Status, Amount, TotalAmount } = incident;
    const [errors] = useState({
        AmountErr: "Enter Amount",
        TotalAmountErr: "Enter Total Amount",
        StatusErr: "Select Status",
    });
    const {
        AmountErr,
        TotalAmountErr,
        StatusErr
    } = errors
    const isvalid = () => {
        if (
            !Amount.length > 0 &&
            !TotalAmount > 0 &&
            !Status > 0 
        ) {
            toast.error("Enter Mandatory Fields", {
                position: toast.POSITION.TOP_CENTER,
            });
            return false;
        }
        else if (!Amount.length > 0) {
            toast.error(AmountErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        else if (!TotalAmount.length > 0) {
            toast.error(TotalAmountErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        else if (!Status.length > 0) {
            toast.error(StatusErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        return true;
    }
    const handleChange = (name) => (event) => {
        const value = event.target.value;
        setIncident({ ...incident, [name]: value });
    };
    const createfunction = (event) => {
        if(isvalid()){
        event.preventDefault();
        addinabilities(incident).then((data) => {
            if (data.error) {
                setIncident({ ...incident, error: data.error });
            } else {
                setIncident({
                    ...incident,
                    userid:uid,
                    ProductDescription: data.ProductDescription,
                    Date: data.Date,
                    Amount: data.Amount,
                    Status: data.Status,
                    TotalAmount: data.TotalAmount,
                });
                notify();
            }
            isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
                history.push("/InabilitysearchSA")
                )
                isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                    history.push("/Inabilitysearchmanager")
                    )
        });
    }
    };
    const history=useHistory();
    function invoiceclose() {
        history.push("/dashboard")
    }
    return (
        <div>
        <Segment style={ddd}>
            <Form>
                <header style={headerstyle}>
                    <b>Inability Page</b>
                </header>
                <Divider/>
                <Form.Group style={{ paddingTop: "10px" }} widths={2}>
                <Form.Input
                        label="Date"
                        type="date"
                        value={Date}
                        onChange={handleChange("Date")}
                    />
                    <Form.Input
                        label='Product Description'
                        type="Description"
                        value={ProductDescription}
                        onChange={handleChange("ProductDescription")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                     <label><b>Status : </b></label>
                     Paid<input style={{margin:'5px'}} type='checkbox' name="Status" label="Paid" checked={Status === "paid"} value="paid" onChange={(e) => { setIncident({ ...incident, Status: e.target.value }) }} onClick={(e) => console.log("Event Paid== ", incident)} />
                     Un Paid<input style={{margin:'5px'}} type='checkbox' name="Status" label="Un Paid" checked={Status === "unpaid"} value="unpaid" onChange={(e) => { setIncident({ ...incident, Status: e.target.value }) }} onClick={(e) => console.log("Event Unpaid== ", incident)} />
                </Form.Group>
                <Form.Group widths={2}>
                <Form.Input
                        label='Amount'
                        type="text"
                        value={Amount}
                        onChange={handleChange("Amount")}
                    />
                    <Form.Input
                        label='Total Amount'
                        type="text"
                        value={TotalAmount}
                        onChange={handleChange("TotalAmount")}
                    />
                </Form.Group>
                <div style={btnstyle}>
                    <Button color="green" onClick={createfunction}>
                        Submit
                    </Button>
                    <Button color="black" onClick={()=>invoiceclose()}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </Segment>
        </div>
    );
}
export default Inability;
const headerstyle = {
    textAlign: "center",
    color: "grey",
    fontSize: "24px",
};
const btnstyle = {
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: window.innerWidth <= 800 ? "10px" : "0px",
}
const ddd = {
    overflowY: window.innerWidth <= 800 ? "scroll" : "null",
    overflowX: window.innerWidth <= 800 ? "scroll" : "null",
    width: window.innerWidth <= 800 ? "380px" : "500px",
    marginLeft:"380px",
    marginTop:"70px"
}