import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './view.css';
import ContextMenu from '../../../shared/datatable/context-menu/context-menu';

const ViewMailingList = () => {
    const { id } = useParams();
    const mailing_list = (useSelector(state => state.audiences))[id];
    const actions = ['Edit', 'Import Contacts', 'View Contacts'];
    const processAction = action => {

    }

    return <div>
        <div>
            <div className="content-header-wrapper">
                <div className="content-header">
                    <h3>{mailing_list.name}</h3>
                </div>
                <div className="content-header-actions">
                    <ContextMenu actions={actions} callback={processAction}/>
                </div>
            </div>
            <div className="content-tagline">
                <p>{mailing_list.description}</p>
            </div>
        </div>
        <div className="list-stats-wrapper">

        </div>
    </div>
}

export default ViewMailingList;