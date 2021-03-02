import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** */
import * as AudienceService from '../../../../services/audience';
import { setPageTitle } from '../../../../store/actions/header';

/** */
import MobileDatatable from "../../../shared/datatable/mobile/datatable";
import WebDatatable from "../../../shared/datatable/web/datatable";

/** */
const ListMailingLists = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { token } = useSelector(state => state.user_data);
    let { is_mobile_view } = useSelector(state => state.metadata);

    const [loading, setLoading] = useState(false);
    const [mailing_lists, setMailingLists] = useState([]);
    let [is_search_mode, setSearchMode] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('My Audiences'));
        setLoading(true);
        AudienceService.read({ token, query_string: 'page=0&population=50' }).then(response => {
            const { error, payload } = response;
            if (error) return;

            setMailingLists(payload);
        }).finally(() => setLoading(false));
    }, [dispatch, token]);


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
                isTitle: true,
            },
            {
                title: 'Number of Contacts',
                key: 'contacts',
                formatter: value => is_mobile_view ? `${value.length} contacts` : value.length,
                isTagline: true,
            },
            {
                title: 'Date created',
                key: 'created_on',
                formatter: value => (new Date(value)).toDateString(),
                isMetadata: true,
            },
        ],
        is_search_mode: is_search_mode,
        items: mailing_lists.sort((a, b) => b.id - a.id),
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
        const { id } = payload;
        history.push(`/audiences/${id}`);
    }

    const handleDataRequest = async (page) => {
        const response = await AudienceService.read({
            token,
            query_string: `page=${page}&population=50`
        })
        const { error, payload } = response;
        if (error) return;

        setMailingLists(payload);
    }

    const handleSearchRequest = async (keys, keyword, page) => {
        const response = await AudienceService.search(keys, keyword, {
            token,
            query_string: `page=${page}&population=50`,
        });
        const { error, payload } = response;
        if (error) return;

        setMailingLists(payload);
    }

    return (
        <div>
            {!loading ?
                <>{
                    is_mobile_view ?
                        <MobileDatatable
                            config={config}
                            action={handleDatatableAction}
                            onClick={handleItemClick}
                            onListModeChange={setSearchMode}
                            onDataRequest={handleDataRequest}
                            onSearchRequest={handleSearchRequest}
                        /> :
                        <WebDatatable config={config} action={handleDatatableAction} onClick={handleItemClick} checkbox />
                }</>
                :
                <></>
            }
        </div>
    )
}

export default ListMailingLists;