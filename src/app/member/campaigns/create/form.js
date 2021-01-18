/** */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Select from 'react-select';
import MultiSelect from 'react-multi-select-component';
import { apiPost, URLS, apiGet } from '../../../../utilities/api/api';
import { generateHTMLFormDateTimeDefaults } from '../../../shared/utils/date';
import { isEmailValid } from '../../../shared/utils/input';
import { Editor } from '../../../../vendors/@tinymce/tinymce-react/lib/es2015/main/ts/index';

import { addOneCampaignToStore } from '../../../../store/actions/campaign';
import { setPageTitle } from '../../../../store/actions/header';

import './form.css';
import GmModal from '../../../shared/modal/modal';

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
    const [schedule, setCampaignSchedule] = useState(generateHTMLFormDateTimeDefaults());
    const [selected_lists, setSelectedLists] = useState([]);
    const [sender_email, setSenderEmail] = useState('');
    const [sender_name, setSenderName] = useState('');

    const [show_wildcard_modal, setShowWildcardModal] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle('New Campaign'));
        apiGet(`${URLS.mailing_lists}`, { token }).then(response => {
            const { payload } = response;
            if (payload) {
                setMailingLists(payload);
            }
        });
    }, []);

    const handleEditorChange = data => {
        setCampaignBody(data);
    }

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

        if (!isEmailValid(sender_email)) {
            alert('Invalid Sender Email');
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
                <label htmlFor="campaign_title">Name</label>
                <input className="gm-input" id="campaign_title" type="text" defaultValue={campaign_name} onInput={e => setCampaignName(e.target.value)} />
            </div>
            <div className="form-group">
                <div className="p-0 pr-2 col-8">
                    <label htmlFor="campaign_subject">Subject</label>
                    <input className="gm-input" id="campaign_subject" type="text" defaultValue={campaign_subject} onInput={e => setCampaignSubject(e.target.value)} />
                </div>
                <div className="p-0 pl-2 col-4">
                    <label htmlFor="campaign_schedule">Schedule</label>
                    <input
                        className="gm-input"
                        id="campaign_schedule"
                        type="date"
                        name="campaign-schedule"
                        defaultValue={schedule}
                        onChange={e => setCampaignSchedule(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="p-0 pr-2 col-4">
                    <label htmlFor="sender_name">Sender's name</label>
                    <input className="gm-input" id="sender_name" type="text" defaultValue={sender_name} onInput={e => setSenderName(e.target.value)} />
                </div>
                <div className="p-0 pl-2 pr-2 col-4">
                    <label htmlFor="sender_email">Sender's email</label>
                    <input className="gm-input" id="sender_email" type="text" defaultValue={sender_email} onInput={e => setSenderEmail(e.target.value)} />
                </div>
                <div className="p-0 pl-2 col-4">
                    {/* <Select
                        options={mailing_lists.map(list => ({ label: list.name, value: list.id }))}
                        onChange={setSelectedLists}
                        value={selected_lists}
                        isMulti={true}
                        placeholder='Select Mailing list'
                    // className='mailing-list-selector'
                    /> */}

                    <label htmlFor="campaign_list">Audiences</label>
                    <MultiSelect
                        options={mailing_lists.map(list => ({ label: list.name, value: list.id }))}
                        onChange={setSelectedLists}
                        value={selected_lists}
                        // isMulti={true}
                        labelledBy='Select Audience'
                        id="campaign list"
                    />
                </div>
            </div>
            <div className="w-100 p-2">
                {/* <span className="text-info is-clickable" onClick={() => setShowWildcardModal(true)}>** <b>Click Here </b> to see supported @ wildcards.</span> */}
            </div>
            <div className="form-group">
                <Editor
                    body_class="campaign_editor"
                    id="campaign_create"
                    init={config}
                    initialValue={campaign_body}
                    onEditorChange={e => handleEditorChange(e)}
                />
            </div>
            <div className="form-group">
                {loading ?
                    <button className="col-2 float-right gm-btn gm-btn-primary" disabled>Saving...</button> :
                    <button className="col-2 float-right gm-btn gm-btn-primary shadow" onClick={() => submitCampaign()} >Save</button>
                }
            </div>
            <GmModal title="Supported wildcards" show_title={true} show_modal={show_wildcard_modal} onClose={() => setShowWildcardModal(false)}>
                <div className="wildcard-list">
                    <ol>
                        <li>@firstname - Contact's first name.</li>
                        <li>@lastname - Contact's last name.</li>
                        <li>@date_of_birth - Contact's date_of_birth.</li>
                    </ol>
                </div>
            </GmModal>
        </div>
    )
}

export default CampaignCreationForm;