
import React, { useState, useEffect } from 'react';
import { Button, Form, Segment, Divider, Dropdown } from 'semantic-ui-react';
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { create_invoicesheet, getdeliveryDocket, getinvoices, getsiteorsupplier } from '../../Apicalls';
import { isAuthenticated } from '../../Auth';
var totaldocketlist = [];
function Create_invoice() {
    const currentuser = isAuthenticated();
    const uid = currentuser.data.user.userid;
    const notify = () => {
        toast.success(<h3>Invoice Created Successfully</h3>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    const [docket, setDocket] = useState({
        docketlist: [],
    })
    const { docketlist } = docket;
    const [supplierlist, setSupplierlist] = useState({
        listofsuppliers: [],
        sitelist: []
    })
    const { listofsuppliers } = supplierlist
    const [invoices, setInvoices] = useState({
        invoiceId: "",
        supplier: "",
        receiptNo: "",
        invoiceDate: "",
        paymentStatus: "",
        invoiceTotal: "",
        gstAmount: "",
        image_url: "",
        matchingDeliverDocket: "",
        dueDate: "",
        modeofPayment: "",
        departmentDescription: "",
        invoiceType: "",
        note: "",
        suppliersnamelist: [],
        formData: new FormData(),
    });
    const { invoiceId, supplier, invoiceDate, departmentDescription,  dueDate, modeofPayment, receiptNo, invoiceTotal, note, formData } = invoices;
    const [radio, setRadio] = useState();
    const [radio1, setRadio1] = useState();
    const [errors] = useState({
        supplierErr: "Select Supllier",
        invoicedateErr: "Select Date",
        invoicenumberErr: "Provide Invoice Number",
        invoicetotalErr: "Provide Invoice Total",
        desingationErr: "Designation is Required",
        gstamountErr: "Enter GST Amount",
        receiptnumberErr: "Enter Receipt Number",
        paymentstatusErr: "Select Payment Status",
        imageErr: "Select Image",
        noteErr: "Enter your Notes"
    });
    const {
        invoicedateErr,
        invoicenumberErr,
        receiptnumberErr,
        noteErr
    } = errors;
    const handleChange1 = (name) => (event) => {
        const value = name === 'image_url' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setInvoices({ ...invoices, [name]: value });
    };
    const updatedpaymentvalue = (e, data) => {
        formData.set('paymentStatus', data.value);
    }
    const updatedpaymentvalue1 = (e, data) => {
        formData.set('paymentStatus', data.value)
    }
    const updatedinvoicetypevalue = (e, data) => {
        formData.set('invoiceType', data.value);
    }
    const updatedinvoicetypevalue1 = (e, data) => {
        formData.set('invoiceType', data.value)
    }

    const invoicecreate = (event) => {
        if (isValid()) {
            setInvoices({ ...invoices, error: "", loading: true });
            let gstvalue = document.getElementById('gstamount').value;
            formData.set('gstAmount', gstvalue)
            formData.set('userid', uid);
            create_invoicesheet(formData).then((data) => {
                if (data.error) {
                    setInvoices({ ...invoices, error: data.error });
                } else {
                    setInvoices({
                        ...invoices,
                        invoiceId: '',
                        invoiceDate: '',
                        supplier: '',
                        receiptNo: '',
                        paymentStatus: '',
                        invoiceTotal: '',
                        dueDate: '',
                        modeofPayment: '',
                        matchingDeliverDocket: '',
                        invoiceType: '',
                        image_url: '',
                        departmentDescription: '',
                        gstAmount: '',
                        note: '',
                    });
                    notify();
                }
                history.push("/dashboard")
            });
        }
    };
    const preload = () => {
        getinvoices().then((data) => {
            if (data.error) {
                setInvoices({ ...invoices, error: data.error });
            } else {
                setInvoices({
                    ...invoices,
                    suppliersnamelist: data.data.allInvoicesList,
                });
            }
        });
        getdeliveryDocket().then((data) => {
            if (data.error) {
                setDocket({ ...docket, error: data.error });
            } else {
                setDocket({
                    ...docket,
                    docketlist: data.data.alldeliveryDockets,
                });
            }
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
    useEffect(() => {
        preload();
    }, []);
    const updatedpvalue = (e, data) => {
        formData.set('supplier', data.value)
        var varrrrr = formData.get('supplier')
        for (let j = 0; j < docketlist.length; j++) {
            if (docketlist[j].supplier && docketlist[j].supplier === varrrrr) {
                totaldocketlist.push(docketlist[j].DocketNo);
            }
        }
        return totaldocketlist;
    };
    const isValid = () => {
        if (
            !supplier.length > 0 &&
            !invoiceId > 0 &&
            !invoiceDate > 0 &&
            !receiptNo > 0 &&
            !note > 0
        ) {
            toast.error("All Fields Are Mandatory", {
                position: toast.POSITION.TOP_CENTER,
            });
            return false;
        }
        else if (!invoiceDate.length > 0) {
            toast.error(invoicedateErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        else if (!invoiceId.length > 0) {
            toast.error(invoicenumberErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        else if (!receiptNo.length > 0) {
            toast.error(receiptnumberErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        else if (!note.length > 0) {
            toast.error(noteErr, { position: toast.POSITION.TOP_RIGHT });
            return false;
        }
        return true;
    };
    const history = useHistory();
    function invoiceclose() {
        history.push("/dashboard")
    }
    const fakelist = listofsuppliers.map((obj) => ({
        key: obj.name,
        text: obj.name,
        value: obj.name
    }));
    const setHidefunction = (e, data) => {
        setRadio(data.value)
    }
    const setHidefunction1 = (e, data) => {
        setRadio1(data.value)
    }
    return (
        <div>
            <Segment style={ddd}>
                <Form enctype="multipart/form-data">
                    <header style={headerstyle}>
                        <b>Create Invoice</b>
                    </header>
                    <Divider />
                    <Form.Group style={{ paddingTop: "10px" }} widths={2}>
                        <Form.Field widths="half"><b>Supplier's <span style={{ color: "red" }} >*</span></b>
                            <Dropdown style={{ margin: '5px' }}
                                placeholder='Select Supplier'
                                fluid
                                search
                                selection
                                onChange={(e, data) => updatedpvalue(e, data)}
                                options={fakelist}
                            />
                        </Form.Field>
                        <Form.Input
                            label="Invoice Date"
                            type="date"
                            value={invoiceDate}
                            onChange={handleChange1("invoiceDate")}
                        />
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input
                            label="Invoice No"
                            type="number"
                            value={invoiceId}
                            onChange={handleChange1("invoiceId")}
                        />
                        <Form.Input
                            label="Invoice Total"
                            type="number"
                            value={invoiceTotal}
                            onChange={handleChange1("invoiceTotal")}
                        />
                    </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input
                            id='gstamount'
                            label="GST Amount"
                            type="number"
                            value={(invoiceTotal - (invoiceTotal / 1.1))}
                        />
                        <Form.Input
                            label="Receipt No"
                            type="number"
                            value={receiptNo}
                            onChange={handleChange1("receiptNo")}
                        />
                    </Form.Group>
                    <Form.Field>
                        <label>Matching Deliver Docket</label>
                        <select name="matchingDeliverDocket" id="matchingDeliverDocket" onChange={handleChange1("matchingDeliverDocket")}>
                            <option>Select</option>
                            {totaldocketlist &&
                                totaldocketlist.map((value, index) => (
                                    <option key={index} value={value}>
                                        {value}
                                    </option>
                                ))}
                        </select>
                    </Form.Field>
                    <Form.Group widths={2}>
                        <Form.Field widths="half">
                            <label>Mode of Payment</label>
                            <select
                                name="Category"
                                id="Category"
                                value={modeofPayment}
                                onChange={handleChange1("modeofPayment")}
                            >
                                <option value="">Select</option>
                                <option value="BPay">BPay</option>
                                <option value="Cash">Cash</option>
                                <option value="Cheque">Cheque</option>
                                <option value="EFT">EFT</option>
                            </select>
                        </Form.Field>
                        <Form.Input
                            label="Due Date"
                            type="date"
                            value={dueDate}
                            onChange={handleChange1("dueDate")}
                        />
                    </Form.Group>
                    <Form.Group inline>
                        <label>PaymentStatus : <span style={{ color: "red" }} >*</span></label>
                        Paid<input style={{ margin: '5px' }} type='radio' name="paymentStatus" label="Paid" checked={radio === "paid" ? true : false} value="paid" onChange={(e) => updatedpaymentvalue(e, e.target)} onClick={(e) => setHidefunction(e, e.target)} />
                        UnPaid<input style={{ margin: '5px' }} type='radio' name="paymentStatus" label="Un Paid" checked={radio === "unpaid" ? true : false} value="unpaid" onChange={(e) => updatedpaymentvalue1(e, e.target)} onClick={(e) => setHidefunction(e, e.target)} />
                    </Form.Group>
                    <Form.Group inline>
                        <label>Invoice Type : <span style={{ color: "red" }} >*</span></label>
                        Purchase<input style={{ margin: '5px' }} type='radio' name="invoiceType" label="Purchase" checked={radio1 === "Purchase" ? true : false} value="Purchase" onChange={(e) => updatedinvoicetypevalue(e, e.target)} onClick={(e) => setHidefunction1(e, e.target)} />
                        Expense<input style={{ margin: '5px' }} type='radio' name="invoiceType" label="Expense" checked={radio1 === "Expense" ? true : false} value="Expense" onChange={(e) => updatedinvoicetypevalue1(e, e.target)} onClick={(e) => setHidefunction1(e, e.target)} />
                    </Form.Group>
                    <Form.Group widths={2}>
                        <div style={{ overflow: 'hidden', paddingTop: '0.678571em', paddingRight: '1em', paddingBottom: '0.678571em', paddingLeft: '1em' }}>
                            <Form.Field>
                                <label>Upload Image <span style={{ color: "red" }} >*</span></label>
                                <input
                                    type="file"
                                    name="image_url"
                                    accept="image/png image/jpeg image/jpg"
                                    onChange={handleChange1('image_url')}
                                    className="form-control"
                                />
                            </Form.Field>
                        </div>
                    </Form.Group>
                    <Form.TextArea
                        label="Notes"
                        placeholder="Your Notes..."
                        value={note}
                        onChange={handleChange1("note")}
                    />
                    <Form.TextArea
                        label="Department Description"
                        placeholder="Your Description..."
                        value={departmentDescription}
                        onChange={handleChange1("departmentDescription")}
                    />
                    <div style={btnstyle}>
                        <Button color="blue" onClick={invoicecreate}>Create Invoice</Button>
                        <Button color="black" onClick={() => invoiceclose()}>Cancel</Button>
                    </div>
                </Form>
            </Segment>
        </div>
    );
}
export default Create_invoice;
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
    marginLeft: '350px',
    overflowY: window.innerWidth <= 800 ? "scroll" : "null",
    overflowX: window.innerWidth <= 800 ? "scroll" : "null",
    width: window.innerWidth <= 800 ? "380px" : "500px",
}