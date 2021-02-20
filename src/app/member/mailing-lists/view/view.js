import React, { useState, useEffect } from 'react';
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

const ViewMailingList = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.user_data);

    const [is_dashboard_view, setIsDashboardView] = useState(true);
    const [list_campaigns, setListCampaigns] = useState([]);
    const [mailing_list, setMailingList] = useState({});
    const [show_updation_modal, setShowUpdationModal] = useState(false);
    const [show_upload_modal, setShowUploadModal] = useState(false);

    useEffect(() => {
        AudienceService.readById(id, { token }).then(response => {
            const { error, payload } = response;
            if (error) {
                alert('could not fetch list data');
                return
            }

            setMailingList(payload);
            dispatch(setPageTitle(payload.name));
        }).catch(error => {
            alert(`Error: ${error.message}`);
        });

        CampaignService.read({ query_string: `mailing_lists=${id}:`, token }).then(response => {
            const { error, payload } = response;
            if (error) {
                alert('could not fetch list campaigns');
                return
            }

            setListCampaigns(payload);
        }).catch(error => {
            alert(`Error: could not fetch list campaigns`);
        });
    }, [dispatch]);

    return <div>
        <div>
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
        </div>
        {is_dashboard_view ?
            <div className="audience-dashboard">
                <Dashboard contacts={mailing_list.contacts} campaigns={list_campaigns} />
            </div> :
            <div className="mt-3">
                <AudienceContacts contact_ids={mailing_list.contacts} list_id={id} />
            </div>
        }

        <GmModal title="Edit Audience" show_title={true} show_modal={show_updation_modal} onClose={() => setShowUpdationModal(false)}>
            <AudienceUpdationForm mailing_list={mailing_list} />
        </GmModal>
        <GmModal title="Import Contacts" show_title={true} show_modal={show_upload_modal} onClose={() => setShowUploadModal(false)}>
            <ImportContacts mailing_list={mailing_list} />
        </GmModal>
    </div>
}

export default ViewMailingList;