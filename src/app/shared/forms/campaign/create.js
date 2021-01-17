/** */
import React, { useState } from 'react';
import { Editor } from '../../../../vendors/@tinymce/tinymce-react/lib/es2015/main/ts/index';

import './create.css';

const CampaignCreationForm = props => {
    const { config } = props;

    const [campaign_body, setCampaignBody] = useState('');
    const [campaign_name, setCampaignName] = useState('');
    const [campaign_subject, set_campaignSubject] = useState('');
    const [sender_email, setSenderEmail] = useState('');
    const [sender_name, setSenderName] = useState('');
    
    const submitCampaign = () => {
        console.log(config);
    }

    return (
        <div>
            <div className="form-group">
                <input id="campaign_title" placeholder="Name" type="text" defaultValue={campaign_name} onInput={e => setCampaignName(e.target.value)} />
            </div>
            <div className="form-group">
                <div className="p-0">
                    <input id="campaign_subject" placeholder="Subject" type="text" defaultValue={campaign_subject} onInput={e => set_campaignSubject(e.target.value)} />
                </div>
            </div>
            <div className="form-group">
                <div className="p-0 pr-2 col-6">
                    <input id="sender_name" placeholder="Sender Name" type="text" defaultValue={sender_name} onInput={e => setSenderName(e.target.value)} />
                </div>
                <div className="p-0 pl-2 col-6">
                    <input id="sender_email" placeholder="Sender email address" type="text" defaultValue={sender_email} onInput={e => setSenderEmail(e.target.value)} />
                </div>
            </div>
            <div className="form-group">
                <Editor
                    body_class="campaign_editor"
                    id="campaign_create"
                    init={config.default}
                    initialValue={campaign_body}
                    onEditorChange={e => setCampaignBody(e)}
                />
            </div>
            <div className="form-group">
                <button className="col-2 float-right gm-btn gm-btn-primary shadow" onClick={() => submitCampaign()} >Save</button>
            </div>
        </div>
    )
}

export default CampaignCreationForm;