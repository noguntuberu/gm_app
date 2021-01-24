import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import * as AudienceService from '../../../../services/audience';
import * as ContactService from '../../../../services/contact';

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
        ContactService.read({ token, query_string: `id=${contacts.join()}` }).then(data => {
            const { payload, error } = data;
            setLoading(false);

            if (!error) {
                setItems(payload);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contacts]);

    const deleteContacts = async (ids) => {
        const data = {
            contacts: [...ids],
        }

        const { error } = await AudienceService.deleteContact(list_id, { data, token })
        if (error) {
            toast.error(error);
            return;
        }

        toast.success(`Contact removed.`)
        setContacts(contact_ids.filter(id => !ids.includes(id)));
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