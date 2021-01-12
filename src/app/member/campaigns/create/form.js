/** */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Select from 'react-select';
import MultiSelect from 'react-multi-select-component';
import { apiPost, URLS, apiGet } from '../../../../utilities/api/api';
import { generateHTMLFormDateTimeDefaults } from '../../../shared/utils/date';
import { Editor } from '../../../../vendors/@tinymce/tinymce-react/lib/es2015/main/ts/index';

import { addOneCampaignToStore } from '../../../../store/actions/campaign';

import './form.css';

const CampaignCreationForm = props => {
    const { config } = props;

    const dispatch = useDispatch();
    const user_data = useSelector(state => state.user_data);
    const { token } = user_data;
    const tenant_id = user_data.id;

    const [campaign_body, setCampaignBody] = useState('');
    const [campaign_name, setCampaignName] = useState('');
    const [campaign_subject, setCampaignSubject] = useState('');
    const [loading, setLoading] = useState(false);
    const [mailing_lists, setMailingLists] = useState([]);
    const [schedule, setCampaignSchedule ] = useState(generateHTMLFormDateTimeDefaults());
    const [selected_lists, setSelectedLists] = useState([]);
    const [sender_email, setSenderEmail] = useState('');
    const [sender_name, setSenderName] = useState('');

    useEffect(() => {
        apiGet(`${URLS.mailing_lists}`, { token }).then(response => {
            const { payload } = response;
            if (payload) {
                setMailingLists(payload);
            }
        });
    }, []);

    const submitCampaign = () => {
        const data = {
            body: campaign_body,
            mailing_lists: selected_lists.map(list => list.value),
            name: campaign_name,
            schedule: {
                exists: true,
                date: Date.parse(schedule),
            },
            sender_email,
            sender_name,
            subject: campaign_subject,
            tenant_id,
        }

        if (!campaign_body || !campaign_name || !campaign_subject || !sender_email || !sender_name) {
            alert('please fill all fields');
            return;
        }

        setLoading(true);
        apiPost(`${URLS.campaigns}`, { data, token }).then(response => {
            const { error, payload } = response;

            if (error) {
                alert(error);
                return;
            }

            dispatch(addOneCampaignToStore(payload));
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div>
            <div className="form-group">
                <input className="form-control" id="campaign_title" placeholder="Campaign Name" type="text" defaultValue={campaign_name} onInput={e => setCampaignName(e.target.value)} />
            </div>
            <div className="form-group">
                <input className="form-control" id="campaign_subject" placeholder="Campaign Subject" type="text" defaultValue={campaign_subject} onInput={e => setCampaignSubject(e.target.value)} />
            </div>
            <div className="form-group">
                <div className="p-0 pr-2 col-6">
                    {/* <Select
                        options={mailing_lists.map(list => ({ label: list.name, value: list.id }))}
                        onChange={setSelectedLists}
                        value={selected_lists}
                        isMulti={true}
                        placeholder='Select Mailing list'
                    // className='mailing-list-selector'
                    /> */}

                    <MultiSelect
                        options={mailing_lists.map(list => ({ label: list.name, value: list.id }))}
                        onChange={setSelectedLists}
                        value={selected_lists}
                        // isMulti={true}
                        labelledBy='Select Mailing list'
                    />
                </div>
                <div className="p-0 pl-2 col-6">
                    <input
                        className="form-control"
                        id="campaign_subject"
                        type="datetime-local"
                        name="campaign-schedule"
                        value={generateHTMLFormDateTimeDefaults()}
                        min={generateHTMLFormDateTimeDefaults()}
                        onChange={e => setCampaignSchedule(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="p-0 pr-2 col-6">
                    <input className="form-control" id="sender_name" placeholder="Sender Name" type="text" defaultValue={sender_name} onInput={e => setSenderName(e.target.value)} />
                </div>
                <div className="p-0 pl-2 col-6">
                    <input className="form-control" id="sender_email" placeholder="Sender email address" type="text" defaultValue={sender_email} onInput={e => setSenderEmail(e.target.value)} />
                </div>
            </div>
            <div className="form-group">
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
                {loading ?
                    <button className="col-2 float-right btn btn-primary" disabled>Saving...</button> :
                    <button className="col-2 float-right btn btn-primary shadow" onClick={() => submitCampaign()} >Save</button>
                }
            </div>
        </div>
    )
}

export default CampaignCreationForm;