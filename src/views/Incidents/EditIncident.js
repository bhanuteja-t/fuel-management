import React, { useState, useEffect } from 'react';
import { Button, Form, Segment, Divider } from 'semantic-ui-react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import { getincidentsByID, updateincidentsByID } from '../../Apicalls';
import { isAuthenticated } from '../../Auth';
function EditIncident(props) {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const notify = () => {
        toast.success(<h3>Incident Updated Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const [incident, setIncident] = useState({
              userid:uid,
              RegNo: "",
              Date: "",
              EventNo: "",
              ConstableId: "",
              Status: "",
              Description: "",
    });
    const { RegNo, Date, EventNo, Status, ConstableId, Description } = incident;
    const handleChange = (name) => (event) => {
        const value = event.target.value;
        setIncident({ ...incident, [name]: value });
    };
    const createfunction = (event) => {
        event.preventDefault();
        updateincidentsByID(param,incident).then((data) => {
            if (data.error) {
                setIncident({ ...incident, error: data.error });
            } else {
                setIncident({
                    ...incident,
                    RegNo: data.RegNo,
                    Date: data.Date,
                    EventNo: data.EventNo,
                    Status: data.Status,
                    Description: data.Description,
                });
                notify();
            }
            isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
                history.push("/IncidentsearchForSA")
                )
                isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                    history.push("/Incidentsearchmanager")
                    )
        });
    };
    const preload = (param) => {
        getincidentsByID(param).then((data) => {
          setIncident({
            RegNo: data.data[0].RegNo,
            Date: data.data[0].Date,
            EventNo: data.data[0].EventNo,
            Status: data.data[0].Status,
            ConstableId: data.data[0].ConstableId,
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
            history.push("/IncidentsearchForSA")
            )
            isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                history.push("/Incidentsearchmanager")
                )
    }
    return (
        <div>
        <Segment style={ddd}>
            <Form>
                <header style={headerstyle}>
                    <b>Edit Incident</b>
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
                        label='Reg No'
                        type="text"
                        value={RegNo}
                        onChange={handleChange("RegNo")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                <Form.Input
                        label='Event No'
                        type="text"
                        value={EventNo}
                        onChange={handleChange("EventNo")}
                    />
                    <Form.Input
                        label='Constable ID'
                        type="text"
                        value={ConstableId}
                        onChange={handleChange("ConstableId")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                     <label><b>Status : </b></label>
                     Resolved<input style={{margin:'5px'}} type='checkbox' name="Status" label="Resolved" checked={Status === "Resolved"} value="Resolved" onChange={(e) => { setIncident({ ...incident, Status: e.target.value }) }} onClick={(e) => console.log("Event Paid== ", incident)} />
                     UnResolved<input style={{margin:'5px'}} type='checkbox' name="Status" label="Un Resolved" checked={Status === "UnResolved"} value="UnResolved" onChange={(e) => { setIncident({ ...incident, Status: e.target.value }) }} onClick={(e) => console.log("Event Unpaid== ", incident)} />
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
export default EditIncident;
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