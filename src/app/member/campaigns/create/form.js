/** */
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import GmModal from '../../../shared/modal/modal';
import React, { useState, useEffect } from 'react';
import MultiSelect from 'react-multi-select-component';
import { useDispatch, useSelector } from 'react-redux';
import { isEmailValid } from '../../../shared/utils/input';
import { setPageTitle } from '../../../../store/actions/header';
import { generateHTMLFormDateTimeDefaults } from '../../../shared/utils/date';
import { Editor } from '../../../../vendors/@tinymce/tinymce-react/lib/es2015/main/ts/index';

import * as DraftService from '../../../../services/draft';
import * as AudienceService from '../../../../services/audience';
import * as CampaignService from '../../../../services/campaign';
// import * as FileService from '../../../../services/file';

import Spinner from '../../../shared/spinners/spinner-15/spinner-15';

import './form.css';

const CampaignCreationForm = props => {
    const { config } = props;
    const { id } = useParams()
    const dispatch = useDispatch();
    const user_data = useSelector(state => state.user_data);
    const { token } = user_data;
    const tenant_id = user_data.id;

    const [campaign, setCampaign] = useState({});
    const [campaign_id, setCampaignId] = useState(id || 0);
    const [campaign_body, setCampaignBody] = useState();
    const [campaign_name, setCampaignName] = useState();
    const [campaign_subject, setCampaignSubject] = useState();
    const [mailing_lists, setMailingLists] = useState([]);
    const [schedule, setCampaignSchedule] = useState(generateHTMLFormDateTimeDefaults());
    const [selected_lists, setSelectedLists] = useState([]);
    const [sender_email, setSenderEmail] = useState();
    const [sender_name, setSenderName] = useState();

    // const [extracting, setExtracting] = useState(false);
    // const [html_file,] = useState(null);

    const [loading, setLoading] = useState(false);
    const [draft_message, setDraftMessage] = useState('');
    const [last_timeout_handle, setLastTimeoutHandle] = useState();
    const [show_draft_status, setShowDraftStatus] = useState(false);
    const [show_wildcard_modal, setShowWildcardModal] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle(id ? 'Edit Campaign' : 'New Campaign'));
        CampaignService.readById(id, { token }).then( response => {
            const { error, payload } = response;
            if (error) return;

            setCampaign(payload);
            setSelectedLists(payload.lists);
            setCampaignSchedule(new Date(payload.schedule.date))
        });

        AudienceService.read({ token }).then(response => {
            const { payload } = response;
            if (payload) {
                setMailingLists(payload);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCampaignCreation = async (data) => {
        let response;
        if (campaign_id) {
            response = await DraftService.updateById(campaign_id, { data: { ...data, status: 'queued' }, token });
        } else {
            response = await CampaignService.create({ data, token });
        }
        const { error} = response;
        if (error) {
            toast.error(error);
            return;
        }

        toast.success(`Campaign created successfully.`);
    }

    const formatDataForDatabase = () => {
        return {
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
    }

    const handleDraftSave = async (id = 0) => {
        let response;
        let data = {
            ...formatDataForDatabase(),
            status: 'draft',
        }

        setShowDraftStatus(true);
        setDraftMessage(`Saving draft...`);
        if (id) {
            response = await DraftService.updateById(id, { data, token });
        } else {
            response = await DraftService.create({ data, token });
        }

        const { error, payload } = response;
        if (error) {
            setDraftMessage(`Failed to save draft.`);
        } else {
            setCampaignId(payload.id);
            setDraftMessage('Draft saved.');
        };

        setTimeout(() => setShowDraftStatus(false), 2000);
    }

    const handleEditorChange = data => {
        setCampaignBody(data);
        clearInterval(last_timeout_handle);

        const timeout_handle = setTimeout(() => {
            handleDraftSave(campaign_id);
        }, 750);

        setLastTimeoutHandle(timeout_handle);
    }

    // const importHTML = async (file) => {
    //     if (!file) {
    //         toast.error('no file selected');
    //         return;
    //     }

    //     if (!file.type.includes('html')) {
    //         toast.error('invalid file type: must be html');
    //         return;
    //     }

    //     const request_data = new FormData();
    //     request_data.append('html_doc', file);

    //     setLoading(true);
    //     const { error, payload } = await FileService.extractHtmlContent({
    //         data: request_data, token,
    //         headers: {
    //             'Content-Type': 'application/form-data'
    //         }
    //     });

    //     setLoading(false);
    //     if (error) {
    //         toast.error(error);
    //         return;
    //     }

    //     navigator.permissions.query({ name: "clipboard-write" }).then(result => {
    //         if (result.state === "granted" || result.state === "prompt") {
    //             navigator.clipboard.writeText(payload).then(function () {
    //                 toast.success('file content copied.');
    //             }, function () {
    //                 toast.error('could not copy contents');
    //             });
    //         }
    //     });
    // }

    const sendCampaign = async () => {
        const data = formatDataForDatabase();

        if (!campaign_body || !campaign_name || !campaign_subject || !sender_email || !sender_name) {
            toast.error('please fill all fields');
            return;
        }

        if (!isEmailValid(sender_email)) {
            toast.error('Invalid Sender Email');
            return;
        }

        setLoading(true);
        await handleCampaignCreation(data);
        setCampaign({});
        setLoading(false);
    }

    return <div className="mt-2">
        <div className="form-row">
            <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="campaign_title">Name</label>
                <input className="gm-input" id="campaign_title" type="text" defaultValue={campaign.name} onInput={e => setCampaignName(e.target.value)} />
            </div>
            <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="campaign_subject">Subject</label>
                <input className="gm-input" id="campaign_subject" type="text" defaultValue={campaign.subject} onInput={e => setCampaignSubject(e.target.value)} />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="sender_name">Sender's name</label>
                <input className="gm-input" id="sender_name" type="text" defaultValue={campaign.sender_name} onInput={e => setSenderName(e.target.value)} />
            </div>
            <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="sender_email">Sender's email</label>
                <input className="gm-input" id="sender_email" type="text" defaultValue={campaign.sender_email} onInput={e => setSenderEmail(e.target.value)} />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="campaign_schedule">Schedule</label>
                <input
                    className="pt-md-2 gm-input"
                    id="campaign_schedule"
                    type="date"
                    name="campaign-schedule"
                    defaultValue={schedule}
                    onChange={e => setCampaignSchedule(e.target.value)}
                />
            </div>
            <div className="form-group col-sm-12  col-md-6">
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
            <span className="text-info is-clickable" onClick={() => setShowWildcardModal(true)}>** <b>Click Here </b> to see supported @ wildcards.</span>
            {show_draft_status ? <span className="gm-text-grey float-right"><i>{draft_message}</i></span> : <></>}
        </div>
        <div className="form-row">
            <div className="form-group col-12">
                <Editor
                    body_class="campaign_editor"
                    id="campaign_create"
                    init={config}
                    initialValue={campaign.body}
                    onEditorChange={e => handleEditorChange(e)}
                />
            </div>
        </div>
        <div className="form-group">
            {/* <div className="custom-file col-3">
                    <input type="file" className="custom-file-input is-clickable" id="contact_file" onChange={e => importHTML(e.target.files[0])} />
                    <label className="custom-file-label" htmlFor="contact_file">{html_file ? html_file.name : 'Copy html from file'}</label>
                </div> */}
            {loading ?
                <div className="gm-btn gm-btn-blue">Creating <span className="gm-btn-spinner"><Spinner /></span></div> :
                <div className="gm-btn gm-btn-blue" onClick={() => sendCampaign()} >Create</div>
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
    </div >
}

export default CampaignCreationForm;