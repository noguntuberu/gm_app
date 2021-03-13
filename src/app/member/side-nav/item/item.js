import React from 'react';
import { NavLink } from 'react-router-dom';
import './item.css';

const SideNavItem = props => {
    let { icons, title, path, onClick, onItemClick } = props

    let handleItemClick = () => {
        if (onClick) {
            onClick();
        }

        onItemClick();
    }

    return <>{
        !path ?
            <div className="side-nav-item" onClick={handleItemClick}>
                <div>
                    <div className="nav-icon">
                        <img alt={`${title} icon`} src={icons[0]} />
                    </div>
                    <div className="nav-title">{title}</div>
                </div>
            </div> :
            <NavLink to={path} exact={true} className="side-nav-item" onClick={handleItemClick}>
                <div>
                    <div className="nav-icon">
                        <img alt={`${title} icon`} src={icons[0]} />
                    </div>
                    <div className="nav-title">{title}</div>
                </div>
            </NavLink>
    }</>
}

export default SideNavItem;