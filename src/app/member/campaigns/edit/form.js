/** */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import Select from 'react-select';
import MultiSelect from 'react-multi-select-component';
import { URLS, apiGet, apiPut } from '../../../../utilities/api/api';
import { Editor } from '../../../../vendors/@tinymce/tinymce-react/lib/es2015/main/ts/index';

import { setPageTitle } from '../../../../store/actions/header';

import './form.css';

const CampaignCreationForm = props => {
    const { config, campaign_id } = props;

    const dispatch = useDispatch();
    const user_data = useSelector(state => state.user_data);
    const campaigns = useSelector(state => state.campaigns);

    const campaign = campaigns[campaign_id];
    const { token } = user_data;
    const tenant_id = user_data.id;

    const [campaign_body, setCampaignBody] = useState(campaign.body);
    const [campaign_name, setCampaignName] = useState(campaign.name);
    const [campaign_subject, set_campaignSubject] = useState(campaign.subject);
    const [loading, setLoading] = useState(false);
    const [mailing_lists, setMailingLists] = useState([]);
    const [selected_lists, setSelectedLists] = useState([]);
    const [sender_email, setSenderEmail] = useState(campaign.sender_email);
    const [sender_name, setSenderName] = useState(campaign.sender_name);

    useEffect(() => {
        dispatch(setPageTitle('Edit Campaign'));
        apiGet(`${URLS.mailing_lists}`, { token }).then(response => {
            const { payload } = response;
            if (payload) {
                setMailingLists(payload);
                const lists = payload.filter(list => campaign.mailing_lists.includes(list.id));
                setSelectedLists(lists.map(list => ({ label: list.name, value: list.id })));
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitCampaign = () => {
        const data = {
            body: campaign_body,
            mailing_lists: selected_lists.map(list => list.value),
            name: campaign_name,
            schedule: {
                exists: false,
                date: 0
            },
            sender_email,
            sender_name,
            subject: campaign_subject,
            tenant_id,
        }

        if (!campaign_body || !campaign_name || !campaign_subject || !sender_email || !sender_name) {
            toast.error('please fill all fields');
            return;
        }

        setLoading(true);
        apiPut(`${URLS.campaigns}/${campaign_id}`, { data, token }).then(response => {
            const { error, } = response;

            if (error) {
                toast.error(error);
                return;
            }

            toast.success(`Campaign edited successfully.`)
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
                <div className="p-0 pr-2 col-6">
                    <input className="form-control" id="campaign_subject" placeholder="Campaign Subject" type="text" defaultValue={campaign_subject} onInput={e => set_campaignSubject(e.target.value)} />
                </div>
                <div className="p-0 pl-2 col-6">
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
                        labelledBy='Select Audience'
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
                    <button className="col-2 float-right gm-btn gm-btn-primary" disabled>Updating...</button> :
                    <button className="col-2 float-right gm-btn gm-btn-primary shadow" onClick={() => submitCampaign()} >Update</button>
                }
            </div>
        </div>
    )
}

export default CampaignCreationForm;