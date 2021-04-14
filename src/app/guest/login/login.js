/** */
import React, { useState } from 'react';
import { useDispatch, } from 'react-redux';

import * as GuestService from '../../../services/guest';
import { addDataToStore } from '../../../store/actions/user-data';
import { determineFormAlertClass, formIsEmpty } from '../../../utilities/form';
import InfoCard from '../info-card/info-card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const [form_data, setFormData] = useState({});
    const [form_message, setFormMessage] = useState({ code: -1 });
    const [is_login_loading, setLoginLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

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

        setLoginLoading(true);
        GuestService.login({ data: form_data }).then(response => {
            const { error, payload } = response;
            if (error) {
                applyFormMessage(error);
                return;
            }

            dispatch(addDataToStore(payload));
        }).finally(() => setLoginLoading(false));
    }
 
    return <div>
        <InfoCard bg_class="gm-bg-blue-2"/>
        <div className="form-wrapper flex-col-center">
            <div className="form-switch-wrapper text-blue-4">
                <div onClick={() => history.push("/register")}>Not yet a member? <b>Create Account</b></div>
            </div>
            <div className="w-100 mt-1">
                {form_message.code > -1 ? <div className={`alert ${determineFormAlertClass(form_message.code)}`}>
                    {form_message.text}
                    <button type="button" className="close" onClick={() => applyFormMessage('', -1)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> : <div></div>}
            </div>
            <div className="form-row">
                <div className="gm-input-group">
                    <input type="email" className="gm-input" placeholder="Email Address"
                        onInput={event => setFormData({ ...form_data, email: event.target.value })} />
                </div>
                <div className="gm-input-group">
                    <input type="password" className="gm-input" placeholder="Password"
                        onInput={event => setFormData({ ...form_data, password: event.target.value })} />
                </div>
            </div>
            <div className="form-row">
                <div className="col-6">

                </div>
                <div className="col-6 text-right">
                    <span className="text-blue-4 is-clickable" onClick={() => history.push("/password/recovery")}> Recover Password ?</span>
                </div>
            </div>
            <div className="form-row mt-2">
                <div className="gm-input-group">
                    <button className="gm-btn gm-btn-blue" onClick={() => submitForm()}>
                        Log In
                    {is_login_loading ? <FontAwesomeIcon icon={faSpinner} className="ml-2 fa-spin float-none" /> : <span></span>}
                    </button>
                </div>
            </div>
        </div>
    </div>
};

export default LoginForm;