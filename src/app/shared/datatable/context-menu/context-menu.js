import React, { useState, useEffect, useRef } from 'react';

import './context-menu.css';

const ContextMenu = ({ actions, callback, text }) => {
    const [show_menu, setShowMenu] = useState(false);
    const [menu_clicked, setMenuClicked] = useState(false);
    const context_menu = useRef(null);
    const menu_wrapper = useRef(null);

    useEffect(() => {
        let menu = context_menu.current;
        window.addEventListener('click', () => {
            if (!menu_clicked && show_menu) {
                setShowMenu(() => false);
                setMenuClicked(() => false);
            };
        }, { once: true });

        if (context_menu.current) {
            let menu_tray = menu_wrapper.current;
            menu.addEventListener('click', () => {
                setMenuClicked(() => true);
            }, { once: true });

            /** alsways position menu tray in-view */
            let menu_left = menu.offsetLeft;
            let offset_limit = Math.floor(window.innerWidth / 2);
            if (menu_left > 0 && menu_left < offset_limit) {
                menu_tray.style.right = `-${menu_left}px`;
            }
        }

    }, [show_menu, menu_clicked]);

    const toggleShowMenu = (e) => {
        setShowMenu(show_menu => !show_menu);
    }

    const selectAction = (action, e) => {
        callback(action);

        //
        e.stopPropagation();
        toggleShowMenu(e);
    }

    return <>
        <div className="context-menu-label" onClick={e => toggleShowMenu(e)}>{text || '...'}</div>
        {actions ? <div>
            {show_menu ?
                <div ref={context_menu} className="gm-action-wrap">
                    <div ref={menu_wrapper} className="gm-action-context-menu">
                        <ul>
                            {(actions || []).map((action, index) => <li key={index} onClick={e => selectAction(action, e)}>{action}</li>)}
                        </ul>
                    </div>
                </div>
                :
                <div></div>
            }
        </div> : <></>}
    </>
}

export default ContextMenu;