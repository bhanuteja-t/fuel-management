import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Segment, Divider } from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthenticated } from "../../Auth";
import { uploadroaster } from "../../Apicalls";
toast.configure();
function UploadRoaster() {
  const currentuser = isAuthenticated();
  const uid = currentuser.data.user.userid;
  const notify = () => {
    toast.success(<h3>Uploaded Successfully</h3>, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };
  const history = useHistory();
  const [values, setValues] = useState({
    scheduleFile: '',
    userid:uid,
    formData: new FormData(),
  });
  const {formData,scheduleFile } = values;

  const [errors,setErrors] = useState({
    uploadfileErr: "Please upload the file",
  });
const { uploadfileErr } = errors;
const isValid = () => {
  if (
    !scheduleFile.length > 0
  ) {
    toast.error("Please Enter Mandatory Fields", {
      position: toast.POSITION.TOP_CENTER,
    });
    return false;
  } else if (!scheduleFile.length > 0) {
    toast.error(uploadfileErr, { position: toast.POSITION.TOP_RIGHT });
    return false;
  }
  return true;
};
  const handleChange1 = (name) => (event) => {
    const value = name === 'scheduleFile' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const Adduserbtn = (event) => {
    event.preventDefault();
    formData.set('userid', uid);
    uploadroaster(formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          userid: uid,
          scheduleFile:''

        });
        notify();
      }
    });
  }
  function Cancel() {
    history.push("/dashboard");
  }
  return (
    <Segment style={pagestyle1}>
      <Form >
      <header style={headerstyle}>
          <b>Upload Roaster</b>
        </header>
        <Divider />
        <Form.Group widths={2}>
                        <div style={{ overflow: 'hidden', paddingLeft: '1em' }}>
                            <Form.Field>
                                <label>Upload File <span style={{ color: "red" }} >*</span></label>
                                <input
                                    type="file"
                                    name="scheduleFile"
                                    onChange={handleChange1('scheduleFile')}
                                    className="form-control"
                                />
                            </Form.Field>
                        </div>
                    </Form.Group>
        <div style={{ textAlign: "center", paddingTop: "30px" }}>
          <Button color="green" onClick={Adduserbtn}>
            Upload File
          </Button>
          <Button color="black" onClick={Cancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Segment>
  );
}
export default UploadRoaster;
const headerstyle = {
  textAlign: "center",
  color: "grey",
  fontSize: "24px",
  paddingTop: "10px",
};
const pagestyle1 = {
  width: '500px',
  marginLeft: "350px",
  overflow: 'auto',
  maxHeight: '560px'
}