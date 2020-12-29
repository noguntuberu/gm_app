import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faNewspaper, faAddressBook } from '@fortawesome/free-solid-svg-icons';

import './side-nav.css';
const SideNav = () => {

    return (
        <nav className="app-side-nav">
            <div className="accordion" id="side-nav">
                <div className="card side-sub-nav">
                    <div className="side-nav-header btn btn-block text-left collapsed"
                        data-toggle="collapse" data-target="#collapse-campaigns-nav"
                        aria-expanded="false" aria-controls="collapse-campaigns-nav"
                        id="campaigns-nav">
                        <FontAwesomeIcon icon={faNewspaper}  className="mt-1 mr-3" />
                        <span className="">
                            Campaigns
                        </span>
                    </div>
                    <div id="collapse-campaigns-nav" className="collapse w-100" aria-labelledby="campaigns-nav" data-parent="#side-nav">
                        <div className="card-body nav flex-column">
                            <a className="nav-link active" href="/campaigns/new">Create Campaign</a>
                            <a className="nav-link" href="/campaigns">My Campaigns</a>
                        </div>
                    </div>
                </div>
                <div className="card side-sub-nav">
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
                            <a className="nav-link active" href="/contacts/new/single">Create Contact</a>
                            <a className="nav-link active" href="/contacts/new/import">Import Contact</a>
                            <a className="nav-link" href="/contacts">My Contacts</a>
                        </div>
                    </div>
                </div>
                <div className="card side-sub-nav">
                    <div className="side-nav-header btn btn-block text-left collapsed"
                        data-toggle="collapse" data-target="#collapse-mailing-lists-nav"
                        aria-expanded="false" aria-controls="collapse-mailing-lists-nav"
                        id="mailing-lists-nav">
                        <FontAwesomeIcon icon={faAddressBook} className="mt-1 mr-3" />
                        <span className="">
                            Mailing Lists
                        </span>
                    </div>
                    <div id="collapse-mailing-lists-nav" className="collapse" aria-labelledby="mailing-lists-nav" data-parent="#side-nav">
                        <div className="card-body nav flex-column">
                            <a className="nav-link" href="/mailing-lists">My Lists</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SideNav;