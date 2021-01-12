/** */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SideNav from './side-nav/side-nav';
import CampaignModule from './campaigns/_index';
import ContactModule from './contacts/_index';
import MailingListModule from './mailing-lists/_index';
import PlansModule from './plans/_index';

const MemberArea = () => {

    return (
        <div>
            <header className="app-header">

            </header>
            <section className="app-body">
                <SideNav />
                <section className="app-content">
                    <Switch>
                        <Route path="/campaigns" component={CampaignModule} />
                        <Route path="/contacts" component={ContactModule} />
                        <Route path="/mailing-lists" component={MailingListModule} />
                        <Route path="/plans" component={PlansModule} />
                    </Switch>
                </section>
            </section>
        </div>
    );
};

export default MemberArea;