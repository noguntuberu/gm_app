import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { determineFormAlertClass, formIsEmpty} from '../../../utilities/form';
import { recoverPassword } from '../../../store/actions/user-data';
import { PWD_RECOVERY_PROCESS, set_process } from '../../../store/actions/process';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const PasswordRecovery = () => {
    const [form_data, setFormData] = useState({});
    const [form_message, setFormMessage] = useState({ code: -1 });
    const [is_loading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const recovery_process = useSelector((state) => state.processes[PWD_RECOVERY_PROCESS]);

    useEffect(() => {
        if (!recovery_process || !Object.keys(recovery_process).length) return;

        setIsLoading(false);
        const { error, payload, success, } = recovery_process;
        if (!success && error) {
            applyFormMessage(error, 0);
        }

        if (success && !error) {
            applyFormMessage(payload, 1);
        }

        dispatch(set_process(PWD_RECOVERY_PROCESS, {}));
    }, [dispatch, recovery_process ]);

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
        dispatch(recoverPassword({ ...form_data }));
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
                <button className="gm-btn gm-btn-primary w-100"
                    onClick={() => submitForm()}>
                    Recover Password
                    {is_loading ? <FontAwesomeIcon icon={faSpinner} className="ml-2 fa-spin"/> : <span></span>}
                </button>
            </div>
        </div>
    )
}

export default PasswordRecovery;