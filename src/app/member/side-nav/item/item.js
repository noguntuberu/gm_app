import React from 'react';
import { useHistory } from 'react-router-dom';
import './item.css';

const SideNavItem = props => {
    let { icon, title, path, onItemClick } = props
    let history = useHistory();

    let handleItemClick = () => {
        onItemClick();
        history.push(path);
    }
    return <div className="side-nav-item" onClick={handleItemClick}>
        <div className="nav-icon">
            <img alt={`${title} icon`} src={icon} />
        </div>
        <div className="nav-title">{title}</div>
    </div>
}

export default SideNavItem;