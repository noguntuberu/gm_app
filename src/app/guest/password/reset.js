import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { determineFormAlertClass, formIsEmpty } from '../../../utilities/form';
import { resetPassword } from '../../../store/actions/user-data';
import { PWD_RESET_PROCESS, set_process } from '../../../store/actions/process';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';

const PasswordReset = () => {
    const { id } = useParams();
    const [form_data, setFormData] = useState({});
    const [form_message, setFormMessage] = useState({ code: -1 });
    const [is_loading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const pwd_reset_process = useSelector((state) => state.processes[PWD_RESET_PROCESS]);

    useEffect(() => {
        if (!pwd_reset_process || !Object.keys(pwd_reset_process).length) return;

        setIsLoading(false);
        const { error, payload, success, } = pwd_reset_process;
        if (!success && error) {
            applyFormMessage(error, 0);
        }

        if (success && !error) {
            applyFormMessage(payload, 1);
        }

        dispatch(set_process(PWD_RESET_PROCESS, {}));
    }, [dispatch, pwd_reset_process]);

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

        const data = {
            recovery_id: id,
            password: form_data.password,
        };

        setIsLoading(true);
        dispatch(resetPassword({ ...data, }));
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
                <input type="password" className="form-control" placeholder="Enter new password"
                    onInput={event => setFormData({ ...form_data, password: event.target.value })} />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" placeholder="Confirm new password"
                    onInput={event => setFormData({ ...form_data, confirm_password: event.target.value })} />
            </div>
            <div className="form-group">
                <button type="button" className="btn btn-primary form-control"
                    onClick={() => submitForm()}>
                    Reset Password
                    {is_loading ? <FontAwesomeIcon icon={faSpinner} className="ml-2 fa-spin" /> : <span></span>}
                </button>
            </div>
        </div>
    )
}

export default PasswordReset;