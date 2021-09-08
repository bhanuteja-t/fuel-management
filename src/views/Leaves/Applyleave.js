import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import { isAuthenticated } from "../../Auth";
import { toast } from "react-toastify";
import './Leavepage.css'
import "react-toastify/dist/ReactToastify.css";
import { Addleave, getleavesbyuserid } from "../../Apicalls";
toast.configure();
function Applyleave() {
  const notify = () => {
    toast.success(<h3>Leave Created Successfully</h3>, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };
  const [errors,setErrors] = useState({
    startdateErr: "Select Start Date",
    enddateErr: "End Date is Required",
    emrgfirstnameErr: "FirstName is Required",
    emrgphonenumberErr: "Phone Number is Required",
    descriptionErr: "Description is Required",
  });
  const currentuser = isAuthenticated();
  const uid = currentuser.data.user.userid;
  const [leaves, setLeaves] = useState([])
  const [values, setValues] = useState({
    userid: uid,
    StartDate: "",
    EndDate: "",
    FirstName: "",
    LastName: "",
    LeaveDescription: "",
    PhoneNumber: "",
  });
  const [ data,setData] = useState({
    loading: false,
    error: "",
    getaRedirect: false,
  });
  const {
    startdateErr,
    enddateErr,
    emrgfirstnameErr,
    emrgphonenumberErr,
    descriptionErr,
  } = errors;
  const {
    StartDate,
    EndDate,
    FirstName,
    LastName,
    LeaveDescription,
    PhoneNumber,
  } = values;
  const history = useHistory();
    const isValid = () => {
    if (
      !StartDate.length > 0 &&
      !EndDate.length > 0 &&
      !FirstName.length>0 &&
      !PhoneNumber.length>0 &&
      !LeaveDescription.length > 0
    ) {
      toast.error("Please Enter Mandatory Fields", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    } else if (!StartDate.length > 0) {
      toast.error(startdateErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    } else if (!EndDate.length > 0) {
      toast.error(enddateErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    } 
    else if (!FirstName.length > 0) {
      toast.error(emrgfirstnameErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    } else if (!PhoneNumber.length > 0) {
      toast.error(emrgphonenumberErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!LeaveDescription.length > 0) {
      toast.error(descriptionErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    return true;
  };
  const Addbtn = (event) => {
    event.preventDefault();
    if (isValid()) {
    Addleave(values).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          userid: uid,
          StartDate: "",
          EndDate: "",
          FirstName: "",
          LastName: "",
          LeaveDescription: "",
          PhoneNumber: "",
        });
        setData({ ...data, loading: false, getaRedirect: true });
        notify();
        history.push("/Applyleave");
        preload();
      }
    });
    }
  };
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  const preload = () => {
    getleavesbyuserid(uid).then((data) => {
      if (data.error) {
      } else {
        setLeaves(data.data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);
  function Taskcancel() {
    history.push("/Getleave_demo");
  }
  return (
    <Segment style={look}>
      <Form>
        <header style={headerstyle}>
          <b>Leave Form</b>
        </header>
        <Form.Group widths={3}>
          <Form.Input
            label="Start Date"
            type="date"
            value={StartDate}
            onChange={handleChange("StartDate")}
          />
          <Form.Input
            label="End Date"
            type="date"
            value={EndDate}
            onChange={handleChange("EndDate")}
          />
        </Form.Group>
        <div style={{ paddingBottom: '10px' }}><b>Contact Details when Away</b></div>
        <Form.Group style={{ paddingTop: "5px" }} widths={3}>
          <Form.Input
            label="First Name"
            value={FirstName}
            placeholder="First Name"
            onChange={handleChange("FirstName")}
          />
          <Form.Input
            label="Last Name"
            value={LastName}
            placeholder="Last Name"
            onChange={handleChange("LastName")}
          />
          <Form.Input
            label="Phone Number"
            value={PhoneNumber}
            placeholder="Phone Number"
            onChange={handleChange("PhoneNumber")}
          />
        </Form.Group>
        <Form.TextArea
          label="Leave Description"
          placeholder="Description"
          value={LeaveDescription}
          onChange={handleChange("LeaveDescription")}
        />
        <div style={{ textAlign: "center", }}>
          <Button color="green" onClick={Addbtn}>
            Submit Leave
          </Button>
          <Button color="black" onClick={Taskcancel}>
            Cancel
          </Button>
        </div>
      </Form>
      <hr />
      <Segment>
        <Form>
          <header style={headerstyle}>
            <b> Leave's History</b>
          </header>
          <div class="row">
            {leaves && leaves.map((index, value) => {
              return (
                <div class="column" style={cardstyle}>
                  <div style={{marginLeft:'20px', padding:'5px'}}>
                  <p>Status : <span style={{color:'green'}} >{index.isConfirmed === true ? "Confirmed" : "Pending"}</span></p>
                    <p>EndDate : {index.EndDate}</p>
                    <p>StartDate : {index.StartDate}</p>
                    <p>Created On : {index.createdOn}</p>
                    <p>Description : {index.LeaveDescription}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Form>
      </Segment>
    </Segment>
  );
}
export default Applyleave;
const headerstyle = {
  textAlign: "center",
  color: "grey",
  fontSize: "24px",
  paddingBottom: "20px",
};
const cardstyle = {
  marginLeft: '60px',
  border: '1px solid gray',
  backgroundColor:'#ccc',
  padding:'10px',
  marginTop:'20px',
  overflow:'auto'
}
const look = {
  overflow: 'auto',
}