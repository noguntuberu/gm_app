import React, { useState, } from 'react';
import GmModal from '../../../shared/modal/modal';

import './create.css';

const CreateMailingList = () => {
    const [show_create_modal, setShowCreateModal] = useState(false);
    return <div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowCreateModal(true)} >Show Modal</button>
        <GmModal title="Create Mailing List" show_title={true} show_modal={show_create_modal} onClose={() => setShowCreateModal(false)}>
            <input type="text" />
        </GmModal>
    </div>
}

export default CreateMailingList;