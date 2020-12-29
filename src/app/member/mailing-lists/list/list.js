import React, { useState, useEffect } from 'react';
import GmModal from '../../../shared/modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { URLS, apiGet } from '../../../../utilities/api/api';
import Datatable from "../../../shared/datatable/datatable";
import ListCreationForm from './create';

const ListMailingLists = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.user_data);
    const mailing_lists_in_store = useSelector(state => state.audiences);

    const [show_create_modal, setShowCreateModal] = useState(false);
    const [mailing_lists, setMailingLists] = useState([]);

    useEffect(() => {
        setMailingLists(Object.values(mailing_lists_in_store));
    }, [mailing_lists_in_store]);


    const config = {
        actions: {
            bulk: ['Online', 'Offline'],
            single: ['View', 'Edit'],
        },
        allow_bulk_action: true,
        css: {},
        fields: [
            {
                title: 'ID',
                key: 'id',
            },
            {
                title: 'Campaign Name',
                key: 'name',
            },
            {
                title: 'Sender Name',
                key: 'sender_name',
            },
            {
                title: 'Date created',
                key: 'created_on',
                formatter: value => (new Date(value)).toDateString(),
            },
        ],
        items: mailing_lists,
        search_key: 'name',
        search_text: '',
    }

    const handleDatatableAction = payload => {
        // const { name, type, data } = payload;
        // if (type === 'single') {
            
        // }
    }

    const handleItemClick = payload => {
        // const { id } = payload;
    }

    return (
        <div>
            <button className="btn btn-primary btn-sm" onClick={() => setShowCreateModal(true)} >Create Mailing List</button>
            <GmModal title="Create Mailing List" show_title={true} show_modal={show_create_modal} onClose={() => setShowCreateModal(false)}>
                <ListCreationForm />
            </GmModal>
            <Datatable config={config} action={handleDatatableAction} onClick={handleItemClick} checkbox />
        </div>
    )
}

export default ListMailingLists;