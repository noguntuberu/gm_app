import React from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faNewspaper, faAddressBook, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { addDataToStore } from '../../../store/actions/user-data';
import './side-nav.css';
import { useDispatch } from 'react-redux';
import * as site_icon from '../../../assets/images/site-name.fw.png';
const SideNav = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(addDataToStore({}));
        history.push('/login');
    }

    return (
        <nav className="app-side-nav">
            <header>
                <div className="nav-site-icon">
                    <img src={site_icon} alt="Site Icon" />
                </div>
            </header>
            <div className="accordion h-100" id="side-nav">
                <div className="side-sub-nav">
                    <div className="side-nav-header btn btn-block text-left collapsed"
                        data-toggle="collapse" data-target="#collapse-campaigns-nav"
                        aria-expanded="false" aria-controls="collapse-campaigns-nav"
                        id="campaigns-nav">
                        <FontAwesomeIcon icon={faNewspaper} className="mt-1 mr-3" />
                        <span className="">
                            Campaigns
                        </span>
                    </div>
                    <div id="collapse-campaigns-nav" className="collapse w-100" aria-labelledby="campaigns-nav" data-parent="#side-nav">
                        <div className="card-body nav flex-column">
                            <div className="nav-link active" onClick={() => history.push('/campaigns/new')}>Create Campaign</div>
                            <div className="nav-link" onClick={() => history.push('/campaigns')}>My Campaigns</div>
                        </div>
                    </div>
                </div>
                <div className="side-sub-nav">
                    <div className="side-nav-header btn btn-block text-left"
                        data-toggle="collapse" data-target="#collapse-contacts-nav"
                        aria-expanded="true" aria-controls="collapse-contacts-nav"
                        id="contacts-nav">
                        <FontAwesomeIcon icon={faUsers} className="mt-1 mr-3" />
                        <span className="">
                            Contacts
                        </span>
                    </div>

                    <div id="collapse-contacts-nav" className="collapse" aria-labelledby="contacts-nav" data-parent="#side-nav">
                        <div className="card-body nav flex-column">
                            <div className="nav-link active" onClick={() => history.push("/contacts/new/single")}>Create Contact</div>
                            <div className="nav-link" onClick={() => history.push("/contacts")}>My Contacts</div>
                        </div>
                    </div>
                </div>
                <div className="side-sub-nav">
                    <div className="side-nav-header btn btn-block text-left collapsed"
                        data-toggle="collapse" data-target="#collapse-mailing-lists-nav"
                        aria-expanded="false" aria-controls="collapse-mailing-lists-nav"
                        id="mailing-lists-nav">
                        <FontAwesomeIcon icon={faAddressBook} className="mt-1 mr-3" />
                        <span className="">
                            Audiences
                        </span>
                    </div>
                    <div id="collapse-mailing-lists-nav" className="collapse" aria-labelledby="mailing-lists-nav" data-parent="#side-nav">
                        <div className="card-body nav flex-column">
                            <div className="nav-link" onClick={() => history.push("/audiences")}>My Audiences</div>
                        </div>
                    </div>
                </div>
                {/* <div className="side-sub-nav pl-5 pr-5 mt-4">
                    <div className="gm-btn btn-block gm-btn-secondary" onClick={() => history.push('/plans/choose')}>
                        Upgrade Plan
                    </div>
                </div> */}
            </div>
            <div className="side-nav-header logout-button-wrapper" onClick={() => handleLogOut()}>
                <FontAwesomeIcon icon={faSignOutAlt} className="mt-1 mr-3" />
                <span className="">
                    Log out
                </span>
            </div>
        </nav>
    )
}

export default SideNav;