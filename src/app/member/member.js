/** */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SideNav from './side-nav/side-nav';
import CampaignModule from './campaigns/_index';
import ContactModule from './contacts/_index';
import MailingListModule from './mailing-lists/_index';
// import PlansModule from './plans/_index';
import MemberAreaHeader from './header/header';
import GMDashboard from './dashboard/dashboard';

const MemberArea = () => {

    return (
        <div>
            <section className="app-body">
                <SideNav />
                <section className="app-content">
                    <MemberAreaHeader/>
                    <Switch>
                        <Route path="/campaigns" component={CampaignModule} />
                        <Route path="/contacts" component={ContactModule} />
                        <Route path="/audiences" component={MailingListModule} />
                        <Route path="/" component={GMDashboard} />
                    </Switch>
                </section>
            </section>
        </div>
    );
};

export default MemberArea;