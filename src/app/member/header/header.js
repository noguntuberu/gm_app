/** */
import React from 'react';
import { useSelector } from 'react-redux';
import './header.css';

const MemberAreaHeader = props => {
    let { onHamburgerClick } = props;
    let { page_title } = useSelector(state => state.header);

    return <header className="member-area-header">
        <div className="">
            <div className="header-body">
                <div className="hamburger-icon text-blue-4" onClick={onHamburgerClick}>
                    <span class="material-icons"> menu </span>
                </div>
                <div className="page-title text-blue-4">{page_title}</div>
            </div>
            {/* <div className="page-title-underline"></div> */}
        </div>
    </header>
}

export default MemberAreaHeader;