/** */
import React, { } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { addSelectedPlan } from '../../../../../store/actions/plan';
import './plan-card.css';

const PlanCard = props => {
    const { plan_data, } = props;
    const dispatch = useDispatch();
    const { selected } = useSelector(state => state.plans);

    const isPlanSelected = plan => {
        return selected.id && selected.id === plan.id;
    }

    return <div className={isPlanSelected(plan_data) ? "plan-card selected" : "plan-card"} onClick={() => dispatch(addSelectedPlan(plan_data))}>
        <div className="p-3">
            <h1 className="plan-price w-100 mt-3 mb-4">${plan_data.amount}</h1>
            <h4 className="plan-title w-100 ">{plan_data.name}</h4>
            <div className="plan-description mb-3">
                {plan_data.description || 'This is short description of the plan and its most suitable users.'}
            </div>
            {plan_data.features.map((feature, index) => <div className="plan-features" key={index}>
                <div className="plan-feature">
                    <span className="pr-2">
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    {feature}
                </div>
            </div>)}
        </div>
        {/* {isPlanSelected(plan_data) ? <div className="plan-action"></div> : ''} */}
    </div>
}

export default PlanCard;