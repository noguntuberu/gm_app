/** */
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { useQuery } from '../../../../utilities/hooks/query';
import React, { useEffect, useState } from 'react';

import PlanCard from './plan-card/plan-card';
import { apiGet, URLS, apiPost } from '../../../../utilities/api/api';

const PlanSelectionComponent = props => {
    // const history = useHistory();
    const query = useQuery();
    const { selected } = useSelector(state => state.plans);
    const { id } = useSelector(state => state.user_data);
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const status = query.get('status');
        const tx_ref = query.get('txRef');
        if (status && status === "success") {
            apiPost(`${URLS.payments}/rave/verification`, {
                data: { plan: selected, tx_ref, tenant_id: id }
            }).then(response => {
                const { error } = response;
                if (error) alert(error);
                else alert(`Payment successful`);
            });
        }

        apiGet(`${URLS.plans}`, {}).then(response => {
            const { payload } = response;
            if (payload) {
                setPlans(payload);
            }
        });
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