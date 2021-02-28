import { toast } from 'react-toastify';
import { table_config } from './helper';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ContactService from '../../../../services/contact';
import {
    loadContactsToStore,
    removeOneContactFromStore
} from '../../../../store/actions/contact';
import GmModal from '../../../shared/modal/modal';
import AddContactToAudience from '../add-to-audience/add-to-audience';
import { setPageTitle } from '../../../../store/actions/header';
import WebDataTable from '../../../shared/datatable/web/datatable';

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
        ContactService.read({ token }).then(data => {
            const { payload, error } = data;
            setLoading(false);

            if (error && contacts_in_store) {
                setItems(Object.values(contacts_in_store));
            }

            if (!error) {
                setItems(payload);
                dispatch(loadContactsToStore(payload));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteContact = async (id) => {
        const { error } = await ContactService.deleteById(id, { token })
        if (error) {
            toast.error(`could not delete contact.`);
            return;
        }

        toast.success(`contact deleted successfully.`);
        dispatch(removeOneContactFromStore(id));
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
            <WebDataTable
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