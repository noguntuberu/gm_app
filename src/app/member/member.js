/** */
import React, { useState, useEffect, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SideNav from './side-nav/side-nav';
import CampaignModule from './campaigns/_index';
import ContactModule from './contacts/_index';
import MailingListModule from './mailing-lists/_index';
// import PlansModule from './plans/_index';
import MemberAreaHeader from './header/header';
import GMDashboard from './dashboard/dashboard';

import { addMetadata } from '../../store/actions/metadata';

const MemberArea = () => {
    let dispatch = useDispatch();
    let [open_menu_tray, setOpenMenuTray] = useState(false);

    useEffect(() => {
        setMobileFlag();
        window.addEventListener('resize', () => {
            setMobileFlag();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setMobileFlag = () => {
        if (window.screen.width < 480) {
            dispatch(addMetadata({ is_mobile_view: true }));
        } else dispatch(addMetadata({ is_mobile_view: false }));
    }
    return (
        <div>
            <section className="app-body">
                <SideNav open_tray={open_menu_tray} onTrayClose={() => setOpenMenuTray(false)} />
                <section className="app-content">
                    <MemberAreaHeader onHamburgerClick={() => setOpenMenuTray(true)} />
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