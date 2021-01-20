import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** */
import GmModal from '../../../shared/modal/modal';
import { URLS, apiGet } from '../../../../utilities/api/api';
import { setPageTitle } from '../../../../store/actions/header';
import { loadAudienceToStore } from '../../../../store/actions/audience';

/** */
import ListCreationForm from '../create/create';
import Datatable from "../../../shared/datatable/datatable";

/** */
const ListMailingLists = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { token } = useSelector(state => state.user_data);
    const mailing_lists_in_store = useSelector(state => state.audiences);

    const [loading, setLoading] = useState(false);
    const [mailing_lists, setMailingLists] = useState([]);
    const [show_create_modal, setShowCreateModal] = useState(false);

    useEffect(() => {
        setMailingLists(Object.values(mailing_lists_in_store));
    }, [mailing_lists_in_store]);

    useEffect(() => {
        dispatch(setPageTitle('My Audiences'));
        setLoading(true);
        apiGet(`${URLS.mailing_lists}`, { token }).then(response => {
            const { error, payload } = response;

            if (error) {
                alert('could not fetch lists');
                return;
            }

            dispatch(loadAudienceToStore(payload));
        }).finally(() => setLoading(false));
    }, []);


    const config = {
        actions: {
            // bulk: ['Online', 'Offline'],
            single: ['View'],
        },
        allow_bulk_action: true,
        css: {},
        fields: [
            {
                title: 'ID',
                key: 'id',
            },
            {
                title: 'Name',
                key: 'name',
            },
            {
                title: 'Number of Contacts',
                key: 'contacts',
                formatter: value => value.length,
            },
            {
                title: 'Date created',
                key: 'created_on',
                formatter: value => (new Date(value)).toDateString(),
            },
        ],
        items: mailing_lists.sort((a,b) => b.id - a.id),
        search_key: 'name',
        search_text: '',
    }

    const handleDatatableAction = payload => {
        const { name, type, data } = payload;
        if (type === 'single') {
            if (name === 'View') {
                history.push(`/audiences/${data.id}`);
            }
        }
    }

    const handleItemClick = payload => {
        // const { id } = payload;
    }

    return (
        <div>
            <button className="gm-btn gm-btn-secondary btn-sm  shadow mb-3" onClick={() => setShowCreateModal(true)} >Create Audience</button>
            <GmModal title="Create Audience" show_title={true} show_modal={show_create_modal} onClose={() => setShowCreateModal(false)}>
                <ListCreationForm />
            </GmModal>
            {!loading ?
                <Datatable config={config} action={handleDatatableAction} onClick={handleItemClick} checkbox /> :
                <></>
            }
        </div>
    )
}

export default ListMailingLists;