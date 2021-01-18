/** */
import React, { useState, } from 'react';
import { determineFormAlertClass, formIsEmpty } from '../../../utilities/form';
import { apiPost, URLS } from '../../../utilities/api/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

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
        apiPost(`${URLS.guests}/register`, { data: data_to_submit, }).then(response => {
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
            <div className="w-100 mt-1">
                {form_message.code > -1 ? <div className={`alert ${determineFormAlertClass(form_message.code)}`}>
                    {form_message.text}
                    <button type="button" className="close" onClick={() => applyFormMessage('', -1)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> : <div></div>}
            </div>
            <div className="form-group">
                <div className="col-6 p-0 pr-1">
                    <input type="text" className="form-control" placeholder="First name"
                        onInput={event => setFormData({ ...form_data, firstname: event.target.value })} />
                </div>
                <div className="col-6 p-0 pl-1">
                    <input type="text" className="form-control" placeholder="Last name"
                        onInput={event => setFormData({ ...form_data, lastname: event.target.value })} />
                </div>
            </div>
            <div className="form-group">
                <input type="email" className="form-control" placeholder="Email Address"
                    onInput={event => setFormData({ ...form_data, email: event.target.value })} />
            </div>
            <div className="form-group">
                <div className="col-6 p-0 pr-1">
                    <input type="password" className="form-control" placeholder="Password"
                        onInput={event => setFormData({ ...form_data, password: event.target.value })} />
                </div>
                <div className="col-6 p-0 pl-1">
                    <input type="password" className="form-control" placeholder="Confirm password"
                        onInput={event => setFormData({ ...form_data, confirm_password: event.target.value })} />
                </div>
            </div>
            <div className="form-group">
                <button type="button" className="gm-btn gm-btn-primary w-100"
                    onClick={() => submitForm()}>
                    Create Account {show_spinner ? <FontAwesomeIcon icon={faSpinner} className="ml-2 fa-spin float-none" /> : <></>}
                </button>
                <button className="gm-btn border border-primary gm-text-primary w-100 mt-3" onClick={() => history.push("/login")}>Log In</button>
            </div>
        </div>
    )
}

export default SignupForm;