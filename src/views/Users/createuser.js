import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button, Form, Segment, Divider } from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createuser, getsiteorsupplier, getusers } from "../../Apicalls";
toast.configure();
var managerlist1 = [];
function Create_user() {
  const notify = () => {
    toast.success(<h3>New User Created Successfully</h3>, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };
  const [errors, setErrors] = useState({
    usernameErr: "Firstname Required",
    lastnameErr: "Last Name Required",
    DOBErr: "DOD Required",
    siteErr: "Select Site",
    desingationErr: "Designation is Required",
    tfnErr: "TFN Required",
    abnErr: "ABN Required",
    emailErr: "Email Required",
    emailcheckErr: "In Valid Email Format",
    passwordErr: "Password is Required",
    confirmpasswordErr: "Confirm Password is Required",
    mismatchErr: "Passwords Mismatch",
    phonenumberErr: "Enter Phone Number",
    phonefiltercheckErr: "Please Enter 10 digit Valid Phone Number",
    tfnfiltercheckErr:"Please Enter 11 digit Valid TFN Number",
    abnfiltercheckErr:"Please Enter 8 or 9 digit Valid ABN Number",
    passowrdfiltercheckErr: "Password Should contain atleast 1 number and 1 special character with length 6-14",
    emr_firstnameErr: " Enter Firstname for your Energency Contact",
    emr_lastnameErr: " Enter Lastname for your Energency Contact",
    emr_emailErr: " Enter Email for your Energency Contact",
    emr_phonenumberErr: " Enter Phone Number for your Energency Contact",
  });
  const {
    usernameErr,
    lastnameErr,
    DOBErr,
    siteErr,
    desingationErr,
    tfnErr,
    tfnfiltercheckErr,
    abnfiltercheckErr,
    passowrdfiltercheckErr,
    abnErr,
    emailErr,
    emailcheckErr,
    passwordErr,
    confirmpasswordErr,
    mismatchErr,
    phonenumberErr,
    phonefiltercheckErr,
    emr_firstnameErr,
    emr_lastnameErr,
    emr_emailErr,
    emr_phonenumberErr,
  } = errors;
  const history = useHistory();
  const [hideval, setHideval] = useState({
    valuetodisplay: ''
  });
  const setHidefunction = (data) => {
    setHideval(data.value)
  }
  console.log("Hide hook value outside=", hideval)
  const [values, setValues] = useState({
    password: "",
    confirmpassword: "",
    designation: "",
    first_name: "",
    last_name: "",
    Date_of_birth: "",
    Address: "",
    email: "",
    TFN: "",
    ABN: "",
    assignto: "",
    site: "",
    emergency_first_name: "",
    emergency_last_name: "",
    emergency_email: "",
    emergency_phone_number: "",
    phone_number: "",
    userslist: [],
  });
  const { first_name, last_name, Date_of_birth, Address, email, TFN, ABN, userslist, site, emergency_email, emergency_phone_number, emergency_first_name, emergency_last_name, phone_number, password, confirmpassword, designation } = values;
  const [data, setData] = useState({
    loading: false,
    error: "",
    getaRedirect: false,
  });
  const [supplierlist, setSupplierlist] = useState({
    listofsuppliers: [],
    sitelist: []
})
const { sitelist } = supplierlist
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  const Adduserbtn = (event) => {
    event.preventDefault();
    if (isValid()) {
      setValues({ ...values, error: "", loading: true });
      setErrors({ ...errors, nameErr: data.error });
      createuser(values).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            password: data.password,
            password2: data.password2,
            designation: data.designation,
            first_name: data.first_name,
            last_name: data.last_name,
            Date_of_birth: data.Date_of_birth,
            Address: data.Address,
            email: data.email,
            TFN: data.TFN,
            ABN: data.ABN,
            assignto: data.assignto,
            site: data.site,
            emergency_first_name: data.emergency_first_name,
            emergency_last_name: data.emergency_last_name,
            emergency_email: data.emergency_email,
            phone_number: data.phone_number,
            emergency_phone_number: data.emergency_phone_number
          });
          setData({ ...data, loading: false, getaRedirect: true });
          notify();
        }
        history.push("/dashboard");
      }
      );
    }
  };
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var emremailfilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var phnfilter = /^[0-9]\d{9}$/;
  var emrphnfilter = /^[0-9]\d{9}$/;
  var tfnfilter = /^[0-9]\d{10}$/;
  var abnfilter = /^[0-9]\d{7,8}$/;
  var passwordfilter = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,14}$/;
  const isValid = () => {
    if (
      !first_name.length > 0 &&
      !last_name > 0 &&
      !email > 0 &&
      !site > 0 &&
      !Date_of_birth > 0 &&
      !TFN > 0 &&
      !ABN > 0 &&
      phone_number > 0 &&
      !designation > 0 &&
      !password > 0 &&
      !confirmpassword > 0 &&
      !emergency_first_name > 0 &&
      !emergency_last_name > 0 &&
      emergency_phone_number > 0 &&
      !emergency_email > 0
    ) {
      toast.error("All Fields Are Mandatory", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    } else if (!first_name.length > 0) {
      toast.error(usernameErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!last_name.length > 0) {
      toast.error(lastnameErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!Date_of_birth.length > 0) {
      toast.error(DOBErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }

    else if (!site.length > 0) {
      toast.error(siteErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!designation.length > 0) {
      toast.error(desingationErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!TFN.length > 0) {
      toast.error(tfnErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!tfnfilter.test(TFN)) {
      toast.error(tfnfiltercheckErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!ABN.length > 0) {
      toast.error(abnErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!abnfilter.test(ABN)) {
      toast.error(abnfiltercheckErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!email.length > 0) {
      toast.error(emailErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!filter.test(email)) {
      toast.error(emailcheckErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!phone_number.length > 0) {
      toast.error(phonenumberErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!phnfilter.test(phone_number)) {
      toast.error(phonefiltercheckErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!last_name.length > 0) {
      toast.error(lastnameErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!password.length > 0) {
      toast.error(passwordErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!passwordfilter.test(password)) {
      toast.error(passowrdfiltercheckErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!confirmpassword.length > 0) {
      toast.error(confirmpasswordErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    } else if (password !== confirmpassword) {
      toast.error(mismatchErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!emergency_first_name > 0) {
      toast.error(emr_firstnameErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!emergency_last_name > 0) {
      toast.error(emr_lastnameErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!emergency_email > 0) {
      toast.error(emr_emailErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!emremailfilter.test(emergency_email)) {
      toast.error(emailcheckErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!emergency_phone_number > 0) {
      toast.error(emr_phonenumberErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    else if (!emrphnfilter.test(emergency_phone_number)) {
      toast.error(phonefiltercheckErr, { position: toast.POSITION.TOP_RIGHT });
      return false;
    }
    return true;
  };
  function Cancel() {
    history.push("/dashboard");
  }
  useEffect(() => {
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
    getusers().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          userslist: data.data,
        });
      }
    });
  }, []);
  function selectionpart(e, val) {
    for (let i = 0; i < userslist.length; i = i + 1) {
      managerlist1 = userslist.filter((item) => item.designation === 'manager' && item.site === val);
    }
    return managerlist1;
  }
  return (
    <Segment style={pagestyle1}>
      <Form >
        <header style={headerstyle}>
          <b>Create New User</b>
        </header>
        <Divider />
        <Form.Group style={{ paddingTop: "5px" }} widths={2}>
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
          <Form.Field widths="half">
            <label>Site</label>
            <select
              name="site"
              id="site"
              onChange={handleChange("site")}
              onClick={(e) => selectionpart(e, e.target.value)}
            >
              <option value="">Select</option>
              {console.log("sitelist====",sitelist)}
              {sitelist.map((obj)=>(
                <option value={obj.name} >{obj.name} </option>
              ))}
            </select>
          </Form.Field>
          <Form.Field widths="half">
            <label>Designation</label>
            <select
              name="designation"
              id="designation"
              onClick={(e) => setHidefunction(e.target)}
              onChange={handleChange("designation")}
            >
              <option value="">Select</option>
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
        <Form.Group widths={2}>
          <Form.Input
            label="Email"
            value={email}
            type="email"
            placeholder="xyz@example.com"
            onChange={handleChange("email")}
          />
          <Form.Input
            label="Phone"
            value={phone_number}
            type="number"
            placeholder="xxx - xxx - xxxx"
            onChange={handleChange("phone_number")}
          />
        </Form.Group>
        <Form.Group widths={2}>
          {hideval === 'worker' && (
            <Form.Field>
              <label>Assign To</label>
              <select name="assignto" id="assignto" onChange={handleChange("assignto")}>
                <option>Select</option>
                {managerlist1 &&
                  managerlist1.map((prod, index) => (
                    <option key={index} value={prod._id}>
                      {prod.first_name}
                    </option>
                  ))}
              </select>
            </Form.Field>
          )}
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input
            label="Password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={handleChange("password")}
          />
          <Form.Input
            label="Confirm Password"
            value={confirmpassword}
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange("confirmpassword")}
          />
        </Form.Group>
        <Divider />
        <div style={{ paddingBottom: "5px" }}><b>Emergency Contact Details :</b></div>
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
            value={emergency_phone_number}
            type="number"
            placeholder="xxx - xxx - xxxx"
            onChange={handleChange("emergency_phone_number")}
          />
        </Form.Group>
        <div style={{ textAlign: "center", paddingTop: "30px" }}>
          <Button color="green" onClick={Adduserbtn}>
            Create
          </Button>
          <Button color="black" onClick={Cancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Segment>
  );
}
export default Create_user;
const headerstyle = {
  textAlign: "center",
  color: "grey",
  fontSize: "24px",
  paddingTop: "10px",
};
const pagestyle1 = {
  width: window.innerWidth <= 800 ?'':'500px',
  marginLeft:window.innerWidth <= 800 ?'': "350px",
  overflow:window.innerWidth <= 800 ?'': 'auto',
  maxHeight:window.innerWidth <= 800 ?'': '560px'
}