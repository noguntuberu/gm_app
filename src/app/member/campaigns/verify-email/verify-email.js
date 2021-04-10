/** */
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as MailboxService from '../../../../services/mailbox';
import Spinner from '../../../shared/spinners/spinner-15/spinner-15';

const VerifySenderEmail = props => {
    let { email, mailbox, onClose } = props;

    let [code, setCode] = useState('');
    let [loading, setLoading] = useState(false);

    let user_data = useSelector(state => state.user_data);
    let { token } = user_data;

    let submit = async () => {
        try {
            setLoading(true);
            const { error } = await MailboxService.verify(mailbox.id, { token, data: { code, email } });
            if (error) {
                toast.error(error);
                return;
            }

            toast.success('Verification successful.');
            setCode('');
            onClose();
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="alert alert-info">Enter verification code sent to {email}</div>
            <div className="form-row">
                <label htmlFor="verification_code">Verification Code:</label>
                <input type="text" className="gm-input" id="verification_code" defaultValue={code} onInput={e => setCode(e.target.value)} />
            </div>
            <div className="mt-3 mb-3 form-row">
                <div className="col-md-8"></div>
                <div className="col-md-4 pr-md-0 px-sm-0">
                    {loading ?
                        <div className="gm-btn gm-btn-blue">Verifying <span className="gm-btn-spinner"><Spinner /></span></div> :
                        <div onClick={submit} className="gm-btn gm-btn-blue">Verify</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default VerifySenderEmail;