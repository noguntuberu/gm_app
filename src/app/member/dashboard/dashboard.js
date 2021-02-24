/** */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/actions/header';
import * as AudienceService from '../../../services/audience';
import * as CampaignService from '../../../services/campaign';
import * as ContactService from '../../../services/contact';
import StatCard from '../../shared/cards/stat';
import AudienceGraph from '../mailing-lists/view/dashboard/graph';

const GMDashboard = () => {
    let dispatch = useDispatch();
    let { token } = useSelector(state => state.user_data);

    let [number_of_audiences, setNumberOfAudiences] = useState(0);
    let [number_of_campaigns, setNumberOfCampaigns] = useState(0);
    let [number_of_contacts, setNumberOfContacts] = useState(0);
    let [number_of_unsubscribers, setNumberOfUnsubscribers] = useState(0);

    let [audiences, setAudiences] = useState([]);
    let [contacts, setContacts] = useState([]);
    let [audience_contacts, setAudienceContacts] = useState([]);

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
            setNumberOfContacts(payload.length);
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


    return <div>
        <div className="row ml-0 mt-4 px-0">
            <div className="col-3 pl-0">
                <StatCard title='Total Campaigns' count={number_of_campaigns} border_color='primary' />
            </div>
            <div className="col-3 pl-0">
                <StatCard title='Total Contacts' count={number_of_contacts} border_color='info' />
            </div>
            <div className="col-3 pl-0">
                <StatCard title='Total Audiences' count={number_of_audiences} border_color='info' />
            </div>
            <div className="col-3 px-0">
                <StatCard title='Unsubscribed Contacts' count={number_of_unsubscribers} border_color='secondary' />
            </div>
        </div>
        <div className="shadow-sm border row ml-0 mt-4 p-3 graph-wrapper">
            <AudienceGraph contacts={audience_contacts} />
        </div>
    </div>
}

export default GMDashboard;