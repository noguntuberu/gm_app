import { toast } from 'react-toastify';
import { table_config } from './helper';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ContactService from '../../../../services/contact';
import GmModal from '../../../shared/modal/modal';
import AddContactToAudience from '../add-to-audience/add-to-audience';
import { setPageTitle } from '../../../../store/actions/header';
import MobileDatatable from "../../../shared/datatable/mobile/datatable";
import WebDataTable from '../../../shared/datatable/web/datatable';

const ListContacts = () => {
    const { token } = useSelector(state => state.user_data);
    let { is_mobile_view } = useSelector(state => state.metadata);

    const dispatch = useDispatch();
    const history = useHistory();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected_contacts, setSelectedContacts] = useState([]);
    const [show_contact_link_modal, setShowContactLinkModal] = useState(false);
    let [is_search_mode, setSearchMode] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('My Contacts'));
        setLoading(true);
        ContactService.read({
            token,
            query_string: `page=0&population=50`
        }).then(data => {
            const { payload, error } = data;
            setLoading(false);

            if (!error) {
                setItems(payload);
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
    }

    const handleDatatableAction = action => {
        const { name, type, data } = action;
        console.log(action);
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
        history.push(`/contacts/${data.id}`);
    }

    const handleDataRequest = async (page) => {
        const response = await ContactService.read({
            token,
            query_string: `page=${page}&population=50`
        })
        const { error, payload } = response;
        if (error) return;

        setItems(payload);
    }

    const handleSearchRequest = async (keys, keyword, page) => {
        const response = await ContactService.search(keys, keyword, {
            token,
            query_string: `page=${page}&population=50`,
        });
        const { error, payload } = response;
        if (error) return;

        setItems(payload);
    }

    return <div>
        {
            is_mobile_view ?
                <MobileDatatable
                    config={{
                        ...table_config,
                        is_search_mode: is_search_mode,
                        items: items.sort((a, b) => b.id - a.id)
                    }}
                    action={handleDatatableAction}
                    onClick={handleItemClick}
                    onListModeChange={setSearchMode}
                    onDataRequest={handleDataRequest}
                    onSearchRequest={handleSearchRequest}
                /> :
                < WebDataTable
                    config={{
                        ...table_config,
                        is_search_mode: is_search_mode,
                        items: items.sort((a, b) => b.id - a.id)
                    }}
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