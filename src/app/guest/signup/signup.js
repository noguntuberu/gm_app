/** */
import React, { useState, } from 'react';
import InfoCard from '../info-card/info-card';
import { determineFormAlertClass, formIsEmpty } from '../../../utilities/form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

import * as GuestService from '../../../services/guest';

const SignupForm = () => {
    const history = useHistory();
    const [form_data, setFormData] = useState({});
    const [form_message, setFormMessage] = useState({ code: -1 });
    const [show_spinner, setSpinner] = useState(false);


    const applyFormMessage = (text, code = 0) => {
        setFormMessage({ code, text })
    }

    const submitForm = () => {
        if (formIsEmpty(form_data)) {
            applyFormMessage(`Please fill all fields.`);
            return;
        }

        if (form_data.password !== form_data.confirm_password) {
            applyFormMessage(`Passwords do not match.`);
            return;
        }

        let data_to_submit = { ...form_data };
        delete data_to_submit.confirm_password;

        setSpinner(true);
        GuestService.signup({ data: data_to_submit, }).then(response => {
            const { error, payload } = response;
            if (error) {
                applyFormMessage(error);
                return;
            }

            applyFormMessage(payload, 1);
        }).finally(() => setSpinner(false));
    };
 
    return (
        <div>
            <InfoCard bg_class="gm-bg-blue-3" />
            <div className="form-wrapper flex-col-center">
                <div className="w-100 mt-1">
                    {form_message.code > -1 ? <div className={`alert ${determineFormAlertClass(form_message.code)}`}>
                        {form_message.text}
                        <button type="button" className="close" onClick={() => applyFormMessage('', -1)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> : <div></div>}
                </div>
                <div className="form-switch-wrapper text-blue-4">
                    <div onClick={() => history.push("/login")}>Already a member? <b>Log In</b></div>
                </div>
                <div className="form-row">
                    <div className="gm-input-group">
                        <input type="text" className="gm-input" placeholder="First name"
                            onInput={event => setFormData({ ...form_data, firstname: event.target.value })} />
                    </div>
                    <div className="gm-input-group">
                        <input type="text" className="gm-input" placeholder="Last name"
                            onInput={event => setFormData({ ...form_data, lastname: event.target.value })} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="gm-input-group">
                        <input type="email" className="gm-input" placeholder="Email Address"
                            onInput={event => setFormData({ ...form_data, email: event.target.value })} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="gm-input-group">
                        <input type="password" className="gm-input" placeholder="Password"
                            onInput={event => setFormData({ ...form_data, password: event.target.value })} />
                    </div>
                    <div className="gm-input-group">
                        <input type="password" className="gm-input" placeholder="Confirm password"
                            onInput={event => setFormData({ ...form_data, confirm_password: event.target.value })} />
                    </div>
                </div>
                <div className="form-row mt-2">
                    <div className="gm-input-group">
                        <button type="button" className="gm-btn gm-btn-blue"
                            onClick={() => submitForm()}>
                            Create Account {show_spinner ? <FontAwesomeIcon icon={faSpinner} className="ml-2 fa-spin float-none" /> : <></>}
                        </button>
                    </div>
                </div>
                <div className="form-row mt-3">
                    <div className="gm-input-group text-center px-2 word-wrap">
                        <span className="text-blue-5" >By continuing, you agree to our <b>terms</b> and <b>policies</b>.</span>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default SignupForm;