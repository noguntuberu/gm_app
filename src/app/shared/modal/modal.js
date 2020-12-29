/** */
import React, { useEffect, useState, createRef } from 'react';

import './modal.css';

const GmModal = ({ children, title, show_title, show_modal, onClose }) => {

    /** REFS */
    const modal_veil = createRef();
    const modal_body = createRef();

    /** */
    useEffect(() => {
        if (show_modal) {
            fadeIn();
        }
    }, [show_modal]);

    const fadeIn = () => {
        if (!modal_veil || !modal_veil.current) return;
        const veil = modal_veil.current; let opacity = 0;
        const body = modal_body.current;

        veil.style.display = 'flex';
        body.style.opacity = 0;
        const fade_in_animation = setInterval(() => {
            if (opacity > 0.4) {
                body.style.opacity = 1;
                clearInterval(fade_in_animation);
                return;
            }

            opacity += 0.1;
            veil.style.background = `rgba(0,0,0, ${opacity})`;
            body.style.opacity = opacity;
        }, 65);
    }

    const fadeOut = () => {
        if (!modal_veil || !modal_veil.current) return;

        const veil = modal_veil.current; let opacity = 0.4;
        const body = modal_body.current;

        const fade_out_animation = setInterval(() => {
            if (opacity <= 0) {
                veil.style.display = 'none';
                clearInterval(fade_out_animation);
                onClose();
                return;
            }

            opacity -= 0.1;
            veil.style.background = `rgba(0,0,0, ${opacity})`;
            body.style.opacity = opacity;
        }, 65);
    }

    return (
        <div>
            {<div className="gm-modal" ref={modal_veil} onClick={() => fadeOut()}>
                <div className="gm-modal-body" ref={modal_body} onClick={e => e.stopPropagation()}>
                    <div className="gm-modal-header">
                        {show_title ? <div className="gm-modal-title"> <h5>{title}</h5></div> : <div></div>}
                        <div className="gm-modal-close-icon" onClick={() => fadeOut()}>&times;</div>
                    </div>
                    <div className="gm-modal-content">
                        {children}
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default GmModal;