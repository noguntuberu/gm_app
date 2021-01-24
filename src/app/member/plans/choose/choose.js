/** */
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { useQuery } from '../../../../utilities/hooks/query';
import React, { useEffect, useState } from 'react';
import * as PlanService from '../../../../services/plan';
import * as PaymentService from '../../../../services/payment';
import PlanCard from './plan-card/plan-card';

const PlanSelectionComponent = props => {
    // const history = useHistory();
    const query = useQuery();
    let { selected } = useSelector(state => state.plans);
    selected = selected || {};
    const { id } = useSelector(state => state.user_data);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const status = query.get('status');
        const tx_ref = query.get('txRef');
        if (status && status === "success") {
            PaymentService.verify({
                data: { plan: selected, tx_ref, tenant_id: id }
            }).then(response => {
                const { error } = response;
                if (error) toast.error(`Transaction verification error.`);
                else alert(`Payment successful`);
            });
        }

        PlanService.read({}).then(response => {
            const { payload } = response;
            if (payload) {
                setPlans(payload);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const makePayment = (link) => {
        window.location = link;
    }

    return <div className="row">
        <div className="col-8">
            {plans.map(plan => <PlanCard plan_data={plan} key={plan.id} />)}
        </div>
        <div className="col-4">
            <div className="shadow summary-wrapper">
                <div className="summary-title">Purchase Summary</div>
                <div className="summary-plan-name row">
                    <div className="col-8">{selected.name}</div>
                    <div className="col-4 text-right">${selected.amount}</div>
                </div>
                <div className="summary-plan-description">{selected.description}</div>
                <div className="summary-proceed-btn" onClick={() => makePayment(selected.payment_link)}>Make Payment</div>
            </div>
        </div>
    </div>
}

export default PlanSelectionComponent;