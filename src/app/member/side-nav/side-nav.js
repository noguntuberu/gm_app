import React, { useEffect, useRef } from 'react';
import SideNavItem from './item/item';
import './side-nav.css';
import * as icon_site from '../../../assets/icons/gm-logo-navy-wine.png';
import * as icon_dashboard from '../../../assets/icons/gm-dashboard.png';
import * as icon_campaign from '../../../assets/icons/gm-campaign.png';
import * as icon_new_campaign from '../../../assets/icons/gm-new-cmpaign.png';
import * as icon_contacts from '../../../assets/icons/gm-user.png';
import * as icon_new_contact from '../../../assets/icons/gm-new-user.png';
import * as icon_import_contacts from '../../../assets/icons/gm-upload.png';
import * as icon_audiences from '../../../assets/icons/gm-audience.png';
import * as icon_new_audience from '../../../assets/icons/gm-create-audience.png';

const SideNav = props => {
    let { open_tray, onTrayClose } = props;
    let veil = useRef();

    useEffect(() => {
        console.log({ open_tray })
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
            <div className="app-side-nav" onClick={ e => e.stopPropagation()}>
                <header>
                    <div className="nav-site-icon">
                        <img alt="Site Icon" src={icon_site} />
                    </div>
                    <div className="nav-site-name">
                        Go-Mailer
                    </div>
                </header>
                <section>
                    <SideNavItem title="Dashboard" icon={icon_dashboard} path="/dashboard" onItemClick={closeMenuTray} />
                    <div className="nav-divider"></div>
                    <SideNavItem title="All campaigns" icon={icon_campaign} path="/campaigns" onItemClick={closeMenuTray} />
                    <SideNavItem title="Create campaign" icon={icon_new_campaign} path="/campaigns/new" onItemClick={closeMenuTray} />
                    <div className="nav-divider"></div>
                    <SideNavItem title="All contacts" icon={icon_contacts} path="/contacts" onItemClick={closeMenuTray} />
                    <SideNavItem title="Create contact" icon={icon_new_contact} path="/contacts/new/single" onItemClick={closeMenuTray} />
                    <SideNavItem title="Import contacts" icon={icon_import_contacts} path="" onItemClick={closeMenuTray} />
                    <div className="nav-divider"></div>
                    <SideNavItem title="All audiences" icon={icon_audiences} path="/audiences" onItemClick={closeMenuTray} />
                    <SideNavItem title="Create audience" icon={icon_new_audience} path="" onItemClick={closeMenuTray} />

                    {/* <div className="side-sub-nav pl-5 pr-5 mt-4">
                    <div className="gm-btn btn-block gm-btn-secondary" onClick={() => history.push('/plans/choose')}>
                    Upgrade Plan
                    </div>
                </div> */}
                </section>
            </div >
        </nav >
    )
}

export default SideNav;