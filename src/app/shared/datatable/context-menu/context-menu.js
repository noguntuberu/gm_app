import React, { useState } from 'react';

import './context-menu.css';

const ContextMenu = props => {
    const { actions, callback } = props;
    const [show_menu, setShowMenu] = useState(false);

    const toggleShowMenu = (e) => {
        setShowMenu(!show_menu);

        //
        e.stopPropagation();
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
            {show_menu ?
                <div className="gm-action-wrap">
                    <div className="gm-action-context-menu">
                        <ul>
                            {actions.map((action, index) => <li key={index} onClick={e => selectAction(action, e)}>{action}</li>)}
                        </ul>
                    </div>
                </div>
                :
                <div></div>
            }
        </div>
    )
}

export default ContextMenu;