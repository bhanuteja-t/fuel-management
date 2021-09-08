
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Segment, Divider } from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changepwdapi} from "../../Apicalls";
import { isAuthenticated } from "../../Auth";
toast.configure();
function Changepasword() {
  const notify = () => {
    toast.success(<h3>Updated Successfully</h3>, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
    });
};
const currentuser = isAuthenticated();
const uid = currentuser.data.user.userid;
  const [values, setValues] = useState({
    password: "",
    confirmpassword:""
  });
  const {password, confirmpassword} = values;
  const history = useHistory();
  const handleChange = (name) => (event) => {
    const value =  event.target.value;
  setValues({ ...values, [name]: value });
  };
const Updttaskbtn = (event) => {
    event.preventDefault();
      setValues({ ...values, error: "", loading: true });
      changepwdapi(uid,values).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            password: "",
          });
          notify();
        }
        history.push("/Userslist");
      });
  };
  return (
    <Segment style={pagestyle1}>
      <Form>
        <header style={headerstyle}>
          <b>Change Password</b>
        </header>
        <Divider/>
        <Form.Group style={{ paddingTop: "10px" }} widths={2}>
        <Form.Input
            label="New Password"
            type="password"
            value={password}
            onChange={handleChange("password")}
          />
            <Form.Input
            label="Confirm Password"
            type="password"
            value={confirmpassword}
            onChange={handleChange("confirmpassword")}
          />
          </Form.Group>
        <div style={{ textAlign: "center", paddingTop: "30px" }}>
          <Button color="green" onClick={Updttaskbtn}>
            Update
          </Button>
          <Button color="black" >
            Cancel
          </Button>
        </div>
      </Form>
    </Segment>
  );
}
export default Changepasword;
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