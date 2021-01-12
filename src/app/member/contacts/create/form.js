/** */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiPost, URLS } from '../../../../utilities/api/api';

import { addOneContactToStore } from '../../../../store/actions/contact';
import GmModal from '../../../shared/modal/modal';
import ImportContact from '../import/import';

const ContactCreationForm = props => {
    // const [form_message, setFormMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [date_of_birth, setDateOfBirth] = useState();;
    const [show_upload_modal, setShowUploadModal] = useState(false);

    /** */
    const dispatch = useDispatch();
    const user_data = useSelector(state => state.user_data);
    const { token } = user_data;
    const tenant_id = user_data.id;

    /** */
    const submitForm = () => {
        const form_data = {
            firstname, lastname, email,
            address: { street, state, country },
            date_of_birth, tenant_id,
        }

        setLoading(true);
        apiPost(URLS.contacts, { data: form_data, token }).then(data => {
            const { error, payload, } = data;
            setLoading(false);

            if (error) {
                alert(`creation failed`);
                return;
            }

            alert(`contact created.`);
            dispatch(addOneContactToStore(payload));
        });
    }

    return (
        <div>
            <div className="form-row">
                <div className="form-group col">
                    <label htmlFor="firstname">First name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        onInput={e => setFirstname(e.target.value)}
                    />
                </div>
                <div className="form-group col">
                    <label htmlFor="lastname">Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        onInput={e => setLastname(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        onInput={e => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label htmlFor="street-address">Street address</label>
                    <textarea
                        className="form-control"
                        id="street-address"
                        onInput={e => setStreet(e.target.value)}
                    >
                    </textarea>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="state">State</label>
                            <select
                                className="form-control"
                                id="state"
                                onChange={e => setState(e.target.value)}
                            >
                                <option value="">Select state</option>
                                <option value="lagos">Lagos</option>
                            </select>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="country">Country</label>
                            <select
                                className="form-control"
                                id="country"
                                onChange={e => setCountry(e.target.value)}
                            >
                                <option value="">Select country</option>
                                <option value="ng">Nigeria</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group col pr-0">
                    <label htmlFor="date-of-birth">Date of birth</label>
                    <div className="form-row">
                        <div className="form-group col">
                            <input
                                type="date"
                                className="form-control"
                                min="0"
                                max="31"
                                onChange={e => setDateOfBirth(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pr-3">
                {!loading ?
                    <button className="btn btn-primary float-right w-25" onClick={e => submitForm()}> Save </button> :
                    <button className="btn btn-primary float-right w-25" disabled> Save </button>
                }
                <button className="btn btn-info float-right w-25 mr-2" onClick={() => setShowUploadModal(true)}>Import Contacts</button>
            </div>

            <GmModal title="Import Contacts" show_title={true} show_modal={show_upload_modal} onClose={() => setShowUploadModal(false)}>
                <ImportContact />
            </GmModal>
        </div>
    )
}

export default ContactCreationForm;