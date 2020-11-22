import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { activateAccount } from '../../../store/actions/user-data';
import { ACCOUNT_ACTIVATION, set_process } from '../../../store/actions/process';

const AccountActivation = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const account_activation = useSelector((state) => state.processes[ACCOUNT_ACTIVATION]);

    const [is_activating, setIsActivating] = useState(true);
    const [activation_status, setActivationStatus] = useState(false);

    useEffect(() => {
        dispatch(activateAccount(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!account_activation || !Object.keys(account_activation).length) return;

        setIsActivating(false);
        const { error, payload, success, } = account_activation;
        if (!success && error) {
            setActivationStatus(false);
        }

        if (success && payload) {
            setActivationStatus(true);
        }

        dispatch(set_process(ACCOUNT_ACTIVATION, {}));
    }, [account_activation, dispatch]);

    const displayActivationResult = () => {
        if (activation_status) {
            return <div>Account Activation Successful</div>;
        }

        return <div>Could not activate account. Please try again later.</div>;
    }

    return (
        <div>
            { is_activating ? <div> Activating your account. Please wait... </div> : displayActivationResult()}
        </div>
    );
}

export default AccountActivation;