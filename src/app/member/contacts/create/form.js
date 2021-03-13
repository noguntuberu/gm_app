/** */
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelect from 'react-multi-select-component';
import * as ContactService from '../../../../services/contact';
import * as AudienceService from '../../../../services/audience';
import Spinner from '../../../shared/spinners/spinner-15/spinner-15';

import { countries } from '../../../data/countries';
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
                <div className="form-group col-12 col-md-6">
                    <label htmlFor="firstname">First name *</label>
                    <input
                        type="text"
                        className="gm-input"
                        id="firstname"
                        onInput={e => setFirstname(e.target.value)}
                    />
                </div>
                <div className="form-group col-12 col-md-6">
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
                <div className="form-group col-12 col-md-6">
                    <label htmlFor="email">Email address *</label>
                    <input
                        type="email"
                        className="mt-md-1 gm-input"
                        id="email"
                        onInput={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group col-12 col-md-6">
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
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="country">Country</label>
                            <select
                                className="mt-md-1 gm-input"
                                id="country"
                                onChange={e => setCountry(e.target.value)}
                            >
                                <option value="">Select country</option>
                                {countries.map((country, index) => <option key={country.code} value={country.code}>
                                    {country.name}
                                </option>)}
                            </select>
                        </div>
                        <div className="form-group col-12 col-md-6">
                            <label htmlFor="state">State</label>
                            <input
                                className="mt-md-3 gm-input"
                                id="state"
                                onInput={e => setState(e.target.value)}
                            />
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
                    <div className="gm-btn gm-btn-primary float-right flexible-save-btn shadow" onClick={e => submitForm()}> Save </div> :
                    <div className="gm-btn gm-btn-primary float-right flexible-save-btn shadow"> Saving <span className="gm-btn-spinner"><Spinner /></span> </div>
                }
            </div>
        </div>
    )
}

export default ContactCreationForm;