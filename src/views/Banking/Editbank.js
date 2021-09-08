import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button, Form, Segment, Divider } from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getbankdetailsByID, getusers, updatebankdetailsByID } from "../../Apicalls";
toast.configure();
function Bankdetailsedit(props) {
    const notify = () => {
        toast.success(<h3>Bank Details Updated Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const history = useHistory();
    const [userlist,setUserlist] = useState([]);
    const [blist,setBlist] = useState([]);
    const [values, setValues] = useState({
        userid:"",
        bankName: "",
        accountName: "",
        BSB: "",
        accountNumber: "",
        superr: "",
        fundName: "",
        fundId: "",
        fundUSI: "",
    });
    const { bankName, accountName, BSB, accountNumber, fundName, fundId, fundUSI, superr } = values;
    const handleChange = (name) => (event) => {
        const value = event.target.value;
        setValues({ ...values, [name]: value });
    };
    const param = props.match.params.id;
    const Adduserbtn = (event) => {
        event.preventDefault();
            updatebankdetailsByID(param,values).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        userid:'',
                        bankName: '',
                        accountName:'',
                        BSB: '',
                        accountNumber: '',
                        superr: '',
                        fundName: '',
                        fundId: '',
                        fundUSI: '',
                    });
                    notify();
                }
                history.push("/dashboard");
            }
            );
    };
    function Cancel() {
        history.push("/dashboard");
    }
    const preload = () =>{
        getusers().then((values)=>{
            if (values.error) {
              } else {
                setUserlist(values.data);
              }
        })
        getbankdetailsByID(param).then((data) => {
            setBlist(data.data)
            setValues({
              userid:data.data.userid,
              bankName: data.data.bankName,
              accountName:data.data.accountName,
              BSB: data.data.BSB,
              accountNumber: data.data.accountNumber,
              superr: data.data.superr,
              fundName: data.data.fundName,
              fundId: data.data.fundId,
              fundUSI: data.data.fundUSI,
            });
          });
    }
    useEffect(() => {
        preload()
      }, []);
var filteredlist =[];
for(let i=0; i< userlist.length;i++){
    if(userlist[i]._id === blist.userid){
         filteredlist = userlist[i].first_name;
    }
}
return (
        <Segment style={pagestyle1}>
            <Form>
                <header style={headerstyle}>
                    <b>Bank Details</b>
                </header>
                <Divider />
                <Form.Field widths="half"><b>User Name : {filteredlist}</b></Form.Field>
                <Form.Group style={{ paddingTop: "5px" }} widths={2}>
                    <Form.Input
                        label="Bank Name"
                        value={bankName}
                        type="text"
                        placeholder="Bank Name"
                        onChange={handleChange("bankName")}
                    />
                    <Form.Input
                        label="Account Name"
                        value={accountName}
                        type="text"
                        placeholder="Account Name"
                        onChange={handleChange("accountName")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                    <Form.Input
                        label="BSB"
                        type="number"
                        placeholder="xxx - xxx"
                        value={BSB}
                        onChange={handleChange("BSB")}
                    />
                    <Form.Input
                        label="Account Number"
                        type="number"
                        value={accountNumber}
                        onChange={handleChange("accountNumber")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                    <Form.Input
                        label="Super"
                        value={superr}
                        type="text"
                        onChange={handleChange("superr")}
                    />
                    <Form.Input
                        label="Fund Name"
                        value={fundName}
                        type="text"
                        onChange={handleChange("fundName")}
                    />
                </Form.Group>
                <Form.Group widths={2}>
                    <Form.Input
                        label="Fund ID"
                        value={fundId}
                        type="number"
                        onChange={handleChange("fundId")}
                    />
                    <Form.Input
                        label="Fund USI"
                        value={fundUSI}
                        type="number"
                        onChange={handleChange("fundUSI")}
                    />
                </Form.Group>
                <div style={{ textAlign: "center", paddingTop: "10px" }}>
                    <Button color="green" onClick={Adduserbtn}>
                        Update
                    </Button>
                    <Button color="black" onClick={Cancel}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </Segment>
    );
}
export default Bankdetailsedit;
const headerstyle = {
    textAlign: "center",
    color: "grey",
    fontSize: "24px",
    paddingTop: "10px",
};
const pagestyle1 = {
    marginTop: '60px',
    width: '500px',
    marginLeft: "350px",
    overflow: 'auto',
    maxHeight: '560px'
}