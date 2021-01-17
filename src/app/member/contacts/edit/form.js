/** */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addOneContactToStore, } from '../../../../store/actions/contact';

import { apiPut, URLS } from '../../../../utilities/api/api';
import { setPageTitle } from '../../../../store/actions/header';
import { convertDateFromIsoToHTMLFormat } from '../../../shared/utils/date';

const ContactUpdationForm = props => {
    const { contact_data } = props;
    // const [form_message, setFormMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [date_of_birth, setDateOfBirth] = useState();;

    /** */
    const dispatch = useDispatch();
    const user_data = useSelector(state => state.user_data);
    const { token } = user_data;
    const tenant_id = user_data.id;

    useEffect(() => {
        dispatch(setPageTitle('Edit Contact'));
        const { firstname, lastname, email, address, date_of_birth } = contact_data;

        if (address) {
            const { street, state, country } = address;
            setState(state);
            setStreet(street);
            setCountry(country);
        }

        setFirstname(firstname);
        setLastname(lastname);
        setEmail(email);
        setDateOfBirth(date_of_birth);

    }, [contact_data]);

    /** */
    const submitForm = () => {
        const form_data = {
            ...contact_data,
            firstname, lastname, email,
            address: { street, state, country },
            date_of_birth, tenant_id,
        }

        setLoading(true);
        apiPut(`${URLS.contacts}/${contact_data.id}`, { data: form_data, token }).then(data => {
            const { error, payload } = data;
            setLoading(false);

            if (error) {
                alert('an error occurred.');
                return;
            }

            alert('update successful.');
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
                        defaultValue={firstname}
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
                        defaultValue={lastname}
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
                        defaultValue={email}
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
                        defaultValue={street}
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
                                value={state}
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
                                value={country}
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
                            {date_of_birth
                                ? <input
                                    type="date"
                                    className="form-control"
                                    max=""
                                    defaultValue={convertDateFromIsoToHTMLFormat(date_of_birth)}
                                    onChange={e => setDateOfBirth(e.target.value)}
                                /> : <input
                                    type="date"
                                    className="form-control" onChange={e => setDateOfBirth(e.target.value)}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="pr-3">
                {loading ?
                    <button className="gm-btn gm-btn-primary float-right w-25  shadow" disabled> Save </button> :
                    <button className="gm-btn gm-btn-primary float-right w-25  shadow" onClick={e => submitForm()}> Save </button>
                }
            </div>
        </div>
    )
}

export default ContactUpdationForm;