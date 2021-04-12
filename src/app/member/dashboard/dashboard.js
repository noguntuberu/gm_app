/** */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/actions/header';
import * as AudienceService from '../../../services/audience';
import * as CampaignService from '../../../services/campaign';
import * as ContactService from '../../../services/contact';
import StatCard from '../../shared/cards/stat';
import AudienceGraph from '../mailing-lists/view/dashboard/graph';

import './dashboard.css';
const GMDashboard = () => {
    let dispatch = useDispatch();
    let { token } = useSelector(state => state.user_data);

    let [number_of_audiences, setNumberOfAudiences] = useState(0);
    let [number_of_campaigns, setNumberOfCampaigns] = useState(0);
    let [number_of_unsubscribers, setNumberOfUnsubscribers] = useState(0);

    let [audience_contacts, setAudienceContacts] = useState([]);
    let [contacts, setContacts] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle('Dashboard'));
        AudienceService.read({ token, query_string: `return_only=contacts` }).then(response => {
            let { error, payload } = response;

            if (error) {
                alert(error);
                return;
            }

            let audience_contacts = payload.reduce((sum, aud_contacts) => [...sum, ...aud_contacts.contacts], []);
            setNumberOfAudiences(payload.length);
            setAudienceContacts(audience_contacts);
        }).catch(e => console.log(e)).finally(() => { });

        CampaignService.read({ token, query_string: 'count=1' }).then(response => {
            let { error, payload } = response;

            if (error) {
                alert(error);
                return;
            }

            setNumberOfCampaigns(payload.count);
        }).catch(e => console.log(e)).finally(() => { });

        ContactService.read({ token }).then(response => {
            let { error, payload } = response;

            if (error) {
                alert(error);
                return;
            }

            setContacts(payload);
        }).catch(e => console.log(e)).finally(() => { });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!audience_contacts) return;

        let unsubscriber_count = audience_contacts.reduce((sum, contact) => {
            if (!contact.is_unsubscribed) return sum;
            return sum += 1;
        }, 0);

        setNumberOfUnsubscribers(unsubscriber_count);
    }, [audience_contacts]);


    return <div className="dashboard">
        <section className="primary">
            <div className="mt-3">
                <div className="stat-card-pair-wrapper col-12 col-xl-6 p-0 p-sm-0 pr-xl-2">
                    <div className="col-6">
                        <StatCard title='Campaigns' count={number_of_campaigns} base_color={205} path="/campaigns" />
                    </div>
                    <div className="col-6">
                        <StatCard title='Contacts' count={contacts.length} base_color={130} path="/contacts" />
                    </div>
                </div>
                <div className="stat-card-pair-wrapper col-12 col-xl-6 p-0 p-sm-0">
                    <div className="col-6">
                        <StatCard title='Audiences' count={number_of_audiences} base_color={268} path="/audiences" />
                    </div>
                    <div className="col-6">
                        <StatCard title='Unsubscribers' count={number_of_unsubscribers} base_color={342} />
                    </div>
                </div>
            </div>
            <div className="shadow-sm border graph-wrapper">
                <AudienceGraph contacts={audience_contacts} />
            </div>
        </section>
        <section className="secondary">
            <div className="top-charts">
                <div className="title gm-bg-blue-5 text-blue-11"> Top Campaigns </div>
                <div>

                </div>
            </div>
            <div className="top-charts">
                <div className="title gm-bg-blue-5 text-blue-11"> Top Audiences </div>
                <div>

                </div>
            </div>
        </section>
    </div>
}

export default GMDashboard;