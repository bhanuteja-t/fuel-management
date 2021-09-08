import React, { useEffect, useState, useRef } from 'react';
import {
    Segment
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactToPrint from 'react-to-print';
import { getInvoiceByID } from '../../Apicalls';
toast.configure();
const InvoiceDetail_page = (props) => {
    const [order, setOrder] = useState([]);
    const [Change] = useState(false);
    const { id } = props.match.params;
    const preload = (id) => {
        getInvoiceByID(id).then((values) => {
            if (values.error) {
            } else {
                setOrder(values.data);
            }
        });
    };
    useEffect(() => {
        preload(id);
    }, [id, Change]);
    const linkToPrint = () => {
        return (
            <button style={{ borderRadius: '4px', marginLeft: '1000px' }}>Print</button>
        )
    }
    const componentRef = useRef();
    return (
        <Segment>
            {order.map((ord, i) => {
                return (
                    <div >
                        <div ref={componentRef}>
                            <header style={{ textAlign: 'center' }}><b>Invoice Form</b></header>
                            <div class="row mt-1">
                                <div class="col-lg-10 offset-lg-1">
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <span><b>Supplier Name :</b> {ord.supplier}</span>
                                        </div>
                                        <div style={abcd}>
                                            <div >
                                                <div style={{ padding: '8px' }}>Invoice Details</div>
                                                <div style={{ padding: '8px' }}> <span >ID:</span>{ord._id}</div>
                                                <div style={{ padding: '8px' }}><span>Generated Date:</span>{ord.invoiceDate}</div>
                                                <div style={{ padding: '8px' }}> <span>Status:</span> <span class={ord.paymentStatus === 'paid' ? 'badge badge-success badge-pill px-25' : 'badge badge-warning badge-pill px-25'}>{ord.paymentStatus}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div style={{ color: 'black' }} class="col">S.No</div>
                                        <div style={{ color: 'black' }} class="col">Note</div>
                                        <div style={{ color: 'black' }} class="col">Receipt No</div>
                                        <div style={{ color: 'black' }} class="col">Total</div>
                                        <div style={{ color: 'black' }} class="col">GST Amount</div>
                                    </div>
                                    <hr />
                                    <div class="row mt-4">
                                        <div class="col">1</div>
                                        <div class="col">{ord.note}</div>
                                        <div class="col">{ord.receiptNo}</div>
                                        <div class="col">{ord.invoiceTotal}</div>
                                        <div class="col">{ord.gstAmount}</div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div>
                            <ReactToPrint trigger={linkToPrint}
                                pageStyle='@page { size: auto; margin-top: 70px;border: 0.1px solid rgba(34, 36, 38, 0.5); } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'
                                content={() => componentRef.current} />
                        </div>
                    </div>
                );
            })}
        </Segment>
    );
};
export default InvoiceDetail_page;
const abcd = {
    marginLeft: window.innerwidth <= 800 ? "700px" : "730px"
}