import { toast } from 'react-toastify';
import { table_config } from './helper';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiDelete, apiGet, URLS } from '../../../../utilities/api/api';
import {
    loadContactsToStore,
    removeOneContactFromStore
} from '../../../../store/actions/contact';
import GmModal from '../../../shared/modal/modal';
import AddContactToAudience from '../add-to-audience/add-to-audience';
import { setPageTitle } from '../../../../store/actions/header';
import DataTable from '../../../shared/datatable/datatable';

const ListContacts = () => {
    const contacts_in_store = useSelector(state => state.contacts);
    const { token } = useSelector(state => state.user_data);

    const dispatch = useDispatch();
    const history = useHistory();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected_contacts, setSelectedContacts] = useState([]);
    const [show_contact_link_modal, setShowContactLinkModal] = useState(false);

    useEffect(() => {
        setItems(Object.values(contacts_in_store));
    }, [contacts_in_store]);

    useEffect(() => {
        dispatch(setPageTitle('My Contacts'));
        setLoading(true);
        apiGet(URLS.contacts, { token }).then(data => {
            const { payload, error } = data;
            setLoading(false);

            if (error && contacts_in_store) {
                setItems(Object.values(contacts_in_store));
            }

            if (!error && payload) {
                setItems(payload);
                dispatch(loadContactsToStore(payload));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteContact = (id) => {
        apiDelete(`${URLS.contacts}/${id}`, { token }).then(data => {
            const { error } = data;

            if (error) {
                toast.error(`could not delete #${id}.`);
                return;
            }

            toast.success(`deleted #${id} successfully.`);
            dispatch(removeOneContactFromStore(id));
        });
    }

    const handleDatatableAction = action => {
        const { name, type, data } = action;

        if (type.toLowerCase() === 'bulk') {
            switch (name.toLowerCase()) {
                case 'add to audience':
                    setSelectedContacts(data);
                    setShowContactLinkModal(true);
                    break;
                default:
            }
        }

        if (type.toLowerCase() === 'single') {
            switch (name.toLowerCase()) {
                case 'add to audience':
                    setSelectedContacts([data]);
                    setShowContactLinkModal(true);
                    break;
                case 'edit':
                    history.push(`/contacts/${data.id}`);
                    break;
                case 'delete':
                    deleteContact(data.id);
                    break;
                default:
            }
        }
    }

    const handleItemClick = data => {
        // console.log(data);
    }

    return <div>
        {loading ? 'loading data...' :
            <DataTable
                config={{ ...table_config, items: items.sort((a, b) => b.id - a.id) }}
                action={handleDatatableAction}
                onClick={handleItemClick}
                checkbox
            />
        }
        <GmModal show_title={true} title="Add Contacts to Audience" show_modal={show_contact_link_modal} onClose={() => setShowContactLinkModal(false)}>
            <AddContactToAudience selected_contacts={selected_contacts} />
        </GmModal>
    </div>
}

export default ListContacts;