import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateCampaign from './create';
import EditCampaign from './edit';
import ListCampaign from './list';
import ViewCampaign from './view';
const CampaignModule = () => {
    return (
        <Switch>
            <Route path="/campaigns/new" component={CreateCampaign} />
            <Route path="/campaigns/edit" component={EditCampaign} />
            <Route path="/campaigns/view" component={ViewCampaign} />
            <Route path="/campaigns" component={ListCampaign} />
        </Switch>
    )
}

export default CampaignModule;