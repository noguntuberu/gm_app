import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './view.css';
import AudienceContacts from './contacts';
import Dashboard from './dashboard/dashboard';
import AudienceUpdationForm from '../edit/edit';
import GmModal from '../../../shared/modal/modal';
import ImportContacts from '../../contacts/import/import';
import { setPageTitle } from '../../../../store/actions/header';
import * as AudienceService from '../../../../services/audience';
import * as CampaignService from '../../../../services/campaign';
import * as ContactService from '../../../../services/contact';

import icon_datatable from '../../../../assets/icons/table.svg';
import icon_dashboard from '../../../../assets/icons/graph-white.svg';
import icon_edit from '../../../../assets/icons/edit.svg';
import icon_import_contacts from '../../../../assets/icons/upload.svg';


const ViewMailingList = () => {
    let { id } = useParams();
    let dispatch = useDispatch();
    let { token } = useSelector(state => state.user_data);
    let icons_tray = useRef();

    let [is_dashboard_view, setIsDashboardView] = useState(true);

    let [list_campaigns, setListCampaigns] = useState([]);
    let [list_contacts, setListContacts] = useState([]);
    let [mailing_list, setMailingList] = useState({});
    let [show_updation_modal, setShowUpdationModal] = useState(false);
    let [show_upload_modal, setShowUploadModal] = useState(false);

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

    return <div >
        {/* <div>
            <div className="content-header-wrapper">
                <div className="content-header-actions">
                    <button className="gm-btn gm-btn-info btn-sm  shadow" onClick={() => setShowUpdationModal(true)}>Edit</button>
                    <button className="gm-btn gm-btn-primary ml-3  btn-sm  shadow" onClick={() => setShowUploadModal(true)}>Import Contacts</button>
                    {is_dashboard_view ?
                        <button className="gm-btn gm-btn-secondary btn-sm  ml-3  shadow" onClick={() => setIsDashboardView(false)}>View Contacts</button> :
                        <button className="gm-btn gm-btn-secondary btn-sm  ml-3  shadow" onClick={() => setIsDashboardView(true)}>View Dashboard</button>
                    }
                </div>
            </div>
        </div> */}
        {is_dashboard_view ?
            <div className="content-wrapper audience-dashboard mt-3">
                <Dashboard contacts={list_contacts} campaigns={list_campaigns} />
            </div> :
            <div className="">
                <AudienceContacts audience_contacts={list_contacts} list_id={id} />
            </div>
        }

        <div className="floating-btn-wrapper">
            <div className="icon-tray" ref={icons_tray}>
                {
                    is_dashboard_view ?
                        <div className="floating-action-btn" onClick={() => setIsDashboardView(false)}>
                            <img alt="Show audience's contact" src={icon_datatable} />
                        </div> :
                        <div className="floating-action-btn" onClick={() => setIsDashboardView(true)}>
                            <img alt="Show audience's dashboard" src={icon_dashboard} />
                        </div>
                }
                <div className="floating-action-btn" onClick={() => setShowUpdationModal(true)}>
                    <img alt="Show audience update form" src={icon_edit} />
                </div>
                <div className="floating-action-btn" onClick={() => setShowUploadModal(true)}>
                    <img alt="show contact upload modal" src={icon_import_contacts} />
                </div>
            </div>
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