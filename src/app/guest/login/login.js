/** */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { determineFormAlertClass, formIsEmpty } from '../../../utilities/form';
import { addDataToStore, login } from '../../../store/actions/user-data';
import { LOGIN_PROCESS, set_process } from '../../../store/actions/process';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const [form_data, setFormData] = useState({});
    const [form_message, setFormMessage] = useState({ code: -1 });
    const [is_login_loading, setLoginLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const login_process = useSelector((state) => state.processes[LOGIN_PROCESS]);

    useEffect(() => {
        if (!login_process || !Object.keys(login_process).length) return;

        setLoginLoading(false);
        const { error, payload, success, } = login_process;
        if (!success && error) {
            applyFormMessage(`Email or password incorrect.`, 0);
        }

        dispatch(set_process(LOGIN_PROCESS, {}));
        dispatch(addDataToStore(payload));
    }, [dispatch, login_process]);

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
        dispatch(login({ ...form_data }));
    }

    return (
        <div>
            <div className="form-group">
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
                <input type="password" className="form-control" placeholder="Password"
                    onInput={event => setFormData({ ...form_data, password: event.target.value })} />
            </div>
            <div className="form-group">
                <button className="gm-btn gm-btn-primary w-100" onClick={() => submitForm()}>
                    Log In
                    {is_login_loading ? <FontAwesomeIcon icon={faSpinner} className="ml-2 fa-spin" /> : <span></span>}
                </button>
                <button className="gm-btn border border-primary gm-text-primary w-100 mt-3 text-center" onClick={() => history.push("/register")}>Create Account</button>
            </div>
            <hr className="mt-4 w-50"></hr>
            <div className="text-center d-flex justify-content-center mb-3">
                Forgot password?
                    <span className="pl-2">
                    <b><span className="gm-text-primary is-clickable" onClick={() => history.push("/password/recovery")}> Recover Password </span></b>
                </span>
            </div>
        </div>
    )
};

export default LoginForm;