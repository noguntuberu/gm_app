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

    return <div>
        <div className="stat-card-pair-wrapper">
            <div className="col-6">
                <StatCard title='Campaigns' count={stats.campaigns} border_color='primary' />
            </div>
            <div className="col-6">
                <StatCard title='Contacts' count={stats.total} border_color='info' />
            </div>
        </div>
        <div className="stat-card-pair-wrapper">
            <div className="col-12 px-0">
                <StatCard title='Unsubscribers' count={stats.unsubscribed} border_color='secondary' />
            </div>
        </div>
        <div className="shadow-sm border graph-wrapper">
            <AudienceGraph contacts={[...audience_contacts, ...unsubscribed_contacts]} />
        </div>
    </div>
}

export default AudienceDashboard;