/** */
import React, { useState, useEffect } from 'react';
import StatCard from '../../../../shared/cards/stat';
import AudienceGraph from './graph';

const AudienceDashboard = props => {
    let { campaigns, contacts } = props;
    let [stats, setStats] = useState({});
    let [audience_contacts, setAudienceContacts] = useState([]);
    let [unsubscribed_contacts, setUnsubscribedContacts] = useState([]);

    useEffect(() => {
        if (!contacts || (campaigns && campaigns.length < 0)) return;
        if (!audience_contacts) return;

        let active_contacts = contacts.filter(contact => contact.is_active);
        if (active_contacts.length !== audience_contacts.length) {
            setAudienceContacts(active_contacts);
        }

        let stat = {
            campaigns: campaigns.length,
            total: audience_contacts.length,
            unsubscribed: 0,
            gained: 0,
        };

        let unsubscribed = [];
        contacts.forEach(contact => {
            if (contact.is_unsubscribed) {
                stat.unsubscribed += 1;
                unsubscribed.push(contact);
                return;
            };

            if (!contact.is_active) return;
        });

        setUnsubscribedContacts(unsubscribed);
        setStats(stat);
    }, [audience_contacts, campaigns, contacts]);

    return <div className="audience-dashboard row m-0">
        <div className="col-12 col-xl-4 px-0 pr-md-2">
            <div className="stat-card-pair-wrapper row mx-0 pr-md-0 pr-xl-2">
                <div className="col-12 col-md-4 col-xl-12 px-0">
                    <StatCard title='Campaigns' count={stats.campaigns} base_color={205} />
                </div>
                <div className="col-12 col-md-4 col-xl-12  px-0 pl-md-2 pl-xl-0">
                    <StatCard title='Contacts' count={stats.total} base_color={130} />
                </div>
                <div className="col-12 col-md-4 col-xl-12 px-0 pl-md-2 pl-xl-0">
                    <StatCard title='Unsubscribers' count={stats.unsubscribed} base_color={342} />
                </div>
            </div>
        </div>
        <div className="col-12 col-xl-8 px-0 pr-md-2">
            <div className="shadow-sm border graph-wrapper my-md-1">
                <AudienceGraph contacts={[...audience_contacts, ...unsubscribed_contacts]} />
            </div>
        </div>
    </div>
}

export default AudienceDashboard;