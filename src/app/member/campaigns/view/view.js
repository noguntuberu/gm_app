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

    return <div className="dashboard mt-3">
        <div className="campaign-view-wrapper">
            <section className="">
                <div className="stat-card-pair-wrapper row mx-0 my-md-0">
                    <div className="col-6 col-md-12 mx-0 px-md-0">
                        <StatCard title='Sends' count={campaign_stat.failed_sends + campaign_stat.successful_sends} base_color={205} />
                    </div>
                    <div className="col-6 col-md-12 mx-0 px-md-0">
                        <StatCard title='Sent' count={campaign_stat.successful_sends} base_color={130} />
                    </div>
                </div>
                <div className="stat-card-pair-wrapper row mx-0 my-md-0">
                    <div className="col-6 col-md-12  px-md-0">
                        <StatCard title='Failed' count={campaign_stat.failed_sends} base_color={342} />
                    </div>
                    <div className="col-6 col-md-12 px-md-0">
                        <StatCard title='Opened' count={campaign_stat.total_opened} base_color={268} />
                    </div>
                </div>
            </section>
            <section>
                <div className="card shadow-sm mt-2">
                    <iframe title="Campaign Preview" height="550" srcDoc={campaign.body}></iframe>
                </div>
            </section>
        </div>
    </div>
}

export default ViewCampaign;