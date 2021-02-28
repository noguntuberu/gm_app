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

import * as icon_datatable from '../../../../assets/icons/gm-datatable.png';
import * as icon_dashboard from '../../../../assets/icons/gm-dashboard.png';
import * as icon_edit from '../../../../assets/icons/gm-edit.png';
import * as icon_import_contacts from '../../../../assets/icons/gm-upload.png';


const ViewMailingList = () => {
    let { id } = useParams();
    let dispatch = useDispatch();
    let { token } = useSelector(state => state.user_data);
    let icons_tray = useRef();

    let [is_dashboard_view, setIsDashboardView] = useState(true);

    let [list_campaigns, setListCampaigns] = useState([]);
    let [mailing_list, setMailingList] = useState({});
    let [show_updation_modal, setShowUpdationModal] = useState(false);
    let [show_upload_modal, setShowUploadModal] = useState(false);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return <div>
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
            <div className="audience-dashboard">
                <Dashboard contacts={mailing_list.contacts} campaigns={list_campaigns} />
            </div> :
            <div className="mt-3">
                <AudienceContacts audience_contacts={mailing_list.contacts} list_id={id} />
            </div>
        }

        <div className="floating-btn-wrapper">
            <div className="icon-tray" ref={icons_tray}>
                {
                    is_dashboard_view ?
                        <div className="floating-action-btn">
                            <img alt="View Audience's Contact" src={icon_datatable} onClick={() => setIsDashboardView(false)} />
                        </div> :
                        <div className="floating-action-btn" onClick={() => setIsDashboardView(true)}>
                            <img alt="View Audience's Dashboard" src={icon_dashboard} />
                        </div>
                }
                <div className="floating-action-btn">
                    <img alt="Edit Audience" src={icon_edit} onClick={() => setShowUpdationModal(true)} />
                </div>
                <div className="floating-action-btn">
                    <img alt="Import Contacts" src={icon_import_contacts} onClick={() => setShowUploadModal(true)} />
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