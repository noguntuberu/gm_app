/** */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDataToStore } from '../../../store/actions/user-data';

import ContextMenu from '../../shared/datatable/context-menu/context-menu';
import GmModal from '../../shared/modal/modal';
import ListCreationForm from '../../member/mailing-lists/create/create';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './header.css';

const MemberAreaHeader = ({ onHamburgerClick }) => {
    let dispatch = useDispatch();
    let history = useHistory();

    let { page_title } = useSelector(state => state.header);
    let { firstname, lastname } = useSelector(state => state.user_data);


    const [show_create_modal, setShowCreateModal] = useState(false);

    let icon_user_actions = [
        <span className="text-blue-5">{`${firstname} ${lastname}`} </span>,
        'Log Out',
    ];

    let icon_new_actions = [
        'Campaign',
        'Audience',
        'Contact',
    ];

    let handleLogout = () => {
        dispatch(addDataToStore({}));
    };

    let handleUserAction = (data) => {
        if (typeof data !== "string") return;

        switch (data.toLowerCase()) {
            case 'campaign':
                history.push('/campaigns/new');
                break;
            case 'contact':
                history.push('/contacts/new/single')
                break;
            case 'audience':
                setShowCreateModal(true);
                break;
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
                <div className="shadow-sm icon create gm-bg-green-5 text-blue-11 mr-2 mr-md-3">
                    <ContextMenu
                        actions={icon_new_actions}
                        callback={handleUserAction}
                        text={<div className="icon-create">
                            <span className="mr-2"><FontAwesomeIcon icon={faPlus} /> </span>
                            <span className="text">create</span>
                        </div>}
                    />
                </div>
                <div className=" shadow-sm icon user gm-bg-blue-5 text-blue-11">
                    <ContextMenu
                        actions={icon_user_actions}
                        callback={handleUserAction}
                        text={<span className="icon-user">{firstname[0]}</span>} />
                </div>
            </div>
        </div>
        <div>
            <GmModal title="Create Audience" show_title={true} show_modal={show_create_modal} onClose={() => setShowCreateModal(false)}>
                <ListCreationForm closeModal={() => setShowCreateModal(false)} />
            </GmModal>
        </div>
    </header>
}

export default MemberAreaHeader;