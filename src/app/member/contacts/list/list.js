import { toast } from 'react-toastify';
import { table_config } from './helper';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ContactService from '../../../../services/contact';
import GmModal from '../../../shared/modal/modal';
import MobileDatatable from "../../../shared/datatable/mobile/datatable";
import WebDataTable from '../../../shared/datatable/web/datatable';
import ConfirmationDialog from '../../../shared/dialogs/confirmation';

import { addManyContactsToStore, removeOneContactFromStore } from '../../../../store/actions/contact';
import { setPageTitle } from '../../../../store/actions/header';
import AddContactToAudience from '../add-to-audience/add-to-audience';

const ListContacts = () => {
    let { token } = useSelector(state => state.user_data);
    let { is_mobile_view } = useSelector(state => state.metadata);
    let contacts_in_store = useSelector(state => state.contacts);
 
    let dispatch = useDispatch();
    let history = useHistory();

    let [items, setItems] = useState([]);
    let [selected_contacts, setSelectedContacts] = useState([]);
    let [show_contact_link_modal, setShowContactLinkModal] = useState(false);
    let [is_search_mode, setSearchMode] = useState(false);
    let [loading_data, setLoadingData] = useState(true);

    let [show_confirmation, setShowConfirmation] = useState(false);
    let [contact_to_delete, setContactToDelete] = useState(0);

    useEffect(() => {
        setItems(Object.values(contacts_in_store));
    }, [contacts_in_store]);

    useEffect(() => {
        dispatch(setPageTitle('My Contacts'));
        ContactService.read({
            token,
            query_string: `sort_by=-created_on&page=0&population=50`
        }).then(data => {
            let { payload, error } = data;

            if (error) return;

            dispatch(addManyContactsToStore(payload));
        }).catch(() => {
            dispatch(addManyContactsToStore([]));
        }).finally(() => setLoadingData(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let deleteContact = async (id) => {
        let { error } = await ContactService.deleteById(id, { token })
        if (error) {
            toast.error(`could not delete contact.`);
            return;
        }

        dispatch(removeOneContactFromStore(id));
        toast.success(`contact deleted successfully.`);
        if (is_mobile_view) setTimeout(() => window.location.reload(), 500);
    }
    
    let handleConfirmation = (permitted) => {
        if (permitted) {
            deleteContact(contact_to_delete);
        }

        setContactToDelete(0);
        setShowConfirmation(false);
    }

    let handleDatatableAction = action => {
        let { name, type, data } = action;
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
                    setContactToDelete(data.id);
                    setShowConfirmation(true);
                    break;
                default:
            }
        }
    }

    let handleItemClick = data => {
        history.push(`/contacts/${data.id}`);
    }

    let handleDataRequest = async (page) => {
        try {
            setLoadingData(true);
            let response = await ContactService.read({
                token,
                query_string: `sort_by=-created_on&page=${page}&population=50`
            })
            let { error, payload } = response;
            if (error) return;

            dispatch(addManyContactsToStore(payload));
        } catch (e) {
            dispatch(addManyContactsToStore([]));
        } finally {
            setLoadingData(false);
        }
    }

    let handleSearchRequest = async (keys, keyword, page) => {
        try {
            setLoadingData(true);
            let response = await ContactService.search(keys, keyword, {
                token,
                query_string: `sort_by=-created_on&page=${page}&population=50`,
            });
            let { error, payload } = response;
            if (error) return;

            dispatch(addManyContactsToStore(payload));
        } catch (e) {
            dispatch(addManyContactsToStore([]));
        } finally {
            setLoadingData(false);
        }
    }

    return <div>
        {
            is_mobile_view ?
                <MobileDatatable
                    config={{
                        ...table_config,
                        is_search_mode: is_search_mode,
                        items: items,
                    }}
                    action={handleDatatableAction}
                    onClick={handleItemClick}
                    onListModeChange={setSearchMode}
                    onDataRequest={handleDataRequest}
                    onSearchRequest={handleSearchRequest}
                /> :
                <div className="dashboard mt-3">
                    < WebDataTable
                        config={{
                            ...table_config,
                            is_search_mode: is_search_mode,
                            items: items,
                        }}
                        action={handleDatatableAction}
                        onClick={handleItemClick}
                        checkbox
                        request_complete={!loading_data}
                    />
                </div>
        }
        <GmModal show_title={true} title="Add Contacts to Audience" show_modal={show_contact_link_modal} onClose={() => setShowContactLinkModal(false)}>
            <AddContactToAudience selected_contacts={selected_contacts} />
        </GmModal>

        <ConfirmationDialog
            title="Delete Campaign"
            message="Are you sure you want to delete this contact?"
            callback={handleConfirmation}
            is_open={show_confirmation}
        />
    </div>
}

export default ListContacts;