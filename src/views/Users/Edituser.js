
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button, Form, Segment, Divider } from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getUserByID, UpdateuserByID} from "../../Apicalls";
toast.configure();
function Edituser(props) {
  const notify = () => {
    toast.success(<h3>User Details Updated Successfully</h3>, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
    });
};
  const [values, setValues] = useState({
    formData: new FormData(),
    password: "",
    password2: "",
    designation: "",
    first_name: "",
    last_name: "",
    Date_of_birth: "",
    Address: "",
    email: "",
    TFN: "",
    ABN: "",
    site: "",
    emergency_first_name: "",
    emergency_last_name: "",
    emergency_email: "",
    phone_number: "",
  });
  const {
    designation,
    first_name,
    last_name,
    Date_of_birth,
    Address,
    email,
    TFN,
    ABN,
    site,
    emergency_first_name,
    emergency_last_name,
    emergency_email,
    phone_number,
    formData
  } = values;
  const history = useHistory();
  const handleChange = (name) => (event) => {
    const value =  event.target.value;
  formData.set(name, value);
  setValues({ ...values, [name]: value });
  };
  const Updttaskbtn = (event) => {
    event.preventDefault();
      setValues({ ...values, error: "", loading: true });
      UpdateuserByID(param, values).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            password: "",
            password2: "",
            designation: "",
            first_name: "",
            last_name: "",
            Date_of_birth: "",
            Address: "",
            email: "",
            TFN: "",
            ABN: "",
            site: "",
            emergency_first_name: "",
            emergency_last_name: "",
            emergency_email: "",
            phone_number: "",
          });
          notify();
        }
        history.push("/Userslist");
      });
  };
  const preload = (param) => {
    getUserByID(param).then((data) => {
      setValues({
        password: data.data.password,
        designation: data.data.designation,
        first_name:data.data.first_name,
        last_name: data.data.last_name,
        Date_of_birth: data.data.Date_of_birth,
        Address: data.data.Address,
        email: data.data.email,
        TFN: data.data.TFN,
        token:data.data.token,
        ABN: data.data.ABN,
        site: data.data.site,
        emergency_first_name: data.data.emergency_first_name,
        emergency_last_name: data.data.emergency_last_name,
        emergency_email: data.data.emergency_email,
        phone_number: data.data.phone_number,
        formData: new FormData(),
      });
    });
  };
const param = props.match.params.id;
  useEffect(() => {
    preload(param);
  }, [param]);
  function Taskcancel() {
    history.push(`/View_profile/${param}`);
  }
  return (
    <Segment style={pagestyle1}>
      <Form>
        <header style={headerstyle}>
          <b>Edit User Page</b>
        </header>
        <Divider/>
        <Form.Group style={{ paddingTop: "10px" }} widths={2}>
        <Form.Input
            label="First Name"
            value={first_name}
            placeholder="First Name"
            onChange={handleChange("first_name")}
          />
          <Form.Input
            label="Last Name"
            value={last_name}
            placeholder="Last Name"
            onChange={handleChange("last_name")}
          />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input
            label="DOB"
            type="date"
            value={Date_of_birth}
            onChange={handleChange("Date_of_birth")}
          />
          <Form.Input
            label="Address"
            type="text"
            value={Address}
            onChange={handleChange("Address")}
          />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input
            label="Email"
            value={email}
            type="email"
            placeholder="xyz@example.com"
            onChange={handleChange("email")}
          />
          <Form.Field widths="half">
            <label>Designation</label>
            <select
              name="designation"
              id="designation"
              onChange={handleChange("designation")}
            >
              <option value="">{designation}</option>
              <option value="manager">Manager</option>
              <option value="worker">Worker</option>
            </select>
          </Form.Field>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input
            label="TFN"
            value={TFN}
            type="number"
            placeholder="11 digit Number"
            onChange={handleChange("TFN")}
          />
          <Form.Input
            label="ABN"
            value={ABN}
            type="number"
            placeholder="8 or 9 Digit"
            onChange={handleChange("ABN")}
          />
        </Form.Group>
        <Form.Field widths="half">
            <label>Site</label>
            <select
              name="site"
              id="site"
              onChange={handleChange("site")}
            >
              <option value="">{site}</option>
              <option value="United Wagga">United Wagga</option>
              <option value="United Leeton">United Leeton</option>
              <option value="United Budgewoi">United Budgewoi</option>
              <option value="United Junee">United Junee</option>
              <option value="United Amaroo">United Amaroo</option>
              <option value="United Sunshine">United Sunshine</option>
            </select>
          </Form.Field>
        <div style={{paddingBottom:"5px"}}><b>Emergency Contact Details :</b></div>
        <Form.Group widths={2}>
          <Form.Input
            label="First Name"
            value={emergency_first_name}
            type="text"
            onChange={handleChange("emergency_first_name")}
          />
          <Form.Input
            label="Last Name"
            value={emergency_last_name}
            type="text"
            onChange={handleChange("emergency_last_name")}
          />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input
            label="Email"
            value={emergency_email}
            type="email"
            onChange={handleChange("emergency_email")}
          />
          <Form.Input
            label="Phone"
            value={phone_number}
            type="text"
            onChange={handleChange("phone_number")}
          />
        </Form.Group>
        <div style={{ textAlign: "center", paddingTop: "30px" }}>
          <Button color="green" onClick={Updttaskbtn}>
            Update
          </Button>
          <Button color="black" onClick={Taskcancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Segment>
  );
}
export default Edituser;
const headerstyle = {
  textAlign: "center",
  color: "grey",
  fontSize: "24px",
  paddingTop: "10px",
};
const pagestyle1={
    width: '500px',
    marginLeft: "350px",
    overflow: 'auto',
    maxHeight: '560px' 
}
