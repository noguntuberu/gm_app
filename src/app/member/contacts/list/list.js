import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from '../../../shared/datatable/datatable';
import { CONTACT_READ, set_process } from "../../../../store/actions/process";
import { readContacts, addManyContactsToStore } from '../../../../store/actions/contact';

import { table_config } from './helper';

const ListContacts = () => {
    const [items, setItems] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const contact_retrieval = useSelector(state => state.processes[CONTACT_READ]);
    const contacts_in_store = useSelector(state => state.contacts);

    useEffect(() => {
        dispatch(readContacts());
    }, []);

    useEffect(() => {
        setItems(Object.values(contacts_in_store));
    }, [contacts_in_store]);

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
                    console.log('delete');
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