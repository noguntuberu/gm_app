import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../../store/actions/header';

const ViewCampaign = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const campaign = useSelector(state => state.campaigns[id]);
    const campaign_body = useRef();

    useEffect(() => {
        dispatch(setPageTitle(campaign.name));
        campaign_body.current.innerHTML = campaign.body;
    }, [campaign, dispatch]);
    
    return <div>
        <div className="card shadow-sm p-2">
            Campaign stats
        </div>
        <div className="card shadow-sm mt-3 p-3">
            <div ref={campaign_body}>
                {/* {campaign.body} */}
            </div>
        </div>
    </div>
}

export default ViewCampaign;