import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ContactUpdationForm from './form';

const EditContact = props => {
    const { id } = useParams();
    const contact_data = useSelector(state => state.contacts[id]);

    return <ContactUpdationForm contact_data={contact_data} />
}

export default EditContact;