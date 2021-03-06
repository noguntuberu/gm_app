import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import StatCard from '../../../shared/cards/stat';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { setPageTitle } from '../../../../store/actions/header';
import * as CampaignService from '../../../../services/campaign';

import './view.css';

/** */
const ViewCampaign = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.user_data);
    const [campaign, setCampaign] = useState({});
    const [campaign_stat, setCampaignStat] = useState({});


    useEffect(() => {
        CampaignService.readById(id, { token }).then(response => {
            const { error, payload } = response;
            if (error) {
                toast.error(`Error fetching data`);
                return;
            }

            setCampaign(payload);
            setCampaignStat(payload.metadata);
            dispatch(setPageTitle(payload.name));
        })
    }, [dispatch, id, token]);

    return <div className="content-wrapper mt-3">
        <div className="campaign-view-wrapper">
            <div className="stat-card-pair-wrapper col-lg-6 p-0 p-lg-0 pr-lg-2">
                <div className="col-6">
                    <StatCard title='Sends' count={campaign_stat.failed_sends + campaign_stat.successful_sends} base_color={205} />
                </div>
                <div className="col-6">
                    <StatCard title='Sent' count={campaign_stat.successful_sends} base_color={130} />
                </div>
            </div>
            <div className="stat-card-pair-wrapper p-0 col-lg-6 p-lg-0">
                <div className="col-6">
                    <StatCard title='Failed' count={campaign_stat.failed_sends} base_color={342} />
                </div>
                <div className="col-6">
                    <StatCard title='Opened' count={campaign_stat.total_opened} base_color={268} />
                </div>
            </div>
            <div className="card shadow-sm mt-2">
                <iframe title="Campaign Preview" height="550" srcDoc={campaign.body}></iframe>
            </div>
        </div>
    </div>
}

export default ViewCampaign;