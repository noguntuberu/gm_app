/** */
import React from 'react';
import { useSelector } from 'react-redux';

import './payment.css';

const PaymentComponent = props => {
    const { selected } = useSelector(state => state.plans);

    return <div className="row">
        <div className="col-8">
            <div className="address-card shadow-sm">
                <div className="address-card-title">
                    <div className="address-card-title-text">Contact Address</div>
                    <div className="address-card-title-action">
                        <button>Save</button>
                    </div>
                </div>
                <div className="address-card-body">
                    <div className="form-row">
                        <div className="form-group col">
                            <input type="text" className="form-control" placeholder="First name" />
                        </div>
                        <div className="form-group col">
                            <input type="text" className="form-control" placeholder="Last name" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <input className="form-control" placeholder="street address" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="State" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Country" />
                        </div>
                        <div className="col">
                            <select className="form-control">
                                <option value=''>Country</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="address-card shadow-sm">
                <div className="address-card-title">
                    <div className="address-card-title-text">Billing Address</div>
                    <div className="address-card-title-action">
                        <input type="checkbox" className="mr-2" id="billing-address-checkbox"/>
                        <label htmlFor="billing-address-checkbox">Use contact address</label>
                    </div>
                </div>
                <div className="address-card-body">
                    <div className="form-row">
                        <div className="form-group col">
                            <input type="text" className="form-control" placeholder="First name" />
                        </div>
                        <div className="form-group col">
                            <input type="text" className="form-control" placeholder="Last name" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <input className="form-control" placeholder="street address" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="State" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Country" />
                        </div>
                        <div className="col">
                            <select className="form-control">
                                <option value=''>Country</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                Payment Method
            </div>
        </div>
        <div className="col-4">
            <div className="summary-wrapper">
                <div className="summary-title">Purchase Summary</div>
                <div className="summary-plan-name row">
                    <div className="col-8">{selected.name}</div>
                    <div className="col-4 text-right">${selected.amount}</div>
                </div>
                <div className="summary-plan-description">{selected.description}</div>
                <div className="summary-proceed-btn">Proceed</div>
            </div>
        </div>
    </div>
}

export default PaymentComponent;