import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { URLS, apiGet } from '../../../../utilities/api/api';

import Datatable from "../../../shared/datatable/datatable";
import { loadCampaignsToStore } from "../../../../store/actions/campaign";
import { setPageTitle } from '../../../../store/actions/header';

const ListCampaigns = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.user_data);
    const campaigns_in_store = useSelector(state => state.campaigns);

    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        setCampaigns(Object.values(campaigns_in_store));
    }, [campaigns_in_store]);

    useEffect(() => {
        dispatch(setPageTitle('My Campaigns'));
        apiGet(`${URLS.campaigns}`, { token, }).then(response => {
            const { error, payload } = response;

            if (error) {
                return;
            }

            dispatch(loadCampaignsToStore(payload));
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const config = {
        actions: {
            // bulk: ['Online', 'Offline'],
            // single: ['View', 'Edit'],
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
        items: campaigns.sort((a,b) => b.id - a.id),
        search_key: 'name',
        search_text: '',
    }

    const handleDatatableAction = payload => {
        const { name, type, data } = payload;
        if (type === 'single') {
            switch (name) {
                case 'Edit':
                    // history.push(`/campaigns/${data.id}/edit`);
                    break;
                default:
                    history.push(`/campaigns/${data.id}/view`);
            }
        }
    }

    const handleItemClick = payload => {
        const { id } = payload;
        history.push(`/campaigns/${id}/view`);
    }

    return (
        <div>
            <Datatable config={config} action={handleDatatableAction} onClick={handleItemClick} checkbox />
        </div>
    )
}

export default ListCampaigns;