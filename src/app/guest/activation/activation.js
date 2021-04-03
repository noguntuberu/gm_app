import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import * as GuestService from '../../../services/guest';
import InfoCard from '../info-card/info-card';

const AccountActivation = () => {
    const { id } = useParams();
    const history = useHistory();

    const [is_activating, setIsActivating] = useState(true);
    const [activation_status, setActivationStatus] = useState(false);

    useEffect(() => {
        setIsActivating(true);
        GuestService.activate(id).then(response => {
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

    return <div>
        <InfoCard />
        <div className="form-wrapper flex-col-center">
            <div className="py-3 text-center text-blue-4">
                {is_activating ? <div> Activating your account. Please wait... </div> : displayActivationResult()}
            </div>
        </div>
    </div>
}

export default AccountActivation;