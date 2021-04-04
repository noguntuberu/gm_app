/** */
import React from 'react';
import { useSelector } from 'react-redux';
import './header.css';

const MemberAreaHeader = props => {
    let { onHamburgerClick } = props;
    let { page_title } = useSelector(state => state.header);

    return <header className="member-area-header">
        <div className="header-body">
            <div className="hamburger-icon text-blue-4" onClick={onHamburgerClick}>
                <span className="material-icons"> menu </span>
            </div>
            <div className="page-title text-blue-4">{page_title}</div>
        </div>
    </header>
}

export default MemberAreaHeader;