import React, { useEffect, useRef, useState } from 'react';
import SideNavItem from './item/item';
import './side-nav.css';

import icon_site from '../../../assets/icons/site-icon-color.svg';

import GmModal from '../../shared/modal/modal';
import ImportContact from '../../member/contacts/import/import';
import ListCreationForm from '../../member/mailing-lists/create/create';


const SideNav = props => {
    let { open_tray, onTrayClose } = props;
    let veil = useRef();

    const [show_upload_modal, setShowUploadModal] = useState(false);
    const [show_create_modal, setShowCreateModal] = useState(false);

    useEffect(() => {
        if (open_tray) {
            openMenuTray();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open_tray]);

    let closeMenuTray = () => {
        let tray = veil.current, tray_left = 0;
        fadeOutTrayBackground()
        let slideOutAmination = setInterval(() => {
            if (tray_left > 100) {
                tray.style.left = '100%';
                clearInterval(slideOutAmination);
                onTrayClose();
                return;
            }

            tray_left += 10;
            tray.style.left = `-${tray_left}%`;
        }, 20);
    }

    let fadeInTrayBackground = () => {
        let tray = veil.current, opacity = 0;
        let fadeInAnimation = setInterval(() => {
            if (opacity > 0.3) {
                tray.style.background = 'rgba(0, 0, 0, 0.35)';
                clearInterval(fadeInAnimation);
                return;
            }

            opacity += 0.1;
            tray.style.background = `rgba(0, 0, 0, ${opacity})`;
        }, 10);
    }



    let fadeOutTrayBackground = () => {
        let tray = veil.current, opacity = 0.35;
        let fadeOutAnimation = setInterval(() => {
            if (opacity < 0) {
                tray.style.background = 'rgba(0, 0, 0, 0)';
                clearInterval(fadeOutAnimation);
                return;
            }

            opacity -= 0.1;
            tray.style.background = `rgba(0, 0, 0, ${opacity})`;
        }, 10);
    }

    let openMenuTray = () => {
        let tray = veil.current, tray_left = 100;
        tray.style.background = 'rgba(0, 0, 0, 0)';
        let slideInAmination = setInterval(() => {
            if (tray_left < 0) {
                tray.style.left = 0;
                fadeInTrayBackground();
                clearInterval(slideInAmination);
                return;
            }

            tray_left -= 10;
            tray.style.left = `-${tray_left}%`;
        }, 20);
    }


    return (
        <nav className="side-nav-wrapper" ref={veil} onClick={() => closeMenuTray()}>
            <div className="app-side-nav gm-bg-blue-5" onClick={e => e.stopPropagation()}>
                <header>
                    <div className="nav-site-icon">
                        <img alt="Site Icon" src={icon_site} />
                    </div>
                    <div className="nav-site-name">
                        Go-Mailer
                    </div>
                </header>
                <section>
                    <SideNavItem title="Dashboard"
                        name="dashboard"
                        path="/dashboard"
                        onItemClick={closeMenuTray}
                    />
                    <div className="nav-divider"></div>
                    <SideNavItem title="All campaigns"
                        name="description"
                        path="/campaigns"
                        onItemClick={closeMenuTray}
                    />
                    <SideNavItem title="Create campaign"
                        name="note_add"
                        path="/campaigns/new"
                        onItemClick={closeMenuTray}
                    />
                    <div className="nav-divider"></div>
                    <SideNavItem title="All contacts"
                        name="person"
                        path="/contacts"
                        onItemClick={closeMenuTray}
                    />
                    <SideNavItem title="Create contact"
                        name="person_add"
                        path="/contacts/new/single"
                        onItemClick={closeMenuTray}
                    />
                    <SideNavItem title="Import contacts"
                        name="drive_folder_upload"
                        onClick={() => setShowUploadModal(true)}
                        onItemClick={closeMenuTray}
                    />
                    <div className="nav-divider"></div>
                    <SideNavItem title="All audiences"
                        name='group'
                        path="/audiences"
                        onItemClick={closeMenuTray}
                    />
                    <SideNavItem title="Create audience"
                        name="group_add"
                        onClick={() => setShowCreateModal(true)}
                        onItemClick={closeMenuTray}
                    />
                    <div className="nav-divider"></div>
                    <SideNavItem title="Integrations"
                        name="power"
                        path="/integrations"
                        onItemClick={closeMenuTray}
                    />
                    <SideNavItem title="Settings"
                        name="settings"
                        onItemClick={closeMenuTray}
                        path="/settings"
                    />
                    {/* <div className="side-sub-nav pl-5 pr-5 mt-4">
                    <div className="gm-btn btn-block gm-btn-secondary" onClick={() => history.push('/plans/choose')}>
                    Upgrade Plan
                    </div>
                </div> */}
                </section>
            </div >
            <div>
                <GmModal title="Import Contacts" show_title={true} show_modal={show_upload_modal} onClose={() => setShowUploadModal(false)}>
                    <ImportContact />
                </GmModal>
                <GmModal title="Create Audience" show_title={true} show_modal={show_create_modal} onClose={() => setShowCreateModal(false)}>
                    <ListCreationForm closeModal={() => setShowCreateModal(false)}/>
                </GmModal>
            </div>
        </nav >
    )
}

export default SideNav;