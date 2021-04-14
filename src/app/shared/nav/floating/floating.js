/** */
import React, { useRef, useEffect, useState } from 'react';

const FloatingNav = ({ children, is_open }) => {
    let icons_tray = useRef();

    const [show_tray, setShowTray] = useState(is_open);

    useEffect(() => {
        console.log(show_tray);
    }, [show_tray]);

    return <div className="floating-btn-wrapper shadow" ref={icons_tray} onClick={() => setShowTray(true)}>
        {children}
    </div>
}

export default FloatingNav;