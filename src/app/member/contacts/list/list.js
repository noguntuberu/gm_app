import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import ImportContact from '../import/import';
// import GmModal from '../../../shared/modal/modal';
import { apiDelete, apiGet, URLS } from '../../../../utilities/api/api';

import DataTable from '../../../shared/datatable/datatable';
import {
    loadContactsToStore,
    removeOneContactFromStore
} from '../../../../store/actions/contact';
import { setPageTitle } from '../../../../store/actions/header';

import { table_config } from './helper';

const ListContacts = () => {
    const contacts_in_store = useSelector(state => state.contacts);
    const { token } = useSelector(state => state.user_data);

    const dispatch = useDispatch();
    const history = useHistory();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [show_upload_modal, setShowUploadModal] = useState(false);

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
                alert(`could not delete #${id}.`);
                return;
            }

            alert(`deleted #${id} successfully.`);
            dispatch(removeOneContactFromStore(id));
        });
    }

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
        {/* <button className="gm-btn gm-btn-secondary w-25 btn-sm shadow mb-3 float-right" onClick={() => setShowUploadModal(true)}>Import Contacts</button> */}
        {loading ? 'loading data...' :
            <DataTable
            config={{ ...table_config, items }}
            action={handleDatatableAction}
            onClick={handleItemClick}
            checkbox
        />}

        {/* <GmModal title="Import Contacts" show_title={true} show_modal={show_upload_modal} onClose={() => setShowUploadModal(false)}>
            <ImportContact />
        </GmModal> */}
    </div>
}

export default ListContacts;