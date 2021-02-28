import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import * as AudienceService from '../../../../services/audience';
import * as ContactService from '../../../../services/contact';

import WebDataTable from '../../../shared/datatable/web/datatable';

const AudienceContacts = ({ audience_contacts, list_id }) => {
    const { token } = useSelector(state => state.user_data);

    // const history = useHistory();

    const [contacts, setContacts] = useState(audience_contacts);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const table_config = {
        actions: {
            bulk: ['Remove'],
            single: ['Remove'],
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
                key: 'time_added',
                formatter: value => { return (new Date(value)).toDateString() },
            },
        ],
        items: [],
        // search_key: 'name',
        search_text: '',
    };

    useEffect(() => {
        if(!contacts) return;
        setLoading(true);

        let contact_ids_to_fetch = [];
        contacts.forEach( contact => {
            if(!contact.is_active) return;
            contact_ids_to_fetch.push(contact.id);
        });

        ContactService.read({ token, query_string: `id=${contact_ids_to_fetch.join()}` }).then(data => {
            const { payload, error } = data;
            setLoading(false);

            let contact_map = contacts.reduce((sack, contact) => {
                return {
                    ...sack,
                    [contact.id] : contact
                }
            }, {});

            let payload_map = payload.reduce((sack, element) => {
                return {
                    ...sack,
                    [element.id] : element
                }
            }, {});

            let merged_contacts = [];
            Object.keys(contact_map).forEach(id => {
            if(!contact_map[id].is_active) return;
            merged_contacts.push({
                    ...contact_map[id],
                    ...(payload_map[id] || {})
                });
            });

            if (!error) {
                setItems(merged_contacts);
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
        setContacts(audience_contacts.filter(id => !ids.includes(id)));
    }

    const handleDatatableAction = action => {
        const { name, type, data } = action;

        if (type.toLowerCase() === 'bulk') {
            switch (name.toLowerCase()) {
                case 'remove':
                    deleteContacts(data.map(contact => contact.id));
                    break;
                default:
            }
        }

        if (type.toLowerCase() === 'single') {
            switch (name.toLowerCase()) {
                case 'remove':
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
            <WebDataTable
                config={{ ...table_config, items }}
                action={handleDatatableAction}
                onClick={handleItemClick}
                checkbox
            />
    )
}

export default AudienceContacts;