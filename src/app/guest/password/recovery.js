import React, { useState } from 'react';

import { determineFormAlertClass, formIsEmpty } from '../../../utilities/form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import * as GuestService from '../../../services/guest';

const PasswordRecovery = () => {
    const [form_data, setFormData] = useState({});
    const [form_message, setFormMessage] = useState({ code: -1 });
    const [is_loading, setIsLoading] = useState(false);

    const applyFormMessage = (text, code = 0) => {
        setFormMessage({ code, text })
    }

    const submitForm = () => {
        if (formIsEmpty(form_data)) {
            applyFormMessage(`Please fill all fields.`);
            return;
        }

        if (!form_data.email) {
            applyFormMessage(`Invalid Email Address.`);
            return;
        }

        setIsLoading(true);
        GuestService.recoverPassword({ data: form_data }).then( response => {
            const {error, payload} = response;

            if(error) {
                applyFormMessage(error);
                return;
            }

            applyFormMessage(payload, 1);
        }).finally(() => setIsLoading(false));
    }

    return (
        <div>
            <div className="w-100 mt-1">
                {form_message.code > -1 ? <div className={`alert ${determineFormAlertClass(form_message.code)}`}>
                    {form_message.text}
                    <button type="button" className="close" onClick={() => applyFormMessage('', -1)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> : <div></div>}
            </div>
            <div className="form-group">
                <input type="email" className="form-control" placeholder="Email Address"
                    onInput={event => setFormData({ ...form_data, email: event.target.value })} />
            </div>
            <div className="form-group">
                <button className="gm-btn gm-btn-primary w-100"
                    onClick={() => submitForm()}>
                    Recover Password
                    {is_loading ? <FontAwesomeIcon icon={faSpinner} className="ml-2 fa-spin float-none" /> : <span></span>}
                </button>
            </div>
        </div>
    )
}

export default PasswordRecovery;