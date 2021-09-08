import React, { useState, useEffect } from "react";
import { Form, Segment, Divider } from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthenticated } from "../../Auth";
import { getroaster } from "../../Apicalls";
toast.configure();
function Workerroaster() {
  const currentuser = isAuthenticated();
  const uid = currentuser.data.user.userid;
  const [values, setValues] = useState([]);
  useEffect(() => {
    getroaster(uid).then((data) => {
      if (data.error) {
      } else {
        setValues(data.data);
      }
    });
  }, [uid]);
  return (
    <Segment style={pagestyle1}>
      <Form >
        <header style={headerstyle}>
          <b> Roaster</b>
        </header>
        <Divider />
        <Form.Group widths={2}>
          <div style={{ overflow: 'hidden', paddingLeft: '1em' }}>
            {values ?
              <a href={values.scheduleFile} rel="noopener noreferrer" target="_blank">Download your Weekly Roaster, Here</a>
              : <div style={{ marginLeft: '170px' }}>No Roaster Updated</div>
            }
          </div>
        </Form.Group>
      </Form>
    </Segment>
  );
}
export default Workerroaster;
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