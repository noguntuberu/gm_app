import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WebDatatable from "../../../shared/datatable/web/datatable";
import MobileDatatable from "../../../shared/datatable/mobile/datatable";
import { setPageTitle } from '../../../../store/actions/header';
import * as DraftService from '../../../../services/draft';
import * as CampaignService from '../../../../services/campaign';


const ListCampaigns = () => {
    let history = useHistory();
    let dispatch = useDispatch();
    let { token } = useSelector(state => state.user_data);
    let { is_mobile_view } = useSelector(state => state.metadata);

    let [campaigns, setCampaigns] = useState([]);
    let [is_search_mode, setSearchMode] = useState(false);
    let [loading_data, setLoadingData] = useState(true);

    useEffect(() => {
        dispatch(setPageTitle('My Campaigns'));
        CampaignService.read({
            token,
            query_string: 'page=0&population=50,sort_by=-created_on'
        }).then(response => {
            const { error, payload } = response;
            if (error) return;

            setCampaigns(payload);
        }).finally(() => setLoadingData(false));
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
                            return <span className="gm-badge gm-badge-green-light">{value}</span>;
                        case 'queued':
                            return <span className="gm-badge gm-badge-blue-light">{value}</span>;
                        default:
                            return <span className="gm-badge gm-badge-wine-light">{value}</span>;
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
        is_search_mode: is_search_mode,
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

    const handleDataRequest = async (page) => {
        try {
            setLoadingData(true);
            const response = await CampaignService.read({
                token,
                query_string: `page=${page}&population=50,sort_by=-created_on`
            })

            const { error, payload } = response;
            if (error) return;

            setCampaigns(payload);
        } catch (e) {
            setCampaigns([]);
        } finally {
            setLoadingData(false);
        }
    }

    const handleSearchRequest = async (keys, keyword, page) => {
        try {
            const response = await CampaignService.search(keys, keyword, {
                token,
                query_string: `page=${page}&population=50,sort_by=-created_on`,
            });

            const { error, payload } = response;
            if (error) return;

            setCampaigns(payload);
        } catch (e) {
            setCampaigns([]);
        } finally {
            setLoadingData(false);
        }
    }

    return <div> {
        is_mobile_view ?
            <MobileDatatable
                config={config}
                action={handleDatatableAction}
                onClick={handleItemClick}
                onListModeChange={setSearchMode}
                onDataRequest={handleDataRequest}
                onSearchRequest={handleSearchRequest}
            /> :
            <WebDatatable
                config={config}
                action={handleDatatableAction}
                onClick={handleItemClick}
                checkbox
                request_complete={!loading_data}
            />
    }</div>
}

export default ListCampaigns;