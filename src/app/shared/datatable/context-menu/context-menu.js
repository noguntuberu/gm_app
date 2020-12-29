import React, { useState, useEffect, useRef } from 'react';

import './context-menu.css';

const ContextMenu = props => {
    const { actions, callback } = props;
    const [show_menu, setShowMenu] = useState(false);
    const [menu_clicked, setMenuClicked] = useState(false);
    const context_menu = useRef(null);

    useEffect(() => {
        window.addEventListener('click', () => {
            if (!menu_clicked && show_menu) {
                setShowMenu(false);
                setMenuClicked(false);
            };
        }, { once: true });

        if (context_menu.current) {
            context_menu.current.addEventListener('click', () => {
                setMenuClicked(true);
            }, { once: true });
        }
    });

    const toggleShowMenu = (e) => {
        setShowMenu(!show_menu);
    }

    const selectAction = (action, e) => {
        callback(action);

        //
        e.stopPropagation();
        toggleShowMenu(e);
    }
    return (
        <div>
            <div onClick={e => toggleShowMenu(e)}> Action</div>
            { actions ? <div>
                {show_menu ?
                    <div ref={context_menu} className="gm-action-wrap">
                        <div className="gm-action-context-menu">
                            <ul>
                                {(actions).map((action, index) => <li key={index} onClick={e => selectAction(action, e)}>{action}</li>)}
                            </ul>
                        </div>
                    </div>
                    :
                    <div></div>
                }
            </div> : <></>}
        </div>
    )
}

export default ContextMenu;