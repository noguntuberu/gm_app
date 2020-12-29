import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateCampaign from './create/create';
import EditCampaign from './edit/edit';
import ListCampaign from './list/list';
import ViewCampaign from './view/view';
const CampaignModule = () => {
    return (
        <Switch>
            <Route path="/campaigns/new" component={CreateCampaign} />
            <Route path="/campaigns/edit/:id" component={EditCampaign} />
            <Route path="/campaigns/view/:id" component={ViewCampaign} />
            <Route path="/campaigns" component={ListCampaign} />
        </Switch>
    )
}

export default CampaignModule;