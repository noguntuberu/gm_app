import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { apiDelete, apiGet, URLS } from '../../../../utilities/api/api';

import DataTable from '../../../shared/datatable/datatable';

const AudienceContacts = ({ contact_ids, list_id }) => {
    const { token } = useSelector(state => state.user_data);

    // const history = useHistory();

    const [contacts, setContacts] = useState(contact_ids);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const table_config = {
        actions: {
            bulk: ['Delete'],
            single: ['Delete'],
        },
        allow_bulk_action: true,
        css: {},
        fields: [
            {
                title: 'ID',
                key: 'id',
            },
            {
                title: 'First name',
                key: 'firstname',
            },
            {
                title: 'Last name',
                key: 'lastname',
            },
            {
                title: 'Email',
                key: 'email',
            },
            {
                title: 'Date Added',
                key: 'created_on',
                formatter: value => { return (new Date(value)).toDateString() },
            },
        ],
        items: [],
        // search_key: 'name',
        search_text: '',
    };

    useEffect(() => {
        setLoading(true);
        apiGet(`${URLS.contacts}`, { token, query_string: `id=${contacts.join()}` }).then(data => {
            const { payload, error } = data;
            setLoading(false);

            if (!error && payload) {
                setItems(payload);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contacts]);

    const deleteContacts = (ids) => {
        const data = {
            contacts: [...ids],
        }

        apiDelete(`${URLS.mailing_lists}/${list_id}/contacts`, { data, token }).then(data => {
            const { error } = data;

            if (error) {
                alert(`could not delete contacts.`);
                return;
            }

            setContacts(contact_ids.filter(id => !ids.includes(id)));
        });
    }

    const handleDatatableAction = action => {
        const { name, type, data } = action;

        if (type.toLowerCase() === 'bulk') {
            switch (name.toLowerCase()) {
                case 'delete':
                    deleteContacts(data.map(contact => contact.id));
                    break;
                default:
            }
        }

        if (type.toLowerCase() === 'single') {
            switch (name.toLowerCase()) {
                case 'delete':
                    deleteContacts([data.id]);
                    break;
                default:
            }
        }
    }

    const handleItemClick = data => {
        // console.log(data);
    }

    return (
        loading ? 'loading data...' :
            <DataTable
                config={{ ...table_config, items }}
                action={handleDatatableAction}
                onClick={handleItemClick}
                checkbox
            />
    )
}

export default AudienceContacts;