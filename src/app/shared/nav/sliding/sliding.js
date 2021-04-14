import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import './sliding.css';
const SlidingNav = props => {
    let { nav_items, className } = props;

    let [items, setItems] = useState([]);
    useEffect(() => {
        setItems(nav_items);
    }, [nav_items]);

    return <div className={`sliding-nav ${className || ''}`}>
        {items.map(item => <span key={item.path}>
            <NavLink to={item.path}>{item.title || ''}</NavLink>
        </span>)}
    </div>
}

export default SlidingNav;