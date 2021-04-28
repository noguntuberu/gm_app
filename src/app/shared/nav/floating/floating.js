/** */
import React, { useRef } from 'react';
import './floating.css';

const FloatingNav = ({ children }) => {
    let icons_tray = useRef();
    let tray_opener = useRef();

    let closeTray = () => {
        let tray_width = icons_tray.current.clientWidth;
        let right = 10;
        let close_tray = setInterval(() => {
            if (right < -(tray_width)) {
                clearInterval(close_tray);
                tray_opener.current.style.display = 'block';
                return;
            }

            right -= 5;
            icons_tray.current.style.right = `${right}px`;
        }, 20);
    }

    let openTray = () => {
        let tray_width = icons_tray.current.clientWidth;
        let right = -tray_width;
        let open_tray = setInterval(() => {
            tray_opener.current.style.display = 'none';
            if (right > 0) {
                clearInterval(open_tray);
                return;
            }

            right += 5;
            icons_tray.current.style.right = `${right}px`;
        }, 20);
    }

    return <div
        className="floating-btn-wrapper shadow"
        ref={icons_tray}
    >
        <div className="tray-opener is-clickable" ref={tray_opener} onClick={openTray}></div>
        <div className="icon-tray text-blue-11">
            {children}
            <div className="floating-action-btn visibility" onClick={closeTray}>
                <span className="material-icons">visibility_off</span>
            </div>
        </div>
    </div>
}

export default FloatingNav;