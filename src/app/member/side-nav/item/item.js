import React from 'react';
import { useHistory } from 'react-router-dom';
import './item.css';

const SideNavItem = props => {
    let { icon, title, path } = props
    const history = useHistory();

    return <div className="side-nav-item">
        <div className="nav-icon" onClick={() => history.push(path || '')}>
            {icon || ''}
        </div>
        <div className="nav-title">{title}</div>
    </div>
}

export default SideNavItem;