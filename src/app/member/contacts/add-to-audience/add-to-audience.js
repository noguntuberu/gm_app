import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import * as AudienceService from '../../../../services/audience';

const AddContactToAudience = props => {
    const { selected_contacts } = props;
    const { token } = useSelector(state => state.user_data);

    const [audiences, setAudiences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected_audience, setSelectedAudience] = useState(0);

    useEffect(() => {
        AudienceService.read({ token }).then(data => {
            const { error, payload } = data;
            if (error) return;

            setAudiences(payload);
        });
    }, [token]);

    const submit = async () => {
        if (!selected_audience[0]) {
            toast.error('Please select an audience.');
            return;
        }

        setLoading(true);
        const { error } = await AudienceService.addContact(selected_audience, {
            data: {
                contacts: selected_contacts.map(contact => contact.id),
            }, token
        })
        if (error) {
            toast.error(error);
            return;
        }

        setLoading(false);
        toast.success(`Contact(s) added to audience.`);
        document.querySelector('.gm-modal').click();
    }

    return <div>
        {/* <div className="my-2">
            {selected_contacts.map(contact => <span>{contact.firstname} {contact.lastname} &times;</span>)}
        </div> */}
        <div className="form-group">
            <label htmlFor="audience">Audience</label>
            <select className="custom-select" onChange={e => setSelectedAudience(e.target.value)}>
                <option value=''>Select Audience</option>
                {audiences.map(audience => <option key={audience.id} value={audience.id}>{audience.name}</option>)}
            </select>
        </div>
        <div className="form-group">
            {loading ?
                <button className="gm-btn gm-btn-info float-right  shadow" disabled>Saving...</button> :
                <button onClick={submit} className="gm-btn gm-btn-primary float-right  shadow">Save</button>
            }
        </div>
    </div>
}

export default AddContactToAudience;