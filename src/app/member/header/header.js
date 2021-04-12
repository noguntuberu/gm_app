/** */
import React from 'react';
import { useSelector } from 'react-redux';
import ContextMenu from '../../shared/datatable/context-menu/context-menu';

import './header.css';

const MemberAreaHeader = props => {
    let { onHamburgerClick } = props;
    let { page_title } = useSelector(state => state.header);
    let { firstname, lastname } = useSelector(state => state.user_data);

    let icon_user_actions = ['Log 0ut', `${firstname} ${lastname}` ];
    let icon_new_actions = ['Campaign', 'Contact', 'Audience']
    return <header className="member-area-header shadow-sm">
        <div className="header-body">
            <div>
                <div className="hamburger-icon text-blue-4" onClick={onHamburgerClick}>
                    <span className="material-icons"> menu </span>
                </div>
                <div className="page-title text-blue-4">{page_title}</div>
            </div>

            <div className="header-actions">
                <div className="icon gm-bg-green-5 text-blue-11 mr-2">
                    <span className="material-icons"> add </span>
                </div>
                <div className="icon user gm-bg-blue-5 text-blue-11">
                    <ContextMenu actions={icon_user_actions} callback={e => e} text={firstname[0]} />
                </div>
            </div>
        </div>
    </header>
}

export default MemberAreaHeader;