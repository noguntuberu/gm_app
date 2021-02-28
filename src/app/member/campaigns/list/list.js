import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WebDatatable from "../../../shared/datatable/web/datatable";
import { setPageTitle } from '../../../../store/actions/header';
import * as DraftService from '../../../../services/draft';
import * as CampaignService from '../../../../services/campaign';
import { removeOneCampaignFromStore } from "../../../../store/actions/campaign";

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
        CampaignService.read({ token, }).then(response => {
            const { error, payload } = response;
            if (error) return;

            // dispatch(loadCampaignsToStore(payload));
            setCampaigns(payload);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const config = {
        actions: {
            // bulk: ['Online', 'Offline'],
            single: ['View', 'Edit', 'Delete'],
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
                isTitle: true,
            },
            {
                title: 'Sender Name',
                key: 'sender_name',
                isTagline: true,
            },
            {
                title: 'Status',
                key: 'status',
                formatter: value => {
                    switch (value) {
                        case 'sent':
                            return <span className="gm-badge gm-bg-success">{value}</span>;
                        case 'queued':
                            return <span className="gm-badge gm-bg-warning">{value}</span>;
                        default:
                            return <span className="gm-badge gm-bg-secondary">{value}</span>;
                    }
                },
                isBadge: true,
            },
            {
                title: 'Date created',
                key: 'created_on',
                formatter: value => (new Date(value)).toDateString(),
                isMetadata: true,
            },
        ],
        items: campaigns.sort((a, b) => b.id - a.id),
        search_key: 'name',
        search_text: '',
    }

    const deleteDraft = async (id) => {
        const { error } = await DraftService.deleteById(id, { token });
        if (error) {
            toast.error(`Could not delete draft.`);
            return
        }

        toast.success(`Draft deleted successfully.`);
        dispatch(removeOneCampaignFromStore(id));
    }

    const handleDatatableAction = payload => {
        const { name, type, data } = payload;
        if (type === 'single') {
            switch (name) {
                case 'Edit':
                    if (data.status !== 'draft') {
                        toast.warning('Cannot edit queued campaigns.');
                        break;
                    };

                    history.push(`/campaigns/${data.id}/edit`);
                    break;
                case 'Delete':
                    if (data.status !== 'draft') {
                        toast.warning('Cannot delete queued campaigns.');
                        break;
                    };

                    deleteDraft(data.id);
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
            <WebDatatable config={config} action={handleDatatableAction} onClick={handleItemClick} checkbox />
        </div>
    )
}

export default ListCampaigns;