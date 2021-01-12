import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './view.css';
import AudienceContacts from './contacts';
import AudienceUpdationForm from '../edit/edit';
import GmModal from '../../../shared/modal/modal';
import ImportContacts from '../../contacts/import/import';

const ViewMailingList = () => {
    const { id } = useParams();
    const mailing_list = (useSelector(state => state.audiences))[id];

    const [is_dashboard_view, setIsDashboardView] = useState(true);
    const [show_updation_modal, setShowUpdationModal] = useState(false);
    const [show_upload_modal, setShowUploadModal] = useState(false);

    return <div>
        <div>
            <div className="content-header-wrapper">
                <div className="content-header">
                    <h3>{mailing_list.name}</h3>
                </div>
                <div className="content-header-actions">
                    <button className="btn btn-sm btn-primary" onClick={() => setShowUpdationModal(true)}>Edit</button>
                    <button className="btn btn-sm btn-info ml-2" onClick={() => setShowUploadModal(true)}>Import Contacts</button>
                    {is_dashboard_view ?
                        <button className="btn btn-sm btn-secondary ml-2" onClick={() => setIsDashboardView(false)}>View Contacts</button> :
                        <button className="btn btn-sm btn-secondary ml-2" onClick={() => setIsDashboardView(true)}>View Dashboard</button>
                    }
                </div>
            </div>
            <div className="content-tagline">
                <p>{mailing_list.description}</p>
            </div>
        </div>
        {is_dashboard_view ?
            <div className="audience-dashboard">

            </div> :
            <div>
                <AudienceContacts contact_ids={mailing_list.contacts} list_id={id}/>
            </div>
        }

        <GmModal title="Edit Mailing List" show_title={true} show_modal={show_updation_modal} onClose={() => setShowUpdationModal(false)}>
            <AudienceUpdationForm mailing_list={mailing_list}/>
        </GmModal>
        <GmModal title="Import Contacts" show_title={true} show_modal={show_upload_modal} onClose={() => setShowUploadModal(false)}>
            <ImportContacts mailing_list={mailing_list}/>
        </GmModal>
    </div>
}

export default ViewMailingList;