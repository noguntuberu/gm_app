import React from 'react';
import { useHistory } from 'react-router-dom';
import './item.css';

const SideNavItem = props => {
    let { icons, title, path, onClick, onItemClick } = props
    let history = useHistory();

    let handleItemClick = () => {
        if(onClick) {
            onClick();
        }
        
        onItemClick();
        history.push(path);
    }

    return <div className="side-nav-item" onClick={handleItemClick}>
        <div className="nav-icon">
            <img alt={`${title} icon`} src={icons[0]} />
        </div>
        <div className="nav-title">{title}</div>
    </div>
}

export default SideNavItem;