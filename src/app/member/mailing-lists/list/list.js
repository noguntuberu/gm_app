import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** */
import { setPageTitle } from '../../../../store/actions/header';
import * as AudienceService from '../../../../services/audience';
import { addManyAudiencesToStore } from '../../../../store/actions/audience';

/** */
import MobileDatatable from "../../../shared/datatable/mobile/datatable";
import WebDatatable from "../../../shared/datatable/web/datatable";

/** */
const ListMailingLists = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { token } = useSelector(state => state.user_data);
    let { is_mobile_view } = useSelector(state => state.metadata);
    let audiences_in_store = useSelector(state => state.audiences);

    const [loading, setLoading] = useState(true);
    const [mailing_lists, setMailingLists] = useState([]);
    let [is_search_mode, setSearchMode] = useState(false);

    useEffect(() => {
        setMailingLists(Object.values(audiences_in_store));
    }, [audiences_in_store]);

    useEffect(() => {
        dispatch(setPageTitle('My Audiences'));
        setLoading(true);
        AudienceService.read({ token, query_string: 'page=0&population=50&sort_by=-created_on' }).then(response => {
            const { error, payload } = response;
            if (error) return;

            dispatch(addManyAudiencesToStore(payload));
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
                title: 'Description',
                key: 'description',
                formatter: value => is_mobile_view ? `${value.substr(0, 35)}...` : value,
                isTagline: true,
            },
            {
                title: 'Date created',
                key: 'created_on',
                formatter: value => value ? (new Date(value)).toDateString() : '',
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
        setLoading(true);
        const response = await AudienceService.read({
            token,
            query_string: `page=${page}&population=50&sort_by=-created_on`
        })
        setLoading(false);
        const { error, payload } = response;
        if (error) return;

        dispatch(addManyAudiencesToStore(payload));
    }

    const handleSearchRequest = async (keys, keyword, page) => {
        setLoading(true);
        const response = await AudienceService.search(keys, keyword, {
            token,
            query_string: `page=${page}&population=50&sort_by=-created_on`,
        });
        setLoading(false);
        const { error, payload } = response;
        if (error) return;

        dispatch(addManyAudiencesToStore(payload));
    }

    return (
        <div>{
            is_mobile_view ?
                <MobileDatatable
                    config={config}
                    action={handleDatatableAction}
                    onClick={handleItemClick}
                    onListModeChange={setSearchMode}
                    onDataRequest={handleDataRequest}
                    onSearchRequest={handleSearchRequest}
                /> :
                <div className="dashboard mt-3">
                    <WebDatatable
                        action={handleDatatableAction}
                        checkbox
                        config={config}
                        onClick={handleItemClick}
                        request_complete={!loading}
                    />
                </div>
        }
        </div>
    )
}

export default ListMailingLists;