import React, { useState, useEffect } from 'react';
import { Button, Form, Segment, Divider, Dropdown } from 'semantic-ui-react';
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getdeliveryDocket, getInvoiceByID, getsiteorsupplier, UpdateInvoiceByID } from '../../Apicalls';
import { isAuthenticated } from '../../Auth';
var totaldocketlist = [];
function EditInvoice(props) {
    const param = props.match.params.id;
    const notify = () => {
        toast.success(<h3>Invoice Updated Successfully</h3>, {
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
        dueDate: "",
        modeofPayment: "",
        invoiceType: "",
        matchingDeliverDocket: "",
        gstAmount: "",
        image_url: "",
        note: "",
        departmentDescription:"",
        formData: new FormData()
    });
    const { invoiceId, supplier, matchingDeliverDocket,departmentDescription, invoiceDate, paymentStatus, modeofPayment, dueDate, receiptNo, invoiceTotal, note, formData } = invoices;
    const [radio, setRadio] = useState(0);
    const [radio1, setRadio1] = useState();
    const updatedinvoicetypevalue = (e, data) => {
        formData.set('invoiceType', data.value);
    }
    const updatedinvoicetypevalue1 = (e, data) => {
        formData.set('invoiceType', data.value)
    }
    const setHidefunction1 = (e, data) => {
        setRadio1(data.value)
    }
    const handleChange1 = (name) => (event) => {
        const value = name === 'image_url' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setInvoices({ ...invoices, [name]: value });
    };
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
    const updatedpaymentvalue = (e, data) => {
        formData.set('paymentStatus', data.value);
    }
    const updatedpaymentvalue1 = (e, data) => {
        formData.set('paymentStatus', data.value)
    }
    const history = useHistory();
    function invoiceclose() {
        isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (history.push("/InvoicelistforSAdmin"))
        isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (history.push("/Invoiceslist"))
    }
    const preload = (param) => {
        getInvoiceByID(param).then((data) => {
            setInvoices({
                invoiceId: data.data[0].invoiceId,
                invoiceDate: data.data[0].invoiceDate,
                supplier: data.data[0].supplier,
                receiptNo: data.data[0].receiptNo,
                paymentStatus: data.data[0].paymentStatus,
                invoiceTotal: data.data[0].invoiceTotal,
                image_url: data.data[0].image_url,
                modeofPayment: data.data[0].modeofPayment,
                dueDate: data.data[0].dueDate,
                invoiceType: data.data[0].invoiceType,
                matchingDeliverDocket: data.data[0].matchingDeliverDocket,
                gstAmount: data.data[0].gstAmount,
                note: data.data[0].note,
                departmentDescription: data.data[0].departmentDescription,
                formData: new FormData(),
            });
            setRadio(data.data[0].paymentStatus)
            setRadio1(data.data[0].invoiceType)
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
        preload(param);
    }, [param]);
    const invoicecreate = (event) => {
        event.preventDefault();
        let gstvalue = document.getElementById('gstamount').value;
        formData.set('gstAmount',gstvalue)
        UpdateInvoiceByID(param, formData).then((data) => {
            if (data && data.error) {
                setInvoices({ ...invoices, error: data.error });
            } else {
                setInvoices({
                    ...invoices,
                    invoiceId: '',
                    invoiceDate: '',
                    supplier: '',
                    receiptNo: '',
                    invoiceType: '',
                    dueDate: '',
                    matchingDeliverDocket: '',
                    modeofPayment: '',
                    paymentStatus: '',
                    invoiceTotal: '',
                    image_url: '',
                    gstAmount: '',
                    note: '',
                    departmentDescription:''
                });
                notify();
            }
            isAuthenticated() && isAuthenticated().data.user.designation === 'SuperAdmin' && (history.push("/InvoicelistforSAdmin"))
            isAuthenticated() && isAuthenticated().data.user.designation === 'manager' && (history.push("/Invoiceslist"))
        });
    };
    const namelistofsuppliers = listofsuppliers.map((obj) => ({
        key: obj.name,
        text: obj.name,
        value: obj.name
    }));
    const setHidefunction = (paidOrUnpaid) => {
        setRadio(paidOrUnpaid)
    }
    return (
        <div>
            <Segment style={ddd}>
                <Form enctype="multipart/form-data">
                    <header style={headerstyle}>
                        <b>Edit Invoice</b>
                    </header>
                    <Divider />
                    <Form.Group style={{ paddingTop: "10px" }} widths={2}>
                        <Form.Field widths="half"><b>Supplier</b>
                            <Dropdown style={{ margin: '5px' }}
                                placeholder='Select Supplier'
                                fluid
                                search
                                selection
                                disabled
                                value={supplier}
                                onChange={(e, data) => updatedpvalue(e, data)}
                                options={namelistofsuppliers}
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
                            type="text"
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
                        value={(invoiceTotal-(invoiceTotal/1.1))}
                        />
                        <Form.Input
                            label="Receipt No"
                            type="text"
                            value={receiptNo}
                            onChange={handleChange1("receiptNo")}
                        />
                    </Form.Group>
                    <Form.Field>
                        <label>Matching Deliver Docket</label>
                        <select disabled name="matchingDeliverDocket" id="matchingDeliverDocket" onChange={handleChange1("matchingDeliverDocket")}>
                            <option>{matchingDeliverDocket}</option>
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
                        <label defaultValue={paymentStatus}>PaymentStatus : </label>
                        Paid<input style={{ margin: '5px' }} type='radio' name="paymentStatus" label="Paid" checked={radio === "paid" ? true : false} value="paid" onChange={(e) => updatedpaymentvalue(e, e.target)} onClick={(e) => setHidefunction("paid")} />
                        UnPaid<input style={{ margin: '5px' }} type='radio' name="paymentStatus" label="Un Paid" checked={radio === "unpaid" ? true : false} value="unpaid" onChange={(e) => updatedpaymentvalue1(e, e.target)} onClick={(e) => setHidefunction("unpaid")} />
                    </Form.Group>
                    <Form.Group inline>
                        <label>Invoice Type : <span style={{ color: "red" }} >*</span></label>
                        Purchase<input style={{ margin: '5px' }} type='radio' name="invoiceType" label="Purchase" checked={radio1 === "Purchase" ? true : false} value="Purchase" onChange={(e) => updatedinvoicetypevalue(e, e.target)} onClick={(e) => setHidefunction1(e, e.target)} />
                        Expense<input style={{ margin: '5px' }} type='radio' name="invoiceType" label="Expense" checked={radio1 === "Expense" ? true : false} value="Expense" onChange={(e) => updatedinvoicetypevalue1(e, e.target)} onClick={(e) => setHidefunction1(e, e.target)} />
                    </Form.Group>
                    <Form.Group widths={2}>
                        <div style={{ overflow: 'hidden', paddingTop: '0.678571em', paddingRight: '1em', paddingBottom: '0.678571em', paddingLeft: '1em' }}>
                            <Form.Field>
                                <label>Upload Image </label>
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
                        <Button color="green" onClick={invoicecreate}>Update Invoice</Button>
                        <Button color="black" onClick={() => invoiceclose()}>Cancel</Button>
                    </div>
                </Form>
            </Segment>
        </div>
    );
}
export default EditInvoice;
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
    marginLeft: window.innerWidth <= 800 ?'': '350px',
    overflowY: window.innerWidth <= 800 ? "scroll" : "null",
    overflowX: window.innerWidth <= 800 ? "scroll" : "null",
    width: window.innerWidth <= 800 ? "380px" : "500px",
}