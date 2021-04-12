import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import * as AudienceService from '../../../../services/audience';
import * as ContactService from '../../../../services/contact';

import MobileDatatable from "../../../shared/datatable/mobile/datatable";
import WebDataTable from '../../../shared/datatable/web/datatable';

const AudienceContacts = ({ audience_contacts, list_id }) => {
    let { token } = useSelector(state => state.user_data);
    let { is_mobile_view } = useSelector(state => state.metadata);


    let [contacts, setContacts] = useState(audience_contacts);
    let [default_items, setDefaultItems] = useState([]);
    let [items, setItems] = useState([]);
    let [is_search_mode, setSearchMode] = useState(false);
    let [loading_data, setLoadingData] = useState(true);

    let config = {
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
                isTitle: true,
            },
            {
                title: 'Last name',
                key: 'lastname',
                isTitle: true,
            },
            {
                title: 'Email',
                key: 'email',
                isTagline: true,
            },
            {
                title: 'Date Added',
                key: 'time_added',
                formatter: value => value ? (new Date(value)).toDateString() : '',
                isMetadata: true,
            },
        ],
        is_search_mode: is_search_mode,
        items: items,
        // search_key: 'name',
        search_text: 'Search contact',
    };

    useEffect(() => {
        if (!contacts) return;

        let contact_ids_to_fetch = [];
        contacts.forEach(contact => {
            if (!contact.is_active) return;
            contact_ids_to_fetch.push(contact.id);
        });

        setLoadingData(true);
        ContactService.read({
            token,
            query_string: `id=${contact_ids_to_fetch.join()}&page=0&population=50`
        }).then(data => {
            let { payload, error } = data;

            let contact_map = contacts.reduce((sack, contact) => {
                return {
                    ...sack,
                    [contact.id]: contact
                }
            }, {});

            let payload_map = payload.reduce((sack, element) => {
                return {
                    ...sack,
                    [element.id]: element
                }
            }, {});

            let merged_contacts = [];
            Object.keys(contact_map).forEach(id => {
                if (!contact_map[id].is_active) return;
                merged_contacts.push({
                    ...contact_map[id],
                    ...(payload_map[id] || {})
                });
            });

            if (!error) {
                setDefaultItems(merged_contacts);
                setItems(merged_contacts);
            }
        }).finally(() => setLoadingData(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contacts]);

    let deleteContacts = async (ids) => {
        let data = {
            contacts: [...ids],
        }

        let { error } = await AudienceService.deleteContact(list_id, { data, token })
        if (error) {
            toast.error(error);
            return;
        }

        toast.success(`Contact removed.`)
        setContacts(audience_contacts.filter(id => !ids.includes(id)));
    }

    let handleDatatableAction = action => {
        let { name, type, data } = action;

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

    let handleItemClick = data => {
        // console.log(data);
    }

    let handleDataRequest = async (page) => {
        setItems(default_items);
    }

    let handleSearchRequest = async (keys, keyword, page) => {
        let results = {};
        items.forEach(item => {
            let split_keys = keys.split(',');
            split_keys.forEach(key => {
                if (!item[key]) return;

                let haystack = item[key].toLowerCase();
                let needle = keyword.toLowerCase();
                if (haystack.includes(needle)) {
                    results[item.id] = item;
                }
            });
        });

        setItems(Object.values(results));
    }

    return <div>{
        is_mobile_view ?
            <MobileDatatable
                config={config}
                action={handleDatatableAction}
                onClick={handleItemClick}
                onListModeChange={setSearchMode}
                onDataRequest={handleDataRequest}
                onSearchRequest={handleSearchRequest}
            /> :
            <WebDataTable
                config={config}
                action={handleDatatableAction}
                onClick={handleItemClick}
                checkbox
                request_complete={!loading_data}
            />
    }
    </div>
}

export default AudienceContacts;