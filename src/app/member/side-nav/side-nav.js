import React from 'react';
import SideNavItem from './item/item';
import './side-nav.css';
import * as site_icon from '../../../assets/images/site-name-web.fw.png';

const SideNav = () => {
    return (
        <nav className="side-nav-wrapper d-none">
            <div class="app-side-nav">
                <header>
                    <div className="nav-site-icon">
                    </div>
                    <div className="nav-site-name">
                        <img src={site_icon} alt="Site Icon" />
                    </div>
                </header>
                <section>
                    <SideNavItem title="Dashboard" icon={''} path="/dashboard" />
                    <div className="nav-divider"></div>
                    <SideNavItem title="All campaigns" icon={''} path="/campaigns" />
                    <SideNavItem title="Create campaign" icon={''} path="/campaigns/new" />
                    <div className="nav-divider"></div>
                    <SideNavItem title="All contacts" icon={''} path="/contacts" />
                    <SideNavItem title="Create contact" icon={''} path="/contacts/new/single" />
                    <SideNavItem title="Import contacts" icon={''} path="" />
                    <div className="nav-divider"></div>
                    <SideNavItem title="All audiences" icon={''} path="/audiences" />
                    <SideNavItem title="Create audience" icon={''} path="" />

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