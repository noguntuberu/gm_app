/** */
import React from 'react';
import { useSelector } from 'react-redux';
import './header.css';

const MemberAreaHeader = props => {
    const { page_title } = useSelector(state => state.header);

    return <header className="member-area-header">
        <div className="">
            <div className="page-title">{page_title}</div>
            <div className="page-title-underline"></div>
        </div>
    </header>
}

export default MemberAreaHeader;