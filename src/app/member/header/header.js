/** */
import React from 'react';
import { useSelector } from 'react-redux';
import './header.css';
import hamburger_menu from '../../../assets/icons/hamburger.svg';

const MemberAreaHeader = props => {
    let { onHamburgerClick } = props;
    let { page_title } = useSelector(state => state.header);

    return <header className="member-area-header">
        <div className="">
            <div className="header-body">
                <div className="hamburger-icon" onClick={onHamburgerClick}><img alt="Hamburger Menu" src={hamburger_menu} /></div>
                <div className="page-title">{page_title}</div>
            </div>
            {/* <div className="page-title-underline"></div> */}
        </div>
    </header>
}

export default MemberAreaHeader;