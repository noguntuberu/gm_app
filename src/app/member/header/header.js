/** */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContextMenu from '../../shared/datatable/context-menu/context-menu';
import { addDataToStore } from '../../../store/actions/user-data';

import './header.css';

const MemberAreaHeader = props => {
    let { onHamburgerClick } = props;
    let dispatch = useDispatch();
    let { page_title } = useSelector(state => state.header);
    let { firstname, lastname } = useSelector(state => state.user_data);

    let icon_user_actions = [<span className="text-blue-5">{`${firstname} ${lastname}`} </span>, 'Log Out',];
    let icon_new_actions = ['Campaign', 'Contact', 'Audience'];

    let handleLogout = () => {
        dispatch(addDataToStore({}));
    };

    let handleUserAction = (data) => {
        switch (data.toLowerCase()) {
            case 'log out':
                handleLogout();
                break;
            default:
        }
    }

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
                    <ContextMenu actions={icon_new_actions} callback={e => e} text={<span className="material-icons"> add </span>} />
                </div>
                <div className="icon user gm-bg-blue-5 text-blue-11">
                    <ContextMenu actions={icon_user_actions} callback={handleUserAction} text={firstname[0]} />
                </div>
            </div>
        </div>
    </header>
}

export default MemberAreaHeader;