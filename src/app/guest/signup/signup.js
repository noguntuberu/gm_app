/** */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { determineFormAlertClass, formIsEmpty } from '../../../utilities/form';
import { signup } from '../../../store/actions/user-data';
import { SIGNUP_PROCESS, set_process } from '../../../store/actions/process';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

const SignupForm = () => {
    const [formData, setFormData] = useState({});
    const [formMessage, setFormMessage] = useState({ code: -1 });
    const [showSpinner, setSpinner] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const signup_process = useSelector((state) => state.processes[SIGNUP_PROCESS]);

    useEffect(() => {
        if (!signup_process || !Object.keys(signup_process).length) return;
        
        setSpinner(false);
        const { error, success, } = signup_process;
        if (!success && error) {
            applyFormMessage(error);
        }

        dispatch(set_process(SIGNUP_PROCESS, {}));
    }, [dispatch, signup_process]);

    const applyFormMessage = (text, code = 0) => {
        setFormMessage({ code, text })
    }

    const submitForm = () => {
        if (formIsEmpty(formData)) {
            applyFormMessage(`Please fill all fields.`);
            return;
        }

        if (formData.password !== formData.confirm_password) {
            applyFormMessage(`Passwords do not match.`);
            return;
        }

        let data_to_submit = { ...formData };
        delete data_to_submit.confirm_password;

        setSpinner(true);
        dispatch(signup(data_to_submit));
    };

    return (
        <div>
            <div className="form-group">
                {formMessage.code > -1 ? <div className={`alert ${determineFormAlertClass(formMessage.code)}`}>
                    {formMessage.text}
                    <button type="button" className="close" onClick={() => applyFormMessage('', -1)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> : <div></div>}
            </div>
            <div className="form-group">
                <div className="col-6 p-0 pr-1">
                    <input type="text" className="form-control" placeholder="First name"
                        onInput={event => setFormData({ ...formData, firstname: event.target.value })} />
                </div>
                <div className="col-6 p-0 pl-1">
                    <input type="text" className="form-control" placeholder="Last name"
                        onInput={event => setFormData({ ...formData, lastname: event.target.value })} />
                </div>
            </div>
            <div className="form-group">
                <input type="email" className="form-control" placeholder="Email Address"
                    onInput={event => setFormData({ ...formData, email: event.target.value })} />
            </div>
            <div className="form-group">
                <div className="col-6 p-0 pr-1">
                    <input type="password" className="form-control" placeholder="Password"
                        onInput={event => setFormData({ ...formData, password: event.target.value })} />
                </div>
                <div className="col-6 p-0 pl-1">
                    <input type="password" className="form-control" placeholder="Confirm password"
                        onInput={event => setFormData({ ...formData, confirm_password: event.target.value })} />
                </div>
            </div>
            <div className="form-group">
                <button type="button" className="gm-btn gm-btn-primary w-100"
                    onClick={() => submitForm()}>
                    Create Account
                    {showSpinner ? <FontAwesomeIcon icon={faSpinner} className="ml-2 fa-spin"/> : <span></span>}
                </button>
                <button className="gm-btn border border-primary gm-text-primary w-100 mt-3" onClick={() => history.push("/login")}>Log In</button>
            </div>
        </div>
    )
}

export default SignupForm;