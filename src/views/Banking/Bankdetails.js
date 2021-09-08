import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button, Form, Segment, Divider, Dropdown } from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addbankdetails, getusers } from "../../Apicalls";
toast.configure();
function Bankdetails() {
    const notify = () => {
        toast.success(<h3>Bank Details Saved Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const [errors] = useState({
        banknameErr: "Bank Name is Required",
        accountNameErr: "Account Name is Required",
        BSBErr: "BSB is Required",
        accountNumberErr: "Account Number is Required",
        superrErr: "Super is Required",
        fundNameErr: "Fund Name is Required",
        fundIdErr: "Fund ID is Required",
        fundUSIErr: "Fund USI is Required"
    });
    const {
        banknameErr,
        accountNameErr,
        BSBErr,
        accountNumberErr,
        superrErr,
        fundNameErr,
        fundIdErr,
        fundUSIErr,
    } = errors;
    const history = useHistory();
    const [userlist,setUserlist] = useState([]);
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
    const Adduserbtn = (event) => {
        event.preventDefault();
        if (isValid()) {
            setValues({ ...values, error: "", loading: true });       
            addbankdetails(values).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        userid:data.userid,
                        bankName: data.bankName,
                        accountName: data.accountName,
                        BSB: data.BSB,
                        accountNumber: data.accountNumber,
                        superr: data.superr,
                        fundName: data.fundName,
                        fundId: data.fundId,
                        fundUSI: data.fundUSI,
                    });
                    notify();
                }
                history.push("/dashboard");
            }
            );
        }
    };
    const isValid = () => {
        if (
            !bankName.length > 0 &&
            !accountName > 0 &&
            !BSB > 0 &&
            !accountNumber > 0 &&
            !superr > 0 &&
            !fundName > 0 &&
            !fundId > 0 &&
            !fundUSI > 0
        ) {
            toast.error("All Fields Are Mandatory", {
                position: toast.POSITION.TOP_CENTER,
            });
            return false;
        } else if (!bankName.length > 0) {
            toast.error(banknameErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        else if (!accountName.length > 0) {
            toast.error(accountNameErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        else if (!BSB.length > 0) {
            toast.error(BSBErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        } else if (!accountNumber.length > 0) {
            toast.error(accountNumberErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        } else if (!superr.length > 0) {
            toast.error(superrErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        } else if (!fundName.length > 0) {
            toast.error(fundNameErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        else if (!fundId.length > 0) {
            toast.error(fundIdErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        } else if (!fundUSI.length > 0) {
            toast.error(fundUSIErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        return true;
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
    }
    useEffect(() => {
        preload()
      }, []);
var usernames = userlist.map((obj) => ({
    key: obj._id,
    text: obj.first_name,
    value: obj._id
}));
const updatedpvalue = (e, data) => {
    setValues({ ...values, userid: data.value });
};
    return (
        <Segment style={pagestyle1}>
            <Form>
                <header style={headerstyle}>
                    <b>Bank Details</b>
                </header>
                <Divider />
                <Form.Field widths="half"><b>User's List <span style={{ color: "red" }} >*</span></b>
                            <Dropdown style={{ margin: '5px' }}
                                placeholder='Select Supplier'
                                fluid
                                search
                                selection
                                onChange={(e, data) => updatedpvalue(e, data)}
                                options={usernames}
                            />
                        </Form.Field>
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
export default Bankdetails;
const headerstyle = {
    textAlign: "center",
    color: "grey",
    fontSize: "24px",
    paddingTop: "10px",
};
const pagestyle1 = {
    marginTop: window.innerWidth <= 800 ?'':'60px',
    width: window.innerWidth <= 800 ?'':'500px',
    marginLeft: window.innerWidth <= 800 ?'':"350px",
    overflow: window.innerWidth <= 800 ?'':'auto',
    maxHeight: window.innerWidth <= 800 ?'':'560px'
}
