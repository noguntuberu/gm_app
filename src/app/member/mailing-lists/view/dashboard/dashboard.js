/** */
import React, { useState, useEffect } from 'react';
import StatCard from '../../../../shared/cards/stat';

const AudienceDashboard = props => {
    const { campaigns, contacts } = props;
    const [stats, setStats] = useState({});

    useEffect(() => {
        console.log({ contacts, campaigns });
        if (!contacts || (campaigns && campaigns.length < 0)) return;

        let stat = {
            campaigns: campaigns.length,
            total: contacts.length,
            unsubscribed: 0,
            gained: 0,
        };

        contacts.forEach(contact => {
            if (contact.is_unsubscribed) stat.unsubscribed += 1;
        });

        setStats(stat);
    }, [campaigns, contacts]);

    return <div>
        <div className="row ml-0 mt-4 px-0">
            <div className="col-3 pl-0">
                <StatCard title='Total Campaigns' count={stats.campaigns} border_color='primary' />
            </div>
            <div className="col-3 pl-0">
                <StatCard title='Total Contacts' count={stats.total} border_color='info' />
            </div>
            <div className="col-3 pl-0">
                <StatCard title='New Contacts' count={stats.gained} border_color='success' />
            </div>
            <div className="col-3 px-0">
                <StatCard title='Unsubscribed Contacts' count={stats.unsubscribed} border_color='secondary' />
            </div>
        </div>
    </div>
}

export default AudienceDashboard;