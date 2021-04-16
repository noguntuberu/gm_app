import React from 'react';

import './dialog.css';
const ConfirmationDialog = ({ message, callback, is_open }) => {

    return <>{
        is_open ?
            <div className="dialog-veil">
                <div className="dialog-content-wrapper">
                    <div className="dialog-message">
                        {message}
                    </div>
                    <div className="dialog-actions">
                        <div className="gm-btn" onClick={() => callback(false)}>Cancel</div>
                        <div className="gm-btn" onClick={() => callback(true)}>proceed</div>
                    </div>
                </div>
            </div>
            :
            <></>
    }
    </>
}

export default ConfirmationDialog;