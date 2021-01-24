import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { apiGet, URLS } from '../../../utilities/api/api';

const AccountActivation = () => {
    const { id } = useParams();
    const history = useHistory();

    const [is_activating, setIsActivating] = useState(true);
    const [activation_status, setActivationStatus] = useState(false);

    useEffect(() => {
        setIsActivating(true);
        apiGet(`${URLS.guests}/activation/${id}`).then(response => {
            setIsActivating(false);
            const { error, } = response;
            if (error) {
                setActivationStatus(false);
                return;
            }

            //
            setActivationStatus(true);
        });
    }, [id]);

    const displayActivationResult = () => {
        if (activation_status) {
            return <div>
                Account Activation Successful.
                <span className="gm-text-primary float-none pl-2 is-clickable" onClick={() => history.push('/login')}><b className="float-none">Log In.</b></span>
            </div>;
        }

        return <div>Could not activate account. Please try again later.</div>;
    }

    return (
        <div className="py-3 text-center">
            {is_activating ? <div> Activating your account. Please wait... </div> : displayActivationResult()}
        </div>
    );
}

export default AccountActivation;