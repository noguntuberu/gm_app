/** */
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelect from 'react-multi-select-component';
import * as ContactService from '../../../../services/contact';
import * as AudienceService from '../../../../services/audience';

import { isEmailValid } from '../../../shared/utils/input';
import { setPageTitle } from '../../../../store/actions/header';
import { addOneContactToStore } from '../../../../store/actions/contact';

const ContactCreationForm = props => {
    // const [form_message, setFormMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [date_of_birth, setDateOfBirth] = useState();

    const [mailing_lists, setMailingLists] = useState([]);
    const [selected_lists, setSelectedLists] = useState([]);

    /** */
    const dispatch = useDispatch();
    const user_data = useSelector(state => state.user_data);
    const { token } = user_data;
    const tenant_id = user_data.id;

    useEffect(() => {
        dispatch(setPageTitle('New Contact'));
        AudienceService.read({ token }).then(response => {
            const { payload } = response;
            if (payload) {
                setMailingLists(payload);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** */
    const submitForm = async () => {
        if (!firstname || !email) {
            toast.error('Please fill compulsory fields.');
            return;
        }

        if (!isEmailValid(email)) {
            toast.error(`Invalid email address.`);
            return;
        }

        const form_data = {
            firstname, lastname, email,
            address: { street, state, country },
            date_of_birth, tenant_id,
        }

        setLoading(true);
        const { error, payload, } = await ContactService.create({ data: form_data, token });
        setLoading(false);
        if (error) {
            toast.error(error);
            return;
        }

        toast.success(`contact created.`);
        dispatch(addOneContactToStore(payload));

        // add contact to list
        if (!selected_lists[0]) return;
        await AudienceService.addContact(selected_lists[0].value, {
            data: {
                contacts: [payload.id],
            }, token
        });
    }

    return (
        <div className="mt-3">
            <div className="form-row">
                <div className="form-group col-12">
                    <label htmlFor="firstname">First name *</label>
                    <input
                        type="text"
                        className="gm-input"
                        id="firstname"
                        onInput={e => setFirstname(e.target.value)}
                    />
                </div>
                <div className="form-group col-12">
                    <label htmlFor="lastname">Last name</label>
                    <input
                        type="text"
                        className="gm-input"
                        id="lastname"
                        onInput={e => setLastname(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <label htmlFor="email">Email address *</label>
                    <input
                        type="email"
                        className="gm-input"
                        id="email"
                        onInput={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group col-12">
                    <label htmlFor="email">Audience</label>
                    <MultiSelect
                        options={mailing_lists.map(list => ({ label: list.name, value: list.id }))}
                        onChange={setSelectedLists}
                        value={selected_lists}
                        isMulti={false}
                        labelledBy='Select Audience'
                        id="audience"
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label htmlFor="street-address">Street address</label>
                    <textarea
                        className="gm-input"
                        id="street-address"
                        onInput={e => setStreet(e.target.value)}
                    >
                    </textarea>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="state">State</label>
                            <select
                                className="gm-input"
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
                                className="gm-input"
                                id="country"
                                onChange={e => setCountry(e.target.value)}
                            >
                                <option value="">Select country</option>
                                <option value="ng">Nigeria</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group col-12 pr-0">
                    <label htmlFor="date-of-birth">Date of birth</label>
                    <div className="form-row">
                        <div className="form-group col">
                            <input
                                type="date"
                                className="gm-input"
                                min="0"
                                max="31"
                                onChange={e => setDateOfBirth(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pr-3 mt-4">
                {!loading ?
                    <button className="gm-btn gm-btn-primary float-right flexible-save-btn shadow" onClick={e => submitForm()}> Save </button> :
                    <button className="gm-btn gm-btn-primary float-right flexible-save-btn shadow" disabled> Save </button>
                }
            </div>
        </div>
    )
}

export default ContactCreationForm;