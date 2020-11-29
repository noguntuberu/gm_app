import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import DataTable from '../../../shared/datatable/datatable';
import { CONTACT_DELETION, CONTACT_READ, set_process } from "../../../../store/actions/process";
import {
    deleteContact,
    readContacts,
    addManyContactsToStore,
    removeOneContactFromStore
} from '../../../../store/actions/contact';

import { table_config } from './helper';

const ListContacts = () => {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const contact_deletion = useSelector(state => state.processes[CONTACT_DELETION]);
    const contact_retrieval = useSelector(state => state.processes[CONTACT_READ]);
    const contacts_in_store = useSelector(state => state.contacts);
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        dispatch(readContacts());
    }, []);

    useEffect(() => {
        console.log('state changed [store]:', contacts_in_store);
        
        setItems(Object.values(contacts_in_store));
    }, [contacts_in_store]);

    /** retrieval */
    useEffect(() => {
        if (!contact_retrieval || !Object.keys(contact_retrieval).length) return;

        const { error, payload, success, } = contact_retrieval;
        if (!success && error) {
            if (contacts_in_store) {
                setItems(Object.values(contacts_in_store));
            }
        }

        setItems(payload);

        dispatch(addManyContactsToStore(payload));
        dispatch(set_process(CONTACT_READ, {}));
    }, [contacts_in_store, contact_retrieval, dispatch]);

    /** deletion */
    useEffect(() => {
        if (!contact_deletion || !Object.keys(contact_deletion).length) return;
        const { error, id, success } = contact_deletion;
        if (!success && error) {
            alert(`deletion failed.`);
        }

        dispatch(removeOneContactFromStore(id));
    }, [contact_deletion, dispatch]);

    const handleDatatableAction = action => {
        const { name, type, data } = action;

        if (type.toLowerCase() === 'bulk') {

        }

        if (type.toLowerCase() === 'single') {
            switch (name.toLowerCase()) {
                case 'edit':
                    history.push(`/contacts/${data.id}`);
                    break;
                case 'delete':
                    dispatch(deleteContact(data.id));
                    break;
                default:
            }
        }

    }

    const handleItemClick = data => {
        // console.log(data);
    }

    return (
        <DataTable
            config={{ ...table_config, items }}
            action={handleDatatableAction}
            onClick={handleItemClick}
            checkbox
        />
    )
}

export default ListContacts;