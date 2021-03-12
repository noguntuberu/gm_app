import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import SideNavItem from './item/item';
import './side-nav.css';

import * as icon_site from '../../../assets/icons/site-icon-colored.png';
import * as icon_dashboard from '../../../assets/icons/graph-dark.png';
import * as icon_campaign from '../../../assets/icons/campaign-dark.png';
import * as icon_new_campaign from '../../../assets/icons/new-campaign-dark.png';
import * as icon_contacts from '../../../assets/icons/contact-dark.png';
import * as icon_new_contact from '../../../assets/icons/new-contact-dark.png';
import * as icon_import_contacts from '../../../assets/icons/upload-dark.png';
import * as icon_audiences from '../../../assets/icons/audience-dark.png';
import * as icon_new_audience from '../../../assets/icons/new-audience-dark.png';


import * as icon_dashboard_active from '../../../assets/icons/graph-active.png';
import * as icon_campaign_active from '../../../assets/icons/campaign-active.png';
import * as icon_new_campaign_active from '../../../assets/icons/new-campaign-active.png';
import * as icon_contacts_active from '../../../assets/icons/contact-active.png';
import * as icon_new_contact_active from '../../../assets/icons/new-contact-active.png';
import * as icon_import_contacts_active from '../../../assets/icons/upload-active.png';
import * as icon_audiences_active from '../../../assets/icons/audience-active.png';
import * as icon_new_audience_active from '../../../assets/icons/new-audience-active.png';

import GmModal from '../../shared/modal/modal';
import ImportContact from '../../member/contacts/import/import';
import ListCreationForm from '../../member/mailing-lists/create/create';


const SideNav = props => {
    let { open_tray, onTrayClose } = props;
    let veil = useRef();
    let { is_mobile_view } = useSelector(state => state.metadata);

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

    let determineIcon = (dark, light) => {
        return is_mobile_view ? dark : light;
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
            <div className="app-side-nav" onClick={e => e.stopPropagation()}>
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
                        icons={[icon_dashboard, icon_dashboard_active]}
                        path="/dashboard"
                        onItemClick={closeMenuTray}
                    />
                    <div className="nav-divider"></div>
                    <SideNavItem title="All campaigns"
                        icons={[icon_campaign, icon_campaign_active]}
                        path="/campaigns"
                        onItemClick={closeMenuTray}
                    />
                    <SideNavItem title="Create campaign"
                        icons={[icon_new_campaign, icon_new_campaign_active]}
                        path="/campaigns/new"
                        onItemClick={closeMenuTray}
                    />
                    <div className="nav-divider"></div>
                    <SideNavItem title="All contacts"
                        icons={[icon_contacts, icon_contacts_active]}
                        path="/contacts"
                        onItemClick={closeMenuTray}
                    />
                    <SideNavItem title="Create contact"
                        icons={[icon_new_contact, icon_new_contact_active]}
                        path="/contacts/new/single"
                        onItemClick={closeMenuTray}
                    />
                    <SideNavItem title="Import contacts"
                        icons={[icon_import_contacts, icon_import_contacts_active]}
                        onClick={() => setShowUploadModal(true)}
                        onItemClick={closeMenuTray}
                    />
                    <div className="nav-divider"></div>
                    <SideNavItem title="All audiences"
                        icons={[icon_audiences, icon_audiences_active]}
                        path="/audiences"
                        onItemClick={closeMenuTray}
                    />
                    <SideNavItem title="Create audience"
                        icons={[icon_new_audience, icon_new_audience_active]}
                        onClick={() => setShowCreateModal(true)}
                        onItemClick={closeMenuTray}
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
                    <ListCreationForm />
                </GmModal>
            </div>
        </nav >
    )
}

export default SideNav;