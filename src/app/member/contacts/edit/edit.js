import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ContactUpdationForm from './form';

const EditContact = props => {
    const { id } = useParams();
    const contact_data = useSelector(state => state.contacts[id]);

    return <div className="content-wrapper mt-3">
        <ContactUpdationForm contact_data={contact_data} />
    </div>
}

export default EditContact;