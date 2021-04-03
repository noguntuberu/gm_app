import React from 'react';
import { NavLink } from 'react-router-dom';
import './item.css';

const SideNavItem = props => {
    let { title, name, path, onClick, onItemClick } = props

    let handleItemClick = () => {
        if (onClick) {
            onClick();
        }

        onItemClick();
    }

    return <>{
        !path ?
            <div className="side-nav-item text-blue-11" onClick={handleItemClick}>
                <div>
                    <div className="nav-icon">
                        <span class="material-icons"> {name} </span>
                    </div>
                    <div className="nav-title">{title}</div>
                </div>
            </div> :
            <NavLink to={path} exact={true} className="side-nav-item text-blue-11" onClick={handleItemClick}>
                <div>
                    <div className="nav-icon">
                        <span class="material-icons"> {name} </span>
                    </div>
                    <div className="nav-title">{title}</div>
                </div>
            </NavLink>
    }</>
}

export default SideNavItem;