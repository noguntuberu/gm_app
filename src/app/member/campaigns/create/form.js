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
import * as MailboxService from '../../../../services/mailbox';
import * as AudienceService from '../../../../services/audience';
import * as CampaignService from '../../../../services/campaign';

import EmailVerificationForm from '../verify-email/verify-email';
import Spinner from '../../../shared/spinners/spinner-15/spinner-15';

import './form.css';

const CampaignCreationForm = props => {
    let { config } = props;
    let { id } = useParams()
    let dispatch = useDispatch();
    let user_data = useSelector(state => state.user_data);
    let { token } = user_data;
    let tenant_id = user_data.id;

    let [campaign, setCampaign] = useState({});
    let [campaign_id, setCampaignId] = useState(id || 0);
    let [campaign_body, setCampaignBody] = useState();
    let [campaign_name, setCampaignName] = useState();
    let [campaign_subject, setCampaignSubject] = useState();
    let [mailing_lists, setMailingLists] = useState([]);
    let [schedule, setCampaignSchedule] = useState(generateHTMLFormDateTimeDefaults());
    let [selected_lists, setSelectedLists] = useState([]);
    let [sender_email, setSenderEmail] = useState();
    let [sender_name, setSenderName] = useState();

    let [is_verifying, setIsVerifying] = useState(false);
    let [mailbox, setMailbox] = useState({});
    let [sender_eamil_is_verified, setSenderEmailVerificationStatus] = useState(true);
    let [show_verification_modal, setShowVerificationModal] = useState(false);

    let [loading, setLoading] = useState(false);
    let [draft_message, setDraftMessage] = useState('');
    let [show_draft_status, setShowDraftStatus] = useState(false);
    let [show_wildcard_modal, setShowWildcardModal] = useState(false);
    let [word_count, setWordCount] = useState(0);

    useEffect(() => {
        dispatch(setPageTitle(id ? 'Edit Campaign' : 'New Campaign'));
        CampaignService.readById(id, { token }).then(response => {
            const { error, payload } = response;
            if (error) return;

            setCampaign(payload);
            setSelectedLists(payload.mailing_lists);
            setCampaignSchedule(new Date(payload.schedule.date))
        });

        AudienceService.read({ token }).then(response => {
            const { payload } = response;
            if (payload) {
                setMailingLists(payload);
            }
        });

        MailboxService.read({ token }).then(response => {
            const { error, payload } = response;
            if (error) return;
            
            setMailbox(payload[0] || { emails: []});
        }).catch(e => e);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatDataForDatabase = () => {
        return {
            body: campaign_body || campaign.body,
            mailing_lists: selected_lists || campaign.mailing_lists,
            name: campaign_name || campaign.name,
            schedule: {
                exists: true,
                date: Date.parse(schedule || campaign.schedule.date),
            },
            sender_email: sender_email || campaign.sender_email,
            sender_name: sender_name || campaign.sender_name,
            subject: campaign_subject || campaign.subject,
            tenant_id,
        }
    }

    const handleCampaignCreation = async (data) => {
        let response;

        if (campaign_id) {
            response = await DraftService.updateById(campaign_id, { data: { ...data, status: 'queued' }, token });
        } else {
            response = await CampaignService.create({ data, token });
        }
        const { error } = response;
        if (error) {
            toast.error(error);
            return;
        }

        toast.success(`Campaign created successfully.`);
    }

    const handleDraftSave = async () => {

        let id = campaign_id;
        let response;
        let data = {
            ...formatDataForDatabase(),
            status: 'draft',
        }

        setShowDraftStatus(true);
        setDraftMessage(`Saving draft...`);

        if (word_count === 5 && !id) {
            response = await DraftService.create({ data, token });
        }

        if (id) {
            response = await DraftService.updateById(id, { data, token });
        }

        if (!response) return;
        const { error, payload } = response;
        if (error) {
            setDraftMessage(`Failed to save draft.`);
        } else {
            setCampaignId(payload.id || id);
            setDraftMessage('Draft saved.');
        };

        setTimeout(() => setShowDraftStatus(false), 2000);
    }

    let handleEditorChange = async (data) => {
        setWordCount((word_count + 1));
        setCampaignBody(data);

        await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000));
        if (word_count < 5) return;
        handleDraftSave();
    }

    let handle_email_verification = async () => {
        try {
            setIsVerifying(true);
            const response = await MailboxService.initiate_verification({ token, data: { email: sender_email } });
            const { error, payload } = response;

            if (error) {
                toast.error('Unable to verify email. Try again later.');
                return;
            }

            setMailbox(payload[0]);
            setShowVerificationModal(true);
        } catch (e) {

        } finally {
            setIsVerifying(false);
        }
    }

    let handleListSelection = (lists) => {
        setSelectedLists(lists.map(list => list.value));
    }
    
    let processSenderEmail = () => {
        if (!isEmailValid(sender_email)) return;

        if (!mailbox.emails.includes(sender_email)) {
            setSenderEmailVerificationStatus(false);
        }
    }

    const sendCampaign = async () => {
        const data = formatDataForDatabase();

        if (!data.body || !data.name || !data.subject || !data.sender_email || !data.sender_name) {
            toast.error('please fill all fields');
            return;
        }

        if (!isEmailValid(data.sender_email)) {
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
                <input
                    className="gm-input"
                    id="sender_email"
                    type="text"
                    defaultValue={campaign.sender_email}
                    onInput={e => setSenderEmail(e.target.value)}
                />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-sm-12 col-md-6"></div>
            <div className="form-group col-sm-12 col-md-6">
                {sender_eamil_is_verified ?
                    <></> :
                    <div className="text-wine-6">
                        {is_verifying ?
                            <div> <i>Verifying...</i></div> :
                            <p>
                                E-mail address is not verified. <b className="is-clickable px-1" onClick={handle_email_verification}>Click here</b>to verify.
                            </p>
                        }
                    </div>
                }
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
                    onFocus={processSenderEmail}
                />
            </div>
            <div className="form-group col-sm-12  col-md-6">
                <label htmlFor="campaign_list">Audiences</label>
                <MultiSelect
                    options={mailing_lists.map(list => ({ label: list.name, value: list.id }))}
                    onChange={handleListSelection}
                    value={mailing_lists.filter(list => (selected_lists).includes(list.id))
                        .map(list => ({ label: list.name, value: list.id }))
                    }
                    isMulti={true}
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
                    value={campaign.body}
                    onEditorChange={e => handleEditorChange(e)}
                />
            </div>
        </div>
        <div className="form-row">
            <div className="col-md-8"></div>
            <div className="col-md-4 pr-md-0 px-sm-0">
                {loading ?
                    <div className="gm-btn gm-btn-blue">Creating <span className="gm-btn-spinner"><Spinner /></span></div> :
                    <div className="gm-btn gm-btn-blue" onClick={() => sendCampaign()} >Create</div>
                }
            </div>
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
        <GmModal
            title="Verify e-mail address"
            show_title={true}
            show_modal={show_verification_modal}
            onClose={() => setShowVerificationModal(false)}
        >
            <EmailVerificationForm email={sender_email} mailbox={mailbox} onClose={() => setShowVerificationModal(false)} />
        </GmModal>
    </div >
}

export default CampaignCreationForm;