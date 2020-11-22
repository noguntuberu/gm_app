/** */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addOneContactToStore, createContact } from '../../../../store/actions/contact';
import { CONTACT_CREATION, set_process } from '../../../../store/actions/process';

const ContactCreationForm = props => {
    const [form_message, setFormMessage] = useState('');

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [date_of_birth, setDateOfBirth] = useState();;

    /** */
    const dispatch = useDispatch();
    const contact_process = useSelector((state) => state.processes[CONTACT_CREATION]);
    const tenant_id = useSelector(state => state.user_data.id);

    useEffect(() => {
        if (!contact_process || !Object.keys(contact_process).length) return;

        const { error, payload, success, } = contact_process;
        if (!success && error) {
            // applyFormMessage(`Email or password incorrect.`, 0);
        }

        if (success) {
            dispatch(addOneContactToStore(payload));
        }

        dispatch(set_process(CONTACT_CREATION, {}));
    }, [dispatch, contact_process]);

    /** */
    const submitForm = () => {
        const form_data = {
            firstname, lastname, email,
            address: { street, state, country },
            date_of_birth, tenant_id,
        }

        dispatch(createContact(form_data));
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
                <button className="btn btn-primary float-right w-25" onClick={e => submitForm()}> Save </button>
            </div>
        </div>
    )
}

export default ContactCreationForm;