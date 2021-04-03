import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import * as AudienceService from '../../../../services/audience';
import Spinner from '../../../shared/spinners/spinner-15/spinner-15';

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
        <div className="mt-3 mb-3 form-row">
            <div className="col-md-8"></div>
            <div className="col-md-4 pr-md-0 px-sm-0">
                {loading ?
                    <div className="gm-btn gm-btn-blue">Saving<span className="gm-btn-spinner"><Spinner /></span></div> :
                    <div onClick={submit} className="gm-btn gm-btn-blue">Save</div>
                }
            </div>
        </div>
    </div>
}

export default AddContactToAudience;