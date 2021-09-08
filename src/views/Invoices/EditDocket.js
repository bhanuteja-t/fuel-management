import React, { useState, useEffect } from 'react';
import { Button, Form, Segment, Dropdown } from 'semantic-ui-react';
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getdeliveryDocketByID, getsiteorsupplier, UpdatedeliveryDocket } from '../../Apicalls';
import { isAuthenticated } from '../../Auth';
function EditDocket(props) {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const [supplierlist, setSupplierlist] = useState({
        listofsuppliers: [],
        sitelist: []
    })
    const { listofsuppliers } = supplierlist
    const [docket, setDocket] = useState({
        userid: uid,
        Date: "",
        DocketNo: "",
        TempDocketNo: "",
        note: "",
        supplier: "",
    });
    const { Date, DocketNo, TempDocketNo, note, supplier } = docket;
    const namelistofsuppliers = listofsuppliers.map((obj) => ({
        key: obj.name,
        text: obj.name,
        value: obj.name
    }));
    const notify = () => {
        toast.success(<h3>Docket Updated Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const updatedpvalue = (e, data) => {
        setDocket({ ...docket, supplier: data.value });
    };
    const handleChange = (name) => (event) => {
        const value = event.target.value;
        setDocket({ ...docket, [name]: value });
    };
    const docketcreate = (event) => {
        event.preventDefault();
        UpdatedeliveryDocket(param,docket).then((data) => {
            if (data.error) {
                setDocket({ ...docket, error: data.error });
            } else {
                setDocket({
                    ...docket,
                    Date: data.Date,
                    DocketNo: data.DocketNo,
                    TempDocketNo: data.TempDocketNo,
                    note: data.note
                });
                notify();
            }
            isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
                history.push("/Docketsearch")
                )
                isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                    history.push("/Docketlist")
                    )
        });
    };
    const preload = (param) => {
        getdeliveryDocketByID(param).then((data) => {
          setDocket({
            Date: data.data[0].Date,
            DocketNo: data.data[0].DocketNo,
            TempDocketNo: data.data[0].TempDocketNo,
            supplier: data.data[0].supplier,
            note: data.data[0].note,
            formData: new FormData(),
          });
        });
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
      };
      const param = props.match.params.id;
      useEffect(() => {
        preload(param);
      }, [param]); 
    const history = useHistory();
    function invoiceclose() {
        isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (
            history.push("/Docketsearch")
            )
            isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (
                history.push("/Docketlist")
                )
    }
    return (
        <div>
            <Segment style={ddd}>
                <Form>
                    <header style={headerstyle}>
                        <b>Delivery Docket Entry</b>
                    </header>
                    <Form.Group style={{ paddingTop: "10px" }} widths={2}>
                        <Form.Input
                            label="Date"
                            type="date"
                            value={Date}
                            onChange={handleChange("Date")}
                        />
                        <Form.Input
                            label="Docket No"
                            type="text"
                            value={DocketNo}
                            onChange={handleChange("DocketNo")}
                        />
                    </Form.Group>
                    <Form.Group widths={2}>
                    <Form.Field widths="half"><b>Supplier's <span style={{ color: "red" }} >*</span></b>
                            <Dropdown style={{ margin: '5px' }}
                                placeholder='Select Supplier'
                                fluid
                                search
                                selection
                                value={supplier}
                                onChange={(e, data) => updatedpvalue(e, data)}
                                options={namelistofsuppliers}
                            />
                            </Form.Field>
                        <Form.Input
                            label="Temporary Docket No"
                            type="text"
                            value={TempDocketNo}
                            onChange={handleChange("TempDocketNo")}
                        />
                    </Form.Group>
                    <Form.TextArea
                        label="Notes"
                        placeholder="Your Notes..."
                        value={note}
                        onChange={handleChange("note")}
                    />
                    <div style={btnstyle}>
                        <Button color="green" onClick={docketcreate} >
                            Update Docket
                        </Button>
                        <Button color="black" onClick={() => invoiceclose()}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Segment>
        </div>
    );
}
export default EditDocket;
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
    marginLeft: '340px',
    marginTop: '70px',
    overflowY: window.innerWidth <= 800 ? "scroll" : "null",
    overflowX: window.innerWidth <= 800 ? "scroll" : "null",
    width: window.innerWidth <= 800 ? "380px" : "500px",
}