import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './view.css';
import AudienceContacts from './contacts';
import Dashboard from './dashboard/dashboard';
import AudienceUpdationForm from '../edit/edit';
import GmModal from '../../../shared/modal/modal';
import ImportContacts from '../../contacts/import/import';
import FloatingNav from '../../../shared/nav/floating/floating';
import { setPageTitle } from '../../../../store/actions/header';
import * as AudienceService from '../../../../services/audience';
import * as CampaignService from '../../../../services/campaign';
import * as ContactService from '../../../../services/contact';


const ViewMailingList = () => {
    let { id } = useParams();
    let dispatch = useDispatch();
    let { token } = useSelector(state => state.user_data);

    let [is_dashboard_view, setIsDashboardView] = useState(true);

    let [list_campaigns, setListCampaigns] = useState([]);
    let [list_contacts, setListContacts] = useState([]);
    let [mailing_list, setMailingList] = useState({});

    let [show_updation_modal, setShowUpdationModal] = useState(false);
    let [show_upload_modal, setShowUploadModal] = useState(false);
    let [show_floating_nav, setShowFloatingNav] = useState(true);

    useEffect(() => {
        AudienceService.readById(id, { token }).then(async response => {
            const { payload: audience } = response;

            setMailingList(audience);
            dispatch(setPageTitle(audience.name));

            let contact_ids = [], contact_map = {};
            audience.contacts.forEach(contact => {
                contact_ids.push(contact.id);
                contact_map[contact.id] = contact;
            });

            let {
                error,
                payload: audience_contacts
            } = await ContactService.read({ token, query_string: `id=${contact_ids}` });

            if (error) return;

            let filtered_contacts = [];
            audience_contacts.forEach(contact => {
                if (!contact_map[contact.id]) return;
                filtered_contacts.push(contact_map[contact.id]);
            })

            setListContacts(filtered_contacts);
        }).catch(error => {
            alert(`Error: ${error.message}`);
        });

        CampaignService.read({ query_string: `mailing_lists=${id}`, token }).then(response => {
            const { error, payload } = response;
            if (error) {
                alert('could not fetch list campaigns');
                return
            }

            setListCampaigns(payload);
        }).catch(error => {
            alert(`Error: could not fetch list campaigns`);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return <div>
        <FloatingNav is_open={show_floating_nav}>
            <div className="icon-tray text-blue-4">
                {
                    is_dashboard_view ?
                        <div className="floating-action-btn" onClick={() => setIsDashboardView(false)}>
                            <span className="material-icons"> table_view</span>
                        </div> :
                        <div className="floating-action-btn" onClick={() => setIsDashboardView(true)}>
                            <span className="material-icons"> dashboard </span>
                        </div>
                }
                <div className="floating-action-btn" onClick={() => setShowUpdationModal(true)}>
                    <span className="material-icons"> edit</span>
                </div>
                <div className="floating-action-btn" onClick={() => setShowUploadModal(true)}>
                    <span className="material-icons"> drive_folder_upload </span>
                </div>
                <div
                    className="floating-action-btn mobile"
                    onClick={() => setShowFloatingNav(false)}
                >
                    <span className="material-icons">visibility_off</span>
                </div>
            </div>
        </FloatingNav>

        <div className="dashboard">
            {is_dashboard_view ?
                <div className="mt-3">
                    <Dashboard contacts={list_contacts} campaigns={list_campaigns} />
                </div> :
                <div className="mt-4">
                    <AudienceContacts audience_contacts={list_contacts} list_id={id} />
                </div>
            }
        </div>

        <GmModal title="Edit Audience" show_title={true} show_modal={show_updation_modal} onClose={() => setShowUpdationModal(false)}>
            <AudienceUpdationForm mailing_list={mailing_list} />
        </GmModal>
        <GmModal title="Import Contacts" show_title={true} show_modal={show_upload_modal} onClose={() => setShowUploadModal(false)}>
            <ImportContacts mailing_list={mailing_list} />
        </GmModal>
    </div>
}

export default ViewMailingList;