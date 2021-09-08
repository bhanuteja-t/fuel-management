import React, { useState, useEffect } from 'react';
import { Button, Form, Segment, Divider } from 'semantic-ui-react';
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getdriveOffsByID, UpdatedriveOffsByID } from '../../Apicalls';
import { isAuthenticated } from '../../Auth';
function EditDriveoff(props) {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const notify = () => {
        toast.success(<h3>Drive Off Updated Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const [driveoff, setDriveoff] = useState({
        userid:uid,
              PumpNo: "",
              Date: "",
              FuelType: "",
              Amount: "",
              Rego: "",
              Description: "",
    });
    const { Rego, Date, PumpNo, FuelType, Amount, Description } = driveoff;
    const handleChange = (name) => (event) => {
        const value = event.target.value;
        setDriveoff({ ...driveoff, [name]: value });
    };
    const createfunction = (event) => {
        event.preventDefault();
        UpdatedriveOffsByID(param,driveoff).then((data) => {
            if (data.error) {
                setDriveoff({ ...driveoff, error: data.error });
            } else {
                setDriveoff({
                    ...driveoff,
                    userid:uid,
                    Rego: data.Rego,
                    Date: data.Date,
                    FuelType: data.FuelType,
                    PumpNo: data.PumpNo,
                    Amount: data.Amount,
                    Description: data.Description,
                });
                notify();
            }
            isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
                history.push("/DriveofflistSA")
                )
                isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                    history.push("/Driveofflistmanager")
                    )
        });
    };
    const preload = (param) => {
        getdriveOffsByID(param).then((data) => {
          setDriveoff({
            Rego: data.data[0].Rego,
            Date: data.data[0].Date,
            FuelType: data.data[0].FuelType,
            PumpNo: data.data[0].PumpNo,
            Amount: data.data[0].Amount,
            Description: data.data[0].Description,
            formData: new FormData(),
          });
        });
      };
      const param = props.match.params.id;
      useEffect(() => {
        preload(param);
      }, [param]);
    const history=useHistory();
    function invoiceclose() {
        isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
            history.push("/DriveofflistSA")
            )
            isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                history.push("/Driveofflistmanager")
                )
    }
    return (
        <div>
        <Segment style={ddd}>
            <Form>
                <header style={headerstyle}>
                    <b>Drive Off Page</b>
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
                        label='Pump No'
                        type="text"
                        value={PumpNo}
                        onChange={handleChange("PumpNo")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                <Form.Input
                        label='Fuel Type'
                        type="text"
                        value={FuelType}
                        onChange={handleChange("FuelType")}
                    />
                    <Form.Input
                        label='Amount'
                        type="text"
                        value={Amount}
                        onChange={handleChange("Amount")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                     <label><b>Rego : </b></label>
                     Genuine<input style={{margin:'5px'}} type='checkbox' name="Rego" label="Genuine" checked={Rego === "Genuine"} value="Genuine" onChange={(e) => { setDriveoff({ ...driveoff, Rego: e.target.value }) }} onClick={(e) => console.log("Event Paid== ", driveoff)} />
                     Wrong Plate<input style={{margin:'5px'}} type='checkbox' name="Rego" label="Wrong Plate" checked={Rego === "Wrong Plate"} value="Wrong Plate" onChange={(e) => { setDriveoff({ ...driveoff, Rego: e.target.value }) }} onClick={(e) => console.log("Event Unpaid== ", driveoff)} />
                </Form.Group>
                <Form.TextArea
                    label="Description"
                    placeholder="Description..."
                    value={Description}
                    onChange={handleChange("Description")}
                />
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
export default EditDriveoff;
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